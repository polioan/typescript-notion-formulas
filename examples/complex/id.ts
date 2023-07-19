import { Formula, Builder } from '../../src/index.js'

const f = new Formula({})

const idFormula = f.id()

const builder = new Builder()

const id = builder.toString(idFormula)

console.log(id)
