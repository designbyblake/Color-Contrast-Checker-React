import { Color } from 'src/classes/Color';
import { type ColorsType } from 'src/types/Colors';

import { useQueryParams } from '../useQueryParams/useQueryParams';
export const useColorParams = () => {
  const { getParams, setParams, removeParams } = useQueryParams();

  const getColorsFromParams = (): ColorsType[] => {
    const colorsParam = getParams('colors');
    if (colorsParam) {
      const colors = colorsParam.split(',').map((color) => {
        return new Color(color.trim());
      });
      return colors;
    }
    return [];
  };

  const setColorsToParams = (colors: string[]): void => {
    const colorsParam = colors.map((color) => color.toUpperCase()).join(',');
    setParams('colors', colorsParam);
  };

  const removeColorsParams = (): void => {
    removeParams('colors', true);
  };

  return { getColorsFromParams, setColorsToParams, removeColorsParams };
};
