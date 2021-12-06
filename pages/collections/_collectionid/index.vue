<template>
  <section class="collection">
    <img src="/CeloPunks.png" alt="banner" class="collection__banner">
    <div class="collection__content container-xl">
      <div class="collection__header">
        <img src="/avatar-punks.png" alt="avatar" class="collection__header-avatar">
        <h1 class="collection__header-title" >CeloPunks</h1>
        <p class="collection__header-subtitle">Collectibes</p>
        <div class="collection__header-socials">
          <img src="/socials/disckord.svg" alt="social">
          <img src="/socials/telegram.svg" alt="social">
          <img src="/socials/twitter.svg" alt="social">
          <img src="/socials/web.svg" alt="social">
        </div>
        <div class="collection__header-info">
          <div class="collection__header-info-block" data-aos="fade-right">
            <h3 class="collection__header-info-block-title">{{ collectionInfo.mint_count }}</h3>
            <h3 class="collection__header-info-block-subtitle">Items</h3>
          </div>
          <div class="collection__header-info-block" data-aos="fade-right">
            <h3 class="collection__header-info-block-title">5.0K</h3>
            <h3 class="collection__header-info-block-subtitle">Owners</h3>
          </div>
          <div class="collection__header-info-block" data-aos="fade-left">
            <h3 class="collection__header-info-block-title">{{ collectionInfo.sell_total_price }} CELO</h3>
            <h3 class="collection__header-info-block-subtitle">Volume traded</h3>
          </div>
          <div class="collection__header-info-block"  data-aos="fade-left">
            <h3 class="collection__header-info-block-title">{{ collectionInfo.sell_max_price }} CELO</h3>
            <h3 class="collection__header-info-block-subtitle">Floor price</h3>
          </div>
        </div>
        <h3 class="collection__header-content" data-aos="fade-up">
          This NFT is part of DAOS
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
          :class="{'collection__sort-button-active': sort === 'price-lowest'}"
          @click="changeSort('price-lowest')"
          v-if="filter !== 'All'"
        >
          Price - Lowest
        </button>
        <button
          class="collection__sort-button"
          :class="{'collection__sort-button-active': sort === 'mint-lowest'}"
          @click="changeSort('mint-lowest')"
          v-if="filter === 'All'"
        >
          Mint - Lowest
        </button>
        <button
          class="collection__sort-button"
          :class="{'collection__sort-button-active': sort === 'price-highest'}"
          @click="changeSort('price-highest')"
          v-if="filter !== 'All'"
        >
          Price - Highest
        </button>
        <button
          class="collection__sort-button"
          :class="{'collection__sort-button-active': sort === 'mint-highest'}"
          @click="changeSort('mint-highest')"
          v-if="filter === 'All'"
        >
          Mint - Highest
        </button>
        <button
          class="collection__sort-button"
          :class="{'collection__sort-button-active': sort === 'rarity-rare'}"
          @click="changeSort('rarity-rare')"
        >
          Rarity - Rare
        </button>
        <button
          class="collection__sort-button"
          :class="{'collection__sort-button-active': sort === 'rarity-common'}"
          @click="changeSort('rarity-common')"
        >
          Rarity - Common
        </button>
        <button
          class="collection__sort-button"
          :class="{'collection__sort-button-active': sort === 'traits'}"
          @click="changeSort('traits')"
        >
          Traits
          <img src="/sort.svg" alt="sort">
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
      <div class="collection__items">
        <nft :nft="nft" v-for="nft of nftList" :seller="false" :route="`/collections/${nft.contract}/${nft.contract_id}`"/>
      </div>
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
      sort: '',
      myNft: false,
      collectionInfo: {}
    }
  },
  components: {
    nft,
    attributesFilter
  },
  methods: {
    addCurrentPage() {
      if(process.browser) {
        const count = this.$store.state.countPage
        const element = document.body
        if (element.scrollHeight === window.pageYOffset + window.innerHeight && this.$route.fullPath === '/collections/' + this.$route.params.collectionid && this.filter === 'All') {
          this.$store.commit('changeCountPage', count + 1)
          this.$store.dispatch('getGraphData', 'pagination')
        }
      }
    },
    changeSort(id) {
      this.sort = id
      this.$store.dispatch('getGraphData', id)
    },
    changeMyNftStatus() {
      this.myNft = !this.myNft
      this.$store.dispatch('getGraphData', this.myNft ? 'myNft' + this.filter : this.filter)
    },
    changeFilter() {
      this.$store.dispatch('getGraphData', this.myNft ? 'myNft' + this.filter : this.filter)
    },
  },
  async created() {
    await this.$store.dispatch('getGraphData')
    this.collectionInfo = await this.$store.dispatch('getCollectionInfo')

    if (process.browser) {
      addEventListener('scroll', this.addCurrentPage)
    }

  },
  computed: {
    countItems() {
      switch (this.filter) {
        case 'All': return this.collectionInfo.mint_count;
        case 'listed': return this.collectionInfo.sell_count;
      }
    },
    nftList() {
      return this.$store.state.nftList
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
    }
    &-title {
      padding-top: 2rem;
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
      img {
        width: 2rem;
        cursor: pointer;
        &:hover {
          animation: shaking .5s;
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
      width: 31.5rem;
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
        padding-top: 5.6rem;
        flex-wrap: wrap;
        &-block {
          width: 14rem;
          height: 5.6rem;
          margin-bottom: .8rem;
          &-title {
            font-size: 1.4rem;
          }
          &-subtitle {
            font-size: 1rem;
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
    &__item {
      width: 14.4rem;
      height: 32.8rem;
      &-image {
        width: 14.4rem;
        height: 14.4rem;
      }
      &-info {
        padding: .5rem 0.8rem 3.4rem;
        &-details {
          margin-top: 1rem;
          width: 100%;
        }
        &-price {
          &-null {
            font-size: 1.4rem;
          }
          &-text {
            font-size: 1.4rem;
          }
        }
        &-id {
          padding-bottom: 1rem;
        }
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
