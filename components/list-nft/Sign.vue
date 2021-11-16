<template>
  <div class="list-nft__content">
    <h1 class="list-nft__content-title">Sign</h1>
    <h3 class="list-nft__content-text">Set your sale listing expiry time</h3>
    <p class="list-nft__content-date">Your listing will expire on Nov 07 @ 15:33</p>
    <h3 class="list-nft__content-price">Price {{ price }} CELO</h3>
    <div class="list-nft__content-buttons list-nft__content-buttons-mini">
      <button class="list-nft__content-buttons-button list-nft__content-buttons-button-cancel" @click="$router.push('/mycollection')">Cancel</button>
      <button class="list-nft__content-buttons-button gradient-button" @click="changeStep(4)">List NFT for sale</button>
    </div>
  </div>
</template>
<script>
export default {
  props: ['price'],
  methods: {
    changeStep(step) {
      this.$emit('changeStep', step)
    },
  }
}
</script>
