import {
  object,
  string,
  boolean,
  number,
  maxLength,
  optional,
  maxValue,
  minValue,
  parse,
} from 'valibot'

const schema = object({
  sentiment: string([maxLength(500)]),
  includePopularityBasedTracks: optional(boolean(), false),
  popularity: optional(number([maxValue(100), minValue(0)]), 80),
  limit: optional(number([maxValue(50), minValue(0)]), 20),
})

export default defineEventHandler(async (event) => {
  const hf = event.context.hf
  const spotify = event.context.spotify
  const body = await readValidatedBody(event, (d) => parse(schema, d))
  const detectedSentiment = await getDetectedSentiment(hf, body.sentiment)

  // run all promises together 🚀
  const [
    targetedPopularityRecommendations,
    sentimentRecommendations,
    songsFromPlaylist,
  ] = await Promise.all([
    body.includePopularityBasedTracks
      ? getSpotifyRecommendedTracks(spotify, detectedSentiment, body.popularity, body.limit)
      : undefined,
    getSpotifyRecommendedTracks(spotify, detectedSentiment, undefined, body.limit),
    getSpotifySongsFromSearchPlaylist(spotify, body.sentiment, body.limit),
  ])

  return {
    sentimentRecommendations:
      sentimentRecommendations?.map(transformTrack) ?? null,
    songsFromPlaylist: songsFromPlaylist?.map(transformTrack) ?? null,
    targetedPopularityRecommendations:
      targetedPopularityRecommendations?.map(transformTrack) ?? null,
  }
})
