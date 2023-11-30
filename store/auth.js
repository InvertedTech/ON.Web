import cookies from '@/assets/js/js.cookie.min.js'
import utils from '@/assets/js/utils'

export const state = () => ({
  token: null,
  user: null,
  jwtData: null
})

export const getters = {
  isAuthenticated: state => {
    return !!state.user
  },
  PublicData: state => {
    return state.user?.Public || null
  },
  PrivateData: state => {
    return state.user?.Private || null
  },
  UserId: (state, getters) => {
    return getters.PublicData?.UserID || null
  },
  UserData: (state, getters) => {
    return getters.PublicData?.Data || null
  },
  DisplayName: (state, getters) => {
    return getters.UserData?.DisplayName || null
  },
  UserName: (state, getters) => {
    return getters.UserData?.UserName || null
  },
  Roles: (state, getters) => {
    return getters.PrivateData?.Roles || null
  },
  isOwner: (state, getters) => {
    if (!getters.Roles?.length) return false
    return getters.Roles.includes('owner')
  },
  isAdminOrUp: (state, getters) => {
    if (!getters.Roles?.length) return false
    return getters.isOwner || getters.Roles.includes('admin')
  },
  SubscriptionLevel: (state) => {
    if (!state.jwtData || !state.jwtData.SubscriptionLevel || isNaN(state.jwtData.SubscriptionLevel)) return 0
    return Number(state.jwtData.SubscriptionLevel)
  }
}

export const actions = {
  login({ commit, dispatch }, payload) {
    return this.$axios
      .$post('/api/auth/login', payload)
      .then((res) => {
        console.log(res)
        commit('setToken', res.BearerToken)
        return dispatch('fetchUser')
      })
      .catch((error) => {
        console.error(error)
        return {
          error: 'Unknown error'
        }
      })
  },
  register({ commit, dispatch }, payload) {
    return this.$axios
      .$post('/api/auth/createuser', payload)
      .then((res) => {
        console.log(res)
        commit('setToken', res.BearerToken)
        return dispatch('fetchUser')
      })
      .catch((error) => {
        console.error(error)
        return {
          error: 'Unknown error'
        }
      })
  },
  fetchUser({ commit }) {
    return this.$axios.$get('/api/auth/user').then((res) => {
      var user = res.Record
      console.log('User data', JSON.stringify(res, null, 4))
      commit('setUser', user)
      return user
    }).catch((error) => {
      console.error('Failed', error)
      commit('reset')
      return {
        error: 'Failed to fetch user'
      }
    })
  }
}

export const mutations = {
  reset(state) {
    state.user = null
    state.token = null
    cookies.remove('ontoken')

    state.jwtData = null
  },
  setUser(state, user) {
    state.user = user
    console.log('Set user', state.user)
  },
  setToken(state, token) {
    state.token = token
    cookies.set('ontoken', token)

    state.jwtData = utils.parseJWT(token)
  }
}