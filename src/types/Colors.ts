import { type Ref } from 'react';
export type TColors = {
  hex: string;
  rgb: number[];
  key?: string;
};

export type UpdateColor = (
  index: number,
  color: string,
  type: 'color' | 'text'
) => void;

export type TColorsForm = {
  hexString: string;
  rgbArray: number[];
  index: number;
  removeColor(index: number): void;
  updateColor: UpdateColor;
  colorInput: Ref<HTMLInputElement> | undefined;
};

export type TContrastResults = {
  color1: string;
  color2: string;
  color1rgb: number[];
  color2rgb: number[];
  contrast: string;
};

export type TColorTile = TColors &
  Partial<Pick<TColorsForm, 'updateColor' | 'index'>> & {
    setColor?(color: string): void;
  };
