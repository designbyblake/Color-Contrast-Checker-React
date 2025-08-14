import {
  AriaAttributes,
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  ReactElement} from 'react';

import styles from './TextInput.module.scss';

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, error, onChange, ...props }: TextInputProps, ref): ReactElement => {
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
  }
);
TextInput.displayName = 'TextInput';

interface TextInputProps
  extends AriaAttributes,
    InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string | boolean | undefined;
  /**
   * onChange callback
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}
