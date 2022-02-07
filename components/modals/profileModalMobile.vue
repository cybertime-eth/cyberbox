<template>
  <div class="menu-mobile">
    <div class="menu-mobile-header container-xl">
      <img src="/logo.svg" alt="logo" class="menu-mobile-header-logo">
      <img src="/close.svg" alt="close" class="menu-mobile-header-close" @click="closeModal">
    </div>
    <div class="menu-mobile-list container-xl" @click="closeModal">
      <nuxt-link to="/" class="gradient-text menu-mobile-list-link">Marketplace</nuxt-link>
      <nuxt-link to="/rankings" class="menu-mobile-list-link">Rankings</nuxt-link>
      <!-- <a href="https://forms.gle/R7LmANz7iqsCA88X8" target="_blank" class="menu-mobile-list-link">Launchpad</a> -->
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    closeModal() {
      this.$emit('closeModal', false)
    }
  }
}
</script>
<style lang="scss">
.menu-mobile {
  width: 100%;
  height: 100%;
  position: fixed;
  overflow: hidden;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $white;
  z-index: 10;
  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 1rem;
    &-logo {
      width: 4rem;
    }
    &-close {
      width: 2.2rem;
    }
  }
  &-list {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    padding-top: 4rem;
    &-link {
      padding-bottom: 2.5rem;
    }
  }
}
</style>
