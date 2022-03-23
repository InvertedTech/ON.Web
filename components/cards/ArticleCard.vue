<template>
  <div class="w-full md:w-1/3 p-4" @mouseover="mouseover" @mouseout="mouseout">
    <div class="relative w-full h-full">
      <div :to="`/content/${article.ContentID}`" class="rounded-lg p-6" :class="isHovering ? 'bg-primary bg-opacity-10' : 'bg-accent'">
        <p>March 27, 2022</p>
        <div class="h-40 w-full flex items-center justify-center">
          <img src="/AppIcon.svg" class="h-32 w-32" />
        </div>
        <p class="text-xl font-semibold mb-2">{{ article.Title }}</p>
        <p class="text-lg">{{ article.Subtitle }}</p>
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