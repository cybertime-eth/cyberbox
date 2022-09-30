<template>
	<section class="create-box">
      <CreateBoxStep v-if="step === 1" @changeStep="changeStep"/>
      <PrepareBoxStep v-if="step === 2" @changeStep="changeStep"/>
      <SuccessfullBoxStep v-if="step === 3" @changeStep="changeStep"/>
      <CollectionTypeStep v-if="step === 4" @changeStep="changeStep"/>
	  <CreateOffsetBoxStep :rarity="collectionType === 1" @changeStep="changeStep" v-if="step === 5"/>
  </section>
</template>
<script>
import CreateBoxStep from "../components/createbox/CreateBoxStep"
import PrepareBoxStep from "../components/createbox/PrepareBoxStep"
import SuccessfullBoxStep from "../components/createbox/SuccessfullBoxStep"
import CollectionTypeStep from "../components/createbox/CollectionTypeStep"
import CreateOffsetBoxStep from "../components/createbox/CreateOffsetBoxStep"

export default {
  data() {
    return {
	  step: 1,
	  collectionType: 1,
      showCreateContent: false
    }
  },
  methods: {
    changeStep(payload, type) {
	  this.step = payload
	  if (type) {
		this.collectionType = type
	  }
      if (process.browser) {
        window.scrollTo(0, 0)
      }
	}
  },
  components: {
    CreateBoxStep,
    PrepareBoxStep,
    SuccessfullBoxStep,
	CollectionTypeStep,
	CreateOffsetBoxStep
  }
}
</script>
<style lang="scss">
.create-box {
}
</style>
