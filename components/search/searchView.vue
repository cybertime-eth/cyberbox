<template>
    <div class="search-view">
        <searchInput class="search-view__searchbox" @collectionSelected="$emit('close')" />
        <img class="search-view__close" src="/arrow-left.svg" alt="back" @click="$emit('close')" >
    </div>
</template>

<script>
import searchInput from '@/components/search/searchInput'
export default {
  components: {
    searchInput
  }
}
</script>

<style lang="scss">
.search-view {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $white;
  padding-top: 1rem;
  overflow-y: auto;
  z-index: 10;
  &__close {
    position: absolute;
    left: 1.4rem;
    top: 2.2rem;
    cursor: pointer;
  }

  @media(max-width: 460px) {
    .search-box {
      &-input {
        margin-left: 5.7rem;
        width: calc(100% - 9rem);
        padding-right: 0.7rem;
      }
      &-img {
        top: 13px;
        right: 2.8rem;
        transform: none;
        &.icon-close {
          top: 16px;
        }
      }
      &-dropdown {
        position: static;
        padding-top: 2.6rem;
        box-shadow: none;
        &-item {
          padding-left: 2.5rem;
          &-icon {
            width: 2.8rem;
            height: 2.8rem;
          }
          &-name {
            font-size: 1.6rem;
          }
        }
      }
      &-empty {
        display: block;
        padding-top: 5.2rem;
        text-align: center;
        font-size: 1.4rem;
        color: $grayLight;
      }
    }
  }
}
</style>

