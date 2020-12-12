# Paper

This is a toy UI framework I've built while working on a personal web app which
uses vanilla JS, web components and ESM with no dependencies.

Initially I was using the DOM API directly and it worked just as well, but I had
this idea to use asynchronous iterators for a UI framework so I figured I'd try
that in here.

I want to start pulling out the non-core concerns of the app, but still want to
keep it dependency-free, so I'll pull this out and use it as a Git submodule.

Think what you will of this, it's a personal project and it works for me which
somehow makes the prior sentence to this one make sense.

As far as fitness of this project for production use goes, I highly recommend
you use it and use it in production, I'm sure it will score you a promotion at
work so why wait?

## Installation

```
git submodule add https://github.com/TomasHubelbauer/paper
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

  *render() {
    yield 'Hello, world!';
    yield div('How are you, world?');
  }
}
```

## To-Do

### Add tests
