<template>
  <div class="overflow-y-auto relative bg-primary h-full">
    <app-admin-side-nav :is-open.sync="sideDrawerOpen" />
    <div class="configContent lg:pl-5 pt-5 h-full">
      <div class="w-full bg-bg lg:rounded-tl-xl h-full min-h-full">
        <div class="w-full h-16 px-4 flex items-center lg:hidden border-b border-white border-opacity-10">
          <span class="material-icons cursor-pointer" @click.stop.prevent="showMore">more_vert</span>
          <p class="pl-3 capitalize">{{ currentPage }}</p>
        </div>
        <nuxt-child />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  middleware: 'admin',
  data() {
    return {
      sideDrawerOpen: false
    }
  },
  watch: {
    currentPage: {
      handler() {
        this.sideDrawerOpen = false
      }
    }
  },
  computed: {
    currentPage() {
      if (!this.$route.name) return 'Admin'
      var routeName = this.$route.name.split('-')
      if (routeName.length > 0) return routeName.slice(1).join('-')
      return 'Admin'
    }
  },
  methods: {
    showMore() {
      this.sideDrawerOpen = true
    },
    resize() {
      this.sideDrawerOpen = window.innerWidth >= 1024
    }
  },
  updated() {
    this.resize()
  },
  mounted() {
    window.addEventListener('resize', this.resize)
    this.resize()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize)
  }
}
</script>

<style>
.configContent {
  margin: auto;
  width: 100%;
  max-width: calc(100% - 240px);
  margin-left: 240px;
}
@media (max-width: 1024px) {
  .configContent {
    margin-left: 0px;
    width: 100%;
    max-width: 100%;
  }
}
</style>