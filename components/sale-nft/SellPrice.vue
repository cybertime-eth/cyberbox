<template>
  <div class="nft__content">
    <h1 class="nft__content-title">Sell price</h1>
<!--    <div class="nft__content-time" v-if="!changeInfo">-->
<!--      <button-->
<!--        class="nft__content-time-button"-->
<!--        :class="{'nft__content-active': activeDate === 1}"-->
<!--        @click="changeDate(1)"-->
<!--      >-->
<!--        3 days-->
<!--      </button>-->
<!--      <button-->
<!--        class="nft__content-time-button"-->
<!--        :class="{'nft__content-active': activeDate === 2}"-->
<!--        @click="changeDate(2)"-->
<!--      >-->
<!--        7 days-->
<!--      </button>-->
<!--      <button-->
<!--        class="nft__content-time-button"-->
<!--        :class="{'nft__content-active': activeDate === 3}"-->
<!--        @click="changeDate(3)"-->
<!--      >-->
<!--        30 days-->
<!--      </button>-->
<!--      <button-->
<!--        class="nft__content-time-button"-->
<!--        :class="{'nft__content-active': activeDate === 4}"-->
<!--        @click="changeDate(4)"-->
<!--      >-->
<!--        6 month-->
<!--      </button>-->
<!--    </div>-->
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
      activeDate: 1,
      price: 0,
      date: 0,
    }
  },
  props: ['changeInfo'],
  methods: {
    changeDate(date) {
      this.activeDate = date
      let dateNow = new Date().getTime() / 1000
      switch (date) {
        case 1: this.date = dateNow + 259200;
        break;
        case 2: this.date = dateNow + 604800;
        break;
        case 3: this.date = dateNow + 2592000;
        break;
        case 4: this.date = dateNow + 15778463;
        break;
        default: this.date = dateNow + 259200
      }
    },
    changeStep(step) {
      console.log(this.date.toFixed(0))
      this.$emit('setInfo', {
        price: this.price,
        date: this.date.toFixed(0)
      })
      this.$emit('changeStep', step)
    },
  }
}
</script>
