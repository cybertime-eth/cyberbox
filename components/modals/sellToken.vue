<template>
  <div class="modal" :class="{mobile: mobileVersion && !showSuccessModal}">
    <div class="modal__block sell" :class="{ success: showSuccessModal }">
        <div class="modal__sell-header">
          <button class="modal__sell-header-button" @click="closeModal"><img src="/close.svg" alt="close"></button>
        </div>
        <h2 class="modal__title">{{ modalTitle }}</h2>
        <div class="modal__sell">
          <div class="modal__sell-block" :class="{'not-approved': !approved}" v-if="!showSuccessModal">
            <div class="modal__sell-info">
              <img class="modal__image" :src="getNFTImage(nft)">
              <div class="modal__sell-nft">
                <p class="modal__sell-collection">{{ collectionName }}</p>
                <p class="modal__sell-description">{{ sellDescription }}</p>
              </div>
            </div>
            <div class="modal__sell-form">
              <p class="modal__sell-form-price">Price</p>
              <div class="modal__sell-form-inputbox">
                <input class="modal__sell-form-input" ref="sellInput" type="number" min="0" :readonly="pending || successSellToken" placeholder="0" v-model="nftPrice">
              </div>
              <p class="modal__sell-form-unit">${{ dollarPrice }}</p>
              <div class="modal__sell-form-refioffset">
			  	<p class="modal__sell-form-refioffset-total">
                	<img src="/plant.svg" alt="plant" class="modal__sell-form-refioffset-total-carbon"> Total carbon offset = <span class="modal__sell-form-refioffset-total-amount">{{ refiOffset }} ton CO2</span>
				</p>
				<p class="modal__sell-form-refioffset-description">
                	Sell NFT and we add {{ nftProducerFee }}% of total offset to your <img src="/carbon-tracker.svg" alt="tracker" class="modal__sell-form-refioffset-description-carbon"> Carbon Tracker
				</p>
              </div>
              <p class="modal__sell-form-description">Item will be on sale until you cancelled.</p>
              <p class="modal__sell-form-feeinfo">Once sold, the following fees will be deducted:<br/>{{ nftServiceFee }}% service fee | {{ nftRoyalty }}% creator royalty</p>
            </div>
          </div>
          <div class="modal__sell-success" v-else>
            <p class="modal__sell-description">{{ sellDescription }}</p>
            <img class="modal__sell-success-icon" src="/success.svg" alt="success">
          </div>
          <div class="modal__sell-buttons">
            <button class="modal__sell-buttons-button modal__sell-buttons-button-done" @click="closeSuccessModal" v-if="showSuccessModal">Done</button>
            <div class="modal__sell-buttons-box" v-else>
              <button class="modal__sell-buttons-button btn-approve" :class="{ disabled: !nftPrice || tokenApproved, pending: !tokenApproved && pending }" @click="submitApproveToken" v-if="!approved">
                Approve
                <img class="modal__sell-buttons-button-loading" src="/loading-button.svg" alt="loading" v-if="!tokenApproved && pending">
              </button>
              <button class="modal__sell-buttons-button" :class="{ disabled: !nftPrice || !tokenApproved, pending: tokenApproved && pending }" @click="sellToken">
                Confirm
                <img class="modal__sell-buttons-button-loading" src="/loading-button.svg" alt="loading" v-if="tokenApproved && pending">
              </button>
            </div>
          </div>
          <div class="modal__step" v-if="!approved && !showSuccessModal">
            <span class="modal__step-status" :class="{ active: nftPrice, approved: tokenApproved }">
              <span v-if="!tokenApproved">1</span>
              <img src="/check-circle.svg" alt="check" v-else>
            </span>
            <span class="modal__step-line" :class="{ active: tokenApproved }"></span>
            <span class="modal__step-status" :class="{ active: tokenApproved, approved: successSellToken }">
              <span v-if="!successSellToken">2</span>
              <img src="/check-circle.svg" alt="check" v-else>
            </span>
          </div>
        </div>
    </div>
  </div>  
</template>
<script>

export default {
  props: ['nft', 'celoPrice', 'approved'],
  computed: {
    mobileVersion() {
      return this.isMobile()
    },
    approveToken() {
      return this.$store.state.approveToken
    },
    tokenApproved() {
      return this.approved || this.approveToken === 'approve'
    },
    listToken() {
      return this.$store.state.listToken
    },
    successSellToken() {
      return this.listToken === true
	},
	sellTokenClosed() {
	  return this.$store.state.sellTokenClosed
	},
    modalTitle() {
      if (!this.showSuccessModal) {
        return this.nft.market_status !== 'LISTED' ? 'Sell your NFT' : 'Change sell price'
      } else {
        return 'Successfully listing'
      }
    },
    collectionName() {
      const foundCollection = this.$store.state.collectionList.find(item => item.route === this.nft.contract || item.route === this.nft.nftSymbol)
      return foundCollection?.name
    },
    sellDescription() {
      const nameSuffix = this.nft.contract !== 'nomdom' ? '' : '.nom'
      return `${this.nft.name}${nameSuffix}`
    },
    dollarPrice() {
      return this.nftPrice ? (this.nftPrice * this.celoPrice).toFixed(1) : 0
    },
    refiOffset() {
      const offsetValue = this.nftPrice * this.nft.refiOffset
      return offsetValue > 0 ? parseFloat(offsetValue).toFixed(3) : 0
    }
  },
  data() {
    return {
      nftPrice: null,
      pending: false,
      showSuccessModal: false,
      nftServiceFee: 0,
      nftRoyalty: 0,
      nftProducerFee: 0
    }
  },
  watch: {
    approveToken() {
      if (this.$store.state.approveToken === 'approve') {
        this.pending = false
      } else {
        this.closeModal()
      }
    },
    listToken() {
      if (this.$store.state.listToken === true) {
		this.pending = false
		setTimeout(() => this.showSuccessModal = true)
		const header = document.querySelector('.header')
		header.classList.remove('buy')
      } else {
        this.closeModal()
      }
	},
	sellTokenClosed() {
	  if (this.$store.state.sellTokenClosed) {
		this.closeModal()
	  }
	}
  },
  async mounted() {
	if (process.browser) {
	  this.$store.commit('changeSellTokenClosed', false)
	  const header = document.querySelector('.header')
	  if (this.isMobile()) {
		header.classList.add('buy')
	  } else {
		header.classList.remove('buy')
	  }
	}
    this.$store.commit('changelistToken', '')
    const collectionInfo = await this.$store.dispatch('getCollectionInfo')
    this.nftServiceFee = collectionInfo.marketFee / 10
	this.nftRoyalty = collectionInfo.createrFee / 10
	if (collectionInfo.nftSymbol !== 'CBCN') {
	  this.nftProducerFee = collectionInfo.producerFee / 10
	} else {
	  this.nftProducerFee = 5
	}
    if (this.nft.market_status === 'LISTED') {
      this.nftPrice = this.nft.price
	}
  },
  methods: {
    closeModal() {
      this.$emit('closeModal', this.tokenApproved)
	  this.$store.commit('changelistToken', '')
	  this.$store.commit('changeSellTokenClosed', false)
    },
    closeSuccessModal() {
      this.$emit('done', this.nftPrice ? parseFloat(this.nftPrice) : 0)
	  this.$store.commit('changelistToken', '')
    },
    submitApproveToken() {
      if (this.pending) return
      if (this.nftPrice) {
        this.pending = true
        this.$store.dispatch('approveToken')
      } else {
        this.$refs.sellInput.focus()
      }
    },
    sellToken() {
      if (this.pending) return
      if (this.nftPrice) {
        this.pending = true
        if (this.nft.market_status !== 'LISTED') {
          this.$store.dispatch('listingNFT', this.nftPrice)
        } else {
          this.$store.dispatch('changeNFTPrice', this.nftPrice)
        }
      } else {
        this.$refs.sellInput.focus()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  &__block {
    background: $white;
  }
  &__title {
    text-align: left;
    font-size: 3.2rem;
    color: $titleColor;
  }
  @media(max-width: 460px) {
    &__title {
      font-size: 2.2rem;
    }
  }
}
</style>

<style lang="scss">
.modal {
  &__block {
    &.sell {
      width: 45.6rem;
      background: $white;
      padding: 2.1rem 0.8rem 2.4rem;
      cursor: default;
      &.success {
        width: 23.5rem;
        padding: 1.8rem 1.8rem 2.6rem;
        .modal__title {
          width: 100%;
          font-size: 1.8rem;
          text-align: center;
        }
        .modal__sell {
          padding-top: 0;
          text-align: center;
          &-header {
            display: none;
          }
          &-description {
            margin-top: 0.4rem;
            font-size: 1.4rem;
          }
          &-success-icon {
            padding: 2.1rem 0 2.9rem;
          }
          &-link {
            font-weight: 600;
            font-size: 1.6rem;
            color: $grayLight;
            img {
              width: 2rem;
              transform: translateY(4px);
            }
          }
        }
      }
    }
  }
  &__sell {
    padding-top: 1.8rem;
    &.success {
      padding-top: 0;
    }
    &-header {
      display: block;
      width: calc(100% + 3.2rem);
      height: 1.4rem;
      margin: 0 -1.6rem;
      padding: 0;
      position: relative;
      &-button {
        background: transparent;
        position: absolute;
        top: 0;
        right: 2rem;
        line-height: 1.4rem;
      }
    }
    &-info {
      display: flex;
      flex-wrap: wrap;
      .modal__image {
        display: block;
        width: 6.4rem;
        padding: 0;
        margin-right: 1.2rem;
        border-radius: 4px;
      }
    }
    &-collection {
      font-weight: 600;
      font-size: 1.4rem;
      color: $grayLight;
    }
    &-description {
      font-weight: 600;
      font-size: 1.8rem;
    }
    &-form {
      padding-top: 1.8rem;
      padding-bottom: 2.4rem;
      font-size: 1.8rem;
      &-price {
        padding-bottom: 1.6rem;
        font-size: 1.4rem;
        color: $grayLight;
      }
      &-input {
        width: calc(100% - 1.85rem);
        height: 2rem;
        padding: 1.2rem 1rem;
        border: 1px solid $border;
        font-size: 1.6rem;
        &:focus {
          border-color: $green;
        }
        &:read-only {
          background: transparent;
          border-color: $border;
          color: #9CA3AF;
        }
      }
      &-inputbox {
        position: relative;
        &::after {
          display: block;
          content: "CELO";
          position: absolute;
          top: 1.2rem;
          right: 1rem;
          font-size: 1.6rem;
        }
      }
      &-unit {
        padding-top: .8rem;
        font-size: 1.4rem;
        color: $grayLight;
      }
      &-refioffset {
        width: fit-content;
        width: -moz-fit-content;
        margin-top: 1.8rem;
        padding: 0.8rem;
        border: 1px solid $modalColor;
		border-radius: 0.4rem;
		&-total {
		  display: flex;
		  align-items: center;
		  white-space: nowrap;
		  font-size: 1.2rem;
		  color: $black;
		  &-carbon {
			width: 1.4rem;
			margin-right: 0.9rem;
		  }
		  &-amount {
			margin-left: 0.4rem;
			font-weight: 700;
			font-size: 1.3rem;
			color: $green3;
		  }
		}
		&-description {
		  display: flex;
		  align-items: center;
		  margin-top: 1rem;
		  white-space: nowrap;
		  font-size: 1.2rem;
		  color: $border;
		  &-carbon {
			width: 1.8rem;
			margin: 0 0.7rem;
		  }
		}
      }
      &-description {
        padding-top: 1.8rem;
        font-size: 1.4rem;
      }
      &-feeinfo {
        padding-top: 1.8rem;
        font-size: 1.3rem;
        color: $grayLight;
      }
    }
    &-content {
      margin: 0 -1.6rem;
      padding: 2.4rem 0;
      border-top: 1px solid $modalColor;
      text-align: center;
      font-size: 1.3rem;
      color: $grayDark;
    }
    &-buttons {
      display: flex;
      justify-content: flex-end;
	  margin: 0 -0.8rem;
	  padding: 2.4rem 0.8rem 0;
	  border-top: 1px solid $modalColor;
      &-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        background: $pink;
        padding: 1rem;
        margin-right: 1.6rem;
        border: 1px solid $pink;
        border-radius: 25px;
        text-align: center;
        font-size: 1.6rem;
        color: $white;
        &:last-child {
          margin: 0;
        }
        &.disabled {
          background: $white;
          border-color: $border;
          color: $border;
          pointer-events: none;
        }
        &.pending {
          background: $white;
          color: $pink;
          pointer-events: none;
        }
        &-loading {
          animation: loading 1s infinite;
          margin-left: 10px;
        }
      }
      &-box {
        display: flex;
        align-items: center;
        width: 100%;
        .modal__sell-buttons-button {
          flex: 1;
          &.btn-approve {
            margin-right: 1.6rem;
          }
        }
      }
    }
  }
  &.mobile {
	position: static;
	margin: 0;
	z-index: 0;
	.modal__block {
	  margin: 0;
	  border-radius: 0;
	}
	.modal__sell {
	  &-header {
		display: none;
	  }
	}
  }
}
@media screen and (max-width: 460px) {
  .modal {
    > div:first-child {
      margin: 0 .8rem;
    }
    &__block {
      &.sell {
        width: 100%;
        height: auto;
        padding: 0 0.8rem 2.4rem !important;
        border-radius: 10px;
        overflow-y: auto;
        &.success {
          width: 23.5rem;
          padding: 1.8rem 1.8rem 2.6rem !important;
          .modal__sell {
            &-success-icon {
              padding: 2.2rem 0 1.4rem;
            }
            &-description, &-link {
              font-size: 1.4rem;
            }
          }
        }
      }
      &-container {
        text-align: center;
      }
    }
    &__sell {
      padding-top: 1.6rem;
      &-header {
        width: calc(100% + 1.6rem);
        height: 4rem;
        margin: 0 -0.8rem;
        &-button {
          top: 50%;
          right: 1.3rem;
          transform: translateY(-50%);
        }
      }
      &-info {
        .modal__image {
          width: 11.4rem;
        }
      }
      &-description {
        font-size: 1.6rem;
      }
      &-form {
        padding-bottom: 3.8rem;
        &-price {
          padding-bottom: .8rem;
          font-size: 1.4rem;
        }
        &-input {
          width: calc(100% - 2rem);
          padding: 1.2rem 1rem;
          border-color: $border2;
          font-size: 1.4rem;
        }
        &-unit {
          padding-top: 1.2rem;
        }
        &-description {
          padding-top: 1.6rem;
        }
        &-feeinfo {
          padding-top: 1.6rem;
          font-size: 1.2rem;
        }
		&-refioffset {
		  width: auto;
		  &-description {
			display: block;
			white-space: normal;
			&-carbon {
			  margin: 0;
			}
		  }
		}
      }
      &-content {
        width: 100%;
        padding: 1.6rem 0;
        margin: 0;
        font-size: 1.2rem;
      }
      &-buttons {
        &-button {
          width: 100%;
          &-cancel {
            display: none;
          }
        }
      }
    }
  }
}
@mixin block-overflow {
  padding-right: 0.2rem;
}
@media screen and (max-height: 750px) {
  .modal {
    &__sell {
      &-block {
        &.not-approved {
          @include block-overflow;
        }
      }
    }
  }
}
@media screen and (max-height: 700px) {
  .modal {
    &__sell {
      &-block {
        @include block-overflow;
      }
    }
  }
}
</style>
