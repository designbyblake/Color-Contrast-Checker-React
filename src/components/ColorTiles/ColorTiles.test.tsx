import { fireEvent, render, screen } from '@testing-library/react';

import { ColorTiles } from './ColorTiles';

describe('ColorTiles', () => {
  it('renders children', () => {
    render(
      <ColorTiles addColor={() => {}} resetColors={() => {}}>
        <div>Child 1</div>
        <div>Child 2</div>
      </ColorTiles>
    );
    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });

  it('calls addColor when Add Color button is clicked', () => {
    const addColor = vi.fn();
    render(
      <ColorTiles addColor={addColor} resetColors={() => {}}>
        <div>Child</div>
      </ColorTiles>
    );
    fireEvent.click(screen.getByText('Add Color'));
    expect(addColor).toHaveBeenCalledTimes(1);
  });

  it('calls resetColors when Reset Colors button is clicked', () => {
    const resetColors = vi.fn();
    render(
      <ColorTiles addColor={() => {}} resetColors={resetColors}>
        <div>Child</div>
      </ColorTiles>
    );
    fireEvent.click(screen.getByText('Reset Colors'));
    expect(resetColors).toHaveBeenCalledTimes(1);
  });
});
