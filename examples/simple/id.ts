import { build } from '../../src/index.js'

const id = build().formula(f => {
  return f.id()
})

console.log(id)
