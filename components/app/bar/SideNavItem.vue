<template>
  <nuxt-link :to="to" class="w-full h-14 block">
    <div class="h-full flex items-center px-2 rounded-r-full" :class="selected ? 'bg-skyblue hover:bg-opacity-20 bg-opacity-10 text-skyblue' : 'hover:bg-skyblue hover:bg-opacity-10'">
      <div class="w-1.5 h-1.5 rounded-full mx-2 bg-skyblue" :class="selected ? 'opacity-100' : 'opacity-0'" />
      <span class="material-icons-outlined text-2xl">{{ icon }}</span>
      <p class="ml-4 text-md font-bold">{{ text }}</p>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    icon: String,
    text: String,
    to: String,
    selected: Boolean
  },
  data() {
    return {}
  },
  computed: {},
  methods: {},
  mounted() {}
}
</script>