<template>
  <div class="w-full h-[calc(100%-64px)] lg:h-full">
    <div class="flex h-full">
      <div class="w-48 p-6">
        <template v-for="item in NavItems">
          <app-bar-side-nav-item :to="item.to" :key="item.name" :text="item.name" small :selected="pageRoute == item.to" :icon="item.icon" />
        </template>
      </div>
      <div class="flex-grow h-full border-l border-l-grayscale-400">
        <div class="w-full max-w-4xl mx-auto px-6 py-10">
          <nuxt-child />
        </div>
      </div>
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
    },
    NavItems() {
      return [
        {
          name: 'Website',
          to: '/admin/settings'
        },
        {
          name: 'Content',
          to: '/admin/settings/content'
        },
        {
          name: 'Navigation',
          to: '/admin/settings/navigation'
        },
        {
          name: 'Payment',
          to: '/admin/settings/payment'
        },
        {
          name: 'Notifications',
          to: '/admin/settings/notifications'
        },
        {
          name: 'Comments',
          to: '/admin/settings/comments'
        }
      ]
    },
    pageRoute() {
      return this.$route.path
    }
  },
  methods: {},
  mounted() {}
}
</script>