<template>
  <div class="createbox__container">
		<EmptyBox @changeSubStep="moveToCreateStep" v-if="subStep === 1"/>
		<CreateCollection v-if="subStep === 2" @create="moveToNextStep"/>
	</div>
</template>
<script>
import EmptyBox from './step1/EmptyBox.vue'
import CreateCollection from './step1/CreateCollection.vue'

export default {
  data() {
	return {
	  subStep: 1,
	  emptyCollection: true
	}
  },
  components: {
	EmptyBox,
	CreateCollection,
  },
  created() {
	if (process.client) {
	  const footerEl = document.querySelector('.footer')
	  footerEl.style.display = 'none'
	}
  },
  methods: {
	moveToCreateStep() {
	  this.subStep = 2
	},
    moveToNextStep() {
      this.$emit('changeStep', 2)
    }
  }
}
</script>
<style lang="scss">
</style>
