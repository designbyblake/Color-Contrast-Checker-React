import { type ReactNode } from 'react';

import { Button } from '../Button';
import styles from './ColorTiles.module.scss';

export const ColorTiles = ({
  children,
  addColor,
  resetColors
}: {
  children: ReactNode | ReactNode[];
  addColor(): void;
  resetColors(): void;
}) => {
  return (
    <div className={styles.root}>
      <div className={styles.colors}>{children}</div>
      <div className={styles.actions}>
        <Button onClick={addColor} buttonType='primary'>
          Add Color
        </Button>
        <Button type='button' onClick={resetColors} buttonType='secondary'>
          Reset Colors
        </Button>
      </div>
    </div>
  );
};
