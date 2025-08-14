import { useEffect,useState } from 'react';

import { type TColors } from '../../types/Colors';
import { contrast } from '../../utilities/colors';

export const useContrast = (colorsArr: TColors[]) => {
  const [contrastRatio, setContrastRatio] = useState<TContrastResults[]>();
  useEffect(() => {
    const colorArray: TColors[] = [];
    const colors: string[] = [];

    for (let i = 0; i < colorsArr.length; i += 1) {
      if (!colors.includes(colorsArr[i].hex)) {
        colors.push(colorsArr[i].hex);
        colorArray.push(colorsArr[i]);
      }
    }

    const contrastArr: TContrastResults[] = [];

    let start = 0;
    let left = 0;
    const end = colorArray.length;
    while (start <= end && left < colorArray.length) {
      if (start === end) {
        left += 1;
        start = left;
      } else {
        const color1 = colorArray[left];
        const color2 = colorArray[start];
        if (color1.hex !== color2.hex && color2.hex !== '') {
          contrastArr.push({
            color1: color1.hex,
            color2: color2.hex,
            color1rgb: color1.rgb,
            color2rgb: color2.rgb,
            contrast: contrast(color1.rgb, color2.rgb)
          });
        }

        start += 1;
      }
    }

    setContrastRatio(contrastArr);
  }, [colorsArr]);

  const test = 'useContrast';
  return { test, contrastRatio };
};

type TContrastResults = {
  color1: string;
  color2: string;
  color1rgb: number[];
  color2rgb: number[];
  contrast: string;
};
