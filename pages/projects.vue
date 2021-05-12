<template>
  <div class="projects">
    <div
      v-if="projects && projects.length"
      class="projects-container"
    >
      <div
        v-for="project in projects"
        :key="project.id"
        class="projects-container-project"
      >
        {{ project }}
      </div>
  </div>
    <span class="projects-empty">Нет проектов</span>
  </div>
</template>

<script>
export default {
  name: 'Projects',
  computed: {
    projects () {
      return this.$store.getters['projects/getProjects']
    }
  },
  created () {
    this.$store.dispatch('projects/fetchProjects')
  }
}
</script>
