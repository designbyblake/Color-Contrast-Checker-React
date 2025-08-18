import { type ReactNode } from 'react';

import styles from './Wrappers.module.scss';


export const Wrapper = ({ children }: {children:ReactNode}) => {
  return <div className={styles.wrapper}>{children}</div>;
};