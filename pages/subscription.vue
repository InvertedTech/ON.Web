<template>
  <div class="w-full page-wrapper">
    <div class="p-8 md:p-16 max-w-6xl mx-auto">
      <h1 class="text-2xl font-bold mb-6">My Subscriptions</h1>
      <p class="text-lg">None</p>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
  data() {
    return {}
  },
  computed: {},
  methods: {},
  mounted() {}
}
</script>