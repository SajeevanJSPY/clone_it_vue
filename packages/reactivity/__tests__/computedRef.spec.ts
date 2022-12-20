import { computed, reactive } from "../src"

describe('reactivity/computed', () => {
    it('should return updated value', () => {
        const value = reactive<{ foo?: number }>({})
        const cValue = computed(() => value.foo)
        expect(cValue.value).toBeUndefined()
        value.foo = 1
        expect(cValue.value).toBe(1)
    })
})