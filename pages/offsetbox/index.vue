<template>
    <section id="offsetbox">
        <div class="offsetbox">
			<!-- <div class="offsetbox__popular" v-if="popularBox">
				<div class="offsetbox__popular-coverbox">
					<img class="offsetbox__popular-cover" :src="popularBox.boxCoverImage">
				</div>
				<img class="offsetbox__popular-img" :src="popularBox.boxImage">
				<div class="offsetbox__popular-info">
					<h2 class="offsetbox__popular-title">{{ popularBox.boxName }}</h2>
					<p class="offsetbox__popular-desc">Offset Box by CyberBox</p>
					<p class="offsetbox__popular-sale">PRE-SALE</p>
					<p class="offsetbox__popular-time">1d 47h 23min</p>
				</div>
			</div> -->
			<div class="offsetbox__content" :class="{ empty: !popularBox }">
				<div class="offsetbox__content-block">
					<p class="offsetbox__content-block-name">Discover boxes</p>
				</div>
				<div class="offsetbox__content-list">
					<box :box="box" @click="showBoxDetail(box)" :key="idx" v-for="(box, idx) of boxList"/>
				</div>
			</div>
        </div>
    </section>
</template>


<script>

import box from '@/components/box.vue'

export default {
  components: {
	box
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    boxList() {
      return this.$store.state.offsetBoxList
    },
	popularBox() {
	  return this.boxList.length > 0 ? this.boxList[this.boxList.length - 1] : null
	}
  },
  created() {
	this.fetchBoxList()
  },
  methods: {
    async fetchBoxList() {
			this.loading = true
			this.$store.commit('changeFetchingOwnedBox', false)
      await this.$store.dispatch('getOffsetBoxList')
      this.loading = false
	},
	showBoxDetail(box) {
	  this.$router.push(`/offsetbox/${box.boxAddress}`)
	}
  }
}
</script>

<style lang="scss" scoped>
.offsetbox {
	max-width: 144rem;
	min-height: 40rem;
  margin: 0 auto;
  padding: 7.2rem 6rem;
  &__popular {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 8.5rem;
	position: relative;
	* {
	  position: static;
	  z-index: 1;
	}
	&-coverbox {
	  position: absolute;
	  left: 0;
	  top: 0;
	  bottom: 0;
	  width: 100%;
	}
	&-cover {
	  width: 100%;
	  height: 100%;
	}
	&-img {
	  position: absolute;
	  width: 4.5rem;
	  height: 4.5rem;
	  top: 1.6rem;
	  right: 0.8rem;
	  border-radius: 50%;
	}
	&-info {
	  margin: 0 auto;
	  text-align: center;
	}
	&-title {
	  font-family: Cabin-Bold;
	  font-weight: 700;
	  font-size: 5rem;
	  text-transform: uppercase;
	  color: $white;
	}
	&-desc {
	  margin-top: 1rem;
	  font-family: OpenSans-SemiBold;
	  font-weight: 600;
	  font-size: 2rem;
	  color: $white;
	}
	&-sale {
	  margin-top: 4rem;
	  font-family: OpenSans-Bold;
	  font-weight: 700;
	  font-size: 1.6rem;
	  color: $darkYellow2;
	}
	&-time {
	  background: rgba(71, 57, 72, 0.38);
	  padding: 0.4rem 0.8rem;
	  margin-top: 1.2rem;
	  border-radius: 0.4rem;
	  font-family: OpenSans-SemiBold;
	  font-weight: 600;
	  font-size: 1.8rem;
	  color: $white;
	}
  }
  &__content {
	// margin-top: 7rem;
	&.empty {
	  margin: 0;
	}
	&-block {
	  display: flex;
	  align-items: center;
	  justify-content: space-between;
	  &-name {
		font-family: OpenSans-SemiBold;
		font-weight: 600;
		font-size: 2.2rem;
	  }
	}
	&-list {
	  display: grid;
	  grid-template-columns: repeat(3, 1fr);
	  grid-column-gap: 2.4rem;
	  grid-row-gap: 2.4rem;
	  margin-top: 3.2rem;
	  &-card {
		
	  }
	}
  }

  @media (max-width: 460px) {
	max-width: none;
	padding: 2.4rem 0 4rem;
	&__popular {
	  padding-top: 2.2rem;
	  padding-bottom: 3rem;
	  &-img {
		width: 2.8rem;
		height: 2.8rem;
		top: 0.8rem;
	  }
	  &-info {
		width: 100%;
	  }
	  &-title {
		white-space: nowrap;
		font-family: OpenSans-Bold;
		font-weight: 700;
		font-size: 1.8rem;
	  }
	  &-desc {
		white-space: nowrap;
		font-size: 1.4rem;
	  }
	}
	&__content {
	//   margin-top: 2.4rem;
	  padding: 0 0.8rem;
	  &-block {
		&-name {
		  font-size: 1.6rem;
		}
	  }
	  &-list {
		display: block;
	  }
	}
  }
}
</style>

