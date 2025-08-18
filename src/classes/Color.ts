import { converteHextoRGB } from 'src/utilities/colors.js';
export class Color {
  hex: string;

  rgb: number[];

  key?: string;

  constructor(hex: string) {
    this.hex = hex;
    this.rgb = hex ? converteHextoRGB(hex) : [999, 999, 999];
    this.key = `color-${Math.random().toString(16).slice(2)}`;
  }
}
