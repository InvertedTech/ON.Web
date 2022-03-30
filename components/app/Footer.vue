<template>
  <div class="w-full">
    <!-- <div class="flex p-8 md:p-24 bg-accent bg-opacity-75">
      <div class="w-1/2 md:1/4">
        <h4 class="font-bold text-xl mb-4">Our Other Channels</h4>
        <div class="flex -mx-2">
          <span class="material-icons text-2xl mx-2">share</span>
          <span class="material-icons text-2xl mx-2">whatsapp</span>
          <span class="material-icons text-2xl mx-2">thumb_up_alt</span>
          <span class="material-icons text-2xl mx-2">self_improvement</span>
        </div>
      </div>
      <div class="w-1/2 md:1/4">
        <h4 class="font-bold text-xl mb-2">Column Header</h4>
        <p class="text-lg">Lorem Ipsum</p>
      </div>
      <div class="w-1/2 md:1/4">
        <h4 class="font-bold text-xl">Column Header</h4>
        <p class="text-lg">Lorem Ipsum</p>
      </div>
      <div class="w-1/2 md:1/4">
        <h4 class="font-bold text-xl">Column Header</h4>
        <p class="text-lg">Lorem Ipsum</p>
      </div>
    </div> -->
    <div class="flex p-4 md:py-4 md:px-12">
      <!-- <a v-if="isAuthenticated" href="#" class="text-sm hover:underline" @click.prevent="logout">Logout</a> -->
      <div class="flex-grow" />
      <p class="text-sm text-text text-opacity-60">Made with love by the <a href="https://opennetworkfoundation.org/" target="_blank" class="text-primary text-opacity-70 hover:text-opacity-100 hover:underline transition-colors duration-100">Open Network Foundation</a></p>
    </div>
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
  methods: {
    logout() {
      this.$store.commit('auth/reset')
      location.reload()
    }
  },
  mounted() {}
}
</script>