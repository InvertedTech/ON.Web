<template>
  <div class="w-full">
    <div class="w-full rounded-md bg-white/5 mb-6">
      <div class="w-full rounded-md p-4 text-center bg-white/5">
        <h1 class="text-lg font-medium">Channels</h1>
      </div>
      <div class="p-4">
        <div class="flex flex-wrap">
          <template v-for="channel in NewChannels">
            <div :key="channel.ChannelId" class="w-full md:max-w-[50%] h-20 p-1">
              <div class="h-full flex items-center p-4 bg-bg border border-white/10 rounded-md">
                <p class="text-white/80 text-base font-medium">{{ channel.DisplayName }}</p>
                <div class="flex-grow" />
                <ui-icon-btn icon="delete" icon-size="22px" class="text-grayscale-800 hover:text-red-400" @click.stop="clickRemoveChannel(channel)" />
              </div>
            </div>
          </template>
          <div class="w-full md:max-w-[50%] h-20 p-1">
            <form @submit.prevent="submitNewChannel" class="h-full flex items-center px-2 bg-bg border border-white/10 rounded-md">
              <div class="relative w-full">
                <input v-model="NewChannelName" type="text" placeholder="Add New Channel.." class="text-input focus:outline-none w-full h-full text-text bg-transparent p-2 rounded-md placeholder:italic" />
                <div class="absolute right-0 top-0 flex items-center h-full px-2">
                  <ui-icon-btn icon="add_circle_outline" type="submit" icon-size="22px" :class="NewChannelName ? 'text-text' : 'text-grayscale-800'" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full rounded-md bg-white/5 mb-6">
      <div class="w-full rounded-md p-4 text-center bg-white/5">
        <h1 class="text-lg font-medium">Categories</h1>
      </div>
      <div class="p-4">
        <div class="flex flex-wrap">
          <template v-for="category in NewCategories">
            <div :key="category.CategoryId" class="w-full md:max-w-[50%] h-20 p-1">
              <div class="h-full flex items-center p-4 bg-bg border border-white/10 rounded-md">
                <p class="text-white/80 text-base font-medium">{{ category.DisplayName }}</p>
                <div class="flex-grow" />
                <ui-icon-btn icon="delete" icon-size="22px" class="text-grayscale-800 hover:text-red-400" @click.stop="clickRemoveCategory(category)" />
              </div>
            </div>
          </template>
          <div class="w-full md:max-w-[50%] h-20 p-1">
            <form @submit.prevent="submitNewCategory" class="h-full flex items-center px-2 bg-bg border border-white/10 rounded-md">
              <div class="relative w-full">
                <input v-model="NewCategoryName" type="text" placeholder="Add New Category.." class="text-input focus:outline-none w-full h-full text-text bg-transparent p-2 rounded-md placeholder:italic" />
                <div class="absolute right-0 top-0 flex items-center h-full px-2">
                  <ui-icon-btn icon="add_circle_outline" type="submit" icon-size="22px" :class="NewCategoryName ? 'text-text' : 'text-grayscale-800'" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import uniqueSlug from 'unique-slug'

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
    clickRemoveCategory(category) {
      const payload = {
        message: `Delete category ${category.DisplayName}?`,
        yesButtonText: 'Delete',
        yesButtonColor: 'error',
        callback: (confirmed) => {
          if (confirmed) {
            this.removeCategory(category.CategoryId)
          }
        },
        type: 'yesNo'
      }
      this.$store.commit('globals/setConfirmPrompt', payload)
    },
    removeCategory(categoryId) {
      this.processing = true
      this.$axios
        .$post(`/api/settings/category/delete/${categoryId}`)
        .then((data) => {
          this.NewCategories = this.NewCategories.filter((c) => c.CategoryId !== categoryId)
        })
        .catch((error) => {
          console.error('Failed', error)
          this.$toast.error('Failed to remove category')
        })
        .finally(() => {
          this.processing = false
        })
    },
    submitNewCategory() {
      if (!this.NewCategoryName) return

      const payload = {
        ParentCategoryId: '',
        DisplayName: this.NewCategoryName,
        UrlStub: uniqueSlug(this.NewCategoryName)
      }

      this.processing = true
      this.$axios
        .$post(`/api/settings/category/create`, payload)
        .then((data) => {
          this.NewCategories.push({
            ...data
          })
          this.NewCategoryName = ''
        })
        .catch((error) => {
          console.error('Failed', error)
          this.$toast.error('Failed to create category')
        })
        .finally(() => {
          this.processing = false
        })
    },
    clickRemoveChannel(channel) {
      const payload = {
        message: `Delete channel ${channel.DisplayName}?`,
        yesButtonText: 'Delete',
        yesButtonColor: 'error',
        callback: (confirmed) => {
          if (confirmed) {
            this.removeChannel(channel.ChannelId)
          }
        },
        type: 'yesNo'
      }
      this.$store.commit('globals/setConfirmPrompt', payload)
    },
    removeChannel(channelId) {
      this.processing = true
      this.$axios
        .$post(`/api/settings/channel/delete/${channelId}`)
        .then(() => {
          this.NewChannels = this.NewChannels.filter((ch) => ch.ChannelId !== channelId)
        })
        .catch((error) => {
          console.error('Failed', error)
          this.$toast.error('Failed to remove channel')
        })
        .finally(() => {
          this.processing = false
        })
    },
    submitNewChannel() {
      if (!this.NewChannelName) return

      const payload = {
        ParentChannelId: '',
        DisplayName: this.NewChannelName,
        UrlStub: uniqueSlug(this.NewChannelName)
      }

      this.processing = true
      this.$axios
        .$post(`/api/settings/channel/create`, payload)
        .then((data) => {
          this.NewChannels.push({
            ...data
          })
          this.NewChannelName = ''
        })
        .catch((error) => {
          console.error('Failed', error)
          this.$toast.error('Failed to create category')
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