export { Fragment, createElement } from './index.js';

export const jsx = (type, props = {}, key) => {
  return {
    type,
    key: key ?? null,
    props,
  };
};

export const jsxs = jsx;
export const jsxDEV = jsx;
