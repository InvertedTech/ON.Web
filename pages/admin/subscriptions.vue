<template>
  <div class="w-full p-6">
    <div class="w-full flex mt-4 mb-6">
      <div class="w-1/2">
        <nuxt-link to="/admin/subscriptions" class="flex items-center justify-center rounded-l-2xl py-2.5 font-semibold" :class="routePath === '/admin/subscriptions' ? 'bg-accent/90 text-black/60' : 'bg-grayscale-400/80 text-white/60'">Plans</nuxt-link>
      </div>
      <div class="w-1/2 border-l border-x-white/20">
        <nuxt-link to="/admin/subscriptions/payments" class="flex items-center justify-center rounded-r-2xl py-2.5 font-semibold" :class="routePath === '/admin/subscriptions/payments' ? 'bg-accent/90 text-black/60' : 'bg-grayscale-400/80 text-white/60'">Payments</nuxt-link>
      </div>
    </div>

    <div class="w-full max-w-4xl mx-auto p-4">
      <nuxt-child />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    routePath() {
      return this.$route.path
    }
  },
  methods: {},
  mounted() {}
}
</script>