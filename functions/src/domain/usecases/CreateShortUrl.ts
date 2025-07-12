import { ShortUrl } from '../entities/ShortUrl'
import { ShortUrlRepository } from '../interfaces/ShortUrlRepository'

export class CreateShortUrl {
  constructor(
    private readonly repository: ShortUrlRepository,
    private readonly generateId: () => string
  ) {}

  async execute(originalUrl: string): Promise<string> {
    const id = this.generateId()
    const shortUrl = new ShortUrl(id, originalUrl)
    await this.repository.save(shortUrl)
    return id
  }
}