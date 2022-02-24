<template>
  <div class="nft__content">
    <h1 class="nft__content-title">Sell price</h1>
    <div class="nft__content-form">
      <h3 class="nft__content-form-title">Enter price in CELO for this NFT</h3>
      <span class="nft__content-form-input-box">
        <input type="number" class="nft__content-form-input" placeholder="0" v-model="price" @keyup="changePrice($event)">
      </span>
    </div>
    <div class="nft__content-buttons nft__content-buttons-mini">
      <button class="nft__content-buttons-button nft__content-buttons-button-cancel" @click="$router.go(0)" v-if="isCancelVisible">Cancel</button>
      <button class="nft__content-buttons-button gradient-button" :disabled="price < 0.01" @click="listNft" v-if="!pending">Listing</button>
      <button class="nft__content-buttons-button nft__content-buttons-button-confirm gradient-button" v-else>
        Pending confirmation <img src="/loading-button.svg" alt="load">
      </button>
    </div>
    <p class="nft__content-fee">Ones sold, the following fees will be deducted:<br/>{{ nftServiceFee }}% service fee | {{ nftRoyalty }}% creator royalty</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      price: null,
      pending: false,
      nftServiceFee: 0,
      nftRoyalty: 0,
    }
  },
  computed: {
    approve() {
      return this.$store.state.approveToken
    },
    isCancelVisible() {
      if (process.browser) {
        return window.innerWidth > 460
      } else {
        return  true
      }
    },
    listToken() {
      return this.$store.state.listToken
    }
  },
  props: ['nft', 'changeInfo'],
  watch: {
    price() {
      this.$emit('setPrice', this.price)
    },
    approve() {
      const status = this.$store.state.approveToken
      console.log(status)
      if (status === 'error') {
        this.$router.go(0)
      }
    },
    listToken() {
      this.pending = false
      if (this.listToken) {
        this.$emit('changeStep', 2)
      } else if (this.listToken === false) {
        this.$router.push('/mycollection')
      }
    }
  },
  async mounted() {
    const collectionInfo = await this.$store.dispatch('getCollectionInfo')
    this.nftServiceFee = collectionInfo.marketFee / 10
    this.nftRoyalty = (collectionInfo.createrFee + collectionInfo.producerFee) / 10
  },
  methods: {
    changePrice(event) {
      this.$store.commit('changeApproveToken', '')
      this.$store.commit('changelistToken', '')
    },
    listNft() {
      this.pending = true
      const listingMethod = !this.changeInfo ? 'listingNFT' : 'changeNFTPrice'
      this.$store.dispatch('approveToken', {
        listingMethod,
        price: this.price
      })
    }
  }
}
</script>

