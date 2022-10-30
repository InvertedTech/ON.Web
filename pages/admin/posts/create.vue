<template>
  <div class="w-full p-6">
    <div class="flex items-center mb-6">
      <ui-icon-btn icon="arrow_back" class="-ml-2" to="/admin/posts" />
      <h1 class="text-2xl font-bold pl-2">Create Post</h1>
    </div>
    <div class="w-full max-w-3xl mx-auto">
      <div class="flex justify-center items-center mb-8">
        <ui-icon-toggle-btn icon="play_circle" :selected="postType === 'video'" class="mx-4" @click="setPostType('video')" />
        <ui-icon-toggle-btn icon="headphones" :selected="postType === 'audio'" class="mx-4" @click="setPostType('audio')" />
        <ui-icon-toggle-btn icon="article" :selected="postType === 'written'" class="mx-4" @click="setPostType('written')" />
      </div>
      <form @submit.prevent="submit">
        <ui-text-input-with-label v-model="newPost.Title" name="title" label="Title" class="mb-4" />
        <div class="flex items-center -mx-2">
          <div class="w-full md:w-1/2 px-2">
            <ui-text-input-with-label v-model="newPost.Author" name="author" label="Author" class="mb-4" />
          </div>
          <div class="w-full md:w-1/2 px-2">
            <ui-dropdown v-model="newPost.SubscriptionLevel" :items="subscriptionTierItems" name="level" label="Level" class="mb-4" />
          </div>
        </div>
        <div class="flex items-center flex-wrap -mx-2">
          <div class="w-full md:w-1/2 px-2">
            <ui-dropdown-multi v-model="newPost.ChannelIds" :items="Channels" item-key="ChannelId" item-text="DisplayName" label="Channels" no-items-text="No Channels" class="mb-4" />
          </div>
          <div class="w-full md:w-1/2 px-2">
            <ui-dropdown-multi v-model="newPost.CategoryIds" :items="Categories" item-key="CategoryId" item-text="DisplayName" label="Categories" no-items-text="No Categories" class="mb-4" />
          </div>
          <div class="w-full px-2">
            <ui-multi-select v-model="newPost.Tags" :items="newPost.Tags" label="Tags" class="mb-4" />
          </div>
        </div>
        <ui-textarea-with-label v-model="newPost.Description" name="description" label="Description" class="mb-4" />

        <div v-if="postType === 'written'">
          <div class="w-full mb-4">
            <div class="mb-1 flex justify-between items-center">
              <p class="text-gray-300">Feature Image</p>
              <p class="text-gray-400 text-sm">2:1 aspect ratio</p>
            </div>
            <div class="w-full aspect-[2]">
              <ui-asset-upload-input v-model="newPost.FeaturedImageAssetID" />
            </div>
          </div>

          <ui-rich-text-editor v-model="Written.HtmlBody" name="body" label="Body" class="mb-4" />
        </div>
        <div v-else-if="postType === 'video'">
          <ui-text-input-with-label v-model="newPostVideoURL" name="video" label="Youtube Video URL or ID" class="mb-4" @blur="validateVideoURL" />
        </div>
        <div v-else-if="postType === 'audio'">
          <div class="flex flex-col items-center">
            <p class="text-gray-100 text-sm my-2">Upload Audio</p>
            <div class="w-28 min-w-28 h-28 flex items-center justify-center rounded-4xl text-grayscale-500 bg-grayscale-300 hover:bg-grayscale-400 hover:text-grayscale-600 cursor-pointer">
              <span class="material-icons-outlined text-4xl">cloud_upload</span>
            </div>
          </div>
        </div>
        <div class="flex justify-end py-4">
          <ui-btn type="submit">Save</ui-btn>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      processing: false,
      postType: 'written',
      newPost: {
        Title: '',
        Description: '',
        SubscriptionLevel: 0,
        Author: '',
        Tags: [],
        ChannelIds: [],
        CategoryIds: [],
        FeaturedImageAssetID: null
      },
      Written: {
        HtmlBody: ''
      },
      Video: {
        HtmlBody: '',
        IsLiveStream: false,
        IsLive: false,
        YoutubeVideoId: ''
      },
      Audio: {
        HtmlBody: '',
        AudioAssetID: ''
      },
      newPostVideoURL: null
    }
  },
  computed: {
    SubscriptionTiers() {
      return this.$store.getters['settings/SubscriptionTiers']
    },
    subscriptionTierItems() {
      return this.SubscriptionTiers.map((sub, index) => {
        return {
          text: sub.Name,
          value: index
        }
      })
    },
    CMS() {
      return this.$store.getters['settings/CMS'] || {}
    },
    Channels() {
      return this.CMS.Channels || []
    },
    Categories() {
      return this.CMS.Categories || []
    },
    isWritten() {
      return this.postType === 'written'
    },
    isVideo() {
      return this.postType === 'video'
    }
  },
  methods: {
    validateVideoURL() {
      if (!this.newPostVideoURL) {
        this.Video.YoutubeVideoId = ''
        return
      }
      if (this.newPostVideoURL.length === 11) {
        // TODO: Temp lazy validation
        this.Video.YoutubeVideoId = this.newPostVideoURL
      } else {
        // Source: https://stackoverflow.com/a/71010058/7431543
        let regex = /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm
        let results = regex.exec(this.newPostVideoURL)
        console.log('Results', results)
        if (results && results.length >= 4) {
          this.Video.YoutubeVideoId = results[3]
        } else {
          this.$toast.error('invalid youtube url') // TEMP: show error on input
        }
      }
    },
    setPostType(postType) {
      this.postType = postType
    },
    validate() {
      return this.newPost.Title && this.newPost.Author
    },
    submit() {
      if (!this.validate()) return
      this.processing = true
      console.log('Submitting form')
      const payload = {
        Public: {
          ...this.newPost
        },
        Private: {}
      }
      if (this.isWritten) {
        payload.Public.Written = this.Written
        payload.Private.Written = {}
      } else if (this.isVideo) {
        payload.Public.Video = this.Video
        payload.Private.Video = {}
      } else {
        payload.Public.Audio = this.Audio
        payload.Private.Audio = {}
      }

      this.$axios
        .$post('/api/cms/admin/content', payload)
        .then((res) => {
          console.log('res', res)
          this.$toast.success('Success!')
          this.$router.push('/admin/posts')
          this.processing = false
        })
        .catch((error) => {
          console.error('Failed', error)
          this.processing = false
        })
    }
  },
  mounted() {
    this.newPost.Author = this.$store.getters['auth/DisplayName']
  }
}
</script>