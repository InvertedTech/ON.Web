<template>
  <div class="w-full">
    <label :for="inputId" class="mb-0.5 text-gray-400">{{ label }}</label>
    <ui-text-input v-model="input" :type="type" :id="inputId" :readonly="readonly" />
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    value: [Number, String],
    type: {
      type: String,
      default: 'text'
    },
    label: String,
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
    },
    inputId() {
      return this.name || String(Math.floor(Math.random() * 100000))
    }
  },
  methods: {},
  mounted() {}
}
</script>