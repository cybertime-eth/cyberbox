<template>
    <div class="modal">
        <div class="exchange__token">
            <a class="exchange__token-close" @click="closeModal">
                <img class="exchange__token-close-icon" src="/close.svg" alt="close">
            </a>
            <h1 class="exchange__token-title gradient-text">Exchenge Confirmation</h1>
            <p class="exchange__token-description">You exchange your <b>12 Carbon Certificates</b> for a <b>Super Rare secret NFT.</b></p>
            <div class="exchange__token-buttons">
                <button
                    class="exchange__token-buttons-button apprvoe"
                    :class="{ disabled: successApproveBuyToken, pending: !successApproveBuyToken && pending }"
                    @click="approveToken"
                    v-if="!buyTokenApproved"
                >
                    Approve <img class="exchange__token-buttons-button-loading" src="/loading-button.svg" v-if="!successApproveBuyToken && pending">
                </button>
                <button
                    class="exchange__token-buttons-button"
                    :class="{ disabled: !successApproveBuyToken, pending: successApproveBuyToken && pending }"
                    @click="buyToken"
                >
                    Confirm <img class="exchange__token-buttons-button-loading" src="/loading-button.svg" v-if="successApproveBuyToken && pending">
                </button>
            </div>
            <div class="modal__step" v-if="!buyTokenApproved">
                <span class="modal__step-status active" :class="{ approved: successApproveBuyToken }">
                <span v-if="!successApproveBuyToken">1</span>
                    <img src="/check-circle.svg" alt="check" v-else>
                </span>
                <span class="modal__step-line" :class="{ active: successApproveBuyToken }"></span>
                <span class="modal__step-status" :class="{ active: successApproveBuyToken }">2</span>
            </div>
        </div>
    </div>
</template>

<script>
const BONUS_TOKEN_PRICE = 1

export default {
  data() {
    return {
      pending: false
    }
  },
  computed: {
    buyTokenApproved() {
      return this.$store.state.buyTokenApproved
    },
    successApproveBuyToken() {
      return this.$store.state.successApproveBuyToken || this.buyTokenApproved
    }
  },
  created() {
    this.$store.commit('changeSuccessApproveBuyToken', false)
  },
  watch: {
    successApproveBuyToken() {
      if (this.$store.state.successApproveBuyToken) {
        this.pending = false
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
    async approveToken() {
      if (this.pending) return
      this.pending = true
      try {
        await this.$store.dispatch('approveBuyToken', {
          price: BONUS_TOKEN_PRICE
        })
      } catch (error) {
        this.closeModal()
      }
    },
    async buyToken() {
      if (this.pending) return
      this.pending = true
      try {
        await this.$store.dispatch('exchangeBonusNFT', new Date().getFullYear())
      } catch (error) {
        this.closeModal()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.exchange__token {
  width: 38rem;
  background: $white;
  padding: 4.6rem 2.4rem 3rem;
  border-radius: 1rem;
  position: relative;
  &-close {
    display: flex;
    position: absolute;
    top: 2.7rem;
    right: 2.9rem;
  }
  &-title {
    font-family: Cabin-Regular;
    font-weight: 500;
    font-size: 3.2rem;
  }
  &-description {
    padding: 2.4rem 0;
    font-size: 1.4rem;
  }
  &-buttons {
    display: flex;
    &-button {
      display: flex;
      justify-content: center;
      flex: 1;
      background: $pink;
      padding: 1.5rem 0;
      text-align: center;
      font-weight: 700;
      font-size: 1.6rem;
      color: $white;
      &.apprvoe {
        margin-right: 1.6rem;
      }
      &.pending {
        background: $white;
        border: 1px solid $pink;
        color: $pink;
        cursor: default;
      }
      &.disabled {
        background: $white;
        border: 1px solid $border;
        pointer-events: none;
        color: $border;
        opacity: 0.5;
      }
      &-loading {
        margin-left: 1rem;
        animation: loading 1s infinite;
      }
    }
  }
  .modal__step {
    width: 21.4rem;
    padding: 0;
    margin: 2.4rem auto 0;
  }

  @media (max-width: 460px) {
    width: 100%;
    padding-left: 0.8rem;
    padding-right: 0.8rem;
    &-close {
      top: 1.3rem;
      right: 1.3rem;
    }
    &-title {
      font-weight: 700;
      font-size: 1.8rem;
    }
    &-description {
      padding-bottom: 3rem;
      border-bottom: 1px solid $modalColor;
    }
    &-buttons {
      margin-top: 1.8rem;
    }
  }
}
</style>
