import { createExecutionContext, waitOnExecutionContext } from "cloudflare:test"
import { describe, it, expect } from "vitest"
import worker from './fixtures/cfworker.ts'
import { verify } from '../src/verify'

describe("CloudFlare Workers", () => {
  it("should hash and verify passwords", async () => {
    const request = new Request("http://localhost:8787/")
    const context = createExecutionContext()
    const response = await worker.fetch(request)
    await waitOnExecutionContext(context)
    const output: any = await response.json()
    expect(output.hashed).toHaveLength(96)
    expect(output.verified).toBe(true)
    expect(output.userAgent).toBe("Cloudflare-Workers")
  })

  it("hashes and verifies across runtimes", async () => {
    const request = new Request("http://localhost:8787/")
    const context = createExecutionContext()
    const response = await worker.fetch(request)
    await waitOnExecutionContext(context)
    const output: any = await response.json()
    expect(output.hashed).toHaveLength(96)
    expect(output.verified).toBe(true)
    expect(output.userAgent).toBe("Cloudflare-Workers")
    const localVerify = await verify("hello world", output.hashed)
    expect(localVerify).toBe(true)
  })
})

