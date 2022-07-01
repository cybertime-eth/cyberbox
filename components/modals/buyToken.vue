<template>
  <div class="modal">
    <div class="modal__buy">
      <h1 class="modal__title gradient-text">Payment Confirmation</h1>
      <p class="modal__subtitle">You are about to purchase a <b>{{ nftName }}</b></p>
      <div class="modal__information">
        <h3 class="modal__information-title">You pay</h3>
        <div class="modal__information-price-box">
          <div class="modal__information-price-box-celo">
            <img src="/celo.svg" alt="celo" class="modal__information-celo">
            <h3 class="modal__information-price">{{ nft.price }}</h3>
          </div>
          <p class="modal__information-price-usd">${{ priceToken }}</p>
        </div>
      </div>
      <div class="modal__balance">
        <p class="modal__balance-info">Balance <span><img src="/celo.svg" alt="celo" class="modal__balance-info-celo">{{ balance }}</span></p>
        <!-- <p class="modal__balance-fee">Service fee <span>10%</span></p> -->
      </div>
      <div class="modal__refi">
        <p class="modal__refi-info">
          <img src="/plant.svg" alt="plant" class="modal__refi-info-img">We will add<span class="modal__refi-info-amount">{{ refiOffset }} ton CO2</span>offset to your<img src="/carbon-tracker.svg" alt="tracker" class="modal__refi-info-carbon">Offset Tracker
        </p>
      </div>
      <div class="modal__buttons">
        <div class="modal__buttons-box" v-if="balance >= nft.price">
          <button class="modal__button modal__button-submit" :class="{ disabled: pending || successApproveBuyToken, pending: !successApproveBuyToken && pending }" @click="approveToken" v-if="!buyTokenApproved">
            Approve
            <img class="modal__button-loading" src="/loading-button.svg" alt="loading" v-if="!successApproveBuyToken && pending">
          </button>
          <button class="modal__button modal__button-submit" :class="{ disabled: !successApproveBuyToken || pending, pending: successApproveBuyToken && pending }" @click="buyToken">
            Buy
            <img class="modal__button-loading" src="/loading-button.svg" alt="loading" v-if="successApproveBuyToken && pending">
          </button>
        </div>
        <a
          href="https://app.ubeswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x471ece3750da237f93b8e339c536989b8978a438"
          target="_blank"
          class="modal__button"
          v-else
        >
          Buy CELO
        </a>
      </div>
      <h4 class="modal__footer"  v-if="balance < nft.price">Insufficiently funds</h4>
      <div class="modal__step" v-else-if="!buyTokenApproved">
        <span class="modal__step-status active" :class="{ approved: successApproveBuyToken }">
          <span v-if="!successApproveBuyToken">1</span>
          <img src="/check-circle.svg" alt="check" v-else>
        </span>
        <span class="modal__step-line" :class="{ active: successApproveBuyToken }"></span>
        <span class="modal__step-status" :class="{ active: successApproveBuyToken }">2</span>
      </div>
      <button class="modal__close-button" @click="closeModal">
        <img src="/close-bold.svg" class="modal__close-button-icon">
      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: ['nft', 'priceToken', 'balance', 'multiNft'],
  computed: {
    nftName() {
      return `${this.nft.name}${this.nft.contract !== 'nomdom' ? '' : '.nom'}`
    },
    collectionName() {
      return this.$route.params.collectionid
    },
    buyTokenApproved() {
      return this.$store.state.buyTokenApproved
    },
    successApproveBuyToken() {
      return this.$store.state.successApproveBuyToken || this.buyTokenApproved
    },
    refiOffset() {
      if (this.nft.contract !== 'CBCN') {
        return this.nft.refiOffset > 0 ? parseFloat(this.nft.refiOffset).toFixed(3) : 0
      } else {
        return '1'
      }
    }
  },
  data() {
    return {
      pending: false
    }
  },
  watch: {
    successApproveBuyToken() {
      if (this.$store.state.successApproveBuyToken) {
        this.pending = false
      }
    }
  },
  mounted() {
    this.$store.commit('changeSuccessApproveBuyToken', false)
  },
  methods: {
    async approveToken() {
      this.pending = true
      try {
        await this.$store.dispatch('approveBuyToken', {
          id: this.$route.params.nftid,
          price: this.nft.price
        })
      } catch (error) {
        this.closeModal()
      }
    },
    async buyToken() {
      this.pending = true
      try {
        if (this.nft.contract !== 'monthnft') {
		  await this.$store.dispatch('buyNFT', {
			id: !this.multiNft ? this.$route.params.nftid : this.nft.contract_id,
			price: this.nft.price
		  })
		} else {
		  await this.$store.dispatch('mintCertificate', this.nft.price)
		}
      } catch (error) {
        this.closeModal()
      }
    },
    closeModal() {
      this.$emit('closeModal', false)
    }
  },
}
</script>
<style lang="scss" scoped>
.modal {
  &__title {
    font-family: Cabin-Medium;
    font-weight: 500;
    text-align: left;
  }
  &__buy {
    position: relative;
    background: $white;
    border-radius: .8rem;
    padding: 2.2rem 2.4rem;
    width: 38rem;
    z-index: 11;
  }
  &__subtitle {
    padding-top: 2.4rem;
    b {
      font-weight: 600;
      font-size: 1.4rem;
    }
  }
  &__information {
    display: flex;
    justify-content: space-between;
    padding: 3.5rem 0;
    border-bottom: .1rem solid $modalColor;
    &-price-box-celo {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    &-celo {
      width: 1.8rem;
    }
    &-price {
      margin-left: 6px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      line-height: 1;
      font-size: 1.8rem;
      span {
        font-size: 1.4rem;
      }
      &-usd {
        margin-top: 8px;
        font-size: 1.4rem;
        line-height: 1;
        color: $grayLight;
        text-align: right;
      }
    }
  }
  &__balance {
    padding-top: 3.5rem;
    &-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        display: flex;
        align-items: center;
        font-size: 1.4rem;
      }
      &-celo {
        width: 1.6rem;
        margin-right: 8px;
      }
    }
    &-fee {
      padding-top: 2.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  &__refi {
    margin-top: 3.4rem;
    &-info {
      display: flex;
      align-items: center;
      padding: 0.9rem 0.4rem;
      border: 1px solid $modalColor;
      border-radius: 0.4rem;
      white-space: nowrap;
      font-size: 1.2rem;
      color: $black;
      &-img {
        width: 1.4rem;
        margin-right: 0.9rem;
      }
      &-amount {
        margin: 0 0.4rem;
        font-weight: 600;
        color: #63A60D;
      }
      &-carbon {
        width: 1.8rem;
        margin: 0 0.4rem;
      }
    }
  }
  &__buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    &-box {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  &__button {
    width: 100%;
    height: 5.4rem;
    margin-top: 3.4rem;
    border: .1rem solid $pink;
    color: $pink;
    border-radius: 2.5rem;
    letter-spacing: 0.04em;
    background: $white;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
    &-submit {
      background: $pink;
      color: $white;
      &:last-child {
        margin-left: 1.6rem;
      }
      &:first-child {
        margin-left: 0;
      }
      &.disabled {
        background: $white;
        pointer-events: none;
        border: 1px solid $border;
        color: $border;
      }
      &.pending {
        border: 1px solid $pink;
        color: $pink;
      }
    }
    &-loading {
      animation: loading 1s infinite;
      margin-left: 10px;
    }
    &-confirm {
      border: 0;
      cursor: default;
      img {
        margin-left: 1rem;
        animation: loading 1s infinite;
      }
    }
  }
  &__footer {
    color: $border;
    padding-top: 1.6rem;
    text-align: center;
    letter-spacing: 0.03em;
  }
  &__close-button {
    position: absolute;
    top: 15px;
    right: 15px;
    background: transparent;
    &-icon {
      width: 20px;
    }
  }
  @media(max-width: 460px) {
    &__buy {
      padding: 2.2rem 0.8rem;
    }
    &__title {
      margin: 0;
      text-align: left;
      font-weight: 700;
      font-size: 1.8rem;
    }
    &__subtitle {
      font-size: 1.4rem;
    }
    &__information {
      padding-top: 3.2rem;
      padding-bottom: 2.2rem;
    }
    &__refi {
      &-info {
        flex-wrap: wrap;
        padding: 0.9rem 0.6rem;
        line-height: 1.6;
        &-carbon {
          margin-left: 0;
        }
      }
    }
    &__balance {
      padding-top: 1.8rem;
    }
    &__button {
      height: 4.6rem;
      margin-top: 2rem;
    }
  }
}
</style>
