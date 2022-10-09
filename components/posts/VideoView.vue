<template>
  <div class="w-full h-full p-4">
    <!-- <div class="w-full aspect-[3.333] rounded-4xl overflow-hidden">
      <img src="https://picsum.photos/1200/800" class="w-full object-cover" />
    </div> -->
    <players-video-player :video="ContentData.Video" />
    <div class="p-4 w-full">
      <h2 class="text-2xl font-bold mb-2">{{ Title }}</h2>
      <div class="flex">
        <p class="text-grayscale-900 font-medium text-lg">{{ Author }}</p>
      </div>
      <div class="py-4">
        <!-- <div v-html="HtmlBody" /> -->
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
    YoutubeVideoId() {
      return this.ContentData.Video.YoutubeVideoId
    }
  },
  methods: {},
  mounted() {}
}
</script>