<template>
  <div class="flex flex-col px-2 pt-4 gap-4">
    <div class="flex w-full max-w-sm items-center gap-1.5 mx-auto">
      <Input id="text" placeholder="How do you feel" v-model="sentiment" />
      <Button type="submit" @click="execute()">Search</Button>
    </div>

    <div class="grid grid-cols-3 gap-4" v-if="data && !pending">
      <div class="grid grid-cols-1 gap-4">
        <TrackCard
          v-for="s in data.sentimentRecommendations"
          :image-urls="s.images"
          :url="s.url"
          :key="s.id"
          :name="s.name"
          :artists="s.author.map((a) => a.name)"
        />
      </div>
      <div class="grid grid-cols-1 gap-4">
        <TrackCard
          v-for="s in data.songsFromPlaylist"
          :image-urls="s.images"
          :url="s.url"
          :key="s.id"
          :name="s.name"
          :artists="s.author.map((a) => a.name)"
        />
      </div>
      <div class="grid gap-4">
        <TrackCard
          v-for="s in data.targetedPopularityRecommendations"
          :image-urls="s.images"
          :url="s.url"
          :key="s.id"
          :name="s.name"
          :artists="s.author.map((a) => a.name)"
        />
      </div>
    </div>
    <div v-else-if="status === 'pending' && pending">Loading. Please wait.</div>
  </div>
</template>

<script setup lang="ts">
const sentiment = ref('')
const usePopularity = ref(true)
const popularity = ref(20)
const limit = ref(5)

const { data, execute, pending, status } = await useSentiment(
  sentiment,
  usePopularity,
  popularity,
  limit
)
</script>
