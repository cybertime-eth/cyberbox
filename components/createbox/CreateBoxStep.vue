<template>
  <div class="createbox__container">
		<EmptyBox @changeSubStep="moveToCreateStep" v-if="subStep === 1"/>
		<div class="createbox__list" v-if="subStep === 1">
			<div class="createbox__list-item" :key="idx" v-for="(collection, idx) of boxList" @click="showCollection(collection)">
				<img class="createbox__list-item-logo" :src="collection.logo">
				<p class="createbox__list-item-name">{{ collection.name }}</p>
			</div>
		</div>
		<CreateCollection @create="moveToNextStep" v-if="subStep === 2"/>
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
  computed: {
	boxList() {
	  return this.$store.state.boxCollectionList
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
	showCollection(collection) {
	  this.$router.push(`/boxcollection/${collection.id}`)
	},
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
.createbox {
  &__list {
	width: 42.4rem;
	margin: 2.4rem auto;
	&-item {
	  display: flex;
	  align-items: center;
	  background: $white;
	  padding: 1.6rem;
	  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
	  border-radius: 0.8rem;
	  cursor: pointer;
	  &-logo {
		width: 5.6rem;
		height: 5.6rem;
		margin-right: 2.4rem;
		border-radius: 0.6rem;
	  }
	  &-name {
		font-family: OpenSans-Medium;
		font-weight: 600;
		font-size: 1.8rem;
	  }
	}
  }	
}
</style>
