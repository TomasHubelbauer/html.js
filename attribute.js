export default function attribute(/** @type {HTMLElement} */ element, /** @type {string} */ key, /** @type {string | { [key: string]: string; }} */ value) {
  if (value === undefined) {
    return;
  }

  switch (key) {
    case 'style': {
      if (typeof value !== 'object') {
        throw new Error('The style attribute must be an object.');
      }

      for (const key in value) {
        element.style.setProperty(key, value[key]);
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
            element.classList.toggle(key, !!value[key]);
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
          element.dataset[key] = value[key].toString();
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
      if (typeof value === 'object') {
        throw new Error(`The ${key} attribute must not be an object!`);
      }

      if (key.startsWith('on') && typeof value === 'function') {
        element.addEventListener(key.slice('on'.length), value);
      }
      else {
        element.setAttribute(key, value);
      }
    }
  }
}
