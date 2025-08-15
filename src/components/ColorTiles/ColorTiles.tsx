import { type ReactNode } from 'react';

import styles from './ColorTiles.module.scss';

export const ColorTiles = ({
  children,

  addColor
}: IColorTiles) => {
  return (
    <div className={styles.root}>
      <div className={styles.colors}>{children}</div>
      <div>
        <button type='button' onClick={addColor}>
          Add Color
        </button>
      </div>
    </div>
  );
};

interface IColorTiles {
  children: ReactNode | ReactNode[];
  addColor(): void;
}
