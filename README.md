# CloudFlare safe PBKDF2 hashing

Hash a password on CloudFlare Workers using PBKDF2 with a salt and a work factor of 100,000 iterations.
Works with Node.js and Bun too. It generates a 96 char padded hex string and uses SHA-256 for the digest.

## Installation

```bash
bun add @eckidevs/cf-pbkdf2 # or npm, pnpm etc.
```

## Usage

```typescript
import { hash, verify } from '@eckidevs/cf-pbkdf2';
const hashedPassword = await hash('password');

if (await verify('password', hashedPassword)) {
  console.log('Password is correct');
} else {
  console.log('Password is incorrect');
}
```

## CJS Usage

```javascript
const { hash, verify } = require('@eckidevs/cf-pbkdf2');
hash('password').then(hashedPassword => {
  verify('password', hashedPassword).then(isCorrect => {
    if (isCorrect) {
      console.log('Password is correct');
    } else {
      console.log('Password is incorrect');
    }
  });
});
```

