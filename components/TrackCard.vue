<template>
  <Card
    key="1"
    class="mx-auto w-full max-w-sm overflow-hidden rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl "
  >
    <div class="relative">
      <NuxtImg
        alt="Profile picture"
        class="h-64 w-full object-cover"
        :src="imageUrls[0].url"
      />
    </div>
    <CardContent class="p-4">
      <h2
        class="transition-all duration-200 hover:text-gray-700"
      >
        {{ name }}
      </h2>
      <h3 class="text-gray-500 transition-all duration-200 hover:text-gray-600">
        {{ artists.join(', ') }}
      </h3>
      <div class="mt-4 flex space-x-2">
        <Button
          class="w-full transition-all duration-200 hover:bg-gray-700 hover:text-white"
          size="sm"
          @click="openLink(url)"
        >
          Listen
        </Button>
        <Button
          class="w-full transition-all duration-200 hover:bg-gray-700 hover:text-white"
          size="sm"
          variant="secondary"
          @click="copy(url)"
        >
          <span v-if="!copied" class="flex gap-2">
            <Copy class="h-4 w-4" />
            Copy Spotify Link
          </span>
          <span v-else class="flex gap-2">
            <Check class="h-4 w-4" />
            Copied!
          </span>
        </Button>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import type { Image } from '@spotify/web-api-ts-sdk'
import { Copy, Check } from 'lucide-vue-next'

const props = defineProps<{
  name: string
  url: string
  artists: string[]
  imageUrls: Image[]
}>()

async function openLink(spotifyUrl: string) {
  await navigateTo(spotifyUrl, {
    open: {
      target: '_blank',
    },
  })
}

const { copy, copied } = useClipboard({ source: props.url, legacy: true })
</script>
