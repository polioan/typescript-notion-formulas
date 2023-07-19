import { test, expect } from 'vitest'
import { Formula } from '../../src/formula.js'

test('correct names of all function and constants', () => {
  expect(() => {
    const f = new Formula({})

    function getFPublicKeys(obj: typeof f) {
      return [
        ...new Set([
          ...Object.keys(obj).filter(key => key !== 'props'),
          ...Object.getOwnPropertyNames(Object.getPrototypeOf(obj)).filter(
            key => key !== 'constructor'
          ),
        ]),
      ]
    }

    const keys = getFPublicKeys(f)

    for (const key of keys) {
      const value = (f as any)[key]
      const name =
        typeof value === 'function' ? value(3, 3, 3, 3, 3).name : value.name
      if (key !== name) {
        throw new Error(`Name ${key} and ${name} are not matching!`)
      }
    }
  }).not.toThrowError()
})
