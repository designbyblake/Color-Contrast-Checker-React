import { useMemo, useState } from 'react';
import { Button } from 'src/components/Button';
import {
  ContrastExample,
  ImprovedColors,
  TilesAndTable
} from 'src/components/Results/components';
import type { CombinationsType } from 'src/types/Colors';
import { contrast } from 'src/utilities/colors';

import styles from './Result.module.scss';

export const Result = ({ hex1, rgb1, hex2, rgb2 }: CombinationsType) => {
  const [colors, setColors] = useState<CombinationsType>({
    hex1,
    rgb1,
    hex2,
    rgb2
  });
  const [isColorsUpdated, setIsColorsUpdated] = useState(false);

  const setColorsAndFlag = (newColors: CombinationsType) => {
    setColors(newColors);
    setIsColorsUpdated(true);
  };
  const originalValues = { hex1, rgb1, hex2, rgb2 };

  const contastValue = useMemo(
    () => contrast(colors.rgb1, colors.rgb2),
    [colors]
  );

  return (
    <div className={styles.root}>
      <h2>Color Contrast is {contastValue}:1</h2>

      <TilesAndTable
        hex1={colors.hex1}
        hex2={colors.hex2}
        rgb1={colors.rgb1}
        rgb2={colors.rgb2}
        contrastRatio={contastValue}
      />
      <ContrastExample hex1={colors.hex1} hex2={colors.hex2} />
      {isColorsUpdated && (
        <Button
          type='button'
          buttonSize='small'
          onClick={() => {
            setColors(originalValues);
            setIsColorsUpdated(false);
          }}
        >
          Reset Colors
        </Button>
      )}
      <ImprovedColors
        hex1={colors.hex1}
        hex2={colors.hex2}
        rgb1={colors.rgb1}
        rgb2={colors.rgb2}
        setColorsAndFlag={setColorsAndFlag}
      />
    </div>
  );
};
