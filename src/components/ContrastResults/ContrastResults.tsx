import { type TColors } from '../../types/Colors';
import { useContrast } from './useContrast';
import { Contrast } from '../Contrast/Contrast';
import { ColorTile } from '../ColorTile/ColorTile';
import styles from './ContrastResults.module.scss';
import { convertRGBtoHex, darkenRGB } from '../../utilities/colors';

export const ContrastResults = ({ colors }: TContrastResults) => {
  const { contrastRatio } = useContrast(colors);
  const PERCENTAGE_DARKEN = 50;
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
            <h2>Contrast Ratio: {ratio.contrast}:1</h2>
            <div className={styles['color-tiles']}>
              <ColorTile hexString={ratio.color1} rgbArray={ratio.color1rgb} />
              <ColorTile hexString={ratio.color2} rgbArray={ratio.color2rgb} />
              {isContrastGood === false && (
                <>
                  <ColorTile
                    hexString={darkendColor1Hex}
                    rgbArray={darkendColor1}
                  />
                  <ColorTile
                    hexString={darkendColor2Hex}
                    rgbArray={darkendColor2}
                  />
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

type TContrastResults = {
  colors: TColors[];
};
