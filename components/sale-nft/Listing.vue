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
      <button class="nft__content-buttons-button gradient-button" :disabled="price < 0.01 || !approve" @click="listNft" v-if="!pending">Listing</button>
      <button class="nft__content-buttons-button nft__content-buttons-button-confirm gradient-button" v-else>
        Pending confirmation <img src="/loading-button.svg" alt="load">
      </button>
    </div>
    <p class="nft__content-fee">Ones sold, the following fees will be deducted:<br/>2,5% service fee | 5% creator royalty</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      price: 0,
      pending: false
    }
  },
  computed: {
    isCancelVisible() {
      if (process.browser) {
        return window.innerWidth > 460
      } else {
        return  true
      }
    },
    approve() {
      if (!this.$store.state.approvedContracts.includes(this.nft.contract)) {
        return this.$store.state.approveToken === 'approve'
      } else {
        return true
      }
    },
    listToken() {
      return this.$store.state.listToken
    }
  },
  props: ['nft', 'changeInfo'],
  watch: {
    approve() {
      const status = this.$store.state.approveToken
      console.log(status)
      if (status === 'approve') {
        this.pending = false
      } else if (status === 'error') {
        this.$router.push('/mycollection')
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
  methods: {
    changePrice(event) {
      this.$store.commit('changelistToken', '')
      if (event.keyCode === 13) {
        this.$emit('setPrice', this.price)
        if (!this.$store.state.approvedContracts.includes(this.nft.contract)) {
          this.pending = true
          this.$store.dispatch('approveToken')
        }
      }
    },
    listNft() {
      const listDate = new Date().getTime() / 1000 + 604800 // 7 days
      this.pending = true
      if (!this.changeInfo) {
        this.$store.dispatch('listingNFT', {
          price: this.price,
          date: listDate,
        })
      } else {
        this.$store.dispatch('changeNFTPrice', this.price)
      }
    }
  }
}
</script>

