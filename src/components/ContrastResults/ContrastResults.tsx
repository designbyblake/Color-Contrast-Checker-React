import { ColorTile } from 'src/components/ColorTile/ColorTile';
import { Contrast } from 'src/components/Contrast/Contrast';
import { type TColors } from 'src/types/Colors';
import { convertRGBtoHex, darkenRGB } from 'src/utilities/colors';

import styles from './ContrastResults.module.scss';
import { useContrast } from './useContrast';

export const ContrastResults = ({ colors }: { colors: TColors[] }) => {
  const { contrastRatio } = useContrast(colors);
  const PERCENTAGE_DARKEN = 50;
  if (colors.length < 2) return null;

  return (
    <>
      <h2>Contrast Results</h2>
      {contrastRatio?.map((ratio) => {
        const darkendColor1 = darkenRGB(ratio.color1rgb, PERCENTAGE_DARKEN);
        const darkendColor2 = darkenRGB(ratio.color2rgb, PERCENTAGE_DARKEN);
        const darkendColor1Hex = convertRGBtoHex(darkendColor1);
        const darkendColor2Hex = convertRGBtoHex(darkendColor2);
        const isContrastGood = parseFloat(ratio.contrast) >= 4.5;

        return (
          <div className={styles.root} key={`${ratio.color1} ${ratio.color2}`}>
            <h2>Contrast Ratio:{ratio.contrast}:1</h2>
            <div className={styles['color-tiles']}>
              {/* <ColorTile hex={ratio.color1} rgb={ratio.color1rgb} />
              <ColorTile hex={ratio.color2} rgb={ratio.color2rgb} /> */}
              {isContrastGood === false && (
                <>
                  <ColorTile hex={darkendColor1Hex} rgb={darkendColor1} />
                  <ColorTile hex={darkendColor2Hex} rgb={darkendColor2} />
                </>
              )}
            </div>

            <div className={styles.examples}>
              <Contrast color1={ratio.color1} color2={ratio.color2} />
              <Contrast color1={ratio.color2} color2={ratio.color1} />
            </div>
          </div>
        );
      })}
    </>
  );
};
