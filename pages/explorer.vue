<template>
  <section class="home container-xl" :class="{'wrong-network': wrongNetwork}">
    <h1 class="home__title">Discover, collect and trade NFTs</h1>
    <div class="home__items">
      <div class="home__item" @click="$router.push(`/collections/${collection.route}`)" v-for="collection of list">
        <img :src="collectionImage(collection)" alt="dao" class="home__item-image">
        <div class="home__item-info">
          <h2 class="home__item-info-name">{{ collection.name }}</h2>
          <button class="home__item-info-button">Marketplace</button>
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
    },
    wrongNetwork() {
      return this.$store.state.wrongNetwork
    }
  },
  created() {
    if (process.browser) {
      localStorage.removeItem('move_back')
    }
    this.$store.commit('updateCollectionSetting', null)
  },
  methods: {
	collectionImage(collection) {
	  if (collection.route !== 'CBCN' || !this.isMobile()) {
		return collection.image
	  } else {
		return collection.mobileImage
	  }
	},
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
    padding-top: 2.2rem;
    &.wrong-network {
      padding-top: 7.3rem;
    }
    &__title {
      font-size: 1.8rem;
      letter-spacing: 0.03em;
    }
    &__items {
      grid-template-columns: 14.4rem 14.4rem;
      padding-top: 2.1rem;
      grid-row-gap: 1.6rem;
    }
    &__item {
      width: 100%;
      height: 15rem;
      &-image {
        width: 100%;
        height: 9.6rem;
      }
      &-info {
        padding-top: 1.5rem;
        &-name {
		  width: calc(100% - 1.6rem);
		  padding: 0 0.8rem;
          font-size: 1.4rem;
		  white-space: nowrap;
		  overflow: hidden;
		  text-overflow: ellipsis;
		  text-align: center;
        }
        &-button {
          display: none;
        }
      }
    }
  }
}
</style>
