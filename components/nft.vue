<template>
  <div class="collection__item" @click="routeNft">
    <img :src="nft.image" alt="item" class="collection__item-image">
    <div class="collection__item-info">
      <h2 class="collection__item-info-name">
        {{ nft.name }}
      </h2>
      <p class="collection__item-info-rarity">Rarity Rank {{ nft.rarity_rank }}</p>
      <p class="collection__item-info-id">Token ID {{ nftID(nft.contract_id) }}</p>
      <p class="collection__item-info-type">Price</p>
      <div class="collection__item-info-price" v-if="nft.price > 0">
        <img src="/celo.png" alt="celo">
        <h3 class="collection__item-info-price-text">{{ nftPrice(nft.price) }} <span>CELO</span></h3>
      </div>
      <h3 class="collection__item-info-price-null" v-else>Not for sale</h3>
      <button class="collection__item-info-details">Details</button>
    </div>
  </div>
</template>
<script>
import {BigNumber} from "ethers";
export default {
  props: ['nft', 'route', 'seller'],
  methods: {
    nftPrice(number) {
      let decPlaces = 1;
      decPlaces = Math.pow(10, decPlaces);

      const abbrev = ["K", "M", "B", "T"];

      for (let i = abbrev.length - 1; i >= 0; i--) {

        let size = Math.pow(10, (i + 1) * 3);

        if (size <= number) {
          number = Math.round(number * decPlaces / size) / decPlaces;

          if ((number === 1000) && (i < abbrev.length - 1)) {
            number = 1;
            i++;
          }

          number += abbrev[i];

          break;
        }
      }
      return number;
    },
    nftID(id) {
      if (id >= 0) {
        return BigNumber.from(id).toNumber()
      } else {
        return id
      }
    },
    routeNft() {
      this.$router.push(this.route)
    }
  }
}
</script>
<style lang="scss">
.collection {
  &__item {
    width: 20rem;
    height: 42.4rem;
    border-radius: .4rem;
    box-shadow: 0 .4rem 1.2rem rgba(0, 0, 0, 0.05);
    transition: .3s;
    cursor: pointer;
    position: relative;
    top: 0;
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
        border-bottom: .1rem solid $modalColor;
        padding-bottom: 2rem;
      }
      &-price {
        display: flex;
        align-items: center;
        padding-top: .4rem;
        img {
          width: 1.8rem;
        }
        &-text {
          padding-left: .8rem;
          font-family: OpenSans-SemiBold;
          span {
            padding-left: .1rem;
          }
        }
        &-null {
          color: $border;
          padding-top: .4rem;
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
      top: -1rem;
      transition: .3s;
    }
  }
}
</style>
