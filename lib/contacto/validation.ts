import type {
  ContactFieldErrors,
  ContactPayload,
} from "@/lib/contacto/types";

export const CONTACT_LIMITS = {
  /** Tamaño máximo del cuerpo JSON en bytes. */
  maxBodyBytes: 16_384,
  nombre: { min: 1, max: 120 },
  email: { max: 254 },
  telefono: { minDigits: 9, maxDigits: 15, maxRaw: 40 },
  mensaje: { min: 1, max: 4_000 },
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asTrimmedString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  return value.trim();
}

function digitCount(value: string): number {
  return value.replace(/\D/g, "").length;
}

/**
 * Parsea y valida el cuerpo del formulario de contacto.
 * Alineado con `components/ContactForm.tsx`.
 */
export function parseAndValidateContactBody(
  raw: unknown,
):
  | { ok: true; data: ContactPayload }
  | { ok: false; fields: ContactFieldErrors; error: string } {
  if (!isPlainObject(raw)) {
    return {
      ok: false,
      error: "Formato de solicitud no válido",
      fields: {},
    };
  }

  const fields: ContactFieldErrors = {};

  const nombre = asTrimmedString(raw.nombre);
  const email = asTrimmedString(raw.email);
  const telefono = asTrimmedString(raw.telefono);
  const mensaje = asTrimmedString(raw.mensaje);
  const privacidad = raw.privacidad;

  if (nombre === null) {
    fields.nombre = "Indica tu nombre";
  } else if (!nombre) {
    fields.nombre = "Indica tu nombre";
  } else if (nombre.length > CONTACT_LIMITS.nombre.max) {
    fields.nombre = "El nombre es demasiado largo";
  }

  if (email === null) {
    fields.email = "Indica un email válido";
  } else if (!email || !EMAIL_RE.test(email) || email.length > CONTACT_LIMITS.email.max) {
    fields.email = "Indica un email válido";
  }

  if (telefono === null) {
    fields.telefono = "Indica un teléfono de contacto";
  } else if (!telefono) {
    fields.telefono = "Indica un teléfono de contacto";
  } else if (telefono.length > CONTACT_LIMITS.telefono.maxRaw) {
    fields.telefono = "Indica un teléfono de contacto";
  } else {
    const digits = digitCount(telefono);
    if (
      digits < CONTACT_LIMITS.telefono.minDigits ||
      digits > CONTACT_LIMITS.telefono.maxDigits
    ) {
      fields.telefono = "Indica un teléfono de contacto";
    }
  }

  if (mensaje === null) {
    fields.mensaje = "Escribe un mensaje";
  } else if (!mensaje) {
    fields.mensaje = "Escribe un mensaje";
  } else if (mensaje.length > CONTACT_LIMITS.mensaje.max) {
    fields.mensaje = "El mensaje es demasiado largo";
  }

  if (privacidad !== true) {
    fields.privacidad = "Acepta la política de privacidad";
  }

  if (Object.keys(fields).length > 0) {
    return {
      ok: false,
      error: "Revisa los campos del formulario",
      fields,
    };
  }

  return {
    ok: true,
    data: {
      nombre: nombre as string,
      email: email as string,
      telefono: telefono as string,
      mensaje: mensaje as string,
      privacidad: true,
    },
  };
}
