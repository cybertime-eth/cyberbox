<template>
  <div class="list-nft__content">
    <h1 class="list-nft__content-title">Listing in progress</h1>
    <h3 class="list-nft__content-text list-nft__content-text-border">Please wait while we confirm your listing</h3>
    <p class="list-nft__content-subtitle list-nft__content-subtitle-second">Your NFT is being listed on the marketplace</p>
    <div class="list-nft__content-buttons list-nft__content-buttons-mini">
      <button
        class="list-nft__content-buttons-button-confirm gradient-button"
      >
        Pending confirmation <img src="/loading-button.svg" alt="load">
      </button>
    </div>
  </div>
</template>
<script>
export default {
  created() {
    setTimeout(() => {
      this.$emit('changeStep', 5)
    }, 3000)
  }
}
</script>

