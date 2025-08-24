import { AA_CONTRAST, AAA_CONTRAST, UI_CONTRAST } from 'src/constants';
import { type TilesAndTableType } from 'src/types/Colors';
import { contrast } from 'src/utilities/colors';

import { useImprovedContrast } from './useImprovedContrast';
export const useImprovedColors = () => {
  const { changeContrast, changeContrastBoth } = useImprovedContrast();
  const getNewColors = (
    rgb1: number[],
    rgb2: number[],
    type: typeof UI_CONTRAST | typeof AA_CONTRAST | typeof AAA_CONTRAST
  ): TilesAndTableType[] => {
    const updatedColors: TilesAndTableType[] = [];

    // Return empty array if original colors pass the type
    if (contrast(rgb2, rgb1) >= type) return updatedColors;

    const lighten = changeContrast('lighten', rgb1, rgb2, type);
    const lighten2 = changeContrast('lighten', rgb2, rgb1, type);
    const darken = changeContrast('darken', rgb1, rgb2, type);
    const darken2 = changeContrast('darken', rgb2, rgb1, type);
    const both = changeContrastBoth(rgb1, rgb2, type);
    const both2 = changeContrastBoth(rgb2, rgb1, type);

    if (contrast(lighten.rgb1, lighten.rgb2) >= type) {
      updatedColors.push({
        ...lighten,
        contrastRatio: contrast(lighten.rgb1, lighten.rgb2)
      });
    }
    if (contrast(darken.rgb1, darken.rgb2) >= type) {
      updatedColors.push({
        ...darken,
        contrastRatio: contrast(darken.rgb1, darken.rgb2)
      });
    }
    if (contrast(lighten2.rgb1, lighten2.rgb2) >= type) {
      updatedColors.push({
        ...lighten2,
        contrastRatio: contrast(lighten2.rgb1, lighten2.rgb2)
      });
    }
    if (contrast(darken2.rgb1, darken2.rgb2) >= type) {
      updatedColors.push({
        ...darken2,
        contrastRatio: contrast(darken2.rgb1, darken2.rgb2)
      });
    }
    if (updatedColors.length === 0) {
      if (contrast(both.rgb1, both.rgb2) >= type) {
        updatedColors.push({
          ...both,
          contrastRatio: contrast(both.rgb1, both.rgb2)
        });
      }
      if (contrast(both2.rgb1, both2.rgb2) >= type) {
        updatedColors.push({
          ...both2,
          contrastRatio: contrast(both.rgb1, both.rgb2)
        });
      }
    }

    return updatedColors;
  };

  return { getNewColors };
};
