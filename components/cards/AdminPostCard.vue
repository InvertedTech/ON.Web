<template>
  <div class="flex rounded-4xl px-6 py-4 bg-primary">
    <div class="h-32 w-32 rounded-3xl border-4 border-blue-400 overflow-hidden relative">
      <img src="https://picsum.photos/id/1026/300/300" class="w-full h-full" />
      <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-0 text-white text-opacity-50 hover:text-opacity-0">
        <span class="material-icons-outlined text-4xl">{{ contentTypeIcon }}</span>
      </div>
    </div>
    <div class="flex-grow px-4">
      <p class="font-bold mb-1 text-lg">{{ Title }}</p>
      <p class="text-grayscale-700">{{ Description }}</p>
    </div>
    <div class="w-72 h-32">
      <div class="w-full h-full flex items-center">
        <ui-btn class="mx-2" classes="bg-accent-darker bg-opacity-10 hover:bg-accent-darker text-accent-darker hover:text-accent">Edit</ui-btn>
        <ui-btn class="mx-2" @click="publishClick">{{ PublishOnUTC ? 'Unpublish' : 'Publish' }}</ui-btn>
        <ui-icon-btn icon="delete" size="32px" icon-size="20px" class="mx-2 text-grayscale-900 hover:text-white" @click="deletePost" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {}
  },
  computed: {
    Title() {
      return this.post ? this.post.Title : ''
    },
    Description() {
      return this.post ? this.post.Description : ''
    },
    CreatedOnUTC() {
      return this.post ? this.post.CreatedOnUTC : 0
    },
    ContentType() {
      return this.post ? this.post.ContentType : 0
    },
    ContentID() {
      return this.post ? this.post.ContentID : 0
    },
    PublishOnUTC() {
      return this.post ? this.post.PublishOnUTC : null
    },
    contentTypeIcon() {
      if (this.ContentType === 'Written') return 'article'
      else if (this.ContentType === 'Video') return 'play_circle'
      return 'play'
    }
  },
  methods: {
    publishClick() {
      const endpoint = this.PublishOnUTC ? 'unpublish' : 'publish'
      const payload = this.PublishOnUTC ? {} : { PublishOnUTC: new Date() }
      this.$axios
        .$post(`/api/cms/admin/content/${this.ContentID}/${endpoint}`, payload)
        .then((data) => {
          console.log('Published post', data)
          if (this.PublishOnUTC) {
            this.$toast.success('Unpublished post')
            this.post.PublishOnUTC = null
          } else {
            this.$toast.success('Published post')
            this.$set(this.post, 'PublishOnUTC', new Date().toString())
          }
        })
        .catch((error) => {
          console.error('Failed to publish', error)
          this.$toast.error('Failed')
        })
    },
    deletePost() {
      if (confirm(`Are you sure you want to delete this post?`)) {
        this.$axios
          .$delete(`/api/cms/admin/content/${this.ContentID}`)
          .then((data) => {
            console.log('Deleted post', data)
            this.$toast.success('Post removed')
            this.$emit('reload')
          })
          .catch((error) => {
            console.error('Failed to remove post', error)
            this.$toast.error('Failed')
          })
      }
    }
  },
  mounted() {}
}
</script>