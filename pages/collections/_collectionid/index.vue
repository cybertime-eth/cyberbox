<template>
  <section class="collection">
    <img :src="collection.banner" alt="banner" class="collection__banner">
    <div class="collection__content container-xl">
      <div class="collection__header">
        <img :src="collection.logo" alt="avatar" class="collection__header-avatar">
        <h1 class="collection__header-title" >{{ collection.name }} <img src="/confirmed.svg" alt="confirm"></h1>
        <p class="collection__header-subtitle">Collectibles</p>
        <div class="collection__header-socials">
          <a :href="collection.discord" target="_blank" v-if="collection.discord"><img src="/socials/disckord.svg" alt="social"></a>
          <a :href="collection.telegram" target="_blank" v-if="collection.telegram"><img src="/socials/telegram.svg" alt="social"></a>
          <a :href="collection.twitter" target="_blank" v-if="collection.twitter"><img src="/socials/twitter.svg" alt="social"></a>
          <a :href="collection.website" target="_blank" v-if="collection.website"><img src="/socials/web.svg" alt="social"></a>
        </div>
        <div class="collection__header-info">
          <div class="collection__header-info-block">
            <h3 class="collection__header-info-block-title">{{ collectionInfo.mint_count ? collectionInfo.mint_count : 0 }}</h3>
            <h3 class="collection__header-info-block-subtitle">Items</h3>
          </div>
          <div class="collection__header-info-block">
            <h3 class="collection__header-info-block-title"><img src="/celo.svg" alt="celo">{{ (collectionInfo.sell_total_price ? collectionInfo.sell_total_price / 1000 : 0).toFixed(2) }}</h3>
            <h3 class="collection__header-info-block-subtitle">Volume traded</h3>
          </div>
         <div class="collection__header-info-block">
           <h3 class="collection__header-info-block-title"><img src="/celo.svg" alt="celo">{{ floorPrice }}</h3>
           <h3 class="collection__header-info-block-subtitle">Floor price</h3>
         </div>
        </div>
        <h3 class="collection__header-content">
          {{ collection.description }}
        </h3>
      </div>
      <div class="collection__filter" @click="changeFilter">
        <button
          class="collection__filter-button"
          :class="{'collection__filter-button-active': filter === 'All'}"
          @click="filter = 'All'"
        >
          All
        </button>
        <button
          class="collection__filter-button"
          :class="{'collection__filter-button-active': filter === 'listed'}"
          @click="filter = 'listed'"
        >
          Listings
        </button>
        <button
          class="collection__filter-button"
          :class="{'collection__filter-button-active': filter === 'bought'}"
          @click="filter = 'bought'"
        >
          Sold
        </button>
      </div>
      <div class="collection__sort">
        <button
          class="collection__sort-button"
          :class="{'collection__sort-button-active': sort === 'mint-lowest'}"
          @click="changeSort('mint-lowest')"
        >
          <span>Mint<span class="collection__sort-button-delimiter"> - </span><br class="collection__sort-button-breakline"/>Lowest</span>
        </button>
        <button
          class="collection__sort-button"
          :class="{'collection__sort-button-active': sort === 'mint-highest'}"
          @click="changeSort('mint-highest')"
        >
          <span>Mint<span class="collection__sort-button-delimiter"> - </span><br class="collection__sort-button-breakline"/>Highest</span>
        </button>
        <button
          class="collection__sort-button"
          :class="{'collection__sort-button-active': sort === 'price-lowest'}"
          @click="changeSort('price-lowest')"
          v-if="filter !== 'All'"
        >
          <span>Price<span class="collection__sort-button-delimiter"> - </span><br class="collection__sort-button-breakline"/>Lowest</span>  
        </button>
        <button
          class="collection__sort-button"
          :class="{'collection__sort-button-active': sort === 'price-highest'}"
          @click="changeSort('price-highest')"
          v-if="filter !== 'All'"
        >
          <span>Price<span class="collection__sort-button-delimiter"> - </span><br class="collection__sort-button-breakline"/>Highest</span>
        </button>
      </div>
<!--      <attributesFilter />-->
      <div class="collection__info">
        <h3 class="collection__info-items">{{ countItems }} items</h3>
        <div class="collection__info-nft" @click="changeMyNftStatus">
          <h3 class="collection__info-nft-text">My NFTs</h3>
          <div class="collection__info-nft-switcher" :class="{'collection__info-nft-switcher-active': myNft}">
            <div class="collection__info-nft-switcher-element" :class="{'collection__info-nft-switcher-element-active': myNft}"></div>
          </div>
        </div>
      </div>
      <div class="collection__items" v-if="nftList.length">
        <nft :nft="nft" :key="index"  v-for="(nft, index) of nftList" :filter="filter" :owner="nftOwned(nft)" :seller="false" :route="`/collections/${nft.contract}/${nft.contract_id}`"/>
      </div>
      <p class="collection__empty-items" v-else>There are no results matching your selected criteria</p>
    </div>
  </section>
</template>
<script>
import nft from '@/components/nft.vue'
import attributesFilter from '@/components/modals/attributesFilter'
import {BigNumber} from 'ethers'
export default {
  data() {
    return {
      filter: 'All',
      activeRequest: 'getGraphData',
      sort: '',
      myNft: false,
      collectionInfo: {},
      floorPrice: '-'
    }
  },
  metaInfo() {
    return {
      meta: [{
        hid: 'description',
        property: 'description',
        content: this.getDescription()
      }, {
        hid: 'image',
        name: 'image',
        content: this.getDescription()
      }, {
        hid: 'og:description',
        name: 'og:description',
        content: this.getImageSrc()
      }, {
        hid: 'og:image',
				name: 'og:image',
        content: this.getImageSrc()
			}]
    }
  },
  components: {
    nft,
    attributesFilter
  },
  methods: {
    getDescription() {
      let description = ''
      switch (this.$route.params.collectionid) {
        case 'cpunk': description = 'CeloPunks is the first NFT Punks tribute on the Celo Blockchain. Only 10000 Punks will be minted with new and unique traits! Not affiliated with LarvaLabs'
          break
        case 'ctoadz': description = 'CeloToadz | First collection of 6969 randomly generated Toadz made up of more than 120 different traits on Celo Blockchain!'
          break
      }
      return description
		},
		getImageSrc() {
			let imageSrc = ''
      switch (this.$route.params.collectionid) {
        case 'cpunk': imageSrc = '/collections/Media_punks.png'
          break
        case 'ctoadz': imageSrc = '/collections/Media_toadz.png'
          break
      }
      return imageSrc
    },
    nftOwned(nft) {
      return nft.owner === this.$store.state.fullAddress
    },
    addCurrentPage() {
      if(process.browser) {
        const count = this.$store.state.countPage
        const element = document.body
        if (element.scrollHeight <= window.pageYOffset + window.innerHeight && count * 48 === this.nftList.length && this.nftList.length > 0) {
            this.$store.commit('changeCountPage', count + 1)
          this.$store.commit('changeSortData', 'pagination')
          this.$store.dispatch(this.activeRequest)
        }
      }
    },
    fetchNftList() {
      if (this.fetchEnabled) {
        this.$store.dispatch(this.activeRequest)
      } else {
        this.$store.commit('setNewNftList', [])
      }
    },
    changeCollectionSetting(setting) {
      const collectionSetting = this.$store.state.collectionSetting
      this.$store.commit('updateCollectionSetting', {
        ...collectionSetting,
        ...setting
      })
    },
    changeSort(id) {
      this.sort = id
      let sortPrefix = ''
      if (this.myNft) {
        if (this.address) {
          sortPrefix = 'myNft-'
        }
      }
      this.$store.commit('changeSortData', this.filter === 'bought' ? (sortPrefix + `${id}-sold`) : (sortPrefix + id))
      this.fetchNftList()
      this.changeCollectionSetting({ sort: id })
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
      this.changeMyNftFilter()
      this.changeCollectionSetting({ myNft: this.myNft })
    },
    changeFilter() {
      const filter = this.filter
      this.sort = '';
      this.$store.commit('setNewNftList', [])
      this.$store.commit('changeSortData', 'all')
      let activeRequest = 'getGraphData'
      switch (filter) {
        case 'All': activeRequest = 'getGraphData'
          break;
        case 'listed': activeRequest = 'getGraphDataListed'
          break;
        case 'bought': activeRequest = 'getGraphDataSells'
      }
      this.activeRequest = activeRequest
      if (this.myNft) {
        this.changeMyNftFilter()
      } else {
        this.$store.dispatch(activeRequest)
      }
      this.$store.commit('changeCountPage', 1)
      this.changeCollectionSetting({
        filter: this.filter,
        fetchRequest: activeRequest
      })
    },
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
    if (process.browser && localStorage.getItem('move_back')) {
      localStorage.removeItem('move_back')
      const collectionSetting = this.$store.state.collectionSetting
      this.activeRequest = collectionSetting.fetchRequest || this.activeRequest
      this.filter = collectionSetting.filter || this.filter
      this.sort = collectionSetting.sort || this.sort
      this.myNft = collectionSetting.myNft || this.myNft
    } else {
      this.$store.commit('updateCollectionSetting', null)
      this.$store.commit('changeCountPage', 1)
      this.$store.commit('changeSortData', 'all')
      await this.$store.dispatch(this.activeRequest)
    }
    const collectionResult = await this.$store.dispatch('getCollectionInfo')
    collectionResult ? this.collectionInfo = collectionResult : this.collectionInfo = {}
    this.floorPrice = await this.$store.dispatch('getFloorPrice', this.$route.params.collectionid)
  },
  computed: {
    countItems() {
      if (!this.myNft) {
        switch (this.filter) {
          case 'All': return this.collectionInfo.mint_count;
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
    collection() {
      return this.$store.state.collectionList.filter(item => item.route === this.$route.params.collectionid)[0]
    },
    address() {
      return this.$store.state.address
    },
    fetchEnabled() {
      return this.address || (!this.address && !this.myNft)
    }
  },
}
</script>
<style lang="scss">
.collection {
  padding-bottom: 20rem;
  &__banner {
    width: 100%;
    height: 22.4rem;
    object-fit: cover;
  }
  &__content {
    position: relative;
    top: -7rem;
  }
  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    &-avatar {
      width: 12.6rem;
      height: 12.6rem;
      border-radius: 50%;
      border: .2rem solid $white;
    }
    &-title {
      padding-top: 2rem;
      img {
        width: 2rem;
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
      padding-top: 2rem;
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
          display: flex;
          align-items: center;
          img {
            width: 1.6rem;
            margin-right: .6rem;
          }
        }
        &-subtitle {
          font-family: OpenSans-Regular;
          margin-top: .4rem;
        }
      }
    }
    &-content {
      color: $grayLight;
      text-align: center;
      width: 65rem;
      padding-top: 1rem;
      letter-spacing: 0.03em;
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
      background: none;
      font-family: OpenSans-Regular;
      display: flex;
      align-items: center;
      justify-content: center;
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
    padding-top: 3.2rem;
  }
  &__empty-items {
    padding: 36px 0;
    text-align: center;
    font-size: 14px;
  }
}
@media screen and (max-width: 460px) {
  .collection {
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
        padding-top: 1rem;
      }
      &-subtitle {
        padding-top: .5rem;
      }
      &-socials {
        top: 17rem;
        left: auto;
        right: auto;
        width: 15rem;
      }
      &-info {
        width: 100%;
        padding-top: 5.6rem;
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
        :first-child {
          width: 100%;
          margin-right: 0;
          text-align: center;
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
    &__sort {
      &-button {
        flex: 1;
        width: auto;
        height: 5.2rem;
        margin-right: .5rem;
        font-size: 1.3rem;
        &-delimiter {
          display: none;
        }
        &-breakline {
          display: inline-block;
        }
        &:last-child {
          margin: 0;
        }
      }
    }
    &__info {
      &-items, &-nft-text {
        font-size: 1.4rem;
      }
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
