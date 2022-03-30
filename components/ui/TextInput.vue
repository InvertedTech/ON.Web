<template>
  <input v-model="input" :type="type" :id="id" :readonly="readonly" class="border border-gray focus:border-primary focus:outline-none w-full text-base text-gray-darkest px-5 focus:bg-white rounded-lg h-14" />
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