import { Context } from 'hono'
import { GetOriginalUrl } from '../domain/usecases/GetOriginalUrl'

export const RedirectController = (useCase: GetOriginalUrl) => async (c: Context) => {
  const id = c.req.param('id')
  const original = await useCase.execute(id)

  if (!original) {
    return c.text('Not Found', 404)
  }

  return c.redirect(original)
}