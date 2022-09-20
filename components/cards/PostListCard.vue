<template>
  <div class="px-8 py-2 w-full absolute top-0 left-0">
    <div class="flex rounded-4xl px-6 py-4 bg-primary relative w-full">
      <div class="h-32 w-32 rounded-3xl border-4 overflow-hidden relative" :class="`border-post-${ContentType.toLowerCase()}`">
        <img src="https://picsum.photos/id/1026/300/300" class="w-full h-full" />
      </div>
      <div class="flex-grow px-4 py-1">
        <p class="font-bold mb-1 text-lg">{{ Title }}</p>
        <p class="text-grayscale-700">{{ Description }}</p>
      </div>

      <div class="flex absolute bottom-0 left-40 py-5 px-2">
        <div>
          <div class="flex items-center text-accent-darker hover:text-accent cursor-pointer">
            <span class="material-icons-outlined" :style="{ fontSize: 0.9375 * sizeMultiplier + 'rem' }">library_add</span>
            <p class="px-1 font-bold" :style="{ fontSize: 0.75 * sizeMultiplier + 'rem' }">Save</p>
          </div>
        </div>
        <div class="pl-4">
          <div class="flex items-center text-accent-darker hover:text-accent cursor-pointer">
            <span class="material-icons-outlined" :style="{ fontSize: 0.9375 * sizeMultiplier + 'rem' }">ios_share</span>
            <p class="px-1 font-bold" :style="{ fontSize: 0.75 * sizeMultiplier + 'rem' }">Share</p>
          </div>
        </div>
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
    sizeMultiplier() {
      return 1
    },
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
      return this.post ? this.post.ContentType : 'Written'
    },
    ContentID() {
      return this.post ? this.post.ContentID : 0
    },
    PublishOnUTC() {
      return this.post ? this.post.PublishOnUTC : null
    },
    contentTypeIcon() {
      if (this.ContentType === 'Written') return 'article'
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
    }
  },
  mounted() {}
}
</script>