<template>
  <div class="nft__content">
    <h1 class="nft__content-title">Sign</h1>
    <p class="nft__content-text">Set your sale listing expiry time</p>
        <div class="nft__content-time" v-if="!changeInfo">
          <button
            class="nft__content-time-button"
            :class="{'nft__content-active': activeDate === 1}"
            @click="changeDate(1)"
          >
            3 days
          </button>
          <button
            class="nft__content-time-button"
            :class="{'nft__content-active': activeDate === 2}"
            @click="changeDate(2)"
          >
            7 days
          </button>
          <button
            class="nft__content-time-button"
            :class="{'nft__content-active': activeDate === 3}"
            @click="changeDate(3)"
          >
            30 days
          </button>
          <button
            class="nft__content-time-button"
            :class="{'nft__content-active': activeDate === 4}"
            @click="changeDate(4)"
          >
            6 month
          </button>
        </div>
    <p class="nft__content-subtitle">Your listing will expire on {{ getDate }}</p>
    <div class="nft__content-buttons-mini">
      <button class="nft__content-buttons-button nft__content-buttons-button-cancel" @click="$router.push('/mycollection')">Cancel</button>
      <button class="nft__content-buttons-button gradient-button" @click="listingNft">List for sale</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      date: (new Date().getTime() / 1000) + 259200,
      activeDate: 1
    }
  },
  props: ['price', 'changeInfo'],
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
      this.$emit('changeStep', step)
    },
    async listingNft() {
      this.$emit('setInfo', {
        price: this.price,
        date: this.date
      })
      this.changeStep(4)
    },
  },
  computed: {
    getDate() {
      let month = ['Jan', 'Feb', 'Mar',
        'Apr', 'May', 'June', 'July',
        'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      let getDate = new Date(+this.date * 1000)
      return `${month[getDate.getMonth()]} ${getDate.getDate()} @ ${getDate.getHours()}:${getDate.getMinutes()}`

    },
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
