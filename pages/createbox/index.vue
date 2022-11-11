<template>
	<section class="createbox">
		<div class="createbox__emptybox">
            <h2 class="createbox__emptybox-title">Create on Cyberbox</h2>
            <div class="createbox__emptybox-create" @click="clickCreate">
                <button class="createbox__emptybox-create-add gradient-border-button">
                    <img class="createbox__emptybox-create-add-icon" src="/plus.svg">
                </button>
                <p class="createbox__emptybox-create-collection">Create New Collection</p>
            </div>
        </div>
		<div class="createbox__list">
			<div class="createbox__list-item" :key="idx" v-for="(collection, idx) of boxList" @click="showCollection(collection)">
				<img class="createbox__list-item-logo" :src="collection.collectionLogo">
				<p class="createbox__list-item-name">{{ collection.collectionName }}</p>
			</div>
		</div>
  </section>
</template>

<script>

export default {
  data() {
    return {
	  step: 1,
	  collectionType: 1,
      showCreateContent: false
    }
  },
  computed: {
	boxList() {
	  return this.$store.state.boxCollectionList
	}
  },
  mounted() {
	this.$store.dispatch('getBoxCollectionList')
  },
  methods: {
    clickCreate() {
			if (!this.$store.state.address) {
				alert('Please Connect Wallet!')
				return
			}
      this.$router.push('/createbox/1')
	},
	showCollection(collection) {
	  this.$store.commit('setBoxCollection', null)
	  this.$router.push(`/boxcollection/${collection.collectionAddress}`)
	}
  }
}
</script>

<style lang="scss">

.createbox {
  padding-top: 17.1rem;
  padding-bottom: 0.4rem;
  font-family: OpenSans-Regular;
  &__emptybox {
    width: fit-content;
    margin: 0 auto;
	&-title {
	  font-family: Cabin-Bold;
	  font-weight: 700;
	  font-size: 5rem;
	  line-height: 1;
	  color: $grayDark;
	}
	&-create {
	  display: flex;
	  align-items: center;
	  background: $white;
	  box-shadow: 0px 0.4rem 1.2rem rgba(0, 0, 0, 0.05);
	  border-radius: 0.8rem;
	  padding: 1.6rem;
	  margin-top: 4.8rem;
	  cursor: pointer;
	  &-add {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 5.6rem;
		height: 5.6rem;
		margin-right: 2.4rem;
		&-icon {
		  width: 1.4rem;
		}
	  }
	  &-collection {
		font-weight: 600;
		font-size: 1.8rem;
		line-height: 1;
		color: $grayDark;
	  }
	}
  }

  &__list {
	width: 42.4rem;
	margin: 2.4rem auto;
	&-item {
	  display: flex;
	  align-items: center;
	  background: $white;
	  padding: 1.6rem;
	  margin-top: 2.6rem;
	  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
	  border-radius: 0.8rem;
	  cursor: pointer;
	  &:first-child {
		margin: 0;
	  }
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
