import cookies from '@/assets/js/js.cookie.min.js'

export const state = () => ({
  token: null,
  user: null
})

export const getters = {
  isAuthenticated: state => {
    return !!state.user
  }
}

export const actions = {
  fetchUser({ commit }) {
    return this.$axios.$get('/api/auth/user').then((res) => {
      var user = res.Record.Public
      commit('setUser', user)
      return true
    }).catch((error) => {
      console.error('Failed', error)
      commit('reset')
      return false
    })
  }
}

export const mutations = {
  reset(state) {
    state.user = null
    state.token = null
    cookies.remove('ontoken')
  },
  setUser(state, user) {
    state.user = user
  },
  setToken(state, token) {
    state.token = token
    cookies.set('ontoken', token)
  }
}