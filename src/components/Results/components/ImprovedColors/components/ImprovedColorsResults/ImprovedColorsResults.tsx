import { Button } from 'src/components/Button';
import { ColorTiles } from 'src/components/Results/components/ColorTiles';
import { type ImprovedColorsResultsType } from 'src/types/Colors';

import styles from './ImprovedColorsResults.module.scss';

export const ImprovedColorsResults = ({
  title,
  colors,
  setColorsAndFlag
}: ImprovedColorsResultsType) => {
  return (
    <>
      <h2>{title}</h2>
      {colors.map((color) => (
        <div key={`${color.hex1}-${color.hex2}`} className={styles.root}>
          <ColorTiles
            hex1={color.hex1}
            rgb1={color.rgb1}
            hex2={color.hex2}
            rgb2={color.rgb2}
          />

          <Button
            type='button'
            buttonSize='small'
            onClick={() =>
              setColorsAndFlag(
                {
                  hex1: color.hex1,
                  rgb1: color.rgb1,
                  hex2: color.hex2,
                  rgb2: color.rgb2
                },
                true
              )
            }
          >
            Update colors
          </Button>
        </div>
      ))}
    </>
  );
};
