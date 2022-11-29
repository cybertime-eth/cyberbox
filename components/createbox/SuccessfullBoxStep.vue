<template>
    <div class="successfull-box-step">
        <h2 class="successfull-box-step-title">Successfully created</h2>
        <p class="successfull-box-step-subtitle">Congratulations! The page for your {{ successTitle }} has been successfully created</p>
        <div class="successfull-box-step-animation">
        </div>
        <div class="successfull-box-step-buttons" v-if="collectionMode">
            <button class="successfull-box-step-buttons-button" @click="showBoxCollection">View your collection</button>
            <button class="successfull-box-step-buttons-button" @click="createOffsetBox">Create Offset box</button>
        </div>
		<button class="successfull-box-step-done" @click="showOffsetBox" v-else>Excellent! I'm glad</button>
    </div>
</template>

<script>
export default {
  props: ['collectionMode'],
  computed: {
	successTitle() {
	  return this.collectionMode ? 'collection' : 'Offset Box'
	}
  },
  methods: {
    showBoxCollection() {
      const currCollection = this.$store.state.boxCollectionList.at(-1)
      if (currCollection) {
        this.$router.push(`/boxcollection/${currCollection.collectionAddress}`)
      }
    },
    createOffsetBox() {
      this.$emit('changeStep', 4)
	},
	showOffsetBox() {
	  this.$router.push('/offsetbox')
	}
  }
}
</script>

<style lang="scss" scoped>
.successfull-box-step {
  width: 51.4rem;
  margin: 11rem auto;
  padding: 3.2rem 1.6rem 1.6rem;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
  border-radius: 0.9rem;
  &-title {
    line-height: 1;
    text-align: center;
    font-family: Cabin-Bold;
    font-weight: 700;
    font-size: 3.2rem;
  }
  &-subtitle {
    margin-top: 1.8rem;
    text-align: center;
    font-size: 1.6rem;
    color: $grayDark;
  }
  &-animation {
    width: 22rem;
    height: 22rem;
    margin-top: 4.4rem;
  }
  &-buttons {
    display: flex;
    margin-top: 6rem;
    &-button {
      flex: 1;
      width: 23.6rem;
      height: 4.8rem;
      background: $white;
      margin-right: 1rem;
      text-align: center;
      line-height: 4.8rem;
      border: 1px solid $black;
      border-radius: 2.5rem;
      font-family: OpenSans-Medium;
      font-weight: 600;
      font-size: 1.4rem;
      color: $black;
      &:last-child {
        background: $pink;
        margin: 0;
        border-color: $pink;
        color: $white;
      }
    }
  }
  &-done {
	display: block;
	width: 38.4rem;
	height: 5.2rem;
	background: $white;
	margin: 0 auto;
	border: 1px solid $pink;
	text-align: center;
	line-height: 5.2rem;
	font-weight: 600;
	font-size: 1.4rem;
	color: $pink;
  }

  @media (max-width: 460px) {
	width: calc(100% - 3.2rem);
	margin: 0;
	padding: 2.4rem 1.6rem;
	box-shadow: none;
	&-title {
	  font-family: OpenSans-SemiBold;
	  font-weight: 600;
	  font-size: 2.2rem;
	}
	&-subtitle {
	  margin-top: 0.8rem;
	  font-size: 1.4rem;
	}
	&-animation {
	  width: 100%;
	  height: 27.2rem;
	  margin-top: 4rem;
	}
	&-buttons {
	  flex-direction: column-reverse;
	  margin-top: 1rem;
	  &-button {
		flex: none;
		width: 100%;
		height: 3.6rem;
		line-height: 3.6rem;
		&:first-child {
		  margin-top: 0.8rem;
		}
	  }
	}
  }
}
</style>

