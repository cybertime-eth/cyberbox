<template>
  <div class="menu-mobile">
    <div class="menu-mobile-header container-xl">
      <img src="/logo.svg" alt="logo" class="menu-mobile-header-logo">
      <div class="menu-mobile-header-walletbox">
        <div class="header__wallet" ref="wallet" v-if="address">
          <h3 class="header__wallet-address">{{ address }}</h3>
          <div class="header__wallet-avatar gradient-button">
            <img src="/celo.svg" alt="avatar">
          </div>
        </div>
        <img :src="closeIcon" alt="close" class="menu-mobile-header-close" @click="closeModal">
      </div>
    </div>
    <div class="menu-mobile-list container-xl" @click="closeModal">
      <div class="menu-mobile-list-links">
        <nuxt-link to="/explorer" active-class="gradient-text" class="menu-mobile-list-link">Explorer</nuxt-link>
        <nuxt-link to="/rankings" active-class="gradient-text" class="menu-mobile-list-link">Rankings</nuxt-link>
        <nuxt-link to="/carbon" active-class="gradient-text" class="menu-mobile-list-link">Carbon offset</nuxt-link>
      </div>
      <client-only>
        <profileModal :sideMenu="true" v-if="isMobile()"/>
      </client-only>
      <!-- <a href="https://forms.gle/R7LmANz7iqsCA88X8" target="_blank" class="menu-mobile-list-link">Launchpad</a> -->
    </div>
  </div>
</template>
<script>
import profileModal from '@/components/modals/profileModal'

export default {
  components: {
    profileModal
  },
  computed: {
    address() {
      return this.$store.state.address
    },
    closeIcon() {
      if (!this.isMobile()) {
        return '/close.svg'
      } else {
        return '/close-header.svg'
      }
    }
  },
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
    &-walletbox {
      display: flex;
      align-items: center;
    }
    &-close {
      width: 2.2rem;
    }
  }
  &-list {
    height: calc(100vh - 15.2rem);
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: column;
    padding-top: 4rem;
    &-links {
      display: flex;
      flex-direction: column;
    }
    &-link {
      width: 100%;
      padding-bottom: 2.5rem;
    }
  }
  @media (max-width: 460px) {
    &-header-close {
      width: 1.8rem;
    }    
  }
}
</style>