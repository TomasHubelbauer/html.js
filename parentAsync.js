import drain from './drainAsync.js';
import _parent from './parent.js';

export default async function parentAsync(/** @type {HTMLElement} */ element, /** @type {Child | Child[]} */ child, reset = false) {
  if (reset) {
    element.innerHTML = '';
  }

  /** @ts-ignore */
  const _child = _parent(element, child);
  if (_child === undefined) {
    return;
  }

  if (Array.isArray(_child)) {
    for (const child of _child) {
      await parentAsync(element, child);
    }

    return;
  }

  if (typeof _child === 'function') {
    switch (_child.constructor.name) {
      case 'Function':
      case 'AsyncFunction': {
        await parentAsync(element, await _child());
        break;
      }
      case 'GeneratorFunction':
      case 'AsyncGeneratorFunction': {
        for await (const child of drain(_child())) {
          await parentAsync(element, child);
        }

        break;
      }
      default: {
        throw new Error(`Unsupported function kind ${_child.constructor.name}.`);
      }
    }

    return;
  }

  if (typeof child === 'object') {
    /** @ts-ignore */
    switch (child[Symbol.toStringTag]) {
      case 'Generator':
      case 'AsyncGenerator': {
        /** @ts-ignore */
        for await (const _child of drain(child)) {
          await parentAsync(element, _child);
        }

        return;
      }
    }
  }

  throw new Error(`The child must be a string, a number, a boolean, a function, a generator, or an HTMLElement, not ${typeof child}.`);
}
