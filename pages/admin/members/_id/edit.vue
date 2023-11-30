<template>
  <div class="w-full p-6">
    <div class="flex items-center mb-6">
      <ui-icon-btn icon="arrow_back" class="-ml-2" to="/admin/members" />
      <h1 class="text-2xl font-bold pl-2">Update Member</h1>
    </div>
    <div class="w-full max-w-3xl mx-auto">
      <form @submit.prevent="submit">
        <div class="flex items-center -mx-2">
          <div class="w-full md:w-1/2 px-2">
            <ui-text-input-with-label v-model="newUser.UserName" name="userName" label="User Name" :validation="userNameValidation" class="mb-4" />
          </div>
          <div class="w-full md:w-1/2 px-2">
            <ui-text-input-with-label v-model="newUser.DisplayName" name="displayName" label="Display Name" class="mb-4" />
          </div>
        </div>
        <div class="flex items-center -mx-2">
          <div class="w-full md:w-1/2 px-2">
            <ui-text-input-with-label v-model="newUserEmail" name="email" label="Email" class="mb-4" />
          </div>
        </div>

        <ui-dropdown-multi v-model="newUserRoles" :items="roles" label="Roles" item-text="text" item-key="value" class="mb-4" />

        <div class="flex justify-end py-4">
          <ui-btn :disabled="processing" type="submit">Submit</ui-btn>
        </div>
      </form>

      <div class="w-full h-px bg-white/10 my-4" />

      <h2 class="text-lg font-semibold mb-4">Change Password</h2>

      <form @submit.prevent="submitChangePassword">
        <div class="flex items-center -mx-2">
          <div class="w-full md:w-1/2 px-2">
            <ui-text-input-with-label v-model="newPassword" name="password" type="password" label="Password" class="mb-4" />
          </div>
          <div class="w-full md:w-1/2 px-2">
            <ui-text-input-with-label v-model="newPasswordConfirm" name="passwordConfirm" type="password" label="Confirm Password" class="mb-4" />
          </div>
        </div>

        <div class="flex justify-end py-4">
          <ui-btn :disabled="processingPasswordChange" type="submit">Submit</ui-btn>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ params, app, redirect }) {
    const userData = await app.$axios.$get(`/api/auth/admin/user/${params.id}`).catch((error) => {
      console.error('Failed to get user', error)
      return null
    })
    if (!userData?.Record) {
      return redirect('/admin/members')
    }
    return {
      user: userData.Record
    }
  },
  data() {
    return {
      processing: false,
      processingPasswordChange: false,
      newUser: {
        UserName: '',
        Password: '',
        DisplayName: ''
      },
      newPassword: null,
      newPasswordConfirm: null,
      newUserRoles: [],
      newUserEmail: '',
      userNameValidation: (username) => (/^[a-zA-Z0-9]{4,}$/.test(username) ? '' : 'Must be alphanumeric & min of 4 characters')
    }
  },
  computed: {
    roles() {
      return this.$store.state.settings.roles
    },
    UserID() {
      return this.user.Public.UserID
    },
    userPublicData() {
      return this.user.Public.Data || {}
    },
    userPrivateData() {
      return this.user.Private.Data || {}
    },
    userRoles() {
      return this.user.Private.Roles || []
    },
    userEmails() {
      return this.userPrivateData.Emails || []
    }
  },
  methods: {
    submit() {
      if (this.userNameValidation(this.newUser.UserName)) {
        return
      }

      if (!this.newUser.DisplayName) {
        this.$toast.error('Display Name required')
        return
      }

      const payload = {
        UserID: this.UserID,
        UserName: this.newUser.UserName,
        DisplayName: this.newUser.DisplayName,
        Emails: this.newUserEmail ? [this.newUserEmail] : []
      }
      this.updateUser(payload)
    },
    updateUser(payload) {
      this.processing = true
      this.$axios
        .$post('/api/auth/admin/user', payload)
        .then(async (data) => {
          console.log('User Updated', data)
          if (data.Error && data.Error !== 'NoError') {
            console.error('Failed to update user', data)
            this.$toast.error('Failed to update user')
          } else {
            if (this.newUserRoles.join(',') !== this.userRoles.join(',')) {
              await this.updateUserRoles()
            }

            this.$toast.success('Success!')
            this.$router.push('/admin/members')
          }
        })
        .catch((error) => {
          console.error('Failed to update user', error)
          this.$toast.error('Failed to update user')
        })
        .finally(() => {
          this.processing = false
        })
    },
    updateUserRoles() {
      const rolesPayload = {
        UserID: this.UserID,
        Roles: this.newUserRoles
      }
      console.log('Set roles payload', rolesPayload)
      return this.$axios
        .$post('/api/auth/admin/user/roles', rolesPayload)
        .then((rolesResponseData) => {
          if (rolesResponseData.Error && rolesResponseData.Error !== 'NoError') {
            console.error('Failed to set roles', rolesResponseData)
            this.$toast.error('Failed to set roles')
            return false
          }
          return true
        })
        .catch((error) => {
          console.error('Failed to set roles', error)
          this.$toast.error('Failed to set roles')
          return false
        })
    },
    async submitChangePassword() {
      if (!this.newPassword) {
        this.$toast.error('Password cannot be empty')
        return
      }
      if (this.newPassword !== this.newPasswordConfirm) {
        this.$toast.error('Passwords do not match')
        return
      }

      if (await this.changePassword()) {
        this.$toast.success('Password changed successfully')
        this.newPassword = ''
        this.newPasswordConfirm = ''
      }
    },
    changePassword() {
      const payload = {
        UserID: this.UserID,
        NewPassword: this.newPassword
      }
      this.processingPasswordChange = true
      return this.$axios
        .$post('/api/auth/admin/password', payload)
        .then((responseData) => {
          console.log('Response', responseData)
          if (responseData.Error && responseData.Error !== 'NoError') {
            console.error('Failed to change password', responseData)
            this.$toast.error('Failed to change password')
            return false
          }
          return true
        })
        .catch((error) => {
          console.error('Failed to change password', error)
          this.$toast.error('Failed to change password')
          return false
        })
        .finally(() => {
          this.processingPasswordChange = false
        })
    },
    init() {
      this.newUser = {
        UserName: this.userPublicData.UserName,
        DisplayName: this.userPublicData.DisplayName,
        Password: ''
      }
      this.newUserRoles = [...this.userRoles]
      this.newUserEmail = this.userEmails.shift() || ''
    }
  },
  mounted() {
    this.init()
  }
}
</script>