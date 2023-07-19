import { describe, test, expect, expectTypeOf } from 'vitest'
import { Formula } from '../../src/formula.js'
import { Prop } from '../../src/prop.js'

const f = new Formula({
  date: 'Date',
  checkbox: 'Checkbox',
  number: 'Number',
  text: 'Text',
})

describe('.if', () => {
  test('.if - overload 1, primitive (convertable) condition', () => {
    const case1 = f.if(
      true,
      new Prop({ type: 'Number', name: 'some', children: ['name'] }),
      new Prop({ type: 'Number', name: 'some', children: ['name'] })
    )
    expectTypeOf(case1).toMatchTypeOf<Prop<'Number'>>()
    expect(case1).toHaveProperty('type', 'Number')

    const case2 = f.if(
      true,
      new Prop({ type: 'Number', name: 'some', children: ['name'] }),
      2
    )
    expectTypeOf(case2).toMatchTypeOf<Prop<'Number'>>()
    expect(case2).toHaveProperty('type', 'Number')

    const case3 = f.if(
      true,
      2,
      new Prop({ type: 'Number', name: 'some', children: ['name'] })
    )
    expectTypeOf(case3).toMatchTypeOf<Prop<'Number'>>()
    expect(case3).toHaveProperty('type', 'Number')

    const case4 = f.if(true, 2, 2)
    expectTypeOf(case4).toMatchTypeOf<Prop<'Number'>>()
    expect(case4).toHaveProperty('type', 'Number')
  })

  test('.if - overload 1, Prop condition', () => {
    const case1 = f.if(
      new Prop({ type: 'Checkbox', name: 'some', children: ['name'] }),
      new Prop({ type: 'Number', name: 'some', children: ['name'] }),
      new Prop({ type: 'Number', name: 'some', children: ['name'] })
    )
    expectTypeOf(case1).toMatchTypeOf<Prop<'Number'>>()
    expect(case1).toHaveProperty('type', 'Number')

    const case2 = f.if(
      new Prop({ type: 'Checkbox', name: 'some', children: ['name'] }),
      new Prop({ type: 'Number', name: 'some', children: ['name'] }),
      2
    )
    expectTypeOf(case2).toMatchTypeOf<Prop<'Number'>>()
    expect(case2).toHaveProperty('type', 'Number')

    const case3 = f.if(
      new Prop({ type: 'Checkbox', name: 'some', children: ['name'] }),
      2,
      new Prop({ type: 'Number', name: 'some', children: ['name'] })
    )
    expectTypeOf(case3).toMatchTypeOf<Prop<'Number'>>()
    expect(case3).toHaveProperty('type', 'Number')

    const case4 = f.if(
      new Prop({ type: 'Checkbox', name: 'some', children: ['name'] }),
      2,
      2
    )
    expectTypeOf(case4).toMatchTypeOf<Prop<'Number'>>()
    expect(case4).toHaveProperty('type', 'Number')
  })

  test('.if - overload 2, primitive (convertable) condition', () => {
    const case1 = f.if({
      condition: true,
      whenTrue: new Prop({ type: 'Number', name: 'some', children: ['name'] }),
      whenFalse: new Prop({ type: 'Number', name: 'some', children: ['name'] }),
    })
    expectTypeOf(case1).toMatchTypeOf<Prop<'Number'>>()
    expect(case1).toHaveProperty('type', 'Number')

    const case2 = f.if({
      condition: true,
      whenTrue: new Prop({ type: 'Number', name: 'some', children: ['name'] }),
      whenFalse: 2,
    })
    expectTypeOf(case2).toMatchTypeOf<Prop<'Number'>>()
    expect(case2).toHaveProperty('type', 'Number')

    const case3 = f.if({
      condition: true,
      whenTrue: 2,
      whenFalse: new Prop({ type: 'Number', name: 'some', children: ['name'] }),
    })
    expectTypeOf(case3).toMatchTypeOf<Prop<'Number'>>()
    expect(case3).toHaveProperty('type', 'Number')

    const case4 = f.if({ condition: true, whenTrue: 2, whenFalse: 2 })
    expectTypeOf(case4).toMatchTypeOf<Prop<'Number'>>()
    expect(case4).toHaveProperty('type', 'Number')
  })

  test('.if - overload 2, Prop condition', () => {
    const case1 = f.if({
      condition: new Prop({
        type: 'Checkbox',
        name: 'some',
        children: ['name'],
      }),
      whenTrue: new Prop({ type: 'Number', name: 'some', children: ['name'] }),
      whenFalse: new Prop({ type: 'Number', name: 'some', children: ['name'] }),
    })
    expectTypeOf(case1).toMatchTypeOf<Prop<'Number'>>()
    expect(case1).toHaveProperty('type', 'Number')

    const case2 = f.if({
      condition: new Prop({
        type: 'Checkbox',
        name: 'some',
        children: ['name'],
      }),
      whenTrue: new Prop({ type: 'Number', name: 'some', children: ['name'] }),
      whenFalse: 2,
    })
    expectTypeOf(case2).toMatchTypeOf<Prop<'Number'>>()
    expect(case2).toHaveProperty('type', 'Number')

    const case3 = f.if({
      condition: new Prop({
        type: 'Checkbox',
        name: 'some',
        children: ['name'],
      }),
      whenTrue: 2,
      whenFalse: new Prop({ type: 'Number', name: 'some', children: ['name'] }),
    })
    expectTypeOf(case3).toMatchTypeOf<Prop<'Number'>>()
    expect(case3).toHaveProperty('type', 'Number')

    const case4 = f.if({
      condition: new Prop({
        type: 'Checkbox',
        name: 'some',
        children: ['name'],
      }),
      whenTrue: 2,
      whenFalse: 2,
    })
    expectTypeOf(case4).toMatchTypeOf<Prop<'Number'>>()
    expect(case4).toHaveProperty('type', 'Number')
  })

  test('.if wrong overloads', () => {
    // @ts-expect-error
    f.if(new Prop({ type: 'Text', name: 'some', children: ['name'] }), 2, 2)

    f.if({
      // @ts-expect-error
      condition: new Prop({ type: 'Text', name: 'some', children: ['name'] }),
      // @ts-expect-error
      whenTrue: 2,
      // @ts-expect-error
      whenFalse: 2,
    })

    f.if({
      // @ts-expect-error
      condition: new Prop({
        type: 'Text',
        name: 'some',
        children: ['name'],
      }),
      whenTrue: '2',
      whenFalse: '2',
    })

    // @ts-expect-error
    f.if(new Prop({ type: 'Checkbox', name: 'some', children: ['name'] }), 2)

    // @ts-expect-error
    f.if(
      new Prop({ type: 'Checkbox', name: 'some', children: ['name'] }),
      new Prop({ type: 'Number', name: 'some', children: ['name'] })
    )

    f.if({
      condition: new Prop({
        type: 'Checkbox',
        name: 'some',
        children: ['name'],
      }),
      // @ts-expect-error
      whenTrue: 2,
    })

    // @ts-expect-error
    f.if({
      condition: new Prop({
        type: 'Checkbox',
        name: 'some',
        children: ['name'],
      }),
      whenTrue: '2',
    })

    f.if({
      condition: new Prop({
        type: 'Checkbox',
        name: 'some',
        children: ['name'],
      }),
      whenTrue: '2',
      // @ts-expect-error
      whenFalse: 3,
    })

    expect(() =>
      // @ts-expect-error
      f.if(new Prop({ type: 'Checkbox', name: 'some', children: ['name'] }))
    ).toThrowError()

    // @ts-expect-error
    expect(() => f.if({})).toThrowError()

    expect(() =>
      // @ts-expect-error
      f.if({
        condition: new Prop({
          type: 'Checkbox',
          name: 'some',
          children: ['name'],
        }),
      })
    ).toThrowError()

    f.if(
      true,
      // @ts-expect-error
      new Prop({ type: 'Number', name: 'some', children: ['name'] }),
      new Prop({ type: 'Text', name: 'some', children: ['name'] })
    )

    f.if(
      true,
      // @ts-expect-error
      new Prop({ type: 'Number', name: 'some', children: ['name'] }),
      '2'
    )

    // @ts-expect-error
    f.if(true, 2, new Prop({ type: 'Text', name: 'some', children: ['name'] }))

    // @ts-expect-error
    f.if(true, 2, '2')

    f.if(
      new Prop({ type: 'Checkbox', name: 'some', children: ['name'] }),
      // @ts-expect-error
      new Prop({ type: 'Number', name: 'some', children: ['name'] }),
      new Prop({ type: 'Text', name: 'some', children: ['name'] })
    )

    f.if(
      new Prop({ type: 'Checkbox', name: 'some', children: ['name'] }),
      // @ts-expect-error
      new Prop({ type: 'Number', name: 'some', children: ['name'] }),
      '2'
    )

    f.if(
      new Prop({ type: 'Checkbox', name: 'some', children: ['name'] }),
      // @ts-expect-error
      2,
      new Prop({ type: 'Text', name: 'some', children: ['name'] })
    )

    f.if(
      new Prop({ type: 'Checkbox', name: 'some', children: ['name'] }),
      // @ts-expect-error
      2,
      '2'
    )

    f.if({
      condition: true,
      // @ts-expect-error
      whenTrue: new Prop({ type: 'Number', name: 'some', children: ['name'] }),
      whenFalse: new Prop({ type: 'Text', name: 'some', children: ['name'] }),
    })

    f.if({
      condition: true,
      // @ts-expect-error
      whenTrue: new Prop({ type: 'Number', name: 'some', children: ['name'] }),
      whenFalse: '2',
    })

    f.if({
      condition: true,
      // @ts-expect-error
      whenTrue: 2,
      whenFalse: new Prop({ type: 'Text', name: 'some', children: ['name'] }),
    })

    // @ts-expect-error
    f.if({ condition: true, whenTrue: 2, whenFalse: '2' })

    f.if({
      condition: new Prop({
        type: 'Checkbox',
        name: 'some',
        children: ['name'],
      }),
      // @ts-expect-error
      whenTrue: new Prop({ type: 'Number', name: 'some', children: ['name'] }),
      whenFalse: new Prop({ type: 'Text', name: 'some', children: ['name'] }),
    })

    f.if({
      condition: new Prop({
        type: 'Checkbox',
        name: 'some',
        children: ['name'],
      }),
      // @ts-expect-error
      whenTrue: new Prop({ type: 'Number', name: 'some', children: ['name'] }),
      whenFalse: '2',
    })

    f.if({
      condition: new Prop({
        type: 'Checkbox',
        name: 'some',
        children: ['name'],
      }),
      // @ts-expect-error
      whenTrue: 2,
      whenFalse: new Prop({ type: 'Text', name: 'some', children: ['name'] }),
    })

    f.if({
      condition: new Prop({
        type: 'Checkbox',
        name: 'some',
        children: ['name'],
      }),
      // @ts-expect-error
      whenTrue: 2,
      whenFalse: '2',
    })
  })
})
