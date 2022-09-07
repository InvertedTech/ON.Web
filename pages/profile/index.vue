<template>
  <div class="w-full h-full bg-primary p-6">
    <div class="p-4 md:p-6 max-w-3xl mx-auto rounded-4xl shadow-sm bg-bg">
      <div class="flex items-center mb-6 p-2">
        <h1 class="text-xl font-bold">My Profile</h1>
        <div class="flex-grow" />
      </div>
      <div class="w-full">
        <form @submit.prevent="submit">
          <div class="flex flex-wrap">
            <div class="w-full md:w-1/2 p-2">
              <ui-text-input-with-label v-model="userCopy.UserName" label="User Name" readonly />
            </div>
            <div class="w-full md:w-1/2 p-2">
              <ui-text-input-with-label v-model="userCopy.DisplayName" label="Display Name" />
            </div>
          </div>
          <div class="w-full p-2">
            <ui-text-input-with-label v-model="userCopy.Email" label="Email" />
          </div>
          <div class="flex justify-end pb-4 pt-6">
            <ui-btn type="submit">Save</ui-btn>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'default',
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
    },
    userPublic() {
      return this.user ? this.user.Public || {} : {}
    },
    userPublicData() {
      return this.userPublic.Data || {}
    },
    userPrivate() {
      return this.user ? this.user.Private || {} : {}
    },
    userPrivateData() {
      return this.userPrivate.Data || {}
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
      if (this.userCopy.Email) {
        updatePayload.Emails = [this.userCopy.Email]
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
          this.$toast.error('Failed to update profile')
          this.processing = false
        })
    },
    init() {
      this.userCopy.UserName = this.userPublicData.UserName
      this.userCopy.DisplayName = this.userPublicData.DisplayName
      if (this.userPrivateData.Emails && this.userPrivateData.Emails.length) {
        this.userCopy.Email = this.userPrivateData.Emails[0]
      }
    }
  },
  mounted() {
    this.init()
  }
}
</script>