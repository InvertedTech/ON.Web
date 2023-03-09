<template>
  <client-only>
    <div>
      <div class="fixed left-0 z-20 w-60 min-w-60 h-full px-6 bg-bg transform transition-transform" :class="wrapperClass">
        <div v-if="isDrawerFloating" class="w-full h-20 flex items-center px-2 mb-6">
          <button class="mr-6 flex" @click="isDrawerOpen = false">
            <span class="material-icons text-3xl text-white/80">menu</span>
          </button>
        </div>

        <nuxt-link to="/" class="w-full rounded-lg flex items-center px-2 py-2 mb-3 cursor-pointer" :class="routePath === '/' ? 'bg-accent text-primary' : 'text-grayscale-800 hover:bg-white hover:bg-opacity-10 hover:grayscale-500'">
          <span class="material-icons-outlined text-2xl">home</span>
          <p class="text-lg px-3">Home</p>
        </nuxt-link>
        <div class="w-full rounded-lg flex items-center px-2 py-2 mb-3 cursor-pointer" :class="routePath === '/watch' ? 'bg-accent text-primary' : 'text-grayscale-800 hover:bg-white hover:bg-opacity-10 hover:grayscale-500'">
          <span class="material-icons-outlined text-2xl">smart_display</span>
          <p class="text-lg px-3">{{ VideoMenuLinkName }}</p>
        </div>
        <div class="w-full rounded-lg flex items-center px-2 py-2 mb-3 cursor-pointer" :class="routePath === '/read' ? 'bg-accent text-primary' : 'text-grayscale-800 hover:bg-white hover:bg-opacity-10 hover:grayscale-500'">
          <span class="material-icons-outlined text-2xl">menu_book</span>
          <p class="text-lg px-3">{{ WrittenMenuLinkName }}</p>
        </div>
        <div class="w-full rounded-lg flex items-center px-2 py-2 mb-3 cursor-pointer" :class="routePath === '/listen' ? 'bg-accent text-primary' : 'text-grayscale-800 hover:bg-white hover:bg-opacity-10 hover:grayscale-500'">
          <span class="material-icons-outlined text-2xl">headphones</span>
          <p class="text-lg px-3">{{ AudioMenuLinkName }}</p>
        </div>
      </div>

      <div v-if="isDrawerFloating && isDrawerOpen" class="fixed top-0 left-0 w-screen h-screen bg-black/30 z-10" @click="isDrawerOpen = false" />
    </div>
  </client-only>
</template>

<script>
export default {
  fetch() {},
  data() {
    return {
      isMounted: false,
      windowWidth: 0
    }
  },
  watch: {
    routePath() {
      this.isDrawerOpen = false
    }
  },
  computed: {
    wrapperClass() {
      const classes = []
      if (this.isDrawerOpen || !this.isDrawerFloating) classes.push('translate-x-0')
      else classes.push('-translate-x-60')

      classes.push(this.isDrawerFloating ? 'top-0' : 'top-20')
      classes.push(this.isDrawerFloating ? 'py-0' : 'py-6')

      return classes.join(' ')
    },
    isDrawerOpen: {
      get() {
        return this.$store.state.isDrawerOpen
      },
      set(val) {
        this.$store.commit('setDrawerOpen', val)
      }
    },
    isHome() {
      return !this.routePath || this.routePath === '/'
    },
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
    },
    isDrawerFloating() {
      return !this.isHome || this.windowWidth < 1280
    }
  },
  methods: {
    resize() {
      const previsFloating = this.isDrawerFloating
      this.windowWidth = window.innerWidth
      if (this.isDrawerFloating !== previsFloating) this.isDrawerOpen = false
    }
  },
  mounted() {
    this.isMounted = true
    window.addEventListener('resize', this.resize)
  },
  beforeMount() {
    this.windowWidth = window.innerWidth
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize)
  }
}
</script>