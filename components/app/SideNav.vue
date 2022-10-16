<template>
  <div class="w-80 min-w-80 px-6 py-6 hidden xl:block">
    <div class="w-full rounded-lg flex items-center px-2 py-2 mb-3 cursor-pointer" :class="routePath === '/' ? 'bg-accent text-primary' : 'text-grayscale-800 hover:bg-white hover:bg-opacity-10 hover:grayscale-500'">
      <span class="material-icons-outlined text-2xl">home</span>
      <p class="text-xl px-3">Home</p>
    </div>
    <div class="w-full rounded-lg flex items-center px-2 py-2 mb-3 cursor-pointer" :class="routePath === '/watch' ? 'bg-accent text-primary' : 'text-grayscale-800 hover:bg-white hover:bg-opacity-10 hover:grayscale-500'">
      <span class="material-icons-outlined text-2xl">smart_display</span>
      <p class="text-xl px-3">{{ VideoMenuLinkName }}</p>
    </div>
    <div class="w-full rounded-lg flex items-center px-2 py-2 mb-3 cursor-pointer" :class="routePath === '/read' ? 'bg-accent text-primary' : 'text-grayscale-800 hover:bg-white hover:bg-opacity-10 hover:grayscale-500'">
      <span class="material-icons-outlined text-2xl">menu_book</span>
      <p class="text-xl px-3">{{ WrittenMenuLinkName }}</p>
    </div>
    <div class="w-full rounded-lg flex items-center px-2 py-2 mb-3 cursor-pointer" :class="routePath === '/listen' ? 'bg-accent text-primary' : 'text-grayscale-800 hover:bg-white hover:bg-opacity-10 hover:grayscale-500'">
      <span class="material-icons-outlined text-2xl">headphones</span>
      <p class="text-xl px-3">{{ AudioMenuLinkName }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    routePath() {
      return this.$route.path
    },
    CMSMenuNames() {
      return this.$store.getters['settings/CMSMenuNames'] || {}
    },
    VideoMenuLinkName() {
      return this.CMSMenuNames.VideoMenuLinkName || 'Watch'
    },
    AudioMenuLinkName() {
      return this.CMSMenuNames.AudioMenuLinkName || 'Listen'
    },
    WrittenMenuLinkName() {
      return this.CMSMenuNames.WrittenMenuLinkName || 'Read'
    }
  },
  methods: {},
  mounted() {}
}
</script>