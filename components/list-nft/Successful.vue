<template>
  <div class="list-nft__content">
    <h1 class="list-nft__content-title">Successfully listed!</h1>
    <h3 class="list-nft__content-text list-nft__content-text-border">Your NFT is now listed for 2 CELO</h3>
    <p class="list-nft__content-subtitle list-nft__content-subtitle-second">Your NFT is being listed on the marketplace</p>
    <div class="list-nft__content-buttons list-nft__content-buttons-mini">
      <button class="list-nft__content-buttons-button gradient-button" @click="changeList">
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
  }
}
</script>

