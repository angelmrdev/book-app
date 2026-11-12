$ErrorActionPreference = 'Stop'
$root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$manifest = Join-Path $root 'apps/web/package.json'
if (-not (Test-Path $manifest)) { throw "No existe apps/web/package.json. Ejecuta desde el monorepo correcto." }
$package = Get-Content $manifest -Raw -Encoding UTF8 | ConvertFrom-Json
if (-not $package.scripts) { $package | Add-Member -NotePropertyName scripts -NotePropertyValue ([pscustomobject]@{}) }
$package.scripts | Add-Member -NotePropertyName typecheck -NotePropertyValue 'tsc --noEmit' -Force
$package.scripts | Add-Member -NotePropertyName test -NotePropertyValue 'vitest run' -Force
$package | ConvertTo-Json -Depth 50 | Set-Content -Path $manifest -Encoding utf8
Push-Location $root
try {
  & pnpm --filter web add -D vitest
  if ($LASTEXITCODE -ne 0) { throw 'Fallo instalando Vitest.' }
  & pnpm typecheck
  if ($LASTEXITCODE -ne 0) { throw 'Fallo typecheck.' }
  & pnpm test
  if ($LASTEXITCODE -ne 0) { throw 'Fallo test.' }
} finally { Pop-Location }
Write-Host 'I001: typecheck y test configurados y verificados.' -ForegroundColor Green
