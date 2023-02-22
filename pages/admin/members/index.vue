<template>
  <div class="w-full p-6">
    <h1 class="text-2xl font-bold mb-6">Members</h1>

    <div class="flex items-center py-6">
      <p class="text-gray-200">All ({{ users.length }})</p>

      <ui-btn height="32px" class="flex items-center mx-6" to="/admin/members/create">Add New <span class="material-icons ml-1 text-lg">add</span></ui-btn>

      <div class="flex-grow" />

      <ui-btn v-if="numDisabledUsersSelected" :disabled="processing" height="32px" class="mx-6" classes="bg-green-500 hover:bg-green-400 text-green-100 hover:text-green-50 disabled:bg-green-600/20 disabled:text-green-400/30" @click.stop="activateUsers"> Activate </ui-btn>
      <ui-btn v-if="usersSelected.length && !numDisabledUsersSelected" :disabled="processing" height="32px" class="mx-6" classes="bg-yellow-500 hover:bg-yellow-400 text-yellow-100 hover:text-yellow-50 disabled:bg-yellow-600/20 disabled:text-yellow-400/30" @click.stop="deactivateUsers"> Deactivate </ui-btn>

      <ui-text-input v-model="searchValue" small placeholder="Search..." id="search" type="text" clearable append-icon="search" class="w-56 mx-6" />

      <div class="flex items-center">
        <ui-checkbox v-model="showAll" />
        <p class="pl-1 text-sm text-gray-200 cursor-pointer select-none" @click="showAll = !showAll">Show All</p>
      </div>
    </div>

    <div class="w-full">
      <div class="flex items-center border-b-2 border-white border-opacity-10 py-4">
        <div class="w-12 px-4">
          <ui-checkbox :value="isSelectedAll" @input="toggleSelectAll" />
        </div>
        <div class="w-16 py-2 px-3"></div>
        <div class="w-40 px-4">
          <p class="font-semibold text-sm text-gray-300">Username</p>
        </div>
        <div class="w-40 px-4">
          <p class="font-semibold text-sm text-gray-300">Display Name</p>
        </div>
        <div class="w-32 px-4">
          <p class="font-semibold text-sm text-gray-300">Roles</p>
        </div>
        <div class="w-24 px-4">
          <p class="font-semibold text-sm text-gray-300">Value</p>
        </div>
        <div class="w-44 px-4">
          <p class="font-semibold text-sm text-gray-300 flex items-center cursor-pointer select-none" @click.stop="clickSort('Public.CreatedOnUTC')">
            Date Added <span v-if="sortBy == 'Public.CreatedOnUTC'" class="material-icons pl-0.5 text-white">{{ sortDesc ? 'arrow_drop_up' : 'arrow_drop_down' }}</span>
          </p>
        </div>
        <div class="flex-grow px-4">
          <p class="font-semibold text-sm text-gray-300">Email Address</p>
        </div>
      </div>
      <template v-for="(user, index) in sortedUsers">
        <div :key="index" class="flex items-center border-b border-white border-opacity-10" :class="{ 'bg-primary/60': user.selected, 'bg-red-500/40': user.Public.DisabledOnUTC }">
          <div class="w-12 px-4">
            <ui-checkbox v-model="user.selected" @input="(v) => toggleUserSelect(user, v)" />
          </div>
          <nuxt-link :to="`/admin/members/${user.Public.UserID}/edit`" class="flex-grow flex items-center">
            <div class="w-16 py-2 px-3">
              <div class="w-10 h-10 rounded-full overflow-hidden shadow-lg">
                <img :src="getProfileImageUrl(user.Public.UserID)" class="w-full h-full object-cover" />
              </div>
            </div>
            <div class="w-40 px-4">
              <div class="flex items-center">
                <p class="text-sm text-gray-200">@{{ user.Public.Data.UserName }}</p>
              </div>
            </div>
            <div class="w-40 px-4">
              <div class="flex items-center">
                <p class="text-sm text-gray-200">{{ user.Public.Data.DisplayName }}</p>
              </div>
            </div>
            <div class="w-32 px-4">
              <div class="flex items-center">
                <div v-if="user.primaryRole" class="py-0.5 px-2 mx-0.5 rounded-full" :style="{ backgroundColor: user.primaryRole.color, color: user.primaryRole.textColor }">
                  <p class="text-xs font-semibold text-center">{{ user.primaryRole.text }}</p>
                </div>
                <p v-if="user.Private.Roles.length > 1" class="text-xs text-white pl-1 italic">+{{ user.Private.Roles.length - 1 }}</p>
              </div>
            </div>
            <div class="w-24 px-4">
              <div class="flex items-center">
                <p class="text-sm text-gray-200">$0.00</p>
              </div>
            </div>
            <div class="w-44 px-4">
              <div class="flex items-center">
                <p class="text-sm text-gray-200">{{ user.Public.CreatedOnUTC ? $formatDate(new Date(user.Public.CreatedOnUTC), 'MMM d, yyyy kk:mm') : 'N/A' }}</p>
              </div>
            </div>
            <div class="flex-grow px-4">
              <div class="flex items-center">
                <p class="text-sm text-gray-200">{{ user.Private.Data.Emails[0] || '' }}</p>
              </div>
            </div>
          </nuxt-link>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'blank',
  data() {
    return {
      users: [],
      showAll: false,
      isSelectedAll: false,
      processing: false,
      sortBy: 'Public.CreatedOnUTC',
      sortDesc: false,
      searchValue: ''
    }
  },
  computed: {
    roles() {
      return this.$store.state.settings.roles
    },
    filteredUsers() {
      return this.users.filter((user) => {
        if (this.searchValue) {
          // TODO: handle all filter values
          const username = (user.Public.Data.UserName || '').toLowerCase()
          const displayName = (user.Public.Data.DisplayName || '').toLowerCase()
          if (!username.includes(this.searchValue.toLowerCase()) && !displayName.includes(this.searchValue.toLowerCase())) {
            return false
          }
        }
        if (this.showAll) return true
        return !user.Public.DisabledOnUTC
      })
    },
    sortedUsers() {
      return this.filteredUsers.sort((a, b) => {
        const value1 = this.sortBy.split('.').reduce((_a, _b) => _a[_b], a)
        const value2 = this.sortBy.split('.').reduce((_a, _b) => _a[_b], b)
        if (this.sortDesc) {
          if (value1 < value2) return 1
          else return -1
        } else {
          if (value1 < value2) return -1
          else return 1
        }
      })
    },
    usersSelected() {
      return this.filteredUsers.filter((u) => u.selected)
    },
    numDisabledUsersSelected() {
      return this.usersSelected.filter((u) => u.Public.DisabledOnUTC).length
    }
  },
  methods: {
    clickSort(sortKey) {
      if (this.sortBy === sortKey) {
        this.sortDesc = !this.sortDesc
      } else {
        this.sortBy = sortKey
      }
    },
    activateUsers() {
      const promises = []
      for (const user of this.usersSelected) {
        if (!user.Public.DisabledOnUTC) continue
        promises.push(
          this.$axios.$post(`/api/auth/admin/user/${user.Public.UserID}/enable`, {}).then((result) => {
            if (result.Error && result.Error !== 'NoError') {
              console.error('Failed to enable user', user, result)
              return false
            } else {
              user.Public.DisabledOnUTC = null
              return true
            }
          })
        )
      }
      this.processing = true
      Promise.all(promises)
        .then((results) => {
          const usersEnabled = results.filter((r) => r).length
          if (usersEnabled == 1) {
            this.$toast.success('User enabled')
          } else if (usersEnabled > 1) {
            this.$toast.success(`${usersEnabled} Users enabled`)
          } else {
            this.$toast.error('Failed to enable users')
          }
        })
        .catch((error) => {
          console.error('Failed to enable users', error)
          this.$toast.error('Failed to enable users')
        })
        .finally(() => {
          this.processing = false
          this.toggleSelectAll(false)
        })
    },
    deactivateUsers() {
      const promises = []
      for (const user of this.usersSelected) {
        if (user.Public.DisabledOnUTC) continue
        promises.push(
          this.$axios.$post(`/api/auth/admin/user/${user.Public.UserID}/disable`, {}).then((result) => {
            if (result.Error && result.Error !== 'NoError') {
              console.error('Failed to disable user', user, result)
              return false
            } else {
              user.Public.DisabledOnUTC = new Date().toISOString()
              return true
            }
          })
        )
      }
      this.processing = true
      Promise.all(promises)
        .then((results) => {
          const usersDisabled = results.filter((r) => r).length
          if (usersDisabled == 1) {
            this.$toast.success('User disabled')
          } else if (usersDisabled > 1) {
            this.$toast.success(`${usersDisabled} Users disabled`)
          } else {
            this.$toast.error('Failed to disable users')
          }
        })
        .catch((error) => {
          console.error('Failed to disable users', error)
          this.$toast.error('Failed to disable users')
        })
        .finally(() => {
          this.processing = false
          this.toggleSelectAll(false)
        })
    },
    getRoleIndex(role) {
      return this.roles.findIndex((r) => r.value === role)
    },
    getPrimaryRole(roles) {
      if (!roles || !roles.length) return null

      const rolesSorted = [...roles].sort((a, b) => this.getRoleIndex(a) - this.getRoleIndex(b))
      return this.roles.find((r) => r.value === rolesSorted[0])
    },
    getProfileImageUrl(userId) {
      return `${this.$config.baseURL}/api/auth/user/${userId}/profileimage`
    },
    toggleSelectAll(v) {
      this.users = this.users.map((u) => {
        if (!this.filteredUsers.some((_u) => _u.Public.UserID === u.Public.UserID)) return u
        u.selected = v
        return u
      })
      this.isSelectedAll = v
    },
    toggleUserSelect(user, selected) {
      this.isSelectedAll = !this.users.some((u) => !u.selected)
    },
    init() {
      this.$axios.$get('/api/auth/admin/user').then((data) => {
        console.log('Loaded data', data)
        this.users = (data.Records || []).map((u) => {
          u.selected = false
          u.primaryRole = this.getPrimaryRole(u.Private.Roles)
          return u
        })
      })
    }
  },
  mounted() {
    this.init()
  }
}
</script>