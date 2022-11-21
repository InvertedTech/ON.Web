<template>
  <div class="w-full p-6">
    <h1 class="text-2xl font-bold mb-6">Members</h1>

    <div class="flex items-center py-6">
      <p class="text-gray-200">All ({{ users.length }})</p>

      <ui-btn height="32px" class="flex items-center mx-6" to="/admin/members/create">Add New <span class="material-icons ml-1 text-lg">add</span></ui-btn>
    </div>

    <div class="w-full">
      <div class="flex items-center border-b-2 border-white border-opacity-10">
        <div class="w-12 px-4">
          <ui-checkbox :value="isSelectedAll" @input="toggleSelectAll" />
        </div>
        <div class="w-16 py-2 px-3">
          <p class="font-semibold text-sm text-gray-300">Image</p>
        </div>
        <div class="flex-grow px-4">
          <p class="font-semibold text-sm text-gray-300">Name</p>
        </div>
        <div class="w-20 px-4">
          <p class="font-semibold text-sm text-gray-300">Roles</p>
        </div>
      </div>
      <template v-for="(user, index) in users">
        <div :key="index" class="flex items-center border-b border-white border-opacity-10" :class="user.selected ? 'bg-primary bg-opacity-60' : ''">
          <div class="w-12 px-4">
            <ui-checkbox v-model="user.selected" @input="(v) => toggleUserSelect(user, v)" />
          </div>
          <div class="w-16 py-2 px-3">
            <div class="w-10 h-10 rounded-full overflow-hidden shadow-lg">
              <img :src="getProfileImageUrl(user.Public.UserID)" class="w-full h-full object-cover" />
            </div>
          </div>
          <div class="flex-grow px-4">
            <div class="flex items-center">
              <p class="text-base text-gray-200">{{ user.Public.Data.DisplayName }}</p>
              <p class="text-sm text-gray-400 px-4">@{{ user.Public.Data.UserName }}</p>
            </div>
          </div>
          <div class="w-20 px-4">
            <div v-for="role in user.Private.Roles" :key="role" class="py-0.5 px-1 rounded-full bg-blue-500 text-white">
              <p class="text-xs font-semibold text-center capitalize">{{ role }}</p>
            </div>
          </div>
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
      isSelectedAll: false
    }
  },
  computed: {},
  methods: {
    getProfileImageUrl(userId) {
      return `${this.$config.baseURL}/api/auth/user/${userId}/profileimage`
    },
    toggleSelectAll(v) {
      this.users = this.users.map((u) => {
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