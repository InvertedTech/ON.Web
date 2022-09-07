<template>
  <button v-if="!to" class="flex items-center justify-center rounded-full hover:bg-white hover:bg-opacity-10 focus:outline-none" :style="{ width: size, minWidth: size, height: size }" @click="$emit('click', $event)">
    <span class="material-icons" :style="{ fontSize: iconSize }">
      {{ icon }}
    </span>
  </button>
  <nuxt-link v-else :to="to" class="flex items-center justify-center rounded-full hover:bg-white hover:bg-opacity-10 focus:outline-none" :style="{ width: size, minWidth: size, height: size }">
    <span class="material-icons" :style="{ fontSize: iconSize }">
      {{ icon }}
    </span>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    icon: String,
    to: String,
    size: {
      type: String,
      default: '40px'
    },
    iconSize: {
      type: String,
      default: '30px'
    }
  },
  data() {
    return {}
  },
  computed: {},
  methods: {},
  mounted() {}
}
</script>