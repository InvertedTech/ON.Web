<template>
  <button class="outline-none ring-0 flex items-center justify-center" @click.stop.prevent="toggle">
    <span class="material-icons-outlined text-xl text-grayscale-900">{{ icon }}</span>
  </button>
</template>

<script>
export default {
  props: {
    value: Boolean
  },
  data() {
    return {}
  },
  computed: {
    checked: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    icon() {
      return this.value ? 'check_box' : 'check_box_outline_blank'
    }
  },
  methods: {
    toggle() {
      this.checked = !this.checked
    }
  },
  mounted() {}
}
</script>