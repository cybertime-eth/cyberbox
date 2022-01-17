<template>
  <div class="modal">
    <div class="modal__block">
      <div v-if="metamaskEnabled">
        <h2 class="modal__title">Connect your wallet</h2>
        <div class="modal__connect">
          <button class="modal__connect-button" @click="connectMetaTrust">
            MetaMask
            <img src="/auth/metamask.svg" alt="metamask" class="modal__connect-button-image">
          </button>
          <!-- <button class="modal__connect-button" @click="connectWallet">
            WalletConnect
            <img src="/auth/WalletConnect.png" alt="metamask" class="modal__connect-button-image">
          </button> -->
        </div>
      </div>
      <h2 class="modal__title" v-else>Open <span class="modal__title-domain">cyberbox.art</span> in your Metamask mobile app</h2>
      <img src="/close.svg" alt="close" class="modal__close" @click="closeModal">
    </div>
  </div>  
</template>
<script>

export default {
  data() {
    return {
      metamaskEnabled: false
    }
  },
  mounted() {
    // this.metamaskEnabled = !!window.ethereum
  },
  methods: {
    async connectMetaTrust() {
      await this.$store.dispatch('connectMetaTrust')
    },
    async connectWallet() {
      await this.$store.dispatch('walletConnect', true)
    },
    closeModal() {
      this.$emit('closeModal', false)
    }
  }
}
</script>
<style lang="scss">
.modal {
  &__connect {
    padding-top: 4.4rem;
    &-button {
      margin-bottom: 1.4rem;
      background: $white;
      border-radius: .4rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.2rem 1rem;
      width: 30rem;
      cursor: pointer;
      &-image {
        width: 2.4rem;
      }
    }
  }
}
@media screen and (max-width: 460px) {
  .modal__connect-button {
    width: 25rem;
  }
  .modal__block {
    width: 80%;
  }
  .modal__title {
    width: 70%;
    margin: 0 auto;
    line-height: 2.2rem;
    text-align: center;
    font-size: 1.6rem;
    &-domain {
      color: $green;
    }
  }
}
</style>
