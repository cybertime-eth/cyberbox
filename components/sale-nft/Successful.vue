<template>
  <div class="nft__content">
    <h1 class="nft__content-title">Successfully listed!</h1>
    <p class="nft__content-subtitle nft__content-subtitle-second">Your NFT is now listed for {{ price }} CELO in the marketplace</p>
    <div class="nft__content-buttons nft__content-buttons-mini">
      <button class="nft__content-buttons-button gradient-button" @click="changeList">
        Done
      </button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    changeList() {
      this.$emit('changeList', 'done')
    }
  },
  props: ['price']
}
</script>

