interface Options {
  sentiment: Ref<string>
  includePopularity: Ref<boolean>
  popularity: Ref<number>
  limit?: Ref<number>
}

export default async (options: Options) => {
  const { sentiment, includePopularity, popularity, limit } = options
  const { data, error, pending, execute, status } = await useLazyFetch(
    '/api/sentiment',
    {
      method: 'POST',
      body: {
        sentiment,
        includePopularityBasedTracks: includePopularity,
        popularity,
        limit,
      },
      server: false,
      // prevent fetch from executing whenever `sentiment` changes
      immediate: false,
      watch: false,
    }
  )
  return { data, error, pending, execute, status } as const
}
