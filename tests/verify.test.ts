import { describe, expect, it } from 'bun:test'
import { verify, hash } from '../src/index'

const password = 'password'

describe('verify', () => {
  it('verifies empty strings', async () => {
    const hashedPassword = await hash('')
    expect(verify('', hashedPassword)).resolves.toBe(true)
  })

  it('verifies separate instances of the same password', async () => {
    const hashedPassword = await hash(password)
    const hashedPassword2 = await hash(password)
    expect(verify('password', hashedPassword)).resolves.toBe(true)
    expect(verify('password', hashedPassword2)).resolves.toBe(true)
  })

  it('returns true if password is correct', async () => {
    const hashedPassword = await hash(password)
    expect(verify(password, hashedPassword)).resolves.toBe(true)
  })

  it('returns false if password is incorrect', async () => {
    const hashedPassword = await hash(password)
    expect(verify('wrong-password', hashedPassword)).resolves.toBe(false)
  })
})

