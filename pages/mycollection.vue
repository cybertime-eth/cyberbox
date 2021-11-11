<template>
  <section class="my-collection">
    <h1 class="my-collection__title">My collection</h1>
    <div class="my-collection__empty" v-if="empty">
      <h3 class="my-collection__empty-title">You don't have NFT yet</h3>
      <button class="gradient-button my-collection__empty-button" @click="$router.push('/')">Buy</button>
    </div>
    <div class="my-collection__items" v-else-if="!empty && cards.length">
      <div class="my-collection__item" @click="$router.push(`/list-nft/${index+222}`)" v-for="(card, index) of cards" v-if="cards">
        <img :src="card.image" alt="item" class="my-collection__item-image">
        <div class="my-collection__item-info">
          <h2 class="my-collection__item-info-name">
            {{ card.name }}
          </h2>
          <div class="my-collection__item-info-price">
            <img src="/celo.png" alt="celo">
            <h3 class="my-collection__item-info-price-text">0.38477 <span>CELO</span></h3>
          </div>
          <p class="my-collection__item-info-type">Last sold</p>
        </div>
      </div>
    </div>
    <div class="my-collection__loading" v-else-if="!empty && !cards.length">
      <img src="/loading-button.svg" alt="load">
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      empty: false,
      showTransfer: false,
      showPurchased: false
    }
  },
  async created() {
    if (!this.cards.length) {
      await this.$store.dispatch('getCeloCards')
    }
  },
  computed: {
    cards() {
      return this.$store.state.myCollection
    }
  },
  methods: {
    closeModal(payload) {
      this.showTransfer = payload
      this.showPurchased = payload
    }
  },
}
</script>
<style lang="scss">
.my-collection {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 4.2rem;
  padding-bottom: 20rem;
  &__title {
    font-family: Cabin-Bold;
  }
  &__empty {
    padding-top: 6rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    &-button {
      margin-top: 2rem;
      width: 16.4rem;
      height: 5.4rem;
      cursor: pointer;
      &::after {
        border-radius: 2.5rem;
      }
    }
  }
  &__items {
    display: grid;
    grid-template-columns: 31.5rem 31.5rem 31.5rem 31.5rem;
    grid-column-gap: 2rem;
    padding-top: 5.8rem;
  }
  &__item {
    width: 31.5rem;
    height: 48rem;
    border-radius: .4rem;
    box-shadow: 0 .4rem 1.2rem rgba(0, 0, 0, 0.05);
    &-image {
      width: 31.5rem;
      height: 31.5rem;
      object-fit: cover;
    }
    &-info {
      padding: 1.3rem 1.6rem 3.4rem;
      &-name {
        font-size: 1.8rem;
        font-family: OpenSans-SemiBold;
      }
      &-price {
        display: flex;
        align-items: center;
        padding-top: 2.5rem;
        img {
          width: 1.8rem;
        }
        &-text {
          padding-left: .8rem;
          font-family: OpenSans-SemiBold;
          span {
            padding-left: 1rem;
          }
        }
      }
      &-type {
        color: $border;
        font-size: 1.1rem;
      }
    }
  }
  &__loading {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 20rem;
    img {
      width: 8rem;
      animation: loading 1s infinite;
    }
  }
}
</style>
