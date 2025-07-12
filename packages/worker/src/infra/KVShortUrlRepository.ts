import { ShortUrl } from '../domain/entities/ShortUrl'
import { ShortUrlRepository } from '../domain/interfaces/ShortUrlRepository'

export class KVShortUrlRepository implements ShortUrlRepository {
  constructor(private readonly kv: KVNamespace) {}

  async save(shortUrl: ShortUrl): Promise<void> {
    await this.kv.put(shortUrl.id, shortUrl.originalUrl)
  }

  async findById(id: string): Promise<ShortUrl | null> {
    const originalUrl = await this.kv.get(id)
    return originalUrl ? new ShortUrl(id, originalUrl) : null
  }
}