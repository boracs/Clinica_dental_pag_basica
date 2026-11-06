export type ContactPayload = {
  nombre: string;
  email: string;
  telefono: string;
  mensaje: string;
  privacidad: boolean;
};

export type ContactFieldName =
  | "nombre"
  | "email"
  | "telefono"
  | "mensaje"
  | "privacidad";

export type ContactFieldErrors = Partial<Record<ContactFieldName, string>>;

export type ContactSuccessResponse = {
  ok: true;
  message: string;
};

export type ContactErrorResponse = {
  ok: false;
  error: string;
  fields?: ContactFieldErrors;
};
