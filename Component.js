import { link, div } from './index.js';
import './Component.test.js';

/**
 * Provides a base class for all custom HTML elements (web components) which
 * automatically registers the component under a tag name based on the derived
 * class' name and places a stylesheet `link` DOM element referencing a CSS file
 * by the same name as that of the component into the component's shadow root.
 * 
 * Extend by passing the derived class symbol into the `super` call, so:
 * 
 * @example
 * 
 * class MyComponent extends Component {
 *   constructor() {
 *     super(MyComponent);
 *   }
 * }
 */
export default class Component extends HTMLElement {
  constructor(/** @type {Component} */ constructor) {
    if (!constructor) {
      throw new Error('Constructor not defined! Pass the derived class name, e.g.: `super(MyComponent)` instead of `super()`!');
    }

    // TODO: Consider distinguishing components with the same name in different folders if possible
    // Derive the component custom HTML element tag name from its constructor class name
    const name = 'paper' + constructor.name.replace(/[A-Z]/g, match => '-' + match[0].toLowerCase());

    // Define the custom element before calling `super` so that the `super` call succeeds
    if (!customElements.get(name)) {
      customElements.define(name, constructor);
    }

    // Call the base `HTMLElement` class which will succeed as the component class constructor now has a defined element
    super();

    // Check that the provided constructor was correct to prevent against copy-paste errors and element misdefinitions
    if (constructor !== this.constructor) {
      throw new Error(`Incorrect constructor passed! Pass ${this.constructor.name} instead of ${constructor.name}!`);
    }

    // Bind class methods automatically for convenience
    const proto = Reflect.getPrototypeOf(this);
    const keys = Reflect.ownKeys(proto);
    for (const key of keys) {
      const value = this[key];

      if (typeof value !== 'function') {
        continue;
      }

      if (value === this.constructor) {
        continue;
      }

      this[key] = value.bind(this);
    }

    // Attach shadow in the closed mode to isolate the component's styles
    this._shadowRoot = this.attachShadow({ mode: 'closed' });

    // Throw and catch an error and parse out the current file name to check against the class name and import stylesheet
    try {
      throw new Error();
    }
    catch (error) {
      // Take the second URL which appears in the stack (the first is Component.js)
      const [, url] = [...error.stack.matchAll(/https?:\/\/[^\/]+\/(.*\/)?(.*)\.js:\d+:\d+/g)];

      // Pull out the path name (`undefined` if in root) and the script file name
      const [, pathName, fileName] = url;

      // Validate the component class name matches the script module file name
      if (constructor.name !== fileName && fileName !== 'Component.test') {
        throw new Error(`Component class name ${constructor.name} does not match file name ${fileName}!`);
      }

      // Import the global reset stylesheet which handles component rendering visualization animation
      this._shadowRoot.append(link({ rel: 'stylesheet', href: '/reset.css' }));

      // Import the component's styles by appending a `link` element pointing to a CSS file by the name of the component
      this._shadowRoot.append(
        link({
          rel: 'stylesheet',
          href: `${pathName || ''}${fileName}.css`,

          // Call the `mount` method if provided by the derived class once the stylesheet has been loaded to prevent FOUC
          onload: this.handleLinkLoad.bind(this),

          // Throw in case the component has no associated stylesheet as we require it as a matter of convention
          onerror: this.handleLinkError.bind(this),
        })
      );
    }

    // Create a wrapper `div` element to be able to apply styles to self
    this._div = div({ id: this.constructor.name });
    this._shadowRoot.append(this._div);
  }

  async handleLinkLoad() {
    try {
      await this.mount();
    }
    catch (error) {
      throw new Error(`${this.constructor.name} failed to mount. ${error}`);
    }
  }

  handleLinkError() {
    throw new Error(`The stylesheet for ${this.constructor.name} failed to load!`);
  }

  /**
   * Drain a generator such that even a value returned by `return` is captured.
   * 
   * @example
   * 
   * async function *test() {
   *   yield 1;
   *   yield 2;
   *   return 3;
   * }
   * 
   * // This does not work, prints 1, 2:
   * for await (const number of test()) {
   *   console.log(number);
   * }
   * 
   * // This works, prints 1, 2, 3:
   * for await (const number of drain(test())) {
   *   console.log(number);
   * }
   */
  async *drain(generator) {
    let item;
    do {
      item = await generator.next();

      // Yield a `yield`-produced value always
      if (!item.done) {
        yield item.value;
      }

      // Yield a `return`-produced value only if there is no, not for `return;`
      else if (item.value !== undefined) {
        yield item.value;
      }
    } while (!item.done);
  }

  async mount() {
    if (!this.render) {
      return;
    }

    if (typeof this.render !== 'function') {
      throw new Error(`'${this.constructor.name}.render' must be a function.`);
    }

    this._div.classList.toggle('rendering', true);
    this._div.innerHTML = '';

    switch (this.render.constructor.name) {
      case 'Function':
      case 'AsyncFunction': {
        this._div.append(await this.render());
        break;
      }
      case 'GeneratorFunction':
      case 'AsyncGeneratorFunction': {
        for await (const node of this.drain(this.render())) {
          if (node === undefined) {
            this._div.innerHTML = '';
          }
          else {
            this._div.append(node);
          }
        }

        break;
      }
      default: {
        throw new Error(`${this.constructor.name} render function is neither generator nor async: ${this.render.constructor.name}.`);
      }
    }

    this._div.classList.toggle('rendering', false);
  }

  raise(name, detail = null) {
    // Bubble the event
    if (name instanceof Event) {
      this.dispatchEvent(new CustomEvent(name.type, name));
      return;
    }

    this.dispatchEvent(new CustomEvent(name, { detail }));
  }
}
