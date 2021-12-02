<template>
  <div class="nft__content">
    <h1 class="nft__content-title">Sell price</h1>
    <div class="nft__content-form">
      <h3 class="nft__content-form-title">Enter price in CELO for this NFT</h3>
      <input type="number" class="nft__content-form-input" v-model="price">
    </div>
    <div class="nft__content-buttons">
      <button class="nft__content-buttons-button nft__content-buttons-button-cancel" @click="$router.push('/mycollection')">Cancel</button>
      <button class="nft__content-buttons-button gradient-button" @click="changeStep(!changeInfo ? 2 : 3)">Next step</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      price: 0,
    }
  },
  props: ['changeInfo'],
  methods: {
    changeStep(step) {
      this.$emit('setInfo', {
        price: this.price,
      })
      this.$emit('changeStep', step)
    },
  }
}
</script>
