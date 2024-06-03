<template>

  <div class="flex flex-col gap-4 px-2 pt-4 pb-4 w-full h-full ">


    <div class="h-auto w-4/3 ml-48 mr-4 my-2 py-8 px-8 rounded-md bg-cover bg-fixed bg-[50%] bg-no-repeat bg-[url(/media/pic4.jpg)] text-white">
      <div class="h-auto w-full py-8 px-8 font-[Impact] backdrop-blur-xl bg-[linear-gradient(_rgba(12,3,51,0.726),rgba(12,3,51,0.253)_)] ">
          <div class="hear-what-you-feel-wrapper">
            <div class="hear-what-you-container">
              <span class="text-8xl">Hear </span>
              <span class="text-6xl">what you </span>
              <span class="text-8xl">Feel .</span>
            </div>
          </div>
          <div class="let-us-decide-the-music-for-yo-wrapper">
            <h1 class="let-us-decide-container">
              <p class="let-us-decide-the">
                <span class="text-6xl">Let Your </span>
                <span class="text-8xl">Emotion </span>
              </p>
              <p class="music-for-you">
                <span class="text-6xl">Decide The </span>
                <span class="text-8xl">Music </span>
                <span class="text-6xl">For You </span>
              </p>
            </h1>
          </div>
        </div>

    <div class="h-auto w-full flex flex-col justify-between py-5 px-5 gap-4 backdrop-blur-md rounded-md">
      <div class="flex items-center gap-4">
        <Input class="h-16 text-2xl"id="text" placeholder="Write A Statement" v-model="sentiment" />
        <Button class="h-16 w-32 transition duration-300 ease-in-out hover:scale-75" type="submit" @click="execute()">Search</Button>
      </div>
      <div class="flex flex-col gap-2">
        <div class="flex items-center space-x-2">
          <Switch
            id="use-popularity"
            :checked="usePopularity"
            @update:checked="togglePopularity"
          />
          <Label class="font-bold text-black" for="use-popularity">Target popularity</Label>
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
  </div>
    <div class="h-16 w-4/5 backdrop-blur-sm border border-white -skew-x-12 self-center"></div>
    <div
      class="grid gap-4 font-[Impact]"
      :class="{ 'grid-cols-2': !usePopularity, 'grid-cols-3': usePopularity }"
      v-if="data && !pending"
    >
      <div class="flex flex-col gap-4">
        <h1 class="text-2xl text-center text-white">SENTIMENTAL RECOMMENDATIONS</h1>
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
        <h1 class="text-2xl text-center text-white">SIMILAR RECOMMENDATIONS</h1>
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
        <h1 class="text-2xl text-center text-white">TARGETED POPULARITY</h1>
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
    
    <div v-else-if="status === 'pending' && pending" class="mx-auto text-2xl text-center text-white backdrop-blur-xl bg-[linear-gradient(_rgba(12,3,51,0.726),rgba(12,3,51,0.253)_)]">
      Loading. Please wait...
    </div>
    <div class="h-16 w-4/5 backdrop-blur-sm border border-white -skew-x-12 self-center"></div>
  </div>
 
</template>
<style>
.tix{
  -webkit-text-stroke: 1px #fff;
}
</style>
<script setup lang="ts">
const sentiment = ref('')
const usePopularity = ref(false)
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
