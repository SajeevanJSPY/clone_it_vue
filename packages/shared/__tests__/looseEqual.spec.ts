import { looseEqual } from '../src/looseEqual'

describe('utils/looseEqual', () => {
  test('compares booleans correctly', () => {
    expect(looseEqual(true, true)).toBe(true)
    expect(looseEqual(false, false)).toBe(true)
    expect(looseEqual(true, false)).toBe(false)
    expect(looseEqual(true, 1)).toBe(false)
    expect(looseEqual(false, 0)).toBe(false)
  })

  test('compares strings correctly', () => {
    const text = 'Lorem ipsum'
    const number = 1
    const bool = true

    expect(looseEqual(text, text)).toBe(true)
    expect(looseEqual(text, text.slice(0, -1))).toBe(false)
    expect(looseEqual(String(number), number)).toBe(true)
    expect(looseEqual(String(bool), bool)).toBe(true)
  })

  test('compares numbers correctly', () => {
    const integer = 100
    const decimal = 2.5
    const multiplier = 1.0000001

    expect(looseEqual(integer, integer)).toBe(true)
    expect(looseEqual(integer, integer - 1)).toBe(false)
    expect(looseEqual(decimal, decimal)).toBe(true)
    expect(looseEqual(decimal, decimal * multiplier)).toBe(false)
    expect(looseEqual(integer, integer * decimal)).toBe(false)
    expect(looseEqual(multiplier, multiplier)).toBe(true)
  })

  test('compares dates correctly', () => {
    const date1 = new Date(2019, 1, 2, 3, 4, 5, 6)
    const date2 = new Date(2019, 1, 2, 3, 4, 5, 6)
    const date3 = new Date(2019, 1, 2, 3, 4, 5, 7)
    const date4 = new Date(2219, 1, 2, 3, 4, 5, 6)

    // Identical date object references
    expect(looseEqual(date1, date1)).toBe(true)
    // Different date references with identical values
    expect(looseEqual(date1, date2)).toBe(true)
    // Dates with slightly different time (ms)
    expect(looseEqual(date1, date3)).toBe(false)
    // Dates with different years
    expect(looseEqual(date1, date4)).toBe(false)
  })
})
