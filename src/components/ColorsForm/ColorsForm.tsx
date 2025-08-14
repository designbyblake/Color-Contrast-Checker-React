import { useState } from 'react';

import { HEXCHARACTERS } from '../../constants/hexcharacters';
import { type TColorsForm } from '../../types/Colors';
import { ColorTile } from '../ColorTile/ColorTile';
import { TextInput } from '../TextInput/TextInput';
import styles from './ColorsForm.module.scss';

export const ColorsForm =
  (
    { hexString, rgbArray, index,ref, removeColor, updateColor }: TColorsForm
  ) => {
    const [color, setColor] = useState<string>(hexString);

    return (
      <div className={styles.root} data-element='color-form'>
        <ColorTile hexString={hexString} rgbArray={rgbArray} />
        <TextInput
          label={`Color ${index + 1}`}
          maxLength={6}
          onChange={(event) => {
            const { value } = event.target;
            const characters = value.split('');
            const lastCharacter = characters[characters.length - 1];

            if (!HEXCHARACTERS.includes(lastCharacter?.toUpperCase())) return;

            setColor(value.toUpperCase());

            if (value.length === 6) {
              updateColor(index, value.toUpperCase());
            }
          }}
          value={color}
          ref={ref}
          placeholder='CCCCCC'
        />
        <input
          type='color'
          value={`#${hexString}`}
          onChange={(e) => {
            const newColor = e.target.value.replace('#', '').toUpperCase();
            setColor(newColor);
            updateColor(index, newColor);
          }}
        />
        <button type='button' onClick={() => removeColor(index)}>
          Remove Color
        </button>
      </div>
    );
  }
