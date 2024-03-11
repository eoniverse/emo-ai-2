import type { HfInference } from '@huggingface/inference'

export interface RobertaScore {
  happy: number
  sad: number
  chill: number
}

export interface RobertaSentiment {
  label: string
  score: number
}

function convertToRobertaSentimentScore(
  input: RobertaSentiment[]
): RobertaScore {
  return input.reduce(
    (result, item) => {
      switch (item.label) {
        case 'LABEL_0':
          result.sad = item.score
          break
        case 'LABEL_1':
          result.chill = item.score
          break
        case 'LABEL_2':
          result.happy = item.score
          break
      }
      return result
    },
    { happy: 0, sad: 0, chill: 0 }
  )
}

export default async (hf: HfInference, text: string) => {
  const robertaRawSentimentScores = (await hf.textClassification({
    inputs: text,
    model: 'cardiffnlp/twitter-roberta-base-sentiment',
  })) satisfies RobertaSentiment[]
  const sentimentScores = convertToRobertaSentimentScore(
    robertaRawSentimentScores
  )
  return sentimentScores
}
