import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Atmosphere } from "@/components/Atmosphere";
import { site } from "@/lib/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Sobre nosotros",
  description:
    "Conoce la clínica dental del doctor Javier Giménez Turrillas en San Sebastián-Donostia y cómo te atendemos.",
};

export default function SobreNosotrosPage() {
  return (
    <>
      <section className={styles.hero} aria-labelledby="about-hero-title">
        <Atmosphere src="/images/bg-about-hero.jpg" priority overlay="left" />
        <div className={`container ${styles.heroCopy}`}>
          <h1 id="about-hero-title">Sobre la clínica</h1>
          <p className={`${styles.heroLead} prose-measure`}>
            Somos una clínica dental en San Sebastián-Donostia. El doctor Javier
            Giménez Turrillas dirige el cuidado de cada paciente con un trato
            cercano y explicaciones claras.
          </p>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="about-doctor-title">
        <div className={`container ${styles.doctorGrid}`}>
          <div className={styles.doctorCopy}>
            <h2 id="about-doctor-title">Doctor Javier Giménez Turrillas</h2>
            <p>
              Te atiende el doctor Javier Giménez Turrillas. El objetivo es que
              entiendas qué ocurre en tu boca y qué opciones tienes, sin prisas
              y sin tecnicismos de más.
            </p>
            <ul className={styles.pendingList}>
              <li>Número de colegiado: pendiente</li>
              <li>Formación / trayectoria: pendiente</li>
            </ul>
            <div className={styles.actions}>
              <Link href="/contacto" className="btn btn--primary">
                Pedir cita
              </Link>
            </div>
          </div>

          <figure className={styles.photoBlock}>
            <Image
              src="/images/doctor-generic.jpg"
              alt="Dentista atendiendo a un paciente en el gabinete, visto de espalda"
              width={1200}
              height={900}
              className={styles.photo}
              sizes="(min-width: 900px) 40vw, 100vw"
            />
            <figcaption className={styles.photoLabel}>
              Atención en el gabinete · Foto del doctor: pendiente
            </figcaption>
          </figure>
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.sectionAtmosphere}`}
        aria-labelledby="about-visit-title"
      >
        <Atmosphere src="/images/bg-home-calm.jpg" overlay="soft" />
        <div className={`container ${styles.sectionInner}`}>
          <h2 id="about-visit-title">Qué puedes esperar al llegar</h2>
          <p>
            Te recibimos, hablamos de lo que te preocupa y hacemos la revisión.
            Te contamos lo que vemos y resolvemos dudas. Si hace falta un plan
            de tratamiento, lo repasamos contigo antes de seguir.
          </p>
          <p className={`pending-note ${styles.gapNote}`}>
            Duración de la visita: pendiente de confirmar.
          </p>
          <div className={styles.actions}>
            <Link href="/contacto" className="btn btn--primary">
              Pedir cita
            </Link>
          </div>
        </div>
      </section>

      <section
        className={styles.section}
        aria-labelledby="about-location-title"
      >
        <div className={`container ${styles.locationBlock}`}>
          <div className={styles.sectionInner}>
            <h2 id="about-location-title">En San Sebastián-Donostia</h2>
            <p>
              {site.address}. Si quieres pedir cita o escribirnos, ve a{" "}
              <Link href="/contacto" className="text-link">
                Contacto
              </Link>
              .
            </p>
          </div>
          <figure className={styles.portalBlock}>
            <Image
              src="/images/portal-clinica.png"
              alt="Portal de acceso a Calle Loyola, 15, San Sebastián-Donostia"
              width={1200}
              height={900}
              className={styles.portalPhoto}
              sizes="(min-width: 768px) 40vw, 100vw"
            />
            <figcaption className={styles.photoLabel}>
              Entrada · Calle Loyola, 15
            </figcaption>
          </figure>
        </div>
      </section>
    </>
  );
}
