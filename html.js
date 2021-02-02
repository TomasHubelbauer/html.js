import attribute from './attribute.js';

/** @typedef {{[attribute: string]: string | number | boolean}} Attributes */
/** @typedef {string | number | boolean | function | HTMLElement} Child */

export default function html(/** @type {string | HTMLElement} */ tag, /** @type {Attributes} */ attributes, /** @type {Child[]} */ children) {
  const element = typeof tag === 'string' ? document.createElement(tag) : tag;

  if (attributes !== undefined && attributes !== null) {
    if (typeof attributes === 'string' || typeof attributes === 'number' || typeof attributes === 'boolean' || typeof attributes === 'function' || attributes instanceof HTMLElement) {
      children.unshift(attributes);
    }
    else if (typeof attributes === 'object') {
      if (attributes[Symbol.toStringTag] === 'Generator' || attributes[Symbol.toStringTag] === 'AsyncGenerator') {
        children.unshift(attributes);
      }
      else {
        for (const key in attributes) {
          const value = attributes[key];
          attribute(element, key, value);
        }
      }
    }
    else {
      throw new Error(`The attributes argument must be a primitive type or an object, not ${typeof attributes}.`);
    }
  }

  return element;
}
