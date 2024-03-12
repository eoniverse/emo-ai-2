import type { Track } from '@spotify/web-api-ts-sdk'

export default (track: Track) => {
  return {
    name: track.name,
    author: track.artists.map(transformArtist),
    url: track.external_urls.spotify,
    images: track.album.images,
    id: track.id,
  }
}
