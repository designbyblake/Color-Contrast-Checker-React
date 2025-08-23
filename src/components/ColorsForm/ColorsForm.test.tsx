import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { type TextInputProps } from '../TextInput/TextInput';
import { ColorsForm } from './ColorsForm';
// Mock CSS module
vi.mock('./ColorsForm.module.scss', () => ({
  default: {
    root: 'root'
  }
}));

// Mock child components
vi.mock('src/components/ColorTile', () => ({
  ColorTile: (props: TextInputProps) => (
    <div data-testid='color-tile-mock'>{JSON.stringify(props)}</div>
  )
}));
vi.mock('src/components/TextInput', () => ({
  TextInput: (props: TextInputProps) => (
    <input
      data-testid='text-input-mock'
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.onChange}
      onPaste={props.onPaste}
      aria-label={props.label}
      maxLength={props.maxLength}
      ref={props.ref}
    />
  )
}));

const baseProps = {
  hexString: 'FFAA00',
  rgbArray: [255, 170, 0] as [number, number, number],
  index: 0,
  removeColor: vi.fn(),
  updateColor: vi.fn(),
  colorInput: { current: null },
  hasRemoveColorButton: false
};

describe('ColorsForm', () => {
  it('renders ColorTile and TextInput', () => {
    render(<ColorsForm {...baseProps} />);
    expect(screen.getByTestId('color-tile-mock')).toBeInTheDocument();
    expect(screen.getByTestId('text-input-mock')).toBeInTheDocument();
  });

  it('TextInput displays the correct initial value', () => {
    render(<ColorsForm {...baseProps} />);
    const input = screen.getByTestId('text-input-mock');
    expect(input).toHaveValue('FFAA00');
  });

  it('updates color state on valid input and calls updateColor when length is 6', () => {
    const updateColor = vi.fn();
    render(<ColorsForm {...baseProps} updateColor={updateColor} />);
    const input = screen.getByTestId('text-input-mock');
    fireEvent.change(input, { target: { value: '123456' } });
    expect(input).toHaveValue('123456');
    expect(updateColor).toHaveBeenCalledWith(0, '123456', true);
  });

  it('does not update color state on invalid input', () => {
    render(<ColorsForm {...baseProps} />);
    const input = screen.getByTestId('text-input-mock');
    fireEvent.change(input, { target: { value: '12345Z' } }); // 'Z' is not a hex character
    expect(input).not.toHaveValue('12345Z');
  });

  it('renders Remove Color button when hasRemoveColorButton is true', () => {
    render(<ColorsForm {...baseProps} hasRemoveColorButton={true} />);
    expect(
      screen.getByRole('button', { name: /remove color/i })
    ).toBeInTheDocument();
  });

  it('calls removeColor with index when Remove Color button is clicked', () => {
    const removeColor = vi.fn();
    render(
      <ColorsForm
        {...baseProps}
        hasRemoveColorButton={true}
        removeColor={removeColor}
      />
    );
    const button = screen.getByRole('button', { name: /remove color/i });
    fireEvent.click(button);
    expect(removeColor).toHaveBeenCalledWith(0);
  });
});

describe('paste handling', () => {
  it('handles paste with valid hex code', () => {
    const updateColor = vi.fn();
    render(<ColorsForm {...baseProps} updateColor={updateColor} />);
    const input = screen.getByTestId('text-input-mock');

    const mockClipboardEvent = {
      clipboardData: {
        getData: vi.fn().mockReturnValue('AABBCC')
      }
    };

    fireEvent.paste(input, mockClipboardEvent);

    expect(mockClipboardEvent.clipboardData.getData).toHaveBeenCalledWith(
      'text/plain'
    );
    expect(input).toHaveValue('AABBCC');
    expect(updateColor).toHaveBeenCalledWith(0, 'AABBCC', true);
  });

  it('handles paste with valid hex code including #', () => {
    const updateColor = vi.fn();
    render(<ColorsForm {...baseProps} updateColor={updateColor} />);
    const input = screen.getByTestId('text-input-mock');

    const mockClipboardEvent = {
      clipboardData: {
        getData: vi.fn().mockReturnValue('#AABBCC')
      }
    };

    fireEvent.paste(input, mockClipboardEvent);

    expect(mockClipboardEvent.clipboardData.getData).toHaveBeenCalledWith(
      'text/plain'
    );
    expect(input).toHaveValue('AABBCC');
    expect(updateColor).toHaveBeenCalledWith(0, 'AABBCC', true);
  });

  it('maintains current value when invalid character is entered', () => {
    render(<ColorsForm {...baseProps} />);
    const input = screen.getByTestId('text-input-mock');
    const initialValue = 'FFAA00';

    fireEvent.change(input, { target: { value: initialValue + 'Z' } });
    expect(input).toHaveValue(initialValue);
  });
});
