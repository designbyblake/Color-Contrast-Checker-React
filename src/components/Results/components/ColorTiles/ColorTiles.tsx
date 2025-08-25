import { ColorTile } from 'src/components/ColorTile';
import { type CombinationsType } from 'src/types/Colors';

import styles from './ColorTiles.module.scss';

export const ColorTiles = ({ hex1, hex2, rgb1, rgb2 }: CombinationsType) => {
  return (
    <div className={styles.root}>
      <ColorTile hex={hex1} rgb={rgb1} />
      <ColorTile hex={hex2} rgb={rgb2} />
    </div>
  );
};
