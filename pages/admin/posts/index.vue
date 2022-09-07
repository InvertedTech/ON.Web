<template>
  <div class="w-full p-6">
    <div class="flex items-center mb-6">
      <h1 class="text-2xl font-bold">Posts</h1>
      <div class="flex-grow" />
      <ui-btn to="/admin/posts/create">Create New Post</ui-btn>
    </div>

    <div class="w-full">
      <template v-for="post in posts">
        <cards-admin-post-card :key="post.ContentID" :post="post" @reload="reloadPosts" class="mb-5" />
      </template>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'blank',
  data() {
    return {
      posts: []
    }
  },
  computed: {},
  methods: {
    reloadPosts() {
      this.load()
    },
    load() {
      this.$axios.$get(`/api/cms/admin/content`).then((data) => {
        console.log('Got posts', data)
        if (data && data.Records) {
          this.posts = data.Records
        }
      })
    }
  },
  mounted() {
    this.load()
  }
}
</script>