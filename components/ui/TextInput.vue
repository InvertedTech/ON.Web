<template>
  <input v-model="input" :type="type" :id="id" :readonly="readonly" class="text-input border border-stroke focus:border-grayscale-600 focus:outline-none w-full text-base text-text bg-primary px-5 focus:bg-grayscale-400 rounded-xl h-12" />
</template>

<script>
export default {
  props: {
    value: [String, Number],
    type: {
      type: String,
      default: 'text'
    },
    id: String,
    readonly: Boolean
  },
  data() {
    return {}
  },
  computed: {
    input: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {},
  mounted() {}
}
</script>

<style scoped>
.text-input:read-only {
  color: #aaa;
  background-color: #2d2d2d;
}
.text-input:read-only:focus {
  background-color: #444;
}
</style>