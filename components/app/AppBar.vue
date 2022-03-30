<template>
  <div id="appbar" class="fixed top-0 left-0 flex items-center h-18 px-2 md:px-10">
    <div class="w-full max-w-xl relative rounded-md overflow-hidden">
      <input v-model="search" type="text" placeholder="Search for news.." class="bg-skyblue bg-opacity-5 text-md placeholder-text placeholder-opacity-30 px-4 py-2 w-full" />
      <div class="absolute top-0 right-0 bottom-0 h-full flex items-center px-3">
        <span class="material-icons text-xl">search</span>
      </div>
    </div>
    <div class="flex-grow" />

    <nuxt-link v-if="!isAuthenticated" to="/login" class="font-bold text-lg">Login</nuxt-link>
    <template v-else>
      <!-- <nuxt-link to="/content" class="font-bold text-lg">Articles</nuxt-link>
      <span class="px-2">|</span> -->
      <!-- <nuxt-link to="/subscription" class="font-bold text-lg">Subscription</nuxt-link> -->
      <!-- <span class="px-2">|</span>
      <nuxt-link to="/users" class="font-bold text-lg">Manage Users</nuxt-link>
      <span class="px-2">|</span> -->
      <nuxt-link to="/admin/subscriptions" class="text-sm font-bold flex items-center bg-white shadow-sm rounded-2xl px-2 py-2 mx-1">
        <span class="material-icons-outlined text-xl px-1">subscriptions</span>
      </nuxt-link>
      <nuxt-link to="/admin/users" class="text-sm font-bold flex items-center bg-white shadow-sm rounded-2xl px-2 py-2 mx-1">
        <span class="material-icons-outlined text-xl px-1">people</span>
      </nuxt-link>
      <nuxt-link to="/admin/content" class="text-sm font-bold flex items-center bg-white shadow-sm rounded-2xl px-2 py-2 mx-1">
        <span class="material-icons-outlined text-xl px-1">feed</span>
      </nuxt-link>
      <nuxt-link to="/profile" class="text-sm font-bold flex items-center bg-white shadow-sm rounded-2xl px-2 py-2 mx-1">
        <p class="px-1">My Profile</p>
        <span class="material-icons-outlined text-xl px-1">person</span>
      </nuxt-link>
    </template>
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
    }
  },
  methods: {},
  mounted() {}
}
</script>