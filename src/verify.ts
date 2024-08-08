import { ALGORITHM, SALT_LENGTH, ITERATIONS, DIGEST, KEY_LENGTH } from './constants';
import { subtle } from 'uncrypto';
import { timingSafeEqual } from './timing';
import { hexToUint8Array } from './helpers';

export async function verify(input: string, hash: string): Promise<boolean> {
  const encoder = new TextEncoder()
  const storedHash = hexToUint8Array(hash)
  const salt = storedHash.slice(0, SALT_LENGTH)
  const storedKey = storedHash.slice(SALT_LENGTH)
  const passwordBuffer = encoder.encode(input)

  const key = await subtle.importKey(
    'raw',
    passwordBuffer,
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

  const newKey = new Uint8Array(derivedKey)
  return timingSafeEqual(newKey, storedKey)
}
