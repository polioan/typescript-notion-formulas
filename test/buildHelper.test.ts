import { test, expect, expectTypeOf } from 'vitest'
import { build } from '../src/buildHelper.js'
import type { Formula } from '../src/formula.js'
import type { Prop } from '../src/prop.js'

test('build()', () => {
  build().formula(f => {
    expectTypeOf(f).toMatchTypeOf<Formula<{ test: 'Text' }>>()
    expectTypeOf(f).toMatchTypeOf<Formula<any>>()
    const value = f.prop('')
    expectTypeOf(value).toMatchTypeOf<Prop<any>>()
    expectTypeOf(value).toMatchTypeOf<Prop<'Text'>>()
    return f.add(2, 3)
  })

  build(undefined).formula(f => {
    expectTypeOf(f).toMatchTypeOf<Formula<{ test: 'Text' }>>()
    expectTypeOf(f).toMatchTypeOf<Formula<any>>()
    const value = f.prop('')
    expectTypeOf(value).toMatchTypeOf<Prop<any>>()
    expectTypeOf(value).toMatchTypeOf<Prop<'Text'>>()
    return f.add(2, 3)
  })

  build({}).formula(f => {
    // eslint-disable-next-line @typescript-eslint/ban-types
    expectTypeOf(f).toMatchTypeOf<Formula<{}>>()
    // @ts-expect-error
    f.prop('')
    return f.add(2, 3)
  })

  build({ test: 'Text' }).formula(f => {
    expectTypeOf(f).toMatchTypeOf<Formula<{ test: 'Text' }>>()
    const value = f.prop('test')
    expectTypeOf(value).toMatchTypeOf<Prop<'Text'>>()
    // @ts-expect-error
    f.prop('test2')
    return f.add(2, 3)
  })

  expect(
    build().formula(f => {
      return f.date(new Date('wrong'))
    })
  ).toStrictEqual('Invalid date!')

  expect(
    build().formula(() => {
      return null as any
    })
  ).toStrictEqual('Unreachable! Invalid property!')

  expect(build().formula(f => f.add(2, 3))).toStrictEqual('add(2,3)')

  expect(build().formula(f => f.add(f.prop('test'), 3))).toStrictEqual(
    'add(prop("test"),3)'
  )
})
