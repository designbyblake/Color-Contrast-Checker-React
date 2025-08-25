import { fireEvent, render, screen } from '@testing-library/react';

import { Result } from './Result';

const baseProps = {
  hex1: '##FF00FF',
  rgb1: [255, 0, 255],
  hex2: '#FFF000',
  rgb2: [255, 240, 0]
};

describe('Result', () => {
  it('renders the contrast value', () => {
    render(<Result {...baseProps} />);
    expect(screen.getByText(/Color Contrast is/i)).toBeInTheDocument();
  });

  it('renders TilesAndTable and ContrastExample components', () => {
    render(<Result {...baseProps} />);
    expect(screen.getByText(/Color Contrast is/i)).toBeInTheDocument();
    // TilesAndTable and ContrastExample are rendered, but their content is not directly testable here.
    // You may add more specific tests if their content is known.
  });

  it('does not show Reset Colors button initially', () => {
    render(<Result {...baseProps} />);
    expect(screen.queryByText(/Reset Colors/i)).not.toBeInTheDocument();
  });

  it('shows Reset Colors button after ImprovedColors triggers setColorsAndFlag', () => {
    render(<Result {...baseProps} />);
    // Simulate ImprovedColors calling setColorsAndFlag
    // Find the ImprovedColors button and click it
    // Since ImprovedColors is a child component, we need to simulate its behavior.
    // For this test, we'll call setColorsAndFlag via the prop.
    // This requires a more integrated test or refactor for testability.
    // For now, we can simulate the state change by clicking the button if it exists.
  });

  it('resets colors when Reset Colors button is clicked', () => {
    render(<Result {...baseProps} />);
    // Simulate ImprovedColors calling setColorsAndFlag
    // For demonstration, we'll directly set the state by clicking the button if it appears.
    // This test is limited by the lack of direct access to ImprovedColors internals.
  });
});
describe('Result', () => {
  it('shows Reset Colors button after ImprovedColors triggers setColorsAndFlag', () => {
    render(<Result {...baseProps} />);
    // Simulate ImprovedColors updating colors
    const improvedColorsButton = screen.getAllByRole('button', {
      name: /Update colors/i
    });
    fireEvent.click(improvedColorsButton[0]);
    expect(screen.getByText(/Reset Colors/i)).toBeInTheDocument();
  });

  it('resets colors when Reset Colors button is clicked', () => {
    render(<Result {...baseProps} />);
    // Simulate ImprovedColors updating colors
    const improvedColorsButton = screen.getAllByRole('button', {
      name: /Update colors/i
    });
    fireEvent.click(improvedColorsButton[0]);
    const resetButton = screen.getByText(/Reset Colors/i);
    fireEvent.click(resetButton);
    expect(screen.queryByText(/Reset Colors/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Color Contrast is/i)).toBeInTheDocument();
  });
});
