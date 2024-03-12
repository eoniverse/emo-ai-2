import type { SpotifyApi } from '@spotify/web-api-ts-sdk'

export default async (spotify: SpotifyApi, searchTerm: string, limit = 10) => {
  const playlist = await getSpotifySearch(spotify, searchTerm, 'playlist')
  const playlistId = playlist.playlists.items.at(0)?.id
  if (!playlistId) {
    return undefined
  }
  const playlistTracks = (
    await spotify.playlists.getPlaylistItems(
      playlistId,
      undefined,
      undefined,
      limit as any,
    )
  ).items
  if (!playlistTracks.length) {
    return undefined
  }
  return playlistTracks.map((t) => t.track)
}
