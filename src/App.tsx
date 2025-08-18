import { useEffect, useRef, useState } from 'react';
import { Color } from 'src/classes/Color';
import {
  ColorsForm,
  ColorTiles,
  ContrastResults,
  Hero,
  WCAG,
  Wrapper
} from 'src/components';
import { DEFAULT_COLORS } from 'src/constants';
import { type TColors, type UpdateColor } from 'src/types/Colors';

export const App = () => {
  const [colors, setColors] = useState<TColors[]>(DEFAULT_COLORS);
  const colorInput = useRef<HTMLInputElement>(null);
  const changedInput = useRef<number>(-1);

  const removeColor = (index: number) => {
    const theColors = [...colors];
    theColors.splice(index, 1);
    setColors(theColors);
  };

  const updateColor: UpdateColor = (index, color, type) => {
    const theColors = [...colors];
    theColors[index] = new Color(color);
    if (type === 'text') {
      changedInput.current = index;
    }
    setColors(theColors);
  };

  const addColor = () => {
    setColors([...colors, new Color('')]);
    changedInput.current = colors.length;
  };

  useEffect(() => {
    colorInput.current?.focus();
    changedInput.current = -1;
  }, [colors]);

  return (
    <>
      <Hero />
      <Wrapper>
        <ColorTiles addColor={addColor}>
          {colors.map((color, index) => (
            <ColorsForm
              hexString={color.hex}
              rgbArray={color.rgb}
              key={color.key}
              index={index}
              removeColor={removeColor}
              updateColor={updateColor}
              colorInput={
                changedInput.current === index ? colorInput : undefined
              }
            />
          ))}
        </ColorTiles>
        <WCAG />
        <ContrastResults colors={colors} />
      </Wrapper>
    </>
  );
};
