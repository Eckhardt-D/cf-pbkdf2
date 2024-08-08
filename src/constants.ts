export const ALGORITHM = 'PBKDF2';
export const DIGEST = 'SHA-256';
export const ITERATIONS = 100000; // Safe for CF Workers
export const KEY_LENGTH = 32; // 256 bits
export const SALT_LENGTH = 16; // 128 bits
