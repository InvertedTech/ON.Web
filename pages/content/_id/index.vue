<template>
  <div class="w-full">
    <div class="flex h-full">
      <!-- Primary content -->
      <div class="flex-grow pr-5 bg-primary">
        <div id="content-container" class="w-full bg-bg">
          <app-post-view :content="content" :stats="stats" />
        </div>
      </div>
      <!-- Right siderail -->
      <div class="w-80 min-w-80 px-6 py-6 h-full hidden 2xl:block">
        <p class="font-semibold text-2xl mb-4">Related Posts</p>

        <template v-for="content of relatedContent">
          <nuxt-link :key="content.ContentID" :to="`/content/${content.ContentID}`" class="w-full mb-4 cursor-pointer block">
            <div class="rounded-3xl relative w-full">
              <div class="w-full aspect-[2] rounded-2xl border-4 overflow-hidden relative mb-2">
                <img v-if="content.FeaturedImageAssetID" :src="`${$config.baseURL}/api/cms/asset/${content.FeaturedImageAssetID}/data`" class="w-full h-full object-cover" />
              </div>
              <p class="px-1 text-sm font-bold">{{ content.Title }}</p>
              <p class="text-grayscale-600 text-xs px-1">{{ dateDistanceFromNow(new Date(content.CreatedOnUTC)) }}</p>
            </div>
          </nuxt-link>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ store, params, app, redirect }) {
    const response = await app.$axios.$get(`/api/cms/content/${params.id}`).catch((error) => {
      console.error('Failed to get content', error)
      return null
    })
    if (!response || !response.Record) {
      return redirect('/')
    }
    const related = await app.$axios.$get(`/api/cms/content/${params.id}/related`).catch((error) => {
      console.error('Failed to get content', error)
      return null
    })
    const stats = await app.$axios.$get(`/api/stats/${params.id}`).catch((error) => {
      console.error('Failed to get stats', error)
      return null
    })
    return {
      content: response.Record,
      relatedContent: related?.Records || [],
      stats
    }
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    dateDistanceFromNow(date) {
      if (!this.$dateDistanceFromNow) return ''
      return this.$dateDistanceFromNow(date)
    }
  },
  mounted() {
    console.log('content', this.content)
    console.log('relatedContent', this.relatedContent)
    console.log('stats', this.stats)
  }
}
</script>

<style scoped>
#content-container {
  min-height: calc(100vh - 80px);
}
</style>