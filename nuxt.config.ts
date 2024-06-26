// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    'shadcn-nuxt',
    '@vueuse/nuxt',
  ],
  tailwindcss: {
    exposeConfig: true,
  },
  runtimeConfig: {
    spotifyClientId: process.env.SPOTIFY_CLIENT_ID,
    spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    huggingfaceAccessToken: process.env.HUGGINGFACE_ACCESS_TOKEN,
  },
  typescript: {
    strict: true,
    shim: false,
  },
  postcss: {
    plugins: {
      'postcss-preset-env': true,
      cssnano: true,
    },
  },
})
