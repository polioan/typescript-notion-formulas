import { build } from '../../src/index.js'

const add = build().formula(f => {
  return f.add(2, 3)
})

console.log(add)
