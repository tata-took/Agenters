import type { ReactNode } from 'react';

export interface Root {
  render(node: ReactNode): void;
}

export function createRoot(container: Element | DocumentFragment): Root;
