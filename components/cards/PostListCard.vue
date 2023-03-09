<template>
  <div class="py-2 px-4 absolute top-0 left-0 cursor-pointer" :style="{ width: width + 'px' }" @click.stop="clickCard">
    <div class="rounded-4xl bg-primary relative w-full p-4">
      <div class="aspect-[2] w-full rounded-3xl border-4 overflow-hidden relative mb-4" :class="borderColorClass">
        <img v-if="featuredImageSrc" :src="featuredImageSrc" class="w-full h-full object-cover" />
        <div v-else class="w-full h-full flex items-center justify-center">
          <p class="text-sm text-grayscale-700">No Image</p>
        </div>

        <div v-if="!isAvailableToUser" class="absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
          <span class="material-icons-outlined text-white/80 text-3xl text-orange-300">lock</span>
        </div>

        <div v-if="!isAvailableToUser" class="flex absolute bottom-0 left-0 py-5 px-5">
          <div class="flex items-center text-orange-500 hover:text-orange-400 cursor-pointer">
            <span class="material-icons-outlined" :style="{ fontSize: 1.1 * sizeMultiplier + 'rem' }">lock</span>
            <p class="px-1 font-bold" :style="{ fontSize: 0.75 * sizeMultiplier + 'rem' }">Subscribe to unlock this content</p>
          </div>
        </div>
      </div>

      <ui-tooltip :disabled="!isTitleTruncated" :max-width="width" :text="Title" direction="top">
        <p ref="title" class="font-bold text-xl mb-1 px-2 truncate">{{ Title }}</p>
      </ui-tooltip>
      <p class="text-grayscale-600 text-sm px-2">{{ $dateDistanceFromNow(new Date(CreatedOnUTC)) }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      default: () => {}
    },
    width: Number
  },
  data() {
    return {
      isTitleTruncated: false
    }
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
      if (!this.FeaturedImageAssetID) return null
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
    },
    checkTruncated() {
      const ref = this.$refs.title
      this.isTitleTruncated = ref && ref.offsetWidth < ref.scrollWidth
    }
  },
  mounted() {
    this.$nextTick(this.checkTruncated)
  }
}
</script>