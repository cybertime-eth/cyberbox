<template>
  <div class="modal">
    <div class="modal__block">
        <h2 class="modal__title">Transfer Ownership</h2>
        <div class="modal__transfer">
          <p class="modal__transfer-description">Transfer NFT: Daopolis #111</p>
          <div class="modal__transfer-form">
            <p class="modal__transfer-form-name">Enter CELO address</p>
            <input class="modal__transfer-form-input" placeholder="0x" v-model="receiver">
          </div>
          <div class="modal__transfer-buttons">
            <button class="modal__transfer-button modal__transfer-button-cancel" @click="closeModal">Cancel</button>
            <button class="modal__transfer-button" :class="{ disabled: !receiver }" @click="transferToken">Transfer</button>
            <!-- <button class="modal__transfer-button modal__transfer-button-done" @click="closeModal">Done</button> -->
          </div>
        </div>
    </div>
  </div>  
</template>
<script>

export default {
  props: ['nft'],
  data() {
    return {
      receiver: ''
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal', false)
    },
    transferToken() {
      if (this.receiver.length > 0) {

      }
    }
  }
}
</script>
<style lang="scss">
.modal {
  &__block {
    
  }
  &__transfer {
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
      &-metamask-image {
        margin-top: 4rem;
      }
      &-button {
        width: 100%;
      }
    }
    &__block {
      width: 80%;
      padding-top: 8rem !important;
      padding-bottom: 4rem !important;
      &-container {
        text-align: center;
      }
    }
    &__title {
      width: 80%;
      margin: 0 auto;
      line-height: 2.2rem;
      text-align: center;
      font-size: 1.6rem;
      &-domain {
        color: $green;
      }
    }
  }
}
</style>
