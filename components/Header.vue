<template>
  <header>
    <div class="header container-xl">
      <div class="header__logo">
        <img src="/logo.svg" alt="logo" class="header__logo-img">
        <nuxt-link to="/" class="header__logo-link">CyberBox</nuxt-link>
      </div>
      <nav class="header__navigation">
        <ul class="header__ul">
          <li class="header__list">
            <nuxt-link class="header__link gradient-text" to="/">Marketplace</nuxt-link>
          </li>
<!--          <li class="header__list">-->
<!--            <nuxt-link class="header__link" to="#">Minted Box</nuxt-link>-->
<!--          </li>-->
<!--          <li class="header__list">-->
<!--            <nuxt-link class="header__link" to="#">Rankings</nuxt-link>-->
<!--          </li>-->
          <li class="header__list">
            <nuxt-link class="header__link" to="#">About</nuxt-link>
          </li>
        </ul>
      </nav>
      <button class="header__box gradient-button" v-if="address" @click="$router.push('/mycollection')">
       My Collection
      </button>
      <button v-else></button>
      <div class="header__wallet" v-if="address" @click="showProfileMenu = true">
        <h3 class="header__wallet-address">{{ address }}</h3>
        <div class="header__wallet-avatar gradient-button">
          <img :src="user.image" alt="avatar" v-if="user.image">
        </div>
      </div>
      <button class="gradient-button header__connect" v-else @click="showConnectModal = true">Connect Wallet</button>
    </div>
    <connect v-if="showConnectModal && !address" @closeModal="closeModal"/>
    <profileModal v-show="showProfileMenu" @closeModal="closeModal"/>
  </header>
</template>
<script>
import connect from '@/components/modals/connect'
import profileModal from '@/components/modals/profileModal'
export default {
  data() {
    return {
      image: false,
      showConnectModal: false,
      showProfileMenu: false
    }
  },
  components: {
    connect,
    profileModal
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    address() {
      return this.$store.state.address
    }
  },
  methods: {
    closeModal(payload) {
      this.showConnectModal = payload
      this.showProfileMenu = payload
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
  grid-template-columns: 47rem 18rem 44.3rem 22.5rem;
  align-items: center;
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
        width: 4.2rem;
        height: 4.5rem;
        object-fit: cover;
        border-radius: 2.5rem;
      }
    }
  }
  &__connect {
    width: 17.4rem;
    height: 4.8rem;
    cursor: pointer;
  }
}
@media screen and (max-width: 460px) {
  .header {
    grid-template-columns: 1fr;
    &__navigation {
      display: none;
    }
    &__box {
      display: none;
    }
    &__wallet {
      display: none;
    }
  }
}
</style>
