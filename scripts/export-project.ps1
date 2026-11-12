param(
    [string]$OutputDirectory = "project-exports"
)

$ErrorActionPreference = 'Stop'
$root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$output = Join-Path $root $OutputDirectory
New-Item -ItemType Directory -Path $output -Force | Out-Null
$stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$zip = Join-Path $output "book-app-$stamp.zip"
$stage = Join-Path ([System.IO.Path]::GetTempPath()) "book-app-export-$([guid]::NewGuid().ToString('N'))"

$excludedDirectories = @('.git', 'node_modules', '.next', '.turbo', 'dist', 'build', 'out', 'coverage', '.vercel', '.idea', '.vscode', 'project-exports')
$excludedNames = @('.env', '.env.local', '.env.production', '.env.development', '.env.test', '.npmrc', 'id_rsa', 'id_ed25519')
$excludedExtensions = @('.pem', '.p12', '.pfx', '.key', '.sqlite', '.db', '.zip', '.7z', '.rar')

try {
    New-Item -ItemType Directory -Path $stage -Force | Out-Null
    $files = Get-ChildItem -LiteralPath $root -Recurse -File -Force | Where-Object {
        $relative = $_.FullName.Substring($root.Length).TrimStart('\', '/')
        $segments = $relative -split '[\\/]'
        $blockedDir = @($segments | Where-Object { $_ -in $excludedDirectories }).Count -gt 0
        $blockedEnv = $_.Name -match '^\.env(\..+)?$' -and $_.Name -ne '.env.example'
        $blockedSecret = $_.Name -match '(?i)(secret|credential|private[-_]?key|service[-_]?account)'
        -not $blockedDir -and -not $blockedEnv -and -not $blockedSecret -and
          $_.Name -notin $excludedNames -and $_.Extension -notin $excludedExtensions
    }

    foreach ($file in $files) {
        $relative = $file.FullName.Substring($root.Length).TrimStart('\', '/')
        $destination = Join-Path $stage $relative
        New-Item -ItemType Directory -Path (Split-Path $destination -Parent) -Force | Out-Null
        Copy-Item -LiteralPath $file.FullName -Destination $destination
    }

    $suspect = Get-ChildItem -LiteralPath $stage -Recurse -File | Where-Object { $_.Extension -in @('.ts', '.tsx', '.js', '.json', '.md', '.yml', '.yaml', '.txt', '.toml', '.ps1') } |
      Select-String -Pattern '(?i)(-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----|SUPABASE_SERVICE_ROLE_KEY\s*[:=]\s*["'']?eyJ|sk_live_[A-Za-z0-9]{12,}|ghp_[A-Za-z0-9]{20,})' -List
    if ($suspect) { throw "Possible secrets found in export: $($suspect.Path -join ', '). Review files before exporting." }

    Compress-Archive -Path (Join-Path $stage '*') -DestinationPath $zip -CompressionLevel Optimal -Force
    Write-Host "Export created: $zip" -ForegroundColor Green
    Write-Host "Review the ZIP before sharing; secret scanning is best-effort." -ForegroundColor Yellow
} finally {
    if (Test-Path -LiteralPath $stage) { Remove-Item -LiteralPath $stage -Recurse -Force }
}
