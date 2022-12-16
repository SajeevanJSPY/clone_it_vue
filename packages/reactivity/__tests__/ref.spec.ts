import { ref } from '../src/index'
import "@vue/shared"

describe('reactivity/ref', () => {
  test('should hold a value', () => {
    const a = ref(1)
    expect(a.value).toBe(1)
    a.value = 2
    expect(a.value).toBe(2)
  })
})
