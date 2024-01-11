<template>
  <div class="w-60 fixed left-0 top-20 h-full py-6 px-4 bg-bg transform transition-transform" :class="wrapperClass">
    <template v-for="item in NavItems">
      <app-bar-side-nav-item :to="item.to" :key="item.name" :text="item.name" :selected="pageRoute.startsWith(item.to)" :icon="item.icon" />
    </template>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: Boolean
  },
  data() {
    return {}
  },
  computed: {
    wrapperClass() {
      const classes = []
      if (this.isOpen) classes.push('translate-x-0')
      else classes.push('-translate-x-60')
      return classes.join(' ')
    },
    SiteTitle() {
      return this.$store.getters['settings/Title']
    },
    NavItems() {
      return [
        {
          icon: 'article',
          name: 'Posts',
          to: '/admin/posts'
        },
        {
          icon: 'groups',
          name: 'Members',
          to: '/admin/members'
        },
        {
          icon: 'refresh',
          name: 'Subscriptions',
          to: '/admin/subscriptions'
        },
        {
          icon: 'settings',
          name: 'Settings',
          to: '/admin/settings'
        },
        {
          icon: 'help_outline',
          name: 'Resources',
          to: '/admin/resources'
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