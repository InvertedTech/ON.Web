<template>
  <textarea ref="textarea" v-model="input" :id="id" :readonly="readonly" :disabled="disabled" :cols="cols" @focus="focus" @blur="blur" class="textarea border border-stroke focus:border-grayscale-600 focus:outline-none w-full text-text bg-primary px-5 py-3 focus:bg-grayscale-400 rounded-xl" />
</template>

<script>
export default {
  props: {
    value: String,
    cols: {
      type: Number,
      default: 4
    },
    id: String,
    readonly: Boolean,
    disabled: Boolean,
    focusOnMount: Boolean
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
  methods: {
    focus() {
      this.$emit('focus')
    },
    blur() {
      this.$emit('blur')
    }
  },
  mounted() {
    if (this.focusOnMount) {
      this.$nextTick(() => {
        if (this.$refs.textarea) {
          this.$refs.textarea.focus()
        }
      })
    }
  }
}
</script>

<style scoped>
.textarea:read-only {
  color: #aaa;
  background-color: #2d2d2d;
}
.textarea:read-only:focus {
  background-color: #444;
}
</style>