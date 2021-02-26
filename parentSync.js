import _parent from './parent.js';
import drain from './drain.js';

/** @typedef {string | number | boolean | function | HTMLElement} Child */

export default function parent(/** @type {HTMLElement} */ element, /** @type {Child | Child[]} */ child, reset = false) {
  if (reset) {
    element.innerHTML = '';
  }

  const _child = _parent(element, child);
  if (_child === undefined) {
    return;
  }

  if (Array.isArray(_child)) {
    for (const child of _child) {
      parent(element, child);
    }

    return;
  }

  if (typeof _child === 'function') {
    switch (_child.constructor.name) {
      case 'Function': {
        parent(element, _child());
        break;
      }
      case 'AsyncFunction': {
        throw new Error('Use htmlAsync instead of html in order to use async functions as children.');
      }
      case 'GeneratorFunction': {
        for (const child of drain(_child())) {
          parent(element, child);
        }

        break;
      }
      case 'AsyncGeneratorFunction': {
        throw new Error('Use htmlAsync instead of html in order to use async functions as children.');
      }
      default: {
        throw new Error(`Unsupported function kind ${_child.constructor.name}.`);
      }
    }

    return;
  }

  if (typeof child === 'object') {
    switch (child[Symbol.toStringTag]) {
      case 'Generator': {
        for (const _child of drain(child)) {
          parent(element, _child);
        }

        return;
      }
      case 'AsyncGenerator': {
        throw new Error('Use htmlAsync instead of html in order to use async generators as children.');
      }
    }
  }

  throw new Error(`The child must be a string, a number, a boolean, a function, a generator, or an HTMLElement, not ${typeof child}.`);
}
