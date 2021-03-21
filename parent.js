/** @typedef {string | number | boolean | function | HTMLElement} Child */

export default function parent(/** @type {HTMLElement} */ element, /** @type {Child | Child[]} */ child) {
  if (child === null || child === undefined) {
    return;
  }

  if (typeof child === 'string' || typeof child === 'number' || typeof child === 'boolean' || child instanceof HTMLElement) {
    element.append(child.toString());
    return;
  }

  if (Array.isArray(child)) {
    return child;
  }

  if (typeof child === 'function') {
    return child;
  }

  if (typeof child === 'object' && (child[Symbol.toStringTag] === 'Generator' || child[Symbol.toStringTag] === 'AsyncGenerator')) {
    return child;
  }

  throw new Error(`The child must be a string, a number, a boolean, a function, a generator, or an HTMLElement, not ${typeof child}.`);
}
