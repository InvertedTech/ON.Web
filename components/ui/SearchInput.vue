<template>
  <div class="w-full relative">
    <input v-model="input" :type="type" :id="id" :readonly="readonly" :placeholder="placeholder" class="focus:outline-none placeholder-grayscale-800 w-full text-sm text-text bg-grayscale-300 px-6 focus:bg-grayscale-400 rounded-xl h-10" />

    <div class="absolute top-0 right-0 h-full px-6 flex items-center justify-center pointer-events-none">
      <span class="material-icons text-grayscale-800 text-xl">search</span>
    </div>
  </div>
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
    readonly: Boolean,
    placeholder: String
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