<template>
    <section class="createbox-step">
        <CreateCollection v-if="step === 1" @create="changeStep(2)"/>
        <PrepareBoxStep :collectionMode="true" v-if="step === 2" @changeStep="changeStep"/>
        <SuccessfullBoxStep :collectionMode="true" v-if="step === 3" @changeStep="moveStep"/>
    </section>
</template>

<script>

import CreateCollection from "@/components/createbox/step1/CreateCollection.vue"
import PrepareBoxStep from "@/components/createbox/PrepareBoxStep"
import SuccessfullBoxStep from "@/components/createbox/SuccessfullBoxStep"

export default {
  data()  {
    return {
      step: 1
    }
  },
  components: {
    CreateCollection,
    PrepareBoxStep,
    SuccessfullBoxStep
  },
  created() {
    if (this.$route.params.createboxstep) {
      this.step = parseInt(this.$route.params.createboxstep)
    }
  },
  methods: {
    changeStep(step) {
      this.step = step
	  if (process.browser) {
		window.scrollTo(0, 0)
	  }
    },
    moveStep(step, type) {
      if (step < 4) {
		this.changeStep(step)
		this.$router.push(`/createbox/${step}`)
	  } else {
		const collectionAddress = this.$route.query.collectionAddress
		const collectionQuery = collectionAddress ? `?collectionAddress=${collectionAddress}` : ''
		this.$router.push(`/createnft${collectionQuery}`)
	  }
    }
  }
}
</script>
