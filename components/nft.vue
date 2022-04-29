<template>
  <div class="collection__item" @click="routeNft(false)">
    <img src="/more.png" alt="more" v-if="moreButtonVisible" class="collection__item-more" @click="openModal(nft.id, $event)">
    <div class="collection__item-modal" v-if="modalId === nft.id" @mouseleave="modalId = 0">
      <div class="collection__item-modal-button" @click="routeNft(true)">
        <img src="/outline-sell.svg" alt="sell">
        <h3>{{ visitMenuName }}</h3>
      </div>
     <div class="collection__item-modal-button" @click="showTransferModal = true" v-if="seller">
       <img src="/transfer-black.svg" alt="transfer">
       <h3>Transfer</h3>
     </div>
      <div class="collection__item-modal-button" @click="copyLink">
        <img src="/copy-link.svg" alt="copy">
        <h3>Copy link</h3>
      </div>
    </div>
    <img :src="realNftImage()" alt="item" class="collection__item-image" v-if="nftImageLoaded">
    <div class="collection__item-loading" v-else>
      <img src="/loading-nft.gif" alt="load">
    </div>
    <div class="collection__item-info">
      <h2 class="collection__item-info-name" :class="{multinft: multiNft}">{{ nftName }}</h2>
      <p class="collection__item-info-rank" v-if="nft.contract !== 'nomdom' && !multiNft">Rarity Rank {{ nft.rating_index }}</p>
      <p class="collection__item-info-id" v-if="!multiNft">Token ID {{ nftID }}</p>
      <p class="collection__item-info-type" :class="{multinft: multiNft}" v-if="sellInfo">Last sell</p>
      <p class="collection__item-info-type" :class="{multinft: multiNft}" v-else>Price</p>
      <div class="collection__item-info-price-box" v-if="priceVisible">
        <div class="collection__item-info-price">
          <img src="/celo.svg" alt="celo">
          <h3 class="collection__item-info-price-text">{{ nftPrice }}</h3>
        </div>
        <span class="collection__item-info-price-quantity">{{ nftQuantity }}</span>
      </div>
      <h3 class="collection__item-info-price-null" v-else>Not for sale <span class="collection__item-info-price-quantity">{{ nftQuantity }}</span></h3>
      <div class="collection__item-info-details-box">
        <button class="collection__item-info-details" @click="routeNft(true)">Details</button>
      </div>
    </div>
    <transfer :nft="nft" @closeModal="showTransferModal = false" v-if="showTransferModal" />
  </div>
</template>
<script>
import transfer from '@/components/modals/transfer'
import {BigNumber} from "ethers";
import { CDN_ROOT } from "@/config";
export default {
  components: {
    transfer
  },
  data() {
    return {
      modalId: 0,
      showTransferModal: false,
      nftImageLoaded: false,
      cdnImage: null
    }
  },
  computed: {
    sellInfo() {
      return this.filter === 'bought' || this.nft.seller === this.$store.state.fullAddress
    },
    moreButtonVisible() {
      return (this.seller || (!this.seller && this.owner)) && !this.multiNft
    },
    visitMenuName() {
      if (this.nft.market_status === 'LISTED') {
        return 'Remove from sale'
      } else {
        return 'Sell'
      }
    },
    nftName() {
      if (this.multiNft) {
        const nftId = this.nft.id.split('/')[1].split('.')[0]
        return this.$store.state.multiNftNames.find(item => item.id === nftId).name
      } else {
        return `${this.nft.name || this.nft.contract_name}${this.nft.contract === 'nomdom' ? '.nom' : ''}`
      }
    },
    nftID() {
      const id = this.nft.contract_id
      if (id >= 0) {
        return BigNumber.from(id).toNumber()
      } else {
        return id
      }
    },
    priceVisible() {
      const visibleFilter = (this.filter === 'listed' || this.filter === 'bought')
      const visibleStatus = (!this.multiNft && this.nft.price > 0 && this.nft.market_status === 'LISTED') || (this.multiNft && this.nft.list_count > 0 && this.nft.list_min_price > 0)
      return visibleFilter || visibleStatus
    },
    nftPrice() {
      let number = !this.multiNft ? this.nft.price : this.nft.list_min_price / 1000
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
    nftQuantity() {
      if (this.multiNft) {
        return `${this.nft.list_count}/${this.nft.mint_count}`
      } else {
        return ''
      }
    },
  },
  props: ['nft', 'route', 'owner', 'seller', 'filter', 'multiNft'],
  watch: {
    nft() {
      const cdnImageUrl = this.getCDNImageUrl()
      if (this.cdnImage !== cdnImageUrl) {
        this.loadCDNImage()
      }
    }
  },
  mounted() {
    this.loadCDNImage()
  },
  methods: {
    getCDNImageUrl() {
      if (this.nft.contract !== 'nomstronaut' && !this.multiNft) {
        let fileExtension = this.nft.image.split('.').pop()
        let contractId = this.nft.contract_id
        if (fileExtension.split('//').length > 1 || this.nft.contract === 'nomdom') {
          fileExtension = 'png'
          if (this.nft.contract === 'nomdom') {
            contractId = this.nft.image
          }
        }
        const imageURL = CDN_ROOT + this.nft.contract + `/${contractId}.${fileExtension}`
        return imageURL
      } else {
        return null
      }
    },
    async loadCDNImage() {
      if (this.nft.contract !== 'nomstronaut' && this.nft.image) {
        const imageURL = this.getCDNImageUrl()
        this.cdnImage = imageURL
        const img = new Image()
        img.src= imageURL
        if (img.complete) {
          this.nftImageLoaded = true
        } else {
          img.onload = () => {
            this.nftImageLoaded = true
          }
          img.onerror = (e) => {
            this.cdnImage = null
            this.nftImageLoaded = true
          }
        }
      } else {
        this.nftImageLoaded = true
      }
    },
    realNftImage() {
      return this.cdnImage || this.getNFTImage(this.nft)
    },
    copyLink(e) {
      const collectionUrl = location.protocol + '//' + location.host
      this.$copyText(`${collectionUrl}/collections/${this.nft.contract}/${this.nft.contract_id}`)
      this.$store.commit('setMessage', 'Link copied!')
      setTimeout(() => {
        this.$store.commit('setMessage', '')
      }, 2000)
      e.preventDefault()
      e.stopPropagation()
    },
    openModal(id, e) {
      if (this.modalId !== id) {
        this.modalId = id
      } else {
        this.modalId = 0
      }
      if (this.owner) {
        e.preventDefault()
        e.stopPropagation()
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
    display: flex;
    flex-direction: column;
    width: 20rem;
    height: 45rem;
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
      background: $white;
      box-shadow: 0 1.5rem 3rem rgba(0, 0, 0, 0.1);
      border-radius: .4rem;
      &-button {
        display: flex;
        align-items: center;
        padding-left: 1rem;
        width: 18.2rem;
        height: 6.2rem;
        &:first-child {
          border-radius: .4rem .4rem 0 0;
        }
        &:last-child {
          border-radius: 0 0 .4rem .4rem;
        }
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
    &-loading {
      width: 20rem;
      height: 20rem;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 100%;
      }
    }
    &-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 1.6rem .8rem 2.4rem;
      &-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 1.8rem;
        font-family: OpenSans-SemiBold;
        &.multinft {
          border-bottom: .1rem solid $modalColor;
          padding-bottom: 1.6rem;
        }
      }
      &-rarity {
        color: $grayLight;
        font-size: 1.3rem;
      }
      &-rank, &-id {
        padding-top: .5rem;
        font-size: 1.3rem;
        color: $grayLight;
      }
      &-id {
        border-bottom: .1rem solid $modalColor;
        padding-bottom: 1.3rem;
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
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: $border;
          padding-top: .4rem;
        }
        &-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        &-quantity {
          font-family: OpenSans-SemiBold;
          font-weight: 600;
          font-size: 1.4rem;
          color: $grayLight;
        }
      }
      &-type {
        color: $border;
        font-size: 1.1rem;
        padding-top: 2.4rem;
        &.multinft {
          padding-top: 0.8rem;
        }
      }
      &-details {
        width: 18.4rem;
        height: 2.8rem;
        border-radius: 2rem;
        font-size: 1.3rem;
        margin-top: 1.5rem;
        background: $modalColor;
        &-box {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }
      }
    }
    &:hover {
      top: -1rem;
      transition: .3s;
    }
  }

  @media(max-width: 460px) {
    &__item {
      width: 14.4rem;
      height: auto;
      &-image {
        width: 14.4rem;
        height: 14.4rem;
      }
      &-loading {
        width: 14.4rem;
        height: 14.4rem;
      }
      &-info {
        padding: .5rem 0.8rem 3.4rem;
        &-details {
          margin-top: 1rem;
          width: 100%;
        }
        &-price {
          &-null {
            font-size: 1.4rem;
          }
          &-text {
            font-size: 1.4rem;
          }
        }
        &-id {
          padding-bottom: 1rem;
        }
      }
      &:hover {
        top: 0;
        transition: none;
      }
      &-modal {
        width: auto;
        z-index: 10;
        &-button {
          width: auto;
          min-width: 12rem;
          padding-right: 1rem;
          h3 {
            white-space: nowrap;
          }
        }
      }
    }
  }
}
</style>
