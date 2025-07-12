import { Hono } from 'hono'
import { RedirectController } from './controllers/RedirectController'
import { KVShortUrlRepository } from './infra/KVShortUrlRepository'
import { GetOriginalUrl } from './domain/usecases/GetOriginalUrl'
import { CreateShortUrlController } from './controllers/CreateShortUrlController'
import { CreateShortUrl } from './domain/usecases/CreateShortUrl'
import { generateId } from './infra/IdGenerator'
import { cors } from 'hono/cors'

const app = new Hono<{ Bindings: { URLS: KVNamespace } }>()

app.use('/*', cors({
  origin: '*',
  allowHeaders: ['Content-Type'],
  allowMethods: ['POST', 'GET'],
  maxAge: 86400,
}))

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