import { build } from '../../src/index.js'

const add = build({ number: 'Number' }).formula(({ add, prop }) => {
  return add(prop('number'), 3)
})

console.log(add)
