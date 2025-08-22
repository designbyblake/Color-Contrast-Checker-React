import { clsx } from 'clsx';
import { IoCheckmarkCircleSharp, IoCloseCircleSharp } from 'react-icons/io5';

import styles from './ResultCell.module.scss';

export const ResultCell = ({ didPass }: { didPass: boolean }) => {
  return (
    <div className={styles.result}>
      {didPass ? (
        <>
          <IoCheckmarkCircleSharp
            className={clsx(styles.pass, styles.icon)}
            aria-hidden={true}
          />
          <span className={styles['result-text']}>Pass</span>
        </>
      ) : (
        <>
          <IoCloseCircleSharp
            className={clsx(styles.fail, styles.icon)}
            aria-hidden={true}
          />
          <span className={styles['result-text']}>Fail</span>
        </>
      )}
    </div>
  );
};
