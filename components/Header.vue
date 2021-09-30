<template>
  <header>
    <div class="header container-xl">
      <div class="header__logo">
        <img src="/logo.svg" alt="logo" class="header__logo-img">
        <nuxt-link to="/" class="header__logo-link">SaveNFT</nuxt-link>
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
      <button class="header__box">
        Create Box
      </button>
    </div>
  </header>
</template>
<script>

</script>
<style lang="scss">
header {
  box-shadow: 0 .4rem 1.2rem rgba(0, 0, 0, 0.05);
}
.header {
  height: 9.5rem;
  display: grid;
  grid-template-columns: 29.5rem 42rem 38rem;
  align-items: center;
  &__logo {
    display: flex;
    align-items: center;
    width: 13.5rem;
    justify-content: space-between;
    &-img {
      width: 6rem;
    }
  }
  &__navigation {
  }
  &__ul {
    display: flex;
    justify-content: space-between;
  }
  &__box {
    background: none;
    color: $pink;
    width: 13.9rem;
    height: 4.8rem;
    justify-self: end;
    border: .1rem solid transparent;
    border-image-slice : 1;
    border-image-source: linear-gradient(93.06deg, #FC2EF5 8.21%, #5489D8 50.57%, #2CFF64 100%);
  }
}
</style>
