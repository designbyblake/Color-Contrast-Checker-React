import { ColorTiles, ResultsTable } from 'src/components/Results/components';
import { type TilesAndTableType } from 'src/types/Colors';

import styles from './TilesAndTable.module.scss';
export const TilesAndTable = ({
  hex1,
  hex2,
  rgb1,
  rgb2,
  contrastRatio
}: TilesAndTableType) => {
  return (
    <div className={styles.root}>
      <div className={styles['section-colors']}>
        <ColorTiles hex1={hex1} rgb1={rgb1} hex2={hex2} rgb2={rgb2} />
      </div>
      <div className={styles.section}>
        <ResultsTable contrast={contrastRatio} />
      </div>
    </div>
  );
};
