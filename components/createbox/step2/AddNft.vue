<template>
  <div class="add-nft">
    <h3 class="add-nft__crumbs" @click="routeBack">
      SSR <img src="/array-right.svg" alt="array"> <span>Add NFT</span>
    </h3>
    <div class="add-nft__navigation">
      <h3
        class="add-nft__navigation-link"
        :class="{'add-nft__navigation-link-active': activeWallet }"
        @click="activeWallet = true; activeCreateNft = false"
      >
        Wallet
      </h3>
      <h3
        class="add-nft__navigation-link"
        :class="{'add-nft__navigation-link-active': activeCreateNft }"
        @click="activeCreateNft = true; activeWallet = false"
      >
        Create NFT
      </h3>
    </div>
    <AddNftInBox v-if="activeWallet" />
    <CreateNftInBox v-if="activeCreateNft" />
  </div>
</template>
<script>
import AddNftInBox from './addNft/AddNftInBox'
import CreateNftInBox from './addNft/CreateNftInBox'
export default {
  data() {
    return {
      activeWallet: true,
      activeCreateNft: false
    }
  },
  methods: {
    routeBack() {
      this.$emit('changePage', false)
    }
  },
  components: {
    AddNftInBox,
    CreateNftInBox
  }
}
</script>
<style lang="scss">
.add-nft {
  padding-top: 5.5rem;
  &__crumbs {
    display: flex;
    align-items: center;
    color: $border;
    font-weight: 600;
    cursor: pointer;
    img {
      padding-left: 1.6rem;
      width: .7rem;
    }
    span {
      padding-left: 1.2rem;
      color: $pink;
      letter-spacing: 0.04em;
    }
  }
  &__navigation {
    display: flex;
    align-items: center;
    width: 100%;
    padding-bottom: 1.2rem;
    padding-top: 5rem;
    border-bottom: .1rem solid $modalColor;
    &-link {
      position: relative;
      margin-right: 2.7rem;
      letter-spacing: 0.04em;
      cursor: pointer;
      &-active {
        &::after {
          position: absolute;
          content: "";
          left: 0;
          right: 0;
          top: 3.4rem;
          bottom: 0;
          height: .1rem;
          width: 100%;
          background: linear-gradient(93.06deg, #FC2EF5 8.21%, #5489D8 50.57%, #2CFF64 100%);
        }
      }
    }
  }
}
</style>
