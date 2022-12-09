<template>
    <section id="box">
        <div class="box">
            <div class="box__cover">
                <img class="box__cover-img" :src="boxInfo.boxCoverImage">
                <h2 class="box__cover-title">{{ boxInfo.boxName }}</h2>
                <p class="box__cover-desc">Offset Box by {{ boxInfo.boxAutorTitle }}</p>
            </div>
            <div class="box__info">
                <img class="box__info-img" :src="boxInfo.boxImage">
                <div class="box__info-sale">
                    <div class="box__info-sale-price">
                        <img class="box__info-sale-price-img" src="/celo.svg">
                        <p class="box__info-sale-price-celo">{{ boxPrice.toFixed(1) }}</p>
                        <p class="box__info-sale-price-dollar">(${{ boxDollarPrice }})</p>
                    </div>
                    <p class="box__info-sale-count">{{ remainedBoxCount }}/{{ totalBoxCount }} boxes left</p>
                    <div class="box__info-sale-purchase">
                        <div class="box__info-sale-purchase-change">
                            <button class="box__info-sale-purchase-change-btn" :class="{ disabled: mintAmount === 1 }" @click="decreaseAmount">-</button>
                            <p class="box__info-sale-purchase-change-amount">{{ mintAmount }}</p>
                            <button class="box__info-sale-purchase-change-btn" :class="{ disabled: mintAmount === remainedBoxCount }" @click="increaseAmount">+</button>
                        </div>
                        <button class="box__info-sale-purchase-buy" :class="{ disabled: remainedBoxCount === 0 || !mintEnabled }" @click="buyRandomNft">Buy</button>
                    </div>
                </div>
            </div>
            <div class="box__detail">
                <div class="box__contents" v-if="boxNfts.length > 0">
                    <p class="box__contents-name">Box contents</p>
					<div class="box__contents-splide splide" ref="slider">
						<div class="splide__track">
							<div class="box__contents-nfts splide__list">
								<div class="box__contents-nfts-nft splide__slide" :key="idx" v-for="(boxNft, idx) of boxNfts">
									<img class="box__contents-nfts-nft-img" :src="boxNft.linkedImage">
									<div class="box__contents-nfts-nft-info">
										<p class="box__contents-nfts-nft-name">{{ boxNft.imageName }}</p>
										<div class="box__contents-nfts-nft-type">
											<img class="box__contents-nfts-nft-type-img" :src="boxNftTypeIcon(boxNft)" v-if="boxNftTypeIcon(boxNft)">
											<p class="box__contents-nfts-nft-type-name" :class="{ [boxNftType(boxNft)]: true }">{{ boxNftType(boxNft) }}</p>
											<p class="box__contents-nfts-nft-type-count">x{{ boxNft.imageCount }}</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
                </div>
                <div class="box__detail-info" v-if="collectionInfo.collectionDesc || boxInfo.boxAutor">
                    <div class="box__detail-info-block">
                        <p class="box__detail-info-block-name">About collection</p>
                        <p class="box__detail-info-block-content" v-html="collectionInfo.collectionDesc"></p>
                    </div>
                    <div class="box__detail-info-block">
                        <p class="box__detail-info-block-name">About creator</p>
                        <p class="box__detail-info-block-content" v-html="boxInfo.boxAutor"></p>
                    </div>
                </div>
            </div>
        </div>
        <SuccessfullBuy :name="boxInfo.boxName" :image="boxInfo.boxImage" :randomNft="true" v-if="successMintRandomNft === true"/>
    </section>
</template>

<script>

import Splide from '@splidejs/splide'
import SuccessfullBuy from '@/components/modals/successBuy'

const BOX_NFT_TYPE_LEGENDARY = 'legendary'
const BOX_NFT_TYPE_EPIC = 'epic'
const BOX_NFT_TYPE_RARE = 'rare'
const BOX_NFT_TYPE_COMMON = 'common'

export default {
  data() {
    return {
      boxInfo: {},
      boxNfts: [],
      collectionInfo: {},
      boxAddress: null,
	  celoPrice: 0,
	  mintAmount: 1,
	  oldReaminedNftCount: 0,
	  mintEnabled: true
    }
  },
  components: {
    SuccessfullBuy
  },
  computed: {
    boxList() {
      return this.$store.state.offsetBoxList
    },
    totalBoxCount() {
      const legendaryNftCount = this.boxInfo.legendary_count || 0
      const epicNftCount = this.boxInfo.epic_count || 0
      const rareNftCount = this.boxInfo.rare_count || 0
      const commonNftCount = this.boxInfo.common_count || 0
      return (legendaryNftCount + epicNftCount + rareNftCount + commonNftCount)
    },
    remainedBoxCount() {
      return (this.totalBoxCount && this.boxInfo.mint_count !== undefined) ? (this.totalBoxCount - this.boxInfo.mint_count) : 0
	},
	boxPrice() {
	  const price = (this.boxInfo && this.boxInfo.nftPrice) ? this.boxInfo.nftPrice / 1000 : 0
	  return price * this.mintAmount
	},
    boxDollarPrice() {
      const price = this.boxPrice * this.celoPrice
      return price.toFixed(2)
	},
	successMintRandomNft() {
	  return this.$store.state.successMintRandomNft
	}
  },
  async created() {
	this.$store.commit('changeSuccessMintRandomNft', false)
    const tokenPrice = await this.$store.dispatch('getPriceToken')
    this.celoPrice = tokenPrice.value
	this.boxAddress = this.$route.params.offsetboxid
	this.$store.commit('changeFetchingOwnedBox', false)
    if (this.boxAddress) {
      this.loadBoxInfo()
      if (this.boxList.length === 0 || !this.boxInfo.boxAddress) {
        this.$store.dispatch('getOffsetBoxList', this.boxAddress)
      }
    }
  },
  watch: {
    boxList() {
      if (this.$store.state.offsetBoxList.length > 0 && !this.boxInfo.boxAddress) {
        this.loadBoxInfo()
      }
	},
	boxNfts(newVal) {
	  if (newVal.length > 0) {
		this.showSplide()
	  }
	},
	successMintRandomNft() {
	  const success = this.$store.state.successMintRandomNft
	  if (success !== undefined) {
		if (success === true) {
		  this.loadBoxInfo()
		} else {
		  this.mintEnabled = true
		}
	  }
	}
  },
  methods: {
    async loadBoxInfo() {
	  this.boxInfo = this.boxList.find(box => box.boxAddress === this.boxAddress) || {}
	  if (this.mintEnabled) {
		if (this.boxInfo.linkedCollectionAddress) {
		  const collectionList = await this.$store.dispatch('getBoxCollectionList', this.boxInfo.linkedCollectionAddress)
		  if (collectionList.length > 0) {
			this.collectionInfo = collectionList[0]
		  }
		}
		this.boxNfts = await this.$store.dispatch('getBoxImageList', this.boxAddress)
	  } else if (this.successMintRandomNft) {
		this.mintEnabled = true
	  }
	},
	showSplide() {
	  setTimeout(() => new Splide('.splide', {
		rewind: true,
		perPage: !this.isMobile() ? 4 : 3,
		gap: !this.isMobile() ? '2.4rem' : '1rem',
		pagination: false,
		arrows: false
	  }).mount({}))
	},
    boxNftType(boxNft) {
	  switch(boxNft.rnType) {
		case 0: return BOX_NFT_TYPE_LEGENDARY
		case 1: return BOX_NFT_TYPE_EPIC
		case 2: return BOX_NFT_TYPE_RARE
		case 3: return BOX_NFT_TYPE_COMMON
		default: return 'unknown'
	  }
    },
    boxNftTypeIcon(boxNft) {
      const type = this.boxNftType(boxNft)
      switch (type) {
        case BOX_NFT_TYPE_LEGENDARY: return '/diamond-filled.svg'
        case BOX_NFT_TYPE_EPIC: return '/fire-filled.svg'
        case BOX_NFT_TYPE_RARE: return '/snow-filled.svg'
        default: return null
      }
    },
    boxNftCount(boxNft) {
      const type = this.boxNftType(boxNft)
      switch (type) {
        case BOX_NFT_TYPE_LEGENDARY: return boxNft.legendary_count
        case BOX_NFT_TYPE_EPIC: return boxNft.epic_count
        case BOX_NFT_TYPE_RARE: return boxNft.rare_count
        case BOX_NFT_TYPE_COMMON: return boxNft.common_count
        default: return 0
      }
	},
	decreaseAmount() {
	  if (this.mintAmount > 1) {
		this.mintAmount = this.mintAmount - 1
	  }
	},
	increaseAmount() {
	  if (this.mintAmount < this.remainedBoxCount) {
		this.mintAmount = this.mintAmount + 1
	  }
	},
	buyRandomNft() {
	  this.mintEnabled = false
	  this.oldReaminedNftCount = this.remainedBoxCount
	  this.$store.dispatch('mintBoxNft', {
		...this.boxInfo,
		mintCount: this.mintAmount
	  })
	}
  }
}
</script>

<style lang="scss" scoped>

.box {
  width: 100%;
  &__cover {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 436px;
    * {
      position: static;
      z-index: 1;
    }
    &-img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
    }
    &-title {
      text-transform: uppercase;
      font-family: Cabin-Bold;
      font-weight: 700;
      font-size: 5rem;
      color: $white;
    }
    &-desc {
	  max-width: 40rem;
	  white-space: nowrap;
	  overflow: hidden;
	  text-overflow: ellipsis;
      margin-top: 1rem;
      font-family: OpenSans-SemiBold;
      font-weight: 600;
      font-size: 2rem;
      color: $white;
    }
  }

  &__info {
    display: flex;
    align-items: center;
    width: fit-content;
    background: $white;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
    border-radius: 2.5rem;
    padding: 3.2rem 4.5rem 3.2rem 1.6rem;
    margin: 0 auto;
    transform: translateY(-3.2rem);
    &-img {
      max-width: 28.9rem;
      margin-right: 3.6rem;
    }
    &-sale {
      &-price {
        display: flex;
        align-items: center;
        &-img {
          width: 2rem;
          margin-right: 0.6rem;
        }
        &-celo {
          margin-right: 0.4rem;
          line-height: 1;
          font-family: OpenSans-Bold;
          font-weight: 700;
          font-size: 3.2rem;
        }
        &-dollar {
          font-size: 1.4rem;
          color: $border;
        }
      }
      &-count {
        margin-top: 3.2rem;
        font-size: 1.4rem;
        color: $border;
      }
      &-purchase {
        display: flex;
        align-items: center;
        margin-top: 2rem;
        &-change {
          display: flex;
          align-items: center;
          margin-right: 2.4rem;
          &-btn {
            width: 2.8rem;
            height: 2.8rem;
            background: $white;
            border: 1px solid $textColor;
            border-radius: 0.4rem;
            &.disabled {
              pointer-events: none;
              border-color: $border2;
              color: $border2;
            }
          }
          &-amount {
            width: 2.4rem;
            margin: 0 0.8rem;
            text-align: center;
            font-family: OpenSans-SemiBold;
            font-weight: 600;
            font-size: 1.8rem;
          }
        }
        &-buy {
          width: 14.2rem;
          height: 3.6rem;
          background: linear-gradient(90deg, #365BE0 -14.25%, #D676CF 48.65%, #FFE884 109.5%);
          border-radius: 2.5rem;
          text-align: center;
          font-family: OpenSans-SemiBold;
          font-weight: 600;
          font-size: 1.4rem;
          color: $white;
		  &.disabled {
			pointer-events: none;
			background: $white;
			border: 1px solid $border;
			color: $border;
		  }
        }
      }
    }
  }

  &__contents {
    padding-bottom: 5.3rem;
    &-name {
      font-family: OpenSans-SemiBold;
      font-weight: 600;
      font-size: 1.8rem;
    }
	&-splide {
	  margin-top: 2rem;
	}
    &-nfts {
      &-nft {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: $white;
		margin-bottom: 1rem;
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
		transition: all 0.3s;
        border-radius: 0.4rem;
        &-img {
          width: 100%;
		  height: 31.2rem;
		  border-radius: 0.4rem 0.4rem 0 0;
        }
        &-info {
          padding: 2.5rem 0;
          text-align: center;
        }
        &-name {
          font-family: OpenSans-SemiBold;
          font-weight: 600;
          font-size: 1.6rem;
        }
        &-type {
          display: flex;
          align-items: center;
          background: $white;
          margin-top: 1.8rem;
          padding: 0.6rem 0.8rem;
          box-shadow: 0px 2px 5px rgba(28, 19, 39, 0.06);
          border-radius: 2.1rem;
          &-img {
            width: 1.2rem;
            margin-right: 0.4rem;
          }
          &-name {
            margin-right: 0.4rem;
            text-transform: capitalize;
            font-family: OpenSans-Bold;
            font-weight: 700;
            font-size: 1.4rem;
            color: $border;
            &.legendary {
              color: $darkYellow;
            }
            &.epic {
              color: $darkPink;
            }
            &.rare {
              color: $lightBlue;
            }
          }
          &-count {
            font-family: OpenSans-Bold;
            font-weight: 700;
            font-size: 1.3rem;
          }
        }
      }
    }
  }
  &__detail {
    padding: 5.3rem 6rem 0;
    &-info {
      display: flex;
      justify-content: space-between;
      padding-bottom: 16.1rem;
      &-block {
		flex: 1;
        max-width: 42.6rem;
		&:last-child {
		  max-width: 62.8rem;
		}
        &-name {
          font-family: OpenSans-SemiBold;
          font-weight: 600;
          font-size: 1.8rem;
        }
        &-content {
          margin-top: 2.5rem;
          font-size: 1.4rem;
        }
      }
    }
  }

  @media (max-width: 460px) {
	&__cover {
	  height: 16rem;
	  &-title {
		font-size: 3.2rem;
	  }
	  &-desc {
		margin-top: 0.8rem;
		font-size: 1.4rem;
	  }
	}
	&__info {
	  display: block;
      width: calc(100% - 13.2rem);
      padding: 2.4rem 5.8rem;
      margin: 0 0.8rem;
	  border-radius: 1rem;
	  &-img {
		max-width: 18.8rem;
		margin: 0 auto;
	  }
	  &-sale {
		margin-top: 1.6rem;
		text-align: center;
		&-price {
		  width: fit-content;
		  margin: 0 auto;
		}
		&-count {
		  margin-top: 1.6rem;
		}
		&-purchase {
		  flex-direction: column;
    	  justify-content: center;
		  &-change {
			margin: 0;
		  }
		  &-buy {
			width: 18.8rem;
			margin-top: 2rem;
		  }
		}
	  }
	}
	&__detail {
	  padding: 1.3rem 0.9rem 4.5rem;
	}
	&__contents {
	  padding-bottom: 4.5rem;
	  &-nfts {
		&-nft {
		  &-img {
			height: 9rem;
		  }
		  &-info {
			padding: 0.6rem 0 1.2rem;
		  }
		  &-type {
			width: fit-content;
			margin: 0.8rem auto 0;
			padding: 0.5rem;
			&-img, &-name {
			  display: none;
			}
			&-count {
			  font-size: 0.8rem;
			}
		  }
		}
	  }
	}
	&__detail-info {
	  display: block;
	  padding: 0;
	  &-block {
		max-width: none;
		margin-top: 5.6rem;
		&:first-child {
		  margin: 0;
	    }
		&-content {
		  margin-top: 2.1rem;
		}
	  }
	}
  }
}
</style>

