<template>
  <div class="container">
    <Header class="container-header" />
    <Nuxt class="container-page" />
  </div>
</template>
<script>
import Header from '../components/Header'
export default {
  components: { Header },
  computed: {
    authUserData () {
      return this.$store.getters['authorization/getAuthUserData']
    },
    authErrorData () {
      return this.$store.getters['authorization/getAuthErrorData']
    },
    authToken () {
      return this.$store.getters['authorization/getAuthToken']
    }
  },
  watch: {
    authUserData: {
      handler () {
        this.$router.push('/projects')
      },
      deep: true
    },
    authErrorData: {
      handler (newValue) {
        switch (newValue.status) {
          case 401:
            this.$router.push('/login')
            break
        }
      },
      deep: true
    }
  },
  mounted () {
    let token = localStorage.getItem('auth._token.local')
    if (token) {
      token = token.split(' ')
      this.$store.commit('authorization/SAVE_AUTH_TOKEN', token[1])
    }
    if (this.authToken && this.$route.path === '/') {
      this.$router.push('/projects')
    } else if (!this.authToken && this.$route.path === '/') {
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="scss">
@import '../assets/scss/app.scss';
</style>
