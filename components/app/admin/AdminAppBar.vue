<template>
  <div id="appbar" class="fixed top-0 left-0 w-screen flex items-center h-20 px-2 md:px-10 bg-bg border-b border-grayscale-400 shadow-sm z-10">
    <div class="w-80 min-w-80">
      <nuxt-link to="/" class="flex items-center">
        <span class="material-icons-outlined text-3xl text-accent">west</span>
        <p class="text-xl font-bold px-3">{{ SiteTitle }} Admin</p>
      </nuxt-link>
    </div>
    <div class="flex-grow px-6">
      <ui-search-input placeholder="Search" />
    </div>
    <div class="w-80 min-w-80 px-2 h-full">
      <div v-if="!isAuthenticated" class="h-full flex items-center justify-end">
        <nuxt-link to="/login" class="font-bold text-xl text-accent">Login/Register</nuxt-link>
      </div>
      <div v-else class="h-full flex items-center justify-end">
        <widgets-notification-icon />
        <widgets-account-dropdown-menu />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: ''
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
  methods: {},
  mounted() {}
}
</script>