import type { AriaAttributes, ButtonHTMLAttributes } from 'react';

import styles from './Button.module.scss';
export const Button = ({
  onClick,
  buttonType = 'primary',
  buttonSize = 'medium',
  children,
  type,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={styles.button}
      type={type || 'button'}
      onClick={() => onClick?.()}
      data-button-type={buttonType}
      data-button-size={buttonSize}
      {...props}
    >
      {children}
    </button>
  );
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  AriaAttributes & {
    onClick?: () => void;
    buttonType?: 'primary' | 'secondary';
    buttonSize?: 'small' | 'medium' | 'large';
  };
