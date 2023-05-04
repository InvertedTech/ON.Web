export const state = () => ({
  showConfirmPrompt: false,
  confirmPromptOptions: null
})

export const getters = {}

export const mutations = {
  setShowConfirmPrompt(state, val) {
    state.showConfirmPrompt = val
  },
  setConfirmPrompt(state, options) {
    state.confirmPromptOptions = options
    state.showConfirmPrompt = true
  }
}
