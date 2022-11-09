<template>
    <section class="createnft-step">
        <div class="createnft-step-second" v-if="step === 2">
            <div class="createnft-step-substeps">
                <p class="createnft-step-substeps-step checked">
                    <img class="createnft-step-substeps-step-checked" src="/check-white.svg">
                </p>
                <p class="createnft-step-substeps-step active">2</p>
            </div>
            <BoxSale @onPrevStep="moveToPrevStep" @onComplete="completeCreatingStep"/>
        </div>
        <PrepareBoxStep @changeStep="moveStep" v-if="step === 3"/>
        <SuccessfullBoxStep v-if="step === 4"/>
    </section>
</template>

<script>

import BoxSale from "@/components/createnft/BoxSale"
import PrepareBoxStep from "@/components/createbox/PrepareBoxStep"
import SuccessfullBoxStep from "@/components/createbox/SuccessfullBoxStep"

export default {
  data() {
    return {
      step: 2
    }
  },
  components: {
    BoxSale,
    PrepareBoxStep,
    SuccessfullBoxStep
  },
  created() {
    if (this.$route.params.createnftstep) {
      this.step = parseInt(this.$route.params.createnftstep)
    }
  },
  methods: {
    moveToPrevStep() {
      this.$router.go(-1)
    },
    completeCreatingStep() {
      this.$store.dispatch('createCyberNftBox')
      this.step = 3
      history.replaceState(null, 'Prepare Creating Offset Box', '/createnft/3')
    },
    moveStep(step) {
      this.$router.push(`/createnft/${step}`)
    }
  }
}
</script>

<style lang="scss" scoped>

.createnft-step {
  padding: 3.2rem 0;
  &-substeps {
	display: flex;
	width: fit-content;
	margin: 0 auto;
	&-step {
	  width: 2.4rem;
	  height: 2.4rem;
	  border: 2px solid $border2;
	  border-radius: 50%;
	  text-align: center;
	  line-height: 2.4rem;
	  font-size: 1.2rem;
	  color: $border2;
	  position: relative;
	  &:first-child {
		margin-right: 15rem;
		&::after {
		  content: "";
		  position: absolute;
		  top: 50%;
		  left: calc(100% + 2px);
		  width: 15rem;
		  height: 2px;
		  background: $border2;
		  z-index: -1;
		}
		&.checked {
			background: $pink;
			border: 2px solid transparent;
		  &::after {
			background: $pink;
		  }
		}
	  }
	  &-icon {
		width: 1.2rem;
	  }
	  &.active {
		border-color: $pink;
		color: $pink;
	  }
	}
  }
}

</style>
