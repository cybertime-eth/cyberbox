<template>
  <div class="menu-mobile">
    <div class="menu-mobile-header container-xl">
      <img src="/logo.svg" alt="logo" class="menu-mobile-header-logo">
      <div class="menu-mobile-header-walletbox">
        <div class="header__wallet" ref="wallet" v-if="address" @click="showProfileMenu = !showProfileMenu">
          <h3 class="header__wallet-address">{{ address }}</h3>
          <div class="header__wallet-avatar gradient-button">
            <img src="/celo.svg" alt="avatar">
          </div>
        </div>
        <img :src="closeIcon" alt="close" class="menu-mobile-header-close" @click="closeModal">
      </div>
    </div>
    <div class="menu-mobile-list container-xl" @click="closeModal">
      <nuxt-link to="/explorer" active-class="gradient-text" class="menu-mobile-list-link">Explorer</nuxt-link>
      <nuxt-link to="/rankings" active-class="gradient-text" class="menu-mobile-list-link">Rankings</nuxt-link>
      <nuxt-link to="/loans" active-class="gradient-text" class="menu-mobile-list-link">NFT loans</nuxt-link>
      <!-- <a href="https://forms.gle/R7LmANz7iqsCA88X8" target="_blank" class="menu-mobile-list-link">Launchpad</a> -->
    </div>
    <profileModal v-show="showProfileMenu" @closeModal="showProfileMenu = false"/>
  </div>
</template>
<script>
import profileModal from '@/components/modals/profileModal'
export default {
  components: {
    profileModal
  },
  data() {
    return {
      showProfileMenu: false
    }
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
  beforeMount() {
    window.addEventListener('click', this.handleClickWindow)
  },
  beforeDestroy() {
    window.removeEventListener('click', this.handleClickWindow)
  },
  methods: {
    handleClickWindow(e) {
      if (this.$refs.wallet && !this.$refs.wallet.contains(e.target)) {
        this.showProfileMenu = false
      }
    },
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
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    padding-top: 4rem;
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
