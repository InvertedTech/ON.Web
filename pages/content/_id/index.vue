<template>
  <div class="w-full">
    <div class="flex h-full">
      <!-- Primary content -->
      <div class="flex-grow pr-5 bg-primary">
        <div id="content-container" class="w-full bg-bg">
          <app-post-view :content="content" />
        </div>
      </div>
      <!-- Right siderail -->
      <div class="w-80 min-w-80 px-6 py-6 h-full hidden 2xl:block">
        <p class="font-semibold text-2xl">Related Posts</p>
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
    return {
      content: response.Record
    }
  },
  data() {
    return {}
  },
  computed: {},
  methods: {},
  mounted() {
    console.log('content', this.content)
  }
}
</script>

<style scoped>
#content-container {
  min-height: calc(100vh - 80px);
}
</style>