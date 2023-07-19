import type { ConvertableToPropValue, PropType } from './notionData.js'

/**
 * Base interface for `Prop`.
 *
 * Every `Prop` should have type and name.
 *
 * @see {@link PropSettings}
 */
export interface BaseProp<T extends PropType> {
  type: T
  name: string
}

/**
 * Interface for constant `Prop`.
 *
 * It should not have children.
 * @see {@link PropSettings}
 * @example
 * ```ts
 * new Prop({ type: 'Number', name: 'pi' })
 * ```
 */
export type ConstantProp<T extends PropType> = BaseProp<T> & {
  children?: undefined
}

/**
 * Interface for function `Prop`.
 *
 * It should have children.
 * @see {@link PropSettings}
 * @example
 * ```ts
 * new Prop({ type: 'Number', name: 'add', children: [2, 3] })
 * ```
 */
export type FunctionProp<T extends PropType> = BaseProp<T> & {
  children: readonly AnyPropOrAnyPropLike[]
}

/**
 * Checks if value is {@link ConstantProp}.
 */
export function isConstantProp(
  payload: unknown
): payload is ConstantProp<PropType> {
  if (!(payload instanceof Prop)) {
    return false
  }
  return payload.children === undefined
}

/**
 * Checks if value is {@link FunctionProp}.
 */
export function isFunctionProp(
  payload: unknown
): payload is FunctionProp<PropType> {
  if (!(payload instanceof Prop)) {
    return false
  }
  return payload.children !== undefined
}

export type PropSettings<T extends PropType> = ConstantProp<T> | FunctionProp<T>

/**
 * Disable duck typing.
 * @see https://github.com/Microsoft/Typescript/issues/202
 */
const discriminator = Symbol('discriminator')

/**
 * Formula property.
 *
 * Represents standard formula properties like functions or constants.
 * @example
 * ```ts
 * new Prop({ type: 'Number', name: 'pi' }) // constant
 * new Prop({ type: 'Number', name: 'add', children: [2, 3] }) // function
 * ```
 */
export class Prop<T extends PropType> {
  /**
   * Type of expression.
   *
   * For most part it is meta for typescript.
   * @see {@link PropType}
   */
  public readonly type: T

  /**
   * Name of expression.
   * @example
   * ```ts
   * new Prop({ type: 'Number', name: 'pi' }) // constant (like pi)
   * new Prop({ type: 'Number', name: 'add', children: [2, 3] }) // function (like add(2, 3))
   * ```
   */
  public readonly name: string

  /**
   * Children (arguments) of expression.
   * @example
   * ```ts
   * new Prop({ type: 'Number', name: 'add', children: [2, 3] }) // function (like add(2, 3))
   * new Prop({ type: 'Text', name: 'join', children: ['-', 'a', 'b'] }) // function (like join('-', 'a', 'b'))
   * ```
   */
  public readonly children?: readonly AnyPropOrAnyPropLike[] | undefined

  // @ts-expect-error
  private readonly [discriminator] = undefined

  constructor({ type, name, children }: PropSettings<T>) {
    this.type = type
    this.name = name
    this.children = children
  }
}

/**
 * Represents formula property with any value.
 * @see {@link Prop}
 * @example
 * ```ts
 * function logProp(prop: AnyProp) {
 *   console.log({ type: prop.type, name: prop.name, children: prop.children })
 * }
 * ```
 */
export type AnyProp = Prop<PropType>

/**
 * Represents formula property with any value or any value that can be converted to formula property.
 *
 * @see {@link AnyProp}
 * @see {@link ConvertableToPropValue}
 */
export type AnyPropOrAnyPropLike = AnyProp | ConvertableToPropValue
