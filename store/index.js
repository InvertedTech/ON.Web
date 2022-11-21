import utils from '@/assets/js/utils'

export const state = () => ({
})

export const getters = {
}

export const actions = {
  async nuxtServerInit({ commit, dispatch }, { req }) {
    const success = await dispatch('settings/fetchSettings', null, { root: true })
    if (success) { // Successfully retrieved site data
      var cookies = req.headers.cookie ? utils.parseCookies(req.headers.cookie) : null
      if (cookies && cookies.ontoken) {
        var ontoken = cookies.ontoken
        commit('auth/setToken', ontoken, { root: true })
        await dispatch('auth/fetchUser', null, { root: true })
      }
    }
  }
}

export const mutations = {
}