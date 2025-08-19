import { useRef, useState } from 'react';
import { Color } from 'src/classes/Color';
import { DEFAULT_COLORS } from 'src/constants';
import { type TColors, type UpdateColor } from 'src/types/Colors';

import { useColorParams } from './useColorParams/useColorParams';

export const useColors = () => {
  const { getColorsFromParams, setColorsToParams, removeColorsParams } =
    useColorParams();
  const colorFromParams = getColorsFromParams();
  const initialColors =
    colorFromParams.length > 0 ? colorFromParams : DEFAULT_COLORS;
  const [colors, setColors] = useState<TColors[]>(initialColors);
  const colorInput = useRef<HTMLInputElement>(null);
  const changedInput = useRef<number>(-1);

  const removeColor = (index: number) => {
    const theColors = [...colors];
    theColors.splice(index, 1);
    setColors(theColors);
  };

  const updateColor: UpdateColor = (index, color, isText) => {
    const theColors = [...colors];
    theColors[index] = new Color(color);
    if (isText) {
      changedInput.current = index;
    }
    setColors(theColors);
    setColorsToParams(theColors.map((c) => c.hex));
  };

  const addColor = () => {
    setColors([...colors, new Color('')]);
    changedInput.current = colors.length;
  };

  const resetColors = () => {
    setColors(DEFAULT_COLORS);
    changedInput.current = 0;
    removeColorsParams();
  };

  return {
    colors,
    setColors,
    removeColor,
    updateColor,
    addColor,
    resetColors,
    colorInput,
    changedInput
  };
};
