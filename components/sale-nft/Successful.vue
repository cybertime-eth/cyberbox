<template>
  <div class="nft__content">
    <div class="nft__content-header">
      <h1 class="nft__content-title">Successfully listed!</h1>
      <img class="nft__content-success-icon" src="/check.svg" alt="check">
    </div>
    <p class="nft__content-subtitle nft__content-subtitle-second">Your NFT is now listed for {{ price }} CELO in the marketplace</p>
    <div class="nft__content-buttons nft__content-buttons-mini">
      <button class="nft__content-buttons-button nft__content-buttons-button-done gradient-button" @click="changeList">
        Done
      </button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    changeList() {
      this.$emit('changeList', 'default')
    }
  },
  props: ['price']
}
</script>

