/** TODO: Add `*Async` version of each element helper function exported */

export { default as Component } from './Component.js';
import _html from './html.js';
import parentSync from './parentSync.js';
import parentAsync from './parentAsync.js';
import './index.test.js';

/** @typedef {{[attribute: string]: string | number | boolean}} Attributes */
/** @typedef {string | number | boolean | function | HTMLElement} Child */

export function html(/** @type {string | HTMLElement} */ tag, /** @type {Attributes} */ attributes, /** @type {Children} */ ...children) {
  // Capture array such that changes made to it by `_html` are preserved
  const _children = [...children];
  const element = _html(tag, attributes, _children);
  parentSync(element, _children);
  return element;
}

export async function htmlAsync(/** @type {string | HTMLElement} */ tag, /** @type {Attributes} */ attributes, /** @type {Children} */ ...children) {
  // Capture array such that changes made to it by `_html` are preserved
  const _children = [...children];
  const element = _html(tag, attributes, _children);
  await parentAsync(element, _children);
  return element;
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

export async function ulAsync(/** @type {Attributes} */ attributes, /** @type {Children} */ ...children) {
  return await htmlAsync('ul', attributes, ...children);
}

export function video(/** @type {Attributes} */ attributes) {
  return html('video', attributes);
}
