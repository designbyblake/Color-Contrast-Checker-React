/**
 * Converts a hex color string to an RGB array.
 *
 * @param val - A hex color string (e.g., 'FFAABB'). Should not include the '#' character.
 * @returns An array of numbers representing the RGB values: [red, green, blue].
 *
 * @example
 * converteHextoRGB('FFAABB'); // returns [255, 170, 187]
 */
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

/**
 * Converts an RGB array to a hex color string for display purposes.
 * Returns '-' if any value is out of the valid RGB range (0-255).
 *
 * @param rgb - Array of [r, g, b] values (0-255)
 * @returns Hex color string (e.g., 'FFAABB') or '-' if invalid
 */
export const displayHex = (rgb: number[]): string => {
  if (rgb[0] > 255 || rgb[1] > 255 || rgb[2] > 255) return '-';
  return rgb
    .map((v) => {
      const hex = v.toString(16).toUpperCase();
      return hex.length === 1 ? `0${hex}` : hex;
    })
    .join('');
};

/**
 * Converts an RGB array to a CSS rgb() string for display purposes.
 * Returns '-' if any value is out of the valid RGB range (0-255).
 *
 * @param rgb - Array of [r, g, b] values (0-255)
 * @returns CSS rgb() string (e.g., 'rgb(255, 170, 187)') or '-' if invalid
 */
export const displayRGB = (rgb: number[]): string => {
  if (rgb[0] > 255 || rgb[1] > 255 || rgb[2] > 255) return '-';
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
};

/**
 * Lightens an RGB color by a given percentage.
 * @param rgb Array of [r, g, b] values (0-255)
 * @param percent Percentage to lighten (0-100)
 * @returns Array of [r, g, b] values lightened
 */
export const lightenRGB = (rgb: number[], percent: number): number[] => {
  const factor = 1 + percent / 100;
  return rgb.map((v) => Math.min(255, Math.round(v * factor)));
};

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
 * Calculates the relative luminance of an RGB color according to WCAG guidelines.
 *
 * @param r - Red channel value (0-255)
 * @param g - Green channel value (0-255)
 * @param b - Blue channel value (0-255)
 * @returns Relative luminance value (0.0 - 1.0)
 */
export const luminance = (r: number, g: number, b: number): number => {
  const a = [r, g, b].map((v) => {
    let lum = v;
    lum /= 255;
    return lum <= 0.03928 ? lum / 12.92 : ((lum + 0.055) / 1.055) ** 2.4;
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

/**
 * Calculates the contrast ratio between two RGB colors according to WCAG guidelines.
 *
 * @param rgb1 - Array of [r, g, b] values for the first color (0-255)
 * @param rgb2 - Array of [r, g, b] values for the second color (0-255)
 * @returns Contrast ratio as a string rounded to two decimals (e.g., '4.50')
 */
export const contrast = (rgb1: number[], rgb2: number[]): string => {
  const lum1 = luminance(rgb1[0], rgb1[1], rgb1[2]);
  const lum2 = luminance(rgb2[0], rgb2[1], rgb2[2]);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  const num = (brightest + 0.05) / (darkest + 0.05);
  return num.toFixed(2);
};
