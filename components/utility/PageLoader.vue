<template>
  <div class="page__loader">
	<div class="page__loader-container">
		<img class="page__loader-img" :src="getCDNImage('loading_page_anim.webp')" alt="loading">
    	<p class="page__loader-info gradient-text">{{ description }}</p>
	</div>
  </div>
</template>

<script>

const LOADING_INFO_FIRST  = 'Preparing NFTs'
const LOADING_INFO_SECOND = 'Offseting carbon'
const LOADING_INFO_THIRD  = 'Regenerate nature'

export default {
  data() {
    return {
      description: LOADING_INFO_FIRST,
      timerClocks: 0,
      intervalTimer: null
    }
  },
  created() {
    this.intervalTimer = setInterval(this.updateLoadingInfo, 1500)
  },
  beforeDestroy() {
    if (this.intervalTimer) {
      clearInterval(this.intervalTimer)
    }
  },
  methods: {
    updateLoadingInfo() {
      const infoArr = [LOADING_INFO_FIRST, LOADING_INFO_SECOND, LOADING_INFO_THIRD]
      this.timerClocks = this.timerClocks + 1
      this.description = infoArr[this.timerClocks % 3]
    }
  }
}
</script>

<style lang="scss" scoped>
.page__loader {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: $white;
  z-index: 1;
  &-container {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	text-align: center;
  }
  &-img {
	width: 20rem;
  }
  &-info {
	background: linear-gradient(to right, #5578F5, #D676CF, #E092BD, #FFE884);
	-webkit-background-clip: text;
    font-weight: 600;
    font-size: 1.2rem;
  }
}
</style>
