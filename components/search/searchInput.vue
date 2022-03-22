<template>
    <div class="search-box">
        <input class="search-box-input" placeholder="Search collections" v-model="searchName" @input="searchCollection">
        <img src="/search.svg" alt="search" class="search-box-img" v-if="!searchName">
        <img src="/close-bold.svg" alt="close" class="search-box-img icon-close" @click="clearSearch" v-else>
        <div class="search-box-dropdown" v-if="filteredCollections.length > 0">
            <div class="search-box-dropdown-item" :key="idx" v-for="(collection, idx) in filteredCollections" @click="showCollectionPage(collection)">
            <img :src="collection.logo" class="search-box-dropdown-item-icon">
            <span class="search-box-dropdown-item-name">{{ collection.name }}</span>
            </div>
        </div>
        <p class="search-box-empty" v-if="!searchName">Search collections</p>
    </div>
</template>

<script>
export default {
  data() {
    return {
      searchName: '',
      filteredCollections: []
    }
  },
  methods: {
    searchCollection() {
      const search = this.searchName
      if (search.length >= 3) {
        this.filteredCollections = this.$store.state.collectionList.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
      } else {
        this.filteredCollections = []
      }
    },
    showCollectionPage(collection) {
      this.clearSearch()
      this.$router.push(`/collections/${collection.route}`)
      this.$emit('collectionSelected')
    },
    clearSearch() {
      this.searchName = ''
      this.filteredCollections = []
    },
  }
}
</script>

<style lang="scss">
.search-box {
  position: relative;
  &-input {
    width: calc(100% - 32px);
    height: 1.53rem;
    padding: 12px 16px;
    border: 1px solid $border2;
    border-radius: 25px;
    font-size: 1.07rem;
    &:focus {
      box-shadow: 0 0 5px $border2;
    }
  }
  &-img {
    position: absolute;
    top: 50%;
    right: 1.23rem;
    width: 1.53rem;
    transform: translateY(-50%);
    &.icon-close {
      width: 1.07rem;
      cursor: pointer;
    }
  }
  &-dropdown {
    position: absolute;
    top: 100%;
    left: 0%;
    right: 0;
    background: $white;
    padding: 9px 0;
    border-radius: 2px;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.25);
    &-item {
      display: flex;
      align-items: center;
      padding: 8px 16px;
      cursor: pointer;
      &:hover {
        background: rgba(0, 0, 0, 0.04);
      }
      &-icon {
        width: 2.15rem;
        height: 2.15rem;
        border-radius: 50%;
      }
      &-name {
        margin-left: 10px;
        font-size: 1.23rem;
      }
    }
  }
  &-empty {
    display: none;
  }
}
</style>
