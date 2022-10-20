<template>
  <div class="w-full p-6">
    <div class="flex items-center mb-6">
      <ui-icon-btn icon="arrow_back" class="-ml-2" to="/admin/posts" />
      <h1 class="text-2xl font-bold pl-2">Update Post</h1>
    </div>
    <div class="w-full max-w-3xl mx-auto">
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
        <div class="flex items-center -mx-2">
          <div class="w-full md:w-1/2 px-2">
            <ui-multi-select v-model="newPost.Tags" :items="newPost.Tags" label="Tags" class="mb-4" />
          </div>
          <div class="w-full md:w-1/2 px-2"></div>
        </div>
        <ui-textarea-with-label v-model="newPost.Description" name="description" label="Description" class="mb-4" />

        <div v-if="postType === 'written'">
          <div class="w-full mb-4">
            <p class="mb-1 text-center text-gray-300">Feature Image</p>
            <div class="w-full aspect-[3.333]">
              <ui-image-upload-input v-model="newPost.FeaturedImageAssetID" />
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
  async asyncData({ params, app, redirect }) {
    const content = await app.$axios.$get(`/api/cms/admin/content/${params.id}`).catch((error) => {
      console.error('Failed to get content', error)
      return null
    })
    if (!content || !content.Record) {
      return redirect('/admin/posts')
    }
    return {
      content: content.Record
    }
  },
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
    isWritten() {
      return this.postType === 'written'
    },
    isVideo() {
      return this.postType === 'video'
    },
    PublicContent() {
      return this.content.Public || {}
    },
    PublicContentData() {
      return this.PublicContent.Data || {}
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
        .$post(`/api/cms/admin/content/${this.PublicContent.ContentID}`, payload)
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
    },
    init() {
      this.newPost = {
        Title: this.PublicContentData.Title,
        Description: this.PublicContentData.Description,
        SubscriptionLevel: this.PublicContentData.SubscriptionLevel,
        Author: this.PublicContentData.Author,
        Tags: [...this.PublicContentData.Tags],
        FeaturedImageAssetID: this.PublicContentData.FeaturedImageAssetID
      }

      if (this.PublicContentData.Written) {
        this.Written = { ...this.PublicContentData.Written }
        this.postType = 'written'
      }
      if (this.PublicContentData.Video) {
        this.Video = { ...this.PublicContentData.Video }
        if (this.Video.YoutubeVideoId) {
          this.newPostVideoURL = this.Video.YoutubeVideoId
        }
        this.postType = 'video'
      }
      if (this.PublicContentData.Audio) {
        this.Audio = { ...this.PublicContentData.Audio }
        this.postType = 'audio'
      }
    }
  },
  mounted() {
    this.init()
  }
}
</script>