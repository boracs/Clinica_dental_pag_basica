"use client";

import { useId, useState, type FormEvent } from "react";
import { site } from "@/lib/site";
import styles from "./ContactForm.module.css";

type FieldName = "nombre" | "email" | "telefono" | "mensaje" | "privacidad";

type FormValues = {
  nombre: string;
  email: string;
  telefono: string;
  mensaje: string;
  privacidad: boolean;
};

type FieldErrors = Partial<Record<FieldName, string>>;

type SubmitState = "idle" | "submitting" | "success" | "serverError" | "demo";

/**
 * Vista previa / demo: el formulario no envía mensajes todavía.
 * Pon `false` cuando el envío real (PHP/SMTP o API) esté listo.
 */
const FORM_DEMO_MODE = true;

const initialValues: FormValues = {
  nombre: "",
  email: "",
  telefono: "",
  mensaje: "",
  privacidad: false,
};

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 9;
}

function validate(values: FormValues): FieldErrors {
  const errors: FieldErrors = {};

  if (!values.nombre.trim()) {
    errors.nombre = "Indica tu nombre";
  }

  if (!values.email.trim() || !isValidEmail(values.email.trim())) {
    errors.email = "Indica un email válido";
  }

  if (!values.telefono.trim() || !isValidPhone(values.telefono)) {
    errors.telefono = "Indica un teléfono de contacto";
  }

  if (!values.mensaje.trim()) {
    errors.mensaje = "Escribe un mensaje";
  }

  if (!values.privacidad) {
    errors.privacidad = "Acepta la política de privacidad";
  }

  return errors;
}

export function ContactForm() {
  const formId = useId();
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const isSubmitting = submitState === "submitting";

  function updateField<K extends keyof FormValues>(
    field: K,
    value: FormValues[K],
  ) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field as FieldName]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as FieldName];
        return next;
      });
    }
    if (submitState === "serverError" || submitState === "success") {
      setSubmitState("idle");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitState("idle");
      const firstInvalid = (
        Object.keys(nextErrors) as FieldName[]
      )[0];
      const el = document.getElementById(`${formId}-${firstInvalid}`);
      el?.focus();
      return;
    }

    if (FORM_DEMO_MODE) {
      setSubmitState("demo");
      return;
    }

    setSubmitState("submitting");

    try {
      const response = await fetch("/contacto.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: values.nombre.trim(),
          email: values.email.trim(),
          telefono: values.telefono.trim(),
          mensaje: values.mensaje.trim(),
          privacidad: values.privacidad,
        }),
      });

      if (!response.ok) {
        setSubmitState("serverError");
        return;
      }

      setValues(initialValues);
      setErrors({});
      setSubmitState("success");
    } catch {
      setSubmitState("serverError");
    }
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      noValidate
      aria-describedby={
        submitState === "success"
          ? `${formId}-success`
          : submitState === "serverError"
            ? `${formId}-server-error`
            : submitState === "demo"
              ? `${formId}-demo`
              : undefined
      }
    >
      <div className={styles.fieldRow}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor={`${formId}-nombre`}>
            Nombre
          </label>
          <input
            id={`${formId}-nombre`}
            className={`${styles.input}${errors.nombre ? ` ${styles.inputInvalid}` : ""}`}
            name="nombre"
            type="text"
            autoComplete="name"
            placeholder="Tu nombre"
            value={values.nombre}
            onChange={(e) => updateField("nombre", e.target.value)}
            aria-invalid={errors.nombre ? true : undefined}
            aria-describedby={
              errors.nombre ? `${formId}-nombre-error` : undefined
            }
            disabled={isSubmitting}
          />
          {errors.nombre ? (
            <p
              id={`${formId}-nombre-error`}
              className={styles.error}
              role="alert"
            >
              {errors.nombre}
            </p>
          ) : null}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor={`${formId}-email`}>
            Email
          </label>
          <input
            id={`${formId}-email`}
            className={`${styles.input}${errors.email ? ` ${styles.inputInvalid}` : ""}`}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="tu@email.com"
            value={values.email}
            onChange={(e) => updateField("email", e.target.value)}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={
              errors.email ? `${formId}-email-error` : undefined
            }
            disabled={isSubmitting}
          />
          {errors.email ? (
            <p
              id={`${formId}-email-error`}
              className={styles.error}
              role="alert"
            >
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className={`${styles.field} ${styles.fieldHalf}`}>
        <label className={styles.label} htmlFor={`${formId}-telefono`}>
          Teléfono
        </label>
        <input
          id={`${formId}-telefono`}
          className={`${styles.input}${errors.telefono ? ` ${styles.inputInvalid}` : ""}`}
          name="telefono"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="600 000 000"
          value={values.telefono}
          onChange={(e) => updateField("telefono", e.target.value)}
          aria-invalid={errors.telefono ? true : undefined}
          aria-describedby={
            errors.telefono ? `${formId}-telefono-error` : undefined
          }
          disabled={isSubmitting}
        />
        {errors.telefono ? (
          <p
            id={`${formId}-telefono-error`}
            className={styles.error}
            role="alert"
          >
            {errors.telefono}
          </p>
        ) : null}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor={`${formId}-mensaje`}>
          Mensaje
        </label>
        <textarea
          id={`${formId}-mensaje`}
          className={`${styles.textarea}${errors.mensaje ? ` ${styles.textareaInvalid}` : ""}`}
          name="mensaje"
          rows={4}
          placeholder="Qué te gustaría consultar"
          value={values.mensaje}
          onChange={(e) => updateField("mensaje", e.target.value)}
          aria-invalid={errors.mensaje ? true : undefined}
          aria-describedby={
            errors.mensaje ? `${formId}-mensaje-error` : undefined
          }
          disabled={isSubmitting}
        />
        {errors.mensaje ? (
          <p
            id={`${formId}-mensaje-error`}
            className={styles.error}
            role="alert"
          >
            {errors.mensaje}
          </p>
        ) : null}
      </div>

      <div className={styles.field}>
        <div className={styles.privacy}>
          <span className={styles.checkboxHit}>
            <input
              id={`${formId}-privacidad`}
              className={styles.checkbox}
              name="privacidad"
              type="checkbox"
              checked={values.privacidad}
              onChange={(e) => updateField("privacidad", e.target.checked)}
              aria-invalid={errors.privacidad ? true : undefined}
              aria-describedby={
                errors.privacidad ? `${formId}-privacidad-error` : undefined
              }
              disabled={isSubmitting}
            />
          </span>
          <label
            className={styles.privacyLabel}
            htmlFor={`${formId}-privacidad`}
          >
            He leído y acepto la política de privacidad.{" "}
            <span className={styles.privacyPending}>
              (Enlace a política: pendiente)
            </span>
          </label>
        </div>
        {errors.privacidad ? (
          <p
            id={`${formId}-privacidad-error`}
            className={styles.error}
            role="alert"
          >
            {errors.privacidad}
          </p>
        ) : null}
      </div>

      <div className={styles.submitWrap}>
        <button
          type="submit"
          className="btn btn--primary btn--block"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando…" : "Enviar mensaje"}
        </button>

        {submitState === "success" ? (
          <p
            id={`${formId}-success`}
            className={styles.statusSuccess}
            role="status"
          >
            Mensaje enviado. Te responderemos lo antes posible.
          </p>
        ) : null}

        {submitState === "serverError" ? (
          <p
            id={`${formId}-server-error`}
            className={styles.statusError}
            role="alert"
          >
            No se ha podido enviar. Prueba otra vez o llámanos al{" "}
            <a href={site.phoneHref}>{site.phoneDisplay}</a>.
          </p>
        ) : null}

        {submitState === "demo" ? (
          <p
            id={`${formId}-demo`}
            className={styles.statusDemo}
            role="status"
          >
            Esto es una demo: el formulario todavía no envía mensajes
            (pendiente de implementar).
          </p>
        ) : null}
      </div>
    </form>
  );
}
