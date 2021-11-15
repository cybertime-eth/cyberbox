<template>
  <div class="list-nft__content">
    <h1 class="list-nft__content-title">Sell price</h1>
    <div class="list-nft__content-time" v-if="!changeInfo">
      <button
        class="list-nft__content-time-button"
        :class="{'list-nft__content-active': activeDate === 1}"
        @click="activeDate = 1"
      >
        3 days
      </button>
      <button
        class="list-nft__content-time-button"
        :class="{'list-nft__content-active': activeDate === 2}"
        @click="activeDate = 2"
      >
        7 days
      </button>
      <button
        class="list-nft__content-time-button"
        :class="{'list-nft__content-active': activeDate === 3}"
        @click="activeDate = 3"
      >
        30 days
      </button>
      <button
        class="list-nft__content-time-button"
        :class="{'list-nft__content-active': activeDate === 4}"
        @click="activeDate = 4"
      >
        6 month
      </button>
    </div>
    <div class="list-nft__content-form">
      <h3 class="list-nft__content-form-title">Enter price in CELO for this NFT</h3>
      <input type="number" class="list-nft__content-form-input" v-model="price">
    </div>
    <p class="list-nft__content-subtitle" v-if="!changeInfo">Awaiting your approval for Cyber Box to list your NFTs</p>
    <p class="list-nft__content-subtitle" v-else>Your NFT is being listed on the marketplace</p>
    <div class="list-nft__content-buttons">
      <button class="list-nft__content-buttons-button list-nft__content-buttons-button-cancel" @click="$router.push('/mycollection')">Cancel</button>
      <button class="list-nft__content-buttons-button gradient-button" @click="changeStep(!changeInfo ? 2 : 3)">Next step</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeDate: 1,
      price: 0
    }
  },
  props: ['changeInfo'],
  methods: {
    changeStep(step) {
      this.$emit('changeStep', step)
    },
  }
}
</script>
