import type { HfInference } from '@huggingface/inference'

export default async (hf: HfInference, sentiment: string) => {
  const sentimentScores = await getSentimentScoresFromText(hf, sentiment)
  return findMaxAttribute({ ...sentimentScores })[0]
}
