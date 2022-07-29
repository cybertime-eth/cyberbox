<template>
  <PageLoader v-if="loading"/>
  <section class="refi container-xl" v-else>
    <h1 class="refi__title">Regenerate nature with the power of NFTs</h1>
    <h3 class="refi__subtitle">Cyberbox is a ReFi NFT marketplace that allows you to trade NFTs and automatically offset CO2</h3>
    <div class="refi__block">
      <div class="refi__block-info">
        <div class="refi__block-info-buttons">
          <button class="refi__block-info-button explorer" @click="gotoExplorer('Top_button')">Explorer NFT</button>
          <button class="refi__block-info-button top ranking" @click="gotoRankings('Top_button')">Rankings</button>
        </div>
        <img class="refi__block-info-picture" :src="getCDNImage('earth.webp')" alt="earth">
        <div class="refi__block-info-live" v-if="totalCO2Amount > 0">
          <h3 class="refi__block-info-live-title">LIVE <span/> Carbon Offsetting</h3>
          <div class="refi__block-info-live-co2 gradient-box">
            <h3 class="refi__block-info-live-co2-count">{{ totalCO2Amount }}</h3>
            <p class="refi__block-info-live-co2-description">Ton CO2 <img :src="getCDNImage('plant.svg')" alt="plant"></p>
          </div>
        </div>
      </div>
	  <div class="refi__block-carbon">
		<div class="refi__block-carbon-info">
			<h2 class="refi__block-carbon-info-title">NFT Carbon Offset Certificate</h2>
			<p class="refi__block-carbon-info-content">Buy a personal NFT certificate to become carbon neutral</p>
			<ul class="refi__block-carbon-info-list features-list">
				<li class="features-list-item">Unique NFT certificate every month</li>
				<li class="features-list-item">1 NFT = 1 ton CO2 offset</li>
				<li class="features-list-item">Collect or sell on the marketplace</li>
			</ul>
			<button class="refi__block-carbon-info-buy" @click="gotoLending">Buy & Offset Now</button>
		</div>
		<div class="refi__block-carbon-certificate" ref="certificate">
			<client-only>
				<vue-glide
					class="refi__block-carbon-certificate-glide"
					v-model="sliderActive"
					ref="slider"
					:bound="true"
					:perView="this.isMobile() ? 1.5 : 3"
					@glide:build-after="handleStartSlider"
				>
					<vue-glide-slide :key="idx" v-for="(certificate, idx) of certificates">
						<div class="refi__block-carbon-certificate-item" :class="{current: certificate.current }">
							<h3 class="refi__block-carbon-certificate-item-name">{{ certificate.name }}</h3>
							<div class="refi__block-carbon-certificate-item-box" :class="{unknown: !certificate.image}">
								<img class="refi__block-carbon-certificate-item-box-image" :src="certificate.image" v-if="certificate.image">
								<img class="refi__block-carbon-certificate-item-box-image-unknown" :src="getCDNImage('question-mark.svg')" v-else>
							</div>
							<p class="refi__block-carbon-certificate-item-status">{{ certificate.status }}</p>
						</div>
					</vue-glide-slide>
				</vue-glide>
			</client-only>
		</div>
	  </div>
      <div class="refi__block-listings">
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
      </div>
      <div class="refi__block-collections">
        <div class="refi__block-collections-header">
          <h3 class="refi__block-collections-header-title">Hot collections <img :src="getCDNImage('star-filled.svg')" alt="star"></h3>
          <div class="refi__block-collections-header-tab">
            <div class="refi__block-collections-header-tab-item" :class="{active: collectionTab === 1}"  @click="updateCollectionTab(1)"><img class="refi__block-collections-header-tab-item-img" :src="getCDNImage('chart.svg')" alt="chart"> Volume</div>
            <div class="refi__block-collections-header-tab-item" :class="{active: collectionTab === 2}" @click="updateCollectionTab(2)"><img class="refi__block-collections-header-tab-item-img" :src="getCDNImage('plant.svg')" alt="plant"> Carbon</div>
          </div>
        </div>
        <p class="refi__block-collections-description" v-if="collectionTab === 2">Amount of CO2 offseting through NFT trading</p>
        <div class="refi__block-collections-items" :class="{ carbon: collectionTab === 2 }">
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
              <div class="refi__block-collections-items-group-item-carbon" v-if="collectionTab === 2">
                <p class="refi__block-collections-items-group-item-carbon-value">{{collection.co2Celo}}</p>
                <p class="refi__block-collections-items-group-item-carbon-unit">Ton CO2</p>
              </div>
              <p class="refi__block-collections-items-group-item-amount" v-else><img :src="getCDNImage('celo.svg')" alt="celo"> {{collection.volumeCelo}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="refi__block-footer">
        <button class="refi__block-footer-button refi__block-info-button gradient-button ranking" @click="gotoRankings('Bottom_button')">Go to Rankings</button>
        <h2 class="refi__block-footer-title">ReFi NFT Marketplace</h2>
        <div class="refi__block-footer-info">
          <div class="refi__block-footer-info-box">
            <div class="refi__block-footer-info-box-header">
              <img class="refi__block-footer-info-box-header-icon" :src="getCDNImage('refi-rankings.svg')" alt="rankings">
              <h3 class="refi__block-footer-info-box-header-title">Carbon Offset Integration</h3>
            </div>
            <p class="refi__block-footer-info-box-description">When trading NFTs on our marketplace, carbon offset users do not have to do anything!</p>
          </div>
          <div class="refi__block-footer-info-box">
            <div class="refi__block-footer-info-box-header">
              <img class="refi__block-footer-info-box-header-icon" :src="getCDNImage('refi-integration.svg')" alt="integration">
              <h3 class="refi__block-footer-info-box-header-title">NFT Carbon Certificates</h3>
            </div>
            <p class="refi__block-footer-info-box-description">Buy a unique NFT certificate every month at the expense of carbon offset.</p>
          </div>
          <div class="refi__block-footer-info-box">
            <div class="refi__block-footer-info-box-header">
              <img class="refi__block-footer-info-box-header-icon" :src="getCDNImage('refi-setting.svg')" alt="settings">
              <h3 class="refi__block-footer-info-box-header-title">Unique opportunities for NFT creators</h3>
            </div>
            <p class="refi__block-footer-info-box-description">Flexible royalty system, ability to set % for Carbon offset, all the benefits of Celo chain, access to 200k of users via Valora app.</p>
          </div>
        </div>
        <button class="refi__block-footer-button refi__block-info-button explorer" @click="gotoExplorer('Bottom_button')">Explorer NFT</button>
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
	  sliderActive: 0,
      collectionTab: 1,
      latestListings: [],
      listingPageNum: 0,
      collectionList: [],
      hotCollections: []
    }
  },
  async created() {
	// Latest 12 Listings
	setTimeout(() => this.loading = false, 5000)
    const newListings = await this.$store.dispatch('getLatestListings')
    newListings.map(item => {
      if (item.price) {
        item.price = item.price / 1000
      }
      item.market_status = 'LISTED'
    })
    this.latestListings = newListings

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
		co2celoPrice = (item.sell_total_price / 1000 * 0.055 * cmco2Price) + (item.total_co2 / Math.pow(10, 7))
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

    // Total CO2 Amount
	this.totalCO2Amount = totalCO2Amount.toLocaleString('en-US')
	
	// Send visit event
	this.sendEvent({
	  category: 'Browse',
	  eventName: 'site_visit'
	})

	this.loading = false
  },
  mounted() {
	if (this.$refs.certificate && this.isMobile()) {
	  this.$refs.certificate.scrollLeft = Math.ceil(this.$refs.certificate.offsetWidth * 0.56)
	}
	if (process && process.browser && this.isMobile()) {
	  this.sliderActive = 1
	}
  },
  computed: {
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
	  const currYear = date.getFullYear()
	  const currMonth = date.getMonth() + 1
      const startMonth = currMonth > 1 ? currMonth - 1 : currMonth
      const endMonth = currMonth < 12 ? currMonth + 1 : 12
	  const list = []

	  for (let i = startMonth; i <= endMonth; i++) {
		date.setMonth(i - 1)
		const month = date.toLocaleString('en-us', { month: 'long' })
		let status = ''
		switch (i) {
		  case (currMonth - 1): status = 'Last'
		  	break
		  case currMonth: status = 'Available'
			break
		  case (currMonth + 1): status = 'Next'
		  	break
    }
		list.push({
		  name: `${month} ${currYear}`,
		  image: this.getCDNImage(`certificates/${i}.webp`),
		  status,
		  current: i === currMonth
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
	handleStartSlider() {
	  if (!this.isMobile()) {
		this.$refs.slider.glide.disable()
	  } else {
		setTimeout(() => this.$refs.slider.glide.update(), 100)
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
        collections = collections.sort((a, b) => b.volumeCelo - a.volumeCelo).slice(0, 12)
      } else {
        collections = collections.filter(item => item.co2Celo > 0).sort((a, b) => b.co2Celo - a.co2Celo).slice(0, 12)        
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
  padding: 6.7rem 6rem 16.3rem;
  &__title {
    text-align: center;
    font-family: Cabin-Bold;
    font-size: 4.8rem;
  }
  &__subtitle {
    padding-top: 1.6rem;
    text-align: center;
    font-weight: 500;
    font-size: 1.8rem;
  }
  &__block {
    padding-top: 4.4rem;
    &-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      &-buttons {
        display: flex;
		flex-direction: column;
        align-items: center;
      }
      &-button {
        width: 20rem;
        height: 5.8rem;
        background: $white;
        font-weight: 700;
        font-size: 1.6rem;
        border-radius: 3rem;
        color: $textColor;
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
      &-picture {
        width: 29.8rem;
        margin-top: 7rem;
      }
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
      &-live {
        padding-top: 11.4rem;
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
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 42.4rem;
          height: 24.9rem;
          margin-top: 4.2rem;
          border-radius: 2.3rem;
          &-count {
            font-family: Cabin-Medium;
            font-weight: 500;
            font-size: 6.4rem;
          }
          &-description {
            font-family: Cabin-Medium;
            font-weight: 400;
            padding-top: 0.8rem;
            font-size: 2.4rem;
            color: $grayLight;
          }
        }
      }
    }
	&-carbon {
	  display: flex;
      align-items: center;
	  justify-content: space-between;
	  background: $white2;
      padding: 6.7rem 11.1rem 7.2rem;
      margin: 10.2rem auto 9.8rem;
	  border-radius: 8px;
	  &-info {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		width: 28.3rem;
    	margin-right: 11.2rem;
		&-title {
		  font-family: Cabin-Medium;
		  font-weight: 500;
		  line-height: 3.6rem;
		  font-size: 3.2rem;
		}
		&-content {
		  margin-top: 1.2rem;
		  font-size: 1.4rem;
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
		display: flex;
		align-items: center;
		&-glide {
		  .glide__track {
			overflow: visible;
		  }
		  .glide {
			&__slides {
			  align-items: center;
			  overflow: visible;
			}
			&__slide {
			  width: 20rem !important;
			  &:nth-child(2) {
				width: 22.4rem !important;
			  }
			}
		  }
		}
		&-item {
		  &:last-child {
			margin: 0;
		  }
		  &-name {
			text-align: center;
			font-weight: 600;
			font-size: 1.6rem;
			color: $border;
		  }
		  &-box {
			margin-top: 1.6rem;
			border-radius: 0.4rem;
			&-image {
			  width: 20rem;
			  height: 20rem;
			  border-radius: 0.4rem;
			  opacity: 0.7;
			}
			&.unknown {
			  display: flex;
			  align-items: center;
			  justify-content: center;
			  width: 20rem;
			  height: 20rem;
			  background: linear-gradient(0deg, rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.75)), linear-gradient(46.74deg, #365BE0 -17.17%, #D676CF 48.99%, #FFE884 113%);
			}
		  }
		  &-status {
			margin-top: 2rem;
			text-align: center;
			font-weight: 600;
			font-size: 1.2rem;
			color: $border;
		  }
		  &.current {
			.refi__block-carbon-certificate-item-name {
			  color: $textColor;
			}
			.refi__block-carbon-certificate-item-box {
			  &-image {
				width: 22.4rem;
				height: 22.4rem;
				border: 4px solid $green;
				border-radius: 0.6rem;
				object-fit: cover;
				opacity: 1;
			  }
			}
			.refi__block-carbon-certificate-item-status {
			  color: $green;
			}
		  }
		}
	  }
	  &-picture {
		width: 28rem;
		border-radius: 5px;
	  }
	}
    &-listings {
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
        &.carbon {
          padding-top: 2rem;
        }
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
      padding-top: 6.6rem;
      &-title {
        padding-top: 8.6rem;
        padding-bottom: 3.2rem;
        font-family: Cabin-Medium;
        font-weight: 500;
        text-align: center;
        font-size: 3.2rem;
      }
      &-button {
        width: 42.4rem;
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
    padding: 2.4rem 0.8rem 13.4rem;
    &__title {
      font-family: Cabin-Medium;
      font-weight: 600;
      font-size: 2.8rem;
    }
    &__subtitle {
      padding: 1rem 2.4rem 0;
      font-size: 1.4rem;
    }
    &__block {
      padding-top: 2.4rem;
      &-info {
        &-button {
          display: block;
          width: 14.8rem;
          height: 4.8rem;
		  font-size: 1.4rem;
          &.explorer {
            margin-right: 0;
          }
          &.ranking {
            margin-top: 0.8rem;
			&.top {
			  margin-top: 1.6rem;
			}
          }
        }
        &-picture {
          width: 19.9rem;
          margin-top: 3.8rem;
        }
        &-support {
          padding-top: 5.8rem;
          &-title {
            font-size: 1.2rem;
          }
          &-investors {
            width: 100%;
            margin-top: 1.8rem;
          }
        }
        &-live {
          padding-top: 7rem;
          &-title {
            font-size: 1.6rem;
            span {
              width: 0.4rem;
              height: 0.4rem;
            }
          }
          &-co2 {
            width: 17.6rem;
            height: 11.2rem;
            margin-top: 2.1rem;
            &-count {
              font-size: 3.2rem;
            }
            &-description {
              font-size: 1.4rem;
              img {
                width: 1.5rem;
                transform: translateY(0.1rem);
              }
            }
          }
		}
	  }
	  &-carbon {
		width: 100%;
		flex-direction: column-reverse;
		padding: 2.4rem 0.8rem;
		margin: 4rem -0.8rem 4.5rem;
		border-radius: 0;
		&-certificate {
		  width: 100%;
		  &-glide {
			transform: translateX(6rem);
			.glide {
			  &__slide {
				&:nth-child(2) {
			  	  width: 20rem !important;
				}
			  }
			}
		  }
		  &-item {
			&.current {
			  .refi__block-carbon-certificate-item-box {
				&-image {
				  width: 20rem;
				  height: 20rem;
				}
			  }
			}
		  }
		}
		&-info {
		  width: 100%;
		  margin: 0;
		  padding-top: 2.8rem;
		  &-title {
			font-family: OpenSans-SemiBold;
			font-weight: 600;
			font-size: 1.8rem;
			line-height: 2.2rem;
		  }
		  &-list {
			margin-top: 1.6rem;
		  }
		  &-buy {
			display: block;
			margin: 2.4rem auto 0;
			font-size: 1.4rem;
		  }
		}
	  }
      &-listings {
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
            height: 35rem;
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
        padding-top: 3.7rem;
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
          &.carbon {
            padding-top: 1.6rem;
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
          padding-top: 5.6rem;
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
