<template>
  <section class="boxcollection">
    <img :src="collection.collectionBanner" alt="banner" class="boxcollection__banner" v-if="collection.collectionBanner">
	<div class="boxcollection__bannerframe" v-else></div>
    <div class="boxcollection__content container-xl">
      <div class="boxcollection__header">
        <img :src="collection.collectionLogo" alt="avatar" class="boxcollection__header-avatar" v-if="collection.collectionLogo">
		<div class="boxcollection__header-avatarframe" v-else></div>
		<div class="boxcollection__header-title-block">
        	<h1 class="boxcollection__header-title"><span>{{ collection.collectionName }}</span> <img src="/confirmed.svg" alt="confirm"></h1>
			<!-- <div class="boxcollection__header-edit">
				<button class="boxcollection__header-edit-btn">Edit</button>
				<button class="boxcollection__header-edit-dropdown">&bull;&bull;&bull;</button>
			</div> -->
		</div>
		<div class="boxcollection__header-block">
			<div class="boxcollection__header-socials">
				<a :href="collection.discord" target="_blank" v-if="collection.discord"><img src="/socials/discord.svg" alt="social"></a>
				<a :href="collection.telegram" target="_blank" v-if="collection.telegram"><img src="/socials/telegram.svg" alt="social"></a>
				<a :href="collection.twitter" target="_blank" v-if="collection.twitter"><img src="/socials/twitter.svg" alt="social"></a>
				<a :href="collection.site" target="_blank" v-if="collection.site"><img src="/socials/web.svg" alt="social"></a>
			</div>
			<div class="boxcollection__header-info">
				<div class="boxcollection__header-info-block" ref="itemsInfo">
					<h3 class="boxcollection__header-info-block-title">0</h3>
					<h3 class="boxcollection__header-info-block-subtitle">Items</h3>
				</div>
				<div class="boxcollection__header-info-block">
					<h3 class="boxcollection__header-info-block-title"><img src="/celo.svg" alt="celo">0</h3>
					<h3 class="boxcollection__header-info-block-subtitle">Volume traded</h3>
				</div>
				<div class="boxcollection__header-info-block">
					<h3 class="boxcollection__header-info-block-title"><img src="/celo.svg" alt="celo">0</h3>
					<h3 class="boxcollection__header-info-block-subtitle">Floor price</h3>
				</div>
				<div class="boxcollection__header-info-block" ref="refiInfo">
					<h3 class="boxcollection__header-info-block-title">0</h3>
					<h3 class="boxcollection__header-info-block-subtitle">Offset, tCO2 <img src="/plant.svg" alt="plant"></h3>
				</div>
			</div>
		</div>
        <h3 class="boxcollection__header-content">{{ collection.collectionDesc }}</h3>
      </div>
      <div class="boxcollection__loading" v-if="loading">
        <img src="/loading-button.svg" alt="load">
      </div>
      <div class="boxcollection__loading" v-if="nftLoading">
        <img src="/loading-button.svg" alt="load">
      </div>
	  <div class="boxcollection__items" v-else-if="nftList.length && !loading">
        <nft :nft="nft" :key="index"  v-for="(nft, index) of nftList" :owner="nftOwned(nft)" :boxnft="true" :seller="false" :route="nftRoute(nft)" from="Collection"/>
      </div>
      <button class="boxcollection__create" @click="createCarbonBox" v-else-if="!loading && nftList.length === 0">Create Carbon Box</button>
    </div>
  </section>
</template>
<script>
import _ from 'lodash'
import nft from '@/components/nft.vue'
import CustomSwitch from '@/components/utility/CustomSwitch'
import {BigNumber} from 'ethers'
export default {
  data() {
    return {
	  collection: {},
      pageLoading: false,
      loading: false,
      nftLoading: false,
      filter: 'listed',
      activeRequest: 'getGraphDataListed',
      sort: '',
      myNft: false,
      collectionInfo: {},
      floorPrice: '-',
      refiCO2Price: '-',
      searchName: ''
    }
  },
  components: {
    nft,
	CustomSwitch
  },
  computed: {
	isCertificateCollection() {
      return this.$route.params.collectionid === 'CBCN'
    },
    isNomDomain() {
      return this.$route.params.collectionid === 'nomdom'
    },
    fitlerPlaceholder() {
      return !this.isNomDomain ? 'Mint number' : 'NOM name'
    },
    countItems() {
      if (!this.myNft) {
        switch (this.filter) {
          case 'All': return this.collectionInfo.filter_count || this.collectionInfo.mint_count;
          case 'listed': return this.collectionInfo.list_count;
          case 'bought': return this.collectionInfo.sell_count;
        }
      } else {
        return this.nftList.length
      }
	},
    nftList() {
      return this.$store.state.nftList
    },
    address() {
      return this.$store.state.address
    },
    fetchEnabled() {
      return this.address || (!this.address && !this.myNft)
    },
	mintLink() {
	  const fullyMintedCollections = ['knoxnft', 'christmaspunk', 'cpunkneon', 'cak', 'nomstronaut', 'mpunk', 'ctoadz', 'cshape', 'cpaint']
	  if (fullyMintedCollections.includes(this.$route.params.collectionid)) return null

	  const collectionId = this.$route.params.collectionid
	  switch (collectionId) {
		case 'gang': return 'https://chinchillagang.shop/'
		  break
		case 'cdp': return 'https://mint.celodaopunks.art/'
		  break
		case 'cer': return 'https://celoerectus.shop/'
		  break
		case 'cmbs': return 'https://mint.celomonkeybusiness.xyz/'
		  break
		case 'nkw': return 'https://mint.navikatz.com/'
		  break
		default: return this.collection.website
		  break
	  }
	}
  },
  watch: {
	collection() {
	  if (!this.collection.preview && this.$store.state.nftList.length === 0) {
		this.fetchNftList()
	  }
	},
    nftList() {
      if (this.$store.state.nftList.length === 0) {
        if (window.innerWidth < 836) {
          this.showFixedFooter(true)
        }
      } else {
        this.showFixedFooter(false)
      }
    },
    loading(newVal) {
      if (window.innerWidth < 836 && this.loading) {
        this.showFixedFooter(true)
      }
    },
    nftLoading() {
      if (window.innerWidth < 836 && this.nftLoading) {
        this.showFixedFooter(true)
      }
    }
  },
  beforeDestroy() {
    // window.removeEventListener('scroll', this.handleDebouncedScroll)
  },
  created() {
	this.loadCollection()
  },
  mounted() {
	this.initNftListSetting()
	if (this.$store.state.boxCollectionList.length === 0) {
	  this.$store.dispatch('getBoxCollectionList')
	}
	if (!this.collection.preview) {
	  this.fetchNftList()
	}
  },
  methods: {
    nftRoute(nft) {
      return `/collections/${nft.contract}/${nft.contract_id}`
    },
    nftOwned(nft) {
      return nft.owner && nft.owner.toLowerCase() === this.$store.state.fullAddress
	},
	async loadCollection() {
	  this.loading = true
	  const currCollection = this.$store.state.boxCollection
	  if (currCollection) {
		this.collection = {
		  ...currCollection,
		  preview: true
		}
	  } else if (this.$store.state.boxCollectionList.length > 0) {
		const collectionList = this.$store.state.boxCollectionList || []
		this.collection = collectionList.find(collection => collection.collectionAddress === this.$route.params.boxcollectionid) || {}
	  } else {
		const collectionList = await this.$store.dispatch('getBoxCollectionList')
		this.collection = collectionList.find(collection => collection.collectionAddress === this.$route.params.boxcollectionid) || {}
	  }
	  this.loading = false
	},
    showFixedFooter(show) {
      const footerEl = document.querySelector('.footer')
      if (!footerEl) return
      if (show) {
        footerEl.classList.add('fixed')
      } else {
        footerEl.classList.remove('fixed')
      }
    },
    initNftListSetting() {
      this.$store.commit('setNewNftList', [])
      this.$store.commit('changeCountPage', 1)
      this.$store.commit('changeSortData', 'all')
	},
	createCarbonBox() {
	  this.$router.push(`/createbox/4?collectionAddress=${this.collection.collectionAddress}`)
	},
	sendCollectionEvent(eventInfo) {
	  let eventName = ''
	  let eventProperty = null
	  if (eventInfo.render) {
		eventName = 'collection'
		eventProperty = this.collection.name
	  } else if (eventInfo.filter) {
		eventName = 'collection_tabs'
		switch (eventInfo.filter) {
		  case 'All': eventProperty = 'All'
		    break
		  case 'listed': eventProperty = 'Listing'
		    break
		  case 'bought': eventProperty = 'Sold'
		    break
		}
	  } else if (eventInfo.sort) {
		eventName = 'collection_filters'
		switch (eventInfo.sort) {
		  case 'mint-lowest': eventProperty = 'Low_ID'
			break
		  case 'mint-highest': eventProperty = 'High_ID'
			break
		  case 'sold-latest': eventProperty = 'Latest_Sold'
		    break
		  case 'price-lowest': eventProperty = 'Low_Price'
			break
		  case 'price-highest': eventProperty = 'High_Price'
			break
		  case 'rarity-rare': eventProperty = 'Rare_Rank'
			break
		  case 'rarity-common': eventProperty = 'Common_Rank'
		  	break
		}
	  } else if (eventInfo.traits) {
		eventName = 'collection_traits'
	  } else if (eventInfo.scroll) {
		eventName = 'collection_scroll'
		eventProperty = eventInfo.scroll
	  }

	  let properties = null
	  if (eventProperty) {
		properties = {
		  [eventName]: eventProperty
		}
	  }
	  this.sendEvent({
		category: 'Collection',
		eventName,
		properties
	  })
	},
    addCurrentPage() {
      const filteredTraits = this.$store.state.filteredTraits
      const count = this.$store.state.countPage
      const element = document.body
      if (element.scrollHeight <= window.pageYOffset + window.innerHeight && (!filteredTraits && count * 48 === this.nftList.length || filteredTraits) && this.nftList.length > 0) {
        this.$store.commit('changeCountPage', count + 1)
		this.$store.commit('changeSortData', 'pagination')
		this.sendCollectionEvent({ scroll: `P${count + 1}` })
        this.$store.dispatch(this.activeRequest, filteredTraits)
      } else {
		this.sendCollectionEvent({ scroll: `P${count}` })
	  }
    },
    async fetchNftList() {
	  if (this.collection.collectionAddress) {
		this.loading = true
		await this.$store.dispatch('getBoxNftList')
		this.loading = false
	  }
    //   if (this.fetchEnabled) {
    //     await this.$store.dispatch(this.activeRequest, this.$store.state.filteredTraits)
    //   } else {
    //     this.$store.commit('setNewNftList', [])
    //   }
    },
    changeCollectionSetting(setting) {
      const collectionSetting = this.$store.state.collectionSetting
      this.$store.commit('updateCollectionSetting', {
        ...collectionSetting,
        ...setting
      })
    },
    changeMyNftFilter() {
      let sortMyNft = 'all'
      if (this.myNft) {
        switch (this.filter) {
          case 'All':
          case 'listed':
            sortMyNft = 'myNftAll'
            break;
          case 'bought':
            sortMyNft = 'myNftSold'
            break;
        }
      }

      if (this.address) {
        this.$store.commit('changeSortData', sortMyNft)
      }
      this.fetchNftList()
    },
    changeMyNftStatus() {
      this.myNft = !this.myNft
      if (this.isMultiNftCollection) return
      this.changeMyNftFilter()
      this.changeCollectionSetting({ myNft: this.myNft })
    }
  }
}
</script>
<style lang="scss">
.boxcollection {
  padding-bottom: 20rem;
  &__banner {
    width: 100%;
    height: 22.4rem;
    object-fit: cover;
  }
  &__bannerframe {
	width: 100%;
	height: 33rem;
	background: #F0F0F0;
  }
  &__content {
    position: relative;
    top: -7rem;
  }
  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    &-avatar, &-avatarframe {
      width: 12.6rem;
      height: 12.6rem;
      border-radius: 50%;
	}
	&-avatarframe {
	  background: #D9D9D9;
	}
	&-title-block {
	  width: 100%;
	  position: relative;
	}
    &-title {
      display: flex;
      align-items: center;
      justify-content: center;
	  flex-wrap: wrap;
	  padding-top: 2rem;
      span {
        margin-right: 1rem;
        white-space: nowrap;
      }
      img {
        width: 2rem;
        transform: translateY(.2rem);
      }
	}
	&-edit {
	  position: absolute;
	  right: 0;
	  bottom: 0;
	  display: flex;
	  align-items: center;
	  &-btn {
		width: 14.4rem;
		height: 3.6rem;
		background: $white;
		border: 1px solid $border;
		font-family: OpenSans-Medium;
		font-weight: 600;
		font-size: 1.4rem;
		margin-right: 1.6rem;
		text-align: center;
		font-family: OpenSans-Medium;
		font-weight: 600;
		font-size: 1.4rem;
	  }
	  &-dropdown {
		width: 3.6rem;
		height: 3.6rem;
		background: $white;
		text-align: center;
		border: 1px solid $border;
		border-radius: 50%;
	  }
	}
	&-mint {
	  position: absolute;
      left: 0;
      top: 10rem;
	  display: flex;
	  align-items: center;
	  margin-top: 1.6rem;
	  &-icon {
		width: 1.6rem;
		margin-right: 1rem;
	  }
	  &-link {
		font-weight: 600;
		font-size: 1.6rem;
		&:hover {
		  text-decoration: underline;
		}
	  }
	  &-description {
		font-size: 1.6rem;
		color: $grayLight;
		b {
		  margin: 0 0.8rem;
		  color: #000;
		}
	  }
	  &-tooltip {
		display: none;
		position: absolute;
		top: -0.4rem;
		left: 50%;
		transform: translate(-50%, -100%);
		background: rgba(0, 0, 0, 0.57);
		padding: 0.8rem;
		border-radius: 0.4rem;
		white-space: nowrap;
		font-size: 1.2rem;
		color: $white;
	  }
	  &:hover {
		.boxcollection__header-mint-tooltip {
		  display: block;
		}
	  }
	}
    &-socials {
      position: absolute;
      right: 0;
      top: 10rem;
      width: 17rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      :first-child {
        width: 2.1rem;
      }
      a {
        img {
          width: 2rem;
          cursor: pointer;
          &:hover {
            animation: shaking .5s;
          }
        }
      }
    }
    &-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 1.6rem;
      &-block {
        width: 14.6rem;
        height: 6.8rem;
        border: .1rem solid $lightGreen;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-right: 1rem;
        &-title {
          font-family: OpenSans-SemiBold;
          font-size: 1.6rem;
          display: flex;
          align-items: center;
          img {
            width: 1.6rem;
            margin-right: .6rem;
          }
        }
        &-subtitle {
          font-family: OpenSans-Regular;
          font-size: 1.4rem;
          margin-top: .4rem;
          img {
            width: 1.2rem;
          }
        }
      }
    }
    &-content {
      display: flex;
      justify-content: center;
      color: $grayLight;
      width: 65rem;
      padding-top: 1rem;
      letter-spacing: 0.03em;
	  font-family: OpenSans-Regular;
      font-weight: 400;
      font-size: 1.4rem;
    }
  }
  &__filter {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border: .1rem solid $modalColor;
    border-radius: 2.5rem;
    margin-top: 4rem;
    &-button {
      width: 42.6rem;
      height: 5.4rem;
      border-radius: 2.5rem;
      background: none;
      &-active {
        background: $lightGreen;
      }
    }
  }
  &__sort {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 3.2rem;
    &-button {
      width: 100%;
      height: 4rem;
      box-shadow: 0 .4rem 1.2rem rgba(0, 0, 0, 0.05);
      border-radius: .8rem;
      margin-right: 2.0rem;
      background: none;
      font-family: OpenSans-Regular;
      display: flex;
      align-items: center;
      justify-content: center;
      &:last-child {
        margin-right: 0;
      }
      img {
        margin-left: 1.2rem;
        width: 2rem;
      }
      &-active {
        background: $modalColor;
      }
      &-breakline {
        display: none;
      }
      &-title {
        line-height: 1;
      }
      &-icon {
        margin-left: 4px !important;
      }
      &-icon, &-badge {
        margin-left: 4px;
      }
      &-badge {
        display: flex;
        align-items: center;
        justify-content: center;
        background: $border;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        line-height: 1.1;
        font-weight: 600;
        font-size: 1.4rem;
        color: $white;
      }
    }
  }
  &__loading {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 20rem;
    img {
      width: 8rem;
      animation: loading 1s infinite;
    }
  }
  &__info {
    padding-top: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-nft {
      display: flex;
      align-items: center;
      &-search {
        width: 15.3rem !important;
        margin-right: 1.84rem;
        .search-box-input {
          width: calc(100% - 32px) !important;
          font-size: 1.4rem;
        }
      }
      &-filter {
        display: flex;
        align-items: center;
      }
      &-text {
        margin-right: 1.6rem;
      }
      &-switcher {
        width: 5.3rem;
        height: 2.6rem;
        background: $border2;
        border-radius: 1.55rem;
        position: relative;
        cursor: pointer;
        transition: .5s;
        &-element {
          position: absolute;
          left: .2rem;
          top: .2rem;
          background: $white;
          width: 2.2rem;
          height: 2.2rem;
          border-radius: 1.5rem;
          transition: .5s;
          &-active {
            left: 2.8rem;
          }
        }
        &-active {
          background: $green;
        }
      }
    }
  }
  &__items {
    display: grid;
    grid-template-columns: 20rem 20rem 20rem 20rem 20rem 20rem;
    grid-column-gap: 2.4rem;
    grid-row-gap: 3.2rem;
    padding-top: 6.4rem;
  }
  &__create {
	display: block;
	width: 20rem;
	height: 5.8rem;
	background: $pink;
	margin: 6.8rem auto 0;
	padding: 1.6rem 0;
	border-radius: 3rem;
	text-align: center;
	font-family: OpenSans-Bold;
	font-weight: 700;
	font-size: 1.6rem;
	color: $white;
  }
}
@media screen and (max-width: 460px) {
  .boxcollection {
	padding: 0 0.8rem 2rem;
    &__banner {
      height: 12rem;
    }
    &__content {
      top: -4.5rem;
    }
    &__header {
      &-avatar {
        width: 8rem;
        height: 8rem;
      }
      &-title {
        padding-top: 1.6rem;
		span {
		  font-family: OpenSans-SemiBold;
		  font-weight: 600;
		  font-size: 1.8rem;
		  white-space: normal;
		  text-align: center;
		}
		img {
		  display: none;
		}
      }
      &-subtitle {
        padding-top: .5rem;
	  }
	  &-block {
		display: flex;
		flex-direction: column-reverse;
		.boxcollection__header-mint {
		  position: relative;
		  top: 0;
		  margin: 0 auto;
		  padding-top: 1.2rem;
		  padding-bottom: 1rem;
		}
		.boxcollection__header-socials {
		  top: 14rem;
		  left: 50%;
		  transform: translateX(-50%);
		}
	  }
      &-info {
        width: 100%;
        padding-top: 6.2rem;
        flex-wrap: wrap;
        &-block {
          width: 14rem;
          height: 5.6rem;
          margin-bottom: .8rem;
          text-align: center;
          &-title {
            font-size: 1.4rem;
            justify-content: center;
            img {
              width: 1.6rem !important;
              margin-right: .8rem !important;
            }
          }
          &-subtitle {
            font-size: 1rem;
          }
          &:last-child {
            margin-right: 0;
          }
          &:nth-child(2), &:last-child {
            flex: 1;
            width: auto;
          }
        }
      }
      &-content {
        padding-top: 1rem;
        font-size: 1.4rem;
        text-align: left;
        width: auto;
      }
    }
    &__filter {
      margin-top: 2rem;
      &-button {
        font-size: 1.4rem;
      }
    }
    &__items {
      grid-template-columns: 14.4rem 14.4rem;
      grid-column-gap: 1.6rem;
      grid-row-gap: 1.6rem;
      padding-top: 2.2rem;
    }
    &__info {
      position: relative;
      padding-top: 6.3rem;
      .search-box {
        width: 100% !important;
        position: absolute;
        top: 1.6rem;
        left: 0;
        margin: 0;
      }
      &-items, &-nft-text {
        font-size: 1.4rem;
      }
    }
	&__create {
	  width: 18rem;
	  height: 3.6rem;
	  padding: 0.8rem 0;
	  margin-top: 5.4rem;
	  border-radius: 2.5rem;
	  font-family: OpenSans-SemiBold;
	  font-weight: 600;
	  font-size: 1.4rem;
	}
  }
}
@keyframes shaking {
  0% {
    transform: rotate(-10deg);
  }
  50% {
    transform: rotate(10deg);
  }
  100% {
    transform: rotate(-10deg);
  }
}
</style>
