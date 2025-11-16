export type ReactText = string | number;
export type ReactNode = ReactText | ReactElement | Iterable<ReactNode> | boolean | null | undefined;

export interface ReactElement<P = any, T extends string | ((props: any) => ReactNode) | symbol = any> {
  type: T;
  props: P & { children?: ReactNode };
}

export type FC<P = {}> = (props: P & { children?: ReactNode }) => ReactNode;

export function useState<S>(
  initialState: S | (() => S),
): [S, (nextState: S | ((previous: S) => S)) => void];

export const Fragment: unique symbol;
export function createElement(type: any, props?: any, ...children: ReactNode[]): ReactElement;

export as namespace React;

declare const ReactDefault: {
  createElement: typeof createElement;
  Fragment: typeof Fragment;
  useState: typeof useState;
};

declare global {
  namespace JSX {
    type Element = ReactElement;
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

export default ReactDefault;
