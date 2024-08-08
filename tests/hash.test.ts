import { hash } from '../src/hash'
import { describe, expect, it } from 'bun:test'

describe('hash', () => {
  it('throws if input is not a string', async () => {
    expect(hash(123 as any)).rejects.toThrow('input must be a string')
    expect(hash({} as any)).rejects.toThrow()
    expect(hash([] as any)).rejects.toThrow()
    expect(hash(null as any)).rejects.toThrow()
    expect(hash(undefined as any)).rejects.toThrow()
  })

  it('hashes an empty string', async () => {
    const hashed = await hash('')
    const hashed2 = await hash('')
    expect(hashed).toHaveLength(96)
    expect(hashed2).toHaveLength(96)
    expect(hashed).not.toEqual(hashed2)
  })

  it('hashes a non-empty string', async () => {
    const hashed = await hash('hello')
    const hashed2 = await hash('hello')
    expect(hashed).toHaveLength(96)
    expect(hashed2).toHaveLength(96)
    expect(hashed).not.toEqual(hashed2)
  })
})

