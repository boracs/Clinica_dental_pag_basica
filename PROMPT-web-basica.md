# Prompt — Web básica clínica dental

Copia todo el bloque de abajo y pégalo en el chat cuando quieras que construya la web de una vez.

```
Quiero que construyas ahora la web básica de la Clínica dental del doctor Javier Giménez Turrillas.

## Datos reales (usar sí o sí)
- Nombre: Clínica dental del doctor Javier Giménez Turrillas
- Dirección: Calle Loyola, 15 1 Dcha, 20005 San Sebastián-Donostia, SS
- Teléfono: 943 42 82 24
- Email: consulta@javiergimenezturrillas.com

No inventes horarios, WhatsApp, fotos, equipo, tratamientos concretos, precios ni número de colegiado. Esos quedan como pendientes con hueco visible.

## Cómo trabajar
1. Si no existen, crea primero estos dos agentes del proyecto con el subagente arquitecto-agentes:
   - frontend: Next.js + TypeScript + CSS, accesibilidad, móvil primero, componentes limpios.
   - backend: rutas API, formulario de contacto, validación, envío seguro hacia consulta@javiergimenezturrillas.com, sin inventar servicios ni secretos.
2. Usa el subagente marketing-diseno-clinica para decidir diseño, paleta, tipografía, jerarquía, botones y todos los textos.
3. Usa el subagente frontend para implementar las páginas.
4. Usa el subagente backend solo para lo necesario del contacto (API del formulario). No montes login, panel ni base de datos de pacientes.
5. Revisa la home, Sobre nosotros y Contacto en móvil y escritorio antes de darlo por terminado.

## Alcance
Una web sencilla y profesional con exactamente estas páginas:

1. Home (`/`)
   - Primer pantallazo: quién es la clínica, qué ofrece y un CTA claro de pedir cita / contacto.
   - Secciones cortas: servicios principales, por qué confiar, y puente a Sobre nosotros y Contacto.
   - Teléfono y email reales, clicables, en cabecera o pie.
   - Un solo foco por sección. Sin relleno.

2. Sobre nosotros (`/sobre-nosotros`)
   - Quiénes sois, enfoque de la clínica y trato al paciente en San Sebastián-Donostia.
   - El doctor Javier Giménez Turrillas como figura principal, sin inventar biografía.
   - Huecos visibles para foto del equipo y datos profesionales pendientes.
   - Tono cercano y profesional, sin eslóganes vacíos.

3. Contacto (`/contacto`)
   - Apartado moderno y profesional: formulario (nombre, email, teléfono, mensaje).
   - Mostrar dirección, teléfono y email reales.
   - CTA principal + Llamar + Escribir.
   - Huecos para mapa, horarios y WhatsApp, sin inventarlos.
   - Validación clara, estados de envío y mensaje de éxito/error.

## Criterio de diseño y redacción
Aplica tal cual el criterio del agente marketing-diseno-clinica:
- Paleta, tipografía, espaciado, botones y redacción definidos por ese agente.
- Español de España, de tú, frases cortas, tranquilizador.
- Móvil primero. Pedir cita / contactar fácil de encontrar.
- Nada de stock genérico fingiendo ser la clínica.

## Stack y entrega
- Next.js + TypeScript.
- Código limpio, listo para abrir en local.
- Al terminar, dime:
  1. Cómo arrancar la web.
  2. Qué páginas hay y qué hace cada una.
  3. Lista corta de pendientes reales (horarios, WhatsApp, fotos, equipo, tratamientos, precios).

No amplíes el alcance. No añadas blog, tienda, login, reservas online complejas ni más páginas.
```
