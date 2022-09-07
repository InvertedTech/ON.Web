<template>
  <button v-if="!to" :type="type" :class="className" :disabled="disabled" @click="$emit('click', $event)" :style="{ height }">
    <slot />
  </button>
  <nuxt-link v-else :to="to" :class="className" :disabled="disabled" class="flex items-center" :style="{ height }">
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
    classes: {
      type: String,
      default: 'bg-accent-darker hover:bg-accent text-accent hover:text-grayscale-300'
    },
    height: {
      type: String,
      default: '44px'
    },
    disabled: Boolean
  },
  data() {
    return {}
  },
  computed: {
    className() {
      const classes = ['text-sm font-medium px-5 rounded-full min-w-28 text-center']
      classes.push(this.classes)
      return classes.join(' ')
    }
  },
  methods: {},
  mounted() {}
}
</script>