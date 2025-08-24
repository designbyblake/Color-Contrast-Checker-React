import { Contrast } from '../Contrast/Contrast';
import styles from './ContrastExample.module.scss';
export const ContrastExample = ({
  hex1,
  hex2
}: {
  hex1: string;
  hex2: string;
}) => {
  return (
    <div className={styles.examples} data-testid='contrast-example'>
      <Contrast color1={hex1} color2={hex2} />
      <Contrast color1={hex2} color2={hex1} />
    </div>
  );
};
