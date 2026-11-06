import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Atmosphere } from "@/components/Atmosphere";
import { site } from "@/lib/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title:
    "Clínica dental · Javier Giménez Turrillas · San Sebastián-Donostia",
  description:
    "Clínica dental del doctor Javier Giménez Turrillas en San Sebastián-Donostia. Pide cita por teléfono o escribe un mensaje.",
};

export default function HomePage() {
  return (
    <>
      <section className={styles.hero} aria-labelledby="home-hero-title">
        <Atmosphere
          src="/images/bg-home-hero.jpg"
          priority
          overlay="left"
        />
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <h1 id="home-hero-title">
              Clínica dental en San Sebastián-Donostia
            </h1>
            <p className={`${styles.heroLead} prose-measure`}>
              Soy el doctor Javier Giménez Turrillas. Aquí te atienden con
              calma, te explican qué ven y puedes preguntar sin prisa.
            </p>
            <div className={`btn-group ${styles.heroActions}`}>
              <Link href="/contacto" className="btn btn--primary btn--block">
                Pedir cita
              </Link>
              <a href={site.phoneHref} className="btn btn--secondary btn--block">
                Llamar
              </a>
            </div>
          </div>

          <figure className={styles.photoBlock}>
            <Image
              src="/images/clinic-generic.jpg"
              alt="Gabinete dental moderno y luminoso"
              width={1200}
              height={900}
              className={styles.photo}
              sizes="(min-width: 900px) 40vw, 100vw"
              priority
            />
            <figcaption className={styles.photoLabel}>
              Imagen de prueba · Foto de la clínica: pendiente
            </figcaption>
          </figure>
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.sectionAfterHero}`}
        aria-labelledby="home-help-title"
      >
        <div className={`container ${styles.sectionSplit}`}>
          <div className={styles.sectionTitle}>
            <span className="section-label">Qué hacemos</span>
            <h2 id="home-help-title">Revisión y un plan claro</h2>
          </div>
          <div className={styles.sectionBody}>
            <p>
              Empezamos por escucharte y revisar tu boca. Después te contamos
              qué hay y qué opciones tienes, en lenguaje sencillo. Si hace falta
              un tratamiento concreto, lo vemos contigo antes de decidir.
            </p>
            <p className={`pending-note ${styles.gapNote}`}>
              Tratamientos concretos: pendiente de confirmar con la clínica.
            </p>
            <div className={styles.actions}>
              <Link href="/contacto" className="btn btn--primary">
                Pedir cita
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.sectionAtmosphere}`}
        aria-labelledby="home-reparo-title"
      >
        <Atmosphere src="/images/bg-home-calm.jpg" overlay="soft" />
        <div className={`container ${styles.sectionCentered}`}>
          <span className="section-label">Primera visita</span>
          <h2 id="home-reparo-title">Puedes venir solo a preguntar</h2>
          <p>
            No hace falta que tengas claro el problema. En la primera visita
            miramos, te explicamos y dejas las dudas sobre la mesa. Tú decides
            el siguiente paso.
          </p>
          <div className={`btn-group ${styles.centeredActions}`}>
            <Link href="/contacto" className="btn btn--primary">
              Pedir cita
            </Link>
            <a href={site.emailHref} className="btn btn--secondary">
              Escribir
            </a>
          </div>
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.sectionSurface}`}
        aria-labelledby="home-location-title"
      >
        <div className={`container ${styles.locationSection}`}>
          <div className={styles.sectionTitle}>
            <span className="section-label">Dónde</span>
            <h2 id="home-location-title">En el centro de Donostia</h2>
          </div>
          <div className={styles.locationCard}>
            <div className={styles.locationInfo}>
              <p className={styles.address}>{site.address}</p>
              <ul className={styles.contactLines}>
                <li>
                  <span className={styles.contactLabel}>Teléfono</span>
                  <a href={site.phoneHref}>{site.phoneDisplay}</a>
                </li>
                <li>
                  <span className={styles.contactLabel}>Email</span>
                  <a href={site.emailHref}>{site.email}</a>
                </li>
                <li>
                  <span className={styles.contactLabel}>Horario</span>
                  <span>{site.hours.summary}</span>
                </li>
              </ul>
            </div>
            <div className={styles.locationActions}>
              <a
                href={site.mapsHref}
                className="btn btn--secondary btn--block"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cómo llegar
              </a>
              <Link href="/contacto" className="btn btn--primary btn--block">
                Pedir cita
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.sectionDoctor}`}
        aria-labelledby="home-bridge-title"
      >
        <div className={`container ${styles.doctorSplit}`}>
          <figure className={styles.photoBlock}>
            <Image
              src="/images/doctor-generic.jpg"
              alt="Dentista atendiendo a un paciente en el gabinete, visto de espalda"
              width={1200}
              height={900}
              className={styles.photo}
              sizes="(min-width: 768px) 46vw, 100vw"
            />
            <figcaption className={styles.photoLabel}>
              Atención en el gabinete · Foto del doctor: pendiente
            </figcaption>
          </figure>
          <div className={styles.doctorCopy}>
            <span className="section-label">El doctor</span>
            <h2 id="home-bridge-title">Quién te atiende</h2>
            <p>
              La clínica la dirige el doctor Javier Giménez Turrillas. Si
              quieres saber cómo trabajamos y qué esperar al llegar, está en{" "}
              <Link href="/sobre-nosotros" className="text-link">
                Sobre nosotros
              </Link>
              .
            </p>
            <div className={styles.actions}>
              <Link href="/sobre-nosotros" className="btn btn--secondary">
                Ver cómo trabajamos
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
