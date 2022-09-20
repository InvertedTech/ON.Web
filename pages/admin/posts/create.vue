<template>
  <div class="w-full p-6">
    <div class="flex items-center mb-6">
      <ui-icon-btn icon="arrow_back" class="-ml-2" to="/admin/posts" />
      <h1 class="text-2xl font-bold pl-2">New Post</h1>
    </div>
    <form @submit.prevent="submit">
      <ui-text-input-with-label v-model="newPost.Title" name="title" label="Title" class="mb-4" />
      <ui-dropdown v-model="newPost.SubscriptionLevel" :items="subscriptionTierItems" name="level" label="Level" class="mb-4" />
      <ui-text-input-with-label v-model="newPost.Author" name="author" label="Author" class="mb-4" />
      <ui-textarea-with-label v-model="newPost.Description" name="description" label="Description" class="mb-4" />
      <ui-rich-text-editor v-model="newPost.Written.HtmlBody" name="body" label="Body" class="mb-4" />
      <div class="flex justify-end py-4">
        <ui-btn type="submit">Submit</ui-btn>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      processing: false,
      newPost: {
        Title: '',
        Description: '',
        SubscriptionLevel: 0,
        Author: '',
        Written: {
          HtmlBody: ''
        }
      }
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
    }
  },
  methods: {
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
        Private: {
          Written: {}
        }
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
  mounted() {}
}
</script>