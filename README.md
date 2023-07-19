# typescript notion formulas
[![version](https://img.shields.io/npm/v/typescript-notion-formulas.svg)](https://www.npmjs.com/package/typescript-notion-formulas)
[![license](https://img.shields.io/github/license/polioan/typescript-notion-formulas)](https://opensource.org/licenses/MIT)
[![created by Ivan Polushin](https://img.shields.io/badge/created%20by-@polioan-4BBAAB.svg)](https://github.com/polioan)

Tool for creating notion table formulas with typescript!

## Motivations

1. **Readability and maintainability**: Lengthy formulas are hard to read and maintain, leading to confusion and potential errors.
2. **Code reusability**: With complex formulas, it's common to have repetitive sub-expressions and logic. This package helps eliminate code duplication, leading to more concise and efficient formulas. 
3. **Error-Prone formulas**: As formulas grow in size, they become prone to errors. A simple typo or misplaced parenthesis can break the entire formula, leading to incorrect results. Debugging such formulas can be time-consuming and frustrating.
4. **Development speed**: By using TypeScript, you benefit from enhanced autocompletion and type-checking features.

## Quick start

### Install

#### npm

```shell
npm i typescript-notion-formulas
```

#### yarn

```shell
yarn add typescript-notion-formulas
```

#### CDN

```html
<script src="https://unpkg.com/typescript-notion-formulas@1.0.0/dist/index.global.js"></script>
<script>
  const { build } = formulas // adds global "formulas" namespace
</script>
```

### Basic usage

```ts
import { build } from 'typescript-notion-formulas'

const add = build({ number: 'Number' }).formula(f => {
  return f.add(f.prop('number'), 3)
})

console.log(add) // will output - add(prop("number"),3)

// or with destructuring

const add = build({ number: 'Number' }).formula(({ add, prop }) => {
  return add(prop('number'), 3)
})

console.log(add) // will output - add(prop("number"),3)

// or unsafe if you don't care about prop types and autocomplete

const add = build().formula(({ add, prop }) => {
  return add(prop('number'), 3)
})

console.log(add) // will output - add(prop("number"),3)
```

Default string converter is using JSON.stringify (which is notion using too) so don't go crazy with special characters and white spaces. If you have some special use case - read about complex usage.

Note that notion is sensitive to special characters and with larger formulas it will be hard to copy from console! You can use something like clipboardy to copy the results.

### Prop types

```ts
// import type { PropType } from 'typescript-notion-formulas'
// prop type can be one of 'Date', 'Number', 'Checkbox' or 'Text'

// import type { ConvertableToPropValue } from 'typescript-notion-formulas'
// and you can also use primitive JavaScript values like Date, number, boolean or string - they will be converted to notion, that's will be especially useful with dates

build({ number: 'Number' }).formula(({ add, prop }) => {
  return add(prop('number'), 3) // number + number is fine
})

build({ mybirthday: 'Date' }).formula(({ add, prop }) => {
  return add(prop('mybirthday'), 3) // will throw at compile time
})
```

### Helpers

I added some helpers for more readable code. (if you can suggest more - reach out to me or submit PR)

```ts
import { build, Helpers } from 'typescript-notion-formulas'

build({ date: 'Date' }).formula(f => {
  const { safeToNumber, clamp, dateRange, inRange } = Helpers
  return safeToNumber(f.prop('date'))
})
```

### Errors

typescript-notion-formulas checks if your dates and numbers are valid.

```ts
const add = build({ number: 'Number' }).formula(({ add, prop }) => {
  return add(prop('number'), 0 / 0)
})

console.log(add) // will output - Invalid number! NaN is not supported.

const add = build({ date: 'Date' }).formula(({ dateBetween, prop }) => {
  return dateBetween(prop('date'), new Date('wrong'), 'days')
})

console.log(add) // will output - Invalid date!
```

### Complex usage

```ts
import { Formula, Builder } from 'typescript-notion-formulas'

const f = new Formula({ number: 'Number' })
// don't forget you can use destructuring - const { add, prop } = new Formula({ number: 'Number' })

const addFormula = f.add(f.prop('number'), 2)

const builder = new Builder()
// you can also pass custom string converter - const builder = new Builder({ stringConverter: str => `'${str}'` })

const addAsString = builder.toString(addFormula)
const addAsJson = JSON.stringify(builder.toObj(addFormula))

console.log({ addAsString, addAsJson })
```
