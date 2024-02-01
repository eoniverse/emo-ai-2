export default async (
  sentiment: Ref<string>,
  includePopularity: Ref<boolean>,
  popularity: Ref<number>,
  limit: Ref<number> | undefined = undefined
) => {
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
