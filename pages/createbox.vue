<template>
	<section class="create-box">
      <!-- <CreateBoxStep v-if="step === 1" @changeStep="changeStep"/> -->
      <!-- <PrepareBoxStep v-if="step === 1" @changeStep="changeStep"/> -->
      <!-- <SuccessfullBoxStep v-if="step === 1" @changeStep="changeStep"/> -->
      <CollectionTypeStep v-if="step === 1" @changeStep="changeStep"/>
  </section>
</template>
<script>
import CreateBoxStep from "../components/createbox/CreateBoxStep"
import PrepareBoxStep from "../components/createbox/PrepareBoxStep"
import SuccessfullBoxStep from "../components/createbox/SuccessfullBoxStep"
import CollectionTypeStep from "../components/createbox/CollectionTypeStep"

export default {
  data() {
    return {
	  step: 1,
      showCreateContent: false
    }
  },
  methods: {
    changeStep(payload) {
      this.step = payload
      if (process.browser) {
        window.scrollTo(0, 0)
      }
    }
  },
  components: {
    CreateBoxStep,
    PrepareBoxStep,
    SuccessfullBoxStep,
    CollectionTypeStep
  }
}
</script>
<style lang="scss">
.create-box {
}
</style>
