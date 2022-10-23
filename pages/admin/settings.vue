<template>
  <div class="w-full p-6">
    <div class="w-full flex mt-4 mb-6">
      <div class="w-1/3">
        <nuxt-link to="/admin/settings" class="flex items-center justify-center rounded-l-2xl py-2.5 font-semibold" :class="routePath === '/admin/settings' ? 'bg-accent/90 text-black/60' : 'bg-grayscale-400/80 text-white/60'">Website</nuxt-link>
      </div>
      <div class="w-1/3 border-x border-x-white/20">
        <nuxt-link to="/admin/settings/content" class="flex items-center justify-center py-2.5 font-semibold" :class="routePath === '/admin/settings/content' ? 'bg-accent/90 text-black/60' : 'bg-grayscale-400/80 text-white/60'">Content</nuxt-link>
      </div>
      <div class="w-1/3">
        <nuxt-link to="/admin/settings/notifications" class="flex items-center justify-center rounded-r-2xl py-2.5 font-semibold" :class="routePath === '/admin/settings/notifications' ? 'bg-accent/90 text-black/60' : 'bg-grayscale-400/80 text-white/60'">Notifications</nuxt-link>
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