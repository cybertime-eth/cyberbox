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
            <nuxt-link class="header__link" to="#">Marketplace</nuxt-link>
          </li>
          <li class="header__list">
            <nuxt-link class="header__link" to="#">Minted Box</nuxt-link>
          </li>
          <li class="header__list">
            <nuxt-link class="header__link" to="#">Rankings</nuxt-link>
          </li>
          <li class="header__list">
            <nuxt-link class="header__link" to="#">About</nuxt-link>
          </li>
        </ul>
      </nav>
      <button class="header__box gradient-button">
        Create Box
      </button>
      <nuxt-link to="/profile/1" class="header__wallet">
        <h3 class="header__wallet-address">0x5cbd...031a</h3>
        <div class="header__wallet-avatar gradient-button">
          <img :src="user.image" alt="avatar" v-if="user.image">
        </div>
      </nuxt-link>
    </div>
  </header>
</template>
<script>
export default {
  data() {
    return {
      image: false
    }
  },
  computed: {
    user() {
      return this.$store.state.user
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
  grid-template-columns: 32rem 42rem 35.3rem 22.5rem;
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
    width: 13.9rem;
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
      img {
        width: 4.2rem;
        height: 4.5rem;
        object-fit: cover;
        border-radius: 2.5rem;
      }
    }
  }
}
</style>
