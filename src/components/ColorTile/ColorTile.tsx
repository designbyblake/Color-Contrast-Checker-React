import { useMemo } from 'react';

import { displayRGB } from '../../utilities/colors';
import styles from './ColorTile.module.scss';

export const ColorTile = ({ hexString, rgbArray }: ColorTileProps) => {
  const color = `#${hexString}`;
  const rgb = useMemo(() => {
    return displayRGB(rgbArray);
  }, [rgbArray]);

  return (
    <div className={styles.root} data-element='color-tile'>
      <div style={{ backgroundColor: color }} className={styles.block} />
      <div className={styles.label}>{hexString ? color : '-'}</div>
      <div className={styles.label}>{rgbArray ? rgb : '-'}</div>
    </div>
  );
};

interface ColorTileProps {
  hexString: string;
  rgbArray: number[];
}
