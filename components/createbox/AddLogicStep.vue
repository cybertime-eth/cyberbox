<template>
  <div class="step-second">
    <CreateRarity v-if="createRarity" @changePage="changePage" @routeBack="changeStep" @nextStep="changeStep" />
    <AddNft v-if="addNftInBox" @changePage="changePage"/>
  </div>
</template>
<script>
import AddNft from './step2/AddNft'
import CreateRarity from './step2/CreateRarity'
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
    AddNft,
    CreateRarity
  }
}
</script>
