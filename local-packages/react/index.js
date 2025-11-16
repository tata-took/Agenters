const Fragment = Symbol.for('react.fragment');

const hookStates = [];
let hookIndex = 0;
let renderCallback = null;
let scheduled = false;

const ensureValue = (value) => (typeof value === 'function' ? value() : value);

export const __prepareForRender = (callback) => {
  renderCallback = callback;
  hookIndex = 0;
};

const queueRender = () => {
  if (!renderCallback || scheduled) {
    return;
  }
  scheduled = true;
  queueMicrotask(() => {
    scheduled = false;
    hookIndex = 0;
    renderCallback();
  });
};

export const useState = (initial) => {
  const currentIndex = hookIndex;
  if (hookStates.length <= currentIndex) {
    hookStates[currentIndex] = ensureValue(initial);
  }
  const setState = (value) => {
    const resolvedValue = typeof value === 'function' ? value(hookStates[currentIndex]) : value;
    if (!Object.is(resolvedValue, hookStates[currentIndex])) {
      hookStates[currentIndex] = resolvedValue;
      queueRender();
    }
  };
  const snapshot = hookStates[currentIndex];
  hookIndex += 1;
  return [snapshot, setState];
};

export const createElement = (type, props, ...children) => {
  return {
    type,
    props: {
      ...(props ?? {}),
      children: children.length > 0 ? children : props?.children,
    },
  };
};

export { Fragment };

export default {
  createElement,
  Fragment,
  useState,
};
