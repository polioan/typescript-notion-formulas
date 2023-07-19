import { build } from '../../src/index.js'

const area = build().formula(f => {
  const R = 2
  return f.multiply(f.pi, f.pow(R, 2))
})

console.log(area)
