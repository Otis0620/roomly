import { test } from './test'

describe('test', () => {
  it('returns "test"', () => {
    const result = test()

    expect(result).toBe('test')
  })
})
