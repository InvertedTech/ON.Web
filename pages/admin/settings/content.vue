<template>
  <div class="w-full">
    <div class="flex flex-wrap mb-4">
      <div class="w-full md:w-1/2 pr-4 border-r border-r-white/10">
        <h2 class="text-xl font-bold text-text mb-4">Channels</h2>

        <p v-if="!NewChannels.length" class="text-lg font-medium text-grayscale-900 text-center py-4">No Channels</p>

        <template v-for="channel in NewChannels">
          <div :key="channel.ChannelId" class="flex items-center p-4 border border-white/10">
            <p class="text-white/80 text-base font-medium">{{ channel.DisplayName }}</p>
            <div class="flex-grow" />
            <ui-icon-btn icon="delete" icon-size="22px" class="text-grayscale-800 hover:text-red-400" @click="removeChannel(channel.ChannelId)" />
          </div>
        </template>

        <form @submit.prevent="submitNewChannel" class="flex items-center py-4">
          <ui-text-input v-model="NewChannelName" placeholder="New Channel Name" class="mr-2" />
          <!-- <ui-btn :disabled="!NewChannelName" type="submit">Add</ui-btn> -->
        </form>
      </div>
      <div class="w-full md:w-1/2 pl-4">
        <h2 class="text-xl font-bold text-text mb-4">Categories</h2>

        <p v-if="!NewCategories.length" class="text-lg font-medium text-grayscale-900 text-center py-4">No Categories</p>

        <template v-for="category in NewCategories">
          <div :key="category.CategoryId" class="flex items-center p-4 border border-white/10">
            <p class="text-white/80 text-base font-medium">{{ category.DisplayName }}</p>
            <div class="flex-grow" />
            <ui-icon-btn icon="delete" icon-size="22px" class="text-grayscale-800 hover:text-red-400" @click="removeCategory(category.CategoryId)" />
          </div>
        </template>

        <form @submit.prevent="submitNewCategory" class="flex items-center py-4">
          <ui-text-input v-model="NewCategoryName" placeholder="New Category Name" class="mr-2" />
          <!-- <ui-btn :disabled="!NewCategoryName" type="submit">Add</ui-btn> -->
        </form>
      </div>
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
      NewChannels: [],
      NewCategories: [],
      NewMenu: {
        AudioMenuLinkName: '',
        PictureMenuLinkName: '',
        VideoMenuLinkName: '',
        WrittenMenuLinkName: ''
      },
      NewChannelName: '',
      NewCategoryName: ''
    }
  },
  computed: {
    CMS() {
      return this.$store.getters['settings/CMS'] || {}
    },
    Channels() {
      return this.CMS.Channels || []
    },
    Categories() {
      return this.CMS.Categories || []
    },
    Menu() {
      return this.CMS.Menu || {}
    }
  },
  methods: {
    removeCategory(categoryId) {
      this.NewCategories = this.NewCategories.filter((c) => c.CategoryId !== categoryId)
    },
    submitNewCategory() {
      if (!this.NewCategoryName) return

      this.NewCategories.push({
        CategoryId: this.$uniqueId(),
        DisplayName: this.NewCategoryName
      })
      this.NewCategoryName = ''
    },
    removeChannel(channelId) {
      this.NewChannels = this.NewChannels.filter((ch) => ch.ChannelId !== channelId)
    },
    submitNewChannel() {
      if (!this.NewChannelName) return

      this.NewChannels.push({
        ChannelId: this.$uniqueId(),
        DisplayName: this.NewChannelName
      })
      this.NewChannelName = ''
    },
    save() {
      this.processing = true
      const payload = {
        Data: {
          Channels: this.NewChannels.map((c) => ({ ...c })),
          Categories: this.NewCategories.map((c) => ({ ...c })),
          Menu: { ...this.NewMenu }
        }
      }
      this.$axios
        .$post('/api/settings/cms/public', payload)
        .then((res) => {
          console.log('Response', res)
          this.$toast.success('Settings saved successfully')
          this.$store.commit('settings/updateCMS', payload.Data)
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
      this.NewChannels = this.Channels.map((c) => ({ ...c }))
      this.NewCategories = this.Categories.map((c) => ({ ...c }))
      this.NewMenu = { ...this.Menu }
    }
  },
  mounted() {
    this.init()
  }
}
</script>