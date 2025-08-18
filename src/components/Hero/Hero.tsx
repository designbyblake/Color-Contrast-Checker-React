import { IoAccessibility } from "react-icons/io5";

import styles from './Hero.module.scss';
export const Hero = () => {
  return (
    <section className={styles.hero}>
      <h1><IoAccessibility aria-hidden={true} /><span className={styles.heading}>Contrast Checker</span></h1>
      <p>
        Check the contrast ratio between two colors to ensure your text is
        readable.
      </p>
    </section>
  );
}