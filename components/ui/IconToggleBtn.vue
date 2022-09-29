<template>
  <button class="w-20 min-w-20 h-20 rounded-3.75xl flex items-center justify-center focus:outline-none" :class="selected ? 'bg-accent text-grayscale-300' : 'bg-grayscale-300 text-white hover:bg-grayscale-400'" @click.stop="$emit('click', $event)">
    <span class="material-icons-outlined text-5xl">{{ icon }}</span>
  </button>
</template>

<script>
export default {
  props: {
    icon: String,
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