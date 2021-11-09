<template>
  <section class="home container-xl">
    <h1 class="home__title">Discover, collect and trade NFTs</h1>
    <div class="home__items">
      <div class="home__item" @click="$router.push('/collections/daopolis')">
        <img src="/daopolis-nft.png" alt="dao" class="home__item-image">
        <div class="home__item-info">
          <h2 class="home__item-info-name">Daopolis</h2>
          <button class="home__item-info-button">Marketplace</button>
        </div>
      </div>
      <div class="home__item" @click="$router.push('/collections/punks')">
        <img src="/punk-nft.png" alt="dao" class="home__item-image">
        <div class="home__item-info">
          <h2 class="home__item-info-name">Panks</h2>
          <button class="home__item-info-button">Marketplace</button>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  created() {
    this.$store.dispatch('getCeloPunks')
  },
}
</script>
<style lang="scss">
.home {
  padding-top: 4.2rem;
  padding-bottom: 17.5rem;
  &__title {
    text-align: center;
  }
  &__items {
    display: grid;
    grid-template-columns: 31.5rem 31.5rem 31.5rem 31.5rem;
    grid-column-gap: 2rem;
    grid-row-gap: 3.2rem;
    padding-top: 5.8rem;
  }
  &__item {
    width: 31.5rem;
    height: 44rem;
    border-radius: .4rem;
    box-shadow: 0 .4rem 1.2rem rgba(0, 0, 0, 0.05);
    &-image {
      width: 31.5rem;
      height: 31.5rem;
      object-fit: cover;
    }
    &-info {
      display: flex;
      align-items: center;
      flex-direction: column;
      padding-top: 1rem;
      &-button {
        margin-top: 2.1rem;
        width: 10.3rem;
        height: 3.2rem;
        box-shadow: 0 .4rem 1.2rem rgba(0, 0, 0, 0.05);
        border-radius: 2rem;
        background: none;
        font-size: 1.3rem;
        font-family: OpenSans-Regular;
      }
    }
  }
}
</style>
