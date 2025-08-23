import { Contrast } from '../Contrast/Contrast';
import styles from './ContrastExample.module.scss';
export const ContrastExample = ({
  color1,
  color2
}: {
  color1: string;
  color2: string;
}) => {
  return (
    <div className={styles.examples} data-testid='contrast-example'>
      <Contrast color1={color1} color2={color2} />
      <Contrast color1={color2} color2={color1} />
    </div>
  );
};
