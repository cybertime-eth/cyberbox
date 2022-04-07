<template>
  <div class="modal">
    <div class="modal__block">
      <h2 class="modal__title">{{ modalTitle }}</h2>
      <div class="modal__connect">
        <button class="modal__connect-button" @click="connectValora">
          Valora
          <img src="/auth/valora.svg" alt="valora" class="modal__connect-button-image">
        </button>
        <button class="modal__connect-button" @click="connectMetaTrust">
          MetaMask
          <img src="/auth/metamask.svg" alt="metamask" class="modal__connect-button-image">
        </button>
        <button class="modal__connect-button" @click="connectWallet">
          WalletConnect
          <img src="/auth/WalletConnect.png" alt="metamask" class="modal__connect-button-image">
        </button>
      </div>
      <img src="/close.svg" alt="close" class="modal__close" @click="closeModal">
    </div>
  </div>  
</template>
<script>

export default {
  computed: {
    modalTitle() {
      return !this.isMobile() ? 'Connect your wallet' : 'Connect wallet';
    },
    walletUri() {
      return this.$store.state.walletUri
    }
  },
  watch: {
    walletUri() {
      if (this.$store.state.walletUri) {
        this.openMetamaskAppFromMobile()
      }
    }
  },
  methods: {
    async connectMetaTrust() {
      if (window.ethereum) {
        await this.$store.dispatch('connectMetaTrust')
      } else {
        if (!this.walletUri) {
          this.$store.dispatch('createWalletConnect')
        } else {
          this.openMetamaskAppFromMobile()
        }
      }
    },
    openMetamaskAppFromMobile() {
      if (this.isMobile()) {
        location.href = `https://metamask.app.link/wc?uri=${encodeURIComponent(this.walletUri)}`
      }
    },
    connectValora() {
      this.$emit('showValora')
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
<style lang="scss" scoped>
.modal {
  &__title {
    text-align: center;
    color: $titleColor;
  }
  @media screen and (max-width: 460px) {
    &__block {
      width: 100%;
      padding: 5.7rem .8rem 3.2rem;
    }
    &__title {
      width: 100%;
      text-align: center;
      color: $titleColor;
    } 
  }
}
</style>
<style lang="scss">
.modal {
  &__title {
    text-align: center;
  }
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
  .modal {
    > div:first-child {
      margin: 0 .8rem;
    }
    &__connect {
      padding-top: 2.4rem;
      &-button {
        width: 100%;
      }
    }
    &__block {
      &-container {
        text-align: center;
      }
    }
    &__title {
      width: 100%;
      margin: 0 auto;
      line-height: 2.2rem;
      text-align: center;
      font-size: 1.8rem;
    }
  }
}
</style>
