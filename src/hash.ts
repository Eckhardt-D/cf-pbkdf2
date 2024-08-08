import { subtle, getRandomValues } from 'uncrypto'
import { bufferToHex } from './helpers'
import { ALGORITHM, DIGEST, KEY_LENGTH, ITERATIONS, SALT_LENGTH } from './constants'

export async function hash(input: string): Promise<string> {
  if (typeof input !== 'string') {
    throw new Error('input must be a string')
  }

  const encoder = new TextEncoder()
  const salt = getRandomValues(new Uint8Array(SALT_LENGTH))
  const inputBuffer = encoder.encode(input)

  const key = await subtle.importKey(
    'raw',
    inputBuffer,
    { name: ALGORITHM },
    false,
    ['deriveBits'],
  )

  const derivedKey = await subtle.deriveBits(
    {
      name: ALGORITHM,
      salt,
      iterations: ITERATIONS,
      hash: DIGEST,
    },
    key,
    KEY_LENGTH * 8, // in bits
  )

  const result = new Uint8Array(SALT_LENGTH + KEY_LENGTH)
  result.set(salt)
  result.set(new Uint8Array(derivedKey), SALT_LENGTH)
  return bufferToHex(result)
}
