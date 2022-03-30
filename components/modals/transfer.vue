<template>
  <div class="modal">
    <div class="modal__block transfer">
        <div class="modal__transfer-header">
          <a class="modal__transfer-header-link" href="/">
            <img src="/logo.svg">
          </a>
          <button class="modal__transfer-header-button" @click="closeModal">Cancel</button>
        </div>
        <img class="modal__image" :src="nft.image">
        <h2 class="modal__title">Transfer Ownership</h2>
        <div class="modal__transfer">
          <p class="modal__transfer-description" :class="{ success: successTransferToken }">{{ transferDescription }}</p>
          <div class="modal__transfer-form">
            <p class="modal__transfer-form-name">{{ transferFormName }}</p>
            <input class="modal__transfer-form-input" :readonly="successTransferToken" placeholder="0x" v-model="receiver">
          </div>
          <div class="modal__transfer-buttons">
            <button class="modal__transfer-buttons-button modal__transfer-buttons-button-cancel" @click="closeModal">Cancel</button>
            <button class="modal__transfer-buttons-button modal__transfer-buttons-button-done" @click="closeModal" v-if="successTransferToken">Done</button>
            <button class="modal__transfer-buttons-button modal__transfer-buttons-button-confirm gradient-button" v-else-if="pending">
              Pending confirmation <img src="/loading-button.svg" alt="load">
            </button>
            <button class="modal__transfer-buttons-button gradient-button" :class="{ disabled: !receiver }" @click="transferToken" v-else>Transfer</button>
          </div>
        </div>
    </div>
  </div>  
</template>
<script>

export default {
  props: ['nft'],
  computed: {
    successTransferToken() {
      return this.$store.state.successTransferToken
    },
    transferDescription() {
      if (!this.successTransferToken) {
        const nameSuffix = this.nft.contract !== 'nomdom' ? '' : '.nom'
        return `Transfer NFT: ${this.nft.name}${nameSuffix}`
      } else {
        return 'Successfully sended!'
      }
    },
    transferFormName() {
      if (!this.successTransferToken) {
        return 'Enter CELO address'
      } else {
        return 'Destination address'
      }
    }
  },
  data() {
    return {
      receiver: '',
      pending: false
    }
  },
  watch: {
    successTransfer() {
      if (this.$store.state.successTransferToken) {
        this.pending = false
      }
    }
  },
  mounted() {
    this.$store.commit('changeSuccessTransferToken', false)
  },
  methods: {
    closeModal() {
      this.$emit('closeModal', false)
      this.$store.commit('changeSuccessTransferToken', false)
    },
    transferToken() {
      if (this.receiver.length === 42) {
        this.pending = true
        this.$store.dispatch('transferNFT', {
          nft: this.nft,
          toAddress: this.receiver
        })
      } else {
        alert('Please input correct address.')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.modal__image {
  display: none;
}
</style>

<style lang="scss">
.modal {
  &__block {
    &.transfer {
      width: 46.9rem;
      padding: 2.46rem 1.85rem 1.85rem;
      cursor: default;
    }
  }
  &__title {
    font-family: Cabin-Bold;
    text-align: left;
    font-size: 2.46rem;
  }
  &__transfer {
    padding-top: 1.85rem;
    &-header {
      display: none;
    }
    &-description {
      font-weight: 600;
      font-size: 1.38rem;
      &.success {
        color: $green;
      }
    }
    &-form {
      padding-top: 1.23rem;
      padding-bottom: 5.23rem;
      font-size: 1.38rem;
      &-name {
        padding-bottom: 1.23rem;
        font-size: 1.23rem;
      }
      &-input {
        width: calc(100% - 1.85rem);
        height: 1.54rem;
        padding: 0.92rem 0.78rem;
        border: 1px solid $border;
        font-size: 1.38rem;
        &:focus {
          border-color: $green;
        }
        &:read-only {
          background: transparent;
          border-color: $border;
          color: #9CA3AF;
        }
      }
    }
    &-buttons {
      display: flex;
      justify-content: flex-end;
      &-button {
        width: 11.1rem;
        padding: 1rem;
        background: $white;
        margin-right: 1.23rem;
        border: 1px solid $pink;
        border-radius: 25px;
        text-align: center;
        font-size: 1.23rem;
        color: $pink;
        &-confirm {
          width: auto;
          display: flex;
          align-items: center;
          padding: 1rem 1.85rem;
          cursor: default;
          img {
            margin-left: 1rem;
            animation: loading 1s infinite;
          }
        }
        &-cancel {
          border-color: $border;
          color: $textColor;
        }
        &:last-child {
          margin: 0;
        }
        &.disabled {
          pointer-events: none;
          color: $border;
          border-color: $border;
        }
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
      &-metamask-image {
        margin-top: 4rem;
      }
      &-button {
        width: 100%;
      }
    }
    &__image {
      display: block;
      width: 100%;
      padding-bottom: 1.6rem;
    }
    &__block {
      &.transfer {
        width: 100%;
        height: calc(100% - 3.4rem);
        background: $white;
        padding: 0 .8rem 3.2rem !important;
        margin: 0 !important;
        border-radius: 0;
        overflow-y: auto;
      }
      &-container {
        text-align: center;
      }
    }
    &__title {
      width: 80%;
      margin: 0;
      line-height: 2.2rem;
      text-align: left;
      font-size: 2.2rem;
      &-domain {
        color: $green;
      }
    }
    &__transfer {
      padding-top: 2.4rem;
      &-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 4rem;
        &-link {
          height: 4rem;
          margin-left: -1rem;
          img {
            width: 4rem;
          }
        }
        &-button {
          background: transparent;
          font-weight: 600;
          font-size: 1.4rem;
        }
      }
      &-description {
        font-size: 1.6rem;
      }
      &-form {
        padding-top: 2.4rem;
        padding-bottom: 3rem;
        &-name {
          padding-bottom: 1.6rem;
          font-size: 1.6rem;
        }
        &-input {
          width: calc(100% - 2rem);
          padding: 1.2rem 1rem;
          border-color: $border2;
          font-size: 1.4rem;
        }
      }
      &-buttons {
        &-button {
          width: 100%;
          font-size: 1.6rem;
          &-cancel {
            display: none;
          }
          &-confirm {
            justify-content: center;
          }
        }
      }
    }
  }
}
</style>
