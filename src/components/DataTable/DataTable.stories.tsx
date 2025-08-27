import type { Meta, StoryObj } from '@storybook/react';
import DataTable from './DataTable';
import type { Column } from './DataTable';

interface User { id: number; name: string; email: string; status: 'active'|'inactive' }

const data: User[] = [
  { id:1, name:'John Doe', email:'john@example.com', status:'active' },
  { id:2, name:'Jane Smith', email:'jane@example.com', status:'inactive' },
  { id:3, name:'Ali Khan', email:'ali@example.com', status:'active' }
];

const columns: Column<User>[] = [
  { key:'name', title:'Name', dataIndex:'name', sortable:true },
  { key:'email', title:'Email', dataIndex:'email', sortable:true },
  { key:'status', title:'Status', dataIndex:'status' }
];

const meta: Meta<typeof DataTable> = { title: 'Components/DataTable', component: DataTable };
export default meta; type Story = StoryObj<typeof meta>;

export const Basic: Story = { args: { data, columns } };
export const Selectable: Story = { args: { data, columns, selectable:true, multiSelect:true } };
export const Loading: Story = { args: { data: [], columns, loading:true } };
