<template>
  <div class="step-second">
    <AddNft v-if="addNftInBox" @changePage="changePage"/>
  </div>
</template>
<script>
import AddNft from './step2/AddNft'
export default {
  data() {
    return {
      createRarity: true,
      addNftInBox: false
    }
  },
  methods: {
    changePage(payload) {
      if (payload) {
        this.createRarity = false
        this.addNftInBox = true
      } else {
        this.createRarity = true
        this.addNftInBox = false
      }
      if (process.browser) {
        window.scrollTo(0, 0)
      }
    },
    changeStep(step) {
      this.$emit('routeBack', step)
    }
  },
  components: {
    AddNft
  }
}
</script>
