import { useState } from 'react';
import { ColorTile } from 'src/components/ColorTile';
import { TextInput } from 'src/components/TextInput';
import { HEXCHARACTERS } from 'src/constants';
import { type TColorsForm } from 'src/types/Colors';

import styles from './ColorsForm.module.scss';

export const ColorsForm = ({
  hexString,
  rgbArray,
  index,
  removeColor,
  updateColor,
  colorInput,
  hasRemoveColorButton
}: TColorsForm) => {
  const [color, setColor] = useState<string>(hexString);

  return (
    <div className={styles.root} data-element='color-form'>
      <ColorTile
        hex={hexString}
        rgb={rgbArray}
        updateColor={updateColor}
        index={index}
      />
      <TextInput
        label={`Color ${index + 1}`}
        maxLength={6}
        onChange={(event) => {
          const { value } = event.target;

          if (!HEXCHARACTERS.includes(value.slice(-1)?.toUpperCase())) return;

          setColor(value.toUpperCase());

          if (value.length === 6) {
            updateColor(index, value.toUpperCase(), true);
          }
        }}
        value={color}
        ref={colorInput}
        placeholder='CCCCCC'
      />
      {hasRemoveColorButton && (
        <button type='button' onClick={() => removeColor(index)}>
          Remove Color
        </button>
      )}
    </div>
  );
};
