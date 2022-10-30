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
          <div class="w-full p-2">
            <div class="w-32 h-32">
              <p class="mb-1 text-gray-300">Profile Image</p>
              <ui-image-upload-input :existing-image="profileImageUrl" @change="profileImageUpdated" />
            </div>
          </div>
          <div class="flex justify-end pb-4 pt-6">
            <ui-btn :disabled="!hasUpdates" type="submit">Save</ui-btn>
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
      },
      profileImageData: null
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    },
    userPublic() {
      return this.user ? this.user.Public || {} : {}
    },
    userId() {
      return this.userPublic ? this.userPublic.UserID : null
    },
    userPublicData() {
      return this.userPublic.Data || {}
    },
    userPrivate() {
      return this.user ? this.user.Private || {} : {}
    },
    userPrivateData() {
      return this.userPrivate.Data || {}
    },
    profileImageUrl() {
      return `${this.$config.baseURL}/api/auth/user/${this.userId}/profileimage`
    },
    firstEmail() {
      if (this.userPrivateData.Emails && this.userPrivateData.Emails.length) {
        return this.userPrivateData.Emails[0]
      }
      return null
    },
    hasContentUpdates() {
      return this.userCopy.DisplayName !== this.userPublicData.DisplayName || this.userCopy.Email !== this.firstEmail
    },
    hasUpdates() {
      return this.profileImageData || this.hasContentUpdates
    }
  },
  methods: {
    profileImageUpdated(payload) {
      this.profileImageData = payload
    },
    saveProfileImage() {
      const payload = {
        ProfileImage: this.profileImageData.Data
      }
      return this.$axios.$post(`/api/auth/profileimage`, payload).catch((error) => {
        console.error('failed to save profile image', error)
        this.$toast.error('Failed to save profile image')
      })
    },
    async submit() {
      if (!this.hasUpdates) {
        console.log('No updates were made')
        return
      }
      this.processing = true

      // Save profile image if changed
      if (this.profileImageData) {
        await this.saveProfileImage()
      }

      if (!this.hasContentUpdates) {
        // If only profile image was changed stop here
        this.$toast.success('Profile Updated Successfully')
        this.processing = false
        return
      }

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
          if (res.Error) {
            this.$toast.error(res.Error)
          } else {
            this.$toast.success('Profile Updated Successfully')
          }
        })
        .catch((error) => {
          console.error('Failed to update', error)
          this.$toast.error('Failed to update profile')
        })
        .finally(() => {
          this.processing = false
        })
    },
    init() {
      this.userCopy.UserName = this.userPublicData.UserName
      this.userCopy.DisplayName = this.userPublicData.DisplayName
      this.userCopy.Email = this.firstEmail
    }
  },
  mounted() {
    this.init()
  }
}
</script>