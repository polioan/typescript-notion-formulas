import { build } from '../../src/index.js'

const area = build().formula(({ multiply, pi, pow }) => {
  const R = 2
  return multiply(pi, pow(R, 2))
})

console.log(area)
