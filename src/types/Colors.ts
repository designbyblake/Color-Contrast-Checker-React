import { type Ref } from 'react';
export type TColors = {
  hex: string;
  rgb: number[];
  key: number;
};
export type TColorsForm = {
  hexString: string;
  rgbArray: number[];
  index: number;
  ref: Ref<HTMLInputElement | null> | undefined;
  removeColor(index: number): void;
  updateColor(index: number, color: string): void;
};
