<template>
  <div :style="{ height }" class="relative">
    <input v-model="input" :type="type" :id="id" :readonly="readonly" :step="step" :placeholder="placeholder" class="text-input border border-stroke focus:border-grayscale-600 focus:outline-none w-full h-full text-text bg-primary focus:bg-grayscale-400" :style="{ padding, fontSize, borderRadius }" @blur="blur" @keyup="keyup" />

    <div v-if="input && clearable" class="pointer-events-none h-full absolute top-0 right-0 px-2 flex items-center">
      <span class="material-icons pointer-events-auto cursor-pointer" @click.stop="clearInput">close</span>
    </div>
    <div v-else-if="appendIcon" class="pointer-events-none h-full absolute top-0 right-0 px-2 flex items-center">
      <span class="material-icons">{{ appendIcon }}</span>
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
    placeholder: String,
    id: String,
    readonly: Boolean,
    clearable: Boolean,
    small: Boolean,
    appendIcon: String,
    step: String
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
    height() {
      if (this.small) return '32px'
      return '48px'
    },
    padding() {
      if (this.small) return '0px 8px'
      return '0px 16px'
    },
    fontSize() {
      if (this.small) return '14px'
      return '16px'
    },
    borderRadius() {
      if (this.small) return '4px'
      return '8px'
    }
  },
  methods: {
    clearInput() {
      this.input = ''
    },
    blur() {
      this.$emit('blur')
    },
    keyup() {
      this.$emit('keyup')
    }
  },
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