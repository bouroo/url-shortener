import { Context } from 'hono'
import { CreateShortUrl } from '../domain/usecases/CreateShortUrl'
import { z } from 'zod'

export const CreateShortUrlController = (useCase: CreateShortUrl) => async (c: Context) => {
  const schema = z.object({
    url: z.string().url(),
    token: z.string().min(1).optional() // Made token optional
  })

  let data: z.infer<typeof schema>

  try {
    data = schema.parse(await c.req.json())
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ errors: error.errors }, 400)
    }
    return c.text('Invalid request data', 400)
  }

  const secret = c.env.TURNSTILE_SECRET
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret,
      response: data.token,
      remoteip: c.req.header('CF-Connecting-IP') || ''
    })
  })

  const result = (await response.json()) as { success: boolean }

  if (!result.success) {
    return c.text('CAPTCHA validation failed', 403)
  }

  const id = await useCase.execute(new URL(data.url).toString())
  return c.json({ id })
}