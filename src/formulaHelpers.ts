import { Formula } from './formula.js'
import type { DateLike, NumberLike, DateUnit } from './notionData.js'
import type { Prop, AnyPropOrAnyPropLike } from './prop.js'

/**
 * Formula helpers for more readable code.
 * @example
 * ```ts
 * build({ date: 'Date' }).formula(f => {
 *   const { safeToNumber } = Helpers
 *   return safeToNumber(f.prop('date'))
 * })
 * ```
 */
export namespace Helpers {
  const f = new Formula({})

  /**
   * Clamp number.
   */
  export function clamp(
    number: NumberLike,
    lower: NumberLike,
    upper: NumberLike
  ) {
    return f.if({
      condition: f.larger(lower, upper),
      whenTrue: f.min(f.max(number, upper), lower),
      whenFalse: f.min(f.max(number, lower), upper),
    })
  }

  /**
   * Get the length of the interval between the beginning and end of the day.
   */
  export function dateRange(date: DateLike, unit: Prop<'Text'> | DateUnit) {
    return f.dateBetween(f.end(date), f.start(date), unit)
  }

  /**
   * Identical to `toNumber`, but provides a fallback option if the conversion was not successful (0 by default).
   */
  export function safeToNumber(
    a: AnyPropOrAnyPropLike,
    fallback: number | undefined = 0
  ) {
    const number = f.toNumber(a)
    return f.if(f.empty(number), fallback, number)
  }

  /**
   * Checks if number in range.
   */
  export function inRange(
    number: NumberLike,
    lower: NumberLike,
    upper: NumberLike
  ) {
    return f.if({
      condition: f.larger(lower, upper),
      whenTrue: f.and(f.largerEq(number, upper), f.smallerEq(number, lower)),
      whenFalse: f.and(f.largerEq(number, lower), f.smallerEq(number, upper)),
    })
  }
}
