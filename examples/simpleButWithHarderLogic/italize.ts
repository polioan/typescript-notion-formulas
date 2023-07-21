import { build, type Prop } from '../../src/index.js'

const result = build({ text: 'Text' }).formula(({ prop, replaceAll }) => {
  function italize(text: Prop<'Text'>) {
    const abc = [...'abcdefghijklmnopqrstuvwxyz']
    const Iabc = [...'𝒶𝒷𝒸𝒹𝑒𝒻𝑔𝒽𝒾𝒿𝓀𝓁𝓂𝓃𝑜𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏']

    function compose(text: Prop<'Text'>, charAt = 0): Prop<'Text'> {
      const char = abc[charAt]
      const Ichar = Iabc[charAt]
      if (!char || !Ichar) {
        return text
      }
      return replaceAll(compose(text, ++charAt), char, Ichar)
    }

    return compose(text)
  }

  return italize(prop('text'))
})

console.log(result)
