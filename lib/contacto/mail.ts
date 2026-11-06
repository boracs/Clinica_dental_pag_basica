import { site } from "@/lib/site";
import type { ContactPayload } from "@/lib/contacto/types";

export const CONTACT_TO_DEFAULT = "consulta@javiergimenezturrillas.com";

export type MailSendResult =
  | { ok: true; mode: "log" | "webhook" }
  | { ok: false; reason: "not_configured" | "send_failed" };

function escapeForEmail(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Destinatario fijo de la clínica; no se redirige a otro buzón. */
function resolveContactTo(): string {
  const fromEnv = process.env.CONTACT_TO?.trim();
  if (
    fromEnv &&
    fromEnv.toLowerCase() !== CONTACT_TO_DEFAULT.toLowerCase()
  ) {
    console.warn(
      "[contacto] CONTACT_TO ignorado: el destinatario fijo es",
      CONTACT_TO_DEFAULT,
    );
  }
  return site.email || CONTACT_TO_DEFAULT;
}

function buildPlainBody(data: ContactPayload): string {
  return [
    "Nuevo mensaje desde el formulario web",
    "",
    `Nombre: ${data.nombre}`,
    `Email: ${data.email}`,
    `Teléfono: ${data.telefono}`,
    "",
    "Mensaje:",
    data.mensaje,
    "",
    `Privacidad aceptada: sí`,
  ].join("\n");
}

function buildHtmlBody(data: ContactPayload): string {
  return [
    "<p>Nuevo mensaje desde el formulario web</p>",
    "<ul>",
    `<li><strong>Nombre:</strong> ${escapeForEmail(data.nombre)}</li>`,
    `<li><strong>Email:</strong> ${escapeForEmail(data.email)}</li>`,
    `<li><strong>Teléfono:</strong> ${escapeForEmail(data.telefono)}</li>`,
    "</ul>",
    `<p><strong>Mensaje:</strong></p>`,
    `<p>${escapeForEmail(data.mensaje).replace(/\n/g, "<br />")}</p>`,
    "<p>Privacidad aceptada: sí</p>",
  ].join("");
}

/**
 * Envía el mensaje de contacto.
 *
 * Modos (ver `.env.example`):
 * - `CONTACT_MAIL_MODE=log`: no envía; registra un resumen sin PII completa (desarrollo).
 * - `CONTACT_WEBHOOK_URL`: POST genérico a un webhook que tú configures
 *   (Zapier, Make, worker propio, etc.) para reenviar a la consulta.
 *
 * No hay proveedor de email concreto cableado. Si no hay modo usable → not_configured.
 */
export async function sendContactMail(
  data: ContactPayload,
): Promise<MailSendResult> {
  const mode = (process.env.CONTACT_MAIL_MODE || "").trim().toLowerCase();
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL?.trim();
  const to = resolveContactTo();

  if (mode === "log") {
    // Resumen sin volcar email/teléfono/mensaje completos.
    console.info("[contacto] Modo log: mensaje validado", {
      to,
      nombreLen: data.nombre.length,
      emailDomain: data.email.includes("@")
        ? data.email.split("@").pop()
        : "(invalid)",
      telefonoDigits: data.telefono.replace(/\D/g, "").length,
      mensajeLen: data.mensaje.length,
    });
    return { ok: true, mode: "log" };
  }

  if (webhookUrl) {
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };

      const token = process.env.CONTACT_WEBHOOK_TOKEN?.trim();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const from = process.env.CONTACT_FROM?.trim() || to;

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers,
        body: JSON.stringify({
          to,
          from,
          subject: `Contacto web: ${data.nombre}`.slice(0, 160),
          text: buildPlainBody(data),
          html: buildHtmlBody(data),
          replyTo: data.email,
          fields: {
            nombre: data.nombre,
            email: data.email,
            telefono: data.telefono,
            mensaje: data.mensaje,
            privacidad: true,
          },
        }),
      });

      if (!response.ok) {
        console.error("[contacto] Webhook respondió error", {
          status: response.status,
        });
        return { ok: false, reason: "send_failed" };
      }

      return { ok: true, mode: "webhook" };
    } catch {
      console.error("[contacto] Fallo al llamar al webhook");
      return { ok: false, reason: "send_failed" };
    }
  }

  return { ok: false, reason: "not_configured" };
}
