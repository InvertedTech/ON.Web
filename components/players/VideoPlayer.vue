<template>
  <iframe width="100%" :src="`https://www.youtube.com/embed/${YoutubeVideoId}`" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="aspect-video"></iframe>
</template>

<script>
export default {
  props: {
    video: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {}
  },
  computed: {
    YoutubeVideoId() {
      return this.video.YoutubeVideoId
    }
  }
}
</script>