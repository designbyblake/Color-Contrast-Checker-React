import { useEffect, useState } from 'react';
import { type ColorsType, type CombinationsType } from 'src/types/Colors';

export const useCombinations = (colorsArr: ColorsType[]) => {
  const [combinations, setCombinations] = useState<CombinationsType[]>();
  useEffect(() => {
    const colorArray: ColorsType[] = [];
    const colors: string[] = [];

    // Prevents duplicate colors combinations if hex values are reverse
    // #000000 and #CCCCCC is the same as #CCCCCC and #000000
    for (let i = 0; i < colorsArr.length; i += 1) {
      if (!colors.includes(colorsArr[i].hex)) {
        colors.push(colorsArr[i].hex);
        colorArray.push(colorsArr[i]);
      }
    }

    const contrastArr: CombinationsType[] = [];

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
        if (color1.hex !== color2.hex) {
          contrastArr.push({
            hex1: color1.hex,
            hex2: color2.hex,
            rgb1: color1.rgb,
            rgb2: color2.rgb
          });
        }
        start += 1;
      }
    }

    setCombinations(contrastArr);
  }, [colorsArr]);

  return { combinations };
};
