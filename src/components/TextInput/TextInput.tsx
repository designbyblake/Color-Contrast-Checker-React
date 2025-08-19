import {
  type AriaAttributes,
  type ChangeEvent,
  type InputHTMLAttributes,
  type Ref
} from 'react';

import styles from './TextInput.module.scss';

export const TextInput = ({
  label,
  error,
  onChange,
  ref,
  ...props
}: TextInputProps) => {
  return (
    <div className={styles.root}>
      <label>
        <span className={styles.label}>{label}</span>
        <input
          className={styles.input}
          type='text'
          ref={ref}
          onChange={(event) => onChange?.(event)}
          {...props}
        />
        {error && <span className={styles.error}>{error}</span>}
      </label>
    </div>
  );
};

export type TextInputProps = AriaAttributes &
  InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    error?: string | boolean | undefined;
    ref: Ref<HTMLInputElement | null> | undefined;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  };
