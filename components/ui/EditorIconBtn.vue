<template>
  <button type="button" class="h-8 w-8 min-w-[32px] flex items-center justify-center rounded-base text-white disabled:text-opacity-30" :class="active ? 'bg-primary' : 'text-opacity-60 hover:text-opacity-100'" @click="$emit('click', $event)" :disabled="disabled">
    <span class="material-icons text-2xl">{{ icon }}</span>
  </button>
</template>

<script>
export default {
  props: {
    icon: String,
    active: Boolean,
    disabled: Boolean
  },
  data() {
    return {}
  },
  computed: {},
  methods: {},
  mounted() {}
}
</script>
