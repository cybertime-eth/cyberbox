<template>
  <div class="modal">
    <div class="modal__block transfer" :class="{ success: successTransferToken }">
        <div class="modal__transfer-header">
          <button class="modal__transfer-header-button" @click="closeModal"><img src="/close.svg" alt="close"></button>
        </div>
        <h2 class="modal__title">{{ modalTitle }}</h2>
        <div class="modal__transfer">
          <div v-if="!successTransferToken">
            <div class="modal__transfer-info">
              <img class="modal__image" :src="getNFTImage(nft)">
              <div class="modal__transfer-nft">
                <p class="modal__transfer-collection">{{ collectionName }}</p>
                <p class="modal__transfer-description">{{ transferDescription }}</p>
              </div>
            </div>
            <div class="modal__transfer-form">
              <p class="modal__transfer-form-name">Enter CELO wallet or <img class="nom-icon" src="/icon-nomdom.svg" alt="nom"> Nom domain</p>
              <input class="modal__transfer-form-input" :readonly="successTransferToken" :placeholder="inputHint" v-model="receiver">
              <p class="modal__transfer-form-description">You won’t be able to take back the NFT after the transaction.</p>
            </div>
          </div>
          <div class="modal__transfer-success" v-else>
            <p class="modal__transfer-description">{{ transferDescription }}</p>
            <img class="modal__transfer-success-icon" src="/success.svg" alt="success">
            <p class="modal__transfer-link">Viev on explorer.celo.org <img src="/share.svg" alt="share"></p>
          </div>
          <div class="modal__transfer-buttons">
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
    modalTitle() {
      return !this.successTransferToken ? 'Transfer NFT' : 'NFT Transfered'
    },
    collectionName() {
      return this.$store.state.collectionList.find(item => item.route === this.nft.contract).name
    },
    transferDescription() {
      const nameSuffix = this.nft.contract !== 'nomdom' ? '' : '.nom'
      return `${this.nft.name}${nameSuffix}`
    },
    transferFormName() {
      if (!this.successTransferToken) {
        return ''
      } else {
        return 'Destination address'
      }
    },
    inputHint() {
      return this.isMobile() && process.browser && window.innerWidth < 767 ? 'Hold to paste' : '0x'
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
.modal {
  &__block {
    background:  $white;
  }
  @media(max-width: 460px) {
    &__title {
      text-align: left;
      font-size: 3.2rem;
    }
  }
}
</style>

<style lang="scss">
.modal {
  &__block {
    &.transfer {
      width: 45.6rem;
      background: $white;
      padding: 2.1rem 1.6rem 2.4rem;
      cursor: default;
      &.success {
        width: 37.6rem;
        padding: 2.4rem 2.4rem 3.2rem;
        .modal__title {
          width: 100%;
          text-align: center;
        }
        .modal__transfer {
          padding-top: 0;
          text-align: center;
          &-header {
            display: none;
          }
          &-success {
            padding-bottom: 3.2rem;
          }
          &-description {
            margin-top: 0.4rem;
          }
          &-success-icon {
            padding: 2.8rem 0 2.4rem;
          }
          &-link {
            font-weight: 600;
            font-size: 1.6rem;
            color: $grayLight;
            img {
              width: 2rem;
              transform: translateY(4px);
            }
          }
        }
      }
    }
  }
  &__transfer {
    padding-top: 1.8rem;
    &.success {
      padding-top: 0;
    }
    &-header {
      display: block;
      width: calc(100% + 3.2rem);
      height: 1.4rem;
      margin: 0 -1.6rem;
      padding: 0;
      position: relative;
      &-button {
        background: transparent;
        position: absolute;
        top: 0;
        right: 1.6rem;
        line-height: 1.4rem;
      }
    }
    &-info {
      display: flex;
      flex-wrap: wrap;
      .modal__image {
        display: block;
        width: 6.4rem;
        padding: 0;
        margin-right: 1.2rem;
        border-radius: 4px;
      }
    }
    &-collection {
      font-weight: 600;
      font-size: 1.4rem;
      color: $grayLight;
    }
    &-description {
      font-weight: 600;
      font-size: 1.8rem;
    }
    &-form {
      padding-top: 1.6rem;
      padding-bottom: 3.2rem;
      font-size: 1.8rem;
      &-name {
        padding-bottom: 1.6rem;
        font-size: 1.6rem;
        img {
          transform: translateY(3px);
        }
      }
      &-input {
        width: calc(100% - 1.85rem);
        height: 1.54rem;
        padding: 0.92rem 0.78rem;
        border: 1px solid $border;
        font-size: 1.6rem;
        &:focus {
          border-color: $green;
        }
        &:read-only {
          background: transparent;
          border-color: $border;
          color: #9CA3AF;
        }
      }
      &-description {
        margin-top: 1.6rem;
        font-size: 1.4rem;
        color: $grayLight;
      }
    }
    &-buttons {
      display: flex;
      justify-content: flex-end;
      &-button {
        width: 100%;
        background: $pink;
        padding: 1rem;
        margin-right: 1.6rem;
        border: 1px solid $pink;
        border-radius: 25px;
        text-align: center;
        font-size: 1.6rem;
        color: $white;
        &-confirm {
          display: flex;
          align-items: center;
          justify-content: center;
          background: $white;
          padding: 1rem 1.85rem;
          color: $pink;
          cursor: default;
          img {
            margin-left: 1rem;
            animation: loading 1s infinite;
          }
        }
        &:last-child {
          margin: 0;
        }
        &.disabled {
          background: $white;
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
    &__block {
      &.transfer {
        width: 100%;
        height: auto;
        padding: 0 .8rem 3.2rem !important;
        border-radius: 10px;
        overflow-y: auto;
        &.success {
          width: 100%;
          padding: 1.8rem 1.8rem 2.6rem !important;
          .modal__transfer {
            &-success-icon {
              padding: 2.2rem 0 1.4rem;
            }
            &-description, &-link {
              font-size: 1.4rem;
            }
          }
        }
      }
      &-container {
        text-align: center;
      }
    }
    &__transfer {
      padding-top: 1.6rem;
      &-header {
        width: calc(100% + 1.6rem);
        height: 4rem;
        margin: 0 -0.8rem;
        &-button {
          top: 50%;
          right: 1.3rem;
          transform: translateY(-50%);
        }
      }
      &-description {
        font-size: 1.6rem;
      }
      &-form {
        padding-bottom: 2.6rem;
        &-name {
          padding-bottom: .8rem;
          font-size: 1.4rem;
        }
        &-input {
          width: calc(100% - 2rem);
          padding: 1.2rem 1rem;
          border-color: $border2;
          font-size: 1.4rem;
        }
        &-description {
          font-size: 1.3rem;
        }
      }
      &-buttons {
        &-button {
          width: 100%;
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
