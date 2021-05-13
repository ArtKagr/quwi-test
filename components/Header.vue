<template>
  <div class="header">
    <Logo class="header-logo" />
    <div class="header-pages">
      <nuxt-link class="header-pages-page" to="/projects" @click.native="fetchProjects" v-text="'Projects'" />
      <span v-if="authToken" class="header-pages-page" @click="logout" v-text="'Logout'" />
      <nuxt-link v-else class="header-pages-page" :to="`/${pageLink.link}`" v-text="pageLink.title" />
    </div>
  </div>
</template>

<script>
import Logo from './Logo'
export default {
  name: 'Header',
  components: { Logo },
  computed: {
    authToken () {
      return this.$store.getters['authorization/getAuthToken']
    },
    pageLink () {
      if (this.$route.path === '/login') {
        return { link: '', title: 'home' }
      } else {
        return { link: 'login', title: 'login' }
      }
    }
  },
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
