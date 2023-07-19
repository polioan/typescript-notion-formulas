import { Formula, Builder } from '../../src/index.js'

const f = new Formula({ number: 'Number' })

const addFormula = f.add(f.prop('number'), 10)

const builder = new Builder()

console.dir(builder.toObj(addFormula), { depth: Infinity })
