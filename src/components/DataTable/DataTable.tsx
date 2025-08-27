/* DataTable component
   - Purpose: Render tabular data with optional sorting and row selection.
   - Notes: This file intentionally aims for clarity and accessibility:
     * Clear types for Column & DataTableProps
     * ARIA attributes for table semantics
     * sortedData memoized for performance
   - Author: Swastik Shetty (polished for assignment)
*/

import React, { useMemo, useState, useCallback } from 'react';
import { ChevronUp, ChevronDown, Loader2 } from 'lucide-react';
import type { BaseComponentProps, SortState } from '@/types';
import { cn } from '@/lib/utils';

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
  render?: (value: any, row: T, index: number) => React.ReactNode;
  width?: number | string;
  align?: 'left'|'center'|'right';
}

export interface DataTableProps<T> extends BaseComponentProps {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  multiSelect?: boolean;
  selectedRowKeys?: (string|number)[];
  rowKey?: keyof T | ((row: T) => string|number);
  onRowSelect?: (selectedRows: T[]) => void;
  onSort?: (columnKey: string, direction: 'asc'|'desc'|null) => void;
  emptyText?: string;
}

function DataTableInner<T extends Record<string, any>>(props: DataTableProps<T>) {
  const {
    data,
    columns,
    loading = false,
    selectable = false,
    multiSelect = false,
    selectedRowKeys = [],
    rowKey = 'id' as keyof T,
    onRowSelect,
    onSort,
    emptyText = 'No data',
    className,
    'data-testid': testId
  } = props;

  const [sortState, setSortState] = useState<SortState>({ column: null, direction: null });
  const [internalSelected, setInternalSelected] = useState<(string|number)[]>([]);

  const getRowKey = useCallback((row: T) => {
    if (typeof rowKey === 'function') return rowKey(row);
    return row[rowKey] as string|number;
  }, [rowKey]);

  const selectedKeys = selectedRowKeys.length ? selectedRowKeys : internalSelected;

  const toggleSelect = (key: string|number) => {
    let next = [...selectedKeys];
    const idx = next.indexOf(key);
    if (idx >= 0) next.splice(idx, 1);
    else {
      if (multiSelect) next.push(key);
      else next = [key];
    }
    if (!selectedRowKeys.length) setInternalSelected(next);
    if (onRowSelect) {
      const rows = data.filter((r)=> next.includes(getRowKey(r)));
      onRowSelect(rows);
    }
  };

  const toggleSelectAll = () => {
    if (selectedKeys.length === data.length) {
      if (!selectedRowKeys.length) setInternalSelected([]);
      if (onRowSelect) onRowSelect([]);
      return;
    }
    const all = data.map((r)=> getRowKey(r));
    if (!selectedRowKeys.length) setInternalSelected(all);
    if (onRowSelect) onRowSelect(data);
  };

  const sortedData = useMemo(() => {
    if (!sortState.column || !sortState.direction) return data;
    const col = columns.find(c=> c.key === sortState.column);
    if (!col) return data;
    const idx = col.dataIndex as string;
    const copy = [...data].sort((a,b)=>{
      const av = a[idx as keyof T]; const bv = b[idx as keyof T];
      if (av == null) return 1;
      if (bv == null) return -1;
      if (av === bv) return 0;
      return sortState.direction === 'asc' ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1);
    });
    return copy;
  }, [data, sortState, columns]);

  const handleSort = (columnKey: string, sortable?: boolean) => {
    if (!sortable) return;
    setSortState((s)=> {
      let nextDir: 'asc'|'desc'|null = 'asc';
      if (s.column === columnKey) {
        nextDir = s.direction === 'asc' ? 'desc' : s.direction === 'desc' ? null : 'asc';
      }
      const next = { column: nextDir ? columnKey : null, direction: nextDir };
      if (onSort) onSort(columnKey, nextDir);
      return next;
    });
  };

  return (
    <div className={cn('overflow-auto', className)} data-testid={testId}>
      <table className="table-root" role="table">
        <thead className="table-header">
          <tr role="row">
            {selectable && (
              <th role="columnheader" className="table-th w-12">
                <input aria-label="Select all" type="checkbox" onChange={toggleSelectAll} checked={selectedKeys.length === data.length && data.length>0} />
              </th>
            )}
            {columns.map((col)=> (
              <th key={col.key} role="columnheader" scope="col" className="table-th">
                <button onClick={()=> handleSort(col.key, col.sortable)} className="flex items-center gap-2">
                  <span>{col.title}</span>
                  {col.sortable ? (
                    <span aria-hidden>
                      {sortState.column === col.key ? (sortState.direction === 'asc' ? <ChevronUp size={14} /> : sortState.direction === 'desc' ? <ChevronDown size={14} /> : null) : <ChevronUp size={14} style={{opacity:0.2}} />}
                    </span>
                  ) : null}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody role="rowgroup">
          {loading ? (
            <tr><td colSpan={columns.length + (selectable?1:0)} className="p-6 text-center"><Loader2 className="animate-spin inline-block" /></td></tr>
          ) : sortedData.length === 0 ? (
            <tr><td colSpan={columns.length + (selectable?1:0)} className="p-6 text-center">{emptyText}</td></tr>
          ) : (
            sortedData.map((row, idx)=> {
              const key = getRowKey(row);
              const selected = selectedKeys.includes(key);
              return (
                <tr key={String(key)} role="row" className={cn('table-row', selected ? 'table-row-selected' : '', idx % 2 === 0 ? 'bg-white' : 'bg-gray-50')}>
                  {selectable && (
                    <td className="table-td w-12">
                      <input aria-label={`Select row ${idx+1}`} type="checkbox" checked={selected} onChange={()=> toggleSelect(key)} />
                    </td>
                  )}
                  {columns.map((col)=> {
                    const value = row[col.dataIndex as keyof T];
                    return (
                      <td key={col.key} className="table-td">
                        {col.render ? col.render(value, row, idx) : String(value)}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTableInner;
