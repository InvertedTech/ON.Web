<template>
  <div class="fixed top-0 left-0 w-full flex items-center h-18 px-2 md:px-16 shadow-md">
    <nuxt-link to="/">
      <img src="/AppIcon.svg" class="w-12 h-12" />
    </nuxt-link>
    <nuxt-link to="/" class="text-2xl font-bold pt-1 px-4">Get ON</nuxt-link>

    <div class="flex-grow" />

    <nuxt-link v-if="!isAuthenticated" to="/login" class="font-bold text-lg">Login</nuxt-link>
    <template v-else>
      <nuxt-link to="/articles" class="font-bold text-lg">Articles</nuxt-link>
      <span class="px-2">|</span>
      <nuxt-link to="/subscription" class="font-bold text-lg">Subscription</nuxt-link>
      <span class="px-2">|</span>
      <nuxt-link to="/users" class="font-bold text-lg">Manage Users</nuxt-link>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated']
    }
  },
  methods: {},
  mounted() {}
}
</script>