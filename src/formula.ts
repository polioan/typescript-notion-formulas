import {
  toPropType,
  isNumberLike,
  type PropType,
  type DateLike,
  type NumberLike,
  type BooleanLike,
  type StringLike,
  type DateUnit,
} from './notionData.js'
import { Prop, type AnyPropOrAnyPropLike } from './prop.js'
import type { AtLeastOne } from './typeHelpers.js'

export type FormulaProps = Record<string, PropType>

/**
 * Base formula class.
 * @param `props` - {@link FormulaProps} - All properties from your table with them types.
 * @see https://www.notion.so/help/formulas
 * @example
 * ```ts
 * const f = new Formula({ count: 'Number' })
 *
 * const count = f.prop('count')
 *
 * const add = f.add(count, 10)
 *
 * const builder = new Builder()
 *
 * console.log(builder.toString(add))
 * ```
 */
export class Formula<TProps extends FormulaProps> {
  private readonly props: TProps

  constructor(props: TProps) {
    this.props = props
    this.prop = this.prop.bind(this)
  }

  /**
   * Returns the property for each entry.
   * @param `propName` - Name of the property from the table (you can setup this in `props` field in Formula).
   * @returns `Prop` - {@link Prop} object with it type metadata.
   * @example
   * ```ts
   * const f = new Formula({ count: 'Number' })
   *
   * f.prop('count')
   *
   * // Or.
   *
   * build({ count: 'Number' }).formula(f => f.prop('count'))
   * ```
   */
  public prop<T extends keyof TProps>(propName: T): Prop<TProps[T]> {
    const type = this.props[propName]
    return new Prop({
      type: typeof type !== 'string' ? (undefined as any) : type,
      name: 'prop',
      children: [String(propName)],
    })
  }

  /**
   * The base of the natural logarithm.
   *
   * e == 2.718281828459045
   */
  public readonly e = new Prop({ type: 'Number', name: 'e' })
  /**
   * The ratio of a circle's circumference to its diameter.
   *
   * pi == 3.14159265359
   */
  public readonly pi = new Prop({ type: 'Number', name: 'pi' })
  /**
   * True value.
   */
  public readonly true = new Prop({ type: 'Checkbox', name: 'true' })
  /**
   * False value.
   */
  public readonly false = new Prop({ type: 'Checkbox', name: 'false' })

  /**
   * Switches between two options based on another value.
   * @throws Will throw an error if `whenTrue` is not valid generic for {@link toPropType}. (for js users)
   * @example
   * ```ts
   * f.if(true, f.prop('count'), 20)
   * f.if(f.prop('condition'), f.prop('count'), 20)
   *
   * // Or.
   *
   * f.if({ condition: true, whenTrue: f.prop('count'), whenFalse: 20 })
   * f.if({ condition: f.prop('condition'), whenTrue: f.prop('count'), whenFalse: 20 })
   * ```
   */
  public if({
    condition,
    whenFalse,
    whenTrue,
  }: {
    condition: BooleanLike
    whenTrue: DateLike
    whenFalse: DateLike
  }): Prop<'Date'>
  public if(
    condition: BooleanLike,
    whenTrue: DateLike,
    whenFalse: DateLike
  ): Prop<'Date'>
  public if({
    condition,
    whenFalse,
    whenTrue,
  }: {
    condition: BooleanLike
    whenTrue: NumberLike
    whenFalse: NumberLike
  }): Prop<'Number'>
  public if(
    condition: BooleanLike,
    whenTrue: NumberLike,
    whenFalse: NumberLike
  ): Prop<'Number'>
  public if({
    condition,
    whenFalse,
    whenTrue,
  }: {
    condition: BooleanLike
    whenTrue: BooleanLike
    whenFalse: BooleanLike
  }): Prop<'Checkbox'>
  public if(
    condition: BooleanLike,
    whenTrue: BooleanLike,
    whenFalse: BooleanLike
  ): Prop<'Checkbox'>
  public if({
    condition,
    whenFalse,
    whenTrue,
  }: {
    condition: BooleanLike
    whenTrue: StringLike
    whenFalse: StringLike
  }): Prop<'Text'>
  public if(
    condition: BooleanLike,
    whenTrue: StringLike,
    whenFalse: StringLike
  ): Prop<'Text'>
  public if(
    condition:
      | {
          condition: BooleanLike
          whenTrue: AnyPropOrAnyPropLike
          whenFalse: AnyPropOrAnyPropLike
        }
      | BooleanLike,
    whenTrue?: AnyPropOrAnyPropLike,
    whenFalse?: AnyPropOrAnyPropLike
  ) {
    if (typeof condition === 'object' && 'condition' in condition) {
      return new Prop({
        type: toPropType(condition.whenTrue),
        name: 'if',
        children: [
          condition.condition,
          condition.whenTrue,
          condition.whenFalse,
        ],
      })
    }
    return new Prop({
      type: toPropType(whenTrue!),
      name: 'if',
      children: [condition, whenTrue!, whenFalse!],
    })
  }

  /**
   * Adds two numbers and returns their sum, or concatenates two strings.
   */
  public add(a: NumberLike, b: NumberLike): Prop<'Number'>
  public add(a: StringLike, b: StringLike): Prop<'Text'>
  public add(a: NumberLike | StringLike, b: NumberLike | StringLike) {
    return new Prop({
      type: isNumberLike(a) ? 'Number' : 'Text',
      name: 'add',
      children: [a, b],
    })
  }

  /**
   * Subtracts two numbers and returns their difference.
   */
  public subtract(a: NumberLike, b: NumberLike) {
    return new Prop({ type: 'Number', name: 'subtract', children: [a, b] })
  }

  /**
   * Multiplies two numbers and returns their product.
   */
  public multiply(a: NumberLike, b: NumberLike) {
    return new Prop({ type: 'Number', name: 'multiply', children: [a, b] })
  }

  /**
   * Divides two numbers and returns their quotient.
   */
  public divide(a: NumberLike, b: NumberLike) {
    return new Prop({ type: 'Number', name: 'divide', children: [a, b] })
  }

  /**
   * Returns base to the exponent power, that is, baseexponent.
   */
  public pow(a: NumberLike, b: NumberLike) {
    return new Prop({ type: 'Number', name: 'pow', children: [a, b] })
  }

  /**
   * Divides two numbers and returns their remainder.
   */
  public mod(a: NumberLike, b: NumberLike) {
    return new Prop({ type: 'Number', name: 'mod', children: [a, b] })
  }

  /**
   * Negates a number.
   */
  public unaryMinus(a: NumberLike) {
    return new Prop({ type: 'Number', name: 'unaryMinus', children: [a] })
  }

  /**
   * Converts its argument into a number.
   */
  public unaryPlus(a: NumberLike | BooleanLike | StringLike) {
    return new Prop({ type: 'Number', name: 'unaryPlus', children: [a] })
  }

  /**
   * Returns the logical NOT of its argument.
   */
  public not(a: BooleanLike) {
    return new Prop({ type: 'Checkbox', name: 'not', children: [a] })
  }

  /**
   * Returns the logical AND of its two arguments.
   */
  public and(a: BooleanLike, b: BooleanLike) {
    return new Prop({ type: 'Checkbox', name: 'and', children: [a, b] })
  }

  /**
   * Returns the logical OR of its two arguments.
   */
  public or(a: BooleanLike, b: BooleanLike) {
    return new Prop({ type: 'Checkbox', name: 'or', children: [a, b] })
  }

  /**
   * Returns true if its arguments are equal, and false otherwise.
   */
  public equal(a: DateLike, b: DateLike): Prop<'Checkbox'>
  public equal(a: NumberLike, b: NumberLike): Prop<'Checkbox'>
  public equal(a: BooleanLike, b: BooleanLike): Prop<'Checkbox'>
  public equal(a: StringLike, b: StringLike): Prop<'Checkbox'>
  public equal(a: AnyPropOrAnyPropLike, b: AnyPropOrAnyPropLike) {
    return new Prop({ type: 'Checkbox', name: 'equal', children: [a, b] })
  }

  /**
   * Returns false if its arguments are equal, and true otherwise.
   */
  public unequal(a: DateLike, b: DateLike): Prop<'Checkbox'>
  public unequal(a: NumberLike, b: NumberLike): Prop<'Checkbox'>
  public unequal(a: BooleanLike, b: BooleanLike): Prop<'Checkbox'>
  public unequal(a: StringLike, b: StringLike): Prop<'Checkbox'>
  public unequal(a: AnyPropOrAnyPropLike, b: AnyPropOrAnyPropLike) {
    return new Prop({ type: 'Checkbox', name: 'unequal', children: [a, b] })
  }

  /**
   * Returns true if the first argument is larger than the second.
   */
  public larger(a: DateLike, b: DateLike): Prop<'Checkbox'>
  public larger(a: NumberLike, b: NumberLike): Prop<'Checkbox'>
  public larger(a: BooleanLike, b: BooleanLike): Prop<'Checkbox'>
  public larger(a: StringLike, b: StringLike): Prop<'Checkbox'>
  public larger(a: AnyPropOrAnyPropLike, b: AnyPropOrAnyPropLike) {
    return new Prop({ type: 'Checkbox', name: 'larger', children: [a, b] })
  }

  /**
   * Returns true if the first argument is larger than or equal to than the second.
   */
  public largerEq(a: DateLike, b: DateLike): Prop<'Checkbox'>
  public largerEq(a: NumberLike, b: NumberLike): Prop<'Checkbox'>
  public largerEq(a: BooleanLike, b: BooleanLike): Prop<'Checkbox'>
  public largerEq(a: StringLike, b: StringLike): Prop<'Checkbox'>
  public largerEq(a: AnyPropOrAnyPropLike, b: AnyPropOrAnyPropLike) {
    return new Prop({ type: 'Checkbox', name: 'largerEq', children: [a, b] })
  }

  /**
   * Returns true if the first argument is smaller than the second.
   */
  public smaller(a: DateLike, b: DateLike): Prop<'Checkbox'>
  public smaller(a: NumberLike, b: NumberLike): Prop<'Checkbox'>
  public smaller(a: BooleanLike, b: BooleanLike): Prop<'Checkbox'>
  public smaller(a: StringLike, b: StringLike): Prop<'Checkbox'>
  public smaller(a: AnyPropOrAnyPropLike, b: AnyPropOrAnyPropLike) {
    return new Prop({ type: 'Checkbox', name: 'smaller', children: [a, b] })
  }

  /**
   * Returns true if the first argument is smaller than or equal to than the second.
   */
  public smallerEq(a: DateLike, b: DateLike): Prop<'Checkbox'>
  public smallerEq(a: NumberLike, b: NumberLike): Prop<'Checkbox'>
  public smallerEq(a: BooleanLike, b: BooleanLike): Prop<'Checkbox'>
  public smallerEq(a: StringLike, b: StringLike): Prop<'Checkbox'>
  public smallerEq(a: AnyPropOrAnyPropLike, b: AnyPropOrAnyPropLike) {
    return new Prop({ type: 'Checkbox', name: 'smallerEq', children: [a, b] })
  }

  /**
   * Concatenates its arguments and returns the result.
   * @example
   * ```
   * concat('dog', 'go') == 'doggo'
   * ```
   */
  public concat(...a: AtLeastOne<StringLike>) {
    return new Prop({ type: 'Text', name: 'concat', children: a })
  }

  /**
   * Inserts the first argument between the rest and returns their concatenation.
   * @example
   * ```
   * join('-', 'a', 'b', 'c') == 'a-b-c'
   * ```
   */
  public join(...a: AtLeastOne<StringLike>) {
    return new Prop({ type: 'Text', name: 'join', children: a })
  }

  /**
   * Extracts a substring from a string from the start index (inclusively) to the end index (optional and exclusively).
   * @example
   * ```
   * slice('Hello world', 1, 5) == 'ello'
   * slice('notion', 3) == 'ion'
   * ```
   */
  public slice(a: StringLike, start: NumberLike, end?: NumberLike | undefined) {
    const children = end === undefined ? [a, start] : [a, start, end]
    return new Prop({ type: 'Text', name: 'slice', children })
  }

  /**
   * Returns the length of a string.
   */
  public length(a: StringLike) {
    return new Prop({ type: 'Number', name: 'length', children: [a] })
  }

  /**
   * Formats its argument as a string.
   */
  public format(a: AnyPropOrAnyPropLike) {
    return new Prop({ type: 'Text', name: 'format', children: [a] })
  }

  /**
   * Parses a number from text.
   */
  public toNumber(a: AnyPropOrAnyPropLike) {
    return new Prop({ type: 'Number', name: 'toNumber', children: [a] })
  }

  /**
   * Returns true if the second argument is found in the first.
   * @example
   * ```
   * contains('notion', 'ion') == true
   * ```
   */
  public contains(a: StringLike, b: StringLike) {
    return new Prop({ type: 'Checkbox', name: 'contains', children: [a, b] })
  }

  /**
   * Replaces the first match of a regular expression with a new value.
   * @example
   * ```
   * replace('1-2-3', '-', '!') == '1!2-3'
   * ```
   */
  public replace(
    value: NumberLike | BooleanLike | StringLike,
    find: StringLike,
    replaceWith: StringLike
  ) {
    return new Prop({
      type: 'Text',
      name: 'replace',
      children: [value, find, replaceWith],
    })
  }

  /**
   * Replaces all matches of a regular expression with a new value.
   * @example
   * ```
   * replaceAll('1-2-3', '-', '!') == '1!2!3'
   * ```
   */
  public replaceAll(
    value: NumberLike | BooleanLike | StringLike,
    find: StringLike,
    replaceWith: StringLike
  ) {
    return new Prop({
      type: 'Text',
      name: 'replaceAll',
      children: [value, find, replaceWith],
    })
  }

  /**
   * Tests if a string matches a regular expression.
   * @example
   * ```
   * test('1-2-3', '-') == true
   * ```
   */
  public test(
    value: NumberLike | BooleanLike | StringLike,
    testFor: StringLike
  ) {
    return new Prop({
      type: 'Checkbox',
      name: 'test',
      children: [value, testFor],
    })
  }

  /**
   * Tests if a value is empty.
   */
  public empty(a: AnyPropOrAnyPropLike) {
    return new Prop({ type: 'Checkbox', name: 'empty', children: [a] })
  }

  /**
   * Returns the absolute value of a number.
   */
  public abs(a: NumberLike) {
    return new Prop({ type: 'Number', name: 'abs', children: [a] })
  }

  /**
   * Returns the cube root of a number.
   */
  public cbrt(a: NumberLike) {
    return new Prop({ type: 'Number', name: 'cbrt', children: [a] })
  }

  /**
   * Returns the smallest integer greater than or equal to a number.
   */
  public ceil(a: NumberLike) {
    return new Prop({ type: 'Number', name: 'ceil', children: [a] })
  }

  /**
   * Returns E^x, where x is the argument, and E is Euler's constant (2.718…), the base of the natural logarithm.
   */
  public exp(a: NumberLike) {
    return new Prop({ type: 'Number', name: 'exp', children: [a] })
  }

  /**
   * Returns the largest integer less than or equal to a number.
   */
  public floor(a: NumberLike) {
    return new Prop({ type: 'Number', name: 'floor', children: [a] })
  }

  /**
   * Returns the natural logarithm of a number.
   */
  public ln(a: NumberLike) {
    return new Prop({ type: 'Number', name: 'ln', children: [a] })
  }

  /**
   * Returns the base 10 logarithm of a number.
   */
  public log10(a: NumberLike) {
    return new Prop({ type: 'Number', name: 'log10', children: [a] })
  }

  /**
   * Returns the base 10 logarithm of a number.
   */
  public log2(a: NumberLike) {
    return new Prop({ type: 'Number', name: 'log2', children: [a] })
  }

  /**
   * Returns the largest of zero or more numbers.
   */
  public max(...a: AtLeastOne<NumberLike>) {
    return new Prop({ type: 'Number', name: 'max', children: a })
  }

  /**
   * Returns the smallest of zero or more numbers.
   */
  public min(...a: AtLeastOne<NumberLike>) {
    return new Prop({ type: 'Number', name: 'min', children: a })
  }

  /**
   * Returns the value of a number rounded to the nearest integer.
   */
  public round(a: NumberLike) {
    return new Prop({ type: 'Number', name: 'round', children: [a] })
  }

  /**
   * Returns the sign of the x, indicating whether x is positive, negative or zero.
   * @example
   * ```
   * sign(4) == 1
   * sign(-9) == -1
   * sign(0) == 0
   * ```
   */
  public sign(a: NumberLike) {
    return new Prop({ type: 'Number', name: 'sign', children: [a] })
  }

  /**
   * Returns the positive square root of a number.
   */
  public sqrt(a: NumberLike) {
    return new Prop({ type: 'Number', name: 'sqrt', children: [a] })
  }

  /**
   * Returns the start of a date range.
   */
  public start(a: DateLike) {
    return new Prop({ type: 'Date', name: 'start', children: [a] })
  }

  /**
   * Returns the end of a date range.
   */
  public end(a: DateLike) {
    return new Prop({ type: 'Date', name: 'end', children: [a] })
  }

  /**
   * Returns the current date and time.
   */
  public now() {
    return new Prop({ type: 'Date', name: 'now', children: [] })
  }

  /**
   * Returns an integer number from a Unix millisecond timestamp, corresponding to the number of milliseconds since January 1, 1970.
   */
  public timestamp(a: DateLike) {
    return new Prop({ type: 'Number', name: 'timestamp', children: [a] })
  }

  /**
   * Returns a date constructed from a Unix millisecond timestamp, corresponding to the number of milliseconds since January 1, 1970.
   */
  public fromTimestamp(a: NumberLike) {
    return new Prop({ type: 'Date', name: 'fromTimestamp', children: [a] })
  }

  /**
   * Add to a date. The last argument, unit, can be one of: 'years', 'quarters', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds', or 'milliseconds'.
   * @example
   * ```
   * dateAdd(date, amount, 'years')
   * dateAdd(date, amount, 'quarters')
   * dateAdd(date, amount, 'months')
   * dateAdd(date, amount, 'weeks')
   * dateAdd(date, amount, 'days')
   * dateAdd(date, amount, 'hours')
   * dateAdd(date, amount, 'minutes')
   * dateAdd(date, amount, 'seconds')
   * dateAdd(date, amount, 'milliseconds')
   * ```
   */
  public dateAdd(
    date: DateLike,
    amount: NumberLike,
    unit: Prop<'Text'> | DateUnit
  ) {
    return new Prop({
      type: 'Number',
      name: 'dateAdd',
      children: [date, amount, unit],
    })
  }

  /**
   * Subtract from a date. The last argument, unit, can be one of: 'years', 'quarters', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds', or 'milliseconds'.
   * @example
   * ```
   * dateSubtract(date, amount, 'years')
   * dateSubtract(date, amount, 'quarters')
   * dateSubtract(date, amount, 'months')
   * dateSubtract(date, amount, 'weeks')
   * dateSubtract(date, amount, 'days')
   * dateSubtract(date, amount, 'hours')
   * dateSubtract(date, amount, 'minutes')
   * dateSubtract(date, amount, 'seconds')
   * dateSubtract(date, amount, 'milliseconds')
   * ```
   */
  public dateSubtract(
    date: DateLike,
    amount: NumberLike,
    unit: Prop<'Text'> | DateUnit
  ) {
    return new Prop({
      type: 'Number',
      name: 'dateSubtract',
      children: [date, amount, unit],
    })
  }

  /**
   * Returns the time between two dates. The last argument, unit, can be one of: 'years', 'quarters', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds', or 'milliseconds'.
   * @example
   * ```
   * dateBetween(date, date2, 'years')
   * dateBetween(date, date2, 'quarters')
   * dateBetween(date, date2, 'months')
   * dateBetween(date, date2, 'weeks')
   * dateBetween(date, date2, 'days')
   * dateBetween(date, date2, 'hours')
   * dateBetween(date, date2, 'minutes')
   * dateBetween(date, date2, 'seconds')
   * dateBetween(date, date2, 'milliseconds')
   * ```
   */
  public dateBetween(a: DateLike, b: DateLike, unit: Prop<'Text'> | DateUnit) {
    return new Prop({
      type: 'Number',
      name: 'dateBetween',
      children: [a, b, unit],
    })
  }

  /**
   * Format a date using the Moment standard time format string.
   * @example
   * ```
   * formatDate(now(), 'MMMM D YYYY, HH:mm') == March 30 2010, 12:00
   * formatDate(now(), 'YYYY/MM/DD, HH:mm') == 2010/03/30, 12:00
   * formatDate(now(), 'MM/DD/YYYY, HH:mm') == 03/30/2010, 12:00
   * formatDate(now(), 'HH:mm A') == 12:00 PM
   * formatDate(now(), 'M/D/YY') == 3/30/10
   * ```
   */
  public formatDate(date: DateLike, format: StringLike) {
    return new Prop({
      type: 'Text',
      name: 'formatDate',
      children: [date, format],
    })
  }

  /**
   * Returns an integer number, between 0 and 59, corresponding to minutes in the given date.
   */
  public minute(a: DateLike) {
    return new Prop({
      type: 'Number',
      name: 'minute',
      children: [a],
    })
  }

  /**
   * Returns an integer number, between 0 and 23, corresponding to hour for the given date.
   */
  public hour(a: DateLike) {
    return new Prop({
      type: 'Number',
      name: 'hour',
      children: [a],
    })
  }

  /**
   * Returns an integer number corresponding to the day of the week for the given date: 0 for Sunday, 1 for Monday, 2 for Tuesday, and so on.
   */
  public day(a: DateLike) {
    return new Prop({
      type: 'Number',
      name: 'day',
      children: [a],
    })
  }

  /**
   * Returns an integer number, between 1 and 31, corresponding to day of the month for the given.
   */
  public date(a: DateLike) {
    return new Prop({
      type: 'Number',
      name: 'date',
      children: [a],
    })
  }

  /**
   * Returns an integer number, between 0 and 11, corresponding to month in the given date according to local time. 0 corresponds to January, 1 to February, and so on.
   */
  public month(a: DateLike) {
    return new Prop({
      type: 'Number',
      name: 'month',
      children: [a],
    })
  }

  /**
   * Returns a number corresponding to the year of the given date.
   */
  public year(a: DateLike) {
    return new Prop({
      type: 'Number',
      name: 'year',
      children: [a],
    })
  }

  /**
   * Returns a unique string id for each entry.
   * @example
   * ```
   * id() == '0fbb42bcf4d649918d5aa38c7ccb0792'
   * ```
   */
  public id() {
    return new Prop({
      type: 'Text',
      name: 'id',
      children: [],
    })
  }
}
