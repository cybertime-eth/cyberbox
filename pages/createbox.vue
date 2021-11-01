<template>
  <section class="create-box">
    <div class="container-xl">
      <Navigation :step="step" />
      <CreateBoxStep v-if="step === 1" @changeStep="changeStep"/>
      <AddLoginStep v-if="step === 2" @routeBack="changeStep"/>
    </div>
    <LaunchStep v-if="step === 3" @changeStep="changeStep"/>
  </section>
</template>
<script>
import Navigation from "../components/createbox/Navigation";
import CreateBoxStep from "../components/createbox/CreateBoxStep";
import AddLoginStep from "../components/createbox/AddLogicStep";
import LaunchStep from "../components/createbox/LaunchStep";
export default {
  data() {
    return {
      step: 1,
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
    Navigation,
    CreateBoxStep,
    AddLoginStep,
    LaunchStep
  }
}
</script>
<style lang="scss">
.create-box {
}
</style>
