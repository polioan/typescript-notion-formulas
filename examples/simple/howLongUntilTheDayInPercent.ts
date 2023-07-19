import { build } from '../../src/index.js'

const howLongUntilTheDay = build({ date: 'Date' }).formula(f => {
  const date = f.prop('date')

  const dateStart = f.start(date)
  const dateEnd = f.end(date)

  const allTime = f.dateBetween(dateEnd, dateStart, 'minutes')

  const now = f.now()

  const passTime = f.dateBetween(now, dateStart, 'minutes')

  const percent = f.divide(passTime, allTime)

  return f.if({
    condition: f.smaller(now, dateStart),
    whenTrue: 0,
    whenFalse: f.if({
      condition: f.larger(now, dateEnd),
      whenTrue: 1,
      whenFalse: percent,
    }),
  })
})

console.log(howLongUntilTheDay)
