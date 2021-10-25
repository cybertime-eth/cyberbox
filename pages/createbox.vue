<template>
  <section class="create-box">
    <div class="container-xl">
      <Navigation />
      <Step1 />
    </div>
  </section>
</template>
<script>
import Navigation from "../components/createbox/Navigation";
import Step1 from "../components/createbox/Step1";
export default {
  data() {
    return {
      step: 1,
    }
  },
  components: {
    Navigation,
    Step1
  }
}
</script>
<style lang="scss">
.create-box {
}
</style>
