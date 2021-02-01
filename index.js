/** TODO: Add `*Async` version of each element helper function exported */

export { default as Component } from './Component.js';
import './index.test.js';

/** @typedef {{[attribute: string]: string | number | boolean}} Attributes */
/** @typedef {string | number | boolean | function | HTMLElement} Child */

function _html(/** @type {string | HTMLElement} */ tag, /** @type {Attributes} */ attributes, /** @type {Child[]} */ children) {
  const element = typeof tag === 'string' ? document.createElement(tag) : tag;

  if (attributes !== undefined) {
    if (typeof attributes === 'string' || typeof attributes === 'number' || typeof attributes === 'boolean' || typeof attributes === 'function' || attributes instanceof HTMLElement) {
      children.unshift(attributes);
    }
    else if (typeof attributes === 'object') {
      for (const key in attributes) {
        const value = attributes[key];
        attribute(element, key, value);
      }
    }
    else {
      throw new Error(`The attributes argument must be a primitive type or an object, not ${typeof attributes}.`);
    }
  }

  return element;
}

export function html(/** @type {string | HTMLElement} */ tag, /** @type {Attributes} */ attributes, /** @type {Children} */ ...children) {
  // Capture array such that changes made to it by `_html` are preserved
  const _children = [...children];
  const element = _html(tag, attributes, _children);
  parent(element, _children);
  return element;
}

export async function htmlAsync(/** @type {string | HTMLElement} */ tag, /** @type {Attributes} */ attributes, /** @type {Children} */ ...children) {
  // Capture array such that changes made to it by `_html` are preserved
  const _children = [...children];
  const element = _html(tag, attributes, _children);
  await parentAsync(element, _children);
  return element;
}

function attribute(/** @type {HTMLElement} */ element, /* @type {string} */ key, /** @type {unknown} */ value) {
  if (value === undefined) {
    return;
  }

  switch (key) {
    case 'style': {
      if (typeof value !== 'object') {
        throw new Error('The style attribute must be an object.');
      }

      for (const key in value) {
        element.style[key] = value[key];
      }

      break;
    }
    case 'class': {
      switch (typeof value) {
        case 'string': {
          element.className = value;
          break;
        }
        case 'object': {
          for (const key in value) {
            element.classList.toggle(key, value[key]);
          }

          break;
        }
        default: {
          throw new Error('The style attribute must either be a string or an object.');
        }
      }

      break;
    }
    case 'data': {
      if (typeof value !== 'object') {
        throw new Error('The data(set) attribute must be an object.');
      }

      for (const key in value) {
        try {
          element.dataset[key] = value[key];
        }
        catch (error) {
          throw new Error(`Failed to set data attribute '${key}': '${value[key]}'.`);
        }
      }

      break;
    }
    case 'innerHTML': {
      if (typeof value !== 'string') {
        throw new Error('The innerHTML attribute must be a string.');
      }

      element.innerHTML = value;
      break;
    }
    case 'innerText': {
      if (typeof value !== 'string') {
        throw new Error('The innerText attribute must be a string.');
      }

      element.innerText = value;
      break;
    }
    default: {
      if (key.startsWith('on') && typeof value === 'function') {
        element.addEventListener(key.slice('on'.length), value);
      }
      else {
        element.setAttribute(key, value);
      }
    }
  }
}

function _parent(/** @type {HTMLElement} */ element, /** @type {Child | Child[]} */ child) {
  if (child === null || child === undefined) {
    return;
  }

  if (typeof child === 'string' || typeof child === 'number' || typeof child === 'boolean' || child instanceof HTMLElement) {
    element.append(child);
    return;
  }

  if (Array.isArray(child)) {
    return child;
  }

  if (typeof child === 'function') {
    return child;
  }

  throw new Error(`The child must be a string, a number, a boolean, a function or an HTMLElement, not ${typeof child}.`);
}

function parent(/** @type {HTMLElement} */ element, /** @type {Child | Child[]} */ child) {
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
        const generator = _child();
        let child;

        // Drain the generator including potential `return` value, see `Component.drain` for more
        do {
          child = generator.next();

          // Yield a `yield`-produced value always
          if (!child.done) {
            parent(element, child.value);
          }

          // Yield a `return`-produced value only if there is no, not for `return;`
          else if (child.value !== undefined) {
            parent(element, child.value);
          }
        } while (!child.done);

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

  throw new Error(`The child must be a string, a number, a boolean, a function or an HTMLElement, not ${typeof child}.`);
}

async function parentAsync(/** @type {HTMLElement} */ element, /** @type {Child | Child[]} */ child) {
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
        const generator = _child();
        let child;

        // Drain the generator including potential `return` value, see `Component.drain` for more
        do {
          child = await generator.next();

          // Yield a `yield`-produced value always
          if (!child.done) {
            await parentAsync(element, child.value);
          }

          // Yield a `return`-produced value only if there is no, not for `return;`
          else if (child.value !== undefined) {
            await parentAsync(element, child.value);
          }
        } while (!child.done);

        break;
      }
      default: {
        throw new Error(`Unsupported function kind ${_child.constructor.name}.`);
      }
    }

    return;
  }

  throw new Error(`The child must be a string, a number, a boolean, a function or an HTMLElement, not ${typeof child}.`);
}

export function a(/** @type {Attributes} */ attributes, /** @type {Children} */ ...children) {
  return html('a', attributes, ...children);
}

export function audio(/** @type {Attributes} */ attributes) {
  return html('audio', attributes);
}

export function button(/** @type {Attributes} */ attributes, /** @type {Children} */ ...children) {
  return html('button', attributes, ...children);
}

export function br(/** @type {Attributes} */ attributes) {
  return html('br', attributes);
}

export function canvas(/** @type {Attributes} */ attributes) {
  return html('canvas', attributes);
}

export function code(/** @type {Attributes} */ attributes, /** @type {Children} */ ...children) {
  return html('code', attributes, ...children);
}

export function datalist(/** @type {Attributes} */ attributes, /** @type {Children} */ ...children) {
  return html('datalist', attributes, ...children);
}

export function details(/** @type {Attributes} */ attributes, /** @type {Children} */ ...children) {
  return html('details', attributes, ...children);
}

export function div(/** @type {Attributes} */ attributes, /** @type {Children} */ ...children) {
  return html('div', attributes, ...children);
}

export async function divAsync(/** @type {Attributes} */ attributes, /** @type {Children} */ ...children) {
  return await htmlAsync('div', attributes, ...children);
}

export function fieldset(/** @type {Attributes} */ attributes, /** @type {Children} */ ...children) {
  return html('fieldset', attributes, ...children);
}

export function h1(/** @type {Attributes} */ attributes, /** @type {Children} */ ...children) {
  return html('h1', attributes, ...children);
}

export function h2(/** @type {Attributes} */ attributes, /** @type {Children} */ ...children) {
  return html('h2', attributes, ...children);
}

export function h3(/** @type {Attributes} */ attributes, /** @type {Children} */ ...children) {
  return html('h3', attributes, ...children);
}

export function iframe(/** @type {Attributes} */ attributes, /** @type {Children} */ ...children) {
  return html('iframe', attributes, ...children);
}

export function img(/** @type {Attributes} */ attributes) {
  return html('img', attributes);
}

export function input(/** @type {Attributes} */ attributes) {
  return html('input', attributes);
}

export function label(/** @type {Attributes} */ attributes, /** @type {Children} */ ...children) {
  return html('label', attributes, ...children);
}

export function legend(/** @type {Attributes} */ attributes, /** @type {Children} */ ...children) {
  return html('legend', attributes, ...children);
}

export function li(/** @type {Attributes} */ attributes, /** @type {Children} */ ...children) {
  return html('li', attributes, ...children);
}

export function link(/** @type {Attributes} */ attributes, /** @type {Children} */ ...children) {
  return html('link', attributes, ...children);
}

export function option(/** @type {Attributes} */ attributes, /** @type {Children} */ ...children) {
  return html('option', attributes, ...children);
}

export function p(/** @type {Attributes} */ attributes, /** @type {Children} */ ...children) {
  return html('p', attributes, ...children);
}

export function pre(/** @type {Attributes} */ attributes, /** @type {Children} */ ...children) {
  return html('pre', attributes, ...children);
}

export function progress(/** @type {Attributes} */ attributes) {
  return html('progress', attributes);
}

export function script(/** @type {Attributes} */ attributes) {
  return html('script', attributes);
}

export function select(/** @type {Attributes} */ attributes, /** @type {Children} */ ...children) {
  return html('select', attributes, ...children);
}

export function span(/** @type {Attributes} */ attributes, /** @type {Children} */ ...children) {
  return html('span', attributes, ...children);
}

export function strong(/** @type {Attributes} */ attributes, /** @type {Children} */ ...children) {
  return html('strong', attributes, ...children);
}

export function summary(/** @type {Attributes} */ attributes, /** @type {Children} */ ...children) {
  return html('summary', attributes, ...children);
}

export function table(/** @type {Attributes} */ attributes, /** @type {Children} */ ...children) {
  return html('table', attributes, ...children);
}

export function tbody(/** @type {Attributes} */ attributes, /** @type {Children} */ ...children) {
  return html('tbody', attributes, ...children);
}

export function td(/** @type {Attributes} */ attributes, /** @type {Children} */ ...children) {
  return html('td', attributes, ...children);
}

export function textarea(/** @type {Attributes} */ attributes) {
  return html('textarea', attributes);
}

export function th(/** @type {Attributes} */ attributes, /** @type {Children} */ ...children) {
  return html('th', attributes, ...children);
}

export function thead(/** @type {Attributes} */ attributes, /** @type {Children} */ ...children) {
  return html('thead', attributes, ...children);
}

export function tr(/** @type {Attributes} */ attributes, /** @type {Children} */ ...children) {
  return html('tr', attributes, ...children);
}

export function ul(/** @type {Attributes} */ attributes, /** @type {Children} */ ...children) {
  return html('ul', attributes, ...children);
}

export function video(/** @type {Attributes} */ attributes) {
  return html('video', attributes);
}
