export { default as Component } from './Component.js';

/** @typedef {{[attribute: string]: string | number | boolean}} Attributes */
/** @typedef {Node[]} Children */

export function html(/** @type {string | HTMLElement} */ tag, /** @type {Attributes} */ attributes, /** @type {Children} */ ...children) {
  const element = typeof tag === 'string' ? document.createElement(tag) : tag;

  if (attributes) {
    if (typeof attributes === 'string' || typeof attributes === 'number' || typeof attributes === 'boolean' || attributes instanceof HTMLElement) {
      children.unshift(attributes);
    }
    else if (typeof attributes === 'object') {
      for (const key in attributes) {
        const value = attributes[key];
        if (value === undefined) {
          continue;
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
            element.innerHTML = value;
            break;
          }
          case 'innerText': {
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
    }
    else {
      throw new Error(`The attributes must be an object not ${typeof attributes}.`);
    }
  }

  if (children) {
    parent(element, children);
  }

  return element;
}

function parent(/** @type {HTMLElement} */ element, child) {
  if (child === null || child === undefined) {
    return;
  }

  if (Array.isArray(child)) {
    for (const kid of child) {
      parent(element, kid);
    }

    return;
  }

  if (typeof child === 'string' || typeof child === 'number' || typeof child === 'boolean' || child instanceof HTMLElement) {
    element.append(child);
    return;
  }

  if (typeof child === 'function') {
    parent(element, child());
    return;
  }

  if (typeof child[Symbol.iterator] === 'function') {
    for (const kid of child) {
      parent(element, kid);
    }

    return;
  }

  if (child instanceof Error) {
    parent(element, div(child.message));
    parent(element, child.stack.split('\n').map(div));
    return;
  }

  throw new Error(`The child must be a string, a number, a boolean or an HTMLElement not ${typeof child}.`);
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

export function video(/** @type {Attributes} */ attributes) {
  return html('video', attributes);
}
