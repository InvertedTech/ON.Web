<template>
  <button :type="type" class="font-bold text-sm hover:bg-accent bg-white border border-primary rounded-full px-8 py-1">
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'button'
    }
  },
  data() {
    return {}
  },
  computed: {},
  methods: {},
  mounted() {}
}
</script>