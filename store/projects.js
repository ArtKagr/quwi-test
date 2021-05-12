export const state = () => ({
  projects: []
})

export const getters = {
  getProjects: state => JSON.parse(JSON.stringify(state.projects))
}

export const mutations = {
  SAVE_PROJECTS (state, projects) {
    state.projects = projects
  }
}

export const actions = {
  async fetchProjects ({ rootGetters, commit }) {
    try {
      const { data } = await this.$axios.get('projects-manage/index', {
        params: { token: rootGetters['authorization/getAuthToken'] }
      })
      commit('SAVE_PROJECTS', data.projects)
    } catch (e) {
      commit('authorization/SAVE_AUTH_ERROR_DATA', {
        status: e && e.response && e.response.status ? e.response.status : null,
        text: e && e.response && e.response.statusText ? e.response.statusText : null
      }, { root: true })
    }
  }
}
