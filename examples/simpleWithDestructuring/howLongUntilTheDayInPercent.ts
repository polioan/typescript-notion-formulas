import { build } from '../../src/index.js'

const howLongUntilTheDay = build({ date: 'Date' }).formula(
  ({
    prop,
    start,
    end,
    dateBetween,
    now,
    divide,
    if: fIf,
    smaller,
    larger,
  }) => {
    const date = prop('date')

    const dateStart = start(date)
    const dateEnd = end(date)

    const allTime = dateBetween(dateEnd, dateStart, 'minutes')

    const dateNow = now()

    const passTime = dateBetween(dateNow, dateStart, 'minutes')

    const percent = divide(passTime, allTime)

    return fIf({
      condition: smaller(dateNow, dateStart),
      whenTrue: 0,
      whenFalse: fIf({
        condition: larger(dateNow, dateEnd),
        whenTrue: 1,
        whenFalse: percent,
      }),
    })
  }
)

console.log(howLongUntilTheDay)
