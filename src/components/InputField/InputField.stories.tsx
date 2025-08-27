import type { Meta, StoryObj } from '@storybook/react';
import InputField from './InputField';
import { Search } from 'lucide-react';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  argTypes: {
    variant: { control: 'select', options: ['filled','outlined','ghost'] },
    size: { control: 'select', options: ['sm','md','lg'] },
    type: { control: 'select', options: ['text','email','password'] }
  }
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: 'Type here...' }
};

export const WithLabel: Story = {
  args: { label: 'Username', placeholder: 'Enter username' }
};

export const SearchField: Story = {
  args: { label: 'Search', placeholder: 'Search users or emails', leftIcon: <Search size={16} /> }
};

export const PasswordToggle: Story = { args: { label: 'Password', type: 'password', passwordToggle: true } };
