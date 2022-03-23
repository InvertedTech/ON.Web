<template>
  <button v-if="!to" :type="type" class="font-bold text-sm hover:bg-accent bg-white border border-primary rounded-full px-8 py-1" @click="$emit('click', $event)">
    <slot />
  </button>
  <nuxt-link v-else :to="to" class="font-bold text-sm hover:bg-accent bg-white border border-primary rounded-full px-8 py-1">
    <slot />
  </nuxt-link>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'button'
    },
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