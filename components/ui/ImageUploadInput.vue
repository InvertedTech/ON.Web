<template>
  <div class="w-full h-full rounded-3.75xl bg-grayscale-300 text-grayscale-600 hover:text-white cursor-pointer relative overflow-hidden" @click.stop="click">
    <input ref="fileinput" type="file" :accept="accept" class="hidden" @change="inputChanged" />
    <img v-if="sampleDataUri" :src="sampleDataUri" class="w-full absolute top-0 left-0 object-cover" />
    <img v-else-if="existingImage" :src="existingImage" class="w-full absolute top-0 left-0 object-cover" />

    <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-grayscale-300 hover:bg-white/10" :class="sampleDataUri || existingImage ? 'opacity-0 hover:opacity-100' : ''">
      <span class="material-icons-outlined text-4xl">cloud_upload</span>
    </div>
    <!-- TODO: show loading indicator -->
  </div>
</template>

<script>
export default {
  props: {
    existingImage: {
      type: String,
      default: null
    },
    accept: {
      type: String,
      default: '.png, .jpg, .jpeg'
    }
  },
  data() {
    return {
      processing: false,
      sampleDataUri: null
    }
  },
  computed: {},
  methods: {
    click() {
      if (this.processing) return
      this.$refs.fileinput.click()
    },
    inputChanged(e) {
      if (!e.target || !e.target.files || this.processing) return
      var _files = Array.from(e.target.files)
      if (_files && _files.length) {
        var file = _files[0]
        this.sendUpdatedImage(file)
      }
    },
    convertToDataUri(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = reject
      })
    },
    async sendUpdatedImage(file) {
      this.processing = true
      const dataUri = await this.convertToDataUri(file)
      this.sampleDataUri = dataUri

      const base64 = dataUri.split(',')[1]

      const payload = {
        Data: base64,
        MimeType: file.type
      }
      this.processing = false
      this.$emit('change', payload)
    }
  },
  mounted() {}
}
</script>