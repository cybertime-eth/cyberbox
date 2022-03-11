<template>
  <div class="modal">
    <div class="modal__buy">
      <h1 class="modal__title gradient-text">Payment Confirmation</h1>
      <p class="modal__subtitle">You are about to purchase a <span class="modal__subtitle-bold">{{ nft.name }}</span></p>
      <div class="modal__information">
        <h3 class="modal__information-title">You pay</h3>
        <div class="modal__information-price-box">
          <img src="/celo.svg" alt="celo" class="modal__information-celo">
          <h3 class="modal__information-price">{{ nft.price }}</h3>
          <p class="modal__information-price-usd">(${{ priceToken }})</p>
        </div>
      </div>
      <div class="modal__balance">
        <p class="modal__balance-info">Balance <span><img src="/celo.svg" alt="celo" class="modal__balance-info-celo">{{ balance }}</span></p>
        <!-- <p class="modal__balance-fee">Service fee <span>10%</span></p> -->
      </div>
      <div class="modal__buttons">
        <div class="modal__buttons-box" v-if="balance >= nft.price">
          <button class="modal__button modal__button-submit" :class="{ disabled: pending || successApproveBuyToken }" @click="approveToken">Approve</button>
          <button class="modal__button modal__button-submit" :class="{ disabled: !successApproveBuyToken }" @click="buyToken">Buy</button>
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
      <div class="modal__step" v-else>
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
  props: ['nft', 'priceToken', 'balance'],
  computed: {
    collectionName() {
      return this.$route.params.collectionid
    },
    successApproveBuyToken() {
      return this.$store.state.successApproveBuyToken
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
        await this.$store.dispatch('buyNFT', {
          id: this.$route.params.nftid,
          price: this.nft.price
        })
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
  }
  &__information {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 3.5rem 0;
    border-bottom: .1rem solid $modalColor;
    &-price-box {
      display: flex;
      align-items: center;
    }
    &-price {
      margin-left: 6px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      line-height: 1;
      font-size: 1.38rem;
      span {
        font-size: 1.4rem;
      }
      &-usd {
        margin-left: 6px;
        font-size: 1.38rem;
        line-height: 1;
        color: $grayLight;
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
      }
      &-celo {
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
    border-radius: 2.3rem;
    letter-spacing: 0.04em;
    background: $white;
    display: flex;
    align-items: center;
    justify-content: center;
    &-submit {
      background: $pink;
      color: $white;
      &:last-child {
        margin-left: 1.23rem;
      }
      &.disabled {
        background: $white;
        pointer-events: none;
        border: 1px solid $border;
        color: $border;
      }
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
  &__step {
    display: flex;
    align-items: center;
    margin-top: 1.92rem;
    padding: 0 8.23rem;
    &-status {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border: 2px solid $border2;
      border-radius: 50%;
      font-size: 1rem;
      color: $border2;
      &.active {
        border: 1px solid $pink;
        color: $pink;
        * {
          color: $pink;
        }
      }
      &.approved {
        border: 0;
      }
    }
    &-line {
      flex: 1;
      height: 2px;
      background: $border2;
      opacity: 0.65;
      &.active {
        background: linear-gradient(93.06deg,  #2CFF64 8.21%, #FC2EF5 100%);
        opacity: 1;
      }
    }
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
      &-bold {
        font-weight: 600;
      }
    }
    &__information {
      padding-top: 3.2rem;
      padding-bottom: 2.2rem;
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
