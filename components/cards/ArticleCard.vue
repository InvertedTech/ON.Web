<template>
  <div class="w-full md:w-1/2 p-2" @mouseover="mouseover" @mouseout="mouseout">
    <div class="relative h-full w-full rounded-xl bg-white shadow-sm p-3">
      <div class="flex pb-1">
        <div class="flex-grow px-2">
          <p class="text-lg font-medium mb-2">{{ article.Title }}</p>
          <p class="text-sm text-text text-opacity-60">{{ article.Subtitle }}</p>
        </div>
        <div class="w-32 h-32 rounded-md overflow-hidden">
          <img :src="'https://placeimg.com/640/480/tech?v=' + article.ContentID" class="w-full h-full object-cover" />
        </div>
      </div>
      <div class="flex pl-2 pt-1">
        <p class="text-xs text-text text-opacity-40">{{ $dateDistanceFromNow(new Date(article.CreatedOnUTC)) }}</p>
        <div class="flex-grow" />
        <div class="px-2">
          <div class="flex items-center text-skyblue">
            <span class="material-icons-outlined text-md">ios_share</span>
            <p class="text-xs px-1">Share</p>
          </div>
        </div>
        <div class="pl-2">
          <div class="flex items-center text-skyblue">
            <span class="material-icons-outlined text-md">push_pin</span>
            <p class="text-xs px-1">Read Later</p>
          </div>
        </div>
      </div>
      <nuxt-link :to="`/content/${article.ContentID}`" class="absolute top-0 left-0 w-full h-full" />
      <nuxt-link v-show="isHovering" :to="`/content/${article.ContentID}/edit`" class="absolute top-0 right-0 p-2 cursor-pointer hover:scale-110 transition-transform transform">
        <span class="material-icons text-2xl">edit</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isHovering: false
    }
  },
  computed: {},
  methods: {
    mouseover() {
      this.isHovering = true
    },
    mouseout() {
      this.isHovering = false
    }
  },
  mounted() {}
}
</script>