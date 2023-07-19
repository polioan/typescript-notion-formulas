import { describe, test, expect, expectTypeOf } from 'vitest'
import { Formula } from '../src/formula.js'
import { Prop } from '../src/prop.js'

describe('formula creating and ensuring this context is correct', () => {
  test('create formula class', () => {
    const f = new Formula({ some: 'Checkbox', some2: 'Date' })

    // @ts-expect-error
    const props = f.props
    expect(props).toStrictEqual({ some: 'Checkbox', some2: 'Date' })

    const someProp = f.prop('some')

    expectTypeOf(someProp).toMatchTypeOf<Prop<'Checkbox'>>()
    expect(someProp).toBeInstanceOf(Prop)
    expect(someProp).toHaveProperty('type', 'Checkbox')

    const { children } = someProp
    expect(children).toStrictEqual(['some'])

    // @ts-expect-error
    const badProp = f.prop('something else')

    expectTypeOf(badProp).toMatchTypeOf<Prop<'Checkbox' | 'Date'>>()
    expect(badProp).toBeInstanceOf(Prop)
    expect({
      type: badProp.type,
      name: badProp.name,
      children: badProp.children,
    }).toStrictEqual({
      type: undefined,
      name: 'prop',
      children: ['something else'],
    })
  })

  test('create formula class with destructuring', () => {
    const f = new Formula({ some: 'Checkbox', some2: 'Date' })

    // @ts-expect-error
    const { props, prop } = f
    expect(props).toStrictEqual({ some: 'Checkbox', some2: 'Date' })

    const someProp = prop('some')

    expectTypeOf(someProp).toMatchTypeOf<Prop<'Checkbox'>>()
    expect(someProp).toBeInstanceOf(Prop)
    expect(someProp).toHaveProperty('type', 'Checkbox')

    const { children } = someProp
    expect(children).toStrictEqual(['some'])

    // @ts-expect-error
    const badProp = f.prop('something else')

    expectTypeOf(badProp).toMatchTypeOf<Prop<'Checkbox' | 'Date'>>()
    expect(badProp).toBeInstanceOf(Prop)
    expect({
      type: badProp.type,
      name: badProp.name,
      children: badProp.children,
    }).toStrictEqual({
      type: undefined,
      name: 'prop',
      children: ['something else'],
    })
  })
})
