import { build } from '../../src/index.js'

const number = build().formula(() => {
  return 3
})
console.log(number)

const checkbox = build().formula(() => {
  return true
})
console.log(checkbox)

const text = build().formula(() => {
  return 'text'
})
console.log(text)

const date = build().formula(() => {
  return new Date()
})
console.log(date)
