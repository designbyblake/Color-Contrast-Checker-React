import { useEffect } from 'react';
import {
  ColorsForm,
  ColorTiles,
  Hero,
  Results,
  WCAG,
  Wrapper
} from 'src/components';
import { useColors } from 'src/hooks';

export const App = () => {
  const {
    colors,
    removeColor,
    updateColor,
    addColor,
    resetColors,
    colorInput,
    changedInput
  } = useColors();

  useEffect(() => {
    colorInput.current?.focus();
    changedInput.current = -1;
  }, [colors, colorInput, changedInput]);

  return (
    <>
      <Hero />
      <Wrapper>
        <WCAG />
        <ColorTiles addColor={addColor} resetColors={resetColors}>
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
              hasRemoveColorButton={colors.length > 2}
            />
          ))}
        </ColorTiles>

        <Results colors={colors} />
      </Wrapper>
    </>
  );
};
