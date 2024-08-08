import { verify, hash } from '../../src'

export default {
  async fetch(_request: Request) {
    const hashed = await hash('hello world')
    const verified = await verify('hello world', hashed)
    const userAgent = globalThis.navigator?.userAgent 
    return new Response(JSON.stringify({ hashed, verified, userAgent }), {
      headers: { 'content-type': 'application/json' },
    })
  }
}
