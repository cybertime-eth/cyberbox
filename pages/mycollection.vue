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
        <p class="my-collection-filters-item-content">{{ listNft.length }}</p>
      </div>
      <div class="my-collection-filters-item" :class="{'my-collection-filters-item-active': activeFilter === 'sale'}" @click="filter('sale')">
        <p class="my-collection-filters-item-text">For sale</p>
        <p class="my-collection-filters-item-content">{{ forSaleInfo }}</p>
      </div>
<!--      <div class="my-collection-filters-item my-collection-filters-item-nft" :class="{'my-collection-filters-item-active': activeFilter === 'daos'}" @click="filter('daos')">-->
<!--        <img src="/daopolis-nft.png" alt="nft" class="my-collection-filters-item-image">-->
<!--        <p class="my-collection-filters-item-content">{{ contractDaosLength('daos') }}</p>-->
<!--        <h4 class="my-collection-filters-item-hover">Daopolis</h4>-->
<!--      </div>-->
<!--      <div class="my-collection-filters-item my-collection-filters-item-nft" :class="{'my-collection-filters-item-active': activeFilter === 'maos'}" @click="filter('maos')">-->
<!--        <img src="/default-avatar.png" alt="nft" class="my-collection-filters-item-image">-->
<!--        <p class="my-collection-filters-item-content">{{ contractDaosLength('maos') }}</p>-->
<!--        <h4 class="my-collection-filters-item-hover">Maos</h4>-->
<!--      </div>-->
    </div>
    <div class="my-collection__items">
      <nft :nft="nft" :key="idx" :route="`/collections/${nft.contract}/${nft.contract_id}`" :seller="true" v-for="(nft, idx) of filteredNft" v-if="filteredNft" />
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
      filteredNft: false,
      activeFilter: 'all'
    }
  },
  beforeMount() {
    if (process.browser) {
      window.addEventListener('scroll', this.addCurrentPage)
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.addCurrentPage)
  },
  async created() {
    this.$store.commit('changeCountPage', 1)
    if (!this.listNft.length) {
      this.$store.commit('changeSortData', 'myNft')
      const result = await this.$store.dispatch('getGraphData')
      for (let nft of result) {
        this.listNft.push({
          ...nft,
          price: nft.price / 1000
        })
      }
      this.filteredNft = this.listNft
      this.loading = false
    }
  },
  computed: {
    forSaleInfo() {
      if (this.listNft) {
        const list = this.listNft
        const countListing = list.filter(item => item.market_status === 'LISTED')
        return countListing.length
      }
    },
  },
  methods: {
    addCurrentPage() {
      if(process.browser) {
        const count = this.$store.state.countPage
        const element = document.body
        if (element.scrollHeight === window.pageYOffset + window.innerHeight && count * 48 === this.listNft.length) {
          this.$store.commit('changeCountPage', count + 1)
          this.$store.commit('changeSortData', 'pagination')
          this.$store.dispatch('getGraphData')
        }
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
      if (payload === 'sale') {
        this.filteredNft = this.listNft.filter(item => item.market_status === 'LISTED')
      } else if (payload === 'all') {
        this.$store.commit('changeSortData', 'myNft')
        this.filteredNft = await this.$store.dispatch('getGraphData')
      } else {
        this.filteredNft = this.listNft.filter(item => item.contract === payload)
      }
      this.activeFilter = payload
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
    padding-top: 3.2rem;
  }
  &-filters {
    display: flex;
    align-items: center;
    align-self: flex-start;
    padding-top: 5.5rem;
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
        border-radius: 1.5rem;
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
    &__items {
      grid-template-columns: 14.4rem 14.4rem;
    }
  }
}
</style>
