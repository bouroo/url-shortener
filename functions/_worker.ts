import { Hono } from 'hono'
import { CreateShortUrlController } from './src/controllers/CreateShortUrlController'
import { RedirectController } from './src/controllers/RedirectController'
import { KVShortUrlRepository } from './src/infra/KVShortUrlRepository'
import { CreateShortUrl } from './src/domain/usecases/CreateShortUrl'
import { GetOriginalUrl } from './src/domain/usecases/GetOriginalUrl'
import { generateId } from './src/infra/IdGenerator'

const app = new Hono<{ Bindings: { URLS: KVNamespace; TURNSTILE_SECRET: string } }>()

app.get('/api', (c) => c.text('URL Shortener API is running'))

app.post('/api/shorten', (c) => {
  const repository = new KVShortUrlRepository(c.env.URLS)
  const createUseCase = new CreateShortUrl(repository, generateId)
  return CreateShortUrlController(createUseCase)(c)
})

app.get('/:id', (c) => {
  const repository = new KVShortUrlRepository(c.env.URLS)
  const getUseCase = new GetOriginalUrl(repository)
  return RedirectController(getUseCase)(c)
})

export default app