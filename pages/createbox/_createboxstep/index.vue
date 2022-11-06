<template>
    <section class="createbox-step">
        <CreateCollection v-if="step === 1" @create="changeStep(2)"/>
        <PrepareBoxStep v-if="step === 2" @changeStep="changeStep"/>
        <SuccessfullBoxStep v-if="step === 3" @changeStep="moveStep"/>
        <CollectionTypeStep v-if="step === 4" @changeStep="moveStep"/>
        <CreateOffsetBoxStep :rarity="collectionType === 1" @changeStep="changeStep" v-if="step === 5"/>
    </section>
</template>

<script>

import CreateCollection from "@/components/createbox/step1/CreateCollection.vue"
import PrepareBoxStep from "@/components/createbox/PrepareBoxStep"
import SuccessfullBoxStep from "@/components/createbox/SuccessfullBoxStep"
import CollectionTypeStep from "@/components/createbox/CollectionTypeStep"
import CreateOffsetBoxStep from "@/components/createbox/CreateOffsetBoxStep"

export default {
  data()  {
    return {
      step: 1,
      collectionType: 1
    }
  },
  components: {
    CreateCollection,
    PrepareBoxStep,
    SuccessfullBoxStep,
    CollectionTypeStep,
    CreateOffsetBoxStep
  },
  created() {
    if (this.$route.params.createboxstep) {
      this.step = parseInt(this.$route.params.createboxstep)
    }
    if (this.$route.query.type) {
      this.collectionType = parseInt(this.$route.query.type)
    }
  },
  methods: {
    changeStep(step, type) {
      this.step = step
      if (type) {
        this.collectionType = type
      }
      if (process.browser) {
        window.scrollTo(0, 0)
      }
    },
    moveStep(step, type) {
      this.changeStep(step, type)
      if (type) {
        this.$router.push(`/createbox/${step}?type=${type}`)
      } else {
        this.$router.push(`/createbox/${step}`)
      }
    }
  }
}
</script>
