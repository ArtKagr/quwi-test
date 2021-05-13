<template>
  <div class="projects-current_project">
    <div class="projects-current_project-container">
      <span
        class="projects-current_project-container-name"
        v-text="'Name'"
      />
      <input
        v-model="currentProject.name"
        class="projects-current_project-container-input"
      >
      <button
        class="projects-current_project-container-button"
        @click="updateCurrentProject"
        v-text="'Ок'"
      />
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    currentProject: {
      get () {
        return this.$store.getters['projects/getCurrentProject']
      },
      set (newValue) {
        this.$store.commit('projects/SAVE_CURRENT_PROJECT', newValue)
      }
    }
  },
  methods: {
    updateCurrentProject () {
      this.$store.dispatch('projects/updateCurrentProject')
    }
  }
}
</script>
