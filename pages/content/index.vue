<template>
  <div class="w-full page-wrapper">
    <div class="p-8 md:p-16 max-w-6xl mx-auto">
      <div class="flex items-center mb-6">
        <h1 class="text-2xl font-bold">Articles</h1>

        <div class="flex-grow" />
        <ui-btn to="/content/new">New Article</ui-btn>
      </div>
      <div class="articles-wrapper -mx-4">
        <div class="flex flex-wrap">
          <cards-article-card v-for="article in articles" :key="article.ContentID" :article="article" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articles: []
    }
  },
  computed: {},
  methods: {
    load() {
      this.$axios
        .$get('/api/cms/content')
        .then((rs) => {
          console.log(rs)
          this.articles = rs.Records
        })
        .catch((error) => {
          console.error('Failed', error)
        })
    }
  },
  mounted() {
    this.load()
  }
}
</script>

<style scoped>
.articles-wrapper {
  width: calc(100% + 32px);
}
</style>