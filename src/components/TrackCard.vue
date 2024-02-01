<template>
  <div class="flex border p-4">
    <div>
      <h1>{{ name }}</h1>
      <h2>
        <NuxtLink :href="url" class="text-blue-600 underline" target="_blank">
          Listen
        </NuxtLink>
      </h2>
      <h2>{{ artists }}</h2>
    </div>
    <div>
      <!-- imageUrls[1] is height == width == 300
          todo: do something better
      -->
      <NuxtImg
        :src="imageUrls[1].url"
        :height="imageUrls[1].height"
        :width="imageUrls[1].width"
        :placeholder="[imageUrls[1].width, imageUrls[1].height, 75, 5]"
        class="min-w-10"
        loading="lazy"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Image } from '@spotify/web-api-ts-sdk'

defineProps<{
  name: string
  url: string
  artists: string[]
  imageUrls: Image[]
}>()
</script>
