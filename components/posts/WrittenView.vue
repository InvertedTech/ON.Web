<template>
  <div class="w-full h-full p-4">
    <div class="w-full aspect-[3.333] rounded-4xl overflow-hidden">
      <img src="https://picsum.photos/1200/800" class="w-full object-cover" />
    </div>
    <div class="p-4 w-full">
      <h2 class="text-2xl font-bold mb-1">{{ Title }}</h2>
      <div class="flex items-center py-1">
        <p class="text-gray-300 font-bold text-sm">{{ publishDateDistance }} by {{ Author }}</p>
        <div class="flex-grow" />
        <div class="flex items-center text-grayscale-900 hover:text-white cursor-pointer mx-3">
          <span class="material-icons-outlined text-2xl">favorite_border</span>
          <p class="pl-1.5 text-sm font-bold">1337</p>
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
        <div class="rich-text prose prose-invert max-w-3xl mx-auto" v-html="HtmlBody" />
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
    }
  },
  data() {
    return {}
  },
  computed: {
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
    }
  },
  methods: {},
  mounted() {}
}
</script>