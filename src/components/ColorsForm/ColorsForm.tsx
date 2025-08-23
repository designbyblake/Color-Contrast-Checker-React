import { useState } from 'react';
import { Button } from 'src/components/Button';
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
  const [color, setColor] = useState<string>(hexString.toUpperCase());

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
        onPaste={(event) => {
          const pastedText = event.clipboardData
            .getData('text/plain')
            .toUpperCase();
          const hex = pastedText.startsWith('#')
            ? pastedText.slice(1)
            : pastedText;

          if (!hex.match(/^[0-9A-F]{6}$/i)) {
            event.preventDefault();
            return;
          }

          setColor(hex);
          updateColor(index, hex, true);
        }}
        onChange={(event) => {
          const { value } = event.target;
          if (
            value !== '' &&
            !HEXCHARACTERS.includes(value.slice(-1)?.toUpperCase())
          )
            return;

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
        <Button
          type='button'
          buttonSize='small'
          onClick={() => removeColor(index)}
        >
          Remove Color
        </Button>
      )}
    </div>
  );
};
