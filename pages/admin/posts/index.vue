<template>
  <div class="w-full p-6">
    <div class="flex items-center mb-6">
      <h1 class="text-2xl font-bold">Posts</h1>
      <div class="flex-grow" />
      <ui-btn to="/admin/posts/create">Create New Post</ui-btn>
    </div>

    <div class="w-full">
      <template v-for="post in posts">
        <cards-admin-post-card :key="post.ContentID" :post="post" class="mb-5" @reload="reloadPosts" @publish="publishPostClick(post)" />
      </template>
    </div>

    <modals-publish-post-modal v-model="showPublishModal" :post="selectedPost" />
  </div>
</template>

<script>
export default {
  layout: 'blank',
  data() {
    return {
      posts: [],
      selectedPost: null,
      showPublishModal: false
    }
  },
  computed: {},
  methods: {
    publishPostClick(post) {
      this.selectedPost = post
      this.showPublishModal = true
    },
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