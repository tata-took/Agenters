import { __prepareForRender } from 'react';

const FragmentSymbol = Symbol.for('react.fragment');

const isPrimitive = (value) => typeof value === 'string' || typeof value === 'number';

const normalizeChildren = (input) => {
  if (input == null || input === false) {
    return [];
  }
  if (Array.isArray(input)) {
    return input.flatMap((item) => normalizeChildren(item));
  }
  return [input];
};

const applyProps = (element, props = {}) => {
  Object.entries(props).forEach(([key, value]) => {
    if (key === 'children' || value === undefined || value === null) {
      return;
    }
    if (key === 'className') {
      element.className = value;
      return;
    }
    if (key === 'style') {
      if (typeof value === 'string') {
        element.style.cssText = value;
      } else if (typeof value === 'object') {
        Object.entries(value).forEach(([cssKey, cssValue]) => {
          element.style[cssKey] = cssValue;
        });
      }
      return;
    }
    if (key.startsWith('on') && typeof value === 'function') {
      const eventName = key.slice(2).toLowerCase();
      element.addEventListener(eventName, value);
      return;
    }
    if (key in element) {
      try {
        element[key] = value;
        return;
      } catch (error) {
        // fall back to attribute
      }
    }
    element.setAttribute(key, String(value));
  });
};

const mountNode = (node) => {
  if (node == null || node === false) {
    return document.createComment('');
  }

  if (isPrimitive(node)) {
    return document.createTextNode(String(node));
  }

  if (Array.isArray(node)) {
    const fragment = document.createDocumentFragment();
    node.forEach((child) => {
      const domNode = mountNode(child);
      if (domNode) {
        fragment.appendChild(domNode);
      }
    });
    return fragment;
  }

  if (typeof node.type === 'function') {
    const rendered = node.type({ ...(node.props ?? {}) });
    return mountNode(rendered);
  }

  if (node.type === FragmentSymbol) {
    const fragment = document.createDocumentFragment();
    normalizeChildren(node.props?.children).forEach((child) => {
      const domNode = mountNode(child);
      if (domNode) {
        fragment.appendChild(domNode);
      }
    });
    return fragment;
  }

  const element = document.createElement(node.type);
  applyProps(element, node.props);
  normalizeChildren(node.props?.children).forEach((child) => {
    const domNode = mountNode(child);
    if (domNode) {
      element.appendChild(domNode);
    }
  });
  return element;
};

export const createRoot = (container) => {
  let currentTree = null;

  const performRender = () => {
    if (!currentTree) {
      return;
    }
    __prepareForRender(performRender);
    const node = mountNode(currentTree);
    container.innerHTML = '';
    if (node) {
      container.appendChild(node);
    }
  };

  return {
    render(tree) {
      currentTree = tree;
      performRender();
    },
  };
};
