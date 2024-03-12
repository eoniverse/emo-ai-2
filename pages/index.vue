<template>
  <div class="flex flex-col gap-4 px-2 pt-4 pb-4 w-full">
    <div class="mx-auto flex w-full max-w-md flex-col gap-4">
      <div class="flex items-center gap-1.5">
        <Input id="text" placeholder="How do you feel" v-model="sentiment" />
        <Button type="submit" @click="execute()">Search</Button>
      </div>
      <div class="flex flex-col gap-2">
        <div class="flex items-center space-x-2">
          <Switch
            id="use-popularity"
            :checked="usePopularity"
            @update:checked="togglePopularity"
          />
          <Label for="use-popularity">Use popularity</Label>
        </div>
        <div class="flex gap-4" v-if="usePopularity">
          <Slider v-model="popularity" />
          <Input
            type="number"
            v-model="popularityValue"
            min="0"
            max="100"
            class="w-16"
          >
            {{ popularityValue }}
          </Input>
        </div>
      </div>
    </div>

    <div
      class="grid gap-4"
      :class="{ 'grid-cols-2': !usePopularity, 'grid-cols-3': usePopularity }"
      v-if="data && !pending"
    >
      <div class="flex flex-col gap-4">
        <TrackCard
          v-for="s in data.sentimentRecommendations"
          :image-urls="s.images"
          :url="s.url"
          :key="s.id"
          :name="s.name"
          :artists="s.author.map((a) => a.name)"
        />
      </div>
      <div class="flex flex-col gap-4">
        <TrackCard
          v-for="s in data.songsFromPlaylist"
          :image-urls="s.images"
          :url="s.url"
          :key="s.id"
          :name="s.name"
          :artists="s.author.map((a) => a.name)"
        />
      </div>
      <div class="flex flex-col gap-4" v-if="usePopularity">
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
    <div v-else-if="status === 'pending' && pending" class="mx-auto">
      Loading. Please wait...
    </div>
  </div>
</template>

<script setup lang="ts">
const sentiment = ref('')
const usePopularity = ref(true)
const popularity = ref([20])
const limit = ref(5)

// with getter and setter
const popularityValue = computed({
  get: () => popularity.value[0],
  set: (value) => {
    popularity.value = [value]
  },
})

function togglePopularity() {
  usePopularity.value = !usePopularity.value
}

const { data, execute, pending, status } = await useSentiment({
  sentiment,
  includePopularity: usePopularity,
  popularity: popularityValue,
  limit,
})
</script>
