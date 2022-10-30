<template>
  <div class="relative" v-click-outside="clickOutside">
    <button class="w-20 h-10 bg-accent rounded-full focus:outline-none flex items-center justify-between pl-2" @click.stop.prevent="showMenu = !showMenu">
      <span class="material-icons text-black text-3xl pt-0.5 duration-200 transform origin-center" :class="{ 'rotate-180': showMenu }">expand_more</span>
      <div class="w-10 h-10 p-1">
        <div class="w-8 h-8 rounded-full overflow-hidden">
          <img :src="profileImageUrl" class="w-full h-full object-cover" />
        </div>
      </div>
    </button>

    <transition name="menu">
      <ul v-show="showMenu" class="absolute top-12 right-0 z-10 -mt-px w-80 bg-grayscale-300 shadow-lg rounded-2xl py-2 focus:outline-none" role="listbox">
        <li class="text-gray-100 select-none relative py-3 px-6" role="option">
          <div class="flex justify-start">
            <div class="h-20 w-20 rounded-full border-4 border-white overflow-hidden">
              <img :src="profileImageUrl" class="w-full h-full object-cover" />
            </div>
            <div class="px-4 py-1">
              <p class="font-semibold text-xl leading-none mb-3">{{ DisplayName }}</p>
              <p class="text-gray-400 text-lg leading-none">@{{ UserName }}</p>
            </div>
          </div>
        </li>
        <template v-for="item in items">
          <nuxt-link :key="item.value" v-if="item.to" :to="item.to">
            <li :key="item.value" class="text-gray-100 select-none relative py-3 px-6 cursor-pointer hover:bg-grayscale-400" role="option" @click="clickedOption(item.value)">
              <div class="flex items-center">
                <span class="font-semibold text-lg block truncate font-sans">{{ item.text }}</span>
              </div>
            </li>
          </nuxt-link>
          <li v-else :key="item.value" class="text-gray-100 select-none relative py-3 px-6 cursor-pointer hover:bg-grayscale-400" role="option" @click="clickedOption(item.value)">
            <div class="flex items-center">
              <span class="font-semibold text-lg block truncate font-sans">{{ item.text }}</span>
            </div>
          </li>
        </template>
        <li class="text-gray-100 select-none relative py-3 px-6 cursor-pointer hover:bg-grayscale-400" role="option" @click="clickedLogout">
          <div class="flex items-center justify-center">
            <span class="font-semibold text-base block truncate font-sans text-red-300 text-opacity-80">Sign Out</span>
          </div>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMenu: false
    }
  },
  computed: {
    MemberItems() {
      return [
        {
          text: 'My Profile',
          value: 'account',
          to: '/profile'
        },
        {
          text: 'Billing',
          value: 'billing'
        },
        {
          text: 'Get Help',
          value: 'help'
        }
      ]
    },
    CreatorItems() {
      return [
        {
          text: 'My Profile',
          value: 'account',
          to: '/profile'
        },
        {
          text: 'Posts',
          value: 'my-posts',
          to: '/admin/posts'
        },
        {
          text: 'Members',
          value: 'members',
          to: '/admin/members'
        },
        {
          text: 'Analytics',
          value: 'analytics',
          to: '/admin/analytics'
        },
        {
          text: 'Subscriptions',
          value: 'subscriptions',
          to: '/admin/subscriptions'
        },
        {
          text: 'Settings',
          value: 'settings',
          to: '/admin/settings'
        },
        {
          text: 'Resources',
          value: 'resources',
          to: '/admin/resources'
        }
      ]
    },
    items() {
      if (this.firstRole === 'owner') return this.CreatorItems
      return this.MemberItems
    },
    DisplayName() {
      return this.$store.getters['auth/DisplayName']
    },
    UserName() {
      return this.$store.getters['auth/UserName']
    },
    UserId() {
      return this.$store.getters['auth/UserId']
    },
    Roles() {
      return this.$store.getters['auth/Roles']
    },
    firstRole() {
      if (!this.Roles || !this.Roles.length) return 'Unknown'
      return this.Roles[0]
    },
    profileImageUrl() {
      return `${this.$config.baseURL}/api/auth/user/${this.UserId}/profileimage`
    }
  },
  methods: {
    clickOutside() {
      this.showMenu = false
    },
    clickedOption(itemValue) {
      this.$emit('action', itemValue)
      this.showMenu = false
    },
    clickedLogout() {
      this.$store.commit('auth/reset')
      location.reload()
    }
  },
  mounted() {}
}
</script>