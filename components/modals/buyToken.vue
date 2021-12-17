<template>
  <div class="modal">
    <div class="modal__buy">
      <h1 class="modal__title gradient-text">Payment Confirmation</h1>
      <p class="modal__subtitle">You are about to purchase a Daopolis from CyberTime</p>
      <div class="modal__information">
        <h3 class="modal__information-title">You pay</h3>
        <h3 class="modal__information-price">{{ price }} <span>CELO</span></h3>
        <p class="modal__information-price-usd">{{ priceToken }}$</p>
      </div>
      <div class="modal__balance">
        <p class="modal__balance-info">Balance <span>{{ balance }} CELO</span></p>
        <!-- <p class="modal__balance-fee">Service fee <span>10%</span></p> -->
      </div>
      <div class="modal__buttons">
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
      <h4 class="modal__footer"  v-if="balance < price">Insufficiently funds</h4>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      balance: 0,
      priceToken: 0
    }
  },
  props: ['price'],
  async created() {
    this.balance = await this.$store.dispatch('getBalance')
    const price = await this.$store.dispatch('getPriceToken')
    this.priceToken = (price.value * this.price).toFixed(1)
  },
  methods: {
    async buyToken() {
      try {
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
  }
  &__footer {
    color: $border;
    padding-top: 1.6rem;
    text-align: center;
    letter-spacing: 0.03em;
  }
}
</style>
