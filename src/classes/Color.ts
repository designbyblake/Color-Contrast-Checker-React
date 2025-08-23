import { convertHextoRGB } from 'src/utilities/colors.js';
export class Color {
  hex: string;

  rgb: number[];

  key?: string;

  constructor(hex: string) {
    this.hex = hex.toUpperCase();
    this.rgb = hex ? convertHextoRGB(hex) : [999, 999, 999];
    this.key = `color-${Math.random().toString(16).slice(2)}`;
  }
}
