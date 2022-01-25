<template>
  <div class="attributes">
    <div class="attributes__block">
      <div class="attributes__block-header">
        <h3 class="attributes__block-header-title">Attributes <span>{{ item ? item.length : '' }}</span></h3>
        <img
          class="attributes__block-header-image"
          src="/attr-array.svg" alt="array"
          :class="showLeftAttributes ? 'array-down' : 'array-up'"
          @click="showLeftAttributes = !showLeftAttributes"
        >
      </div>
      <div class="attributes__block-content" v-if="showLeftAttributes">
        <div class="attributes__block-content-item" v-for="attribute of item">
          <h3 class="attributes__block-content-item-title">{{ attribute.trait_type }}</h3>
          <h3 class="attributes__block-content-item-subtitle">{{ attribute.value }}</h3>
        </div>
      </div>
    </div>
    <div class="attributes__block">
      <div class="attributes__block-header">
        <h3 class="attributes__block-header-title">Information</h3>
        <img
          class="attributes__block-header-image"
          src="/attr-array.svg" alt="array"
          :class="showRightAttributes ? 'array-down' : 'array-up'"
          @click="showRightAttributes = !showRightAttributes"
        >
      </div>
      <div class="attributes__block-content" v-if="showRightAttributes">
        <div class="attributes__block-content-item">
          <h3 class="attributes__block-content-item-title">Owned by</h3>
          <h3 class="attributes__block-content-item-subtitle">{{ cutAddress( info.owner) }}</h3>
        </div>
        <div class="attributes__block-content-item">
          <h3 class="attributes__block-content-item-title">Token ID</h3>
          <h3 class="attributes__block-content-item-subtitle">#{{ info.contract_id }}</h3>
        </div>
        <div class="attributes__block-content-item">
          <h3 class="attributes__block-content-item-title">Contract Address</h3>
          <a
            :href="`https://explorer.celo.org/address/${info.contract_address}`"
            target="_blank"
            class="attributes__block-content-item-subtitle"
          >
            {{ cutAddress(info.contract_address) }}
            <img src="/send.svg" alt="send">
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['item', 'info'],
  data() {
    return {
      showLeftAttributes: true,
      showRightAttributes: true,
      id: 0,
    }
  },
  methods: {
     cutAddress(address) {
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
  }
}
</script>
<style lang="scss">
.attributes {
  display: flex;
  justify-content: space-between;
  margin-top: 2.4rem;
  &__block {
    padding: 1.7rem 1.6rem .5rem;
    box-shadow: 0 .4rem 1.2rem rgba(0, 0, 0, 0.05);
    border-radius: .4rem;
    height: 100%;
    width: 53.6rem;
    &-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 1rem;
      &-title {
        font-family: OpenSans-SemiBold;
        span {
          margin-left: 1rem;
          background: $border;
          color: $white;
          border-radius: 50%;
          padding: .2rem .7rem;
          font-size: 1.4rem;
        }
      }
      &-image {
        width: 2.1rem;
        cursor: pointer;
      }
    }
    &-content {
      transition: 1s;
      &-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 2.6rem;
        &-title {
          font-family: OpenSans-Bold;
        }
        &-subtitle {
          font-family: OpenSans-Regular;
          display: flex;
          align-items: center;
          img {
            padding-left: 1rem;
            width: 2rem;
          }
        }

        &:nth-child(1) {
          padding-top: 2.5rem;
        }
      }
    }
  }
}
.array-up {
  transform: rotate(180deg);
  transition: .3s;
}
.array-down {
  transform: rotate(0deg);
  transition: .3s;
}
@media screen and (max-width: 460px) {
  .attributes {
    flex-direction: column;
    &__block {
      width: 26.4rem;
    }
  }
}
</style>
