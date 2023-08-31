<template>
  <div class="w-8 h-8 rounded-full overflow-hidden">
    <img :src="profileImageUrl" class="w-full h-full object-cover" />
  </div>
</template>

<script>
export default {
  props: {
    UserId: {
      type: String,
      default: () => null
    }
  },
  data() {
    return {}
  },
  computed: {
    profileImageUrl() {
      // Use current user if UserId is not passed in
      let userId = this.UserId || this.$store.getters['auth/UserId']
      return `${this.$config.baseURL}/api/auth/user/${userId}/profileimage`
    }
  },
  methods: {},
  mounted() {}
}
</script>