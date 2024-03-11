<template>
  <div class="flex flex-col">
    <div class="flex">
      <input
        type="text"
        v-model="sentiment"
        placeholder="Enter your feelings..."
      />
      <button type="button" @click="execute()">Search</button>
    </div>
    <div class="grid grid-cols-3" v-if="data && !pending">
      <div>
        <TrackCard
          v-for="s in data.sentimentRecommendations"
          :image-urls="s.images"
          :url="s.url"
          :key="s.id"
          :name="s.name"
          :artists="s.author.map((a) => a.name)"
        />
      </div>
      <div>
        <TrackCard
          v-for="s in data.songsFromPlaylist"
          :image-urls="s.images"
          :url="s.url"
          :key="s.id"
          :name="s.name"
          :artists="s.author.map((a) => a.name)"
        />
      </div>
      <div>
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
