<template>
  <section class="my-collection container-xl">
    <h1 class="my-collection__title">My collection</h1>
    <div class="my-collection__loading" v-if="!filteredNft && loading">
      <img src="/loading-button.svg" alt="load">
    </div>
    <div class="my-collection__empty" v-else-if="!filteredNft">
      <h3 class="my-collection__empty-title">You don't have NFT yet</h3>
      <button class="gradient-button my-collection__empty-button" @click="$router.push('/')">Buy</button>
    </div>
    <div class="my-collection-filters" v-if="filteredNft">
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
    <p class="my-collection-collection-filter" v-if="activeFilter !== 'all' && activeFilter !== 'sale'">{{ currCollectionFilter }}</p>
    <div class="my-collection__items">
      <nft :nft="nft" :key="idx" :route="`/collections/${nft.contract}/${routeNftId(nft)}`" :seller="true" v-for="(nft, idx) of filteredNft" v-if="filteredNft" />
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
      totalNftCount: 0,
      saleNftCount: 0
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
        }

        this.loading = false
      }
    },
    routeNftId(nft) {
      return nft.contract !== 'nomdom' ? nft.contract_id : nft.image
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
      this.filteredNft = this.listNft
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
        if (nftCount > 0) {
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
        this.filteredNft = this.listNft
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
          this.filteredNft = this.listNft
        }
      }

      this.activeFilter = payload
      const collectionSetting = this.$store.state.collectionSetting
      this.$store.commit('updateCollectionSetting', {
        ...collectionSetting,
        myFilter: payload
      })
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
  align-items: center;
  flex-direction: column;
  padding-top: 4.2rem;
  padding-bottom: 20rem;
  &__title {
    font-family: Cabin-Bold;
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
  &-filters {
    display: flex;
    align-items: center;
    align-self: flex-start;
    padding-top: 5.5rem;
    padding-bottom: 1rem;
    width: 100%;
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
      margin-right: 2rem;
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
