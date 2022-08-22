<template>
  <section class="my-collection container-xl">
    <div class="my-collection-header" v-if="address">
	  <div class="my-collection-header-info">
		<div class="my-collection-header-avatar">
			<img :src="getCDNImage('earth.webp')" alt="earth">
		</div>
		<div class="my-collection-header-address">
			<h1 class="my-collection-header-address-highlight">{{ cuttenAddress }}</h1>
			<div class="my-collection-header-address-copy-box">
				<p class="my-collection-header-address-copy" :class="{ copied: addressCopied }" @click="copyAddress">{{ !addressCopied ? cuttenAddress : 'Copied!' }}</p>
				<ShareFrame class="my-collection-header-share" :class="{ copied: addressCopied }"/>
			</div>
		</div>
	  </div>
	  <a class="my-collection-header-tracker" :href="sharedTrackerUrl" v-if="linkShared">
		<img class="my-collection-header-tracker-img" :src="getCDNImage('carbon-tracker-gradient.svg')" alt="tracker">
		<p class="my-collection-header-tracker-name">Offset tracker</p>
	  </a>
    </div>
    <div class="my-collection__loading" v-if="!filteredNft && loading">
      <img :src="getCDNImage('loading-button.svg')" alt="load">
    </div>
    <div class="my-collection__empty" v-else-if="!filteredNft">
      <h3 class="my-collection__empty-title">You don't have NFT yet</h3>
      <button class="gradient-button my-collection__empty-button" @click="$router.push('/')">Buy</button>
    </div>
    <div class="my-collection-filters-container" v-if="filteredNft">
      <div class="my-collection-filters">
        <div class="my-collection-filters-item" @click="filter('all')" :class="{'my-collection-filters-item-active': activeFilter === 'all'}">
          <p class="my-collection-filters-item-text">All</p>
          <p class="my-collection-filters-item-content">{{ nftCount }}</p>
        </div>
        <div class="my-collection-filters-item" :class="{'my-collection-filters-item-active': activeFilter === 'sale'}" @click="filter('sale')" v-if="forSaleInfo > 0">
          <p class="my-collection-filters-item-text">For sale</p>
          <p class="my-collection-filters-item-content">{{ forSaleInfo }}</p>
        </div>
        <div class="my-collection-filters-item" :title="filterItem.name" :class="{'my-collection-filters-item-active': activeFilter === filterItem.contract}" :key="idx" @click="filter(filterItem.contract)" v-for="(filterItem, idx) in collectionFilters">
          <img class="my-collection-filters-item-image" :src="filterItem.image" :alt="filterItem.contract">
          <p class="my-collection-filters-item-content">{{ filterItem.count }}</p>
        </div>
      </div>
      <div class="my-collection-sort" v-if="activeFilter !== 'knoxnft'">
		<div class="my-collection-sort-buttons" v-if="activeFilter !== 'all'">
			<CustomSelect class="sort-select" :options="sortOptions" :selected="activePriceSort" @change="changeSort"/>
			<div class="my-collection-sort-buttons-box" :class="{ 'no-traits': !isTraitVisible }" v-if="activeFilter !== 'sale'">
			  	<button class="my-collection-sort-buttons-button" :class="{active: activeSort === 'mint-highest'}" @click="changeSort('mint-highest')">
					<span>Token ID</span>
					<img :src="getCDNImage('arrow-down.svg')" alt="down">
			  	</button>
				<button class="my-collection-sort-buttons-button" :class="{active: activeSort === 'mint-lowest'}" @click="changeSort('mint-lowest')">
					<span>Token ID</span>
				  	<img :src="getCDNImage('arrow-up.svg')" alt="up">
			  	</button>
				<button class="my-collection-sort-buttons-button" @click="showTrailtsModal" v-if="isTraitVisible">
					<span class="my-collection-sort-buttons-button-name">Traits</span>
				  	<img :src="getCDNImage('trait.svg')" alt="trait">
					<span class="my-collection-sort-buttons-button-bage" v-if="filtersCount">{{ filtersCount }}</span>
			  	</button>
			</div>
		</div>
        <div class="collection__info-nft-search search-box" :class="{ 'with-sort': activeFilter !== 'all' }">
          <input class="search-box-input" type="number" min="1" placeholder="Mint number" v-model="searchName" @input="searchNft">
          <img :src="getCDNImage('search.svg')" alt="search" class="search-box-img" v-if="!searchName">
          <img :src="getCDNImage('close-bold.svg')" alt="close" class="search-box-img icon-close" @click="clearSearch" v-else>
        </div>
      </div>
    </div>
    <p class="my-collection-collection-filter" v-if="activeFilter !== 'all' && activeFilter !== 'sale'">{{ currCollectionFilter }}</p>
    <div class="my-collection__items">
      <nft :nft="nft" :key="idx" :route="nftRoute(nft)" :seller="owner" :multiNft="isMultiNft(nft)" from="MyNFT" v-for="(nft, idx) of filteredNft" v-if="filteredNft" />
    </div>
	<TraitsFilterModal
      :show="showTraitsFilter"
      :mintCount="activeMintCount"
      :filtersCount="filtersCount"
      @updateFilter="updateTraitFilter"
      @close="showTraitsFilter = false"
      v-if="showTraitsFilter"
    />
  </section>
</template>
<script>
import _ from 'lodash'
import nft from '@/components/nft.vue'
import CustomSelect from '@/components/utility/CustomSelect.vue'
import ShareFrame from '@/components/ShareFrame.vue'
import TraitsFilterModal from '@/components/modals/traitsFilterModal'
export default {
  components: {
	CustomSelect,
	ShareFrame,
	TraitsFilterModal
  },
  data() {
    return {
      showTransfer: false,
      showPurchased: false,
	  loading: true,
	  addressCopied: false,
	  linkShared: false,
      listNft: [],
      collectionFilters: [],
      filteredNft: false,
	  activeFilter: 'all',
	  activeSort: null,
	  activePriceSort: null,
	  searchName: '',
      totalNftCount: 0,
	  saleNftCount: 0,
	  activeMintCount: 0,
	  showTraitsFilter: false,
	  traitFilters: null,
    }
  },
  beforeDestroy() {
	this.$store.commit('setSharedWallet', null)
    window.removeEventListener('scroll', this.handleDebouncedScroll)
  },
  async created() {
    if (process.browser) {
      this.showFixedFooter(true)
    }
	this.updateSharedWallet()
    if (this.address || this.linkShared) {
      this.reloadMyCollection()
    } else {
      this.listNft = []
      this.filteredNft = false
	}
	this.sendEvent({
	  category: 'Browse',
	  eventName: 'mynft'
	})
  },
  computed: {
	sharedWallet() {
	  return this.$store.state.sharedWallet
	},
    address() {
	  return this.$store.state.fullAddress
	},
	owner() {
	  return !this.$store.state.sharedWallet || (this.$store.state.sharedWallet && this.$store.state.fullAddress && this.$store.state.sharedWallet.toLowerCase() === this.$store.state.fullAddress.toLowerCase())
	},
	sharedTrackerUrl() {
	  return this.linkShared ? `/tracker?wallet=${this.sharedWallet}` : ''
	},
    cuttenAddress() {
	  const address = this.$store.state.fullAddress
	  if (address) {
		const startID = address.split("").slice(0, 6);
		const endID = address.split("").slice(-4);
		const dotArr = [".", ".", "."];
		return startID
		  .concat(dotArr)
		  .concat(endID)
		  .join("");
	  }
    },
    currCollectionFilter() {
      const filteredCollection = this.$store.state.collectionList.find(item => item.route === this.activeFilter)
      return filteredCollection?.name || ''
	},
	isTraitVisible() {
	  return !['sale', 'nomdom', 'knoxnft', 'CBCN'].includes(this.activeFilter)
	},
    nftCount() {
      return this.totalNftCount > this.listNft.length ? this.totalNftCount : this.listNft.length
    },
    forSaleInfo() {
      if (this.listNft) {
        const list = this.listNft
        const countListing = list.filter(item => item.market_status === 'LISTED')
        return this.saleNftCount > countListing.length ? this.saleNftCount : countListing.length
      } else {
        return 0
      }
    },
    successTransferToken() {
      return this.$store.state.successTransferToken
	},
	sortOptions() {
	  return [
		{ key: 'price-lowest', value: 'Lowest price' },
		{ key: 'price-highest', value: 'Highest price' }
	  ]
	},
	filtersCount() {
	  let sectionCount = 0
      this.$store.state.traitFilters.forEach(item => {
        const filteredValues = item.values.filter(filterItem => filterItem.checked)
        if (filteredValues.length > 0) {
          sectionCount++
        }
      })
      return sectionCount
    }
  },
  watch: {
	$route() {
      this.updateSharedWallet(true)
	},
	sharedWallet() {
	  if (this.linkShared) {
		this.reloadMyCollection()
	  }
    },
    address() {
	  if (!this.linkShared) {
		this.reloadMyCollection()
	  }
    },
    successTransfer() {
      if (this.$store.state.successTransferToken) {
        this.fetchMyCollection(false)
      }
    },
    filteredNft() {
      if (((process.browser && window.innerWidth > 1144 || window.innerWidth <= 460) || (this.filteredNft && this.filteredNft.length > 6)) && this.filteredNft?.length > 0) {
        this.showFixedFooter(false)
      } else {
        this.showFixedFooter(true)
      }
    }
  },
  mounted() {
	if (process && process.browser) {
	  this.handleDebouncedScroll = _.debounce(this.addCurrentPage, 100)
	  window.addEventListener('scroll', this.handleDebouncedScroll)
	}
  },
  methods: {
    isMultiNft(nft) {
      return this.$store.state.multiNftSymbols.includes(nft.nftSymbol)
    },
    copyAddress() {
	  if (this.addressCopied) return
      this.$copyText(this.address)
	  this.addressCopied = true
	  setTimeout(() => this.addressCopied = false, 1000)
    },
    async reloadMyCollection() {
      if (process.browser && !localStorage.getItem('move_back')) {
		this.$store.commit('setTraitFilters', [])
        await this.fetchMyCollection()
        this.loadNftCounts()
      } else {
        localStorage.removeItem('move_back')
        this.loading = true
        this.loadNftCounts()

        const collectionSetting = this.$store.state.collectionSetting
        if (collectionSetting?.myFilter) {
          await this.filter(collectionSetting.myFilter)
        } else {
          await this.fetchMyCollection()
        }

        this.loading = false
      }
    },
    nftRoute(nft) {
      if (!this.isMultiNft(nft)) {
        return `/collections/${nft.contract}/${nft.contract !== 'nomdom' ? nft.contract_id : nft.image}`
      } else {
        return `/collections/${nft.nftSymbol}/${nft.image.substring(nft.image.lastIndexOf('/') + 1).split('.')[0]}`
      }
    },
    showFixedFooter(show) {
      const footerEl = document.querySelector('.footer')
      if (show) {
        footerEl.classList.add('fixed')
      } else {
        footerEl.classList.remove('fixed')
      }
	},
	updateSharedWallet(routeChanged = true) {
		console.log('00000')
	  const oldLinkShared = this.linkShared
	  if (this.$route.query.wallet) {
		this.linkShared = true
		this.$store.commit('setSharedWallet', this.$route.query.wallet)
	  } else {
		this.linkShared = false
		this.$store.commit('setSharedWallet', null)
	  }
	  if (routeChanged && this.linkShared != oldLinkShared) {
		this.listNft = []
		this.filteredNft = false
		this.collectionFilters = []
	  }
	},
    async addMyCollection(isReplace = true) {
	  let traitFilterInfo = null
	  if (this.traitFilters && this.traitFilters.length > 0) {
		traitFilterInfo = {
		  traitFilters: this.traitFilters
		}
	  }
	  const result = await this.$store.dispatch('getGraphData', traitFilterInfo)
	  let newNftList = isReplace ? this.listNft : []
	  if (this.activeFilter !== 'all' && isReplace) {
		newNftList = this.filteredNft ? this.filteredNft : []
	  }
      for (let nft of result) {
        if (nft.contract !== 'nom') {
          newNftList.push({
            ...nft,
            price: nft.price / 1000
          })
        }
	  }
	  if (this.activeFilter === 'all' && isReplace) {
		this.listNft = newNftList
	  }
      this.filteredNft = JSON.parse(JSON.stringify(newNftList))
    },
    async fetchMyCollection(startLoading = true) {
	  this.$store.commit('changeCountPage', 1)
      if (!this.listNft.length || !startLoading) {
		this.loading = startLoading
		const filterExists = this.activeSort || this.searchName || this.traitFilters
		if (!filterExists) {
		  this.$store.commit('changeSortData', 'myNft')
		} else {
		  const searchValue = this.searchName ? parseInt(this.searchName) : null
		  this.$store.commit('changeMyCollectionSort', {
			filter: this.activeFilter,
			type: this.activeSort,
			mintNum: searchValue,
			traits: this.traitFilters
		  })
		}
        await this.addMyCollection(startLoading)
        this.loading = false
      }
    },
    async loadNftCounts() {
      this.totalNftCount = await this.$store.dispatch('getCollectionCountNft', 'all')
      this.saleNftCount = await this.$store.dispatch('getCollectionCountNft', 'sale')
      const newCollectionFilters = this.collectionFilters
      for (let collection of this.$store.state.collectionList) {
		const countInfo = await this.$store.dispatch('getCollectionCountNft', { nftSymbol: collection.route })
		const nftCount = countInfo.owned_count
		const mintCount = countInfo.mint_count
        if (nftCount > 0)  {
          const filterIndex = newCollectionFilters.findIndex(item => item.contract === collection.route)
          if (filterIndex >= 0) {
			newCollectionFilters[filterIndex].count = nftCount
			newCollectionFilters[filterIndex].mintCount = mintCount
          } else {
            newCollectionFilters.push({
              contract: collection.route,
              name: collection.name,
              image: this.getCDNImage(`${collection.route}.webp`),
			  count: nftCount,
			  mintCount
            })
          }
          this.collectionFilters = newCollectionFilters
        }
	  }
    },
    async addCurrentPage() {
      const count = this.$store.state.countPage
      const element = document.body
      if (element.scrollHeight <= window.pageYOffset + window.innerHeight && this.filteredNft && count * 48 === this.filteredNft.length) {
        this.$store.commit('changeCountPage', count + 1)
        this.$store.commit('changeSortData', 'pagination')
        await this.addMyCollection()
      }
    },
    async filter(payload) {
	  this.activeSort = null
	  this.activePriceSort = null
	  this.searchName = ''
	  this.traitFilters = null
	  this.$store.commit('setTraitFilters', [])
	  
      if (payload === 'all') {
        this.$store.commit('changeSortData', 'myNft')
        this.listNft = await this.$store.dispatch('getGraphData')
        this.listNft.map(item => item.price = item.price / 1000)
		this.filteredNft = JSON.parse(JSON.stringify(this.listNft))
		this.$store.commit('changeMyCollectionSort', null)
      } else {
        let filteredNftList = []
        let filterNftCount = 0
        if (payload === 'sale') {
          filteredNftList = this.listNft.filter(item => item.market_status === 'LISTED')
          filterNftCount = this.saleNftCount
        } else {
          filteredNftList = this.listNft.filter(item => item.contract === payload || item.nftSymbol === payload)
		  const filterCollection = this.collectionFilters.find(item => item.contract === payload)
          if (filterCollection) {
            filterNftCount = filterCollection.count
          }
        }
        if (filteredNftList.length === this.$store.state.countPage * 48 || (filteredNftList.length === filterNftCount && filterNftCount > 0)) {
		  this.filteredNft = filteredNftList
		  this.$store.commit('changeMyCollectionSort', null)
        } else {
          this.$store.commit('changeMyCollectionSort', { filter: payload })
          const newNftList = await this.$store.dispatch('getGraphData')
          newNftList.map(item => item.price = item.price / 1000)
          this.filteredNft = newNftList
		}
      }

      this.activeFilter = payload
      const collectionSetting = this.$store.state.collectionSetting
      this.$store.commit('updateCollectionSetting', {
        ...collectionSetting,
        myFilter: payload
	  })
	  if (this.isTraitVisible) {
		await this.$store.dispatch('loadTraitFilters', payload)
	  }
	},
	changePriceSort(sort) {
	  this.activePriceSort = sort
	  this.fetchMyCollection(false)
	},
	changeSort(sort) {
	  this.activeSort = sort
	  this.fetchMyCollection(false)
	},
	searchNft: _.debounce(function() {
	  if (this.searchName && parseInt(this.searchName) < 0) {
		this.searchName = ''
	  }
	  const searchValue = this.searchName ? parseInt(this.searchName) : null
	  this.$store.commit('changeMintNumFilter', searchValue)
	  this.fetchMyCollection(false)
	}, 500),
	clearSearch() {
	  this.searchName = ''
	  this.$store.commit('changeMintNumFilter', null)
      this.fetchMyCollection(false)
	},
	showTrailtsModal() {
	  const collectionFilter = this.collectionFilters.find(item => item.contract === this.activeFilter)
	  this.activeMintCount = collectionFilter ? collectionFilter.mintCount : 0
	  this.showTraitsFilter = true
	},
	async updateTraitFilter(filters, filteredCount) {
      this.traitFilters = filters
	  this.fetchMyCollection(false)
    },
    closeModal(payload) {
      this.showTransfer = payload
      this.showPurchased = payload
    }
  },
}
</script>
<style lang="scss">
.my-collection {
  display: flex;
  flex-direction: column;
  padding-top: 4.8rem;
  padding-bottom: 20rem;
  &-header {
    display: flex;
	align-items: flex-start;
	justify-content: space-between;
	&-info {
	  display: flex;
	  align-items: center;
	}
    &-avatar {
      width: 11.2rem;
      height: 11.2rem;
      border-radius: 50%;
      background: $white;
      margin-right: 1.6rem;
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
	  overflow: hidden;
	  img {
		width: 100%;
	  }
    }
    &-address {
	  margin-right: 0.8rem;
      &-highlight {
        background: linear-gradient(to right, #A90DEC, #3121E2, #1AB9EA);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-family: Cabin-Medium;
        font-weight: 500;
        font-size: 3.2rem;
	  }
	  &-copy-box {
		display: flex;
		align-items: center;
		margin-top: 1.6rem;
	  }
      &-copy {
        display: flex;
        align-items: center;
        width: fit-content;
        width: -moz-fit-content;
        background: $white;
		padding: 0.8rem 1.6rem;
		margin-right: 0.8rem;
        border-radius: 2.5rem;
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
        font-size: 1.6rem;
		cursor: pointer;
		&-copied {
		  color: $green;
		}
        img {
          width: 1.3rem;
          margin-left: 2rem;
        }
      }
	}
	&-tracker {
	  display: flex;
	  align-items: center;
	  &-img {
		width: 2.4rem;
		margin-right: 0.8rem;
	  }
	  &-name {
		font-weight: 600;
		font-size: 1.4rem;
		color: $textColor3;
	  }
	}
  }
  &__empty {
    padding-top: 6rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    &-button {
      margin-top: 2rem;
      width: 16.4rem;
      height: 5.4rem;
      cursor: pointer;
      &::after {
        border-radius: 2.5rem;
      }
    }
  }
  &__items {
    display: grid;
    grid-template-columns: 20rem 20rem 20rem 20rem 20rem 20rem;
    grid-column-gap: 2.4rem;
    grid-row-gap: 2.4rem;
    padding-top: 2.2rem;
  }
  &-filters-container {
    display: flex;
	justify-content: space-between;
	padding-top: 5.5rem;
	padding-bottom: 1rem;
  }
  &-filters {
    display: grid;
    align-self: flex-start;
    grid-template-columns: repeat(6, auto);
    grid-column-gap: 2rem;
	grid-row-gap: 1.6rem;
	padding-bottom: 0.5rem;
	overflow-x: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
    &-item {
      box-shadow: 0 .2rem .8rem rgba(0, 0, 0, 0.05);
      border-radius: 2rem;
      padding: 0 1.6rem 0 1rem;
      display: flex;
	  align-items: center;
	  width: fit-content;
      height: 3.2rem;
      cursor: pointer;
      transition: .3s;
      background: $white;
      position: relative;
      white-space: nowrap;
      &-nft {
        &:hover > .my-collection-filters-item-hover {
          display: block;
        }
      }
      &-hover {
        position: absolute;
        top: -4rem;
        left: 0;
        padding: .4rem 1.6rem;
        box-shadow: 0 .2rem .8rem rgba(0, 0, 0, 0.05);
        display: none;
      }
      &-active {
        background: $modalColor;
        transition: .3s;
      }
      &-image {
        width: 2.6rem;
        height: 2.6rem;
        border-radius: 50%;
      }
      &-content {
        margin-left: .8rem;
        color: $border;
      }
      &:hover {
        background: $modalColor;
        transition: .3s;
      }
    }
  }
  &-collection-filter {
    width: 100%;
    padding-top: 2.92rem;
    text-align: left;
    font-weight: 600;
    font-size: 1.6rem;
  }
  &-sort {
	display: flex;
	flex-direction: column;
    align-items: flex-end;
	&-buttons {
	  display: flex;
      justify-content: flex-end;
	  padding-bottom: 1.6rem;
	  &-box {
		display: grid;
		grid-template-columns: repeat(3, auto);
		grid-column-gap: 1.6rem;
		margin-left: 1.6rem;
		&.no-traits {
		  grid-template-columns: repeat(2, auto);
		}
	  }
	  &-button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 11.5rem;
		height: 4rem;
		background: $white;
		box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.05);
		border-radius: 0.8rem;
		&.active {
		  background: $lightGreen;
		}
		span {
		  margin-right: 0.7rem;
		  font-family: OpenSans-Regular;
		  font-size: 1.4rem;
		}
		img {
		  width: 1rem;
		}
		&-bage {
		  margin-left: 0.4rem;
		}
		&:nth-child(3) {
		  width: 11.3rem;
		  img {
			width: 2rem;
		  }
		}
	  }
	}
	.search-box {
	  width: 20rem !important;
	  margin: 0;
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
}
@media screen and (max-width: 460px) {
  .my-collection {
    padding-top: 1.6rem;
    &__items {
      grid-template-columns: 14.4rem 14.4rem;
      padding-top: 1.4rem;
    }
    &__title {
      font-family: inherit;
      font-weight: 600;
      font-size: 1.8rem;
    }
    &-collection-filter {
      padding-top: 2.4rem;
      font-size: 1.4rem;
	}
	&-header {
	  flex-direction: column;
      align-items: center;
	  &-info {
		flex-direction: column;
	  }
	  &-avatar {
		width: 8rem;
		height: 8rem;
		margin: 0.8rem 0 2.4rem;
	  }
	  &-address {
		width: 100%;
    	display: flex;
    	flex-direction: column;
    	align-items: center;
		&-highlight {
		  font-size: 2.2rem;
		}
		&-copy {
		  font-size: 1.4rem;
		  img {
			margin-left: 1rem;
		  }
		}
	  }
	  &-share {
		.dropdown-menu {
		  right: -6rem;
		}
		&.copied {
		  .dropdown-menu {
			right: -8rem;
		  }
		}
	  }
	  &-tracker {
		margin-top: 3rem;
		&-img {
		  width: 1.8rem;
		}
		&-name {
		  font-size: 1.4rem;
		}
	  }
	}
	&-filters-container {
	  display: block;
	  padding-top: 3.2rem;
	}
	&-filters {
	  display: flex;
	  grid-template-columns: auto;
	  grid-column-gap: 1.6rem;
	  padding-top: 2.4rem;
	}
	&-sort {
	  align-items: flex-start;
	  min-height: 4.2rem;
	  padding-top: 1rem;
      position: relative;
	  &-buttons {
		flex-direction: column-reverse;
		padding-bottom: 0;
		&-box {
		  margin-left: 0;
		  padding-bottom: 1.6rem;
		}
		&-button {
		  width: 10.4rem;
		  &:nth-child(3) {
			width: 6.4rem;
		  }
		  &-name {
			display: none;
		  }
		}
		.sort-select {
		  width: 14.4rem;
		}
	  }
	  .search-box {
		position: absolute;
		right: 0;
		bottom: 0;
		width: 100% !important;
		&.with-sort {
		  width: 14.4rem !important;
		}
	  }
	}
  }
}
</style>
