import { render, screen } from '@testing-library/react';

import { Results } from './Results';

describe('Results', () => {
  const mockColors = [
    { hex: '#000000', rgb: [0, 0, 0] },
    { hex: '#ffffff', rgb: [255, 255, 255] }
  ];

  it('renders the contrast results heading', () => {
    render(<Results colors={mockColors} />);
    expect(screen.getByText('Contrast Results')).toBeInTheDocument();
  });
});
