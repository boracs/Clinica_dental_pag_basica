# Prompt maestro — Auditoría diseño/UX clínica dental

Copia el bloque siguiente y ejecútalo con un agente que tenga acceso al repositorio.

```
Rol: auditor senior de diseño, UX y frontend de una web de clínica dental local en España.

Objetivo
Auditar a fondo la web de la Clínica dental del doctor Javier Giménez Turrillas. Detecta TODO lo mejorable. No reescribas la web ni implementes fixes; solo audita. Si más adelante piden correcciones, será en otro encargo.

Proyecto
- Ruta del repo: el workspace actual de la clínica.
- Stack: Next.js (lee AGENTS.md y la guía en node_modules/next/dist/docs/ si hace falta aclarar APIs).
- Fuente única de verdad de datos: lib/site.ts. No inventes horarios, WhatsApp, precios, opiniones, nº de colegiado, años de experiencia, tratamientos ni fotos.
- Norma de diseño y textos: diseno-y-textos.md, app/globals.css (:root), .cursor/rules/diseno-clinica.mdc.
- Criterio de diseño/textos alineado con el agente marketing-diseno-clinica; criterio de implementación con el agente frontend.

Páginas a revisar (mínimo)
- Home: /
- Sobre nosotros: /sobre-nosotros
- Contacto: /contacto
Revisa también layout compartido (header, footer, barra móvil), formularios, enlaces, estados vacíos/error/éxito e imágenes.

Entrada obligatoria (lee antes de opinar)
1. diseno-y-textos.md
2. lib/site.ts
3. app/globals.css (variables :root)
4. Componentes y páginas de las rutas anteriores (ContactForm, CTAs, nav, imágenes)
5. Cualquier brief o notas del proyecto presentes en el repo (sin inventar lo que no esté)

Pistas ya detectadas — VERIFICAR, no dar por cerradas
1. ContactForm hace POST a `/contacto.php` en vez de `/api/contacto`.
2. El botón submit dice «Pedir cita» (el brief original pedía «Enviar mensaje»).
3. Texto visible «(Enlace a política: pendiente)» junto al checkbox.
4. Imágenes genéricas / de prueba con pies «pendiente».
5. Posible deriva respecto al brief original (Atmosphere, valoraciones Google, horarios en site.ts).
6. Confirmar cobertura real de las tres páginas listadas y de lo compartido (nav, footer, sticky bar).

Qué auditar
1. Diseño visual: jerarquía, espacio (escala 4 px), color (sin degradados/morados/dorados/rojo salvo error de formulario), tipografía (Source Serif 4 titulares / Source Sans 3 interfaz), contraste, consistencia, móvil-first.
2. UX: navegación, CTAs (un primario por zona; etiquetas de acción real: «Pedir cita», «Llamar», «Escribir»), formularios, estados, fricción, claridad de la acción principal (pedir cita / contactar).
3. Accesibilidad: contraste AA, foco visible, targets ≥ 48 px, semántica, labels, errores anunciables, teclado.
4. Contenido/redacción: tono cercano, claro, tranquilizador; sin miedo ni jerga; huecos «pendiente» visibles; textos confusos o que contradigan diseno-y-textos.md.
5. Técnico que afecte al usuario: enlaces rotos, endpoints incorrectos, hidratación, performance percibida (CLS, LCP visual, imágenes), errores de consola obvios al navegar las rutas.
6. Coherencia con diseno-y-textos.md y con las reglas de marketing-diseno-clinica / frontend (barra inferior móvil Pedir cita + Llamar; padding para no tapar el pie; un botón primario por zona).

Restricciones
- Español en todo el informe.
- No inventes datos de la clínica. Lo no confirmado se marca como pendiente de dato real.
- No reescribas páginas ni propongas un rediseño completo; solo hallazgos accionables.
- Distingue hecho observado (ruta/archivo) de opinión de mejora.
- No trates las pistas arriba como conclusiones: confirma o descarta cada una con evidencia.

Formato de salida (obligatorio)

## Resumen (5–8 líneas)
Estado general y si la acción principal (pedir cita / contactar) está clara y usable.

## Crítico
Hallazgos que rompen o confunden la acción principal.
Para cada uno:
- Qué: …
- Dónde: ruta / archivo / sección
- Por qué importa: …
- Cómo corregirlo: 1 frase

## Alto
Daña confianza o conversión. Misma estructura por hallazgo.

## Medio
Diseño/UX mejorable. Misma estructura por hallazgo.

## Bajo
Pulido. Misma estructura por hallazgo.

## Pistas verificadas
Tabla o lista: pista → confirmada / descartada / parcial → evidencia breve.

## Top 5 prioridades
Lista ordenada de las 5 correcciones que más impacto dan ahora.

## Pendientes de datos reales
Lista explícita de huecos que requieren dato o asset real de la clínica (sin inventar valores).

Criterio de éxito
El informe permite a otro agente o a una persona priorizar y corregir sin releer el código: cada hallazgo tiene ubicación, impacto y fix en una frase; las pistas están verificadas; no hay datos inventados; no hay reescritura de la web.
```
