import utils from '@/assets/js/utils'

export const state = () => ({
})

export const getters = {
}

export const actions = {
  async nuxtServerInit({ commit, dispatch }, { req }) {
    var cookies = utils.parse(req.headers.cookie)
    if (cookies && cookies.ontoken) {
      var ontoken = cookies.ontoken
      commit('auth/setToken', ontoken, { root: true })
      await dispatch('auth/fetchUser', null, { root: true })
    }
  }
}

export const mutations = {
}