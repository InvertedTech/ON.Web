<template>
  <input v-model="input" :type="type" :id="id" class="border border-primary focus:outline-none w-full text-lg text-primary px-2 py-0.5 focus:bg-accent" />
</template>

<script>
export default {
  props: {
    value: [String, Number],
    type: {
      type: String,
      default: 'text'
    },
    id: String
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