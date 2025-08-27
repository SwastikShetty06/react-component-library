/* HUMAN: Project-wide TypeScript types
   - BaseComponentProps: common props shared across components
   - Size, Variant aliases and SortState interface used by DataTable
*/

export interface BaseComponentProps {
  className?: string;
  id?: string;
  'data-testid'?: string;
}

export type Size = 'sm' | 'md' | 'lg';
export type Variant = 'filled' | 'outlined' | 'ghost';

export interface SortState {
  column: string | null;
  direction: 'asc' | 'desc' | null;
}
