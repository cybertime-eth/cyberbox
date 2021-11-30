<template>
  <div class="nft__content">
    <h1 class="nft__content-title">Listing in progress</h1>
    <p class="nft__content-text-second" v-if="!launch">Your NFT is being listed on the marketplace</p>
    <h3 class="nft__content-text nft__content-text-border" v-if="launch">Please wait while we confirm your listing</h3>
    <p class="nft__content-subtitle nft__content-subtitle-second" v-if="launch">Your NFT is being listed on the marketplace</p>
    <div class="nft__content-buttons">
      <button class="nft__content-buttons-button nft__content-buttons-button-cancel" @click="$router.push('/mycollection')">Cancel</button>
      <button class="nft__content-buttons-button gradient-button" v-if="!launch" @click="listingNft">Launch</button>
      <button
        class="nft__content-buttons-button-confirm gradient-button"
        v-else
      >
        Pending confirmation <img src="/loading-button.svg" alt="load">
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      launch: false
    }
  },
  props: ['nft'],
  methods: {
    changeStep(step) {
      this.$emit('changeStep', step)
    },
    async listingNft() {
      await this.$store.dispatch('listingNFT', this.nft)
      this.launch = true
    },
  },
  computed: {
    listToken() {
      return this.$store.state.listToken
    }
  },
  watch: {
    listToken() {
      if (this.listToken) {
        this.$emit('changeStep', 4)
      } else {
        this.$router.push('/mycollection')
      }
    }
  },
}
</script>
