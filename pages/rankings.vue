<template>
  <div class="rankings container-xl">
    <h1 class="rankings__title">NFT Ranking</h1>
    <h3 class="rankings__subtitle">With trading volume, floor price and etc., you can find the most trending NFTs here.</h3>
   <!-- <div class="rankings__navigation">
     <button class="rankings__navigation-button" :class="{'rankings__navigation-button-active': !filterMonthly}" @click="updateFilter(false)">7 Days</button>
     <button class="rankings__navigation-button" :class="{'rankings__navigation-button-active': filterMonthly}" @click="updateFilter(true)">30 Days</button>
   </div> -->
    <div class="rankings__table" :class="{empty: list.length === 0}">
      <div class="rankings__table-header">
        <div class="rankings__table-collection-group">
          <h3>#</h3>
          <h3>Collection</h3>
        </div>
        <div class="rankings__table-detail-group">
          <h3>Volume</h3>
          <h3>Items</h3>
          <h3>24h %</h3>
          <h3>7d %</h3>
          <h3>Floor Price</h3>
          <h3>Owners</h3>
        </div>
      </div>
      <div class="rankings__table-content">
        <div class="rankings__table-content-item" :key="idx" v-for="(item, idx) in list" @click="$router.push(`/collections/${item.route}`)">
          <div class="rankings__table-collection-group">
            <h3 class="rankings__table-content-item-number">{{ item.id }}</h3>
            <div class="rankings__table-content-item-collection">
              <div class="rankings__table-content-item-collection-image">
                <img :src="item.collectionImage" alt="item" class="rankings__table-content-item-collection-image-avatar">
                <img src="/confirmed.svg" alt="verify" class="rankings__table-content-item-collection-image-verify" v-if="item.verification">
                <div class="rankings__table-content-item-collection-image-new" v-if="item.new"></div>
                <h3 class="rankings__table-content-item-collection-image-new-active">New</h3>
              </div>
              <div class="rankings__table-content-item-collection-name-box">
                <h3 class="rankings__table-content-item-collection-name">{{ item.name }}</h3>
                <button class="rankings__table-content-item-more" @click="showNftDetail(idx, $event)">
                  <img :src="nftMoreIcon(idx)" class="rankings__table-content-item-more-image">
                  <span class="rankings__table-content-item-more-name">{{ nftMoreButtonName(idx) }}</span>
                </button>
              </div>
            </div>
          </div>
          <div class="rankings__table-detail-group">
            <div class="rankings__table-content-item-volume">
              <p class="rankings__table-content-item-volume-title"><img src="/celo.svg" alt="celo">{{ item.volumeCelo }}</p>
            </div>
            <h3 class="rankings__table-content-item-items">{{ item.items }}</h3>
            <h3 class="rankings__table-content-item-day rankings__table-content-item-percent-info" :class="{ positive: item.percentPer24h > 0, negative: item.percentPer24h < 0 }">{{ contractPercentInfo(item.percentPer24h) }}</h3>
            <h3 class="rankings__table-content-item-week  rankings__table-content-item-percent-info"  :class="{ positive: item.percentPer7d > 0, negative: item.percentPer7d < 0 }">{{ contractPercentInfo(item.percentPer7d) }}</h3>
            <div class="rankings__table-content-item-floor">
              <p class="rankings__table-content-item-floor-title">{{ item.floorPriceCelo }}</p>
            </div>
            <h3 class="rankings__table-content-item-owners">-</h3>
          </div>
          <div class="rankings__table-content-item-price-box">
            <h3 class="rankings__table-content-item-prices">{{ item.volumePrice }}</h3>
            <p class="rankings__table-content-item-percent" :class="{ negative: item.percentPer24h < 0 }">{{ item.percentPer24h }}%</p>
          </div>
          <div class="rankings__table-content-item-detail-box" v-if="item.expanded">
            <div class="rankings__table-content-item-detail-box-info">
              <p class="rankings__table-content-item-detail-box-info-title">Floor price</p>
              <h3 class="rankings__table-content-item-detail-box-info-content">{{ item.floorPrice }}</h3>
            </div>
            <div class="rankings__table-content-item-detail-box-info">
              <p class="rankings__table-content-item-detail-box-info-title">Items</p>
              <h3 class="rankings__table-content-item-detail-box-info-content">{{ item.shortenedItems }}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="rankings-no-result" v-show="!loading && list.length === 0">No results found</p>
  </div>
</template>
<script>
import _ from 'lodash';
export default {
  data() {
    return {
      loading: false,
      celoPrice: 1,
      list: [],
      filterMonthly: true
    }
  },
  async created() {
    if (process.browser) {
      localStorage.removeItem('move_back')
    }
    await this.renderlist();
  },
  methods: {
    nftMoreIcon(nftIndex) {
      if (!this.list[nftIndex].expanded) {
        return '/rankings/plus.svg';
      } else {
        return '/minus.svg';
      }
    },
    nftMoreButtonName(nftIndex) {
      if (!this.list[nftIndex].expanded) {
        return 'More';
      } else {
        return 'Less';
      }
    },
    contractPercentInfo(percentVal) {
      if (percentVal !== 0) {
        return `${percentVal}%`
      } else {
        return '-'
      }
    },
	formatPriceToString(price) {
		if (price && !isNaN(parseFloat(price.toString()))) {
		const priceVal = price * this.celoPrice
		return '$' + parseFloat(priceVal.toLocaleString('en-US')).toFixed(2)
		} else {
		return '-'
		}
	},
	async loadNftDetail(contract, idx) {
	  const floorPrice = await this.$store.dispatch('getFloorPrice', contract)
	  this.list[idx].floorPriceCelo = floorPrice
	  this.list[idx].floorPrice = this.formatPriceToString(floorPrice)
	  this.list[idx].volumePrice = this.formatPriceToString(this.list[idx].volumeCelo)
    this.list[idx].percentPer24h = await this.$store.dispatch('getContractInfoTimePercent', contract)
    this.list[idx].percentPer7d = await this.$store.dispatch('getContractInfoWeekPercent', contract)
	},
    async renderlist() {
      this.loading = true
      const tokenPrice = await this.$store.dispatch('getPriceToken')
      this.celoPrice = tokenPrice.value
      const result = await this.$store.dispatch('getCollectionInfo', true)
      const resultCount =  await this.$store.dispatch('getStatisticCountNft')
      let nftName = '';
      for (let [index, item] of result.entries()) {
		if (item.nftSymbol !== 'pxa') {
		  let volume = 0;
		  let price = resultCount[index] ? resultCount[index].price_total / 1000 : 0
      volume = volume + price
		  nftName = this.$store.state.collectionList.find(collection => collection.route === item.nftSymbol).name

		  this.list.push({
			id: index + 1,
			collectionImage: `/${item.title}.png`,
			verification: false,
			new: false,
			name: nftName,
			volumePrice: '-',
			volumeCelo: item.sell_total_price / 1000,
			statDay: volume / (item.sell_total_price / 1000) * 100,
			statWeek: 7,
			floorPrice: '-',
			floorPriceCelo: '-',
			owners: item.ownerCount,
			items: item.mint_count,
			shortenedItems: `${parseFloat((item.mint_count / 1000).toString()).toFixed(1)}K`,
      percentPer24h: 0,
      percentPer7d: 0,
			route: item.title
		  })
		  this.loadNftDetail(item.nftSymbol, index)
		}
      }
      this.loading = false
	},
	showNftDetail(nftIndex, e) {
      const newList = [...this.list]
      newList[nftIndex].expanded = !newList[nftIndex].expanded
      this.list = newList
      e.preventDefault()
      e.stopPropagation()
    },
    updateFilter(filterMonthly) {
      this.filterMonthly = filterMonthly
    }
  }
}
</script>
<style lang="scss">
.rankings {
  padding-top: 2.6rem;
  &__title {
    text-align: center;
  }
  &__subtitle {
    letter-spacing: 0.04em;
    padding-top: 1rem;
    text-align: center;
    font-family: OpenSans-SemiBold;
  }
  &__navigation {
    display: none;
    align-items: center;
    padding-top: 5rem;
    &-button {
      width: 9.15rem;
      height: 4rem;
      border-radius: .8rem;
      box-shadow: 0 .2rem .8rem rgba(0, 0, 0, 0.05);
      background: $white;
      margin-right: 2rem;
      font-family: OpenSans-Regular;
      &-active {
        background: $modalColor;
        box-shadow: none;
        font-family: OpenSans-SemiBold;
      }
    }
  }
  &__table {
    width: 100%;
    padding-top: 2.4rem;
    &-header {
      display: grid;
      background: $modalColor;
      height: 4rem;
      // grid-template-columns: 8.5rem 22.5rem 15rem 17rem 16.5rem 17rem 17rem 16.5rem;
      grid-template-columns: 31rem 99rem;
      align-items: center;
      justify-items: flex-end;
      h3 {
        letter-spacing: 0.04em;
      }
    }
    &-collection-group, &-detail-group {
      display: grid;
      align-items: center;
    }
    &-collection-group {
      grid-template-columns: 8.5rem 22.5rem;
      :first-child {
        justify-self: center;
      }
    }
    &-detail-group {
      grid-template-columns: 15rem 17rem 16.5rem 17rem 17rem 16.5rem;
      justify-items: flex-end;
    }
    &-content {
      &-item {
        display: grid;
        grid-template-columns: 31rem 99rem;
        height: 8rem;
        border-bottom: .1rem solid $modalColor;
        align-items: center;
        cursor: pointer;
        &-collection {
          display: flex;
          align-items: center;
          &-image {
            position: relative;
            &-avatar {
              width: 4.8rem;
              height: 4.8rem;
              border-radius: 50%;
              object-fit: cover;
            }
            &-verify {
              position: absolute;
              width: 1.6rem;
              height: 1.6rem;
              right: 0;
              bottom: 0;
            }
            &-new {
              width: .8rem;
              height: .8rem;
              background: $green;
              position: absolute;
              left: .5rem;
              top: 0;
              border-radius: 50%;
              &:hover ~ .rankings__table-content-item-collection-image-new-active {
                display: block;
              }
              &-active {
                display: none;
                padding: .6rem 1.65rem;
                background: $lightGreen;
                position: absolute;
                left: -2rem;
                top: -3.5rem;
              }
            }
          }
          &-name-box {
            padding-left: .8rem;
          }
          &-name {
            font-family: OpenSans-SemiBold;
            letter-spacing: 0.04em;
          }
        }
        &-volume {
          justify-self: flex-end;
          text-align: right;
          &-title {
            letter-spacing: 0.03em;
            display: flex;
            align-items: center;
            img {
              margin: 0 .5rem;
              width: 1.4rem;
            }
          }
          &-subtitle {
            padding-top: .4rem;
            color: $textColor3;
            display: flex;
            align-items: center;
            img {
              margin: 0 .5rem;
              width: 1.4rem;
            }
          }
        }
        &-day {
          justify-self: flex-end;
        }
        &-week {
          justify-self: flex-end;
        }
        &-percent-info {
          &.positive {
            color: $green;
          }
          &.negative {
            color: $red;
          }
        }
        &-floor {
          justify-self: flex-end;
          text-align: right;
          &-title {
            letter-spacing: 0.03em;
            display: flex;
            align-items: center;
            img {
              margin: 0 .5rem;
              width: 1.4rem;
            }
          }
          &-subtitle {
            padding-top: .4rem;
            color: $textColor3;
            display: flex;
            align-items: center;
            img {
              margin: 0 .5rem;
              width: 1.4rem;
            }
          }
        }
        &-owners {
          justify-self: flex-end;
        }
        &-items {
          justify-self: flex-end;
        }
        &-price-box, &-detail-box {
          display: none;
        }
        &-more {
          display: none;
        }
      }
    }
  }
  &-no-result {
    display: none;
    font-size: 16px;
    padding: 4.2rem 0;
    text-align: center;
  }

  @media(max-width: 460px) {
    &__title {
      font-size: 18px;
    }
    &__subtitle {
      font-size: 14px;
    }
    &__navigation {
      display: flex;
      justify-content: center;
      padding-top: 3rem;
      padding-bottom: 1.6rem;
      &-button {
        font-size: 14px;
      }
    }
    &__table {
      padding-top: 0.8rem;
      &-header {
        display: none;
      }
      &-collection-group  {
        display: flex;
        width: 50%;
        height: 7.2rem;
      }
      &-detail-group  {
        display: none;
      }
      &-content {
        &-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: auto;
          flex-wrap: wrap;
          &:first-child {
            border-top: .1rem solid $modalColor;
          }
          &-price-box {
            width: 50%;
            height: 7.2rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: right;
          }
          &-number {
            margin-right: 2.7rem;
            font-size: 14px;
          }
          &-collection {
            &-image {
              &-avatar {
                width: 3.6rem;
                height: 3.6rem;
              }
            }
            &-name {
              font-size: 14px;
            }
          }
          &-more {
            display: flex;
            align-items: center;
            background: transparent;
            &-image {
              margin-right: .4rem;
            }
            &-name {
              font-size: 13px;
              color: $textColor3;
            }
          }
          &-prices, &-percent {
            font-size: 14px;
          }
          &-percent {
            margin-top: 0.4rem;
			color: $green;
			&.negative {
			  color: $red;
			}
          }
          &-detail-box {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1rem 0;
            border-top: .1rem solid $modalColor;
            &-info {
              flex: 1;
              display: flex;
              flex-direction: column;
              align-items: center;
              &-title {
                font-size: 13px;
                color: $textColor3;
              }
              &-content {
                margin-top: .4rem;
                font-weight: 600;
                font-size: 14px;
                color: $textColor;
              }
            }
          }
        }
      }
      &.empty {
        display: none;
      }
    }
    &-no-result {
      display: block;
    }
  }
}
</style>
