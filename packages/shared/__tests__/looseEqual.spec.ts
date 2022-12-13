import { looseEqual } from '../src/looseEqual'

describe('utils/looseEqual', () => {
  test('compares booleans correctly', () => {
    expect(looseEqual(true, true)).toBe(true)
    expect(looseEqual(false, false)).toBe(true)
    expect(looseEqual(true, false)).toBe(false)
    expect(looseEqual(true, 1)).toBe(false)
    expect(looseEqual(false, 0)).toBe(false)
  })
})
