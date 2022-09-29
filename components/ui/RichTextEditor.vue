<template>
  <div v-if="isReady">
    <label v-if="label" class="text-gray-300" :for="inputId">{{ label }}</label>
    <editor
      v-model="input"
      :id="inputId"
      api-key="no-api-key"
      :init="{
        height: 300,
        skin: 'tinymce-5-dark',
        branding: false,
        menubar: false,
        toolbar: 'undo redo | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           outdent indent | removeformat'
      }"
    />
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
var isLoaded = false
export default {
  props: {
    value: String,
    label: String,
    name: String
  },
  components: {
    Editor
  },
  data() {
    return {
      isReady: false
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
    injectScript() {
      if (isLoaded) {
        this.isReady = true
        return
      }
      var head = document.getElementsByTagName('head')[0]
      var script = document.createElement('script')
      script.type = 'text/javascript'
      script.onload = () => {
        this.isReady = true
      }
      script.src = '/libs/tinymce/tinymce.min.js'
      head.appendChild(script)
      isLoaded = true
    }
  },
  mounted() {
    this.injectScript()
  }
}
</script>