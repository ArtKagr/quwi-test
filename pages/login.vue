<template>
  <div class="login">
    <input v-model="formData.email" placeholder="email">
    <input v-model="formData.password" placeholder="password">
    <button
      class="login-button"
      @click="login"
    >
      onSubmit
    </button>
  </div>
</template>

<script>
export default {
  name: 'Login',
  computed: {
    formData: {
      get () {
        return this.$store.getters['authorization/getFormData']
      },
      set (newValue) {
        this.$store.commit('authorization/UPDATE_FORM_DATA', newValue)
      }
    }
  },
  methods: {
    login () {
      this.$store.dispatch('authorization/login')
    }
  }
}
</script>
