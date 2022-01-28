<template>
  <header>
    <div class="header container-xl">
      <button class="header__back" v-if="nftId" @click="$router.go(-1)">
        <img src="/arrow-left.svg" alt="back" class="header__back-img">
      </button>
      <div class="header__logo" @click="$router.push('/')">
        <img src="/logo.svg" alt="logo" class="header__logo-img">
      </div>
      <nav class="header__navigation">
        <ul class="header__ul">
          <li class="header__list">
            <nuxt-link class="header__link" to="/" append active-class="gradient-text" exact>Marketplace</nuxt-link>
          </li>
          <li class="header__list">
            <nuxt-link class="header__link" active-class="gradient-text" to="/rankings"  exact>Rankings</nuxt-link>
          </li>
          <!-- <li class="header__list">
            <a class="header__link" href="https://forms.gle/R7LmANz7iqsCA88X8" target="_blank">Launchpad</a>
          </li> -->
        </ul>
      </nav>
      <div class="header__error-network" v-if="showWrongNetwork">
        <img src="/pulse.svg" alt="pulse">
        <p class="header__error-network-text">{{ networkErrorText }}</p>
      </div>
      <div v-else class="header__null"></div>
      <button class="header__box gradient-button" v-if="address" @click="$router.push('/mycollection')">
       My Collection
      </button>
      <button v-else class="header__null"></button>
      <div class="header__wallet" ref="wallet" v-if="address" @click="showProfileMenu = !showProfileMenu">
        <h3 class="header__wallet-address">{{ address }}</h3>
        <div class="header__wallet-avatar gradient-button">
          <img src="/celo.svg" alt="avatar">
        </div>
      </div>
      <button class="gradient-button header__connect" v-if="!address" @click="showConnectModal = true">Connect Wallet</button>
      <button class="gradient-button header__mobile-connect" v-if="!address"  @click="showConnectModal = true">Connect</button>
      <img src="/burger.svg" alt="burger" class="header__mobile-menu" @click="showProfileMenuMobile = true">
    </div>
    <connect v-if="showConnectModal && !address" @closeModal="closeModal"/>
    <wrongNetwork v-if="showWrongNetworkModal" @closeModal="showWrongNetworkModal = false"/>
    <profileModal v-show="showProfileMenu" @closeModal="closeModal"/>
    <profileModalMobile v-show="showProfileMenuMobile" @closeModal="closeModal"/>
  </header>
</template>
<script>
import connect from '@/components/modals/connect'
import profileModal from '@/components/modals/profileModal'
import profileModalMobile from '@/components/modals/profileModalMobile'
import wrongNetwork from '@/components/modals/wrongNetwork'
export default {
  data() {
    return {
      image: false,
      showConnectModal: false,
      showProfileMenu: false,
      showProfileMenuMobile: false,
      showWrongNetwork: false,
      showWrongNetworkModal: false
    }
  },
  watch: {
    chainId() {
      const id = this.$store.state.chainId
      id === 42220 || id === null ? this.showWrongNetwork = false :  this.showWrongNetwork = true
    },
    address() {
      if (this.address && this.chainId !== 42220) {
        this.showWrongNetworkModal = true
      }
    }
  },
  components: {
    connect,
    wrongNetwork,
    profileModal,
    profileModalMobile
  },
  computed: {
    chainId() {
      return this.$store.state.chainId
    },
    user() {
      return this.$store.state.user
    },
    address() {
      return this.$store.state.address
    },
    nftId() {
      return this.$route.params.nftid
    },
    networkErrorText() {
      let errorText = 'You are on the wrong network'
      if (process.browser) {
        if (window.innerWidth < 460) {
          errorText = 'Wrong Network'
        }
      }
      return errorText
    }
  },
  beforeMount() {
    if (process.browser) {
      window.addEventListener('click', this.handleClickWindow)
    }
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
    closeModal(payload) {
      this.showConnectModal = payload
      this.showProfileMenu = payload
      this.showProfileMenuMobile = payload
    }
  }
}
</script>
<style lang="scss">
header {
  box-shadow: 0 .4rem 1.2rem rgba(0, 0, 0, 0.05);
}
.header {
  height: 9.5rem;
  display: grid;
  grid-template-columns: 14rem 20rem 58.3rem 17.5rem 22rem;
  align-items: center;
  &__back {
    display: none;
  }
  &__logo {
    display: flex;
    align-items: center;
    width: 14.9rem;
    justify-content: space-between;
    &-link {
      letter-spacing: 0.04em;
    }
    &-img {
      width: 6rem;
    }
  }
  &__ul {
    display: flex;
    justify-content: space-between;
  }
  &__box {
    width: 15.8rem;
    height: 4.8rem;
    cursor: pointer;
  }
  &__error {
    &-network {
      padding: 1.2rem .8rem;
      background: $pink;
      display: flex;
      align-items: center;
      border-radius: .8rem;
      width: 24rem;
      justify-self: flex-end;
      &-text {
        color: $white;
        padding-left: .8rem;
      }
    }
  }
  &__wallet {
    background: #E9FCEE;
    border-radius: 2.5rem;
    width: 19.7rem;
    height: 4.8rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    justify-self: end;
    cursor: pointer;
    position: relative;
    z-index: 1;
    &-address {
      padding-left: 2.2rem;
    }

    &-avatar {
      width: 4.2rem;
      height: 4.5rem;
      border-radius: 2.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      &::after {
        border-radius: 50% !important;
      }
      img {
        width: 2.4rem;
        height: 2.4rem;
        object-fit: cover;
        border-radius: 25%;
      }
    }
  }
  &__connect {
    width: 17.4rem;
    height: 4.8rem;
    cursor: pointer;
  }
  &__mobile {
    display: none;
    &-menu {
      display: none;
    }
    &-connect {
      display: none;
    }
  }
}
@media screen and (max-width: 460px) {
  .header {
    display: flex;
    justify-content: space-between;
    height: 6.5rem;
    &__null {
      display: none;
    }
    &__navigation {
      display: none;
    }
    &__back {
      display: block;
      height: 2rem;
      background: transparent;
      margin-right: 2.2rem;
    }
    &__logo {
      img {
        width: 4rem;
      }
    }
    &__box {
      display: none;
    }
    &__connect {
      display: none;
    }
    &__error {
      &-network {
        width: auto;
        padding: 0.8rem 0.5rem;
        margin-right: 0.8rem;
        img {
          width: 1.4rem;
        }
        &-text {
          white-space: nowrap;
          font-size: 1.2rem;
        }
      }
    }
    &__wallet {
      width: 9.2rem;
      height: 2.4rem;
      justify-self: center;
      padding: .2rem 1rem;
      margin-right: 1rem;
      background: $purpleLight;
      &-avatar {
        display: none;
      }
      &-address {
        padding-left: 0;
        font-size: 1.3rem;
      }
    }
    &__mobile {
      display: block;
      &-menu {
        display: block;
        justify-self: flex-end;
        width: 1.8rem;
      }
      &-connect {
        display: block;
        width: 10.1rem;
        height: 2.4rem;
        font-size: 1.3rem;
      }
    }
  }
}
</style>
