<template>
  <section class="my-collection container-xl">
    <h1 class="my-collection__title">My collection</h1>
    <div class="my-collection__loading" v-if="!listNft.length && loading">
      <img src="/loading-button.svg" alt="load">
    </div>
    <div class="my-collection__empty" v-else-if="!listNft.length">
      <h3 class="my-collection__empty-title">You don't have NFT yet</h3>
      <button class="gradient-button my-collection__empty-button" @click="$router.push('/')">Buy</button>
    </div>
    <div class="my-collection-filters" v-if="listNft.length">
      <div class="my-collection-filters-item">
        <p class="my-collection-filters-item-text">All</p>
        <p class="my-collection-filters-item-content">{{ listNft.length }}</p>
      </div>
      <div class="my-collection-filters-item">
        <p class="my-collection-filters-item-text">For sale</p>
        <p class="my-collection-filters-item-content">1</p>
      </div>
      <div class="my-collection-filters-item">
        <img src="/daopolis-nft.png" alt="nft" class="my-collection-filters-item-image">
        <p class="my-collection-filters-item-content">3</p>
      </div>
      <div class="my-collection-filters-item">
        <img src="/punk-nft.png" alt="nft" class="my-collection-filters-item-image">
        <p class="my-collection-filters-item-content">1</p>
      </div>
    </div>
    <div class="my-collection__items" v-if="listNft.length">
      <nft :nft="nft" @click="$router.push(`/list-nft/${nft.edition}`)" v-for="nft of listNft" v-if="listNft" />
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
      loading: true
    }
  },
  async created() {
    if (!this.listNft.length) {
      await this.$store.dispatch('getCollectionNft')
      this.loading = false
    }
  },
  computed: {
    listNft() {
      return this.$store.state.myCollection
    }
  },
  methods: {
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
      grid-template-columns: 1fr;
    }
  }
}
</style>
