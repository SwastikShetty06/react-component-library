/* Utility functions
   - cn: className helper using clsx
   - generateId: small helper for unique id generation (useful in tests/demos)
*/

import { clsx } from 'clsx';
export function cn(...args: any[]) { return clsx(...args); }

export function generateId(prefix = 'id') {
  return `${prefix}-${Math.random().toString(36).slice(2,9)}`;
}
