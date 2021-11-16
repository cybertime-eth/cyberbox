<template>
  <section class="collection">
    <img src="/CeloPunks.png" alt="banner" class="collection__banner">
    <div class="collection__content container-xl">
      <div class="collection__header">
        <img src="/avatar-punks.png" alt="avatar" class="collection__header-avatar">
        <h1 class="collection__header-title">CeloPunks</h1>
        <p class="collection__header-subtitle">Collectibes</p>
        <div class="collection__header-socials">
          <img src="/socials/disckord.svg" alt="social">
          <img src="/socials/telegram.svg" alt="social">
          <img src="/socials/twitter.svg" alt="social">
          <img src="/socials/web.svg" alt="social">
        </div>
        <div class="collection__header-info">
          <div class="collection__header-info-block">
            <h3 class="collection__header-info-block-title">{{ nftList ? nftList.length : 0 }}</h3>
            <h3 class="collection__header-info-block-subtitle">Items</h3>
          </div>
          <div class="collection__header-info-block">
            <h3 class="collection__header-info-block-title">5.0K</h3>
            <h3 class="collection__header-info-block-subtitle">Owners</h3>
          </div>
          <div class="collection__header-info-block">
            <h3 class="collection__header-info-block-title">76 CELO</h3>
            <h3 class="collection__header-info-block-subtitle">Volume traded</h3>
          </div>
          <div class="collection__header-info-block">
            <h3 class="collection__header-info-block-title">0.1 Celo</h3>
            <h3 class="collection__header-info-block-subtitle">Floor price</h3>
          </div>
        </div>
        <h3 class="collection__header-content">
          Wipies is the biggest collection of digital toilet paper on the blockchain.
          Each one of the 10,000 Wipies is as special as the next, but some Wipies are rarer than the others.
          Wipies come in different rarities ranging from the ultra-rare 'Artifact' to the common 'Unusual' Wipies.
          The rarer the attributes, the rarer your Wipies will be! You can reveal on unopend in the Poopies.io's Gallery.
        </h3>
      </div>
      <div class="collection__filter">
        <button
          class="collection__filter-button"
          :class="{'collection__filter-button-active': filter === 1}"
          @click="filter = 1"
        >
          All
        </button>
        <button
          class="collection__filter-button"
          :class="{'collection__filter-button-active': filter === 2}"
          @click="filter = 2"
        >
          Listings
        </button>
        <button
          class="collection__filter-button"
          :class="{'collection__filter-button-active': filter === 3}"
          @click="filter = 3"
        >
          Sold
        </button>
      </div>
      <div class="collection__sort">
        <button
          class="collection__sort-button"
          :class="{'collection__sort-button-active': sort === 1}"
          @click="sort = 1"
        >
          Sold - Latest
        </button>
        <button
          class="collection__sort-button"
          :class="{'collection__sort-button-active': sort === 2}"
          @click="sort = 2"
        >
          Price - Lowest
        </button>
        <button
          class="collection__sort-button"
          :class="{'collection__sort-button-active': sort === 3}"
          @click="sort = 3"
        >
          Price - Highest
        </button>
        <button
          class="collection__sort-button"
          :class="{'collection__sort-button-active': sort === 4}"
          @click="sort = 4"
        >
          Traits
          <img src="/sort.svg" alt="sort">
        </button>
      </div>
      <div class="collection__items">
        <div class="collection__item" @click="$router.push(`/collections/daopolis/${nft.id}`)" v-for="(nft, index) of nftList">
          <img src="/banner-1.png" alt="item" class="collection__item-image">
          <div class="collection__item-info">
            <h2 class="collection__item-info-name">
              test nft
            </h2>
            <p class="collection__item-info-rarity">Rarity Rank 1111</p>
            <p class="collection__item-info-id">Token ID {{ nft.id }}</p>
            <div class="collection__item-info-price">
              <img src="/celo.png" alt="celo">
              <h3 class="collection__item-info-price-text">{{ nft.price }} <span>CELO</span></h3>
            </div>
            <p class="collection__item-info-type">Price</p>
            <button class="collection__item-info-details">Details</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      filter: 1,
      sort: 0,
    }
  },
  async created() {
    if (!this.nftList.length) {
      await this.$store.dispatch('getCeloNftList')
    }
    console.log(this.nftList)
  },
  computed: {
    nftList() {
      return this.$store.state.nftList
    }
  }
}
</script>
<style lang="scss">
.collection {
  padding-bottom: 20rem;
  &__banner {
    width: 100%;
    height: 22.4rem;
    object-fit: cover;
  }
  &__content {
    position: relative;
    top: -7rem;
  }
  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    &-avatar {
      width: 12.6rem;
      height: 12.6rem;
      border-radius: 50%;
    }
    &-title {
      padding-top: 2rem;
    }
    &-socials {
      position: absolute;
      right: 0;
      top: 10rem;
      width: 17rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      :first-child {
        width: 2.1rem;
      }
      img {
        width: 2rem;
      }
    }
    &-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 2rem;
      &-block {
        width: 14.6rem;
        height: 6.8rem;
        border: .1rem solid $lightGreen;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-right: 1rem;
        &-title {
          font-family: OpenSans-SemiBold;
        }
        &-subtitle {
          font-family: OpenSans-Regular;
          margin-top: .4rem;
        }
      }
    }
    &-content {
      color: $grayLight;
      text-align: center;
      width: 65rem;
      padding-top: 1rem;
      letter-spacing: 0.03em;
    }
  }
  &__filter {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border: .1rem solid $modalColor;
    border-radius: 2.5rem;
    margin-top: 4rem;
    &-button {
      width: 42.6rem;
      height: 5.4rem;
      border-radius: 2.5rem;
      background: none;
      &-active {
        background: $lightGreen;
      }
    }
  }
  &__sort {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 3.2rem;
    &-button {
      width: 31.5rem;
      height: 4rem;
      box-shadow: 0 .4rem 1.2rem rgba(0, 0, 0, 0.05);
      border-radius: .8rem;
      background: none;
      font-family: OpenSans-Regular;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        margin-left: 1.2rem;
        width: 2rem;
      }
      &-active {
        background: $modalColor;
      }
    }
  }
  &__items {
    display: grid;
    grid-template-columns: 20rem 20rem 20rem 20rem 20rem 20rem;
    grid-column-gap: 2.4rem;
    grid-row-gap: 3.2rem;
    padding-top: 3.2rem;
  }
  &__item {
    width: 20rem;
    height: 42.4rem;
    border-radius: .4rem;
    box-shadow: 0 .4rem 1.2rem rgba(0, 0, 0, 0.05);
    transition: 1s;
    cursor: pointer;
    &-image {
      width: 20rem;
      height: 20rem;
      object-fit: cover;
      border-radius: .4rem .4rem 0 0;
    }
    &-info {
      padding: 1.6rem .8rem 3.4rem;
      &-name {
        font-size: 1.8rem;
        font-family: OpenSans-SemiBold;
      }
      &-rarity {
        color: $grayLight;
        font-size: 1.3rem;
      }
      &-id {
        color: $grayLight;
        padding-top: .5rem;
        font-size: 1.3rem;
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
            padding-left: .5rem;
          }
        }
      }
      &-type {
        color: $border;
        font-size: 1.1rem;
        padding-top: 1rem;
      }
      &-details {
        width: 18.4rem;
        height: 2.8rem;
        border-radius: 2rem;
        font-size: 1.3rem;
        margin-top: 1.5rem;
        background: $modalColor;
      }
    }
    &:hover {
      position: relative;
      top: -.5rem;
      transition: 1s;
    }
  }
}
@media screen and (max-width: 460px) {
  .collection {
    &__items {
      grid-template-columns: 1fr;
    }
  }
}
</style>
