import { build } from '../../src/index.js'

const add = build({ number: 'Number' }).formula(f => {
  return f.add(f.prop('number'), 3)
})

console.log(add)
