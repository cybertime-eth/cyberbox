<template>
  <div class="modal">
    <div class="modal__buy">
      <h1 class="modal__title gradient-text">Payment Confirmation</h1>
      <p class="modal__subtitle">You are about to purchase a <span class="modal__subtitle-bold">Daopolis</span> from <span class="modal__subtitle-bold">CyberTime</span></p>
      <div class="modal__information">
        <h3 class="modal__information-title">You pay</h3>
        <h3 class="modal__information-price">{{ price }} <span>CELO</span></h3>
        <p class="modal__information-price-usd">{{ priceToken }}$</p>
      </div>
      <div class="modal__balance">
        <p class="modal__balance-info">Balance <span>{{ balance }} CELO</span></p>
        <!-- <p class="modal__balance-fee">Service fee <span>10%</span></p> -->
      </div>
      <div class="modal__buttons" v-if="!pending">
        <button class="modal__button" v-if="balance >= price" @click="buyToken">Confirm</button>
        <a
          href="https://app.ubeswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x471ece3750da237f93b8e339c536989b8978a438"
          target="_blank"
          class="modal__button"
          v-else
        >
          Buy CELO
        </a>
      </div>
      <button class="modal__button modal__button-confirm gradient-button" v-else>
        Pending confirmation <img src="/loading-button.svg" alt="load">
      </button>
      <h4 class="modal__footer"  v-if="balance < price">Insufficiently funds</h4>
      <button class="modal__close-button" @click="closeModal">
        <img src="/close-bold.svg" class="modal__close-button-icon">
      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: ['price', 'priceToken', 'balance'],
  data() {
    return {
      pending: false
    }
  },
  methods: {
    async buyToken() {
      try {
        this.pending = true
        await this.$store.dispatch('approveBuyToken', {
          id: this.$route.params.nftid,
          price: this.price
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
    padding: 3.5rem 0;
    border-bottom: .1rem solid $modalColor;
    &-price {
      padding-top: 2.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 1.8rem;
      span {
        font-size: 1.4rem;
      }
      &-usd {
        padding-top: .5rem;
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
