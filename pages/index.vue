<template>
  <div class="w-full">
    <h4 class="text-xl font-bold mb-4 px-6">Top Articles for you</h4>
    <div class="flex">
      <div class="flex-grow px-6">
        <div class="flex -mx-1">
          <div class="rounded-full py-0.5 px-4 bg-skyblue shadow-sm text-white mx-1 text-md">All</div>
          <div class="rounded-full py-0.5 px-4 bg-white shadow-sm mx-1 text-md">Technology</div>
        </div>

        <div class="py-3">
          <div class="articles-wrapper -mx-2">
            <div class="flex flex-wrap">
              <cards-article-card v-for="article in articles" :key="article.ContentID" :article="article" />
            </div>
          </div>
        </div>
      </div>
      <div class="w-72 min-w-72 px-6">
        <div class="w-full rounded-xl bg-white shadow-sm p-2">
          <div class="flex items-center border-b border-gray border-opacity-20 py-1">
            <p class="text-md font-medium">Some Category</p>
            <div class="flex-grow" />
            <span class="material-icons-outlined text-xl">settings</span>
          </div>
          <p class="text-xs py-1 text-text text-opacity-60 leading-5">
            The price of petrol remained unchanged on July 6 after reaching a new record high on the previous day, according to a price notification by state-owned fuel retailers. The diesel price remained stable for the second consecutive day.
            <br /><br />The increase on July 5, 35th in two months, took the petrol price in Delhi closer to Rs 100 per litre-mark. The petrol price in the national capital soared to Rs 99.9 a litre and diesel was priced at Rs 89.4 per litre, according to Bharat Petroleum's price listing.
          </p>
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
  width: calc(100% + 16px);
}
</style>
