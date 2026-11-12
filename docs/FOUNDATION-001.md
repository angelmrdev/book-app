# FOUNDATION 001 — Reading Platform

**Estado:** borrador de decisiones v0.1 · **Fecha:** 2026-11-12

## 1. Visión y alcance
Plataforma generalista internacional para descubrir libros, gestionar biblioteca, registrar lecturas y consultar recomendaciones. Modelo comercial: afiliación, publicidad contextual, promoción editorial identificada y suscripción futura. No se limita a un género ni a un mercado.

## 2. Decisiones confirmadas por producto
- Dos idiomas de lanzamiento: inglés y español. Los contenidos editoriales pueden localizarse y variar por mercado; no todas las variantes son traducciones literales.
- Mercados prioritarios: Estados Unidos, Reino Unido, España y Latinoamérica; México como primer mercado latinoamericano a estudiar.
- Un catálogo compartido de obras y ediciones, con títulos, idiomas, formatos e ISBN propios de cada edición.
- Publicación editorial temprana, mientras se desarrolla la importación masiva de catálogo.
- Cada libro mencionado en un artículo puede generar una solicitud de importación individual.
- El usuario podrá buscar en proveedores externos cuando no exista el libro localmente, importarlo provisionalmente y usarlo antes de la curación.
- Recomendaciones orgánicas, listas editoriales y promociones patrocinadas separadas; rankings objetivos no se alteran por pagos.
- Reading tracker futuro: sesiones cronometradas y manuales, progreso, estadísticas, listas y recomendaciones por afinidad.

## 3. Propuestas técnicas pendientes de ratificación
- Monorepo pnpm + Turborepo; Next.js, TypeScript, Tailwind, Supabase/PostgreSQL y Vercel.
- next-intl para interfaz y rutas; TipTap como editor editorial personalizado; Vitest y Playwright.
- Catálogo con Open Library como candidato para dumps iniciales; Google Books como enriquecimiento condicionado a licencias. Verificar términos antes de almacenar/republicar metadatos, imágenes o reseñas.
- Workers separados de los servidores web para importación masiva, reintentos y checkpoints.
- Búsqueda PostgreSQL inicial, con posibilidad de motor dedicado cuando lo exija el volumen.
- Administración y herramientas de importación local reutilizando servicios del monorepo.

## 4. Modelo conceptual
- `works`: obra abstracta; `editions`: idioma, ISBN, formato, editorial, páginas, fecha, portada.
- `contributors`, `work_contributors`, `series`, `series_entries`.
- `external_identifiers`, `metadata_provenance`, `import_jobs`, `import_candidates`, `curation_tasks`, `entity_redirects`.
- `editorial_stories`, `editorial_variants` (locale, market, slug, estado, SEO), `editorial_blocks`, `editorial_book_references`.
- `merchants`, `affiliate_programs`, `merchant_products`, `offers`, `affiliate_links` (edición + mercado + comercio).
- `editorial_collections`, `collection_entries`, `promotion_campaigns`, `promotion_placements`, `promotion_events`.
- Futuros: `user_libraries`, `reading_sessions`, `reading_progress`, `ratings`, `lists`, `recommendation_events`.

## 5. Reglas SEO y localización
- Idioma de interfaz, idioma de edición y mercado comercial son dimensiones independientes.
- Cada variante editorial publicada tiene URL y metadatos propios; canonical autorreferente por defecto.
- Hreflang solo entre alternativas lingüísticas/regionales equivalentes; evitar variantes indexables vacías o casi duplicadas sin valor regional.
- Fichas de catálogo indexables solo si cumplen umbrales editoriales de calidad; no indexar automáticamente cada importación provisional.
- JSON-LD por tipo de página (Article, ItemList, Book, BreadcrumbList) generado centralmente y con información verificable.
- URL y slug definitivos pendientes de naming y arquitectura de rutas.

## 6. Afiliación, publicidad y transparencia
- Enlaces por edición, comercio y mercado, no por obra únicamente.
- Precios/disponibilidad solo desde fuentes autorizadas y con fecha de actualización.
- Identificar enlaces afiliados y promociones; usar rel=sponsored donde corresponda.
- Distinguir rankings calculados, selección editorial y campañas pagadas; no vender posiciones en rankings objetivos.
- Evitar segmentación publicitaria basada en inferencias de atributos sensibles, incluida orientación sexual.
- Revisar GDPR/ePrivacy, consentimiento, políticas de afiliados, copyright de portadas y obligaciones fiscales antes de lanzar monetización.

## 7. Roadmap incremental propuesto
- **I00 — Foundation:** naming provisional, ADRs, repo, tooling, convenciones, diseño de marca y dominios candidatos.
- **I01 — Web base:** i18n EN/ES, layout, SEO técnico, páginas legales y navegación.
- **I02 — CMS editorial:** borradores, variantes regionales, editor y publicación.
- **I03 — Catálogo mínimo:** obras, ediciones, autores y referencias editoriales.
- **I04 — Importador individual:** búsqueda externa, staging, deduplicación y curación.
- **I05 — Afiliación:** comercios, mercados, bloques de compra y tracking respetuoso.
- **I06 — Primera campaña:** guías navideñas y LGTBIQ+, EN/ES, enlazadas al catálogo.
- **I07 — Importación masiva:** dumps, workers, calidad, actualización incremental.
- **I08+ — Biblioteca/tracker, descubrimiento, comunidad y premium.**

## 8. Criterios de aceptación del primer lanzamiento editorial
1. Una historia puede publicarse en EN y ES con slugs, SEO y contenido propios.
2. Un bloque de artículo enlaza una obra y una edición de nuestro catálogo.
3. Se puede solicitar importación de un libro no encontrado y revisar su estado.
4. Se pueden asociar enlaces de afiliación por mercado y edición con divulgación visible.
5. Sitemaps, canonical, hreflang válido, analítica y páginas legales revisadas.
6. CI, migraciones reproducibles, tests básicos y preview deployments.

## 9. Decisiones abiertas antes de inicializar infraestructura real
- Nombre y dominio; disponibilidad legal/marca y registrador.
- Mercados comerciales exactos del lanzamiento y proveedor de afiliación por país.
- CMS personalizado frente a Payload/Sanity (coste y control).
- Política de importación de imágenes, fuentes, derechos y actualización.
- Autenticación del panel, roles, seguridad y entorno staging.
- Política de consentimiento/cookies, privacidad y retención analítica.
- Identidad visual, tokens de diseño y estilo editorial.

## 10. Registro de decisiones (ADR)
- ADR-001 **Aceptada:** catálogo propio compartido y entidades obra/edición.
- ADR-002 **Aceptada:** editorial localizado con variantes independientes.
- ADR-003 **Aceptada:** afiliación específica por edición y mercado.
- ADR-004 **Aceptada:** separar rankings orgánicos de promociones identificadas.
- ADR-005 **Propuesta:** monorepo pnpm/Turborepo + Next.js/Supabase.
- ADR-006 **Propuesta:** CMS TipTap personalizado.
- ADR-007 **Propuesta:** importer local + workers independientes.

> Este documento es la fuente de verdad inicial. Actualizar mediante ADRs incrementales; no reescribir decisiones sin registrar su sustitución.

## 11. Actualización de infraestructura (2026-11-12)
- El hilo técnico se separa del trabajo de branding.
- Hostinger sustituye a Vercel como destino inicial; la modalidad exacta se decidirá según el plan contratado.
- Desarrollo incremental con VS Code, GitHub, CI y despliegues por commits; Supabase como base de datos conectada.
- Dominio temporal no indexado; GSC cuando exista dominio definitivo y contenido público listo.
- Ver `TECHNICAL-BOOTSTRAP-002.md` para ADR-008 a ADR-014 y plan I00.

## 12. Ratificación Hostinger Business (2026-11-12)
- El usuario indica que dispone de Hostinger Business y que ya aloja otras web apps; se adopta como hosting inicial. La compatibilidad y la ruta de despliegue de Next.js se verificarán en el panel antes de automatizar releases.
- No migrar a VPS hasta que las necesidades técnicas o límites de recursos lo justifiquen. Supabase permanece desacoplado del hosting web.
- Workers de importación masiva fuera de Hostinger Business, inicialmente locales.
- Próximo incremento: I00B, bootstrap instalable del monorepo; después verificar despliegue real en Hostinger y conectar Supabase mediante migraciones.
