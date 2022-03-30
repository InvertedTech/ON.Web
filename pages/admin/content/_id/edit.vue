<template>
  <div class="w-full page-wrapper">
    <div class="p-8 md:p-16 max-w-4xl mx-auto">
      <div class="flex items-center mb-6">
        <ui-icon-btn icon="arrow_back" class="-ml-2" to="/content" />
        <h1 class="text-2xl font-bold pl-2">Edit Article</h1>
        <span class="flex-grow" />
        <span class="text-xs font-semibold pl-2">{{ article.ContentID }}</span>
      </div>
      <form @submit.prevent="submit">
        <ui-text-input-with-label v-model="article.Title" name="title" label="Title" class="mb-4" />
        <ui-text-input-with-label v-model="article.Subtitle" name="subtitle" label="Subtitle" class="mb-4" />
        <ui-dropdown v-model="article.SubscriptionLevel" :items="subscriptionLevels" name="level" label="Level" class="mb-4" />
        <ui-text-input-with-label v-model="article.Author" name="author" label="Author" class="mb-4" />
        <ui-rich-text-editor v-model="article.Body" name="body" label="Body" class="mb-4" />
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
  async asyncData({ $axios, params, redirect }) {
    var record = await $axios
      .$get(`/api/cms/content/${params.id}`)
      .then((res) => res.Content.Public)
      .catch((error) => {
        console.error('Failed', error)
        return null
      })
    if (!record) return redirect(`/content?error=Article not found`)
    return {
      article: {
        ...record
      }
    }
  },
  data() {
    return {
      processing: false
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
      return this.article.Title && this.article.Author
    },
    submit() {
      if (!this.validate()) return
      this.processing = true
      console.log('Submitting form')
      const payload = {
        Content: {
          Public: {
            CreatedOnUTC: String(Date.now()),
            ModifiedOnUTC: String(Date.now()),
            PublishedOnUTC: String(0),
            ...this.article
          }
        }
      }

      this.$axios
        .$post('/api/cms/content', payload)
        .then((res) => {
          console.log('res', res)
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