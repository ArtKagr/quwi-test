<template>
  <div class="login">
    <span class="login-unauthorized" v-text="loginErrors.name" />
    <div class="login-container">
      <span class="login-container-title" v-text="'Login'" />
      <div class="login-container-input_container">
        <span
          class="login-container-input_container-error"
          v-text="loginErrors.email || ''"
        />
        <input
          v-model="formData.email"
          class="login-container-input_container-input"
          :class="loginErrors.email ? '-error' : ''"
          placeholder="Email"
          @focus="loginFilling('email')"
        >
      </div>
      <div class="login-container-input_container">
        <span
          class="login-container-input_container-error"
          v-text="loginErrors.password || ''"
        />
        <input
          v-model="formData.password"
          class="login-container-input_container-input"
          :class="loginErrors.password ? '-error' : ''"
          placeholder="Password"
          @focus="loginFilling('password')"
        >
      </div>
      <button
        class="login-container-button"
        @click="login"
        v-text="'Login'"
      />
    </div>
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
    },
    loginErrors () {
      return this.$store.getters['authorization/getAuthErrorData'].data
        ? this.$store.getters['authorization/getAuthErrorData'].data
        : { email: null, password: null, name: null }
    }
  },
  methods: {
    login () {
      this.$store.dispatch('authorization/login')
    },
    loginFilling (field) {
      if (this.loginErrors[field]) {
        this.$store.commit('authorization/CLEAR_AUTH_ERROR_FIELD', field)
      }
    }
  }
}
</script>
