export const converteHextoRGB = (val: string) => {
  const rgb = [];

  const r = val.slice(0, 2);
  const g = val.slice(2, 4);
  const b = val.slice(4, 6);

  rgb[0] = parseInt(r, 16);
  rgb[1] = parseInt(g, 16);
  rgb[2] = parseInt(b, 16);
  return rgb;
};

export const displayRGB = (rgb: number[]) => {
  if (rgb[0] > 255 || rgb[1] > 255 || rgb[2] > 255) return '-';
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
};

export const luminance = (r: number, g: number, b: number) => {
  const a = [r, g, b].map((v) => {
    let lum = v;
    lum /= 255;
    return lum <= 0.03928 ? lum / 12.92 : ((lum + 0.055) / 1.055) ** 2.4;
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

export const contrast = (rgb1: number[], rgb2: number[]): string => {
  const lum1 = luminance(rgb1[0], rgb1[1], rgb1[2]);
  const lum2 = luminance(rgb2[0], rgb2[1], rgb2[2]);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  const num = (brightest + 0.05) / (darkest + 0.05);
  return num.toFixed(2);
};

export class Color {
  hex: string;

  rgb: number[];

  key: number;

  constructor(hex: string) {
    this.hex = hex;
    this.rgb = hex ? converteHextoRGB(hex) : [999, 999, 999];
    this.key = Date.now();
  }
}

/**
 * Darkens an RGB color by a given percentage.
 * @param rgb Array of [r, g, b] values (0-255)
 * @param percent Percentage to darken (0-100)
 * @returns Array of [r, g, b] values darkened
 */
export const darkenRGB = (rgb: number[], percent: number): number[] => {
  const factor = 1 - percent / 100;
  return rgb.map((v) => Math.max(0, Math.round(v * factor)));
};

/**
 * Converts an RGB array to a hex color string.
 * @param rgb Array of [r, g, b] values (0-255)
 * @returns Hex color string (e.g., 'FFAABB')
 */
export const convertRGBtoHex = (rgb: number[]): string => {
  return rgb
    .map((v) => {
      const hex = v.toString(16).toUpperCase();
      return hex.length === 1 ? `0${hex}` : hex;
    })
    .join('');
};
