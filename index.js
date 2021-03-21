/** TODO: Add `*Async` version of each element helper function exported */

export { default as Component } from './Component.js';
import _html from './html.js';
import './index.test.js';
import parentAsync from './parentAsync.js';
import parentSync from './parentSync.js';

export function html(/** @type {string | HTMLElement} */ tag, /** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  // Capture array such that changes made to it by `_html` are preserved
  const _children = [...children];
  const element = _html(tag, attributes, _children);
  parentSync(element, _children);
  return element;
}

export async function htmlAsync(/** @type {string | HTMLElement} */ tag, /** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  // Capture array such that changes made to it by `_html` are preserved
  const _children = [...children];
  const element = _html(tag, attributes, _children);
  await parentAsync(element, _children);
  return element;
}

export function a(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  return html('a', attributes, ...children);
}

/** @return {HTMLAudioElement} */
export function audio(/** @type {Attributes} */ attributes) {
  /** @ts-ignore */
  return html('audio', attributes);
}

/** @returns {HTMLButtonElement} */
export function button(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  /** @ts-ignore */
  return html('button', attributes, ...children);
}

/** @returns {HTMLBRElement} */
export function br(/** @type {Attributes} */ attributes) {
  /** @ts-ignore */
  return html('br', attributes);
}

/** @returns {HTMLCanvasElement} */
export function canvas(/** @type {Attributes} */ attributes) {
  /** @ts-ignore */
  return html('canvas', attributes);
}

// Note that `HTMLElement` is the correct type for the `code` element
export function code(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  return html('code', attributes, ...children);
}

/** @returns {HTMLDataListElement} */
export function datalist(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  /** @ts-ignore */
  return html('datalist', attributes, ...children);
}

/** @returns {HTMLDetailsElement} */
export function details(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  /** @ts-ignore */
  return html('details', attributes, ...children);
}

/** @returns {HTMLDivElement} */
export function div(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  /** @ts-ignore */
  return html('div', attributes, ...children);
}

/** @returns {Promise<HTMLDivElement>} */
export async function divAsync(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  /** @ts-ignore */
  return await htmlAsync('div', attributes, ...children);
}

/** @returns {HTMLFieldSetElement} */
export function fieldset(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  /** @ts-ignore */
  return html('fieldset', attributes, ...children);
}

/** @returns {HTMLHeadingElement} */
export function h1(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  /** @ts-ignore */
  return html('h1', attributes, ...children);
}

/** @returns {HTMLHeadingElement} */
export function h2(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  /** @ts-ignore */
  return html('h2', attributes, ...children);
}

/** @returns {HTMLHeadingElement} */
export function h3(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  /** @ts-ignore */
  return html('h3', attributes, ...children);
}

/** @returns {HTMLFieldSetElement} */
export function iframe(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  /** @ts-ignore */
  return html('iframe', attributes, ...children);
}

/** @returns {HTMLImageElement} */
export function img(/** @type {Attributes} */ attributes) {
  /** @ts-ignore */
  return html('img', attributes);
}

/** @return {HTMLInputElement} */
export function input(/** @type {Attributes} */ attributes) {
  /** @ts-ignore */
  return html('input', attributes);
}

/** @returns {HTMLLabelElement} */
export function label(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  /** @ts-ignore */
  return html('label', attributes, ...children);
}

/** @returns {HTMLLegendElement} */
export function legend(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  /** @ts-ignore */
  return html('legend', attributes, ...children);
}

/** @returns {HTMLLIElement} */
export function li(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  /** @ts-ignore */
  return html('li', attributes, ...children);
}

/** @returns {HTMLLinkElement} */
export function link(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  /** @ts-ignore */
  return html('link', attributes, ...children);
}

/** @returns {HTMLOptionElement} */
export function option(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  /** @ts-ignore */
  return html('option', attributes, ...children);
}

/** @returns {HTMLParagraphElement} */
export function p(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  /** @ts-ignore */
  return html('p', attributes, ...children);
}

/** @returns {HTMLPreElement} */
export function pre(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  /** @ts-ignore */
  return html('pre', attributes, ...children);
}

/** @returns {HTMLProgressElement} */
export function progress(/** @type {Attributes} */ attributes) {
  /** @ts-ignore */
  return html('progress', attributes);
}

/** @returns {HTMLScriptElement} */
export function script(/** @type {Attributes} */ attributes) {
  /** @ts-ignore */
  return html('script', attributes);
}

/** @returns {HTMLSelectElement} */
export function select(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  /** @ts-ignore */
  return html('select', attributes, ...children);
}

/** @returns {HTMLSpanElement} */
export function span(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  return html('span', attributes, ...children);
}

// Note that `HTMLElement` is the correct type for the `strong` element
export function strong(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  return html('strong', attributes, ...children);
}

// Note that `HTMLElement` is the correct type for the `summary` element
export function summary(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  return html('summary', attributes, ...children);
}

/** @returns {HTMLTableElement} */
export function table(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  /** @ts-ignore */
  return html('table', attributes, ...children);
}

/** @returns {HTMLTableSectionElement} */
export function tbody(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  /** @ts-ignore */
  return html('tbody', attributes, ...children);
}

/** @returns {HTMLTableDataCellElement} */
export function td(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  /** @ts-ignore */
  return html('td', attributes, ...children);
}

/** @returns {HTMLTextAreaElement} */
export function textarea(/** @type {Attributes} */ attributes) {
  /** @ts-ignore */
  return html('textarea', attributes);
}

/** @returns {HTMLTableHeaderCellElement} */
export function th(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  /** @ts-ignore */
  return html('th', attributes, ...children);
}

/** @returns {HTMLTableSectionElement} */
export function thead(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  /** @ts-ignore */
  return html('thead', attributes, ...children);
}

/** @returns {HTMLTableRowElement} */
export function tr(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  /** @ts-ignore */
  return html('tr', attributes, ...children);
}

/** @returns {HTMLUListElement} */
export function ul(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  /** @ts-ignore */
  return html('ul', attributes, ...children);
}

/** @returns {Promise<HTMLUListElement>} */
export async function ulAsync(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  /** @ts-ignore */
  return await htmlAsync('ul', attributes, ...children);
}

/** @returns {HTMLVideoElement} */
export function video(/** @type {Attributes} */ attributes) {
  /** @ts-ignore */
  return /** @type {any} */ html('video', attributes);
}
