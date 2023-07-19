import { Prop, type AnyPropOrAnyPropLike } from './prop.js'

/**
 * Represents all notion types.
 */
export type PropType = 'Date' | 'Number' | 'Checkbox' | 'Text'

/**
 * Represents all types that can be converted to notion types.
 * @see {@link PropType}
 */
export type ConvertableToPropValue = Date | number | boolean | string

/**
 * Date unit using in dateAdd, dateSubtract and dateBetween.
 */
export type DateUnit =
  | 'years'
  | 'quarters'
  | 'months'
  | 'weeks'
  | 'days'
  | 'hours'
  | 'minutes'
  | 'seconds'
  | 'milliseconds'

/**
 * Get {@link PropType} from `Prop` or from value that can be converted to `Prop` on a type level.
 * @see {@link toPropType}
 * @example
 * ```ts
 * const value1 = 1
 * type Test1 = ToPropType<typeof value1>
 * // ^? type Test1 = 'Number'
 *
 * const f = new Formula({ count: 'Number' })
 * const value2 = f.prop('count')
 * type Test2 = ToPropType<typeof value2>
 * // ^? type Test2 = 'Number'
 * ```
 */
export type ToPropType<T extends AnyPropOrAnyPropLike> = T extends Prop<
  infer Type
>
  ? Type
  : T extends Date
  ? 'Date'
  : T extends number
  ? 'Number'
  : T extends boolean
  ? 'Checkbox'
  : T extends string
  ? 'Text'
  : never

/**
 * Get {@link PropType} from `Prop` or from value that can be converted to `Prop`.
 * @param `value` - {@link AnyPropOrAnyPropLike}
 * @returns `propType` - {@link PropType}
 * @throws Will throw an error if value is not valid generic. (for js users)
 * @example
 * ```ts
 * const test1 = toPropType(1)
 * // ^? const test1: 'Number'
 *
 * const f = new Formula({ count: 'Number' })
 * const test2 = toPropType(f.prop('count'))
 * // ^? const test2: 'Number'
 * ```
 */
export function toPropType<T extends AnyPropOrAnyPropLike>(
  value: T
): ToPropType<T> {
  if (value instanceof Prop) {
    return value.type as any
  }
  if (value instanceof Date) {
    return 'Date' as any
  }
  const type = typeof value
  switch (type) {
    case 'number':
      return 'Number' as any
    case 'boolean':
      return 'Checkbox' as any
    case 'string':
      return 'Text' as any
    default:
      throw new Error(`Unreachable! Type '${type}' is not supported.`)
  }
}

/**
 * Date `Prop` or JavaScript Date.
 */
export type DateLike = Prop<'Date'> | Date
/**
 * Number `Prop` or JavaScript number.
 */
export type NumberLike = Prop<'Number'> | number
/**
 * Checkbox `Prop` or JavaScript boolean.
 */
export type BooleanLike = Prop<'Checkbox'> | boolean
/**
 * Text `Prop` or JavaScript string.
 */
export type StringLike = Prop<'Text'> | string

/**
 * Checks if value is {@link DateLike}.
 */
export function isDateLike(payload: unknown): payload is DateLike {
  if (payload instanceof Date) {
    return true
  }
  return payload instanceof Prop && payload.type === ('Date' satisfies PropType)
}

/**
 * Checks if value is {@link NumberLike}.
 */
export function isNumberLike(payload: unknown): payload is NumberLike {
  if (typeof payload === 'number') {
    return true
  }
  return (
    payload instanceof Prop && payload.type === ('Number' satisfies PropType)
  )
}

/**
 * Checks if value is {@link BooleanLike}.
 */
export function isBooleanLike(payload: unknown): payload is BooleanLike {
  if (typeof payload === 'boolean') {
    return true
  }
  return (
    payload instanceof Prop && payload.type === ('Checkbox' satisfies PropType)
  )
}

/**
 * Checks if value is {@link StringLike}.
 */
export function isStringLike(payload: unknown): payload is StringLike {
  if (typeof payload === 'string') {
    return true
  }
  return payload instanceof Prop && payload.type === ('Text' satisfies PropType)
}
