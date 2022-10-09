<template>
  <div class="w-full">
    <div class="flex h-full">
      <!-- Left siderail -->
      <div class="w-80 min-w-80 px-6 py-6 hidden xl:block">
        <div class="w-full rounded-lg flex items-center px-2 py-2 mb-3 cursor-pointer" :class="routePath === '/' ? 'bg-accent text-primary' : 'text-grayscale-800 hover:bg-white hover:bg-opacity-10 hover:grayscale-500'">
          <span class="material-icons-outlined text-2xl">home</span>
          <p class="text-xl px-3">Home</p>
        </div>
        <div class="w-full rounded-lg flex items-center px-2 py-2 mb-3 cursor-pointer" :class="routePath === '/watch' ? 'bg-accent text-primary' : 'text-grayscale-800 hover:bg-white hover:bg-opacity-10 hover:grayscale-500'">
          <span class="material-icons-outlined text-2xl">smart_display</span>
          <p class="text-xl px-3">Watch</p>
        </div>
        <div class="w-full rounded-lg flex items-center px-2 py-2 mb-3 cursor-pointer" :class="routePath === '/read' ? 'bg-accent text-primary' : 'text-grayscale-800 hover:bg-white hover:bg-opacity-10 hover:grayscale-500'">
          <span class="material-icons-outlined text-2xl">menu_book</span>
          <p class="text-xl px-3">Read</p>
        </div>
        <div class="w-full rounded-lg flex items-center px-2 py-2 mb-3 cursor-pointer" :class="routePath === '/listen' ? 'bg-accent text-primary' : 'text-grayscale-800 hover:bg-white hover:bg-opacity-10 hover:grayscale-500'">
          <span class="material-icons-outlined text-2xl">headphones</span>
          <p class="text-xl px-3">Listen</p>
        </div>
      </div>
      <!-- Primary content -->
      <div class="flex-grow px-5 py-5 bg-primary">
        <div class="w-full bg-bg rounded-3xl py-4" style="min-height: 4000px">
          <app-card-content-list v-if="posts.length" :posts="posts" />
        </div>
      </div>
      <!-- Right siderail -->
      <!-- <div class="w-80 min-w-80 px-6 py-6 h-full hidden 2xl:block">
        <widgets-top-members-card />
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      posts: [],
      contentView: 'grid'
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated']
    },
    DisplayName() {
      return this.$store.getters['auth/DisplayName']
    },
    UserName() {
      return this.$store.getters['auth/UserName']
    },
    SiteTitle() {
      return this.$store.getters['settings/Title']
    },
    routePath() {
      return this.$route.path
    }
  },
  methods: {
    load() {
      this.$axios
        .$get('/api/cms/content')
        .then((rs) => {
          this.posts = rs.Records
        })
        .catch((error) => {
          console.error('Failed', error)
        })
    }
  },
  mounted() {
    this.load()
  }
}
</script>

<style>
</style>
