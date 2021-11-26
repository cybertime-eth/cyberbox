<template>
  <section id="nft">
    <div class="nft">
      <div class="">
        <nuxt-link to="/collections/daopolis" class="nft__crumbs">
          Marketplace
          <img src="/array-right.svg" alt="array">
          <span>{{ nft.name }}</span>
        </nuxt-link>
        <div class="nft__block">
          <img :src="nft.image" alt="item" class="nft__block-image" v-if="nft.image">
          <div class="nft__block-image-loading" v-else>
            <img src="/loading-button.svg" alt="load">
          </div>
          <div class="nft__block-info">
            <h1 class="nft__block-info-name">{{ nft.name }}</h1>
            <h3 class="nft__block-info-minted">Rarity rank {{ nft.rarity_rank }}</h3>
            <p class="nft__block-info-price-text">Price</p>
            <div class="nft__block-info-price"><img src="/celo.png" alt="celo"><h1>{{ nft.price }} CELO</h1><span>= 30$</span></div>
            <p class="nft__block-info-description">{{ nft.description }}</p>
            <div class="nft__block-info-status">
              <p class="nft__block-info-status-title">Market status</p>
              <h3 class="nft__block-info-status-content">{{ nft.market_status === "BOUGHT" || nft.market_status === 'MINT' ? 'Not for sale' : 'For Sale'}}</h3>
            </div>
            <button class="nft__block-info-buy" @click="buyToken">Buy now</button>
          </div>
        </div>
      </div>
    </div>
    <Attributes :item="attributes" :info="nft"/>
<!--    <History />-->
  </section>
</template>
<script>
import Attributes from '@/components/nft-id/Attributes'
import History from '@/components/nft-id/History-table'
export default {
  data() {
    return {
      attributes: [],
    }
  },
  components: {
    Attributes,
    History
  },
  async mounted() {
    await this.$store.dispatch('getNft', this.$route.params.nftid)
    await this.getAttributes()
  },
  methods: {
    buyToken() {
      this.$store.dispatch('approveBuyToken', {
        id: this.$route.params.nftid,
        price: this.nft.price
      })
    },
    async getAttributes() {
      const res =  await this.$axios.get(this.nft.attributes);
      this.attributes = res.data.attributes
    }
  },
  computed: {
    nft() {
      return this.$store.state.nft
    },
  },
}
</script>
<style lang="scss">
#nft {
  padding-bottom: 10rem;
  padding-top: 4rem;
  width: 109.6rem;
  margin: 0 auto;
}
.nft {
  padding-bottom: 3rem;
  &__crumbs {
    display: flex;
    align-items: center;
    color: $border;
    img {
      margin-left: 1rem;
    }
    span {
      color: $pink;
      margin-left: 1rem;
    }
  }
  &__block {
    display: grid;
    grid-template-columns: 56.6rem 1fr;
    box-shadow: 0 .4rem 1.2rem rgba(0, 0, 0, 0.05);
    grid-column-gap: 2.4rem;
    justify-content: space-between;
    padding-top: 1.6rem;
    padding-bottom: 4rem;
    margin-top: 2.5rem;
    &-image {
      width: 52rem;
      height: 52rem;
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
@media screen and (max-width: 460px) {
  .nft {
    &__block {
      grid-template-columns: 1fr;
      &-image {
        width: 32.6rem;
        height: 32.6rem;
      }
      &-info {
        text-align: center;
        &-name {
          text-align: center;
          padding-top: 2rem;
        }
        &-price {
          justify-content: center;
        }
        &-buy {
          margin-top: 4rem;
        }
      }
    }
    &__crumbs {

    }
  }
}
</style>
