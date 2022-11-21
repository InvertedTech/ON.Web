<template>
  <div class="w-full p-6">
    <div class="flex items-center mb-6">
      <ui-icon-btn icon="arrow_back" class="-ml-2" to="/admin/members" />
      <h1 class="text-2xl font-bold pl-2">Create Member</h1>
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
            <ui-text-input-with-label v-model="newUser.Password" type="password" name="password" label="Password" class="mb-4" />
          </div>
          <div class="w-full md:w-1/2 px-2">
            <ui-text-input-with-label v-model="newUserEmail" name="email" label="Email" class="mb-4" />
          </div>
        </div>

        <ui-dropdown-multi v-model="newUserRoles" :items="roles" label="Roles" item-text="text" item-key="value" class="mb-4" />

        <div class="flex justify-end py-4">
          <ui-btn :disabled="processing" type="submit">Submit</ui-btn>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import utils from '@/assets/js/utils'

export default {
  data() {
    return {
      processing: false,
      newUser: {
        UserName: '',
        Password: '',
        DisplayName: ''
      },
      newUserRoles: [],
      newUserEmail: '',
      userNameValidation: (username) => (/^[a-zA-Z0-9]{4,}$/.test(username) ? '' : 'Must be alphanumeric & min of 4 characters')
    }
  },
  computed: {
    roles() {
      return this.$store.state.settings.roles
    }
  },
  methods: {
    submit() {
      if (this.userNameValidation(this.newUser.UserName)) {
        return
      }

      if (!this.newUser.Password || !this.newUser.DisplayName) {
        this.$toast.error('Password and Display Name required')
        return
      }

      const payload = {
        UserName: this.newUser.UserName,
        Password: this.newUser.Password,
        DisplayName: this.newUser.DisplayName,
        Emails: this.newUserEmail ? [this.newUserEmail] : []
      }
      this.createUser(payload)
    },
    createUser(payload) {
      this.processing = true
      this.$axios
        .$post('/api/auth/createuser', payload)
        .then(async (data) => {
          console.log('User Created', data)
          if (data.Error && data.Error !== 'NoError') {
            console.error('Failed to create user', data)
            this.$toast.error('Failed to create user')
          } else {
            const userData = utils.parseJWT(data.BearerToken)
            console.log('Parsed JWT', userData)

            if (this.newUserRoles.length && userData.Id) {
              const rolesPayload = {
                UserID: userData.Id,
                Roles: this.newUserRoles
              }
              console.log('Set roles payload', rolesPayload)
              await this.$axios
                .$post('/api/auth/admin/user/roles', rolesPayload)
                .then((rolesResponseData) => {
                  if (rolesResponseData.Error && rolesResponseData.Error !== 'NoError') {
                    console.error('Failed to set roles', rolesResponseData)
                    this.$toast.error('Failed to set roles')
                  }
                })
                .catch((error) => {
                  console.error('Failed to set roles', error)
                  this.$toast.error('Failed to set roles')
                })
            }

            this.$toast.success('Success!')
            this.$router.push('/admin/members')
          }
        })
        .catch((error) => {
          console.error('Failed to create user', error)
          this.$toast.error('Failed to create user')
        })
        .finally(() => {
          this.processing = false
        })
    }
  },
  mounted() {}
}
</script>