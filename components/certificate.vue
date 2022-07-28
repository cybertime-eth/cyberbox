<template>
    <div class="certificate__item collection__item" @click="routeCertificate">
		<dropdown-menu class="collection__item-dropdown" v-model="showMoreMenu" v-if="owner">
			<img :src="getCDNImage('more.webp')" alt="more" class="collection__item-more dropdown-toggle" @click="openModal">
			<div slot="dropdown" class="collection__item-modal">
				<div class="collection__item-modal-button" @click="routeCertificate">
					<img :src="getCDNImage('outline-sell.svg')" alt="sell">
					<h3>{{ visitMenuName }}</h3>
				</div>
				<div class="collection__item-modal-button" @click="showTransfer" v-if="owner">
					<img :src="getCDNImage('transfer-black.svg')" alt="transfer">
					<h3>Transfer</h3>
				</div>
				<div class="collection__item-modal-button" @click="copyLink">
					<img :src="getCDNImage('copy-link.svg')" alt="copy">
					<h3>Copy link</h3>
				</div>
			</div>
		</dropdown-menu>
        <div class="collection__item-image">
            <img :src="certificate.image" alt="item">
			<button class="collection__item-image-button" @click="routeCertificate" v-if="!owner && saleAvailable">Offset now</button>
        </div>
        <div class="collection__item-info">
            <h2 class="collection__item-info-name">{{ certificateName }}</h2>
            <p class="collection__item-info-type">Price</p>
            <div class="collection__item-info-price" v-if="priceVisible">
                <img :src="getCDNImage('celo.svg')" alt="celo">
                <h3 class="collection__item-info-price-text">{{ certificatePrice }}</h3>
            </div>
            <p class="certificate__item-description" :class="{ 'not-sale': owner || !saleAvailable }" v-else>{{ certificateDescription }}</p>
        </div>
		<transfer :nft="certificate" @close="closeTransfer($event)" v-if="showTransferModal" />
    </div>    	
</template>

<script>
import transfer from '@/components/modals/transfer'
export default {
  props: ['certificate'],
  components: {
	transfer
  },
  data() {
	return {
	  showMoreMenu: false,
	  showTransferModal: false,
	  showStatus: false
	}
  },
  computed: {
	certificateName() {
	  return this.getCertificateName(this.certificate, false)
	},
	visitMenuName() {
	  if (this.certificate.market_status === 'LISTED') {
        return 'Remove from sale'
      } else {
        return 'Sell'
      }
	},
    owner() {
      return this.$store.state.fullAddress === this.certificate.owner
	},
	priceVisible() {
      return this.certificate.price > 0 || this.certificate.offset
	},
	certificatePrice() {
	  return this.certificate.offset ? 15 : this.certificate.price
	},
	buyAvailable() {
      return !this.owner && this.certificate.price > 0
	},
	saleAvailable() {
	  return this.certificate.offset
	},
    certificateDescription() {
      return this.owner || !this.saleAvailable ? 'Not for sale' : '-'
    }
  },
  methods: {
	openModal(e) {
      this.showMoreMenu = !this.showMoreMenu
	  e.preventDefault()
	  e.stopPropagation()
	},
	showTransfer(e) {
	  this.$store.commit('setNewNft', this.certificate)
	  this.showTransferModal = true
	  e.preventDefault()
	  e.stopPropagation()
	},
	closeTransfer(e) {
	  this.$store.commit('setNewNft', null)
	  this.showTransferModal = false
	  e.preventDefault()
	  e.stopPropagation()
	},
	copyLink(e) {
      const collectionUrl = location.protocol + '//' + location.host
      this.$copyText(`${collectionUrl}/collections/${this.certificate.contract}/${this.certificate.contract_id}`)
      this.$store.commit('setMessage', 'Link copied!')
      setTimeout(() => {
        this.$store.commit('setMessage', '')
	  }, 2000)
	  e.preventDefault()
	  e.stopPropagation()
    },
    routeCertificate(e) {
	  if (this.showTransferModal) return
	  if (this.certificate.offset) {
		this.sendEvent({
		  category: 'Browse',
		  eventName: 'minter_enter',
		  properties: {
			minter_enter: 'Tracker_my_cert'
		  }
		})
		this.$router.push('/calendar')
	  } else {
		this.$router.push(`/collections/CBCN/${this.certificate.month}`)
	  }
    }
  }
}
</script>

<style lang="scss" scoped>
.certificate__item {
  height: 33.5rem;
  .collection__item-more, .collection__item-modal {
	z-index: 1;
  }
  .collection__item-info-name {
	font-size: 1.8rem;
    padding-bottom: 1.6rem;
    border-bottom: .1rem solid $modalColor;
  }
  .collection__item-info-type {
	padding-top: 1.2rem;
	font-weight: 700;
	font-size: 1.2rem;
  }
  .collection__item-image {
    display: flex;
    align-items: center;
    justify-content: center;
	max-width: 20rem;
	border-radius: 0.4rem;
	overflow: hidden;
	position: relative;
    img {
      max-width: 100%;
	}
	.collection__item-image-button {
	  position: absolute;
	  left: 50%;
	  width: 11rem;
	  height: 2.8rem;
	  bottom: 0.8rem;
	  background: linear-gradient(90deg, #365BE0 -14.25%, #D676CF 48.65%, #FFE884 109.5%);
	  border-radius: 2rem;
	  transform: translateX(-50%);
	  font-weight: 600;
	  font-size: 1.4rem;
      color: $white;
    }
  }
  &-description {
	padding-top: 0.4rem;
    font-size: 1.4rem;
    &.not-sale {
      color: $border;
    }
  }

  @media (max-width: 460px) {
	height: 25.8rem;
	.collection__item-info-name {
	  font-size: 1.4rem;
	}
  }
}
</style>
