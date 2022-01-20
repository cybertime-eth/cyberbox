<template>
  <div class="collection__item" @click="routeNft(false)">
    <img src="/more.png" alt="more" v-if="seller" class="collection__item-more" @click="openModal(nft.id)">
    <div class="collection__item-modal" v-if="modalId === nft.id" @mouseleave="modalId = 0">
      <div class="collection__item-modal-button" @click="routeNft(true)">
        <img src="/outline-sell.svg" alt="sell">
        <h3>Visit</h3>
      </div>
<!--      <div class="collection__item-modal-button">-->
<!--        <img src="/transfer-black.svg" alt="transfer">-->
<!--        <h3>Transfer</h3>-->
<!--      </div>-->
      <div class="collection__item-modal-button" @click="copyLink">
        <img src="/copy-link.svg" alt="copy">
        <h3>Copy link</h3>
      </div>
    </div>
    <img :src="getNFTImage(nft)" alt="item" class="collection__item-image">
    <div class="collection__item-info">
      <h2 class="collection__item-info-name">
        {{ nft.name || nft.contract_name }}
      </h2>
      <p class="collection__item-info-id">Token ID {{ nftID(nft.contract_id) }}</p>
      <p class="collection__item-info-type" v-if="filter === 'bought'">Last sell</p>
      <p class="collection__item-info-type" v-else>Price</p>
      <div class="collection__item-info-price" v-if="nft.price > 0 && nft.market_status !== 'BOUGHT' || filter === 'bought'">
        <img src="/celo.svg" alt="celo">
        <h3 class="collection__item-info-price-text">{{ nftPrice(nft.price) }}</h3>
      </div>
      <h3 class="collection__item-info-price-null" v-else>Not for sale</h3>
      <button class="collection__item-info-details" @click="routeNft(true)">Details</button>
    </div>
  </div>
</template>
<script>
import {BigNumber} from "ethers";
export default {
  data() {
    return {
      modalId: 0
    }
  },
  props: ['nft', 'route', 'seller', 'filter'],
  methods: {
    copyLink() {
      this.$copyText(`https://cyberbox.vercel.app/collections/${this.nft.contract}/${this.nft.contract_id}`)
      this.$store.commit('setMessage', 'Link copied!')
      setTimeout(() => {
        this.$store.commit('setMessage', '')
      }, 2000)
    },
    openModal(id) {
      this.modalId = id
    },
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
    routeNft(payload) {
      if (!this.seller) {
        this.$router.push(this.route)
      }
      if (payload) {
        this.$router.push(this.route)
      }
    }
  }
}
</script>
<style lang="scss">
.collection {
  &__item {
    width: 20rem;
    height: 43.2rem;
    border-radius: .4rem;
    box-shadow: 0 .4rem 1.2rem rgba(0, 0, 0, 0.05);
    transition: .3s;
    cursor: pointer;
    position: relative;
    top: 0;
    &-modal {
      position: absolute;
      top: 3.8rem;
      left: .4rem;
      width: 19.2rem;
      height: 12.6rem;
      background: $white;
      box-shadow: 0 1.5rem 3rem rgba(0, 0, 0, 0.1);
      border-radius: .4rem;
      &-button {
        display: flex;
        align-items: center;
        padding-left: 1rem;
        width: 18.2rem;
        height: 6.2rem;
        img {
          width: 1.6rem;
        }
        h3 {
          padding-left: 1.5rem;
        }
        &:hover {
          background: $lightGreen;
        }
      }
    }
    &-more {
      position: absolute;
      right: .8rem;
      top: .8rem;
      width: 2.4rem;
    }
    &-image {
      width: 20rem;
      height: 20rem;
      object-fit: cover;
      border-radius: .4rem .4rem 0 0;
    }
    &-info {
      padding: 1.6rem .8rem 2.4rem;
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
        padding-bottom: 2.8rem;
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
        padding-top: 2.4rem;
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

  @media(max-width: 460px) {
    &__item {
      &:hover {
        top: 0;
        transition: none;
      }
    }
  }
}
</style>
