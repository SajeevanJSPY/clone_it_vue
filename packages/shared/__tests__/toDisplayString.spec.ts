/**
 * @jest-environment jsdom
 */

import { toDisplayString } from '../src/toDisplayString'

describe('toDisplayString', () => {
  test('nullish values', () => {
    expect(toDisplayString(null)).toBe('')
    expect(toDisplayString(undefined)).toBe('')
  })

  test('primitive values', () => {
    expect(toDisplayString(1)).toBe('1')
    expect(toDisplayString(true)).toBe('true')
    expect(toDisplayString(false)).toBe('false')
    expect(toDisplayString('hello')).toBe('hello')
  })

  test('Object and Arrays', () => {
    const obj = { foo: 123 }
    expect(toDisplayString(obj)).toBe(JSON.stringify(obj, null, 2))
    const arr = [obj]
    expect(toDisplayString(arr)).toBe(JSON.stringify(arr, null, 2))
  })

  test('native objects', () => {
    const div = document.createElement('div')
    expect(toDisplayString(div)).toBe(`"[object HTMLDivElement]"`)
    // expect(toDisplayString({ div })).toMatchInlineSnapshot(`
    //     {
    //     "div": "[object HTMLDivElement]"
    //     }
    // `)
  })
})
