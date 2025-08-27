import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import InputField from '../../src/components/InputField/InputField';

expect.extend(toHaveNoViolations);

describe('InputField', () => {
  it('renders and associates label', () => {
    render(<InputField label="Name" id="test-input" />);
    const label = screen.getByText('Name');
    const input = screen.getByRole('textbox');
    expect(label).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'test-input');
  });

  it('clearable button clears and triggers onChange', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<InputField value="hello" onChange={handleChange} clearable />);
    const button = screen.getByRole('button', { name: /clear input/i });
    await user.click(button);
    expect(handleChange).toHaveBeenCalled();
  });

  it('has no axe accessibility violations', async () => {
    const { container } = render(<InputField label="Email" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
