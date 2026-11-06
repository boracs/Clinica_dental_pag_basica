import Link from "next/link";
import { site } from "@/lib/site";
import styles from "./BrandLogo.module.css";

type BrandLogoProps = {
  variant?: "header" | "footer";
  href?: string;
  onNavigate?: () => void;
};

export function BrandLogo({
  variant = "header",
  href = "/",
  onNavigate,
}: BrandLogoProps) {
  const isFooter = variant === "footer";

  return (
    <Link
      href={href}
      className={styles.root}
      data-variant={variant}
      aria-label={site.nameShort}
      onClick={onNavigate}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={`${styles.mark} ${isFooter ? styles.markLg : ""}`}
        src={site.brand.mark}
        alt=""
        width={isFooter ? 48 : 40}
        height={isFooter ? 48 : 40}
        decoding="async"
      />
      <span className={styles.text}>
        {isFooter ? (
          <span className={styles.name}>{site.nameFull}</span>
        ) : (
          <span className={styles.name}>
            <span className={styles.nameFull}>{site.nameShort}</span>
            <span className={styles.nameShort}>{site.nameMobile}</span>
          </span>
        )}
      </span>
    </Link>
  );
}
