import cookies from '@/assets/js/js.cookie.min.js'

// Source: https://stackoverflow.com/a/38552302/7431543
// const parseJwt = (token) => {
//   var base64Url = token.split('.')[1]
//   var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
//   var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
//     return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
//   }).join(''))

//   return JSON.parse(jsonPayload)
// }

export const state = () => ({
  token: null,
  user: null
})

export const getters = {
  isAuthenticated: state => {
    return !!state.user
  },
  PublicData: state => {
    return state.user ? state.user.Public : null
  },
  PrivateData: state => {
    return state.user ? state.user.Private : null
  },
  UserId: (state, getters) => {
    return getters.PublicData ? getters.PublicData.UserID : null
  },
  UserData: (state, getters) => {
    return getters.PublicData ? getters.PublicData.Data : null
  },
  DisplayName: (state, getters) => {
    return getters.UserData ? getters.UserData.DisplayName : null
  },
  UserName: (state, getters) => {
    return getters.UserData ? getters.UserData.UserName : null
  },
  Roles: (state, getters) => {
    return getters.PrivateData ? getters.PrivateData.Roles : null
  },
  isOwner: (state, getters) => {
    if (!getters.Roles) return false
    return getters.Roles.some(r => r === 'owner')
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
  },
  setUser(state, user) {
    state.user = user
  },
  setToken(state, token) {
    state.token = token
    cookies.set('ontoken', token)
  }
}