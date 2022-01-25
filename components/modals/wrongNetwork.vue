<template>
  <div class="modal">
    <div class="modal__wrong">
      <div class="modal__wrong-container">
        <div class="modal__wrong-header">
          <img class="modal__wrong-header-icon" src="/pulse-pink.svg" alt="pulse">
          <h1 class="modal__wrong-header-title">You are on the wrong network</h1>
        </div>
        <p class="modal__wrong-subtitle">Click the button below to switch or add the Celo network as a custom network to your Metamask wallet.</p>
        <button class="modal__wrong-button" @click="switchNetwork">Switch to Celo Network</button>
      </div>
      <div class="modal__wrong-manual-info">
        <a class="modal__wrong-manual-link" @click="showManualInfo = !showManualInfo">{{ !showManualInfo ? '+' : '-' }} Manually add the network instead</a>
        <p class="modal__wrong-manual-description" v-if="showManualInfo">Use the following table to add a custom network RPC manually:</p>
      </div>
      <div class="modal__wrong-manual-box" v-if="showManualInfo">
        <div class="modal__wrong-manual-box-item">
          <span class="modal__wrong-manual-box-item-name">Network Name:</span>
          <h3 class="modal__wrong-manual-box-item-subtitle">Celo Mainnet</h3>
        </div>
        <div class="modal__wrong-manual-box-item">
          <span class="modal__wrong-manual-box-item-name">New RPC URL:</span>
          <a href="https://forno.celo.org" target="_blank"><h3 class="modal__wrong-manual-box-item-subtitle">https://forno.celo.org</h3></a>
        </div>
        <div class="modal__wrong-manual-box-item">
          <span class="modal__wrong-manual-box-item-name">Chain ID:</span>
          <h3 class="modal__wrong-manual-box-item-subtitle">42220</h3>
        </div>
        <div class="modal__wrong-manual-box-item">
          <span class="modal__wrong-manual-box-item-name">Currency Symbol (optional):</span>
          <h3 class="modal__wrong-manual-box-item-subtitle">CELO</h3>
        </div>
        <div class="modal__wrong-manual-box-item">
          <span class="modal__wrong-manual-box-item-name">Block Explorer URL (optional):</span>
          <a href="https://explorer.celo.org" target="_blank"><h3 class="modal__wrong-manual-box-item-subtitle">https://explorer.celo.org</h3></a>
        </div>
      </div>
      <button class="modal__wrong-close-button" @click="closeModal">
        <img src="/close-bold.svg" class="modal__close-button-icon">
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showManualInfo: false
    }
  },
  computed: {
    wrongNetwork() {
      return this.$store.state.wrongNetwork
    }
  },
  watch: {
    wrongNetwork() {
      if (!this.$store.state.wrongNetwork) {
        this.closeModal()
      }
    }
  },
  methods: {
    switchNetwork() {
      this.$store.dispatch('switchNetwork')
    },
    closeModal() {
      this.$emit('closeModal')
    }
  }
}
</script>
<style lang="scss" scoped>
.modal {
  &__wrong {
    position: relative;
    max-width: 482px;
    background: $white;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.25);
    border-radius: 9px;
    &-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 52px 35px 0;
    }
    &-header {
      display: flex;
      align-items: center;
      &-icon {
        margin-right: 8px;
      }
      &-title {
        font-weight: 600;
        font-size: 20px;
        color: $pink;
      }
    }
    &-subtitle {
      padding-top: 12px;
      font-size: 14px;
      color: $titleColor;
    }
    &-button {
      margin: 32px 0;
      background: $white;
      padding: 14px 24px;
      border: 1px solid $pink;
      border-radius: 25px;
      text-align: center;
      font-weight: 600;
      font-size: 16px;
      color: $pink;
    }
    &-close-button {
      position: absolute;
      background: transparent;
      top: 21px;
      right: 21px;
    }
    &-manual {
      &-info {
        padding: 0 16px 8px;
      }
      &-link, &-description {
        font-size: 14px;
        color: $black;
      }
      &-link {
        cursor: pointer;
      }
      &-description {
        padding: 8px 0;
      }
      &-box {
        background: $modalColor;
        padding: 0 16px 12px;
        border-bottom-left-radius: 9px;
        border-bottom-right-radius: 9px;
        &-item {
          display: flex;
          align-items: center;
          padding-top: 16px;
          &-name {
            margin-right: 10px;
            font-size: 16px;
            color: $black;
          }
          &-subtitle {
            font-weight: 600;
            font-size: 16px;
            color: $black;
          }
        }
      }
    }
    @media(max-width: 460px) {
      &-manual-box-item {
        flex-wrap: wrap;
      }
    }
  }
}
</style>
