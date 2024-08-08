import type { SubtleCrypto } from '@cloudflare/workers-types/experimental';
import { subtle } from 'uncrypto';

export async function timingSafeEqual(a: Uint8Array, b: Uint8Array): Promise<boolean> {
  if (globalThis.navigator?.userAgent === 'Cloudflare Workers') {
    return (subtle as unknown as SubtleCrypto).timingSafeEqual(a, b)
  }

  if (globalThis.process?.release?.name === 'node') {
    return await import('crypto').then(({ timingSafeEqual }) => timingSafeEqual(a, b))
  }

  // Browser does not have timingSafeEqual
  if (globalThis.crypto) {
    const aHex = Array.from(a).map((byte) => byte.toString(16).padStart(2, '0')).join('')
    const bHex = Array.from(b).map((byte) => byte.toString(16).padStart(2, '0')).join('')
    return aHex === bHex
  }

  throw new Error('timingSafeEqual is not available in this environment, could not verify hash')
}
