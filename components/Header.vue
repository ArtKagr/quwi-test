<template>
  <div class="header">
    <div class="header-block">
      <nuxt-link to="/">
        <Logo class="header-block-logo" />
      </nuxt-link>
      <nuxt-link
        v-if="$route.name === 'projects-id'"
        class="header-block-button"
        to="/projects"
        @click.native="fetchProjects"
        v-text="'Back'"
      />
    </div>
    <div class="header-pages">
      <nuxt-link class="header-pages-page" to="/projects" @click.native="fetchProjects" v-text="'Projects'" />
      <span class="header-pages-page" @click="logout" v-text="'Logout'" />
    </div>
  </div>
</template>

<script>
import Logo from './Logo'
export default {
  name: 'Header',
  components: { Logo },
  methods: {
    logout () {
      this.$store.dispatch('authorization/logout')
    },
    fetchProjects () {
      this.$store.commit('projects/TOGGLE_IS_CURRENT_PROJECT_PAGE', false)
      this.$store.dispatch('projects/fetchProjects')
    }
  }
}
</script>
