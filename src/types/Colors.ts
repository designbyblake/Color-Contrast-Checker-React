import { type Ref } from 'react';
export type ColorsType = {
  hex: string;
  rgb: number[];
  key?: string;
};

export type UpdateColorType = (
  index: number,
  color: string,
  isText?: boolean
) => void;

export type ColorsFormType = {
  hexString: string;
  rgbArray: number[];
  index: number;
  removeColor(index: number): void;
  updateColor: UpdateColorType;
  colorInput: Ref<HTMLInputElement> | undefined;
  hasRemoveColorButton: boolean;
};

export type CombinationsType = {
  hex1: string;
  hex2: string;
  rgb1: number[];
  rgb2: number[];
};

export type TilesAndTableType = CombinationsType & {
  contrastRatio: number;
};

export type TColorTile = ColorsType &
  Partial<Pick<ColorsFormType, 'updateColor' | 'index'>> & {
    setColor?(color: string): void;
  };

export type CombinationsContrastType = CombinationsType & {
  setColorsAndFlag(colors: CombinationsType, isSet: boolean): void;
};

export type ImprovedColorsResultsType = {
  title: string;
  colors: TilesAndTableType[];
  setColorsAndFlag(colors: CombinationsType, isSet: boolean): void;
};
