<template>
  <div class="projects">
    <nuxt-child v-if="isCurrentProjectPage" />
    <div v-else class="projects-container">
      <nuxt-link
        v-for="project in projects"
        :key="project.id"
        class="projects-container-project"
        :class="project.is_active ? '' : '-inactive'"
        :to="`/projects/${project.id}`"
        @click.native="openCurrentProject(project)"
      >
        <div class="block">
          <img
            v-if="project.logo_url"
            class="projects-container-project-logo"
            :src="project.logo_url"
            :alt="`logo-${project.id}`"
          >
          <div
            v-else
            class="projects-container-project-logo"
          >
            <span v-text="firstLetterName(project.name)" />
          </div>
          <span
            class="projects-container-project-title"
            v-text="project.name"
          />
        </div>
        <div class="block">
          <span
            class="projects-container-project-users"
            v-text="`Работников: ${project.users.length}`"
          />
          <span
            class="projects-container-project-status"
            :class="project.is_active ? '-active' : ''"
            v-text="project.is_active ? 'Активен' : 'Неактивен'"
          />
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Projects',
  computed: {
    projects () {
      return this.$store.getters['projects/getProjects']
    },
    isCurrentProjectPage () {
      return this.$store.getters['projects/getIsCurrentProjectPage']
    }
  },
  created () {
    this.$store.commit('projects/TOGGLE_IS_CURRENT_PROJECT_PAGE', false)
    this.$store.dispatch('projects/fetchProjects')
  },
  methods: {
    firstLetterName (name) {
      return name.split('')[0]
    },
    openCurrentProject (project) {
      this.$store.commit('projects/TOGGLE_IS_CURRENT_PROJECT_PAGE', true)
      if (this.$route.name === 'projects-id') {
        this.$store.commit('projects/SAVE_CURRENT_PROJECT', project)
      }
    }
  }
}
</script>
