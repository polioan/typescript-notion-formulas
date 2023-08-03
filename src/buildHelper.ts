import { Formula, type FormulaProps } from './formula.js'
import { Builder } from './builder.js'
import type { AnyPropOrAnyPropLike } from './prop.js'

/**
 * Helper for creating notion formula.
 * @param `props` - {@link FormulaProps} - All properties from your table with them types. (If you leave an empty input, all properties will be of any type, which is dangerous)
 * @see https://www.notion.so/help/formulas
 * @example
 * ```ts
 * const add = build({ number: 'Number' }).formula(f => {
 *   return f.add(f.prop('number'), 3)
 * })
 *
 * // Or unsafe.
 *
 * const add = build().formula(f => {
 *   return f.add(f.prop('number'), 3)
 * })
 * ```
 * Note that default string converter is using JSON.stringify (which is notion using too) so don't go crazy with special characters and white spaces.
 *
 * If you have some special use case - create builder with custom converter.
 * @see {@link Builder}
 */
export function build<T extends FormulaProps | undefined = undefined>(
  props?: T | undefined
) {
  const newFormula = new Formula<T extends undefined ? any : T>(
    props ?? ({} as any)
  )

  const builder = new Builder()

  return {
    /**
     * @param `formulaCallback` - Callback that's need to return some value that will be converted.
     * @returns Formula string that can be pasted to notion. (or error string if your dates, numbers or props are invalid)
     * @see {@link build}.
     *
     * Note that notion is sensitive to special characters and with larger formulas it will be hard to copy from console! You can use something like clipboardy to copy the results.
     */
    formula(formulaCallback: (f: typeof newFormula) => AnyPropOrAnyPropLike) {
      try {
        return builder.toString(formulaCallback(newFormula))
      } catch (e) {
        if (
          typeof e === 'object' &&
          e != null &&
          'message' in e &&
          typeof e.message === 'string'
        ) {
          return e.message
        }
        return 'Unknown error'
      }
    },
  } as const
}
