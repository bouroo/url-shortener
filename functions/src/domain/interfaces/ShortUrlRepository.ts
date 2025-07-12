import { ShortUrl } from '../entities/ShortUrl'

export interface ShortUrlRepository {
  save(shortUrl: ShortUrl): Promise<void>
  findById(id: string): Promise<ShortUrl | null>
}