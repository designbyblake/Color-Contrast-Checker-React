import { useMemo } from 'react';
import { type TColorTile } from 'src/types/Colors';
import { displayRGB } from 'src/utilities/colors';

import styles from './ColorTile.module.scss';

export const ColorTile = ({ hex, rgb, updateColor, index }: TColorTile) => {
  const color = `#${hex}`;
  const rgbArray = useMemo(() => {
    return displayRGB(rgb);
  }, [rgb]);


  return (
    <div className={styles.root} data-element='color-tile'>

      { updateColor && typeof index === 'number'  ? (
        <input
            aria-label='Set a color'
            type='color'
            className={styles['color-picker']}
            value={`#${hex}`}
            onChange={(e) => {
                const newColor = e.target.value.replace('#', '').toUpperCase();
                updateColor(index, newColor);
            }}
        />)
        :( <div style={{ backgroundColor: color }} className={styles.block} /> )
    }

      <div className={styles.label}>{hex ? color : '-'}</div>
      <div className={styles.label}>{rgb ? rgbArray : '-'}</div>
    </div>
  );
};

