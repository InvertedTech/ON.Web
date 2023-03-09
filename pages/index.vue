<template>
  <div class="w-full">
    <div class="flex h-full xl:pl-60">
      <!-- Primary content -->
      <div class="flex-grow px-5 py-5 bg-primary">
        <div id="content-list-wrapper" class="w-full bg-bg rounded-3xl py-4">
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
#content-list-wrapper {
  min-height: calc(100vh - 40px - 80px);
}
</style>
