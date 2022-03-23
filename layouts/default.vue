<template>
  <div class="w-full h-screen overflow-hidden text-primary">
    <app-bar />
    <div id="content" class="overflow-y-auto">
      <Nuxt />

      <app-footer />
    </div>
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

<style>
#content {
  margin-top: 75px;
  height: calc(100vh - 75px);
  min-height: calc(100vh - 75px);
  max-height: calc(100vh - 75px);
}
</style>