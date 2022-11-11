<template>
  <div class="collection__item" :class="{ knoxnft: nft.nftSymbol === 'knoxnft', multinft: (multiNft && $route.params.collectionid  || boxnft) }" @click="routeNft">
	<dropdown-menu class="collection__item-dropdown" v-model="showMoreMenu" v-if="moreButtonVisible">
    <img :src="getCDNImage('more.webp')" alt="more" class="collection__item-more dropdown-toggle" @click="openModal">
		<div slot="dropdown" class="collection__item-modal">
			<div class="collection__item-modal-button" @click="routeNft">
				<img :src="getCDNImage('outline-sell.svg')" alt="sell">
				<h3>{{ visitMenuName }}</h3>
			</div>
			<div class="collection__item-modal-button" @click="handleClickTransfer" v-if="seller">
			<img :src="getCDNImage('transfer-black.svg')" alt="transfer">
			<h3>Transfer</h3>
			</div>
			<div class="collection__item-modal-button" @click="copyLink">
				<img :src="getCDNImage('copy-link.svg')" alt="copy">
				<h3>Copy link</h3>
			</div>
		</div>
	</dropdown-menu>
    <img :src="realNftImage()" alt="item" class="collection__item-image" v-if="nftImageLoaded">
    <div class="collection__item-loading" v-else>
      <img :src="getCDNImage('loading-nft.webp')" alt="load">
    </div>
    <div class="collection__item-info">
      <h2 class="collection__item-info-name" :class="{multinft: multiNft, 'multi-collection': isMultiNftCollection}">{{ nftName }}</h2>
      <p class="collection__item-info-rank" v-if="rarityVisible">Rarity Rank {{ nft.rating_index }}</p>
      <p class="collection__item-info-id" :class="{'nomdom-nft': nft.contract === 'nomdom' || nft.contract === 'CBCN', 'nomdom-collection': $route.params.collectionid === 'nomdom'}" v-if="!multiNft">Token ID {{ nftID }}</p>
      <div class="collection__item-info-bottom">
        <p class="collection__item-info-type" :class="{multinft: multiNft}" v-if="sellInfo">Last sell</p>
        <p class="collection__item-info-type" :class="{multinft: multiNft}" v-else>Price</p>
        <div class="collection__item-info-price-box" :class="{ multinft: multiNft }" v-if="priceVisible">
          <div class="collection__item-info-price" >
            <img :src="getCDNImage('celo.svg')" alt="celo">
            <h3 class="collection__item-info-price-text">{{ nftPrice }}</h3>
          </div>
          <span class="collection__item-info-price-quantity" v-if="nftQuantity">{{ nftQuantity }}</span>
        </div>
        <h3 class="collection__item-info-price-null" :class="{ multinft: multiNft }" v-else>{{ saleInfo }} <span class="collection__item-info-price-quantity" v-if="nftQuantity">{{ nftQuantity }}</span></h3>
      </div>
    </div>
    <transfer :nft="nft" @close="closeTransfer" @done="closeSucceedTransfer" v-if="showTransferModal" />
  </div>
</template>
<script>
import transfer from '@/components/modals/transfer'
import {BigNumber} from "ethers";
import { COLLECTION_CDN_ROOT } from "@/config";
export default {
  components: {
    transfer
  },
  data() {
    return {
      showMoreMenu: false,
      showTransferModal: false,
      nftImageLoaded: false,
      cdnImage: null,
      ownedMultiNftCount: 0,
      ownedMultiNftListCount: 0
    }
  },
  computed: {
    isMultiNftCollection() {
      return this.$store.state.multiNftSymbols.includes(this.$route.params.collectionid)
    },
    sellInfo() {
      return this.filter === 'bought' || this.nft.seller === this.$store.state.fullAddress
    },
    moreButtonVisible() {
      return (this.seller || (!this.seller && this.owner)) && !this.multiNft
    },
	rarityVisible() {
	  return this.nft.contract !== 'nomdom' && this.nft.contract !== 'CBCN' && !this.multiNft && !this.boxnft
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
		if (this.nft.nftSymbol === 'CBCN') {
		  return this.getCertificateName(this.nft)
		} else {
		  const nftId = this.nft.image.substring(this.nft.image.lastIndexOf('/') + 1).split('.')[0]
          return this.$store.state.multiNftNames.find(item => item.id === nftId)?.name
		}
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
      const visibleStatus = (!this.multiNft && this.nft.price > 0 && this.nft.market_status === 'LISTED') || (!this.seller && this.multiNft && this.nft.list_count > 0 && this.nft.list_price > 0)
      return visibleFilter || visibleStatus
    },
    saleInfo() {
      return (this.seller && this.multiNft && this.ownedMultiNftListCount > 0) ? 'For sale' : 'Not for sale'
    },
    nftPrice() {
      let number = !this.multiNft ? this.nft.price : (this.nft.list_price ? this.nft.list_price / 1000 : null)
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
        if (!this.seller) {
          return `${this.nft.list_count}/${this.nft.mint_count}`
        } else {
          return this.ownedMultiNftCount > 0 ? `${this.ownedMultiNftListCount}/${this.ownedMultiNftCount}` : null
        }
      } else {
        return null
      }
    },
  },
  props: ['nft', 'route', 'owner', 'seller', 'filter', 'multiNft', 'boxnft', 'from'],
  watch: {
    nft() {
	  const cdnImageUrl = this.getCDNImageUrl()
      if (this.cdnImage !== cdnImageUrl) {
		this.nftImageLoaded = false
        this.loadCDNImage()
      }
    }
  },
  async mounted() {
    this.loadCDNImage()
    if (this.seller && this.multiNft) {
      const ownedCollectionInfo = await this.$store.dispatch('getOwnedCollectionInfo', {
        contract: this.nft.nftSymbol,
        image: this.nft.image
      })
      this.ownedMultiNftCount = ownedCollectionInfo.owned_count
      this.ownedMultiNftListCount = ownedCollectionInfo.owned_list_count
    }
  },
  methods: {
    getCDNImageUrl() {
	  if (this.nft.contract !== 'CBCN' && this.nft.nftSymbol !== 'CBCN') {
		let fileExtension = 'cwebp'
		const contractName = !this.multiNft ? this.nft.contract : this.nft.nftSymbol
		let contractId = this.nft.contract_id
		if (this.nft.nftSymbol === 'knoxnft') {
		  contractId = this.nft.image.substring(this.nft.image.lastIndexOf('/') + 1).split('.')[0]
		  fileExtension = 'webp'
		} else if (this.nft.contract === 'nomdom') {
		  contractId = this.nft.image
		}
		const cdnRoot = COLLECTION_CDN_ROOT + '280/'
    	const imageURL = cdnRoot + contractName + `/${contractId}.${fileExtension}`
		return imageURL
	  } else {
		return this.getCertificateImage(this.nft)
	  }
    },
    async loadCDNImage() {
      if (this.nft.image || this.nft.contract === 'CBCN') {
        const imageURL = this.getCDNImageUrl()
        this.cdnImage = imageURL
		const img = new Image()
		img.src= imageURL
		img.onload = () => {
		  this.nftImageLoaded = true
		}
		img.onerror = () => {
		  this.cdnImage = null
		  this.nftImageLoaded = true
		}
      } else {
        this.nftImageLoaded = true
      }
    },
    realNftImage() {
      return this.cdnImage || this.getNFTImage(this.nft)
	},
	handleClickTransfer(e) {
	  this.$store.commit('setNewNft', this.nft)
	  this.showTransferModal = true
	  e.preventDefault()
      e.stopPropagation()
	},
	closeTransfer(e, delay = false) {
	  if (delay) {
		this.showTransferModal = false
	  } else {
		setTimeout(() => this.showTransferModal = false, 100)
	  }
      if (e) {
		e.preventDefault()
    	e.stopPropagation()
      }
	},
	closeSucceedTransfer(e) {
	  this.closeTransfer(e, true)
	  location.reload()
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
	openModal(e) {
	  this.showMoreMenu = !this.showMoreMenu
	  e.preventDefault()
      e.stopPropagation()
	},
    routeNft() {
	  if (this.showTransferModal) return
	  this.sendEvent({
		category: 'Browse',
		eventName: 'nft_enter',
		properties: {
          nft_enter: this.from
        }
	  })
      this.$router.push(this.route)
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
    height: 37.5rem;
    border-radius: .4rem;
    box-shadow: 0 .4rem 1.2rem rgba(0, 0, 0, 0.05);
    transition: .3s;
    cursor: pointer;
    position: relative;
    top: 0;
    &.multinft {
      height: 33.5rem;
    }
	&-dropdown {
	  .dropdown-menu {
		top: 100% !important;
	  }
	}
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
          padding-bottom: 5.9rem;
          &.multi-collection {
            padding-bottom: 1.6rem;
          }
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
        padding-bottom: 1.3rem;
        border-bottom: .1rem solid $modalColor;
        &.nomdom-nft {
          padding-bottom: 3.6rem;
          &.nomdom-collection {
            padding-bottom: 1.3rem;
          }
        }
      }
      &-bottom {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
      }
      &-price {
        display: flex;
        align-items: center;
        &-box {
          padding-top: .4rem;
        }
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
        padding-top: 0.8rem;
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
      &.multinft {
        height: 28.5rem;
        &.knoxnft {
          height: 26.5rem;
        }
      }
      &-image {
        width: 14.4rem;
        height: 14.4rem;
      }
      &-loading {
        width: 14.4rem;
        height: 14.4rem;
      }
      &-info {
        padding: 1.2rem 0.8rem 1.8rem;
        &-name {
          &.multinft {
            padding-bottom: 5.4rem;
          }
        }
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
          &-box, &-null {
            &.multinft {
              .collection__item-info-price-quantity {
                display: block;
              }
            }
          }
          &-null {
            &.multinft {
              display: block;
            }
          }
        }
        &-id {
          padding-bottom: 1rem;
          &.nomdom-nft {
            padding-bottom: 3.2rem;
            &.nomdom-collection {
              padding-bottom: 1rem;
            }
          }
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
