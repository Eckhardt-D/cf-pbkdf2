export function hexToUint8Array(hex: string): Uint8Array {
  const match = hex.match(/.{1,2}/g)
  if (!match) { throw new Error('Invalid hex string') }
  return new Uint8Array(match.map(byte => parseInt(byte, 16)))
}

export function bufferToHex(buffer: Uint8Array): string {
  return Array.prototype.map.call(
    buffer,
    (byte: number) => byte.toString(16).padStart(2, '0')
  ).join('')
}
