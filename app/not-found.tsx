import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <section
      className={`container ${styles.section}`}
      aria-labelledby="not-found-title"
    >
      <h1 id="not-found-title">Esta página no está</h1>
      <p className={styles.text}>Vuelve al inicio o pide cita.</p>
      <div className={`btn-group ${styles.actions}`}>
        <Link href="/" className="btn btn--secondary">
          Volver al inicio
        </Link>
        <Link href="/contacto" className="btn btn--primary">
          Pedir cita
        </Link>
      </div>
    </section>
  );
}
