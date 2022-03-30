<template>
  <div class="fixed top-0 left-0 w-64">
    <div class="flex h-18 items-center justify-center px-3 mb-4">
      <nuxt-link to="/">
        <img src="/AppIcon.svg" class="w-10 h-10" />
      </nuxt-link>
      <nuxt-link to="/" class="text-lg font-bold pt-1 px-2 font-poppins">ON Foundation</nuxt-link>
      <div class="flex-grow" />
      <span class="material-icons text-xl">menu</span>
    </div>

    <app-bar-side-nav-item v-for="item in navItems" :key="item.text" :icon="item.icon" :text="item.text" :to="item.to" :selected="item.selected" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      navItems: [
        {
          icon: 'home',
          text: 'Top Articles',
          to: '/',
          selected: true
        },
        {
          icon: 'language',
          text: 'Around the World',
          to: '/'
        },
        {
          icon: 'work_outline',
          text: 'Business',
          to: '/'
        },
        {
          icon: 'health_and_safety',
          text: 'Health',
          to: '/'
        }
      ]
    }
  },
  computed: {},
  methods: {},
  mounted() {}
}
</script>