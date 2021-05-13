export const state = () => ({
  projects: [],
  currentProject: {},
  isCurrentProjectPage: false
})

export const getters = {
  getProjects: state => JSON.parse(JSON.stringify(state.projects)),
  getCurrentProject: state => JSON.parse(JSON.stringify(state.currentProject)),
  getIsCurrentProjectPage: state => state.isCurrentProjectPage
}

export const mutations = {
  SAVE_PROJECTS (state, projects) {
    state.projects = projects
  },
  SAVE_CURRENT_PROJECT (state, currentProject) {
    state.currentProject = currentProject
  },
  TOGGLE_IS_CURRENT_PROJECT_PAGE (state, flag) {
    state.isCurrentProjectPage = flag
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
        text: e && e.response && e.response.statusText ? e.response.statusText : null,
        data: e && e.response && e.response.data ? e.response.data : null
      }, { root: true })
    }
  },
  async updateCurrentProject ({ getters, commit }) {
    try {
      const { data } = await this.$axios.post(`projects-manage/update?id=${getters.getCurrentProject.id}`, {
        name: getters.getCurrentProject.name
      })
      commit('SAVE_CURRENT_PROJECT', data.project)
    } catch (e) {

    }
  }
}
