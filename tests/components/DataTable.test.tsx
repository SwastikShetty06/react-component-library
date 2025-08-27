import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import DataTable from '../../src/components/DataTable/DataTable';

expect.extend(toHaveNoViolations);

describe('DataTable', () => {
  it('renders headers and rows', () => {
    const data = [{ id:1, name:'A' }, { id:2, name:'B' }];
    const columns = [{ key:'name', title:'Name', dataIndex:'name' }];
    render(<DataTable data={data} columns={columns as any} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const data = [{ id:1, name:'A' }];
    const columns = [{ key:'name', title:'Name', dataIndex:'name' }];
    const { container } = render(<DataTable data={data} columns={columns as any} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
