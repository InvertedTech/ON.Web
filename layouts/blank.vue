<template>
  <div id="app" class="w-full h-screen overflow-hidden text-text bg-bg">
    <div class="h-18 flex items-center px-3">
      <nuxt-link to="/">
        <img src="/AppIcon.svg" class="w-10 h-10" />
      </nuxt-link>
      <nuxt-link to="/" class="text-lg font-bold pt-1 px-2 font-poppins">ON Foundation</nuxt-link>
    </div>
    <div id="content">
      <Nuxt />
    </div>

    <app-footer />
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {},
  methods: {},
  mounted() {}
}
</script>

<style scoped>
#content {
  height: calc(100vh - 75px - 56px);
  min-height: calc(100vh - 75px - 56px);
  max-height: calc(100vh - 75px - 56px);
}
</style>