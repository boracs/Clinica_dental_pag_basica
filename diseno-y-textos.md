# Diseño y textos — Clínica dental del doctor Javier Giménez Turrillas

Documento listo para implementar. No inventa datos. Lo confirmado está cerrado; lo que falta aparece como pendiente con hueco visible.

---

## 1. Sistema de diseño

### 1.1 Paleta (hex exactos)

| Uso | Token | Hex | Notas |
|---|---|---|---|
| Fondo de página | `--color-bg` | `#F3F6F5` | Fondo general |
| Superficie | `--color-surface` | `#FFFFFF` | Cabecera, pie, bloques de contraste |
| Texto principal | `--color-text` | `#163038` | Titulares y cuerpo |
| Texto secundario | `--color-text-muted` | `#4E646B` | Apoyos, pies de foto, metadatos |
| Líneas / bordes | `--color-border` | `#D5E0DE` | Separadores puntuales, inputs |
| Acción principal | `--color-action` | `#115E59` | Botón primario, enlaces activos |
| Acción hover | `--color-action-hover` | `#0C4A46` | Hover del primario |
| Detalle cálido | `--color-accent` | `#C4A574` | Máximo ~5 % de la página (línea fina, acento tipográfico). Nunca en botones ni avisos |
| Texto sobre acción | `--color-on-action` | `#FFFFFF` | Sobre `#115E59` |
| Error de formulario | `--color-error` | `#B42318` | Solo validación / envío fallido |
| Éxito de formulario | `--color-success` | `#0F5C4C` | Solo confirmación de envío |
| Foco | `--color-focus` | `#115E59` | Anillo de 2–3 px, offset 2 px |

Contraste: texto `#163038` y `#4E646B` sobre `#F3F6F5` / `#FFFFFF` ≥ AA. Botón primario: texto blanco sobre `#115E59` ≥ AA.

Sin degradados, sin morados, sin dorados de lujo, sin rojo de alarma fuera del error de formulario.

### 1.2 Tipografías

Máximo dos familias (Google Fonts o self-host):

| Rol | Familia | Pesos | Uso |
|---|---|---|---|
| Titulares | **Source Serif 4** | 600 (rango aceptable 560–650) | `h1`–`h3`, nombre de marca en hero |
| Interfaz y cuerpo | **Source Sans 3** | 400 cuerpo · 600 botones, etiquetas, nav | Párrafos, formularios, CTAs, pie |

Tamaños e interlineado:

| Elemento | Móvil | Escritorio | Interlineado |
|---|---|---|---|
| `h1` | 32–40 px | 48–56 px | 1.15 |
| `h2` | 28 px | 36 px | 1.2 |
| `h3` | 22 px | 24 px | 1.25 |
| Cuerpo | 16 px | 16 px | 1.5 |
| Pequeño / pie / label | 14 px | 14 px | 1.4 |
| Botón | 16 px | 16 px | 1 |

Reglas: sin mayúsculas sostenidas, sin condensadas, sin tracking agresivo. El texto corrido no supera ~65 caracteres por línea.

### 1.3 Espaciado (escala de 4)

Valores permitidos: **4, 8, 12, 16, 24, 32, 48, 64, 96**.

| Uso | Valor |
|---|---|
| Ancho máximo de página | **1120 px** (centrado; márgenes laterales 16 px móvil / 24 px escritorio) |
| Aire de sección (móvil) | **40 px** |
| Aire de sección (escritorio) | **64 px** (usar **96 px** solo en el hero si necesita más aire) |
| Entre bloques internos de una sección | **24 px** o **32 px** |
| Gap título → párrafo | **12 px** o **16 px** |
| Gap párrafo → CTA | **24 px** |
| Gap entre botones en grupo | **12 px** |
| Radio botón / input | **10 px** |
| Altura mínima botón / input | **48 px** |
| Padding horizontal botón | **24 px** (escala de 4; visual equivalente al brief de ~22) |

Alineación: rejilla izquierda. No centrar todos los bloques. El hero en móvil alinea texto a la izquierda; CTAs en columna a ancho completo.

### 1.4 Botones y CTAs

Un botón primario por zona.

| Tipo | Fondo | Borde | Texto | Hover |
|---|---|---|---|---|
| Primario | `#115E59` | ninguno | `#FFFFFF` · peso 600 | fondo `#0C4A46` |
| Secundario | transparente | 1.5 px `#115E59` | `#115E59` · peso 600 | fondo suave `#F3F6F5` o borde más oscuro `#0C4A46` |
| Texto / enlace | — | — | `#115E59` | subrayado |

Estados obligatorios: hover, focus visible (anillo), disabled (opacidad ~0.5, `cursor: not-allowed`, sin hover).

Prohibido como etiqueta única: «Enviar», «Click aquí», «Saber más», «Contactar».

### 1.5 Jerarquía visual (móvil primero)

1. **Cabecera fija o sticky ligera:** nombre corto de la clínica + enlace a Contacto / Pedir cita. Teléfono clicable opcional en escritorio.
2. **Primer pantallazo (home):** quién es · qué ofrece · botón «Pedir cita». Nada más. Sin hero a pantalla completa vacío.
3. **Secciones:** un titular, 1–2 frases, una acción. Separación por espacio, no por cajas ni sombras.
4. **Tarjetas:** solo para listas comparables (p. ej. tratamientos cuando existan). Un párrafo suelto no va en tarjeta.
5. **Bloques pendientes:** fondo `#FFFFFF` o `#F3F6F5` con borde `#D5E0DE`, pie o etiqueta «Pendiente» / «Foto pendiente» en 14 px `#4E646B`.
6. **Barra inferior móvil (si hay teléfono real — sí lo hay):** «Pedir cita» + «Llamar». Dejar padding-bottom en el cuerpo para no tapar contenido.
7. **Pie:** dirección, teléfono, email, enlaces a páginas y a legales cuando existan.

### 1.6 Imagen

Fotos reales de la clínica y del doctor cuando existan. Mientras no: bloque de reserva con etiqueta **«Foto pendiente»**. Sin banco de sonrisas. Sin antes/después. Sin vídeo de fondo.

### 1.7 SEO local (títulos de documento)

Una sola `h1` por página. Títulos de pestaña:

- Home: `Clínica dental · Javier Giménez Turrillas · San Sebastián-Donostia`
- Sobre nosotros: `Sobre nosotros · Clínica dental Javier Giménez Turrillas · San Sebastián-Donostia`
- Contacto: `Pedir cita y contacto · Clínica dental Javier Giménez Turrillas · San Sebastián-Donostia`

---

## 2. Navegación y CTAs globales

### 2.1 Nav

- Inicio
- Sobre nosotros
- Contacto

Nombre en cabecera (versión corta): **Clínica dental Javier Giménez Turrillas**  
(En móvil estrecho puede truncarse a **Dr. Javier Giménez Turrillas** si no cabe; el nombre completo sigue en el hero y el pie.)

### 2.2 Etiquetas de botones y CTAs (cerrar así)

| Etiqueta | Destino / acción |
|---|---|
| **Pedir cita** | `/contacto` (CTA principal del sitio) |
| **Llamar** | `tel:+34943428224` · texto visible: `943 42 82 24` |
| **Escribir** | `mailto:consulta@javiergimenezturrillas.com` · texto visible del email cuando acompañe |
| **Cómo llegar** | enlace a mapas con la dirección (cuando se implemente; la dirección es real) |
| **Ver cómo trabajamos** | `/sobre-nosotros` |
| **Ir a contacto** | `/contacto` (secundario, si hace falta diferenciar del primario) |
| **Enviar mensaje** | submit del formulario de contacto |
| **Llamar ahora** | mismo `tel:` (variante en bloque de urgencia suave / barra móvil) |

Datos reales en CTAs secundarios:

- Teléfono: **943 42 82 24**
- Email: **consulta@javiergimenezturrillas.com**

WhatsApp: no hay número confirmado → no mostrar botón WhatsApp.

---

## 3. Textos finales — Home (`/`)

### Meta

- **Title:** Clínica dental · Javier Giménez Turrillas · San Sebastián-Donostia
- **Description:** Clínica dental del doctor Javier Giménez Turrillas en San Sebastián-Donostia. Pide cita por teléfono o escribe un mensaje.

### Cabecera (compartida)

- Marca: Clínica dental Javier Giménez Turrillas
- CTA cabecera: Pedir cita

### Hero (primer pantallazo)

- **h1:** Clínica dental en San Sebastián-Donostia
- **Apoyo (1–2 frases):**  
  Soy el doctor Javier Giménez Turrillas. Aquí te atienden con calma, te explican qué ven y puedes preguntar sin prisa.
- **CTA primario:** Pedir cita
- **CTA secundario:** Llamar
- **Bloque imagen:** [Foto pendiente] — pie: «Foto pendiente»

### Sección — Cómo te ayudamos

- **Etiqueta de sección (opcional, 14 px):** Qué hacemos
- **h2:** Revisión, diagnóstico y un plan claro
- **Párrafo:**  
  Empezamos por escucharte y revisar tu boca. Después te contamos qué hay y qué opciones tienes, en lenguaje sencillo. Si hace falta un tratamiento concreto, lo vemos contigo antes de decidir.
- **Nota de hueco (visible, no inventar listado):**  
  Tratamientos concretos: pendiente de confirmar con la clínica.
- **CTA:** Pedir cita

### Sección — Si te da reparo venir

- **h2:** Puedes venir solo a preguntar
- **Párrafo:**  
  No hace falta que tengas claro el problema. En la primera visita miramos, te explicamos y dejas las dudas sobre la mesa. Tú decides el siguiente paso.
- **CTA primario:** Pedir cita  
- **CTA secundario:** Escribir

### Sección — Dónde estamos

- **h2:** En el centro de San Sebastián-Donostia
- **Párrafo:**  
  Calle Loyola, 15 1 Dcha, 20005 San Sebastián-Donostia, SS
- **Líneas de contacto:**  
  Teléfono: 943 42 82 24  
  Email: consulta@javiergimenezturrillas.com
- **CTA:** Cómo llegar · Pedir cita

### Sección puente — Conoce la clínica

- **h2:** Quién te atiende
- **Párrafo:**  
  La clínica la dirige el doctor Javier Giménez Turrillas. Si quieres saber cómo trabajamos y qué esperar al llegar, está en Sobre nosotros.
- **CTA:** Ver cómo trabajamos

### Pie (compartido)

- Clínica dental del doctor Javier Giménez Turrillas
- Calle Loyola, 15 1 Dcha, 20005 San Sebastián-Donostia, SS
- 943 42 82 24
- consulta@javiergimenezturrillas.com
- Enlaces: Inicio · Sobre nosotros · Contacto
- Legales (cuando existan): Aviso legal · Privacidad · Cookies
- Hueco: Horario pendiente de confirmar

---

## 4. Textos finales — Sobre nosotros (`/sobre-nosotros`)

### Meta

- **Title:** Sobre nosotros · Clínica dental Javier Giménez Turrillas · San Sebastián-Donostia
- **Description:** Conoce la clínica dental del doctor Javier Giménez Turrillas en San Sebastián-Donostia y cómo te atendemos.

### Hero de página

- **h1:** Sobre la clínica
- **Párrafo:**  
  Somos una clínica dental en San Sebastián-Donostia. El doctor Javier Giménez Turrillas dirige el cuidado de cada paciente con un trato cercano y explicaciones claras.

### Sección — El doctor

- **h2:** Doctor Javier Giménez Turrillas
- **Párrafo:**  
  Te atiende el doctor Javier Giménez Turrillas. El objetivo es que entiendas qué ocurre en tu boca y qué opciones tienes, sin prisas y sin tecnicismos de más.
- **Huecos visibles:**
  - [Foto pendiente] — pie: «Foto del doctor pendiente»
  - Número de colegiado: pendiente
  - Formación / trayectoria: pendiente (no rellenar)
- **CTA:** Pedir cita

### Sección — Cómo es la visita

- **h2:** Qué puedes esperar al llegar
- **Párrafo:**  
  Te recibimos, hablamos de lo que te preocupa y hacemos la revisión. Te contamos lo que vemos y resolvemos dudas. Si hace falta un plan de tratamiento, lo repasamos contigo antes de seguir.
- **Nota:**  
  Duración de la visita: pendiente de confirmar.
- **CTA:** Pedir cita

### Sección — Equipo

- **h2:** El equipo
- **Párrafo:**  
  Cuando tengamos los nombres y fotos del equipo, estarán aquí.
- **Hueco:** [Bloque pendiente — equipo y fotos]

### Sección — Ubicación breve

- **h2:** En San Sebastián-Donostia
- **Párrafo:**  
  Calle Loyola, 15 1 Dcha, 20005 San Sebastián-Donostia, SS. Si quieres pedir cita o escribirnos, ve a Contacto.
- **CTA primario:** Pedir cita  
- **CTA secundario:** Llamar

---

## 5. Textos finales — Contacto (`/contacto`)

### Meta

- **Title:** Pedir cita y contacto · Clínica dental Javier Giménez Turrillas · San Sebastián-Donostia
- **Description:** Pide cita en la clínica dental del doctor Javier Giménez Turrillas. Teléfono 943 42 82 24 o escribe a consulta@javiergimenezturrillas.com.

### Hero de página

- **h1:** Pedir cita
- **Párrafo:**  
  Elige la forma que te resulte más fácil. Puedes llamar, escribir un email o dejar un mensaje con este formulario.

### Bloque — Contacto directo

- **h2:** Teléfono y email
- **Ítems:**
  - Llamar: 943 42 82 24 → `tel:+34943428224`
  - Escribir: consulta@javiergimenezturrillas.com → `mailto:consulta@javiergimenezturrillas.com`
- **CTA primario en zona:** Llamar  
- **CTA secundario:** Escribir
- **Hueco:** WhatsApp: pendiente (no mostrar botón hasta tener número)

### Bloque — Dirección

- **h2:** Dónde estamos
- **Dirección:** Calle Loyola, 15 1 Dcha, 20005 San Sebastián-Donostia, SS
- **CTA:** Cómo llegar
- **Huecos:**
  - Horario: pendiente de confirmar
  - Mapa embebido: pendiente (cuando haya URL o permiso de incrustación)

### Bloque — Formulario

- **h2:** Déjanos un mensaje
- **Párrafo de apoyo:**  
  Cuéntanos por encima qué necesitas. Te responderemos lo antes posible en el horario de la clínica.
- **Campos y etiquetas:**

  | Campo | Etiqueta | Placeholder (opcional) | Ayuda / error |
  |---|---|---|---|
  | nombre | Nombre | Tu nombre | Indica tu nombre |
  | email | Email | tu@email.com | Indica un email válido |
  | telefono | Teléfono | 600 000 000 | Indica un teléfono de contacto |
  | mensaje | Mensaje | Qué te gustaría consultar | Escribe un mensaje |

- **Privacidad (checkbox):**  
  He leído y acepto la política de privacidad.  
  (Enlazar cuando exista la página; si no existe, marcar el enlace como pendiente y no inventar el texto legal.)
- **Botón submit:** Enviar mensaje
- **Estado enviando:** Enviando…
- **Éxito:** Mensaje enviado. Te responderemos lo antes posible.
- **Error:** No se ha podido enviar. Prueba otra vez o llámanos al 943 42 82 24.

### Cierre de página

- **Frase:** Si prefieres hablarlo en persona, llama y te ayudamos a concertar la visita.
- **CTA:** Llamar

---

## 6. Barra inferior móvil (Home y Contacto, recomendada en todo el sitio)

- Primario: **Pedir cita** → `/contacto`
- Secundario: **Llamar** → `tel:+34943428224`
- Reservar ~72–80 px de padding inferior en el contenido para no tapar el pie.

---

## 7. Microcopy compartido

| Contexto | Texto |
|---|---|
| Skip link | Ir al contenido |
| Aria cabecera | Menú |
| Foto sin imagen | Foto pendiente |
| Horario vacío | Horario pendiente de confirmar |
| WhatsApp vacío | No mostrar |
| Tratamientos vacíos | Tratamientos concretos: pendiente de confirmar con la clínica |
| Colegiado | Número de colegiado: pendiente |
| Equipo | Equipo y fotos: pendiente |
| Precios | No mostrar precios hasta confirmación |
| 404 (si existe) | Esta página no está. Vuelve al inicio o pide cita. |

---

## 8. Pendientes reales (huecos visibles)

No marcar como pendiente lo ya confirmado (nombre, dirección, teléfono, email, ciudad).

| Pendiente | Dónde se muestra |
|---|---|
| Horario de apertura | Pie + Contacto |
| Número de WhatsApp | Contacto (oculto hasta tenerlo) |
| Fotos de clínica / doctor / equipo | Home hero, Sobre nosotros |
| Equipo (nombres y roles) | Sobre nosotros |
| Número de colegiado | Sobre nosotros |
| Formación / biografía del doctor | Sobre nosotros |
| Tratamientos concretos (listado) | Home |
| Precios o criterio de presupuesto | Ninguna página hasta confirmación |
| Duración de la primera visita | Sobre nosotros |
| Mapa embebido / enlace «Cómo llegar» finalizado | Contacto |
| Textos legales (aviso, privacidad, cookies) revisión profesional | Pie y checkbox del formulario |
| Envío real del formulario (backend) | Contacto |

---

## 9. Criterios de aceptación para frontend

- [ ] Primer pantallazo móvil: quién, qué, Pedir cita
- [ ] Un solo `h1` por página
- [ ] Botón primario contraste AA; foco visible
- [ ] Llamar y Escribir con datos reales clicables
- [ ] Sin WhatsApp, sin precios, sin testimonios inventados, sin fotos de stock
- [ ] Huecos pendientes etiquetados, no rellenados con invención
- [ ] Barra móvil no tapa el contenido
- [ ] Ancho contenido ≤ 1120 px; cuerpo ~65 ch
- [ ] Tipografías Source Serif 4 + Source Sans 3
- [ ] Paleta exacta de la sección 1.1
