<template>
  <div class="w-full h-full rounded-3.75xl bg-grayscale-300 text-grayscale-600 hover:text-white cursor-pointer relative overflow-hidden" @click.stop="click">
    <input ref="fileinput" type="file" :accept="accept" class="hidden" @change="inputChanged" />
    <img v-if="assetType === 'Image' && assetSrc" :src="assetSrc" class="w-full absolute top-0 left-0 object-cover" />
    <div v-else-if="assetType === 'Audio' && assetSrc" class="w-full h-full absolute top-0 left-0 flex items-center justify-center">
      <span class="material-icons text-6xl text-grayscale-600">music_note</span>
    </div>

    <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-grayscale-300 hover:bg-white/10 transition-colors" :class="assetSrc ? 'opacity-0 hover:opacity-100' : ''">
      <span class="material-icons-outlined text-4xl">cloud_upload</span>
    </div>
    <!-- TODO: show loading indicator -->
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    accept: {
      type: String,
      default: '.png, .jpg, .jpeg'
    },
    assetType: {
      type: String,
      default: 'Image'
    }
  },
  data() {
    return {
      processing: false
    }
  },
  computed: {
    assetId: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    assetSrc() {
      if (!this.assetId) return null
      return `${this.$config.baseURL}/api/cms/asset/${this.assetId}/data`
    }
  },
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
        [this.assetType]: {
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
          this.$emit('asset', assetResponse.Record[this.assetType].Public)
          this.assetId = assetResponse.Record[this.assetType].Public.AssetID
        })
        .catch((error) => {
          console.error('Failed to upload asset', error)
          this.$toast.error('Failed to upload')
        })
        .finally(() => {
          this.processing = false
        })
    }
  },
  mounted() {}
}
</script>