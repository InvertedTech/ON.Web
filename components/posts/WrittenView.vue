<template>
  <div class="w-full max-w-3xl mx-auto h-full py-4">
    <div class="w-full aspect-[2] rounded-3xl overflow-hidden">
      <img :src="featuredImageSrc" class="w-full object-cover" />
    </div>
    <div class="py-4 w-full">
      <h2 class="text-2xl font-bold mb-1">{{ Title }}</h2>
      <div class="flex items-center py-1">
        <p class="text-gray-300 font-bold text-sm">{{ publishDateDistance }} by {{ Author }}</p>
        <div class="flex-grow" />
        <div class="flex items-center cursor-pointer mx-3" :class="LikedByUser ? 'text-accent-darker hover:text-accent' : 'text-grayscale-900 hover:text-white'" @click.stop="likeClick">
          <span class="material-icons-outlined text-2xl">favorite_border</span>
          <p class="pl-1.5 text-sm font-bold">{{ Likes || 'Like' }}</p>
        </div>
        <div class="flex items-center text-grayscale-900 hover:text-white cursor-pointer mx-3">
          <span class="material-icons-outlined text-2xl">share</span>
          <p class="pl-1.5 text-sm font-bold">Share</p>
        </div>
        <div class="flex items-center text-grayscale-900 hover:text-white cursor-pointer ml-3">
          <span class="material-icons-outlined text-2xl">bookmark_border</span>
          <p class="pl-1.5 text-sm font-bold">Save</p>
        </div>
      </div>
      <div class="flex justify-end py-3 -mx-1">
        <ui-tag-pill v-for="tag in Tags" :key="tag" :tag="tag" class="mx-1" />
      </div>
      <div class="py-4">
        <div class="rich-text prose prose-invert w-full" v-html="HtmlBody" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      default: () => {}
    },
    stats: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      userLikedNow: undefined
    }
  },
  computed: {
    ContentID() {
      return this.content.ContentID
    },
    ContentData() {
      return this.content.Data || {}
    },
    Title() {
      return this.ContentData.Title
    },
    Author() {
      return this.ContentData.Author
    },
    HtmlBody() {
      return this.ContentData.Written.HtmlBody
    },
    Tags() {
      return this.ContentData.Tags || []
    },
    PublishOnUTC() {
      return this.content.PublishOnUTC || ''
    },
    publishDateDistance() {
      if (!this.$dateDistanceFromNow) return ''
      return this.$dateDistanceFromNow(new Date(this.PublishOnUTC).valueOf())
    },
    FeaturedImageAssetID() {
      return this.ContentData.FeaturedImageAssetID
    },
    featuredImageSrc() {
      if (!this.FeaturedImageAssetID) return 'https://picsum.photos/1200/800'
      return `${this.$config.baseURL}/api/cms/asset/${this.FeaturedImageAssetID}/data`
    },
    statsData() {
      return this.stats.Record || {}
    },
    LikedByUser() {
      if (this.userLikedNow !== undefined) return this.userLikedNow
      return !!this.stats.LikedByUser
    },
    Likes() {
      if (this.LikedByUser) return this.LikesByOtherUsers + 1
      return this.LikesByOtherUsers
    },
    LikesByOtherUsers() {
      if (this.stats.LikedByUser) return Number(this.statsData.Likes || 0) - 1
      return Number(this.statsData.Likes || 0)
    },
    Views() {
      return Number(this.statsData.Views || 0)
    }
  },
  methods: {
    likeClick() {
      const currentLikeVal = this.LikedByUser
      this.userLikedNow = !this.LikedByUser
      const endpoint = this.userLikedNow ? 'like' : 'unlike'
      this.$axios.$post(`/api/stats/${this.ContentID}/${endpoint}`, { ContentID: this.ContentID }).catch((error) => {
        console.error('Failed to like post', error)
        this.userLikedNow = currentLikeVal
      })
    }
  },
  mounted() {}
}
</script>