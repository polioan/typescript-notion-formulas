import { describe, test, expect } from 'vitest'
import { Builder } from '../src/builder.js'
import { Prop } from '../src/prop.js'
import { Formula, type FormulaProps } from '../src/formula.js'

describe('builder creating and ensuring this context is correct', () => {
  test('.toObj + duck typing', () => {
    const builder = new Builder()

    expect(builder.toObj(3)).toStrictEqual({
      kind: 'value',
      type: 'Number',
      value: 3,
    })

    expect(
      builder.toObj(
        new Prop({ type: 'Number', name: 'prop', children: ['name'] })
      )
    ).toStrictEqual({
      kind: 'function',
      type: 'Number',
      value: 'prop',
      children: [{ kind: 'value', type: 'Text', value: 'name' }],
    })

    expect(
      builder.toObj(new Prop({ type: 'Number', name: 'pi' }))
    ).toStrictEqual({ kind: 'constant', type: 'Number', value: 'pi' })

    expect(builder.toObj(new Date(1688994240000))).toStrictEqual({
      kind: 'function',
      type: 'Date',
      value: 'fromTimestamp',
      children: [{ kind: 'value', type: 'Number', value: 1688994240000 }],
    })

    expect(() => {
      builder.toObj(new Date('wrong'))
    }).toThrowError('Invalid date!')

    expect(() => {
      builder.toObj(NaN)
    }).toThrowError('Invalid number! NaN is not supported.')

    expect(builder.toObj(true)).toStrictEqual({
      kind: 'value',
      type: 'Checkbox',
      value: true,
    })

    expect(() => {
      // @ts-expect-error
      builder.toObj({ type: 'Number', name: 'prop', children: ['name'] })
    }).toThrowError('Unreachable! Invalid property!')

    expect(() => {
      // @ts-expect-error
      builder.toObj(null)
    }).toThrowError('Unreachable! Invalid property!')
  })

  test('.toObj with destructuring', () => {
    const { toObj } = new Builder()

    expect(toObj(3)).toStrictEqual({
      kind: 'value',
      type: 'Number',
      value: 3,
    })

    expect(
      toObj(new Prop({ type: 'Number', name: 'prop', children: ['name'] }))
    ).toStrictEqual({
      kind: 'function',
      type: 'Number',
      value: 'prop',
      children: [{ kind: 'value', type: 'Text', value: 'name' }],
    })

    expect(toObj(new Prop({ type: 'Number', name: 'pi' }))).toStrictEqual({
      kind: 'constant',
      type: 'Number',
      value: 'pi',
    })

    expect(toObj(new Date(1688994240000))).toStrictEqual({
      kind: 'function',
      type: 'Date',
      value: 'fromTimestamp',
      children: [{ kind: 'value', type: 'Number', value: 1688994240000 }],
    })

    expect(() => {
      toObj(new Date('wrong'))
    }).toThrowError('Invalid date!')

    expect(() => {
      toObj(NaN)
    }).toThrowError('Invalid number! NaN is not supported.')

    expect(toObj(true)).toStrictEqual({
      kind: 'value',
      type: 'Checkbox',
      value: true,
    })

    expect(() => {
      // @ts-expect-error
      toObj({ type: 'Number', name: 'prop', children: ['name'] })
    }).toThrowError('Unreachable! Invalid property!')
  })

  test('.toString', () => {
    const builder = new Builder()

    expect(builder.toString(3)).toStrictEqual('3')

    expect(
      builder.toString(
        new Prop({ type: 'Number', name: 'prop', children: ['name'] })
      )
    ).toStrictEqual('prop("name")')

    expect(
      builder.toString(new Prop({ type: 'Number', name: 'pi' }))
    ).toStrictEqual('pi')

    expect(builder.toString(new Date(1688994240000))).toStrictEqual(
      'fromTimestamp(1688994240000)'
    )

    expect(() => {
      builder.toString(new Date('wrong'))
    }).toThrowError('Invalid date!')

    expect(() => {
      builder.toString(NaN)
    }).toThrowError('Invalid number! NaN is not supported.')

    expect(builder.toString(true)).toStrictEqual('true')

    expect(() => {
      // @ts-expect-error
      builder.toString({ type: 'Number', name: 'prop', children: ['name'] })
    }).toThrowError('Unreachable! Invalid property!')
  })

  test('.toString with destructuring', () => {
    const { toString } = new Builder()

    expect(toString(3)).toStrictEqual('3')

    expect(
      toString(new Prop({ type: 'Number', name: 'prop', children: ['name'] }))
    ).toStrictEqual('prop("name")')

    expect(toString(new Prop({ type: 'Number', name: 'pi' }))).toStrictEqual(
      'pi'
    )

    expect(toString(new Date(1688994240000))).toStrictEqual(
      'fromTimestamp(1688994240000)'
    )

    expect(() => {
      toString(new Date('wrong'))
    }).toThrowError('Invalid date!')

    expect(() => {
      toString(NaN)
    }).toThrowError('Invalid number! NaN is not supported.')

    expect(toString(true)).toStrictEqual('true')

    expect(() => {
      // @ts-expect-error
      toString({ type: 'Number', name: 'prop', children: ['name'] })
    }).toThrowError('Unreachable! Invalid property!')
  })

  test('.toString with destructuring and custom stringConverter', () => {
    const { toString } = new Builder({
      stringConverter: str => `"${str} test"`,
    })

    expect(toString(3)).toStrictEqual('3')

    expect(
      toString(new Prop({ type: 'Number', name: 'prop', children: ['name'] }))
    ).toStrictEqual('prop("name test")')

    expect(toString(new Prop({ type: 'Number', name: 'pi' }))).toStrictEqual(
      'pi'
    )

    expect(() => {
      // @ts-expect-error
      toString({ type: 'Number', name: 'prop', children: ['name'] })
    }).toThrowError('Unreachable! Invalid property!')
  })

  test('.toString defaultStringConverter simple cases', () => {
    const f = new Formula<any>({})

    const builder = new Builder()

    expect(builder.toString('text')).toStrictEqual('"text"')

    expect(builder.toString('text text text')).toStrictEqual('"text text text"')

    expect(builder.toString(f.add(f.prop('p1'), f.prop('p2')))).toStrictEqual(
      'add(prop("p1"),prop("p2"))'
    )

    expect(
      builder.toString(f.add(f.prop('p1 p1 p1'), f.prop('p2 p2 p2')))
    ).toStrictEqual('add(prop("p1 p1 p1"),prop("p2 p2 p2"))')
  })

  test('.toString defaultStringConverter', () => {
    const builder = new Builder()

    const cases: string[] = []
    const compareCases: string[] = []

    cases.push(builder.toString(`'text'`))
    compareCases.push(`"'text'"`)
    expect(cases.at(-1)).toStrictEqual(compareCases.at(-1))

    cases.push(builder.toString(`'text text text'`))
    compareCases.push(`"'text text text'"`)
    expect(cases.at(-1)).toStrictEqual(compareCases.at(-1))

    cases.push(builder.toString(`"text"`))
    compareCases.push(`"\\"text\\""`)
    expect(cases.at(-1)).toStrictEqual(compareCases.at(-1))

    cases.push(builder.toString(`"text text text"`))
    compareCases.push(`"\\"text text text\\""`)
    expect(cases.at(-1)).toStrictEqual(compareCases.at(-1))

    //

    cases.push(builder.toString(`text/text`))
    compareCases.push(`"text/text"`)
    expect(cases.at(-1)).toStrictEqual(compareCases.at(-1))

    cases.push(builder.toString(`text//text`))
    compareCases.push(`"text//text"`)
    expect(cases.at(-1)).toStrictEqual(compareCases.at(-1))

    cases.push(builder.toString(`text/text text`))
    compareCases.push(`"text/text text"`)
    expect(cases.at(-1)).toStrictEqual(compareCases.at(-1))

    cases.push(builder.toString(`text//text text`))
    compareCases.push(`"text//text text"`)
    expect(cases.at(-1)).toStrictEqual(compareCases.at(-1))

    //

    cases.push(builder.toString(`text\text`))
    compareCases.push(`"text\\text"`)
    expect(cases.at(-1)).toStrictEqual(compareCases.at(-1))

    cases.push(builder.toString(`text\\text`))
    compareCases.push(`"text\\\\text"`)
    expect(cases.at(-1)).toStrictEqual(compareCases.at(-1))

    cases.push(builder.toString(`text\text text`))
    compareCases.push(`"text\\text text"`)
    expect(cases.at(-1)).toStrictEqual(compareCases.at(-1))

    cases.push(builder.toString(`text\\text text`))
    compareCases.push(`"text\\\\text text"`)
    expect(cases.at(-1)).toStrictEqual(compareCases.at(-1))

    //

    cases.push(builder.toString(`'"text"'`))
    compareCases.push(`"'\\"text\\"'"`)
    expect(cases.at(-1)).toStrictEqual(compareCases.at(-1))

    cases.push(builder.toString(`"text"(`))
    compareCases.push(`"\\"text\\"("`)
    expect(cases.at(-1)).toStrictEqual(compareCases.at(-1))

    cases.push(builder.toString(`"'text'"`))
    compareCases.push(`"\\"'text'\\""`)
    expect(cases.at(-1)).toStrictEqual(compareCases.at(-1))

    //

    const props = {
      [`'I 'test' "test"! 😊 {Hello, World!} [Testing] /test/ \\test\\'`]:
        'Checkbox',
      [`"'I 'test' "test"! 😊 {Hello, World!} [Testing] /test/ \\test\\'`]:
        'Checkbox',
    } satisfies FormulaProps

    const f = new Formula(props)

    function log(value: any) {
      // eslint-disable-next-line no-console
      console.log(value)
    }

    Object.keys(props).forEach(c => {
      log(builder.toString(f.not(f.prop(c as any))))
    })
  })
})
