import { describe, expect, it } from 'vitest';

import {
  contrast,
  convertHextoRGB,
  convertRGBtoHex,
  darkenRGB,
  displayHex,
  displayRGB,
  lightenRGB,
  luminance
} from './colors';
describe('convertHextoRGB', () => {
  it('converts hex string to RGB array', () => {
    expect(convertHextoRGB('FFAABB')).toEqual([255, 170, 187]);
    expect(convertHextoRGB('000000')).toEqual([0, 0, 0]);
    expect(convertHextoRGB('FFFFFF')).toEqual([255, 255, 255]);
    expect(convertHextoRGB('123456')).toEqual([18, 52, 86]);
  });
});

describe('convertRGBtoHex', () => {
  it('converts RGB array to hex string', () => {
    expect(convertRGBtoHex([255, 170, 187])).toBe('FFAABB');
    expect(convertRGBtoHex([0, 0, 0])).toBe('000000');
    expect(convertRGBtoHex([255, 255, 255])).toBe('FFFFFF');
    expect(convertRGBtoHex([18, 52, 86])).toBe('123456');
    expect(convertRGBtoHex([1, 2, 3])).toBe('010203');
  });
});

describe('displayHex', () => {
  it('returns hex string for valid RGB', () => {
    expect(displayHex([255, 170, 187])).toBe('FFAABB');
    expect(displayHex([0, 0, 0])).toBe('000000');
    expect(displayHex([18, 52, 86])).toBe('123456');
  });
  it('returns "-" for invalid RGB values', () => {
    expect(displayHex([256, 0, 0])).toBe('-');
    expect(displayHex([0, 256, 0])).toBe('-');
    expect(displayHex([0, 0, 256])).toBe('-');
  });
});

describe('displayRGB', () => {
  it('returns rgb() string for valid RGB', () => {
    expect(displayRGB([255, 170, 187])).toBe('rgb(255, 170, 187)');
    expect(displayRGB([0, 0, 0])).toBe('rgb(0, 0, 0)');
    expect(displayRGB([18, 52, 86])).toBe('rgb(18, 52, 86)');
  });
  it('returns "-" for invalid RGB values', () => {
    expect(displayRGB([256, 0, 0])).toBe('-');
    expect(displayRGB([0, 256, 0])).toBe('-');
    expect(displayRGB([0, 0, 256])).toBe('-');
  });
});

describe('lightenRGB', () => {
  it('lightens RGB values by percentage', () => {
    expect(lightenRGB([100, 100, 100], 10)).toEqual([110, 110, 110]);
    expect(lightenRGB([200, 200, 200], 50)).toEqual([255, 255, 255]);
    expect(lightenRGB([0, 0, 0], 100)).toEqual([0, 0, 0]);
    expect(lightenRGB([128, 128, 128], 100)).toEqual([255, 255, 255]);
  });
  it('does not exceed 255', () => {
    expect(lightenRGB([250, 250, 250], 10)).toEqual([255, 255, 255]);
  });
});

describe('darkenRGB', () => {
  it('darkens RGB values by percentage', () => {
    expect(darkenRGB([100, 100, 100], 10)).toEqual([90, 90, 90]);
    expect(darkenRGB([200, 200, 200], 50)).toEqual([100, 100, 100]);
    expect(darkenRGB([0, 0, 0], 100)).toEqual([0, 0, 0]);
    expect(darkenRGB([128, 128, 128], 100)).toEqual([0, 0, 0]);
  });
  it('does not go below 0', () => {
    expect(darkenRGB([5, 5, 5], 90)).toEqual([0, 0, 0]);
    expect(darkenRGB([5, 5, 5], 100)).toEqual([0, 0, 0]);
  });
});

describe('luminance', () => {
  it('calculates luminance for black', () => {
    expect(luminance(0, 0, 0)).toBeCloseTo(0, 5);
  });
  it('calculates luminance for white', () => {
    expect(luminance(255, 255, 255)).toBeCloseTo(1, 5);
  });
  it('calculates luminance for mid-gray', () => {
    expect(luminance(128, 128, 128)).toBeGreaterThan(0);
    expect(luminance(128, 128, 128)).toBeLessThan(1);
  });
});

describe('contrast', () => {
  it('calculates contrast ratio between black and white', () => {
    expect(contrast([0, 0, 0], [255, 255, 255])).toBe('21.00');
    expect(contrast([255, 255, 255], [0, 0, 0])).toBe('21.00');
  });
  it('calculates contrast ratio between similar colors', () => {
    expect(contrast([128, 128, 128], [130, 130, 130])).toBeCloseTo(1.03, 2);
  });
});
