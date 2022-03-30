<template>
  <div class="w-full h-full">
    <div class="w-full h-full bg-accent">
      <div class="w-full h-full max-w-4xl mx-auto flex items-center">
        <div class="w-full md:w-1/2 p-4 md:p-16">
          <h1 class="text-6xl font-bold mb-2">Login</h1>
          <p class="italic font-thin text-2xl">Subheadline lorem ipsum dolor sit amet consecutre</p>
        </div>
        <div class="flex-grow flex items-center justify-center">
          <form @submit.prevent="submitLogin">
            <div class="bg-white rounded-2xl p-6 shadow-lg">
              <ui-text-input-with-label v-model="username" label="User Name" class="mb-4" />
              <ui-text-input-with-label v-model="password" type="password" label="Password" class="mb-6" />

              <ui-btn type="submit">Submit</ui-btn>
            </div>
          </form>
        </div>
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
  computed: {},
  methods: {
    submitLogin() {
      if (!this.username || !this.password) {
        console.error('Invalid input')
        return
      }
      this.processing = true

      const payload = {
        UserName: this.username,
        Password: this.password
      }
      this.$axios
        .$post('/api/auth/login', payload)
        .then((res) => {
          console.log(res)
          this.$store.commit('auth/setToken', res.BearerToken)

          this.$store.dispatch('auth/fetchUser').then((success) => {
            if (success) {
              this.$router.replace('/')
            }
            this.processing = false
          })
        })
        .catch((error) => {
          console.error(error)
          this.processing = false
        })
    }
  },
  mounted() {}
}
</script>