<template>
  <div class="w-full">
    <label :for="inputId" class="mb-0.5 text-gray-300">{{ label }}</label>
    <ui-textarea v-model="input" :type="type" :id="inputId" :cols="cols" :readonly="readonly" />
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
    cols: {
      type: Number,
      default: 4
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