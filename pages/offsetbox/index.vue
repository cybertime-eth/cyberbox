<template>
    <section id="offsetbox">
        <div class="offsetbox">
			<div class="offsetbox__popular" v-if="popularBox">
				<div class="offsetbox__popular-coverbox">
					<img class="offsetbox__popular-cover" :src="popularBox.boxCoverImage">
				</div>
				<img class="offsetbox__popular-img" :src="popularBox.boxImage">
				<div class="offsetbox__popular-info">
					<h2 class="offsetbox__popular-title">{{ popularBox.boxName }}</h2>
					<p class="offsetbox__popular-desc">Offset Box by CyberBox</p>
					<!-- <p class="offsetbox__popular-sale">PRE-SALE</p>
					<p class="offsetbox__popular-time">1d 47h 23min</p> -->
				</div>
			</div>
			<div class="offsetbox__content" :class="{ empty: !popularBox }">
				<div class="offsetbox__content-block">
					<p class="offsetbox__content-block-name">Discover drops</p>
				</div>
				<div class="offsetbox__content-list">
					<div class="offsetbox__content-list-card" @click="showBoxDetail(box)" :key="idx" v-for="(box, idx) of boxList">
						<img class="offsetbox__content-list-card-cover" :src="box.boxCoverImage">
						<div class="offsetbox__content-list-card-logoblock">
							<p class="offsetbox__content-list-card-logoblock-title">CyberBox</p>
							<img class="offsetbox__content-list-card-logoblock-img" :src="box.boxImage">
						</div>
						<div class="offsetbox__content-list-card-info">
						  <p class="offsetbox__content-list-card-info-name">{{ box.boxName }}</p>
						  <div class="offsetbox__content-list-card-info-sale">
							  <p class="offsetbox__content-list-card-info-name status public">PUBLIC SALE</p>
							  <!-- <p class="offsetbox__content-list-card-info-sale-time">08:00 pm, 1 oct.</p> -->
						  </div>
						</div>
					</div>
				</div>
			</div>
        </div>
    </section>
</template>


<script>
export default {
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
	margin-top: 7rem;
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
		position: relative;
		height: 28.5rem;
		border-radius: 0.8rem;
		cursor: pointer;
		&-cover {
		  position: absolute;
		  left: 0;
		  top: 0;
		  width: 100%;
		  height: 100%;
		  border-radius: 0.8rem;
		}
		&-logoblock {
		  display: flex;
		  align-items: center;
		  position: absolute;
		  top: 1.6rem;
		  right: 0.8rem;
		  &-title {
			background: rgba(31, 41, 55, 0.25);
			padding: 0.4rem 0.8rem;
			margin-right: 0.8rem;
			border-radius: 2.6rem;
			font-family: OpenSans-SemiBold;
			font-weight: 600;
			font-size: 1.4rem;
			color: $white;
		  } 
		  &-img {
			width: 4.5rem;
			height: 4.5rem;
			border-radius: 50%;
		  }
		}
		&-info {
		  display: flex;
		  justify-content: space-between;
		  position: absolute;
		  left: 0;
		  right: 0;
		  bottom: 0;
		  height: 7.1rem;
		  background: linear-gradient(180deg, rgba(44, 44, 44, 0.31) 0%, rgba(0, 0, 0, 0.4) 100%);
		  backdrop-filter: blur(2.5px);
		  padding: 1.2rem 1.6rem;
		  border-radius: 0 0 0.8rem 0.8rem;
		  &-name {
			font-family: OpenSans-Bold;
			font-weight: 700;
			font-size: 1.8rem;
			color: $white;
			&.public {
			  color: $green;
			}
		  }
		  &-sale {
			text-align: right;
			&-time {
			  background: rgba(0, 0, 0, 0.38);
			  margin-top: 0.8rem;
			  padding: 0.4rem 0.8rem;
			  border-radius: 0.4rem;
			  font-family: OpenSans-SemiBold;
			  font-weight: 600;
			  font-size: 1.4rem;
			  color: $white;
			}
		  }
		}
	  }
	}
  }

  @media (max-width: 460px) {
	max-width: none;
	padding: 0 0 4rem;
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
	  margin-top: 2.4rem;
	  padding: 0 0.8rem;
	  &-block {
		&-name {
		  font-size: 1.6rem;
		}
	  }
	  &-list {
		display: block;
		&-card {
		  height: 20.4rem;
		  margin-top: 1.6rem;
		  &:first-child {
			margin: 0;
		  }
		  &-logoblock {
			&-title {
			  font-size: 1rem;
			}
			&-img {
			  width: 2.8rem;
			  height: 2.8rem;
			}
		  }
		  &-info {
			height: 6.4rem;
			padding: 1.2rem 0.8rem;
			&-name {
			  font-size: 1.6rem;
			  &.status {
				font-size: 1.4rem;
			  }
			}
		  }
		}
	  }
	}
  }
}
</style>

