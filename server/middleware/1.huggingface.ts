import { HfInference } from '@huggingface/inference'
import type { H3Event, EventHandlerRequest } from 'h3'

type HuggingfaceAPI = ReturnType<typeof getHuggingface>

function getHuggingface(event: H3Event<EventHandlerRequest>) {
  const config = useRuntimeConfig()
  return new HfInference(config.huggingfaceAccessToken)
}

let hf: HuggingfaceAPI

declare module 'h3' {
  interface H3EventContext {
    hf: HuggingfaceAPI
  }
}

export default defineEventHandler((event) => {
  if (!hf) {
    hf = getHuggingface(event)
  }
  event.context.hf = hf
})
