import styles from './WCAG.module.scss';
export const WCAG = () => {
  return (
    <section className={styles.root}>
      <h2>WCAG Compliance Levels</h2>
      <ul>
        <li>
          <strong>WCAG AA:</strong> Minimum contrast ratio of 4.5:1 for normal
          text and 3:1 for large text.
        </li>
        <li>
          <strong>WCAG AAA:</strong> Enhanced contrast ratio of 7:1 for normal
          text and 4.5:1 for large text.
        </li>
      </ul>
      <p>
        Large text is defined as 18pt (24px) and larger, or 14pt (18.66px) and
        larger if bold.
      </p>
    </section>
  );
};
