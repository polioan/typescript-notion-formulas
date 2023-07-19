import { describe, test, expect, expectTypeOf } from 'vitest'
import {
  Prop,
  isConstantProp,
  isFunctionProp,
  type AnyProp,
} from '../src/prop.js'
import { toPropType, type PropType } from '../src/notionData.js'

describe('Prop creating and testing it types', () => {
  test('check types and duck typing', () => {
    function takeDateProp(_: Prop<'Date'>) {
      return null
    }

    function takeTextProp(_: Prop<'Text'>) {
      return null
    }

    function takeAnyProp(_: AnyProp) {
      return null
    }

    takeDateProp(new Prop({ type: 'Date', name: 'some', children: ['name'] }))
    takeDateProp(new Prop({ type: 'Date', name: 'some' }))
    // @ts-expect-error
    takeDateProp(new Prop({ type: 'Text', name: 'some', children: ['name'] }))

    takeTextProp(new Prop({ type: 'Text', name: 'some', children: ['name'] }))
    takeTextProp(new Prop({ type: 'Text', name: 'some' }))
    // @ts-expect-error
    takeTextProp(new Prop({ type: 'Date', name: 'some', children: ['name'] }))

    takeAnyProp(new Prop({ type: 'Date', name: 'some', children: ['name'] }))
    takeAnyProp(new Prop({ type: 'Date', name: 'some' }))

    // @ts-expect-error
    takeTextProp({ type: 'Text', name: 'some', children: ['name'] })
    // @ts-expect-error
    takeTextProp({ type: 'Text', name: 'some' })

    // @ts-expect-error
    takeAnyProp({ type: 'Text', name: 'some', children: ['name'] })
    // @ts-expect-error
    takeAnyProp({ type: 'Text', name: 'some' })

    // @ts-expect-error
    takeAnyProp({ type: 'Date', name: 'some', children: ['name'] })
    // @ts-expect-error
    takeAnyProp({ type: 'Date', name: 'some' })
  })

  test('Prop variants', () => {
    // @ts-expect-error
    new Prop({})

    // @ts-expect-error
    new Prop({ name: 'name' })

    // @ts-expect-error
    new Prop({ type: 'type', name: 'name' })

    const case1 = new Prop({ type: 'Date', name: 'name' })

    expect(isConstantProp(case1)).toStrictEqual(true)
    expect(isFunctionProp(case1)).toStrictEqual(false)

    expect({
      type: case1.type,
      name: case1.name,
      children: case1.children,
    }).toStrictEqual({
      type: 'Date',
      name: 'name',
      children: undefined,
    })

    const case2 = new Prop({
      type: 'Date',
      name: 'name',
      children: [],
    })

    expect(isFunctionProp(case2)).toStrictEqual(true)
    expect(isConstantProp(case2)).toStrictEqual(false)

    expect({
      type: case2.type,
      name: case2.name,
      children: case2.children,
    }).toStrictEqual({ type: 'Date', name: 'name', children: [] })
  })

  test('toPropType with Prop', () => {
    const case1 = toPropType(
      new Prop({ type: 'Checkbox', name: 'some', children: ['name'] })
    )
    expectTypeOf(case1).toMatchTypeOf<'Checkbox'>()
    expect(case1).toStrictEqual('Checkbox')

    const case2 = toPropType(
      new Prop({ type: 'Date', name: 'some', children: ['name'] })
    )
    expectTypeOf(case2).toMatchTypeOf<'Date'>()
    expect(case2).toStrictEqual('Date')

    const case3 = toPropType(
      new Prop({ type: 'Number', name: 'some', children: ['name'] })
    )
    expectTypeOf(case3).toMatchTypeOf<'Number'>()
    expect(case3).toStrictEqual('Number')

    const case4 = toPropType(
      new Prop({ type: 'Text', name: 'some', children: ['name'] })
    )
    expectTypeOf(case4).toMatchTypeOf<'Text'>()
    expect(case4).toStrictEqual('Text')
  })

  test('toPropType with convertable', () => {
    const case1 = toPropType(true)
    expectTypeOf(case1).toMatchTypeOf<'Checkbox'>()
    expect(case1).toStrictEqual('Checkbox')

    const case2 = toPropType(123)
    expectTypeOf(case2).toMatchTypeOf<'Number'>()
    expect(case2).toStrictEqual('Number')

    const case3 = toPropType('some text')
    expectTypeOf(case3).toMatchTypeOf<'Text'>()
    expect(case3).toStrictEqual('Text')

    const case4 = toPropType(new Date())
    expectTypeOf(case4).toMatchTypeOf<'Date'>()
    expect(case4).toStrictEqual('Date')
  })

  test('toPropType with error', () => {
    expect(() => {
      const case1 = toPropType(null as any)
      expectTypeOf(case1).toMatchTypeOf<PropType>()
    }).toThrowError()
  })
})
