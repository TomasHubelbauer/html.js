# Paper

Paper is a JavaScript UI library which is usable as an ESM module and has no
dependencies.

## Installation

```
git submodule add https://github.com/tomashubelbauer/paper
```

## Usage

```js
import { Component, div, ... } from './paper/index.js';

// Make HelloWorld.css alongside HelloWorld.js or suffer the consequences
// Note that the web component prefix used will be `paper` (not changeable)
export default class HelloWorld extends Component {
  constructor() {
    super(HelloWorld);
  }

  async *render() {
    yield h1('Hello, world!');
    const loaderDiv = div('Loading data…');
    yield loaderDiv;
    
    const data = await fetch('./api/data').then(response => response.json());
    loaderDiv.remove();
    for (const item of data.items) {
      yield div('Item: ', JSON.stringify(item));
    }

    if (data.more === 0) {
      return '(no more items)';
    }

    yield `There are ${data.more} more items!`;
  }
}
```
