import { ShortUrlRepository } from '../interfaces/ShortUrlRepository'

export class GetOriginalUrl {
  constructor(private readonly repository: ShortUrlRepository) {}

  async execute(id: string): Promise<string | null> {
    const shortUrl = await this.repository.findById(id)
    return shortUrl ? shortUrl.originalUrl : null
  }
}