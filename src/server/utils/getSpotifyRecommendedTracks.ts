import type { SpotifyApi } from '@spotify/web-api-ts-sdk'

export default async (
  spotify: SpotifyApi,
  sentiment: string,
  popularity: number | undefined = undefined,
  limit = 10,
) => {
  const recommendations = await spotify.recommendations.get({
    seed_genres: [sentiment],
    limit,
    target_popularity: popularity,
  })
  const tracks = recommendations.tracks
  if (!tracks.length) {
    return undefined
  }
  return tracks
}
