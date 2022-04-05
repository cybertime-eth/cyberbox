<template>
  <div class="modal">
    <div class="modal__block valora">
      <div class="modal__valora">
        <h2 class="modal__title">Valora</h2>
        <h3 class="modal__sub-title">Opening Valora Wallet. If it doesn't open, you can scan this QR code.</h3>
        <img src="/close.svg" alt="close" class="modal__close" @click="closeModal">
        <QrcodeVue class="modal__qrcode" :value="walletUri" size="180" v-if="walletUri" />
      </div>
    </div>
  </div>
</template>
<script>
import QrcodeVue from 'qrcode.vue'
export default {
  components: {
    QrcodeVue
  },
	computed: {
    address() {
      return this.$store.state.address
    },
    walletUri() {
      return this.$store.state.walletUri
    }
  },
  watch: {
    address() {
      if (this.$store.state.address) {
        this.closeModal()
      }
    },
    walletUri() {
      if (this.$store.state.walletUri) {
        this.openValoraAppFromMobile()  
      }
    }
  },
  mounted() {
    if (!this.walletUri) {
      this.$store.dispatch('createWalletConnect', true)
    } else {
      this.openValoraAppFromMobile()
    }
  },
  methods: {
    openValoraAppFromMobile() {
      if (this.isMobile()) {
        location.href = `celo://wallet/wc?uri=${this.walletUri}`
      }
    },
    closeModal() {
      this.$store.dispatch('disconnectWallet', null)
      this.$emit('closeModal')
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  &__title {
    width: 100%;
    text-align: center;
  }
  @media (max-width: 460px) {
    &__block {
      padding-top: 0.8rem !important;
    }  
  }
}
</style>
<style lang="scss">
.modal {
  &__block {
    &.valora {
      width: 288px;
      padding: 8px;
    }
  }
  &__valora {
    padding: 16px;
  }
  &__title {
    text-align: center;
    color: #fff;
  }
  &__sub-title {
    padding: 8px 0;
    text-align: center;
    font-weight: 500;
    font-size: 1.1rem;
  }
  &__qrcode {
    width: fit-content;
    margin: 0 auto;
    padding-top: 20px;
  }
	@media(max-width: 460px) {
    &__title {
      font-size: 2.4rem;
    }
    &__sub-title {
      font-size: 1.6rem;
    }
	}
}
</style>
