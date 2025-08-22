import { ColorTile } from 'src/components/ColorTile';
import { ResultsTable } from 'src/components/Results/components/ResultsTable';

import styles from './TilesAndTable.module.scss';
export const TilesAndTable = ({
  hex1,
  hex2,
  rgb1,
  rgb2,
  contrastRatio
}: TilesAndTableProps) => {
  return (
    <div className={styles.root}>
      <div className={styles['section-colors']}>
        <div className={styles['color-tiles']}>
          <ColorTile hex={hex1} rgb={rgb1} />
          <ColorTile hex={hex2} rgb={rgb2} />
        </div>
      </div>
      <div className={styles.section}>
        <ResultsTable contrast={parseFloat(contrastRatio)} />
      </div>
    </div>
  );
};

type TilesAndTableProps = {
  hex1: string;
  hex2: string;
  rgb1: number[];
  rgb2: number[];
  contrastRatio: string;
};
