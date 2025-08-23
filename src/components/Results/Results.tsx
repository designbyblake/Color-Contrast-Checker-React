import { ContrastExample } from 'src/components/Results/components';
import { type TColors } from 'src/types/Colors';

import { TilesAndTable } from './components/TilesAndTable';
import { useContrast } from './hooks/useContrast';
import styles from './Results.module.scss';
export const Results = ({ colors }: { colors: TColors[] }) => {
  const { contrastRatio } = useContrast(colors);

  return (
    <div id='contrast-results' className={styles.root}>
      <h2>Contrast Results</h2>
      {contrastRatio?.map((ratio) => {
        return (
          <div
            className={styles['results-group']}
            key={`${ratio.color1} ${ratio.color2}`}
          >
            <h2>Color Contrast is {ratio.contrast}:1</h2>
            <TilesAndTable
              hex1={ratio.color1}
              hex2={ratio.color2}
              rgb1={ratio.color1rgb}
              rgb2={ratio.color2rgb}
              contrastRatio={ratio.contrast}
            />
            <ContrastExample color1={ratio.color1} color2={ratio.color2} />
          </div>
        );
      })}
    </div>
  );
};
