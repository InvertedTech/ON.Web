<template>
  <nuxt-link :to="to" class="w-full">
    <div class="w-full rounded-md flex items-center px-2 py-2 cursor-pointer my-2" :class="selected ? 'bg-accent text-primary' : 'text-grayscale-800 hover:bg-white hover:bg-opacity-10 hover:grayscale-500'">
      <span v-if="icon" class="material-icons-outlined text-3xl">{{ icon }}</span>
      <p class="font-medium" :class="small ? 'text-base px-2' : 'text-lg px-3'">{{ text }}</p>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    icon: String,
    text: String,
    to: String,
    selected: Boolean,
    small: Boolean
  },
  data() {
    return {}
  },
  computed: {},
  methods: {},
  mounted() {}
}
</script>