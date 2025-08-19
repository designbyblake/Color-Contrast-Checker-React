import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { App } from './App';

vi.mock('src/hooks', () => ({
  useColors: () => ({
    colors: [
      { hex: '#FFFFFF', rgb: [255, 255, 255], key: '1' },
      { hex: '#000000', rgb: [0, 0, 0], key: '2' }
    ],
    removeColor: vi.fn(),
    updateColor: vi.fn(),
    addColor: vi.fn(),
    resetColors: vi.fn(),
    colorInput: { current: { focus: vi.fn() } },
    changedInput: { current: -1 }
  })
}));

vi.mock('src/components', () => ({
  Hero: () => <div data-testid='hero' />,
  Wrapper: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='wrapper'>{children}</div>
  ),
  ColorTiles: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='color-tiles'>{children}</div>
  ),
  ColorsForm: (props: { index: number }) => (
    <div data-testid={`colors-form-${props.index}`} />
  ),
  WCAG: () => <div data-testid='wcag' />,
  ContrastResults: () => <div data-testid='contrast-results' />
}));

describe('App', () => {
  it('renders Hero, Wrapper, ColorTiles, WCAG, and ContrastResults', () => {
    render(<App />);
    expect(screen.getByTestId('hero')).toBeInTheDocument();
    expect(screen.getByTestId('wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('color-tiles')).toBeInTheDocument();
    expect(screen.getByTestId('wcag')).toBeInTheDocument();
    expect(screen.getByTestId('contrast-results')).toBeInTheDocument();
  });

  it('renders ColorsForm for each color', () => {
    render(<App />);
    expect(screen.getByTestId('colors-form-0')).toBeInTheDocument();
    expect(screen.getByTestId('colors-form-1')).toBeInTheDocument();
  });
});
