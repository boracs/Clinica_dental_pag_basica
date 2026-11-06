import type { Metadata } from "next";
import { Atmosphere } from "@/components/Atmosphere";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Pedir cita y contacto",
  description:
    "Pide cita en la clínica dental del doctor Javier Giménez Turrillas. Teléfono 943 42 82 24 o escribe a consulta@javiergimenezturrillas.com.",
};

export default function ContactoPage() {
  return (
    <>
      <section className={styles.hero} aria-labelledby="contacto-hero-title">
        <Atmosphere src="/images/bg-contact.jpg" priority overlay="strong" />
        <div className={`container ${styles.heroCopy}`}>
          <h1 id="contacto-hero-title">Pedir cita</h1>
          <p className={`${styles.heroLead} prose-measure`}>
            Elige la forma que te resulte más fácil. Puedes llamar, escribir un
            email o dejar un mensaje con este formulario.
          </p>
        </div>
      </section>

      <section
        className={styles.contactSection}
        aria-labelledby="contacto-directo-title"
      >
        <div className={`container ${styles.contactSplit}`}>
          <div className={styles.infoSide}>
            <div className={styles.infoInner}>
              <h2 id="contacto-directo-title">Teléfono y email</h2>
              <ul className={styles.contactList}>
                <li className={styles.contactRow}>
                  <div className={styles.contactText}>
                    <span className={styles.contactLabel}>Teléfono</span>
                    <a href={site.phoneHref}>{site.phoneDisplay}</a>
                  </div>
                  <a
                    href={site.phoneHref}
                    className={`btn btn--primary ${styles.btnCompact}`}
                  >
                    Llamar
                  </a>
                </li>
                <li className={styles.contactRow}>
                  <div className={styles.contactText}>
                    <span className={styles.contactLabel}>Email</span>
                    <a href={site.emailHref}>{site.email}</a>
                  </div>
                  <a
                    href={site.emailHref}
                    className={`btn btn--secondary ${styles.btnCompact}`}
                  >
                    Escribir
                  </a>
                </li>
              </ul>

              <div className={styles.locationBlock}>
                <h2 id="contacto-direccion-title">Dónde estamos</h2>
                <div className={styles.addressRow}>
                  <p className={styles.address}>{site.address}</p>
                  <a
                    href={site.mapsHref}
                    className={`btn btn--secondary ${styles.btnCompact}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Cómo llegar
                  </a>
                </div>
                <div className={styles.schedule}>
                  <h3 className={styles.scheduleTitle}>Horario</h3>
                  <ul className={styles.scheduleList}>
                    {site.hours.days.map((item) => {
                      const closed = item.intervals.length === 0;
                      return (
                        <li
                          key={item.day}
                          className={`${styles.scheduleRow}${
                            closed ? ` ${styles.scheduleRowClosed}` : ""
                          }`}
                        >
                          <span className={styles.scheduleDay}>{item.day}</span>
                          {closed ? (
                            <span className={styles.scheduleClosed}>
                              Cerrado
                            </span>
                          ) : (
                            <span className={styles.scheduleSlots}>
                              {item.intervals.map((slot) => (
                                <span key={slot} className={styles.scheduleChip}>
                                  {slot}
                                </span>
                              ))}
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <aside className={styles.mapSide} aria-label="Ubicación en el mapa">
            <iframe
              className={styles.mapFrame}
              src={site.mapsEmbedSrc}
              title={`Mapa de ${site.nameShort}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </aside>
        </div>
      </section>

      <section
        className={styles.section}
        aria-labelledby="contacto-formulario-title"
      >
        <div className={`container ${styles.formSection}`}>
          <div className={styles.formIntro}>
            <h2 id="contacto-formulario-title">Déjanos un mensaje</h2>
            <p className={styles.formLead}>
              Cuéntanos por encima qué necesitas. Te responderemos lo antes
              posible en el horario de la clínica.
            </p>
          </div>
          <div className={styles.formWrap}>
            <ContactForm />
          </div>
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.sectionAtmosphere}`}
        aria-label="Cierre de contacto"
      >
        <Atmosphere src="/images/bg-contact.jpg" overlay="strong" />
        <div className={`container ${styles.closing}`}>
          <p>
            Si prefieres hablarlo en persona, llama y te ayudamos a concertar la
            visita.
          </p>
          <div className={styles.actions}>
            <a href={site.phoneHref} className="btn btn--primary">
              Llamar
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
