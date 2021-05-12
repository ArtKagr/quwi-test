<template>
  <div class="error">
    <span class="error-message">Server error: 404</span>
  </div>
</template>
<style lang="scss">
  .error {
    width: 100%;
    height: 100%;
    position: relative;

    &-message {
      position: absolute;
      top:50%;
      left:50%;
      font-size: 24px;
    }
  }
</style>
