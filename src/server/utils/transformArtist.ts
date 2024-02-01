import type { SimplifiedArtist } from '@spotify/web-api-ts-sdk'

export default (artist: SimplifiedArtist) => {
  return {
    name: artist.name,
    id: artist.id,
  }
}
