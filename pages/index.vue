<template>
  <section class="home container-xl">
    <div class="home__desktop-container">
      <h1 class="home__title">Discover, collect and trade NFTs</h1>
      <div class="home__items">
        <div class="home__item" @click="$router.push(`/collections/${collection.route}`)" v-for="collection of list">
          <img :src="collection.image" alt="dao" class="home__item-image">
          <div class="home__item-info">
            <h2 class="home__item-info-name">{{ collection.name }}</h2>
            <button class="home__item-info-button">Marketplace</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  computed: {
    list() {
      return this.$store.state.collectionList
    }
  },
  created() {
    localStorage.removeItem('move_back')
    this.$store.commit('updateCollectionSetting', null)
  },
  methods: {
    openDaopolis() {
      window.open('https://daopolis.city')
    }
  }
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
    grid-template-columns: 42.4rem 42.4rem 42.4rem;
    grid-column-gap: 2rem;
    grid-row-gap: 3.2rem;
    padding-top: 5.8rem;
  }
  &__item {
    width: 42.4rem;
    height: 37.6rem;
    border-radius: .4rem;
    box-shadow: 0 .4rem 1.2rem rgba(0, 0, 0, 0.05);
    cursor: pointer;
    &-image {
      width: 42.4rem;
      height: 22.5rem;
      object-fit: cover;
      border-radius: .4rem .4rem 0 0;
    }
    &-info {
      display: flex;
      align-items: center;
      flex-direction: column;
      padding-top: 2.8rem;
      &-button {
        margin-top: 3.2rem;
        width: 14.8rem;
        height: 3.2rem;
        box-shadow: 0 .4rem 1.2rem rgba(0, 0, 0, 0.05);
        border-radius: 2rem;
        background: none;
        font-size: 1.3rem;
        font-family: OpenSans-Regular;
      }
    }
    &:hover {
      transform: scale(1.02);
    }
  }
}
@media screen and (max-width: 460px) {
  .home {
    padding-top: 2.5rem;
    &__title-box {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
    }
    &__title {
      // font-size: 1.8rem;
      margin-left: 1.2rem;
      font-size: 1.8rem;
      letter-spacing: 0.03em;
    }
    &__waiting-img-box {
      width: 22.8rem;
      margin: 0 auto;
      padding-top: 2.6rem;
      padding-bottom: 2rem;
      text-align: center;
    }
    &__wait-img {
      width: 100%;
    }
    &__info {
      padding: 0 2.6rem;
      line-height: 20px;
      letter-spacing: 0.03em;
      text-align: center;
      font-size: 1.4rem;
      color: $textColor;
    }
    &__items {
      grid-template-columns: 1fr;
      padding-top: 2.1rem;
      grid-row-gap: 2rem;
    }
    &__item {
      width: 100%;
      height: 37.6rem;
      &-image {
        width: 100%;
        height: 22.4rem;
      }
      &-info {
        // padding-top: 1.5rem;
        &-button {
          margin-top: 2.2rem;
        }
      }
    }
  }
}
</style>
