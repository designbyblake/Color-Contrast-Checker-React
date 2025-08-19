import { type ReactNode } from 'react';

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
      <div>
        <button type='button' onClick={addColor}>
          Add Color
        </button>
        <button type='button' onClick={resetColors}>
          Reset Colors
        </button>
      </div>
    </div>
  );
};
