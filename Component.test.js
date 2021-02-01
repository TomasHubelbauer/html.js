import Component from './Component.js';

void async function () {
  // Break off into async right away so that `Component` becomes initialized
  await new Promise(resolve => setTimeout(resolve, 0));

  const tests = [
    functionComponent,
    asyncFunctionComponent,
    generatorFunctionUndefinedReturnComponent,
    generatorFunctionDefinedReturnComponent,
    asyncGeneratorFunctionUndefinedReturnComponent,
    asyncGeneratorFunctionDefinedReturnComponent,
  ];

  for (const test of tests) {
    await test();
    //console.log(test.name);
  }
}()

async function functionComponent() {
  const TestComponent = class FunctionComponent extends Component {
    constructor() {
      super(FunctionComponent);
    }

    render() {
      return 'TEST';
    }
  };

  const testComponent = new TestComponent();
  await testComponent.mount();
  if (testComponent._div.innerHTML !== 'TEST') {
    throw new Error(testComponent._div.innerHTML);
  }
}

async function asyncFunctionComponent() {
  const TestComponent = class AsyncFunctionComponent extends Component {
    constructor() {
      super(AsyncFunctionComponent);
    }

    async render() {
      return 'TEST';
    }
  };

  const testComponent = new TestComponent();
  await testComponent.mount();
  if (testComponent._div.innerHTML !== 'TEST') {
    throw new Error(testComponent._div.innerHTML);
  }
}

async function generatorFunctionUndefinedReturnComponent() {
  const TestComponent = class GeneratorFunctionUndefinedReturnComponent extends Component {
    constructor() {
      super(GeneratorFunctionUndefinedReturnComponent);
    }

    *render() {
      yield 'TEST';
    }
  };

  const testComponent = new TestComponent();
  await testComponent.mount();
  if (testComponent._div.innerHTML !== 'TEST') {
    throw new Error(testComponent._div.innerHTML);
  }
}

async function generatorFunctionDefinedReturnComponent() {
  const TestComponent = class GeneratorFunctionDefinedReturnComponent extends Component {
    constructor() {
      super(GeneratorFunctionDefinedReturnComponent);
    }

    *render() {
      yield 'TEST';
      return 'TEST';
    }
  };

  const testComponent = new TestComponent();
  await testComponent.mount();
  if (testComponent._div.innerHTML !== 'TESTTEST') {
    throw new Error(testComponent._div.innerHTML);
  }
}


async function asyncGeneratorFunctionUndefinedReturnComponent() {
  const TestComponent = class AsyncGeneratorFunctionUndefinedReturnComponent extends Component {
    constructor() {
      super(AsyncGeneratorFunctionUndefinedReturnComponent);
    }

    async *render() {
      await new Promise(resolve => setTimeout(resolve, 0));
      yield 'TEST';
    }
  };

  const testComponent = new TestComponent();
  await testComponent.mount();
  if (testComponent._div.innerHTML !== 'TEST') {
    throw new Error(testComponent._div.innerHTML);
  }
}

async function asyncGeneratorFunctionDefinedReturnComponent() {
  const TestComponent = class AsyncGeneratorFunctionDefinedReturnComponent extends Component {
    constructor() {
      super(AsyncGeneratorFunctionDefinedReturnComponent);
    }

    async *render() {
      await new Promise(resolve => setTimeout(resolve, 0));
      yield 'TEST';
      return 'TEST';
    }
  };

  const testComponent = new TestComponent();
  await testComponent.mount();
  if (testComponent._div.innerHTML !== 'TESTTEST') {
    throw new Error(testComponent._div.innerHTML);
  }
}
