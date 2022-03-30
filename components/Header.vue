<template>
  <header>
    <div class="header container-xl">
      <button class="header__back" v-if="nftId" @click="handleClickBack">
        <img src="/arrow-left.svg" alt="back" class="header__back-img">
      </button>
      <div class="header__logo" @click="$router.push('/')">
        <img src="/logo.svg" alt="logo" class="header__logo-img">
      </div>
      <searchInput class="header__search" />
      <nav class="header__navigation">
        <ul class="header__ul">
          <li class="header__list">
            <nuxt-link class="header__link" to="/" append active-class="gradient-text" exact>Marketplace</nuxt-link>
          </li>
          <li class="header__list">
            <nuxt-link class="header__link" active-class="gradient-text" to="/rankings"  exact>Rankings</nuxt-link>
          </li>
          <li class="header__list">
            <nuxt-link class="header__link" active-class="gradient-text" to="/loans"  exact>NFT loans</nuxt-link>
          </li>
          <!-- <li class="header__list">
            <a class="header__link" href="https://forms.gle/R7LmANz7iqsCA88X8" target="_blank">Launchpad</a>
          </li> -->
        </ul>
      </nav>
      <button class="header__box gradient-button" v-if="address" @click="$router.push('/mycollection')">
       {{ myCollectionTitle }}
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
      <img src="/search-mobile.svg" alt="search" class="header__mobile-search" @click="showSearchView = true">
      <img src="/burger.svg" alt="burger" class="header__mobile-menu" @click="showMobileMenu">
      <div class="header__error-network" v-if="showWrongNetwork">
        <img src="/pulse.svg" alt="pulse">
        <p class="header__error-network-text">You are on the wrong network</p>
      </div>
    </div>
    <connect v-if="showConnectModal && !address" @showValora="openValoraModal" @closeModal="closeModal"/>
    <valoraConnect v-if="showValoraModal"  @closeModal="showValoraModal = false" />
    <wrongNetwork v-if="showWrongNetworkModal" @closeModal="showWrongNetworkModal = false"/>
    <profileModal v-show="showProfileMenu" @closeModal="closeModal"/>
    <profileModalMobile v-show="showProfileMenuMobile" @closeModal="closeModal"/>
    <searchView v-show="showSearchView" @close="showSearchView = false"/>
  </header>
</template>
<script>
import connect from '@/components/modals/connect'
import valoraConnect from '@/components/modals/valoraConnect'
import profileModal from '@/components/modals/profileModal'
import profileModalMobile from '@/components/modals/profileModalMobile'
import wrongNetwork from '@/components/modals/wrongNetwork'
import searchInput from '@/components/search/searchInput'
import searchView from '@/components/search/searchView'
export default {
  data() {
    return {
      image: false,
      showConnectModal: false,
      showValoraModal: false,
      showProfileMenu: false,
      showProfileMenuMobile: false,
      showWrongNetwork: false,
      showWrongNetworkModal: false,
      showSearchView: false
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
    valoraConnect,
    wrongNetwork,
    profileModal,
    profileModalMobile,
    searchInput,
    searchView
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
    myCollectionTitle() {
      return !this.isMobile() || window.innerWidth > 460 ? 'My Collection' : 'My NFT'
    },
  },
  created() {
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
    handleClickBack() {
      localStorage.setItem('move_back', true)
      this.$router.go(-1)
    },
    showMobileMenu() {
      this.showProfileMenuMobile = true;
      const footerEl = document.querySelector('.footer')
      footerEl.classList.add('fixed')
      footerEl.classList.add('sidemenu')
    },
    openValoraModal() {
      this.showValoraModal = true
      this.showConnectModal = false
    },
    closeModal(payload) {
      this.showConnectModal = payload
      this.showProfileMenu = payload
      this.showProfileMenuMobile = payload
      if (this.isMobile()) {
        const footerEl = document.querySelector('.footer')
        footerEl.classList.remove('fixed')
        footerEl.classList.remove('sidemenu')
      }
    }
  }
}
</script>
<style lang="scss">
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
header {
  box-shadow: 0px 4px 12px rgb(0 0 0 / 5%);
}
.header {
  height: 9.5rem;
  display: grid;
  grid-template-columns: 6.4rem 23.6rem 28rem 52.1rem 22rem;
  align-items: center;
  position: relative;
  &__back {
    display: none;
  }
  &__logo {
    display: flex;
    align-items: center;
    width: 5.1rem;
    justify-content: space-between;
    &-link {
      letter-spacing: 0.04em;
    }
    &-img {
      width: 6rem;
    }
  }
  &__search {
    width: 19.3rem;
  }
  &__ul {
    display: flex;
    justify-content: space-between;
  }
  &__box {
    width: 15.8rem;
    height: 4.8rem;
    cursor: pointer;
    &.gradient-button {
      &::after {
        left: -0.26rem;
        right: -0.26rem;
      }
    }
  }
  &__error {
    &-network {
      position: absolute;
      right: 0;
      top: 100%;
      padding: 1.2rem .8rem;
      background: $pink;
      display: flex;
      align-items: center;
      border-radius: .8rem;
      width: 24rem;
      margin-top: 32px;
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
    z-index: 1;
    &-address {
      width: 65%;
      padding-left: 2.2rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &-avatar {
      width: 4.6rem;
      height: 4.6rem;
      border-radius: 50% !important;
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
    &-search {
      display: none;
    }
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
    position: relative;
    &__null {
      display: none;
    }
    &__search {
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
      min-width: 9.6rem;
      height: 2.4rem;
      margin-right: .8rem;
      font-size: 1.3rem;
    }
    &__connect {
      display: none;
    }
    &__error {
      &-network {
        width: auto;
        position: absolute;
        left: 50%;
        right: auto;
        top: 7.8rem;
        margin-top: 0;
        padding: 0.8rem 0.5rem;
        transform: translateX(-50%);
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
        width: auto;
        padding-left: 0;
        font-size: 1.3rem;
      }
    }
    &__mobile {
      display: block;
      &-search {
        display: block;
        width: 1.8rem;
        margin-right: 2.2rem;
      }
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
