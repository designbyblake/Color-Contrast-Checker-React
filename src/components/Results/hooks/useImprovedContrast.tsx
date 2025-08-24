import { AA_CONTRAST, AAA_CONTRAST, UI_CONTRAST } from 'src/constants';
import { type TilesAndTableType } from 'src/types/Colors';
import {
  contrast,
  darkenRGB,
  displayHex,
  lightenRGB
} from 'src/utilities/colors';

export const useImprovedContrast = () => {
  const changeContrast = (
    type: 'lighten' | 'darken',
    color1rgb: number[],
    color2rgb: number[],
    targetContrast:
      | typeof UI_CONTRAST
      | typeof AA_CONTRAST
      | typeof AAA_CONTRAST
  ): TilesAndTableType => {
    let tempColor1 = color1rgb;
    let currentContrast: number = contrast(tempColor1, color2rgb);

    let count = 0;
    while (currentContrast < targetContrast) {
      count += 1;

      const adjustedColor =
        type === 'lighten'
          ? lightenRGB(tempColor1, 1)
          : darkenRGB(tempColor1, 1);

      const updatedContrast = contrast(adjustedColor, color2rgb);

      if (count > 100) {
        break;
      } else if (updatedContrast < targetContrast) {
        tempColor1 = adjustedColor;
      } else {
        color1rgb = adjustedColor;
      }

      currentContrast = contrast(adjustedColor, color2rgb);
    }

    const newColors = {
      hex1: displayHex(color1rgb),
      hex2: displayHex(color2rgb),
      rgb1: color1rgb,
      rgb2: color2rgb,
      contrastRatio: contrast(color1rgb, color2rgb)
    };

    return newColors;
  };

  const changeContrastBoth = (
    color1rgb: number[],
    color2rgb: number[],
    targetContrast:
      | typeof UI_CONTRAST
      | typeof AA_CONTRAST
      | typeof AAA_CONTRAST
  ): TilesAndTableType => {
    let tempColor1 = color1rgb;
    let tempColor2 = color2rgb;
    let currentContrast: number = contrast(tempColor1, tempColor2);

    let count = 0;
    while (currentContrast < targetContrast) {
      count += 1;

      const lightenedColor = lightenRGB(tempColor1, 1);
      const darkenedColor = darkenRGB(tempColor2, 1);

      const updatedContrast = contrast(lightenedColor, darkenedColor);

      if (count > 100) {
        break;
      } else if (updatedContrast < targetContrast) {
        tempColor1 = lightenedColor;
        tempColor2 = darkenedColor;
      } else {
        color1rgb = lightenedColor;
        color2rgb = darkenedColor;
      }
      currentContrast = contrast(lightenedColor, darkenedColor);
    }

    const newColors = {
      hex1: displayHex(color1rgb),
      hex2: displayHex(color2rgb),
      rgb1: color1rgb,
      rgb2: color2rgb,
      contrastRatio: contrast(color1rgb, color2rgb)
    };

    return newColors;
  };

  return { changeContrast, changeContrastBoth };
};
