import { createRoot } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// Mock modules
vi.mock('react-dom/client', () => ({
  createRoot: vi.fn(() => ({ render: vi.fn() }))
}));

vi.mock('./App', () => ({
  App: () => null
}));

vi.mock('react', () => ({
  StrictMode: ({ children }: { children: React.ReactNode }) => children
}));

describe('main.tsx', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
  });

  afterEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = '';
  });

  it('should render App inside StrictMode', async () => {
    const mockRender = vi.fn();
    const mockCreateRoot = createRoot as jest.Mock;
    mockCreateRoot.mockImplementation(() => ({ render: mockRender }));

    // Import the file that contains the code to test
    await import('./main');

    expect(mockCreateRoot).toHaveBeenCalledWith(
      document.getElementById('root')
    );
    expect(mockRender).toHaveBeenCalled();
  });
});
