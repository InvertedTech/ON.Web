<template>
  <button v-if="!to" class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-accent focus:outline-none">
    <span class="material-icons text-3xl">
      {{ icon }}
    </span>
  </button>
  <nuxt-link v-else :to="to" class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-accent focus:outline-none">
    <span class="material-icons text-3xl">
      {{ icon }}
    </span>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    icon: String,
    to: String
  },
  data() {
    return {}
  },
  computed: {},
  methods: {},
  mounted() {}
}
</script>