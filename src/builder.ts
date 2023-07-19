import type { PropType } from './notionData.js'
import {
  isConstantProp,
  isFunctionProp,
  type AnyPropOrAnyPropLike,
} from './prop.js'

/**
 * Interface for function that's convert JavaScript string to notion string.
 * @example
 * ```ts
 * const converter: StringConverter = str => {
 *   return `'${str}'`
 * }
 * ```
 * Note that it should wrap string with quotes and escape evil characters!
 */
export type StringConverter = (str: string) => string

function defaultStringConverter(str: string) {
  return JSON.stringify(str)
}

export interface BuilderSettings {
  stringConverter?: StringConverter | undefined
}

export type ToObj = { type?: PropType | undefined } & (
  | { kind: 'constant'; value: string }
  | { kind: 'function'; value: string; children: readonly ToObj[] }
  | { kind: 'value'; value: string | number | boolean }
)

/**
 * Class for converting code to something that can be understood.
 *
 * Optionally can accept custom {@link StringConverter}.
 * @example
 * ```ts
 * const f = new Formula({ count: 'Number' })
 *
 * const add = f.add(f.prop('count'), 10)
 *
 * const builder = new Builder()
 *
 * const builderWithCustomConverter = new Builder({
 *   stringConverter: str => `'${str}'`,
 * })
 *
 * console.dir(builder.toObj(add), { depth: Infinity })
 * console.log(builder.toString(add))
 * console.log(builderWithCustomConverter.toString(add))
 * ```
 * Note that default string converter is using JSON.stringify (which is notion using too) so don't go crazy with special characters and white spaces.
 *
 * If you have some special use case - create builder with custom converter.
 */
export class Builder {
  private readonly stringConverter: StringConverter

  constructor({
    stringConverter = defaultStringConverter,
  }: BuilderSettings = {}) {
    this.stringConverter = stringConverter
    this.toObj = this.toObj.bind(this)
    this.toString = this.toString.bind(this)
  }

  /**
   * Convert your formula to object.
   * @param `prop` - Formula output or primitive value.
   * @see {@link AnyPropOrAnyPropLike}
   * @returns Object that can be converted to JSON.
   * @throws Will throw an error if your dates or numbers are invalid.
   * @throws Will throw an error if `prop` is not valid. (for js users)
   */
  public toObj(prop: AnyPropOrAnyPropLike): ToObj {
    if (isConstantProp(prop)) {
      return {
        type: prop.type,
        kind: 'constant',
        value: prop.name,
      }
    }

    if (isFunctionProp(prop)) {
      return {
        type: prop.type,
        kind: 'function',
        value: prop.name,
        children: prop.children.map(c => this.toObj(c)),
      }
    }

    if (prop instanceof Date) {
      if (isNaN(prop as any)) {
        throw new Error('Invalid date!')
      }
      return {
        type: 'Date',
        kind: 'function',
        value: 'fromTimestamp',
        children: [{ type: 'Number', kind: 'value', value: prop.getTime() }],
      }
    }

    switch (typeof prop) {
      case 'number':
        if (isNaN(prop)) {
          throw new Error('Invalid number! NaN is not supported.')
        }
        return { type: 'Number', kind: 'value', value: prop }
      case 'boolean':
        return { type: 'Checkbox', kind: 'value', value: prop }
      case 'string':
        return { type: 'Text', kind: 'value', value: prop }
      default:
        throw new Error('Unreachable! Invalid property!')
    }
  }

  private _toString(obj: ToObj): string {
    switch (obj.kind) {
      case 'function':
        return `${obj.value}(${obj.children
          .map(c => this._toString(c))
          .join(',')})`
      case 'value':
        return typeof obj.value === 'string'
          ? this.stringConverter(obj.value)
          : String(obj.value)
      case 'constant':
        return obj.value
      default:
        throw new Error('Unreachable! Invalid property kind!')
    }
  }

  /**
   * Convert your formula to string.
   * @param `prop` - Formula output or primitive value.
   * @see {@link AnyPropOrAnyPropLike}
   * @returns Formula string that can be pasted to notion.
   * @throws Will throw an error if your dates or numbers are invalid.
   * @throws Will throw an error if `prop` is not valid. (for js users)
   *
   * Note that notion is sensitive to special characters and with larger formulas it will be hard to copy from console! You can use something like clipboardy to copy the results.
   */
  public toString(prop: AnyPropOrAnyPropLike) {
    const obj = this.toObj(prop)
    return this._toString(obj)
  }
}
