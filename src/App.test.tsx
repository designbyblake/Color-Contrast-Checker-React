import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { App } from './App';

vi.mock('src/hooks', () => ({
  useColors: () => ({
    colors: [
      { hex: '#ffffff', rgb: [255, 255, 255], key: '1' },
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
  ColorsForm: ({ hexString }: { hexString: string }) => (
    <div>ColorsForm-{hexString}</div>
  ),
  ColorTiles: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  Hero: () => <div>Hero</div>,
  Results: () => <div>Results</div>,
  WCAG: () => <div>WCAG</div>,
  Wrapper: ({ children }: React.PropsWithChildren<object>) => (
    <div>{children}</div>
  )
}));

describe('App', () => {
  it('renders Hero, WCAG, ColorTiles, and Results', () => {
    render(<App />);
    expect(screen.getByText('Hero')).toBeInTheDocument();
    expect(screen.getByText('WCAG')).toBeInTheDocument();
    expect(screen.getByText('Results')).toBeInTheDocument();
  });

  it('renders ColorsForm for each color', () => {
    render(<App />);
    expect(screen.getByText('ColorsForm-#ffffff')).toBeInTheDocument();
    expect(screen.getByText('ColorsForm-#000000')).toBeInTheDocument();
  });
});
