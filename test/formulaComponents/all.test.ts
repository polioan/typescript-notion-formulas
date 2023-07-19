import { test, expect, expectTypeOf } from 'vitest'
import { Formula } from '../../src/formula.js'
import { Prop } from '../../src/prop.js'

const f = new Formula({
  date: 'Date',
  checkbox: 'Checkbox',
  number: 'Number',
  text: 'Text',
})

test('.add', () => {
  const case1 = f.add(2, 3)
  expectTypeOf(case1).toMatchTypeOf<Prop<'Number'>>()
  expect(case1).toHaveProperty('type', 'Number')

  const case2 = f.add(
    new Prop({ type: 'Number', name: 'some', children: ['name'] }),
    3
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Number'>>()
  expect(case2).toHaveProperty('type', 'Number')

  const case3 = f.add('2', '3')
  expectTypeOf(case3).toMatchTypeOf<Prop<'Text'>>()
  expect(case3).toHaveProperty('type', 'Text')

  const case4 = f.add(
    new Prop({ type: 'Text', name: 'some', children: ['name'] }),
    '3'
  )
  expectTypeOf(case4).toMatchTypeOf<Prop<'Text'>>()
  expect(case4).toHaveProperty('type', 'Text')

  const { add } = f
  const case5 = add(
    new Prop({ type: 'Text', name: 'some', children: ['name'] }),
    '3'
  )
  expectTypeOf(case5).toMatchTypeOf<Prop<'Text'>>()
  expect(case5).toHaveProperty('type', 'Text')

  // @ts-expect-error
  f.add(new Prop({ type: 'Text', name: 'some', children: ['name'] }), 3)

  // @ts-expect-error
  f.add('3', 3)

  expect(f.add(f.prop('number'), f.prop('number'))).toHaveProperty(
    'type',
    'Number'
  )
})

test('.subtract', () => {
  const case1 = f.subtract(2, 3)
  expectTypeOf(case1).toMatchTypeOf<Prop<'Number'>>()
  expect(case1).toHaveProperty('type', 'Number')

  const case2 = f.subtract(
    new Prop({ type: 'Number', name: 'some', children: ['name'] }),
    3
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Number'>>()
  expect(case2).toHaveProperty('type', 'Number')
})

test('.multiply', () => {
  const case1 = f.multiply(2, 3)
  expectTypeOf(case1).toMatchTypeOf<Prop<'Number'>>()
  expect(case1).toHaveProperty('type', 'Number')

  const case2 = f.multiply(
    new Prop({ type: 'Number', name: 'some', children: ['name'] }),
    3
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Number'>>()
  expect(case2).toHaveProperty('type', 'Number')
})

test('.divide', () => {
  const case1 = f.divide(2, 3)
  expectTypeOf(case1).toMatchTypeOf<Prop<'Number'>>()
  expect(case1).toHaveProperty('type', 'Number')

  const case2 = f.divide(
    new Prop({ type: 'Number', name: 'some', children: ['name'] }),
    3
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Number'>>()
  expect(case2).toHaveProperty('type', 'Number')
})

test('.pow', () => {
  const case1 = f.pow(2, 3)
  expectTypeOf(case1).toMatchTypeOf<Prop<'Number'>>()
  expect(case1).toHaveProperty('type', 'Number')

  const case2 = f.pow(
    new Prop({ type: 'Number', name: 'some', children: ['name'] }),
    3
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Number'>>()
  expect(case2).toHaveProperty('type', 'Number')
})

test('.mod', () => {
  const case1 = f.mod(2, 3)
  expectTypeOf(case1).toMatchTypeOf<Prop<'Number'>>()
  expect(case1).toHaveProperty('type', 'Number')

  const case2 = f.mod(
    new Prop({ type: 'Number', name: 'some', children: ['name'] }),
    3
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Number'>>()
  expect(case2).toHaveProperty('type', 'Number')
})

test('.unaryMinus', () => {
  const case1 = f.unaryMinus(2)
  expectTypeOf(case1).toMatchTypeOf<Prop<'Number'>>()
  expect(case1).toHaveProperty('type', 'Number')

  const case2 = f.unaryMinus(
    new Prop({ type: 'Number', name: 'some', children: ['name'] })
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Number'>>()
  expect(case2).toHaveProperty('type', 'Number')
})

test('.unaryPlus', () => {
  const case1 = f.unaryPlus(
    2 as number | boolean | string | Prop<'Number' | 'Checkbox' | 'Text'>
  )
  expectTypeOf(case1).toMatchTypeOf<Prop<'Number'>>()
  expect(case1).toHaveProperty('type', 'Number')

  const case2 = f.unaryPlus(
    new Prop({ type: 'Number', name: 'some', children: ['name'] })
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Number'>>()
  expect(case2).toHaveProperty('type', 'Number')
})

test('.not', () => {
  const case1 = f.not(true)
  expectTypeOf(case1).toMatchTypeOf<Prop<'Checkbox'>>()
  expect(case1).toHaveProperty('type', 'Checkbox')

  const case2 = f.not(
    new Prop({ type: 'Checkbox', name: 'some', children: ['name'] })
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Checkbox'>>()
  expect(case2).toHaveProperty('type', 'Checkbox')
})

test('.and', () => {
  const case1 = f.and(true, true)
  expectTypeOf(case1).toMatchTypeOf<Prop<'Checkbox'>>()
  expect(case1).toHaveProperty('type', 'Checkbox')

  const case2 = f.and(
    new Prop({ type: 'Checkbox', name: 'some', children: ['name'] }),
    true
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Checkbox'>>()
  expect(case2).toHaveProperty('type', 'Checkbox')
})

test('.or', () => {
  const case1 = f.or(true, true)
  expectTypeOf(case1).toMatchTypeOf<Prop<'Checkbox'>>()
  expect(case1).toHaveProperty('type', 'Checkbox')

  const case2 = f.or(
    new Prop({ type: 'Checkbox', name: 'some', children: ['name'] }),
    true
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Checkbox'>>()
  expect(case2).toHaveProperty('type', 'Checkbox')
})

test('.equal', () => {
  const case1 = f.equal(true, true)
  expectTypeOf(case1).toMatchTypeOf<Prop<'Checkbox'>>()
  expect(case1).toHaveProperty('type', 'Checkbox')

  const case2 = f.equal(
    new Prop({ type: 'Checkbox', name: 'some', children: ['name'] }),
    true
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Checkbox'>>()
  expect(case2).toHaveProperty('type', 'Checkbox')

  // @ts-expect-error
  f.equal(true, 2)

  // @ts-expect-error
  f.equal(new Prop({ type: 'Checkbox', name: 'some', children: ['name'] }))

  f.equal(
    // @ts-expect-error
    new Prop({ type: 'Checkbox', name: 'some', children: ['name'] }),
    new Prop({ type: 'Date', name: 'some', children: ['name'] })
  )
})

test('.unequal', () => {
  const case1 = f.unequal(true, true)
  expectTypeOf(case1).toMatchTypeOf<Prop<'Checkbox'>>()
  expect(case1).toHaveProperty('type', 'Checkbox')

  const case2 = f.unequal(
    new Prop({ type: 'Checkbox', name: 'prop', children: ['name'] }),
    true
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Checkbox'>>()
  expect(case2).toHaveProperty('type', 'Checkbox')

  // @ts-expect-error
  f.unequal(true, 2)

  // @ts-expect-error
  f.unequal(new Prop({ type: 'Checkbox', name: 'some', children: ['name'] }))

  f.unequal(
    // @ts-expect-error
    new Prop({ type: 'Checkbox', name: 'some', children: ['name'] }),
    new Prop({ type: 'Date', name: 'some', children: ['name'] })
  )
})

test('.larger', () => {
  const case1 = f.larger(true, true)
  expectTypeOf(case1).toMatchTypeOf<Prop<'Checkbox'>>()
  expect(case1).toHaveProperty('type', 'Checkbox')

  const case2 = f.larger(
    new Prop({ type: 'Checkbox', name: 'prop', children: ['name'] }),
    true
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Checkbox'>>()
  expect(case2).toHaveProperty('type', 'Checkbox')

  // @ts-expect-error
  f.larger(true, 2)

  // @ts-expect-error
  f.larger(new Prop({ type: 'Checkbox', name: 'some', children: ['name'] }))

  f.larger(
    // @ts-expect-error
    new Prop({ type: 'Checkbox', name: 'some', children: ['name'] }),
    new Prop({ type: 'Date', name: 'some', children: ['name'] })
  )
})

test('.largerEq', () => {
  const case1 = f.largerEq(true, true)
  expectTypeOf(case1).toMatchTypeOf<Prop<'Checkbox'>>()
  expect(case1).toHaveProperty('type', 'Checkbox')

  const case2 = f.largerEq(
    new Prop({ type: 'Checkbox', name: 'prop', children: ['name'] }),
    true
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Checkbox'>>()
  expect(case2).toHaveProperty('type', 'Checkbox')
})

test('.smaller', () => {
  const case1 = f.smaller(true, true)
  expectTypeOf(case1).toMatchTypeOf<Prop<'Checkbox'>>()
  expect(case1).toHaveProperty('type', 'Checkbox')

  const case2 = f.smaller(
    new Prop({ type: 'Checkbox', name: 'prop', children: ['name'] }),
    true
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Checkbox'>>()
  expect(case2).toHaveProperty('type', 'Checkbox')
})

test('.smallerEq', () => {
  const case1 = f.smallerEq(true, true)
  expectTypeOf(case1).toMatchTypeOf<Prop<'Checkbox'>>()
  expect(case1).toHaveProperty('type', 'Checkbox')

  const case2 = f.smallerEq(
    new Prop({ type: 'Checkbox', name: 'prop', children: ['name'] }),
    true
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Checkbox'>>()
  expect(case2).toHaveProperty('type', 'Checkbox')
})

test('.concat', () => {
  const case1 = f.concat('1', '2')
  expectTypeOf(case1).toMatchTypeOf<Prop<'Text'>>()
  expect(case1).toHaveProperty('type', 'Text')

  const case2 = f.concat(
    new Prop({ type: 'Text', name: 'prop', children: ['name'] }),
    '3'
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Text'>>()
  expect(case2).toHaveProperty('type', 'Text')
})

test('.join', () => {
  const case1 = f.join('1', '2')
  expectTypeOf(case1).toMatchTypeOf<Prop<'Text'>>()
  expect(case1).toHaveProperty('type', 'Text')

  const case2 = f.join(
    new Prop({ type: 'Text', name: 'prop', children: ['name'] }),
    '3'
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Text'>>()
  expect(case2).toHaveProperty('type', 'Text')
})

test('.slice', () => {
  const case1 = f.slice('1', 1, 5)
  expectTypeOf(case1).toMatchTypeOf<Prop<'Text'>>()
  expect(case1).toHaveProperty('type', 'Text')

  const case2 = f.slice(
    new Prop({ type: 'Text', name: 'prop', children: ['name'] }),
    3
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Text'>>()
  expect(case2).toHaveProperty('type', 'Text')
})

test('.length', () => {
  const case1 = f.length('1')
  expectTypeOf(case1).toMatchTypeOf<Prop<'Number'>>()
  expect(case1).toHaveProperty('type', 'Number')

  const case2 = f.length(
    new Prop({ type: 'Text', name: 'prop', children: ['name'] })
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Number'>>()
  expect(case2).toHaveProperty('type', 'Number')
})

test('.format', () => {
  const case1 = f.format('1')
  expectTypeOf(case1).toMatchTypeOf<Prop<'Text'>>()
  expect(case1).toHaveProperty('type', 'Text')

  const case2 = f.format(
    new Prop({ type: 'Text', name: 'prop', children: ['name'] })
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Text'>>()
  expect(case2).toHaveProperty('type', 'Text')
})

test('.toNumber', () => {
  const case1 = f.toNumber('1')
  expectTypeOf(case1).toMatchTypeOf<Prop<'Number'>>()
  expect(case1).toHaveProperty('type', 'Number')

  const case2 = f.toNumber(
    new Prop({ type: 'Text', name: 'prop', children: ['name'] })
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Number'>>()
  expect(case2).toHaveProperty('type', 'Number')
})

test('.contains', () => {
  const case1 = f.contains('1', '1')
  expectTypeOf(case1).toMatchTypeOf<Prop<'Checkbox'>>()
  expect(case1).toHaveProperty('type', 'Checkbox')

  const case2 = f.contains(
    new Prop({ type: 'Text', name: 'prop', children: ['name'] }),
    '1'
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Checkbox'>>()
  expect(case2).toHaveProperty('type', 'Checkbox')
})

test('.replace', () => {
  const case1 = f.replace('1', '1', '1')
  expectTypeOf(case1).toMatchTypeOf<Prop<'Text'>>()
  expect(case1).toHaveProperty('type', 'Text')

  const case2 = f.replace(
    new Prop({ type: 'Text', name: 'prop', children: ['name'] }),
    '1',
    '1'
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Text'>>()
  expect(case2).toHaveProperty('type', 'Text')
})

test('.replaceAll', () => {
  const case1 = f.replaceAll('1', '1', '1')
  expectTypeOf(case1).toMatchTypeOf<Prop<'Text'>>()
  expect(case1).toHaveProperty('type', 'Text')

  const case2 = f.replaceAll(
    new Prop({ type: 'Text', name: 'prop', children: ['name'] }),
    '1',
    '1'
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Text'>>()
  expect(case2).toHaveProperty('type', 'Text')
})

test('.test', () => {
  const case1 = f.test('1', '1')
  expectTypeOf(case1).toMatchTypeOf<Prop<'Checkbox'>>()
  expect(case1).toHaveProperty('type', 'Checkbox')

  const case2 = f.test(
    '1',
    new Prop({ type: 'Text', name: 'prop', children: ['name'] })
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Checkbox'>>()
  expect(case2).toHaveProperty('type', 'Checkbox')

  const case3 = f.test(
    123,
    new Prop({ type: 'Text', name: 'prop', children: ['name'] })
  )
  expectTypeOf(case3).toMatchTypeOf<Prop<'Checkbox'>>()
  expect(case3).toHaveProperty('type', 'Checkbox')
})

test('.empty', () => {
  const case1 = f.empty('1')
  expectTypeOf(case1).toMatchTypeOf<Prop<'Checkbox'>>()
  expect(case1).toHaveProperty('type', 'Checkbox')

  const case2 = f.empty(
    new Prop({ type: 'Text', name: 'prop', children: ['name'] })
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Checkbox'>>()
  expect(case2).toHaveProperty('type', 'Checkbox')
})

test('.abs', () => {
  const case1 = f.abs(1)
  expectTypeOf(case1).toMatchTypeOf<Prop<'Number'>>()
  expect(case1).toHaveProperty('type', 'Number')

  const case2 = f.abs(
    new Prop({ type: 'Number', name: 'prop', children: ['name'] })
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Number'>>()
  expect(case2).toHaveProperty('type', 'Number')
})

test('.cbrt', () => {
  const case1 = f.cbrt(1)
  expectTypeOf(case1).toMatchTypeOf<Prop<'Number'>>()
  expect(case1).toHaveProperty('type', 'Number')

  const case2 = f.cbrt(
    new Prop({ type: 'Number', name: 'prop', children: ['name'] })
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Number'>>()
  expect(case2).toHaveProperty('type', 'Number')
})

test('.ceil', () => {
  const case1 = f.ceil(1)
  expectTypeOf(case1).toMatchTypeOf<Prop<'Number'>>()
  expect(case1).toHaveProperty('type', 'Number')

  const case2 = f.ceil(
    new Prop({ type: 'Number', name: 'prop', children: ['name'] })
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Number'>>()
  expect(case2).toHaveProperty('type', 'Number')
})

test('.exp', () => {
  const case1 = f.exp(1)
  expectTypeOf(case1).toMatchTypeOf<Prop<'Number'>>()
  expect(case1).toHaveProperty('type', 'Number')

  const case2 = f.exp(
    new Prop({ type: 'Number', name: 'prop', children: ['name'] })
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Number'>>()
  expect(case2).toHaveProperty('type', 'Number')
})

test('.floor', () => {
  const case1 = f.floor(1)
  expectTypeOf(case1).toMatchTypeOf<Prop<'Number'>>()
  expect(case1).toHaveProperty('type', 'Number')

  const case2 = f.floor(
    new Prop({ type: 'Number', name: 'prop', children: ['name'] })
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Number'>>()
  expect(case2).toHaveProperty('type', 'Number')
})

test('.ln', () => {
  const case1 = f.ln(1)
  expectTypeOf(case1).toMatchTypeOf<Prop<'Number'>>()
  expect(case1).toHaveProperty('type', 'Number')

  const case2 = f.ln(
    new Prop({ type: 'Number', name: 'prop', children: ['name'] })
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Number'>>()
  expect(case2).toHaveProperty('type', 'Number')
})

test('.log10', () => {
  const case1 = f.log10(1)
  expectTypeOf(case1).toMatchTypeOf<Prop<'Number'>>()
  expect(case1).toHaveProperty('type', 'Number')

  const case2 = f.log10(
    new Prop({ type: 'Number', name: 'prop', children: ['name'] })
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Number'>>()
  expect(case2).toHaveProperty('type', 'Number')
})

test('.log2', () => {
  const case1 = f.log2(1)
  expectTypeOf(case1).toMatchTypeOf<Prop<'Number'>>()
  expect(case1).toHaveProperty('type', 'Number')

  const case2 = f.log2(
    new Prop({ type: 'Number', name: 'prop', children: ['name'] })
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Number'>>()
  expect(case2).toHaveProperty('type', 'Number')
})

test('.max', () => {
  const case1 = f.max(1)
  expectTypeOf(case1).toMatchTypeOf<Prop<'Number'>>()
  expect(case1).toHaveProperty('type', 'Number')

  const case2 = f.max(
    new Prop({ type: 'Number', name: 'prop', children: ['name'] })
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Number'>>()
  expect(case2).toHaveProperty('type', 'Number')
})

test('.min', () => {
  const case1 = f.min(1)
  expectTypeOf(case1).toMatchTypeOf<Prop<'Number'>>()
  expect(case1).toHaveProperty('type', 'Number')

  const case2 = f.min(
    new Prop({ type: 'Number', name: 'prop', children: ['name'] })
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Number'>>()
  expect(case2).toHaveProperty('type', 'Number')
})

test('.round', () => {
  const case1 = f.round(1)
  expectTypeOf(case1).toMatchTypeOf<Prop<'Number'>>()
  expect(case1).toHaveProperty('type', 'Number')

  const case2 = f.round(
    new Prop({ type: 'Number', name: 'prop', children: ['name'] })
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Number'>>()
  expect(case2).toHaveProperty('type', 'Number')
})

test('.sign', () => {
  const case1 = f.sign(1)
  expectTypeOf(case1).toMatchTypeOf<Prop<'Number'>>()
  expect(case1).toHaveProperty('type', 'Number')

  const case2 = f.sign(
    new Prop({ type: 'Number', name: 'prop', children: ['name'] })
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Number'>>()
  expect(case2).toHaveProperty('type', 'Number')
})

test('.sqrt', () => {
  const case1 = f.sqrt(1)
  expectTypeOf(case1).toMatchTypeOf<Prop<'Number'>>()
  expect(case1).toHaveProperty('type', 'Number')

  const case2 = f.sqrt(
    new Prop({ type: 'Number', name: 'prop', children: ['name'] })
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Number'>>()
  expect(case2).toHaveProperty('type', 'Number')
})

test('.start', () => {
  const case1 = f.start(new Date())
  expectTypeOf(case1).toMatchTypeOf<Prop<'Date'>>()
  expect(case1).toHaveProperty('type', 'Date')

  const case2 = f.start(
    new Prop({ type: 'Date', name: 'prop', children: ['name'] })
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Date'>>()
  expect(case2).toHaveProperty('type', 'Date')
})

test('.end', () => {
  const case1 = f.end(new Date())
  expectTypeOf(case1).toMatchTypeOf<Prop<'Date'>>()
  expect(case1).toHaveProperty('type', 'Date')

  const case2 = f.end(
    new Prop({ type: 'Date', name: 'prop', children: ['name'] })
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Date'>>()
  expect(case2).toHaveProperty('type', 'Date')
})

test('.now', () => {
  const now = f.now()
  expectTypeOf(now).toMatchTypeOf<Prop<'Date'>>()
  expect(now).toHaveProperty('type', 'Date')
})

test('.timestamp', () => {
  const case1 = f.timestamp(new Date())
  expectTypeOf(case1).toMatchTypeOf<Prop<'Number'>>()
  expect(case1).toHaveProperty('type', 'Number')

  const case2 = f.timestamp(
    new Prop({ type: 'Date', name: 'prop', children: ['name'] })
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Number'>>()
  expect(case2).toHaveProperty('type', 'Number')
})

test('.fromTimestamp', () => {
  const case1 = f.fromTimestamp(2)
  expectTypeOf(case1).toMatchTypeOf<Prop<'Date'>>()
  expect(case1).toHaveProperty('type', 'Date')

  const case2 = f.fromTimestamp(
    new Prop({ type: 'Number', name: 'prop', children: ['name'] })
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Date'>>()
  expect(case2).toHaveProperty('type', 'Date')
})

test('.dateAdd', () => {
  const case1 = f.dateAdd(new Date(), 20, 'days')
  expectTypeOf(case1).toMatchTypeOf<Prop<'Number'>>()
  expect(case1).toHaveProperty('type', 'Number')

  const case2 = f.dateAdd(
    new Prop({ type: 'Date', name: 'prop', children: ['name'] }),
    20,
    new Prop({ type: 'Text', name: 'prop', children: ['name'] })
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Number'>>()
  expect(case2).toHaveProperty('type', 'Number')
})

test('.dateSubtract', () => {
  const case1 = f.dateSubtract(new Date(), 20, 'days')
  expectTypeOf(case1).toMatchTypeOf<Prop<'Number'>>()
  expect(case1).toHaveProperty('type', 'Number')

  const case2 = f.dateSubtract(
    new Prop({ type: 'Date', name: 'prop', children: ['name'] }),
    20,
    new Prop({ type: 'Text', name: 'prop', children: ['name'] })
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Number'>>()
  expect(case2).toHaveProperty('type', 'Number')
})

test('.dateBetween', () => {
  const case1 = f.dateBetween(new Date(), new Date(), 'days')
  expectTypeOf(case1).toMatchTypeOf<Prop<'Number'>>()
  expect(case1).toHaveProperty('type', 'Number')

  const case2 = f.dateBetween(
    new Prop({ type: 'Date', name: 'prop', children: ['name'] }),
    new Date(),
    new Prop({ type: 'Text', name: 'prop', children: ['name'] })
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Number'>>()
  expect(case2).toHaveProperty('type', 'Number')
})

test('.formatDate', () => {
  const case1 = f.formatDate(new Date(), '1')
  expectTypeOf(case1).toMatchTypeOf<Prop<'Text'>>()
  expect(case1).toHaveProperty('type', 'Text')

  const case2 = f.formatDate(
    new Prop({ type: 'Date', name: 'prop', children: ['name'] }),
    new Prop({ type: 'Text', name: 'prop', children: ['name'] })
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Text'>>()
  expect(case2).toHaveProperty('type', 'Text')
})

test('.minute', () => {
  const case1 = f.minute(new Date())
  expectTypeOf(case1).toMatchTypeOf<Prop<'Number'>>()
  expect(case1).toHaveProperty('type', 'Number')

  const case2 = f.minute(
    new Prop({ type: 'Date', name: 'prop', children: ['name'] })
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Number'>>()
  expect(case2).toHaveProperty('type', 'Number')
})

test('.hour', () => {
  const case1 = f.hour(new Date())
  expectTypeOf(case1).toMatchTypeOf<Prop<'Number'>>()
  expect(case1).toHaveProperty('type', 'Number')

  const case2 = f.hour(
    new Prop({ type: 'Date', name: 'prop', children: ['name'] })
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Number'>>()
  expect(case2).toHaveProperty('type', 'Number')
})

test('.day', () => {
  const case1 = f.day(new Date())
  expectTypeOf(case1).toMatchTypeOf<Prop<'Number'>>()
  expect(case1).toHaveProperty('type', 'Number')

  const case2 = f.day(
    new Prop({ type: 'Date', name: 'prop', children: ['name'] })
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Number'>>()
  expect(case2).toHaveProperty('type', 'Number')
})

test('.date', () => {
  const case1 = f.date(new Date())
  expectTypeOf(case1).toMatchTypeOf<Prop<'Number'>>()
  expect(case1).toHaveProperty('type', 'Number')

  const case2 = f.date(
    new Prop({ type: 'Date', name: 'prop', children: ['name'] })
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Number'>>()
  expect(case2).toHaveProperty('type', 'Number')
})

test('.month', () => {
  const case1 = f.month(new Date())
  expectTypeOf(case1).toMatchTypeOf<Prop<'Number'>>()
  expect(case1).toHaveProperty('type', 'Number')

  const case2 = f.month(
    new Prop({ type: 'Date', name: 'prop', children: ['name'] })
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Number'>>()
  expect(case2).toHaveProperty('type', 'Number')
})

test('.year', () => {
  const case1 = f.year(new Date())
  expectTypeOf(case1).toMatchTypeOf<Prop<'Number'>>()
  expect(case1).toHaveProperty('type', 'Number')

  const case2 = f.year(
    new Prop({ type: 'Date', name: 'prop', children: ['name'] })
  )
  expectTypeOf(case2).toMatchTypeOf<Prop<'Number'>>()
  expect(case2).toHaveProperty('type', 'Number')
})

test('.id', () => {
  const id = f.id()
  expectTypeOf(id).toMatchTypeOf<Prop<'Text'>>()
  expect(id).toHaveProperty('type', 'Text')
})
