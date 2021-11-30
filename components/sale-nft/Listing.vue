<template>
  <div class="nft__content">
    <h1 class="nft__content-title">Listing in progress</h1>
    <h3 class="nft__content-text nft__content-text-border">Please wait while we confirm your listing</h3>
    <p class="nft__content-subtitle nft__content-subtitle-second">Your NFT is being listed on the marketplace</p>
    <div class="nft__content-buttons nft__content-buttons-mini">
      <button
        class="nft__content-buttons-button-confirm gradient-button"
      >
        Pending confirmation <img src="/loading-button.svg" alt="load">
      </button>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    listToken() {
      return this.$store.state.listToken
    }
  },
  props: ['nft'],
  watch: {
    listToken() {
      if (this.listToken) {
        this.$emit('changeStep', 5)
      } else {
        this.$router.push('/mycollection')
      }
    }
  },
  async created() {
    await this.$store.dispatch('listingNFT', this.nft)
  },
}
</script>

