<template>
  <div ref="wrapper" class="modal modal-bg w-full h-full fixed top-0 left-0 bg-primary bg-opacity-75 flex items-center justify-center z-60 opacity-0">
    <div class="absolute top-0 left-0 right-0 w-full h-36 bg-gradient-to-t from-transparent via-black-500 to-black-700 opacity-90 pointer-events-none" />
    <div ref="content" class="relative text-white" :style="{ height: modalHeight, width: modalWidth }" v-click-outside="clickedOutside">
      <div class="px-4 w-full text-sm py-6 rounded-lg bg-bg shadow-lg">
        <p class="text-lg mb-6 mt-2 px-1" v-html="message" />

        <ui-text-input v-if="confirmDeleteText" v-model="confirmDeleteInput" :placeholder="confirmDeletePlaceholder" small class="mb-6" />

        <div class="flex px-1 items-center">
          <ui-btn-alt color="primary" @click="nevermind">Cancel</ui-btn-alt>
          <div class="flex-grow" />
          <ui-btn-alt :disabled="disableYesButton" :color="yesButtonColor" @click="confirm">{{ yesButtonText }}</ui-btn-alt>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      el: null,
      content: null,
      confirmDeleteInput: null
    }
  },
  watch: {
    show(newVal) {
      if (newVal) {
        this.setShow()
      } else {
        this.setHide()
      }
    }
  },
  computed: {
    show: {
      get() {
        return this.$store.state.globals.showConfirmPrompt
      },
      set(val) {
        this.$store.commit('globals/setShowConfirmPrompt', val)
      }
    },
    disableYesButton() {
      return this.confirmDeleteText && this.confirmDeleteInput !== this.confirmDeleteText
    },
    confirmPromptOptions() {
      return this.$store.state.globals.confirmPromptOptions || {}
    },
    message() {
      return this.confirmPromptOptions.message || ''
    },
    callback() {
      return this.confirmPromptOptions.callback
    },
    persistent() {
      return !!this.confirmPromptOptions.persistent
    },
    confirmDeleteText() {
      return this.confirmPromptOptions.confirmDeleteText
    },
    confirmDeletePlaceholder() {
      return `Type ${this.confirmDeleteText} to confirm`
    },
    yesButtonText() {
      return this.confirmPromptOptions.yesButtonText || 'Yes'
    },
    yesButtonColor() {
      return this.confirmPromptOptions.yesButtonColor || 'success'
    },
    modalHeight() {
      return 'unset'
    },
    modalWidth() {
      return '500px'
    }
  },
  methods: {
    clickedOutside(evt) {
      if (!this.show) return
      if (evt) {
        evt.stopPropagation()
        evt.preventDefault()
      }

      if (this.persistent) return
      if (this.callback) this.callback(false)
      this.show = false
    },
    nevermind() {
      if (this.callback) this.callback(false)
      this.show = false
    },
    confirm() {
      if (this.callback) this.callback(true)
      this.show = false
    },
    setShow() {
      this.confirmDeleteInput = null
      // this.$eventBus.$emit('showing-prompt', true)
      document.body.appendChild(this.el)
      setTimeout(() => {
        this.content.style.transform = 'scale(1)'
      }, 10)
    },
    setHide() {
      // this.$eventBus.$emit('showing-prompt', false)
      this.content.style.transform = 'scale(0)'
      this.el.remove()
    }
  },
  mounted() {
    this.el = this.$refs.wrapper
    this.content = this.$refs.content
    this.content.style.transform = 'scale(0)'
    this.content.style.transition = 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
    this.el.style.opacity = 1
    this.el.remove()
  },
  beforeDestroy() {
    if (this.show) {
      // this.$eventBus.$emit('showing-prompt', false)
    }
  }
}
</script>