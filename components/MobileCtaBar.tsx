import Link from "next/link";
import { site } from "@/lib/site";
import styles from "./MobileCtaBar.module.css";

export function MobileCtaBar() {
  return (
    <div className={styles.bar} role="region" aria-label="Acciones rápidas">
      <Link href="/contacto" className="btn btn--primary">
        Pedir cita
      </Link>
      <a href={site.phoneHref} className="btn btn--secondary">
        Llamar
      </a>
    </div>
  );
}
