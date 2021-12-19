<template>
  <div class="modal">
    <div class="modal__block">
      <h2 class="modal__title">Connect your wallet</h2>
      <img src="/close.svg" alt="close" class="modal__close" @click="closeModal">
      <div class="modal__connect">
        <button class="modal__connect-button" @click="connectMetaTrust" v-if="!isMobile">
          MetaMask
          <img src="/auth/metamask.svg" alt="metamask" class="modal__connect-button-image">
        </button>
<!--        <button class="modal__connect-button" @click="connectMetaTrust">-->
<!--          TrustWallet-->
<!--          <img src="/auth/trastwallet.svg" alt="metamask" class="modal__connect-button-image">-->
<!--        </button>-->
        <button class="modal__connect-button" @click="connectWallet">
          WalletConnect
          <img src="/auth/WalletConnect.png" alt="metamask" class="modal__connect-button-image">
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    isMobile() {
      const isMobile = /iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(navigator.userAgent.toLowerCase()) && navigator.userAgent.search('PC') === -1
      const isTablet = /ipad|nexus 7|nexus 9|android 3.0|kindle|silk|kftt|kfot|kfjwa|kfjwi|kfsowi|kfthwa|kfthwi|kfapwa|kfapwi/i.test(navigator.userAgent.toLowerCase()) && navigator.userAgent.search('PC') === -1
      return isMobile || isTablet
    }
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
}
</style>
