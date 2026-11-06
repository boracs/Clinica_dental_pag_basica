import Image from "next/image";
import styles from "./Atmosphere.module.css";

type AtmosphereProps = {
  src: string;
  /** Decorative background — empty alt by design. */
  priority?: boolean;
  overlay?: "soft" | "strong" | "left";
  className?: string;
};

export function Atmosphere({
  src,
  priority = false,
  overlay = "soft",
  className,
}: AtmosphereProps) {
  const overlayClass =
    overlay === "strong"
      ? styles.overlayStrong
      : overlay === "left"
        ? styles.overlayLeft
        : styles.overlaySoft;

  return (
    <div className={`${styles.root} ${className ?? ""}`.trim()} aria-hidden="true">
      <Image
        src={src}
        alt=""
        fill
        priority={priority}
        sizes="100vw"
        className={styles.image}
      />
      <div className={`${styles.overlay} ${overlayClass}`} />
    </div>
  );
}
