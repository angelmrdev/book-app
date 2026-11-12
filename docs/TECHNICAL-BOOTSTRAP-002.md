# TECHNICAL BOOTSTRAP 002 — Desarrollo y despliegue

**Fecha:** 2026-11-12 · **Estado:** propuesta operativa, Hostinger Business confirmado por el usuario, capacidades técnicas por verificar.

## Alcance
Este hilo se ocupa de arquitectura, código, datos, pruebas, infraestructura, SEO técnico y despliegue. Branding/naming en hilo independiente. No bloquear el desarrollo por el nombre: usar identificadores neutrales (`reading-platform`) y variables `SITE_URL`, `SITE_NAME`, `BRAND_ASSETS_PATH`.

## ADR nuevos
- **ADR-008 (aceptada):** Hostinger será el primer destino de hosting; sustituye la propuesta de Vercel en FOUNDATION-001. La modalidad de despliegue (hosting Node.js gestionado vs VPS) está abierta hasta confirmar el plan.
- **ADR-009 (aceptada):** desarrollo VS Code + Git + GitHub, integración continua y despliegues por commits después de pasar controles.
- **ADR-010 (aceptada):** Supabase alojará PostgreSQL y, sujeto a configuración, autenticación y almacenamiento. Usar migraciones versionadas; no modificar producción manualmente.
- **ADR-011 (aceptada):** entornos local, staging y producción; staging protegido y no indexable. Dominio temporal no se enviará a GSC; lanzamiento indexable en dominio final.
- **ADR-012 (aceptada):** branding desacoplado del código mediante tokens, assets y configuración.
- **ADR-013 (propuesta):** pnpm workspace + Turborepo + Next.js App Router + TypeScript + Tailwind + next-intl, con versiones fijadas en lockfile y Node LTS compatible con el hosting.
- **ADR-014 (aceptada parcialmente):** GitHub Actions para checks; despliegue automatizado objetivo, mecanismo exacto condicionado por capacidades verificadas de Hostinger Business. No guardar secretos en repositorio.
- **ADR-015 (aceptada):** Hostinger Business es el destino inicial, sin migración prematura a VPS; migración futura por límites medidos de recursos o funcionalidades. Los workers de ingesta se ejecutan inicialmente fuera del hosting web.

## Topología objetivo
- `apps/web`: frontend público, rutas EN/ES, contenido editorial y futura app autenticada.
- `apps/admin`: CMS y curación (puede arrancar integrado en `apps/web` para reducir costes).
- `apps/importer`: herramienta local, sin exposición pública.
- `packages/ui`, `packages/config`, `packages/db`, `packages/i18n`, `packages/bibliography`, `packages/editorial`, `packages/commerce`.
- `workers/catalog`: ingestas masivas, fuera del proceso web.
- `docs/adr`, `docs/increments`, `supabase/migrations`, `.github/workflows`.

## Flujo de ramas y releases
1. `main` protegida como rama de producción; ramas `feat/iNN-...` para incrementos.
2. Cada PR: lint, typecheck, tests, build; revisión de migraciones y SEO cuando aplique.
3. Merge en `main`: despliegue automático a producción **solo después** de configurar credenciales, migraciones y rollback. Previews/staging por separado según capacidades del plan.
4. Cada incremento: objetivo, ADRs, cambios, pruebas, checklist de aceptación, notas de despliegue y rollback.

## Entornos
- Local: `.env.local` no versionado, Supabase local o proyecto dev según recursos.
- Staging: base de datos separada, autenticación de acceso, `noindex` como defensa secundaria; nunca depender solo de robots.txt para proteger datos.
- Producción: Supabase prod separado, backups y política de migraciones; dominio temporal privado/no indexado hasta lanzamiento.
- Variables: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (o publishable key vigente), `SUPABASE_SERVICE_ROLE_KEY` solo servidor/worker, credenciales de deploy en secretos GitHub.

## Hostinger Business: despliegue inicial y evolución
- **Confirmado:** el usuario dispone probablemente de Hostinger Business y ya aloja otras web apps. Se elige este plan como destino inicial, sujeto a comprobar la configuración real del panel y las capacidades disponibles para la app.
- **Por verificar en el panel:** soporte de Next.js App Router/SSR, versión de Node, comando de build y start, Git/SSH, variables de entorno, dominios temporales, logs, límites de recursos y si hay despliegue automatizable. No dar por hecho Docker, workers persistentes ni despliegue por push.
- **Evolución futura:** migrar la web a un VPS solo cuando recursos o restricciones lo justifiquen. Mantener base de datos Supabase y componentes desacoplados para simplificar migración. En VPS habrá que configurar TLS, proxy, procesos, backups y observabilidad.
- No asumir que el hosting web compartido sirve para ejecutar importaciones masivas ni procesos en segundo plano.

## Primeros incrementos
- **I00A Documentación y decisiones:** ratificar hosting, topología y convención de despliegue.
- **I00B Bootstrap:** monorepo instalable, lint, TS, formatting, CI, app Next.js mínima y página health.
- **I00C Supabase:** entornos, migración inicial, cliente seguro y smoke test de conexión sin exponer secretos.
- **I01 Web pública:** rutas `/en` y `/es`, layouts, SEO básico, páginas estáticas y sitemaps.
- **I02 Editorial mínimo:** entidades de artículo y variantes, CMS de borradores, publicación y bloques.
- **I03 Bibliografía mínima:** obras/ediciones y relación con artículos; importación individual.
- **I04 Comercio:** comercios, afiliados por edición y mercado, avisos y medición.
- **I05 Lanzamiento indexable:** dominio final, canonical, hreflang, sitemap, robots, GSC y revisión legal.

## Criterio de finalización I00B
`pnpm install`, `pnpm lint`, `pnpm typecheck`, `pnpm test` y `pnpm build` pasan; la app responde en local; CI se ejecuta en PR; existe documentación de variables; no hay secretos ni marca hardcodeada. El despliegue automático se configura tras verificar el producto Hostinger.

## Riesgos
- Hosting Node.js puede no permitir procesos de larga duración.
- Deploy automático sin migraciones controladas puede romper producción.
- Indexación accidental de staging o dominio temporal.
- Importaciones externas sujetas a licencias y límites de proveedores.
