<template>
  <PageLoader v-if="loading"/>
  <section class="refi" v-else>
	<div class="refi__main">
		<client-only>
			<img class="refi__main-img" :src="backgroundImage" alt="background">
		</client-only>
    	<h1 class="refi__title">Become carbon neutral with NFTs</h1>
		<client-only>
    		<h3 class="refi__subtitle">Cyberbox ReFi NFT Marketplace that helps everyone offset CO2 with <br v-if="!isMobile()"/>NFTs and track their carbon footprint</h3>
		</client-only>
		<div class="refi__main-buttons">
          <button class="refi__main-button explorer" @click="gotoExplorer('Top_button')">Explorer NFT</button>
          <button class="refi__main-button top ranking" @click="gotoRankings('Top_button')">Rankings</button>
        </div>
		<div class="refi__main-live" v-if="totalCO2Amount > 0">
		  <div class="refi__main-live-box gradient-box">
			<h3 class="refi__main-live-title">LIVE <span/> Regeneration</h3>
			<div class="refi__main-live-co2">
				<h3 class="refi__main-live-co2-count">{{ totalCO2Amount }}</h3>
				<p class="refi__main-live-co2-description">Offset, tCO2 <img :src="getCDNImage('plant.svg')" alt="plant"></p>
			</div>
		  </div>
        </div>
	</div>
    <div class="refi__block">
	  <div class="refi__block-carbon">
		<div class="refi__block-carbon-info">
			<h2 class="refi__block-carbon-info-title">ReFi Calendar 2022</h2>
			<p class="refi__block-carbon-info-content">Mint NFT, offset 1 tCO2 every month and regenerate nature</p>
			<ul class="refi__block-carbon-info-list features-list">
				<li class="features-list-item">On-chain offset confirmation</li>
				<li class="features-list-item">Unique art every month</li>
				<li class="features-list-item">1 tCO2 offset & added to tracker</li>
				<li class="features-list-item">Chance to get into the ReFi DAO club</li>
			</ul>
			<button class="refi__block-carbon-info-buy" @click="gotoLending">Mint & Offset Now</button>
		</div>
		<div class="refi__block-carbon-certificate">
			<div class="refi__block-carbon-certificate-item" :class="{ active: idx === activeCertificate }" :key="idx" v-for="(certificate, idx) of certificates">
				<h3 class="refi__block-carbon-certificate-item-name">{{ certificate.name }}</h3>
				<div class="refi__block-carbon-certificate-item-box" :class="{unknown: !certificate.image}">
					<img class="refi__block-carbon-certificate-item-box-image" :src="certificate.image" v-if="certificate.image">
					<img class="refi__block-carbon-certificate-item-box-image-unknown" :src="getCDNImage('question-mark.svg')" v-else>
				</div>
			</div>
		</div>
	  </div>
      <!-- <div class="refi__block-listings">
        <h3 class="refi__block-listings-title">Latest Listings <img :src="getCDNImage('fire.svg')" alt="fire"></h3>
        <div class="refi__block-listings-items">
          <client-only>
            <carousel :per-page="1" :navigate-to="listingPageNum" :mouse-drag="false" :paginationEnabled="false" :speed="1000">
              <slide :key="pageNum" v-for="pageNum of listingPageCount">
                <div class="refi__block-listings-items-slide">
                  <nft :nft="nft" :key="index"  v-for="(nft, index) in pageListings(pageNum)" :owner="nftOwned(nft)" :multiNft="isMultiNft(nft)" from="Main" :route="nftRoute(nft)"/>
                </div>
              </slide>
            </carousel>
          </client-only>
          <button class="btn-navigate btn-navigate-left" @click="showPrevListingPage" v-if="listingPageNum > 0">
            <img :src="getCDNImage('navigate-left.svg')" alt="left">
          </button>
          <button class="btn-navigate btn-navigate-right" @click="showNextListingPage" v-if="listingPageNum < listingPageCount - 1">
            <img :src="getCDNImage('navigate-right.svg')" alt="right">
          </button>
        </div>
      </div> -->
      <div class="refi__block-collections">
        <div class="refi__block-collections-header">
          <h3 class="refi__block-collections-header-title">Hot collections <img :src="getCDNImage('star-filled.svg')" alt="star"></h3>
          <div class="refi__block-collections-header-tab">
            <div class="refi__block-collections-header-tab-item" :class="{active: collectionTab === 1}" @click="updateCollectionTab(1)"><img class="refi__block-collections-header-tab-item-img" :src="getCDNImage('plant.svg')" alt="plant"> Offset</div>
			<div class="refi__block-collections-header-tab-item" :class="{active: collectionTab === 2}"  @click="updateCollectionTab(2)"><img class="refi__block-collections-header-tab-item-img" :src="getCDNImage('chart.svg')" alt="chart"> Volume</div>
          </div>
        </div>
        <div class="refi__block-collections-items" :class="{ carbon: collectionTab === 1 }">
          <div class="refi__block-collections-items-group" :key="idx" v-for="(group, idx) in hotCollections">
            <div class="refi__block-collections-items-group-item" :key="collection.id" v-for="collection of group" @click="gotoCollection(collection.nftSymbol)">
              <div class="refi__block-collections-items-group-item-info">
                <p class="refi__block-collections-items-group-item-info-ranking">{{ collection.index }}</p>
                <div class="refi__block-collections-items-group-item-info-icon">
                  <img class="refi__block-collections-items-group-item-info-icon-image" :src="collection.image" :alt="collection.nftSymbol">
                  <img class="refi__block-collections-items-group-item-info-icon-mark" :src="getCDNImage('checkmark.svg')" alt="checkmark">
                </div>
                <p class="refi__block-collections-items-group-item-info-name">{{ collection.name }}</p>
              </div>
              <div class="refi__block-collections-items-group-item-carbon" v-if="collectionTab === 1">
                <p class="refi__block-collections-items-group-item-carbon-value">{{collection.co2Celo}}</p>
                <p class="refi__block-collections-items-group-item-carbon-unit">tCO2</p>
              </div>
              <p class="refi__block-collections-items-group-item-amount" v-else><img :src="getCDNImage('celo.svg')" alt="celo"> {{collection.volumeCelo}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="refi__block-footer">
        <button class="refi__block-footer-button refi__main-button gradient-button ranking" @click="gotoRankings('Bottom_button')">Go to Rankings</button>
        <h2 class="refi__block-footer-title">ReFi NFT Marketplace</h2>
        <div class="refi__block-footer-info">
          <div class="refi__block-footer-info-box">
            <div class="refi__block-footer-info-box-header">
              <img class="refi__block-footer-info-box-header-icon" :src="getCDNImage('refi-rankings.svg')" alt="rankings">
              <h3 class="refi__block-footer-info-box-header-title">Automatic offset СO2</h3>
            </div>
            <p class="refi__block-footer-info-box-description">Any collection added to our marketplace will automatically offset carbon by 0.5% fee from each transaction. Collection creators can also set 2 types of fees up to 30%: resale income and carbon offset.</p>
          </div>
          <div class="refi__block-footer-info-box">
            <div class="refi__block-footer-info-box-header">
              <img class="refi__block-footer-info-box-header-icon" :src="getCDNImage('refi-integration.svg')" alt="integration">
              <h3 class="refi__block-footer-info-box-header-title">Offset calendar & tracker</h3>
            </div>
            <p class="refi__block-footer-info-box-description">Everything is simple - every month mint NFT, offset 1 tCO2 and regenerate nature! Track your offset on our platform in the tracker. Opportunity to follow the carbon footprint on-chain</p>
          </div>
          <div class="refi__block-footer-info-box">
            <div class="refi__block-footer-info-box-header">
              <img class="refi__block-footer-info-box-header-icon" :src="getCDNImage('refi-setting.svg')" alt="settings">
              <h3 class="refi__block-footer-info-box-header-title">Offset boxes</h3>
            </div>
            <p class="refi__block-footer-info-box-description">Offset Boxes work like Mystery Boxes. For companies, the opportunity to conduct a branded company through the NFT, increase loyalty, return up to 100% of offset costs. For collection creators, the ability to run your collection without knowing the code!</p>
          </div>
        </div>
        <button class="refi__block-footer-button refi__main-button explorer" @click="gotoExplorer('Bottom_button')">Explorer NFT</button>
        <div class="refi__block-info-support">
          <h3 class="refi__block-info-support-title">Supported & Powered by</h3>
          <client-only>
            <img class="refi__block-info-support-investors" :src="investorsIcon" alt="investors">
          </client-only>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import PageLoader from '@/components/utility/PageLoader.vue'
import nft from '@/components/nft.vue'
export default {
  components: {
	PageLoader,
    nft
  },
  data() {
    return {
	  loading: true,
	  totalCO2Amount: 0,
	  activeCertificate: 0,
	  sliderActive: 0,
      collectionTab: 1,
      latestListings: [],
      listingPageNum: 0,
      collectionList: [],
	  hotCollections: [],
	  certificateTimer: null
    }
  },
  async created() {
	setTimeout(() => this.stopLoading(), 5000)
	// Latest 12 Listings
    // const newListings = await this.$store.dispatch('getLatestListings')
    // newListings.map(item => {
    //   if (item.price) {
    //     item.price = item.price / 1000
    //   }
    //   item.market_status = 'LISTED'
    // })
    // this.latestListings = newListings

    // Hot Collections
    let cmco2Price = this.$store.state.cMCO2Price
    if (!cmco2Price) {
      cmco2Price = await this.$store.dispatch('getCMCO2TokenPrice')
    }
    const collections = await this.$store.dispatch('getCollectionInfo', true)
    const invisibleTokens = ['cconnectpunks']
    let totalCO2Amount = 0
    this.collectionList = collections.filter(item => !invisibleTokens.includes(item.nftSymbol)).map(item => {
	  let co2celoPrice =  item.sell_refi_price / 1000 * item.producerFee / 1000 * cmco2Price
	  if (item.nftSymbol === 'CBCN') {
		co2celoPrice = (item.sell_total_price / 1000 * 0.009 * cmco2Price) + (item.total_co2 / 1000)
	  }
	  const co2CeloDiff = Math.ceil(co2celoPrice) - co2celoPrice
      item.volumeCelo = Math.round(item.sell_total_price / 1000)
      item.co2Celo = co2celoPrice !== 0 ? co2celoPrice.toFixed(co2CeloDiff === 0 ? 0 : 2) : 0
	  totalCO2Amount += co2celoPrice
      item.name = (this.$store.state.collectionList.find(collection => collection.route === item.nftSymbol) || {}).name
      item.image = this.getCDNImage(`${item.nftSymbol}.webp`)
      return item
    })
    this.updateHotCollections()

	if (process.client) {
	  // Total CO2 Amount
	  this.totalCO2Amount = totalCO2Amount.toFixed(2).toLocaleString(navigator ? navigator.language : 'en-US')
	}
	
	// Send visit event
	this.sendEvent({
	  category: 'Browse',
	  eventName: 'site_visit'
	})

	this.stopLoading()
  },
  beforeDestroy() {
	clearInterval(this.certificateTimer)
  },
  mounted() {
	if (process && process.browser && this.isMobile()) {
	  this.sliderActive = 1
	}
  },
  computed: {
	backgroundImage() {
	  if (!this.isMobile()) {
		return this.getCDNImage('home-bg.webp')
	  } else {
		return this.getCDNImage('home-bg-mobile.webp')
	  }
	},
    pageSubTitle() {
      if (!this.isMobile()) {
        return 'CyberBox is the first NFT marketplace with ReFi integration'
      } else {
        return 'Trade NFTs and regenerate nature today'
      }
    },
    investorsIcon() {
      return this.isMobile() || (process.browser && window.innerWidth <= 460) ? this.getCDNImage('investors-mobile.webp') : this.getCDNImage('investors.webp')
    },
    listingPageCount() {
      if (!this.isMobile()) {
        return Math.round(this.latestListings.length / 6)
      } else {
        return Math.round(this.latestListings.length / 2)
      }
    },
    footerTitle() {
      if (!this.isMobile()) {
        return 'Why do collection creators and users<br/>choose CyberBox?'
      } else {
        return 'Why do collection creators<br/>and users choose CyberBox?'
      }
    },
    mobileSeparator() {
      return this.isMobile() ? '<br/>' : ' '
    },
    footerTitleSeparator() {
      return !this.isMobile() ? '<br/>' : ' '
	},
	certificates() {
	  const date = new Date()
	  const list = []
	  for (let i = 1; i <= 12; i++) {
		date.setMonth(i - 1)
		const month = date.toLocaleString('en-us', { month: 'long' })
		list.push({
		  name: `${month} 22`,
		  image: this.getCDNImage(`certificates/detail/${i}.webp`)
		})
	  }
	  return list
	}
  },
  methods: {
    nftOwned(nft) {
      return nft.owner && nft.owner.toLowerCase() === this.$store.state.fullAddress
    },
    isMultiNft(nft) {
      return this.$store.state.multiNftSymbols.includes(nft.nftSymbol)
    },
    nftRoute(nft) {
      if (!this.isMultiNft(nft)) {
        return `/collections/${nft.contract}/${nft.contract !== 'nomdom' ? nft.contract_id : nft.image}`
      } else {
        return `/collections/${nft.nftSymbol}/${nft.image.substring(nft.image.lastIndexOf('/') + 1).split('.')[0]}`
      }
	},
	stopLoading() {
	  this.loading = false
	  if (!this.certificateTimer) {
		this.certificateTimer = setInterval(this.startCertificateAnimation, 3000)
	  }
	},
	startCertificateAnimation() {
	  const newCertifiate = this.activeCertificate + 1
	  if (newCertifiate < 12) {
		this.activeCertificate = newCertifiate
	  } else {
		this.activeCertificate = 0
	  }
	},
    pageListings(page) {
      const itemsCount = !this.isMobile() ? 6 : 2;
      if (page === 1) {
        return this.latestListings.slice(0, itemsCount)
      } else {
        const from = itemsCount * (page - 1)
        return this.latestListings.slice(from, from + itemsCount)
      }
    },
    showPrevListingPage() {
      if (this.listingPageNum > 0) {
        this.listingPageNum = this.listingPageNum - 1
      }
    },
    showNextListingPage() {
      if (this.listingPageNum < this.listingPageCount - 1) {
        this.listingPageNum = this.listingPageNum + 1
      }
    },
    updateHotCollections() {
      let collections = JSON.parse(JSON.stringify(this.collectionList))
      if (this.collectionTab === 1) {
		collections = collections.filter(item => item.co2Celo > 0).sort((a, b) => b.co2Celo - a.co2Celo).slice(0, 12)        
      } else {
		collections = collections.sort((a, b) => b.volumeCelo - a.volumeCelo).slice(0, 12)
      }
      collections.map((item, index) => item.index = index + 1)
      if (!this.isMobile()) {
        this.hotCollections = [
          collections.slice(0, 4),
          collections.slice(4, 8),
          collections.slice(8, 12)
        ]
      } else {
        this.hotCollections = [
          collections.slice(0, 3),
          collections.slice(3, 6),
          collections.slice(6, 9),
          collections.slice(9, 12)
        ]
      }
    },
    updateCollectionTab(tab) {
      if (this.collectionTab !== tab) {
        this.collectionTab = tab
        this.updateHotCollections()
      }
	},
	gotoLending() {
	  this.sendEvent({
		category: 'Browse',
		eventName: 'minter_enter',
		properties: {
		  minter_enter: 'Main'
		}
	  })
	  this.$router.push('/calendar')
	},
    gotoCollection(symbol) {
      this.sendEvent({
        category: 'Collection',
        eventName: 'collection_enter',
        properties: {
          collection_enter: 'Explorer'
        }
      })
      this.$router.push(`/collections/${symbol}`)
	},
	sendBrowseEvent(eventInfo) {
	  let eventName = ''
	  let eventProperty = ''
	  if (eventInfo.explorer) {
		eventName = 'explorer_enter'
		eventProperty = eventInfo.explorer
	  } else if (eventInfo.rankings) {
		eventName = 'rankings_enter'
		eventProperty = eventInfo.rankings
	  }
	  this.sendEvent({
		category: 'Browse',
		eventName,
		properties: {
		  [eventName]: eventProperty
		}
	  })
	},
	gotoExplorer(from) {
	  this.sendBrowseEvent({ explorer: from })
	  this.$router.push('/explorer')
	},
	gotoRankings(from) {
	  this.sendBrowseEvent({ rankings: from })
	  this.$router.push('/rankings')
	}
  }
}
</script>
<style lang="scss">
.gradient-box {
  position: relative;
  background: $white;
  &::after {
    content: '';
    position: absolute;
    top: -.1rem; bottom: -.1rem;
    left: -.1rem; right: -.1rem;
    background: linear-gradient(to right, #365BE0, #D676CF, #FFE884);
    z-index: -1;
    border-radius: 2.3rem;
  }
}
.refi {
  &__main {
	position: relative;
	width: 100%;
	padding-top: 23.4rem;
	padding-bottom: 25.1rem;
	&-img {
	  position: absolute;
	  left: 0;
	  top: 0;
	  width: 100%;
	  height: 100%;
	  z-index: -1;
	}
	&-buttons {
      display: flex;
	  flex-direction: column;
      align-items: center;
	  margin-top: 4.4rem;
    }
    &-button {
      width: 20rem;
      height: 5.8rem;
      background: transparent;
      font-weight: 700;
      font-size: 1.6rem;
      border-radius: 3rem;
      color: $grayDark;
      &.explorer {
        background: linear-gradient(90deg, #365BE0 -14.25%, #D676CF 48.65%, #FFE884 109.5%);
        color: $white;
      }
      &.ranking {
		&.top {
		  width: auto;
		  height: auto;
		  margin-top: 2.6rem;
		}
        &::after {
          background: linear-gradient(to right, #C074B5, #E5C282);
          border-radius: 3rem;
        }
      }
	}
	&-live {
		position: absolute;
		left: 50%;;
		bottom: -12.5rem;
		transform: translateX(-50%);
		&-box {
		  display: flex;
		  flex-direction: column;
		  align-items: center;
		  justify-content: center;
		  width: 42.4rem;
		  height: 25rem;
		  background: $white;
		  border-radius: 2.3rem;
		  position: relative;
		}
        &-title {
          text-align: center;
          font-family: Cabin-Medium;
          font-weight: 500;
          font-size: 3.2rem;
          span {
            display: inline-block;
            width: 1rem;
            height: 1rem;
            background: $red2;
            border-radius: 50%;
            vertical-align: middle;
          }
        }
        &-co2 {
		  margin-top: 2rem;
		  text-align: center;
          &-count {
            font-family: Cabin-Medium;
            font-weight: 500;
            font-size: 6.4rem;
          }
          &-description {
            font-family: Cabin-Regular;
            font-weight: 400;
            padding-top: 2rem;
            font-size: 2.4rem;
            color: $grayLight;
          }
        }
      }
  }
  &__title {
    text-align: center;
    font-family: Cabin-Bold;
    font-size: 5rem;
  }
  &__subtitle {
    padding-top: 1.6rem;
    text-align: center;
    font-weight: 500;
    font-size: 2rem;
  }
  &__block {
    padding: 20.4rem 6rem 34.8rem;
    &-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      &-support {
        padding-top: 15.7rem;
        &-title {
          font-weight: 400;
          font-size: 1.8rem;
          text-align: center;
          color: $grayLight;
        }
        &-investors {
          width: 64.4rem;
          margin-top: 2.1rem;
        }
      }
    }
	&-carbon {
	  display: flex;
      align-items: center;
	  justify-content: space-between;
	  background: #F9F7FF;
      padding: 4.8rem 18rem;
	  border-radius: 3rem;
	  &-info {
		&-title {
		  font-family: Cabin-Medium;
		  font-weight: 500;
		  line-height: 3.6rem;
		  font-size: 3.2rem;
		}
		&-content {
		  max-width: 30.3rem;
		  margin-top: 1.2rem;
		  font-size: 1.6rem;
		  color: $grayDark;
		}
		&-list {
		  margin-top: 2.4rem;
		}
		&-buy {
		  width: 17.9rem;
		  background: linear-gradient(90deg, #365BE0 -14.25%, #D676CF 48.65%, #FFE884 109.5%);
		  margin-top: 2.4rem;
		  padding: 1.2rem 0;
		  border-radius: 2.5rem;
		  font-weight: 700;
		  font-size: 1.6rem;
		  color: $white;
		}
	  }
	  &-certificate {
		position: relative;
		width: 35rem;
		height: 39rem;
		&-item {
		  position: absolute;
		  left: 0;
		  top: 0;
		  opacity: 0;
		  webkit-transition: opacity 1.5s ease;
		  -moz-transition: opacity 1.5s ease;
		  -o-transition: opacity 1.5s ease;
		  transition: opacity 1.5s ease;
		  &-name {
			text-align: center;
			font-weight: 600;
			font-size: 1.4rem;
		  }
		  &-box {
			margin-top: 1.6rem;
			border-radius: 0.6rem;
			&-image {
			  width: 35rem;
			  height: 35rem;
			  border-radius: 0.6rem;
			}
		  }
		  &.active {
			opacity: 1;
		  }
		}
	  }
	  &-picture {
		width: 28rem;
		border-radius: 5px;
	  }
	}
    &-listings {
	  margin-top: 9.2rem;
      &-title {
        font-family: OpenSans-SemiBold;
        font-size: 2.2rem;
        img {
          width: 2rem;
        }
      }
      &-items {
        padding-top: 4.4rem;
        position: relative;
        &-slide {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
          grid-column-gap: 2.4rem;
          height: 41rem;
        }
        .btn-navigate {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          height: 4rem;
          background: rgba(255, 255, 255, 0.6);
          img {
            width: 4rem;
          }
          &-left {
            left: 0;
          }
          &-right {
            right: 0;
          }
        }
      }
    }
    &-collections {
      padding-top: 6rem;
      &-header {
        display: flex;
        align-items: center;
        &-title {
          margin-right: 5.8rem;
          font-family: OpenSans-SemiBold;
          font-size: 2.2rem;
          img {
            width: 2rem;
          }
        }
        &-tab {
          display: flex;
          align-items: center;
          &-item {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 8.8rem;
            height: 3.2rem;
            background: $white;
            border: 1px solid $modalColor;
            text-align: center;
            font-size: 1.4rem;
			cursor: pointer;
			&:first-child {
			  border-radius: 2.5rem 0 0 2.5rem;
			}
			&:last-child {
			  border-radius: 0 2.5rem 2.5rem 0;
			}
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
      &-description {
        padding-top: 4rem;
        text-align: center;
        font-family: OpenSans-SemiBold;
        font-weight: 600;
        font-size: 1.6rem;
      }
      &-items {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-column-gap: 2.4rem;
        padding-top: 4rem;
        &-group {
          &-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1.6rem 0.8rem 1.6rem 1.6rem;
            height: 6.8rem;
            border-bottom: 1px solid $modalColor;
            cursor: pointer;
            &:first-child {
              border-top: 1px solid $modalColor;
            }
            &-info {
              display: flex;
              align-items: center;
              font-size: 1.6rem;
              &-ranking {
                margin-right: 1.6rem;
                font-size: 1.6rem;
              }
              &-icon {
                position: relative;
                margin-right: 0.8rem;
                height: 4.8rem;
                &-image {
                  width: 4.8rem;
                  height: 4.8rem;
                  border-radius: 50%;
                }
                &-mark {
                  position: absolute;
                  right: 0;
                  bottom: 0;
                  width: 1.6rem;
                }
              }
              &-name {
                font-weight: 600;
                font-size: 1.6rem;
              }
            }
            &-amount {
              display: flex;
              align-items: center;
              font-weight: 600;
              font-size: 1.6rem;
              img {
                margin-right: 0.4rem;
              }
            }
            &-carbon {
              text-align: right;
              &-value {
                font-family: OpenSans-SemiBold;
                font-weight: 600;
                font-size: 1.6rem;
              }
              &-unit {
				margin-top: 0.4rem;
				white-space: nowrap;
                font-weight: 400;
                font-size: 1.4rem;
                color: $textColor3;
              }
            }
          }
        }
      }
    }
    &-footer {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 6.2rem;
      &-title {
        padding-top: 14.3rem;
        padding-bottom: 3.2rem;
        font-family: Cabin-Medium;
        font-weight: 500;
        text-align: center;
        font-size: 3.2rem;
      }
      &-button {
		&.ranking {
		  background: $white;
		}
        &.explorer {
          margin-top: 6.6rem;
        }
      }
      &-info {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-column-gap: 2.4rem;
        &-box {
          background: $white;
          padding: 3.2rem 1.6rem;
          border-radius: 16px;
          box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
          &-header {
            display: flex;
			align-items: center;
			height: 5.2rem;
            &-icon {
			  width: 5.2rem;
			  height: 5.2rem;
              margin-right: 2.4rem;
            }
            &-title {
              font-family: OpenSans-SemiBold;
              font-weight: 600;
              font-size: 2rem;
            }
          }
          &-description {
            padding-top: 2.2rem;
            font-weight: 400;
            font-size: 1.6rem;
          }
        }
      }
    }
  }
  @media(max-width: 460px) {
	&__main {
	  padding-top: 18rem;
	  padding-bottom: 16.5rem;
	  &-buttons {
		margin-top: 2.4rem;
	  }
	  &-button {
		width: 14.8rem;
		height: 3.6rem;
		font-weight: 600;
		font-size: 1.4rem;
		&.top {
		  &.ranking {
			margin-top: 1.6rem;
			color: $textColor;
		  }
		}
	  }
	  &-live {
		bottom: -7.1rem;
		&-box {
		  width: 22.7rem;
		  height: 14.2rem;
		}
		&-title {
		  font-size: 1.6rem;
		  span {
			width: 0.4rem;
			height: 0.4rem;
		  }
		}
		&-co2 {
  		  margin-top: 0.8rem;
		  &-count {
			font-size: 3.2rem;
		  }
		  &-description {
			padding-top: 0.8rem;
			font-size: 1.4rem;
			img {
			  width: 1.5rem;
			  transform: translateY(0.1rem);
			}
		  }
		}
	  }
	}
    &__title {
      font-family: Cabin-Medium;
      font-weight: 600;
      font-size: 2.8rem;
    }
    &__subtitle {
	  padding-top: 1rem;
	  margin: 0 0.8rem;
	  font-size: 1.4rem;
	}
    &__block {
      padding: 14.4rem 0.8rem 5.4rem;
      &-info {
        &-support {
          padding-top: 6rem;
          &-title {
            font-size: 1.2rem;
          }
          &-investors {
            width: 100%;
            margin-top: 1.8rem;
          }
        }
	  }
	  &-carbon {
		width: calc(100% + 0.8rem);
		flex-direction: column-reverse;
		padding: 3.2rem 0.8rem;
		margin-left: -0.8rem;
		border-radius: 0;
		&-certificate {
		  width: 100%;
		  height: 33.5rem;
		  &-item {
			&-box {
			  margin-top: 1.2rem;
			  &-image {
				width: 30.4rem;
				height: 30.4rem;
			  }
			}
		  }
		}
		&-info {
		  width: 100%;
		  margin: 0;
		  padding-top: 2.4rem;
		  &-title {
			font-family: OpenSans-SemiBold;
			font-weight: 600;
			font-size: 2.2rem;
			line-height: 2.4rem;
		  }
		  &-content {
			margin-top: 1.2rem;
			font-family: OpenSans-SemiBold;
			font-weight: 600;
			font-size: 1.4rem;
		  }
		  &-list {
			margin-top: 1.6rem;
		  }
		  &-buy {
			display: block;
			height: 3.6rem;
			margin: 2.4rem auto 0;
			padding: 0;
			font-size: 1.4rem;
		  }
		}
	  }
      &-listings {
		margin-top: 4.5rem;
        &-title {
          font-size: 1.6rem;
          img {
            transform: translateY(0.1rem);
          }
        }
        &-items {
          padding-top: 2.1rem;
          &-slide {
            grid-template-columns: 1fr 1fr;
            grid-column-gap: 1.6rem;
            height: 31rem;
            .collection__item {
              height: 30rem;
              &-image {
                max-width: 14.4rem;
              }
              &-info {
                &-name {
                  font-size: 1.4rem;
                }
                &-rank, &-id {
                  font-size: 1.2rem;
                }
                &-details {
                  font-size: 1.4rem;
                }
              }
            }
          }
          .btn-navigate {
            height: 2.8rem;
            img {
              width: 2.8rem;
            }
          }
        }
      }
      &-collections {
        padding-top: 6rem;
        &-header {
          display: block;
          &-title {
            font-size: 1.8rem;
            img {
              transform: translateY(0.1rem);
            }
          }
          &-tab {
            justify-content: center;
            margin-top: 2.1rem;
            &-item {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 9.7rem;
            }
          }
        }
        &-description {
          padding-top: 2.6rem;
          font-family: OpenSans-Regular;
          font-size: 1.4rem;
        }
        &-items {
          grid-template-columns: 1fr 1fr 1fr 1fr;
          padding-top: 2.6rem;
          overflow-x: auto;
          -ms-overflow-style: none;
          scrollbar-width: none;
          &::-webkit-scrollbar {
            display: none;
          }
          &-group {
            width: 24.4rem;
            &-item {
              padding: 1.4rem 0.8rem;
              height: 4.8rem;
              &-info {
                &-ranking {
                  margin-right: 1.8rem;
                  font-size: 1.4rem;
                }
                &-icon {
                  height: 3.6rem;
                  &-image {
                    width: 3.6rem;
                    height: 3.6rem;
                  }
                  &-mark {
                    width: 1.2rem;
                  }
                }
                &-name {
                  font-size: 1.4rem;
                }
              }
              &-amount {
                font-size: 1.4rem;
                img {
                  margin-right: 0.35rem;
                }
              }
              &-carbon {
                &-value {
                  font-family: OpenSans-SemiBold;
                  font-size: 1.4rem;
                }
                &-unit {
                  margin-top: 0;
                  font-size: 1.2rem;
                }
              }
            }
          }
        }
      }
      &-footer {
        padding-top: 2.6rem;
        &-button {
          &.explorer {
            width: 14.8rem;
            margin-top: 2.6rem;
          }
          &.ranking {
            width: 17.3rem;
            margin: 0;
          }
        }
        &-title {
          padding-top: 9.2rem;
          padding-bottom: 2.6rem;
          font-size: 2.2rem;
        }
        &-info {
          display: block;
          &-box {
            padding: 1.6rem 1.6rem 2.2rem;
            margin-bottom: 2rem;
            &-header {
			  display: block;
			  height: auto;
              &-icon {
				width: 4.8rem;
				height: 4.8rem;
                margin-bottom: 1.6rem;
              }
              &-title {
                font-size: 1.6rem;
              }
            }
            &-description {
              padding-top: 0.8rem;
              font-size: 1.4rem;
            }
            &:last-child {
              margin: 0;
            }
          }
        }
      }
    }
  }
}
</style>
