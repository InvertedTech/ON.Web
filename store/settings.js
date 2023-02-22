export const state = () => ({
  settings: null,
  roles: [
    {
      text: 'Owner',
      value: 'owner',
      color: '#62AA76',
      textColor: '#fff'
    },
    {
      text: 'Admin',
      value: 'admin',
      color: '#ad4545',
      textColor: '#fff'
    },
    {
      text: 'Content Publisher',
      value: 'con_publisher',
      color: 'rgb(59 130 246)',
      textColor: '#fff'
    },
    {
      text: 'Content Writer',
      value: 'con_writer',
      color: 'rgb(59 130 246)',
      textColor: '#fff'
    },
    {
      text: 'Comment Moderator',
      value: 'com_mod',
      color: '#e8c856',
      textColor: '#000'
    },
    {
      text: 'Comment Appellate Judge',
      value: 'com_appellate',
      color: '#e8c856',
      textColor: '#000'
    }
  ]
})

export const getters = {
  Personalization: (state) => {
    return state.settings ? state.settings.Personalization : null
  },
  Title: (state, getters) => {
    return getters.Personalization ? getters.Personalization.Title : 'Unknown'
  },
  ProfileImageAssetId: (state, getters) => {
    return getters.Personalization ? getters.Personalization.ProfileImageAssetId : ''
  },
  SubscriptionTiers: (state) => {
    const subscription = state.settings ? state.settings.Subscription : null
    return subscription ? subscription.Tiers || [] : []
  },
  CMS: (state) => {
    return state.settings ? state.settings.CMS : null
  },
  CMSMenuNames: (state) => {
    const CMS = state.settings ? state.settings.CMS : null
    return CMS ? CMS.Menu : null
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
  },
  updatePersonalization(state, personalization) {
    state.settings.Personalization = { ...personalization }
  },
  updateCMS(state, cms) {
    state.settings.CMS = { ...cms }
  },
  updateTiers(state, tiers) {
    state.settings.Subscription.Tiers = tiers
  }
}