import { fireEvent, render, screen } from '@testing-library/react';

import { TextInput } from './TextInput';

describe('TextInput', () => {
  it('renders label', () => {
    render(<TextInput label='Username' ref={null} />);
    expect(screen.getByText('Username')).toBeInTheDocument();
  });

  it('renders input element', () => {
    render(<TextInput label='Email' ref={null} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders error message when error prop is provided', () => {
    render(<TextInput label='Password' error='Required' ref={null} />);
    expect(screen.getByText('Required')).toBeInTheDocument();
  });

  it('does not render error message when error prop is not provided', () => {
    render(<TextInput label='Password' ref={null} />);
    expect(screen.queryByText('Required')).not.toBeInTheDocument();
  });

  it('calls onChange when input value changes', () => {
    const handleChange = vi.fn();
    render(<TextInput label='Name' onChange={handleChange} ref={null} />);
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'John' }
    });
    expect(handleChange).toHaveBeenCalled();
  });

  it('passes additional props to input', () => {
    render(<TextInput label='Age' ref={null} placeholder='Enter age' />);
    expect(screen.getByPlaceholderText('Enter age')).toBeInTheDocument();
  });
});
