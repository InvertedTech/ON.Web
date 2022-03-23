<template>
  <div class="w-full page-wrapper bg-accent bg-opacity-25">
    <div class="p-8 md:px-12 md:py-20 max-w-6xl mx-auto">
      <p class="text-xl italic font-thin mb-4">Published March 27, 2022</p>
      <h1 class="text-6xl font-bold mb-4">{{ article.Title }}</h1>
      <p class="text-3xl italic font-thin">{{ article.Subtitle }}</p>
    </div>
    <div class="w-full h-px bg-primary bg-opacity-20" />
    <div class="p-8 md:p-12 max-w-6xl mx-auto">
      <p v-html="article.Body" class="text-lg" />
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params, redirect }) {
    var record = await $axios
      .$get(`/api/cms/content/${params.id}`)
      .then((res) => res.Content.Public)
      .catch((error) => {
        console.error('Failed', error)
        return null
      })
    if (!record) return redirect(`/content?error=Article not found`)
    return {
      article: {
        ...record
      }
    }
  },
  data() {
    return {}
  },
  computed: {},
  methods: {},
  mounted() {}
}
</script>