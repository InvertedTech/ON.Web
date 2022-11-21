<template>
  <div class="w-full">
    <label :for="inputId" class="mb-0.5 text-gray-300">{{ label }}</label>
    <ui-text-input ref="textInput" v-model="input" :type="type" :id="inputId" :readonly="readonly" @blur="blur" @keyup="keyup" />
    <span v-if="errorMessage" class="text-red-600 text-xs pl-1">{{ errorMessage }}</span>
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
    readonly: Boolean,
    validation: {
      type: Function,
      default: () => ''
    }
  },
  data() {
    return {
      errorMessage: ''
    }
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
  methods: {
    validate() {
      if (this.validation) {
        this.errorMessage = this.validation(this.input)
      }
    },
    blur() {
      this.validate()

      this.$emit('blur')
    },
    keyup() {
      if (this.errorMessage) {
        this.validate()
      }
    }
  },
  mounted() {}
}
</script>