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
})
