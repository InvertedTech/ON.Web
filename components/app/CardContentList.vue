<template>
  <div id="cardcontent" class="w-full relative"></div>
</template>

<script>
import Vue from 'vue'
import PostListCard from '@/components/cards/PostListCard.vue'

export default {
  props: {
    posts: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      contentWidth: 0,
      cardsPerRow: 1,
      cardComponentRefs: [],
      cards: []
    }
  },
  computed: {},
  methods: {
    buildCard(post, index) {
      var w = Math.floor(this.contentWidth / this.cardsPerRow)
      var h = 176 // Temp hardcode

      var row = Math.floor(index / this.cardsPerRow)
      var col = index % this.cardsPerRow

      var x = col * w
      var y = row * h

      var cardHeight = h
      var cardWidth = 847 // Temp hardcode
      var offsetX = x
      var offsetY = y

      this.cards.push({
        x,
        y,
        post,
        w,
        h
      })

      var ComponentClass = Vue.extend(PostListCard)

      var instance = new ComponentClass({
        propsData: {
          post,
          index,
          width: cardWidth,
          height: cardHeight
        },
        created() {}
      })

      this.cardComponentRefs[index] = instance

      instance.$mount()
      instance.$el.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0px)`
      var el = document.getElementById('cardcontent')
      el.appendChild(instance.$el)
    },
    constructCards() {
      this.cardComponentRefs = new Array(this.posts.length)
      for (let i = 0; i < this.posts.length && i < 15; i++) {
        console.log('Build post', this.posts[i])
        this.buildCard(this.posts[i], i)
      }

      window.cardcontent.style.height = `${this.posts.length * 300 + 100}px`
    },
    destroyCards() {
      this.cardComponentRefs.forEach((ref) => {
        if (ref) {
          if (ref.$el) {
            ref.$el.remove()
          }
        }
      })
      this.cards = []
    },
    resize() {
      this.contentWidth = window.cardcontent.clientWidth
      this.destroyCards()
      this.constructCards()
    }
  },
  updated() {
    this.contentWidth = window.cardcontent.clientWidth
    if (!this.cardComponentRefs.length) {
      this.constructCards()
    }
  },
  mounted() {
    window.addEventListener('resize', this.resize)

    this.contentWidth = window.cardcontent.clientWidth
    this.constructCards()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize)
  }
}
</script>