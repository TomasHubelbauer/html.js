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

export function audio(/** @type {Attributes} */ attributes) {
  return /** @type {HTMLAudioElement} */ (html('audio', attributes));
}

export function button(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  return /** @type {HTMLButtonElement} */ (html('button', attributes, ...children));
}

export function br(/** @type {Attributes} */ attributes) {
  return /** @type {HTMLBRElement} */ (html('br', attributes));
}

export function canvas(/** @type {Attributes} */ attributes) {
  return /** @type {HTMLCanvasElement} */ (html('canvas', attributes));
}

export function code(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  // Note that `HTMLElement` is the correct type for the `code` element
  return html('code', attributes, ...children);
}

export function datalist(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  return /** @type {HTMLDataListElement} */ (html('datalist', attributes, ...children));
}

export function details(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  return /** @type {HTMLDetailsElement} */ (html('details', attributes, ...children));
}

export function div(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  return /** @type {HTMLDivElement} */ (html('div', attributes, ...children));
}

export async function divAsync(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  return /** @type {HTMLDivElement} */ (await htmlAsync('div', attributes, ...children));
}

export function fieldset(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  return /** @type {HTMLFieldSetElement} */ (html('fieldset', attributes, ...children));
}

export function h1(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  return /** @type {HTMLHeadingElement} */ (html('h1', attributes, ...children));
}

export function h2(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  return /** @type {HTMLHeadingElement} */ (html('h2', attributes, ...children));
}

export function h3(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  return /** @type {HTMLHeadingElement} */ (html('h3', attributes, ...children));
}

export function iframe(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  return /** @type {HTMLIFrameElement} */ (html('iframe', attributes, ...children));
}

export function img(/** @type {Attributes} */ attributes) {
  return /** @type {HTMLImageElement} */ (html('img', attributes));
}

export function input(/** @type {Attributes} */ attributes) {
  return /** @type {HTMLInputElement} */ (html('input', attributes));
}

export function label(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  return /** @type {HTMLLabelElement} */ (html('label', attributes, ...children));
}

export function legend(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  return /** @type {HTMLLegendElement} */ (html('legend', attributes, ...children));
}

export function li(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  return /** @type {HTMLLIElement} */ (html('li', attributes, ...children));
}

export function link(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  return /** @type {HTMLLinkElement} */ (html('link', attributes, ...children));
}

export function option(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  return /** @type {HTMLOptionElement} */ (html('option', attributes, ...children));
}

export function p(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  return /** @type {HTMLParagraphElement} */ (html('p', attributes, ...children));
}

export function pre(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  return /** @type {HTMLPreElement} */ (html('pre', attributes, ...children));
}

export function progress(/** @type {Attributes} */ attributes) {
  return /** @type {HTMLProgressElement} */ (html('progress', attributes));
}

export function script(/** @type {Attributes} */ attributes) {
  return /** @type {HTMLScriptElement} */ (html('script', attributes));
}

export function select(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  return /** @type {HTMLSelectElement} */ (html('select', attributes, ...children));
}

export function span(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  return /** @type {HTMLSpanElement} */ (html('span', attributes, ...children));
}

export function strong(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  // Note that `HTMLElement` is the correct type for the `strong` element
  return html('strong', attributes, ...children);
}

export function summary(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  // Note that `HTMLElement` is the correct type for the `summary` element
  return html('summary', attributes, ...children);
}

export function table(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  return /** @type {HTMLTableElement} */ (html('table', attributes, ...children));
}

export function tbody(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  return /** @type {HTMLTableSectionElement} */ (html('tbody', attributes, ...children));
}

export function td(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  return /** @type {HTMLTableDataCellElement} */ (html('td', attributes, ...children));
}

export function textarea(/** @type {Attributes} */ attributes) {
  return /** @type {HTMLTextAreaElement} */ (html('textarea', attributes));
}

export function th(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  return /** @type {HTMLTableHeaderCellElement} */ (html('th', attributes, ...children));
}

export function thead(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  return /** @type {HTMLTableSectionElement} */ (html('thead', attributes, ...children));
}

export function tr(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  return /** @type {HTMLTableRowElement} */ (html('tr', attributes, ...children));
}

export function ul(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  return /** @type {HTMLUListElement} */ (html('ul', attributes, ...children));
}

export async function ulAsync(/** @type {Attributes} */ attributes, /** @type {Child[]} */ ...children) {
  return /** @type {HTMLUListElement} */ (await htmlAsync('ul', attributes, ...children));
}

export function video(/** @type {Attributes} */ attributes) {
  return /** @type {HTMLVideoElement} */ (html('video', attributes));
}
