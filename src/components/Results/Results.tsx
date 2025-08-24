import { Result } from 'src/components/Results/components';
import { type ColorsType } from 'src/types/Colors';

import { useCombinations } from './hooks/useCombinations';
import styles from './Results.module.scss';

export const Results = ({ colors }: { colors: ColorsType[] }) => {
  const { combinations } = useCombinations(colors);

  return (
    <div id='contrast-results' className={styles.root}>
      <h2>Contrast Results</h2>
      {combinations?.map((combination) => {
        const { hex1, hex2, rgb1, rgb2 } = combination;
        return (
          <Result
            key={`${hex1} ${hex2}`}
            hex1={hex1}
            hex2={hex2}
            rgb1={rgb1}
            rgb2={rgb2}
          />
        );
      })}
    </div>
  );
};
