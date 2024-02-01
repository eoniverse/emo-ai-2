import { SpotifyApi } from '@spotify/web-api-ts-sdk'
import type { H3Event, EventHandlerRequest } from 'h3'

type SpotifyAPI = ReturnType<typeof getSpotify>

function getSpotify(event: H3Event<EventHandlerRequest>) {
  const config = useRuntimeConfig(event)
  return SpotifyApi.withClientCredentials(
    config.spotifyClientId,
    config.spotifyClientSecret
  )
}

let spotify: SpotifyAPI

declare module 'h3' {
  interface H3EventContext {
    spotify: SpotifyAPI
  }
}

export default defineEventHandler((event) => {
  if (!spotify) {
    spotify = getSpotify(event)
  }
  event.context.spotify = spotify
})
