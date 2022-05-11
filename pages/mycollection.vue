<template>
  <section class="my-collection container-xl">
    <div class="my-collection-header">
      <div class="my-collection-header-avatar"></div>
      <div class="my-collection-header-address">
        <h1 class="my-collection-header-address-highlight">{{ cuttenAddress }}</h1>
        <p class="my-collection-header-address-copy" @click="copyAddress">{{ cuttenAddress }} <img src="/copy.svg" alt="copy"></p>
      </div>
    </div>
    <div class="my-collection__loading" v-if="!filteredNft && loading">
      <img src="/loading-button.svg" alt="load">
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
      <div class="my-collections-sort">
        <div class="collection__info-nft-search search-box">
          <input class="search-box-input" type="number" min="1" placeholder="Mint number" v-model="searchName" @input="searchNft">
          <img src="/search.svg" alt="search" class="search-box-img" v-if="!searchName">
          <img src="/close-bold.svg" alt="close" class="search-box-img icon-close" @click="clearSearch" v-else>
        </div>
      </div>
    </div>
    <p class="my-collection-collection-filter" v-if="activeFilter !== 'all' && activeFilter !== 'sale'">{{ currCollectionFilter }}</p>
    <div class="my-collection__items">
      <nft :nft="nft" :key="idx" :route="nftRoute(nft)" :seller="true" :multiNft="isMultiNft(nft)" v-for="(nft, idx) of filteredNft" v-if="filteredNft" />
    </div>
  </section>
</template>
<script>
import nft from '@/components/nft.vue'
export default {
  data() {
    return {
      showTransfer: false,
      showPurchased: false,
      loading: true,
      listNft: [],
      collectionFilters: [],
      filteredNft: false,
	  activeFilter: 'all',
	  searchName: '',
      totalNftCount: 0,
      saleNftCount: 0,
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.addCurrentPage)
  },
  async created() {
    if (process.browser) {
      this.showFixedFooter(true)
      window.addEventListener('scroll', this.addCurrentPage)
    }

    if (this.address) {
      this.reloadMyCollection()
    } else {
      this.listNft = []
      this.filteredNft = false
      this.loading = false
    }
  },
  computed: {
    address() {
      return this.$store.state.fullAddress
    },
    cuttenAddress() {
      const address = this.address
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
    }
  },
  watch: {
    address() {
      this.reloadMyCollection()
    },
    successTransfer() {
      if (this.$store.state.successTransferToken) {
        this.listNft = []
        this.fetchMyCollection()
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
  methods: {
    isMultiNft(nft) {
      return this.$store.state.multiNftSymbols.includes(nft.nftSymbol)
    },
    copyAddress() {
      this.$copyText(this.address)
      this.$store.commit('setMessage', 'Address copied!')
      setTimeout(() => {
        this.$store.commit('setMessage', '')
      }, 2000)
    },
    async reloadMyCollection() {
      if (!localStorage.getItem('move_back')) {
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
    async addMyCollection() {
      const result = await this.$store.dispatch('getGraphData')
      for (let nft of result) {
        if (nft.contract !== 'nom') {
          this.listNft.push({
            ...nft,
            price: nft.price / 1000
          })
        }
      }
      this.filteredNft = JSON.parse(JSON.stringify(this.listNft))
    },
    async fetchMyCollection() {
      this.$store.commit('changeCountPage', 1)
      if (!this.listNft.length) {
        this.loading = true
        this.$store.commit('changeSortData', 'myNft')
        await this.addMyCollection()
        this.loading = false
      }
    },
    async loadNftCounts() {
      this.totalNftCount = await this.$store.dispatch('getCollectionCountNft', 'all')
      this.saleNftCount = await this.$store.dispatch('getCollectionCountNft', 'sale')
      const newCollectionFilters = this.collectionFilters
      for (let collection of this.$store.state.collectionList) {
        const nftCount = await this.$store.dispatch('getCollectionCountNft', collection.route)
        if (nftCount > 0)  {
          const filterIndex = newCollectionFilters.findIndex(item => item.contract === collection.route)
          if (filterIndex >= 0) {
            newCollectionFilters[filterIndex].count = nftCount
          } else {
            newCollectionFilters.push({
              contract: collection.route,
              name: collection.name,
              image: `/${collection.route}.png`,
              count: nftCount
            })
          }
          this.collectionFilters = newCollectionFilters
        }
      }
    },
    async addCurrentPage() {
      const count = this.$store.state.countPage
      const element = document.body
      if (element.scrollHeight <= window.pageYOffset + window.innerHeight && count * 48 === this.listNft.length) {
        this.$store.commit('changeCountPage', count + 1)
        this.$store.commit('changeSortData', 'pagination')
        await this.addMyCollection()
      }
    },
    contractDaosLength(contract) {
      if (this.listNft) {
        const list = this.listNft
        const countListing = list.filter(item => item.contract === contract)
        return countListing.length
      }
    },
    async filter(payload) {
      if (payload === 'all') {
        this.$store.commit('changeSortData', 'myNft')
        this.listNft = await this.$store.dispatch('getGraphData')
        this.listNft.map(item => item.price = item.price / 1000)
        this.filteredNft = JSON.parse(JSON.stringify(this.listNft))
      } else {
        let filteredNftList = []
        let filterNftCount = 0
        if (payload === 'sale') {
          filteredNftList = this.listNft.filter(item => item.market_status === 'LISTED')
          filterNftCount = this.saleNftCount
        } else {
          filteredNftList = this.listNft.filter(item => item.contract === payload)
          const filterCollection = this.collectionFilters.find(item => item.contract === payload)
          if (filterCollection) {
            filterNftCount = filterCollection.count
          }
        }
        if (filteredNftList.length === this.$store.state.countPage * 48 || (filteredNftList.length === filterNftCount && filterNftCount > 0)) {
          this.filteredNft = filteredNftList
        } else {
          this.$store.commit('changeMyCollectionSort', payload)
          this.listNft = await this.$store.dispatch('getGraphData')
          this.listNft.map(item => item.price = item.price / 1000)
          this.filteredNft = JSON.parse(JSON.stringify(this.listNft))
        }
      }

      this.activeFilter = payload
      const collectionSetting = this.$store.state.collectionSetting
      this.$store.commit('updateCollectionSetting', {
        ...collectionSetting,
        myFilter: payload
      })
	},
	searchNft() {
	  
	},
	clearSearch() {
	  
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
    align-items: center;
    &-avatar {
      width: 11.2rem;
      height: 11.2rem;
      border-radius: 50%;
      background: $white;
      margin-right: 1.6rem;
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
    }
    &-address {
      &-highlight {
        background: linear-gradient(to right, #A90DEC, #3121E2, #1AB9EA);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-family: Cabin-Medium;
        font-weight: 500;
        font-size: 3.2rem;
      }
      &-copy {
        display: flex;
        align-items: center;
        width: fit-content;
        width: -moz-fit-content;
        background: $white;
        padding: 0.8rem 1.6rem;
        margin-top: 1.6rem;
        border-radius: 2.5rem;
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
        font-size: 1.6rem;
        cursor: pointer;
        img {
          width: 1.3rem;
          margin-left: 2rem;
        }
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
  }
  &-filters {
    display: grid;
    align-self: flex-start;
    grid-template-columns: repeat(6, 1fr);
    grid-column-gap: 2rem;
    grid-row-gap: 1.6rem;
    padding-top: 5.5rem;
    padding-bottom: 1rem;
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
    &-filters {
      padding-top: 2.4rem;
      &-item {
        margin-right: .8rem;
      }
    }
    &-collection-filter {
      padding-top: 2.4rem;
      font-size: 1.4rem;
    }
  }
}
</style>
