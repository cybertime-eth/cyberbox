<template>
  <section id="card">
    <div class="card">
      <div class="card__container container-xl">
        <nuxt-link to="/collections/daopolis" class="card__crumbs">
          Marketplace
          <img src="/array-right.svg" alt="array">
          <span>{{ card.name }}</span>
        </nuxt-link>
        <div class="card__block">
          <img :src="card.image" alt="item" class="card__block-image" v-if="card.image">
          <div v-else class="card__block-image-loading">
            <img src="/loading-button.svg" alt="load">
          </div>
          <div class="card__block-info">
            <h1 class="card__block-info-name">{{ card.name }}</h1>
            <h3 class="card__block-info-minted">Rarity rank 3629</h3>
            <p class="card__block-info-price-text">Price</p>
            <div class="card__block-info-price"><img src="/celo.png" alt="celo"><h1>2 CELO</h1><span>= 30$</span></div>
            <p class="card__block-info-description">{{ card.description }}</p>
            <div class="card__block-info-status">
              <p class="card__block-info-status-title">Market status</p>
              <h3 class="card__block-info-status-content">For sale</h3>
            </div>
            <button class="card__block-info-buy">Buy now</button>
          </div>
        </div>
      </div>
    </div>
    <Attributes :item="card"/>
    <History />
  </section>
</template>
<script>
import Attributes from '@/components/card-id/Attributes'
import History from '@/components/card-id/History-table'
export default {
  components: {
    Attributes,
    History
  },
  async mounted() {
    await this.$store.dispatch('getCeloCard', this.$route.params.nftid)
  },
  computed: {
    card() {
      return this.$store.state.card
    }
  }
}
</script>
<style lang="scss">
#card {
  padding-bottom: 10rem;
  padding-top: 4rem;
}
.card {
  box-shadow: 0 .4rem 1.2rem rgba(0, 0, 0, 0.05);
  padding-bottom: 3rem;
  &__crumbs {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 23rem;
    color: $border;
    span {
      color: $pink;
    }
  }
  &__block {
    display: grid;
    grid-template-columns: 56.6rem 1fr;
    grid-column-gap: 10.2rem;
    justify-content: space-between;
    padding-top: 4.5rem;
    &-image {
      width: 56.6rem;
      height: 56.6rem;
      object-fit: cover;
      &-loading {
        width: 56.6rem;
        height: 56.6rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border: .1rem solid $pink;
        img {
          width: 8rem;
          animation: loading 1s infinite;
        }
      }
    }
    &-info {
      &-name {
        font-family: Cabin-Bold;
      }
      &-minted {
        font-family: OpenSans-Regular;
        padding-top: 1rem;
      }
      &-description {
        padding-top: 1rem;
      }
      &-price {
        display: flex;
        align-items: center;
        img {
          width: 3.2rem;
          margin-right: 1rem;
        }
        &-text {
          padding-top: 3rem;
          padding-bottom: .5rem;
        }
        span {
          margin-left: 1.4rem;
          font-size: 1.3rem;
          color: $span;
        }
      }
      &-status {
        padding-top: 3.2rem;
        &-content {
          font-size: 1.8rem;
          padding-top: .4rem;
          font-family: OpenSans-SemiBold;
        }
      }
      &-buy {
        margin-top: 10rem;
        background: $pink;
        width: 22.4rem;
        height: 5.4rem;
        color: $white;
      }
    }
  }
}
</style>
