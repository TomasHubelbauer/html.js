import { div, divAsync } from './index.js';

void async function () {
  const tests = [
    zero,
    emptyString,
    _undefined,
    _null,
    _false,
    _true,
    zeroFunction,
    emptyStringFunction,
    undefinedFunction,
    nullFunction,
    falseFunction,
    trueFunction,
    _function,
    generatorFunctionUndefinedReturn,
    generatorFunctionDefinedReturn,
  ];

  for (const test of tests) {
    test();
    //console.log(test.name);
  }

  /** @type {() => Promise<void>} */
  const testsAsync = [
    asyncFunction,
    asyncGeneratorFunctionUndefinedReturn,
    asyncGeneratorFunctionDefinedReturn,
  ];

  for (const test of testsAsync) {
    await test();
    //console.log(test.name);
  }
}()

function zero() {
  const element = div(0);
  if (element.innerHTML !== '0') {
    throw new Error(element.innerHTML);
  }
}

function emptyString() {
  const element = div('');
  if (element.innerHTML !== '') {
    throw new Error(element.innerHTML);
  }
}

function _undefined() {
  const element = div();
  if (element.innerHTML !== '') {
    throw new Error(element.innerHTML);
  }
}

function _null() {
  const element = div(null);
  if (element.innerHTML !== '') {
    throw new Error(element.innerHTML);
  }
}

function _false() {
  const element = div(false);
  if (element.innerHTML !== 'false') {
    throw new Error(element.innerHTML);
  }
}

function _true() {
  const element = div(true);
  if (element.innerHTML !== 'true') {
    throw new Error(element.innerHTML);
  }
}

function zeroFunction() {
  function zero() {
    return 0;
  }

  const element = div(zero);
  if (element.innerHTML !== '0') {
    throw new Error(element.innerHTML);
  }
}

function emptyStringFunction() {
  function emptyString() {
    return '';
  }

  const element = div(emptyString);
  if (element.innerHTML !== '') {
    throw new Error(element.innerHTML);
  }
}

function undefinedFunction() {
  function _undefined() {
  }

  const element = div(_undefined);
  if (element.innerHTML !== '') {
    throw new Error(element.innerHTML);
  }
}

function nullFunction() {
  function _null() {
    return null;
  }

  const element = div(_null);
  if (element.innerHTML !== '') {
    throw new Error(element.innerHTML);
  }
}

function trueFunction() {
  function _true() {
    return true;
  }

  const element = div(_true);
  if (element.innerHTML !== 'true') {
    throw new Error(element.innerHTML);
  }
}


function falseFunction() {
  function _false() {
    return false;
  }

  const element = div(_false);
  if (element.innerHTML !== 'false') {
    throw new Error(element.innerHTML);
  }
}

function _function() {
  function _function() {
    return 'TEST';
  }

  const element = div(_function);
  if (element.innerHTML !== 'TEST') {
    throw new Error(element.innerHTML);
  }
}

function generatorFunctionUndefinedReturn() {
  function* generatorFunctionUndefinedReturn() {
    yield 'TEST';
  }

  const element = div(generatorFunctionUndefinedReturn);
  if (element.innerHTML !== 'TEST') {
    throw new Error(element.innerHTML);
  }
}

function generatorFunctionDefinedReturn() {
  function* generatorFunctionDefinedReturn() {
    yield 'TEST';
    return 'TEST';
  }

  const element = div(generatorFunctionDefinedReturn);
  if (element.innerHTML !== 'TESTTEST') {
    throw new Error(element.innerHTML);
  }
}

async function asyncFunction() {
  async function asyncFunction() {
    await new Promise(resolve => setTimeout(resolve, 10));
    return 'TEST';
  }

  const element = await divAsync(asyncFunction);
  if (element.innerHTML !== 'TEST') {
    throw new Error(element.innerHTML);
  }
}

async function asyncGeneratorFunctionUndefinedReturn() {
  async function* asyncGeneratorFunctionUndefinedReturn() {
    await new Promise(resolve => setTimeout(resolve, 10));
    yield 'TEST';
  }

  const element = await divAsync(asyncGeneratorFunctionUndefinedReturn);
  if (element.innerHTML !== 'TEST') {
    throw new Error(element.innerHTML);
  }
}

async function asyncGeneratorFunctionDefinedReturn() {
  async function* asyncGeneratorFunctionDefinedReturn() {
    await new Promise(resolve => setTimeout(resolve, 10));
    yield 'TEST';
    return 'TEST';
  }

  const element = await divAsync(asyncGeneratorFunctionDefinedReturn);
  if (element.innerHTML !== 'TESTTEST') {
    throw new Error(element.innerHTML);
  }
}
