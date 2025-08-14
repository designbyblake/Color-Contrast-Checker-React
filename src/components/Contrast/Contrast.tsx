import styles from './Contrast.module.scss';

export const Contrast = ({ color1, color2 }: IContrast) => {
  return (
    <div className={styles.root}>
      <div
        className={styles['text-example']}
        style={{
          backgroundColor: `#${color1}`
        }}
      >
        <p
          className={styles['text-large']}
          style={{
            color: `#${color2}`
          }}
        >
          Large Sample Text 18pt or 24px
        </p>
        <p
          className={styles.text}
          style={{
            color: `#${color2}`
          }}
        >
          Small sample text at 14pt or 18px
        </p>
        <p
          className={styles.text}
          style={{
            color: `#${color2}`
          }}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </div>
    </div>
  );
};

interface IContrast {
  color1: string;
  color2: string;
}
