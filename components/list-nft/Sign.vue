<template>
  <div class="list-nft__content">
    <h1 class="list-nft__content-title">Sign</h1>
    <h3 class="list-nft__content-text">Set your sale listing expiry time</h3>
    <div class="list-nft__content-time">
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
    <p class="list-nft__content-date">Your listing will expire on Nov 07 @ 15:33</p>
    <h3 class="list-nft__content-price">Price 2 CELO</h3>
    <div class="list-nft__content-buttons list-nft__content-buttons-mini">
      <button class="list-nft__content-buttons-button list-nft__content-buttons-button-cancel" @click="$router.push('/mycollection')">Cancel</button>
      <button class="list-nft__content-buttons-button gradient-button" @click="changeStep(4)">List NFT for sale</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeDate: 1
    }
  },
  methods: {
    changeStep(step) {
      this.$emit('changeStep', step)
    },
  }
}
</script>
