export const state = () => ({
  settings: null
})

export const getters = {
  Personalization: (state) => {
    return state.settings ? state.settings.Personalization : null
  },
  Title: (state, getters) => {
    return getters.Personalization ? getters.Personalization.Title : 'Unknown'
  },
  SubscriptionTiers: (state) => {
    const subscription = state.settings ? state.settings.Subscription : null
    return subscription ? subscription.Tiers || [] : []
  }
}

export const actions = {
  fetchSettings({ commit, dispatch }) {
    return this.$axios.$get('/api/settings/public').then((res) => {
      var settings = res.Public
      console.log('Settings', JSON.stringify(res, null, 4))
      commit('setSettings', settings)
      return true
    }).catch((error) => {
      console.error('Failed', error)
      return false
    })
  }
}

export const mutations = {
  setSettings(state, val) {
    state.settings = val
  }
}