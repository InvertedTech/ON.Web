<template>
  <div class="w-full">
    <ui-text-input-with-label v-model="NewPersonalization.Title" :disabled="processing" label="Site Title" class="mb-4" />

    <ui-textarea-with-label v-model="NewPersonalization.MetaDescription" :disabled="processing" label="Meta Description" class="mb-4" />

    <div class="w-44 h-44 mx-auto">
      <p class="mb-1 text-gray-300">Logo</p>
      <ui-asset-upload-input v-model="NewPersonalization.ProfileImageAssetId" />
    </div>

    <div class="flex justify-end py-4">
      <ui-btn :loading="processing" @click.stop="save">Save</ui-btn>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      processing: false,
      NewPersonalization: {
        Title: '',
        MetaDescription: '',
        ProfileImageAssetId: null
      }
    }
  },
  computed: {
    Personalization() {
      return this.$store.getters['settings/Personalization']
    }
  },
  methods: {
    save() {
      this.processing = true
      const payload = {
        Data: {
          ...this.NewPersonalization
        }
      }
      this.$axios
        .$post('/api/settings/personalization/public', payload)
        .then((res) => {
          console.log('Response', res)
          this.$toast.success('Settings saved successfully')
          this.$store.commit('settings/updatePersonalization', payload.Data)
        })
        .catch((error) => {
          console.error('Failed', error)
          this.$toast.error('Failed to save')
        })
        .finally(() => {
          this.processing = false
        })
    },
    init() {
      this.NewPersonalization.Title = this.Personalization.Title || ''
      this.NewPersonalization.MetaDescription = this.Personalization.MetaDescription || ''
      this.NewPersonalization.ProfileImageAssetId = this.Personalization.ProfileImageAssetId || null
    }
  },
  mounted() {
    this.init()
  }
}
</script>