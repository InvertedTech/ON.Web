<template>
  <div class="px-8 py-2 w-full absolute top-0 left-0 cursor-pointer" @click.stop="clickCard">
    <div class="flex rounded-4xl px-6 py-4 bg-primary relative w-full">
      <div class="h-24 w-48 rounded-2xl border-4 overflow-hidden relative" :class="borderColorClass">
        <img :src="featuredImageSrc" class="w-full h-full object-cover" />

        <div v-if="!isAvailableToUser" class="absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
          <span class="material-icons-outlined text-white/80 text-3xl text-orange-300">lock</span>
        </div>
      </div>
      <div class="flex-grow px-4 py-1">
        <p class="font-bold mb-1 text-lg">{{ Title }}</p>
        <p class="text-grayscale-700">{{ Description }}</p>
      </div>

      <div v-if="isAvailableToUser" class="flex absolute bottom-0 left-56 py-5 px-2">
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
      <div v-else class="flex absolute bottom-0 left-56 py-5 px-2">
        <div class="flex items-center text-orange-500 hover:text-orange-400 cursor-pointer">
          <span class="material-icons-outlined" :style="{ fontSize: 1.1 * sizeMultiplier + 'rem' }">lock</span>
          <p class="px-1 font-bold" :style="{ fontSize: 0.75 * sizeMultiplier + 'rem' }">Subscribe to unlock this content</p>
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
    store() {
      return this.$store || this.$nuxt.$store
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
    FeaturedImageAssetID() {
      return this.post ? this.post.FeaturedImageAssetID : null
    },
    SubscriptionLevel() {
      return this.post ? this.post.SubscriptionLevel : 0
    },
    UserSubscriptionLevel() {
      return this.store.getters['auth/SubscriptionLevel']
    },
    userIsOwner() {
      return this.store.getters['auth/isOwner']
    },
    isAvailableToUser() {
      if (this.userIsOwner) return true
      return this.UserSubscriptionLevel >= this.SubscriptionLevel
    },
    contentTypeIcon() {
      if (this.ContentType === 'Written') return 'article'
      return 'play'
    },
    featuredImageSrc() {
      if (!this.FeaturedImageAssetID) return 'https://picsum.photos/1200/800'
      const config = this.$config || this.$nuxt.$config
      return `${config.baseURL}/api/cms/asset/${this.FeaturedImageAssetID}/data`
    },
    borderColorClass() {
      if (this.isAvailableToUser) return 'border-white'
      return 'border-orange-500'
    }
  },
  methods: {
    clickCard() {
      const router = this.$router || this.$nuxt.$router
      if (this.isAvailableToUser) {
        router.push(`/content/${this.ContentID}`)
      } else {
        router.push(`/plans`)
      }
    }
  },
  mounted() {}
}
</script>