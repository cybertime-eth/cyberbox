<template>
  <div class="rankings container-xl">
    <h1 class="rankings__title">NFT Ranking</h1>
    <h3 class="rankings__subtitle">With trading volume, floor price and etc., you can find the most trending NFTs here.</h3>
   <div class="rankings__navigation">
     <div class="rankings__navigation-date">
        <!-- <button class="rankings__navigation-button" :class="{'rankings__navigation-button-active': dateFilter === '7d'}" @click="updateFilter('7d')">7 Days</button>
        <button class="rankings__navigation-button" :class="{'rankings__navigation-button-active': dateFilter === '24d'}" @click="updateFilter('24d')">24 Days</button>
        <button class="rankings__navigation-button" :class="{'rankings__navigation-button-active': dateFilter === '30d'}" @click="updateFilter('30d')">30 Days</button> -->
      </div>
      <div class="rankings__navigation-tab">
        <div class="rankings__navigation-tab-item" :class="{active: isVolumeSection}"  @click="updateRankingsTab(1)">
          <img class="rankings__navigation-tab-item-img" src="/chart.svg" alt="chart"> Volume
        </div>
        <div class="rankings__navigation-tab-item" :class="{active: rankingTab === 2}" @click="updateRankingsTab(2)">
          <img class="rankings__navigation-tab-item-img" src="/plant.svg" alt="plant"> Carbon
        </div>
      </div>
   </div>
    <div class="rankings__table" :class="{empty: filteredList.length === 0}">
      <div class="rankings__table-header">
        <div class="rankings__table-collection-group">
          <h3>#</h3>
          <h3>Collection</h3>
        </div>
        <div class="rankings__table-detail-group">
          <h3>{{ !isVolumeSection ? 'Carbon Offset' : 'Volume' }}</h3>
          <h3>24h %</h3>
          <h3>7d %</h3>
          <h3>{{ !isVolumeSection ? 'Floor Carbon Offset' : 'Floor Price' }}</h3>
          <!-- <h3>Owners</h3> -->
          <h3>Items</h3>
        </div>
      </div>
      <div class="rankings__table-content">
        <div class="rankings__table-content-item" :key="idx" v-for="(item, idx) in filteredList" @click="gotoCollection(item.route)">
          <div class="rankings__table-collection-group">
            <h3 class="rankings__table-content-item-number">{{ item.index }}</h3>
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
                  <span class="rankings__table-content-item-more-percent" :class="{ positive: item.percentPer24h > 0, negative: item.percentPer24h < 0 }">{{ contractPercentInfo(item.percentPer24h) }}</span>
                </button>
              </div>
            </div>
          </div>
          <div class="rankings__table-detail-group">
            <div class="rankings__table-content-item-volume">
              <p class="rankings__table-content-item-volume-title" v-if="isVolumeSection"><img src="/celo.svg" alt="celo">{{ item.volumeCelo }}</p>
              <p class="rankings__table-content-item-volume-title" v-else>{{ item.co2Celo }} {{ !isMobile() ? 'Ton CO2' : '' }}</p>
              <p class="rankings__table-content-item-volume-price" v-if="isVolumeSection">{{ item.volumePrice }}</p>
            </div>
            <!-- <h3 class="rankings__table-content-item-items">{{ item.items }}</h3> -->
            <h3 class="rankings__table-content-item-day rankings__table-content-item-percent-info" :class="{ positive: item.percentPer24h > 0, negative: item.percentPer24h < 0 }">{{ contractPercentInfo(item.percentPer24h) }}</h3>
            <h3 class="rankings__table-content-item-week  rankings__table-content-item-percent-info"  :class="{ positive: item.percentPer7d > 0, negative: item.percentPer7d < 0 }">{{ contractPercentInfo(item.percentPer7d) }}</h3>
            <div class="rankings__table-content-item-floor">
              <p class="rankings__table-content-item-floor-title" v-if="isVolumeSection"><img class="rankings__table-content-item-floor-icon" src="/celo.svg" alt="celo" v-if="item.floorPriceCelo !== '-'"> {{ item.floorPriceCelo }}</p>
              <p class="rankings__table-content-item-floor-title" v-else>{{ item.floorCO2Celo }} {{ !isMobile() ? 'Ton CO2' : '' }}</p>
              <p class="rankings__table-content-item-floor-price" v-if="isVolumeSection">{{ item.floorPrice }}</p>
            </div>
            <!-- <h3 class="rankings__table-content-item-owners">-</h3> -->
            <h3 class="rankings__table-content-item-items">{{ item.items }}</h3>
          </div>
          <div class="rankings__table-content-item-price-box">
            <h3 class="rankings__table-content-item-prices" v-if="isVolumeSection"><img src="/celo.svg" alt="celo">{{ item.volumeCelo }}</h3>
            <h3 class="rankings__table-content-item-prices" v-else>{{ item.co2Celo }} {{ !isMobile() ? 'Ton CO2' : '' }}</h3>
            <p class="rankings__table-content-item-percent" :class="{ negative: item.percentPer24h < 0, zero: item.percentPer24h <= -100 || item.percentPer24h === 0 }">{{ isVolumeSection ? contractPercentInfo(item.percentPer24h) : 'Ton CO2' }}</p>
          </div>
          <div class="rankings__table-content-item-detail-box" v-if="item.expanded">
            <div class="rankings__table-content-item-detail-box-info">
              <p class="rankings__table-content-item-detail-box-info-title">7d %</p>
              <h3 class="rankings__table-content-item-detail-box-info-content" :class="{ positive: item.percentPer7d > 0, negative: item.percentPer7d < 0, zero: item.percentPer7d <= -100 || item.percentPer7d === 0 }">{{ contractPercentInfo(item.percentPer7d) }}</h3>
            </div>
            <div class="rankings__table-content-item-detail-box-info">
              <p class="rankings__table-content-item-detail-box-info-title">{{ isVolumeSection ? 'Floor price' : 'Floor Carbon Offset' }}</p>
              <h3 class="rankings__table-content-item-detail-box-info-content">{{ isVolumeSection ? item.floorPrice : item.floorCO2Celo }}</h3>
            </div>
            <div class="rankings__table-content-item-detail-box-info">
              <p class="rankings__table-content-item-detail-box-info-title">Items</p>
              <h3 class="rankings__table-content-item-detail-box-info-content">{{ item.shortenedItems }}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="rankings-no-result" v-show="!loading && filteredList.length === 0">No results found</p>
  </div>
</template>
<script>
import _ from 'lodash';
export default {
  data() {
    return {
      loading: false,
      celoPrice: 1,
      cmco2Price: 0,
      rankingTab: 1, // 1: Volume, 2: Refi
      list: [],
      filteredList: [],
      dateFilter: null
    }
  },
  head() {
    return {
      meta: [
        { vmid: 'title', hid: 'title', name: 'title', content: this.pageTitle },
        { vmid: 'og:title', hid: 'og:title', property: 'og:title', content: this.pageTitle },
        { vmid: 'description', hid: 'description', name: 'description', content: this.description },
        { vmid: 'og:description', hid: 'og:description', property: 'og:description', content: this.description }
      ]
    }
  },
  computed: {
    pageTitle() {
      return 'Rankings - Cyberbox ReFi NFT Marketplace'
    },
    description() {
      return 'Find the trends of the NFT collections right here, trading volume, floor price and all the information'
    },
    isVolumeSection() {
      return this.rankingTab === 1
    }
  },
  async created() {
    if (process.browser) {
      localStorage.removeItem('move_back')
    }
	await this.renderlist()
	this.sendRankingsEvent()
  },
  methods: {
    nftMoreIcon(nftIndex) {
      if (!this.filteredList[nftIndex].expanded) {
        return '/rankings/plus.svg';
      } else {
        return '/minus.svg';
      }
    },
    nftMoreButtonName(nftIndex) {
      if (!this.filteredList[nftIndex].expanded) {
        return 'More';
      } else {
        return 'Less';
      }
	},
	sendRankingsEvent(eventInfo) {
	  this.sendEvent({
		category: 'Browse',
		eventName: 'rankings',
		properties: {
		  rankings: this.rankingTab === 1 ? 'Volume' : 'Carbon'
		}
	  })
	},
    contractPercentInfo(percentVal) {
      if (percentVal !== 0 && percentVal !== -100) {
        return `${percentVal}%`
      } else {
        return '-'
      }
    },
	formatPriceToString(price) {
		if (price && !isNaN(parseFloat(price.toString()))) {
		  const priceVal = price * this.celoPrice
		  return '$' + parseFloat(parseFloat(priceVal).toFixed(2)).toLocaleString('en-US')
		} else {
		  return '-'
		}
	},
	async loadNftDetail(nft, idx) {
	  const floorPrice = await this.$store.dispatch('getFloorPrice', nft.nftSymbol)
	  this.list[idx].floorPriceCelo = floorPrice
    this.list[idx].floorPrice = this.formatPriceToString(floorPrice)
    const floorCO2Celo = floorPrice * nft.producerFee / 1000 * this.cmco2Price
    const co2celoDiff = Math.ceil(floorCO2Celo) - floorCO2Celo
    this.list[idx].floorCO2Celo = floorCO2Celo.toFixed(co2celoDiff === 0 ? 0 : 3)
	  this.list[idx].volumePrice = this.formatPriceToString(this.list[idx].volumeCelo)
	  this.list[idx].percentPer24h = await this.$store.dispatch('getContractInfoTimePercent', nft.nftSymbol)
    this.list[idx].percentPer7d = await this.$store.dispatch('getContractInfoWeekPercent', nft.nftSymbol)
    if (this.isVolumeSection) {
      this.updateRankingsList()
    }
	},
  async renderlist() {
    let footerEl = null
    if (process.browser) {
      footerEl = document.querySelector('.footer')
      footerEl.classList.add('fixed')
    }
    this.loading = true
    const tokenPrice = await this.$store.dispatch('getPriceToken')
    this.celoPrice = tokenPrice.value
    const result = await this.$store.dispatch('getCollectionInfo', true)
    const resultCount =  await this.$store.dispatch('getStatisticCountNft')
    let nftName = ''
    let itemNum = 0
    let cmco2Price = this.$store.state.cMCO2Price
    if (!cmco2Price) {
      cmco2Price = await this.$store.dispatch('getCMCO2TokenPrice')
    }
    this.cmco2Price = cmco2Price
    const invisibleTokens = ['cconnectpunks']
    for (let [index, item] of result.entries()) {
      if (!invisibleTokens.includes(item.nftSymbol)) {
        let volume = 0;
        let price = resultCount[index] ? resultCount[index].price_total / 1000 : 0
        volume = volume + price
        nftName = (this.$store.state.collectionList.find(collection => collection.route === item.nftSymbol) || {}).name
        const mintCountDiff = Math.ceil(item.mint_count / 1000) - (item.mint_count / 1000)
        const co2Celo = (item.sell_refi_price / 1000) * (item.producerFee / 1000) * cmco2Price
        const co2CeloDiff = Math.ceil(co2Celo) - co2Celo
        this.list.push({
          id: (itemNum + 1),
          collectionImage: `/${item.nftSymbol}.png`,
          verification: false,
          new: false,
          name: nftName,
          volumePrice: '-',
          volumeCelo: item.sell_total_price / 1000,
          co2Celo: co2Celo !== 0 ? co2Celo.toFixed(co2CeloDiff === 0 ? 0 : 2) : 0,
          statDay: volume / (item.sell_total_price / 1000) * 100,
          statWeek: 7,
          floorPrice: '-',
          floorPriceCelo: '-',
          owners: item.ownerCount,
          items: item.mint_count,
          shortenedItems: `${parseFloat((item.mint_count / 1000).toString()).toFixed(mintCountDiff === 0 ? 1 : 2)}K`,
          percentPer24h: 0,
          percentPer7d: 0,
          route: item.nftSymbol
        })
        this.loadNftDetail(item, itemNum)
        this.filteredList = JSON.parse(JSON.stringify(this.list))
        itemNum++
      }
    }
    this.updateRankingsList()
    this.loading = false
    if (process.browser && (window.innerWidth > 1182 || window.innerWidth <= 460)) {
      footerEl.classList.remove('fixed')
    }
  },
  updateRankingsList() {
    let rankingsList = JSON.parse(JSON.stringify(this.list))
    if (this.rankingTab === 2) {
      rankingsList = rankingsList.filter(item => parseFloat(item.co2Celo) > 0).sort((a, b) => b.co2Celo - a.co2Celo)
    }
    rankingsList.map((item, index) => item.index = index + 1)
    this.filteredList = rankingsList
    const footerEl = document.querySelector('.footer')
    if (rankingsList.length < 4 && process.browser && (window.innerWidth > 1182 || window.innerWidth <= 460)) {
      footerEl.classList.add('fixed')
    } else {
      footerEl.classList.remove('fixed')
    }
  },
  updateRankingsTab(tab) {
    if (this.rankingTab !== tab) {
	  this.rankingTab = tab
	  this.sendRankingsEvent()
      this.updateRankingsList()
    }
  },
	showNftDetail(nftIndex, e) {
      const newList = [...this.filteredList]
      newList[nftIndex].expanded = !newList[nftIndex].expanded
      this.filteredList = newList
      e.preventDefault()
      e.stopPropagation()
    },
    updateFilter(filter) {
      this.dateFilter = filter
	},
	gotoCollection(symbol) {
	  this.sendEvent({
		category: 'Collection',
		eventName: 'collection_enter',
		properties: {
		  collection_enter: 'Rankings'
		}
	  })
	  this.$router.push(`/collections/${symbol}`)
	}
  },
}
</script>
<style lang="scss">
.rankings {
  padding-top: 2.6rem;
  &__title {
    font-size: 3.2rem;
    text-align: center;
  }
  &__subtitle {
    letter-spacing: 0.04em;
    padding-top: 1rem;
    text-align: center;
    font-family: OpenSans-SemiBold;
    font-size: 1.6rem;
  }
  &__navigation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 5rem;
    &-button {
      width: 6.4rem;
      height: 3.2rem;
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.05);
      border-radius: 20px;
      background: $white;
      margin-right: 2rem;
      font-family: OpenSans-Regular;
      font-size: 1.4rem;
      font-weight: 400;
      color: $grayDark;
      &-active {
        background: $lightGreen;
        box-shadow: none;
      }
    }
    &-tab {
      display: flex;
      align-items: center;
      &-item {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 9.2rem;
        height: 2.8rem;
        background: $white;
        border: 1px solid $modalColor;
        font-size: 1.4rem;
        cursor: pointer;
        &.active {
          background: $lightGreen;
          border-color: transparent;
        }
        img {
          width: 1.5rem;
          margin-right: 0.55rem;
        }
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
        font-size: 1.6rem;
        font-weight: 600;
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
      grid-template-columns: 15rem 17rem 16.5rem 23rem 27.5rem;
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
            font-size: 1.6rem;
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
            justify-content: flex-end;
            font-size: 1.6rem;
            img {
              margin: 0 .5rem;
              width: 1.4rem;
            }
          }
          &-price {
            font-size: 1.4rem;
            font-weight: 400;
            color: $textColor3;
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
          font-weight: 400;
          font-size: 1.6rem;
          &.positive {
            color: $green;
          }
          &.negative {
            color: $red;
          }
        }
        &-floor {
          text-align: right;
          &-icon {
            margin-right: 8px;
            width: 1.4rem;
          }
          &-title {
            letter-spacing: 0.03em;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            font-size: 1.6rem;
            img {
              margin: 0 .5rem;
              width: 1.4rem;
            }
          }
          &-price {
            font-size: 1.4rem;
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
          font-weight: 400;
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
    padding: 4.2rem 0;
    text-align: center;
    font-size: 16px;
  }

  @media(max-width: 460px) {
    &__title {
      font-weight: 600;
      font-size: 1.8rem;
    }
    &__subtitle {
      font-size: 1.4rem;
    }
    &__navigation {
      display: flex;
      justify-content: center;
      padding-top: 3rem;
      padding-bottom: 1.6rem;
      &-button {
        font-size: 1.4rem;
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
            font-size: 1.4rem;
          }
          &-collection {
            &-image {
              &-avatar {
                width: 3.6rem;
                height: 3.6rem;
              }
            }
            &-name {
              font-size: 1.4rem;
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
              margin-right: 3.2rem;
              font-size: 1.3rem;
              color: $textColor3;
            }
            &-percent {
              font-weight: 600;
              font-size: 1.4rem;
              color: $textColor;
              &.positive {
                color: $green;
              }
              &.negative {
                color: $red;
              }
            }
          }
          &-prices {
            font-size: 1.4rem;
          }
          &-percent {
            font-size: 1.2rem;
          }
          &-prices {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            img {
              margin-right: 4px;
            }
          }
          &-percent {
            margin-top: 0.4rem;
            color: $green;
            &.negative {
              color: $red;
            }
            &.zero {
              color: $border;
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
                white-space: nowrap;
                font-size: 1.3rem;
                color: $textColor3;
              }
              &-content {
                margin-top: .4rem;
                font-weight: 600;
                font-size: 1.4rem;
                color: $textColor;
                &.positive {
                  color: $green;
                }
                &.negative {
                  color: $red;
                }
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
