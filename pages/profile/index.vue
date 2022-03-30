<template>
  <div class="w-full">
    <div class="p-4 md:p-6 max-w-6xl mx-auto bg-white rounded-xl shadow-sm">
      <div class="flex items-center mb-6">
        <h1 class="text-xl font-bold">Profile</h1>
        <div class="flex-grow" />
        <ui-btn outlined @click="logout">Logout</ui-btn>
      </div>
      <div class="w-full max-w-xl mx-auto">
        <form @submit.prevent="submit">
          <ui-text-input-with-label v-model="userCopy.UserName" label="User Name" readonly class="mb-4" />
          <ui-text-input-with-label v-model="userCopy.DisplayName" label="Display Name" class="mb-4" />
          <ui-text-input-with-label v-model="userCopy.Email" label="Email" class="mb-4" />
          <div class="flex justify-end py-4">
            <ui-btn type="submit">Submit</ui-btn>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'blank',
  middleware: 'authenticated',
  data() {
    return {
      processing: false,
      userCopy: {
        UserName: '',
        DisplayName: '',
        Email: ''
      }
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    }
  },
  methods: {
    submit() {
      if (this.user.DisplayName == this.userCopy.DisplayName) {
        console.log('No updates were made')
        return
      }
      this.processing = true
      const updatePayload = {
        DisplayName: this.userCopy.DisplayName
      }
      this.$axios
        .$post('/api/auth/user', updatePayload)
        .then((res) => {
          console.log('Updated', res)
          this.processing = false
          if (res.Error) {
            this.$toast.error(res.Error)
          } else {
            this.$toast.success('Profile Updated Successfully')
          }
        })
        .catch((error) => {
          console.error('Failed to update', error)
          this.processing = false
        })
    },
    init() {
      this.userCopy.UserName = this.user.UserName
      this.userCopy.DisplayName = this.user.DisplayName
      this.userCopy.Email = this.user.Email
    },
    logout() {
      this.$store.commit('auth/reset')
      location.reload()
    }
  },
  mounted() {
    this.init()
  }
}
</script>