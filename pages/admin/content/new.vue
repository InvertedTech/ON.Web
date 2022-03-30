<template>
  <div class="w-full page-wrapper">
    <div class="p-8 md:p-16 max-w-4xl mx-auto">
      <div class="flex items-center mb-6">
        <ui-icon-btn icon="arrow_back" class="-ml-2" to="/content" />
        <h1 class="text-2xl font-bold pl-2">New Article</h1>
      </div>
      <form @submit.prevent="submit">
        <ui-text-input-with-label v-model="newArticle.Title" name="title" label="Title" class="mb-4" />
        <ui-text-input-with-label v-model="newArticle.Subtitle" name="subtitle" label="Subtitle" class="mb-4" />
        <ui-dropdown v-model="newArticle.SubscriptionLevel" :items="subscriptionLevels" name="level" label="Level" class="mb-4" />
        <ui-text-input-with-label v-model="newArticle.Author" name="author" label="Author" class="mb-4" />
        <ui-rich-text-editor v-model="newArticle.Body" name="body" label="Body" class="mb-4" />
        <div class="flex justify-end py-4">
          <ui-btn type="submit">Submit</ui-btn>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      processing: false,
      newArticle: {
        Title: '',
        Subtitle: '',
        SubscriptionLevel: 0,
        Author: '',
        Body: ''
      }
    }
  },
  computed: {
    subscriptionLevels() {
      return [
        {
          text: 'None - $0',
          value: 0
        },
        {
          text: 'Member - $5',
          value: 5
        },
        {
          text: 'Awesome Member - $10',
          value: 10
        },
        {
          text: 'Big Spender - $20',
          value: 20
        },
        {
          text: 'King - $100',
          value: 100
        }
      ]
    }
  },
  methods: {
    validate() {
      return this.newArticle.Title && this.newArticle.Author
    },
    submit() {
      if (!this.validate()) return
      this.processing = true
      console.log('Submitting form')
      const payload = {
        ...this.newArticle
      }

      this.$axios
        .$post('/api/cms/content', payload)
        .then((res) => {
          console.log('res', res)
          this.$toast.success('Success!')
          this.$router.push('/admin/content')
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