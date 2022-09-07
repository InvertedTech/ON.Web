<template>
  <div class="w-full h-full">
    <div class="w-full h-full bg-bg">
      <div class="w-full h-full max-w-md mx-auto flex items-center justify-center">
        <form @submit.prevent="submit">
          <h1 class="text-3xl text-center font-bold mb-8">Register</h1>
          <ui-text-input-with-label v-model="username" label="User Name" class="mb-4" />
          <ui-text-input-with-label v-model="displayName" label="Display Name" class="mb-4" />
          <ui-text-input-with-label v-model="password" type="password" label="Password" class="mb-4" />
          <ui-text-input-with-label v-model="confirmPassword" type="password" label="Confirm Password" class="mb-8" />

          <ui-btn type="submit" class="w-full text-xl mb-6" height="49px">Register</ui-btn>

          <div class="flex justify-center">
            <nuxt-link to="/login" class="text-center text-lg text-grayscale-700 hover:text-grayscale-900 hover:underline">Log In</nuxt-link>
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
      displayName: '',
      password: '',
      confirmPassword: '',
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
    async submit() {
      if (!this.username || !this.password || !this.confirmPassword) {
        console.error('Invalid input')
        this.$toast.error('Invalid input')
        return
      }
      if (this.password !== this.confirmPassword) {
        this.$toast.error('Password mismatch')
        return
      }

      this.processing = true

      const payload = {
        UserName: this.username,
        DisplayName: this.displayName || this.username,
        Password: this.password
      }
      const result = await this.$store.dispatch('auth/register', payload)
      if (!result || result.error) {
        this.$toast.error(result ? result.error : 'Failed to register')
      }
      this.processing = false
    }
  },
  mounted() {}
}
</script>