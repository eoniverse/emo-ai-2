import type { SpotifyApi, ItemTypes } from '@spotify/web-api-ts-sdk'

export default async (
  spotify: SpotifyApi,
  searchTerm: string,
  searchType: ItemTypes,
  limit = 1
) => {
  return await spotify.search(
    searchTerm,
    [searchType],
    undefined, // market
    limit as any,
    undefined
  )
}
