<template>
  <button v-if="!to" :type="type" :class="className" @click="$emit('click', $event)">
    <slot />
  </button>
  <nuxt-link v-else :to="to" :class="className" class="flex items-center">
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
    to: String,
    outlined: Boolean
  },
  data() {
    return {}
  },
  computed: {
    className() {
      const classes = ['text-sm px-7 h-12 rounded-lg']
      if (this.outlined) {
        classes.push('text-primary hover:bg-primary hover:bg-opacity-5 bg-white border-primary border-2')
      } else {
        classes.push('text-white hover:bg-primary hover:bg-opacity-80 bg-primary border-primary hover:border-opacity-20 border-2')
      }
      return classes.join(' ')
    }
  },
  methods: {},
  mounted() {}
}
</script>