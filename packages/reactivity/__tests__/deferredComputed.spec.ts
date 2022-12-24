import { deferredComputed, effect, ref } from '../src'

describe('deferred computed', () => {
  const tick = Promise.resolve()

  test('should only trigger once on multiple mutations', async () => {
    const src = ref(0)
    const c = deferredComputed(() => src.value)
    const spy = jest.fn()
    effect(() => {
      spy(c.value)
    })
    expect(spy).toHaveBeenCalledTimes(1)
    src.value = 1
    src.value = 2
    src.value = 3
    // not called yet
    expect(spy).toHaveBeenCalledTimes(1)
    await tick
    // should only trigger once
    expect(spy).toHaveBeenCalledTimes(2)
    expect(spy).toHaveBeenCalledWith(c.value)
  })

  test('should not trigger if value did not change', async () => {
    const src = ref(0)
    const c = deferredComputed(() => src.value % 2)
    const spy = jest.fn()
    effect(() => {
      spy(c.value)
    })
    expect(spy).toHaveBeenCalledTimes(1)
    src.value = 1
    src.value = 2

    await tick
    // should not trigger
    expect(spy).toHaveBeenCalledTimes(1)

    src.value = 3
    src.value = 4
    src.value = 5
    await tick
    // should trigger because latest value changes
    expect(spy).toHaveBeenCalledTimes(2)
  })

  test('chained computed trigger', async () => {
    const effectSpy = jest.fn()
    const c1Spy = jest.fn()
    const c2Spy = jest.fn()

    const src = ref(0)
    const c1 = deferredComputed(() => {
      c1Spy()
      return src.value % 2
    })
    const c2 = deferredComputed(() => {
      c2Spy()
      return c1.value + 1
    })

    effect(() => {
      effectSpy(c2.value)
    })

    expect(c1Spy).toHaveBeenCalledTimes(1)
    expect(c2Spy).toHaveBeenCalledTimes(1)
    expect(effectSpy).toHaveBeenCalledTimes(1)

    src.value = 1
    await tick
    expect(c1Spy).toHaveBeenCalledTimes(2)
    expect(c2Spy).toHaveBeenCalledTimes(2)
    expect(effectSpy).toHaveBeenCalledTimes(2)
  })
})