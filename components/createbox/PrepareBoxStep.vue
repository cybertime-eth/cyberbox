<template>
    <div class="preparebox-step">
        <h2 class="preparebox-step-title">Preparing your Collection</h2>
        <p class="preparebox-step-subtitle">We are creating a page for your collection. Wait a bit <img :src="getCDNImage('plant.svg')"></p>
        <img class="preparebox-step-box" src="/createbox.svg">
        <div class="preparebox-step-progress">
            <div class="preparebox-step-progress-content" :style="progressStyle"></div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
	return {
	  progress: 1,
	  readyNextStep: false
	}
  },
  computed: {
	prepareDone() {
	  return this.$store.state.successCreateBoxCollection
	},
	progressStyle() {
	  return `width: ${this.progress}%`
	}
  },
  watch: {
	prepareDone() {
	  if (this.$store.state.successCreateBoxCollection) {
		this.progress = 100
		this.$emit('changeStep', 3)
		this.readyNextStep = true
		setTimeout(() => this.$emit('changeStep', 3), 2000)
	  }
	}
  },
  mounted() {
    setTimeout(() => {
	  if (this.progress < 50) {
		this.progress = 50
	  }
	}, 5000)
  }
}
</script>

<style lang="scss" scoped>
.preparebox-step {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 53.6rem;
  margin: 7.3rem auto;
  padding: 3.2rem 4.5rem;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
  border-radius: 0.9rem;
  &-title {
    line-height: 1;
    font-family: Cabin-Bold;
    font-weight: 700;
    font-size: 3.2rem;
  }
  &-subtitle {
    margin-top: 1.8rem;
    font-size: 1.6rem;
    color: $grayDark;
  }
  &-box {
    width: 36.4rem;
    margin-top: 3.4rem;
  }
  &-progress {
    width: 35rem;
    height: 2px;
    position: relative;
    background: #FDE5FF;
    &-content {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      background: linear-gradient(90deg, #365BE0 -14.25%, #D676CF 48.65%, #FFE884 109.5%);
	  transition: all 0.5s;
    }
  }
}
</style>
