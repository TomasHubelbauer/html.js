# Paper

Paper is a JavaScript UI library which is usable as an ESM module and has no
dependencies.

## Installation

```
git submodule add https://github.com/tomashubelbauer/paper
```

## Usage

`HelloWorld.js`
```js
import { Component, h1, div, ... } from './paper/index.js';

// This web component will be defined with tag `paper-hello-world`
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

`HelloWorld.css`

This file must exist, even if empty. Paper will import it.

`index.js`
```js
document.body.append(new HelloWorld());
```
