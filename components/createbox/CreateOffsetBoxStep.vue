<template>
    <div class="createnft-step">
        <div class="createnft-step-substeps">
            <p class="createnft-step-substeps-step" :class="{ active: step === 1, checked: step === 2 }">
				<span v-if="step === 1">1</span>
				<img class="createnft-step-substeps-step-checked" src="/check-white.svg" v-else>
			</p>
            <p class="createnft-step-substeps-step" :class="{ active: step === 2 }">2</p>
        </div>
		<AddNft @changeBoxStep="changeStep" :rarity="rarity" v-if="step === 1"/>
		<BoxSale @onPrevStep="step = 1" @onComplete="completeStep" v-if="step === 2"/>
    </div>
</template>

<script>
import AddNft from './step2/AddNft'
import BoxSale from './step2/BoxSale'

export default {
  props: ['rarity'],
  data() {
	return {
	  step: 1
	}
  },
  components: {
	AddNft,
	BoxSale
  },
  methods: {
	changeStep(step) {
	  this.step = step
	},
	completeStep() {
	  this.$emit('completeBox')
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
