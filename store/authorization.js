export const state = () => ({
  formData: {
    email: null,
    password: null
  },
  authUserData: {},
  authErrorData: {
    status: null,
    text: null
  },
  authToken: null
})

export const getters = {
  getFormData: state => JSON.parse(JSON.stringify(state.formData)),
  getAuthUserData: state => JSON.parse(JSON.stringify(state.authUserData)),
  getAuthErrorData: state => JSON.parse(JSON.stringify(state.authErrorData)),
  getAuthToken: state => state.authToken
}

export const mutations = {
  UPDATE_FORM_DATA (state, formData) {
    state.formData = formData
  },
  SAVE_USER_DATA (state, authUserData) {
    state.authUserData = authUserData
  },
  SAVE_AUTH_TOKEN (state, token) {
    state.authToken = token
  },
  SAVE_AUTH_ERROR_DATA (state, authErrorData) {
    state.authErrorData = authErrorData
  }
}

export const actions = {
  async login ({ getters, commit }) {
    try {
      const { data } = await this.$auth.loginWith('local', { data: getters.getFormData })
      commit('SAVE_USER_DATA', data)
      commit('SAVE_AUTH_TOKEN', data.token)
    } catch (e) {
      commit('SAVE_AUTH_ERROR_DATA', {
        status: e && e.response && e.response.status ? e.response.status : null,
        text: e && e.response && e.response.statusText ? e.response.statusText : null
      })
    }
  }
}
