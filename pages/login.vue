<template>
  <div class="w-full h-full">
    <div class="w-full h-full bg-bg">
      <div class="w-full h-full max-w-md mx-auto flex items-center justify-center">
        <form @submit.prevent="submitLogin">
          <h1 class="text-3xl text-center font-bold mb-8">Log In</h1>
          <ui-text-input-with-label v-model="username" label="User Name" class="mb-4" />
          <ui-text-input-with-label v-model="password" type="password" label="Password" class="mb-2" />

          <div class="flex justify-end mb-8">
            <a href="#" class="text-right text-lg text-grayscale-700 hover:text-grayscale-900 hover:underline">Forgot password?</a>
          </div>

          <ui-btn type="submit" class="w-full text-xl mb-6" height="49px">Log In</ui-btn>

          <div class="flex justify-center">
            <nuxt-link to="/register" class="text-center text-lg text-grayscale-700 hover:text-grayscale-900 hover:underline">Register</nuxt-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'auth',
  middleware: 'unauthenticated',
  data() {
    return {
      username: '',
      password: '',
      processing: false
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    }
  },
  watch: {
    user: {
      immediate: true,
      handler(newVal) {
        if (newVal) this.$router.replace('/')
      }
    }
  },
  methods: {
    async submitLogin() {
      if (!this.username || !this.password) {
        console.error('Invalid input')
        this.$toast.error('Invalid input')
        return
      }
      this.processing = true

      const payload = {
        UserName: this.username,
        Password: this.password
      }
      const result = await this.$store.dispatch('auth/login', payload)
      if (!result || result.error) {
        this.$toast.error(result ? result.error : 'Failed to login')
      }
      this.processing = false
    }
  },
  mounted() {}
}
</script>