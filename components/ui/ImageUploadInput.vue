<template>
  <div class="w-full h-full rounded-3.75xl bg-grayscale-300 text-grayscale-600 hover:text-white hover:bg-grayscale-400 flex items-center justify-center cursor-pointer" @click.stop="click">
    <span class="material-icons-outlined text-4xl">cloud_upload</span>
    <input ref="fileinput" type="file" :accept="accept" class="hidden" @change="inputChanged" />

    <!-- TODO: show loading indicator -->
  </div>
</template>

<script>
export default {
  props: {
    accept: {
      type: String,
      default: '.png, .jpg, .jpeg'
    }
  },
  data() {
    return {
      processing: false
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
        this.uploadAssetFromFile(file)
      }
    },
    convertToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result.split(',')[1])
        reader.onerror = reject
      })
    },
    async uploadAssetFromFile(file) {
      this.processing = true
      const base64 = await this.convertToBase64(file)
      const payload = {
        Image: {
          Public: {
            Data: base64,
            MimeType: file.type
          }
        }
      }
      console.log('Uploading asset with payload', payload)
      this.$axios
        .$post(`/api/cms/admin/asset`, payload)
        .then((assetResponse) => {
          console.log('Asset Response', assetResponse)
          this.$emit('asset', assetResponse.Record.Image.Public)
        })
        .catch((error) => {
          console.error('Failed to upload asset', error)
          this.$toast.error('Failed to upload image')
        })
        .finally(() => {
          this.processing = false
        })
    }
  },
  mounted() {}
}
</script>