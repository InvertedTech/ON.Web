<template>
  <div class="w-full">
    <div class="hero-container w-full bg-accent flex items-center">
      <div class="p-16 max-w-4xl">
        <h1 class="text-6xl font-bold mb-2">Headline Lorem ipsum dsolor sit amet consecetuer</h1>
        <p class="italic font-thin text-2xl">Subheadline lorem ipsum dolor sit amet consecutre</p>
      </div>
    </div>
    <div class="p-4 md:p-16 max-w-6xl mx-auto">
      <h2 class="text-4xl font-bold mb-8">Featured Articles</h2>

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
  name: 'index',
  data() {
    return {
      articles: []
    }
  },
  methods: {
    load() {
      this.$axios
        .$get('/api/cms/content')
        .then((rs) => {
          console.log(rs)
          this.articles = rs.Records.slice(0, 3)
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
.hero-container {
  height: 500px;
}
.articles-wrapper {
  width: calc(100% + 32px);
}
</style>
