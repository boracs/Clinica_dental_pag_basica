# Prompts por paso — Clínica dental Javier Giménez Turrillas

Usa un prompt por mensaje, en este orden. Copia solo el bloque de código de cada paso.

## Datos reales (ya confirmados)

Usa siempre estos datos en todos los pasos. No inventes el resto.

- Nombre: Clínica dental del doctor Javier Giménez Turrillas
- Dirección: Calle Loyola, 15 1 Dcha, 20005 San Sebastián-Donostia, SS
- Teléfono: 943 42 82 24
- Email: consulta@javiergimenezturrillas.com

Pendiente todavía: horarios, WhatsApp, fotos, equipo, tratamientos concretos, precios, número de colegiado.

---

## 1. Crear el agente frontend

```
Usa el subagente arquitecto-agentes para crear un agente de proyecto llamado frontend.

Debe especializarse en implementar la web de la Clínica dental del doctor Javier Giménez Turrillas con Next.js + TypeScript.

Cuando lo invoquen:
- Implementa páginas y componentes limpios, accesibles y mobile-first.
- Respeta el diseño y los textos que vengan del agente marketing-diseno-clinica.
- Usa estos datos reales siempre que haga falta contacto:
  - Dirección: Calle Loyola, 15 1 Dcha, 20005 San Sebastián-Donostia, SS
  - Teléfono: 943 42 82 24
  - Email: consulta@javiergimenezturrillas.com
- No inventa horarios, WhatsApp, equipo, precios ni fotos.
- Prefiere App Router, componentes reutilizables y CSS claro.
- Revisa la UI en móvil y escritorio antes de dar por terminado.

Guárdalo en .cursor/agents/frontend.md y confirma la ruta al acabar.
```

---

## 2. Crear el agente backend

```
Usa el subagente arquitecto-agentes para crear un agente de proyecto llamado backend.

Debe especializarse en la parte servidor de la web de la Clínica dental del doctor Javier Giménez Turrillas.

Cuando lo invoquen:
- Crea solo lo necesario: rutas API, validación del formulario de contacto y envío seguro.
- El destinatario real del contacto es consulta@javiergimenezturrillas.com.
- No monta login, panel de pacientes ni base de datos clínica.
- No inventa servicios externos, claves API ni proveedores de email.
- Si falta configuración real, deja huecos claros y variables de entorno de ejemplo.
- Prioriza validación, mensajes de error claros y seguridad básica del endpoint.

Guárdalo en .cursor/agents/backend.md y confirma la ruta al acabar.
```

---

## 3. Definir diseño y textos de toda la web

```
Usa el subagente marketing-diseno-clinica.

Necesito el sistema de diseño y los textos finales para una web básica de la Clínica dental del doctor Javier Giménez Turrillas con tres páginas: Home, Sobre nosotros y Contacto.

Datos reales que debes usar sí o sí:
- Dirección: Calle Loyola, 15 1 Dcha, 20005 San Sebastián-Donostia, SS
- Teléfono: 943 42 82 24
- Email: consulta@javiergimenezturrillas.com
- Ciudad: San Sebastián-Donostia

Entrégame, en español de España:
1. Paleta exacta (hex), tipografías, espaciado, botones y jerarquía visual.
2. Textos finales de Home, Sobre nosotros y Contacto.
3. Etiquetas de botones y CTAs (incluir Llamar y Escribir con los datos reales).
4. Lista de huecos pendientes reales: horarios, WhatsApp, fotos, equipo, tratamientos concretos, precios. No marques como pendiente lo que ya está confirmado.

Criterio:
- Móvil primero.
- Un foco por sección.
- Tono cercano, claro y tranquilizador.
- El objetivo principal es contactar / pedir cita.
- Nada de eslóganes vacíos ni datos inventados.

No construyas código todavía. Solo diseño + redacción listos para implementar.
```

---

## 4. Implementar la Home

```
Usa el subagente frontend.

Implementa la página Home (`/`) de la Clínica dental del doctor Javier Giménez Turrillas en Next.js + TypeScript.

Parte del sistema de diseño y textos definidos por marketing-diseno-clinica.

Datos reales a mostrar donde corresponda:
- Dirección: Calle Loyola, 15 1 Dcha, 20005 San Sebastián-Donostia, SS
- Teléfono: 943 42 82 24
- Email: consulta@javiergimenezturrillas.com

La Home debe incluir:
- Primer pantallazo: quiénes somos, qué ofrecemos y CTA claro de contacto/cita.
- Secciones cortas: servicios principales, confianza y puente a Sobre nosotros y Contacto.
- Un solo foco por sección.
- En cabecera o pie: teléfono y email reales, clicables.
- Huecos visibles solo para lo pendiente: horarios, fotos, WhatsApp, equipo. No inventes nada de eso.

Al terminar:
- Confirma la ruta de los archivos creados.
- Dime cómo verla en local.
```

---

## 5. Implementar Sobre nosotros

```
Usa el subagente frontend.

Implementa la página Sobre nosotros (`/sobre-nosotros`) de la Clínica dental del doctor Javier Giménez Turrillas en Next.js + TypeScript.

Usa el diseño y textos de marketing-diseno-clinica.

La página debe incluir:
- Quiénes sois y el enfoque de trato al paciente, anclado en San Sebastián-Donostia.
- El doctor Javier Giménez Turrillas como figura principal, sin inventar biografía, años de experiencia ni número de colegiado.
- Bloques con huecos visibles para foto del equipo y datos profesionales pendientes.
- Misma tipografía, color y botones que la Home.
- CTA final hacia Contacto, más acceso a llamar (943 42 82 24) o escribir (consulta@javiergimenezturrillas.com).

Al terminar, confirma archivos creados y que el enlace desde la Home funciona.
```

---

## 6. Implementar Contacto (UI)

```
Usa el subagente frontend.

Implementa la página Contacto (`/contacto`) de la Clínica dental del doctor Javier Giménez Turrillas.

Diseño moderno y profesional, coherente con Home y Sobre nosotros.

Datos reales a mostrar sí o sí:
- Dirección: Calle Loyola, 15 1 Dcha, 20005 San Sebastián-Donostia, SS
- Teléfono: 943 42 82 24 (enlace tel:)
- Email: consulta@javiergimenezturrillas.com (enlace mailto:)

Debe incluir:
- Formulario: nombre, email, teléfono, mensaje.
- CTA principal claro.
- Bloque de datos de contacto reales + hueco para mapa.
- Huecos visibles para horarios y WhatsApp, sin inventarlos.
- Estados visuales: vacío, error de validación, enviando, éxito, error de servidor.
- Buena usabilidad en móvil (campos grandes, botón fácil de pulsar).

No conectes aún el envío real si el backend no está listo: deja el formulario preparado para la API.
Al terminar, confirma la ruta de la página y de los componentes del formulario.
```

---

## 7. Conectar el backend del formulario

```
Usa el subagente backend.

Crea la parte servidor del formulario de contacto de la Clínica dental del doctor Javier Giménez Turrillas.

Alcance exacto:
- Endpoint API para recibir nombre, email, teléfono y mensaje.
- Validación en servidor.
- Destinatario previsto: consulta@javiergimenezturrillas.com.
- Respuestas claras de éxito y error.
- Variables de entorno de ejemplo para el envío real (sin inventar proveedor ni claves).
- Instrucciones breves de qué hay que configurar para que el correo o la notificación funcionen de verdad.

No crees login, CRM, base de datos de pacientes ni reservas online.
Al terminar, indica:
1. Ruta del endpoint.
2. Qué variables faltan.
3. Cómo probarlo en local.
```

---

## 8. Revisión final conjunta

```
Haz una revisión final de la web de la Clínica dental del doctor Javier Giménez Turrillas.

Datos reales que deben aparecer bien:
- Dirección: Calle Loyola, 15 1 Dcha, 20005 San Sebastián-Donostia, SS
- Teléfono: 943 42 82 24
- Email: consulta@javiergimenezturrillas.com

Usa, en este orden:
1. marketing-diseno-clinica: revisar textos, jerarquía, contraste, CTAs y tono.
2. frontend: revisar Home, Sobre nosotros y Contacto en móvil y escritorio.
3. backend: revisar validación y respuestas del endpoint de contacto.

Corrige lo que falle.
Al final entrégame solo:
- Cómo arrancar la web.
- Qué páginas existen.
- Lista corta de pendientes reales (horarios, WhatsApp, fotos, equipo, tratamientos, precios). No incluyas teléfono, dirección ni email: esos ya están.
```

---

## Orden recomendado

1 → 2 → 3 → 4 → 5 → 6 → 7 → 8

Si quieres ir más rápido, puedes pegar 1 y 2 en el mismo mensaje. El resto, mejor de uno en uno.
