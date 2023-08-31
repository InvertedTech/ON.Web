<template>
  <div id="app" class="w-full h-full text-text bg-bg">
    <!-- Header bar -->
    <app-bar />

    <!-- Left siderail -->
    <app-side-nav />

    <div id="content" class="overflow-y-auto overflow-hidden">
      <Nuxt />
    </div>

    <modals-confirm-prompt />
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
