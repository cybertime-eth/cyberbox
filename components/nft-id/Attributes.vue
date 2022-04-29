<template>
  <div class="attributes">
    <div class="attributes__tab">
      <span class="attributes__tab-item" :class="{active: activeTab === 1}" @click="activeTab = 1" v-if="attributesVisible">Attributes</span>
      <span class="attributes__tab-item" :class="{active: activeTab === 2 || !attributesVisible}" @click="activeTab = 2">Info</span>
    </div>
    <div class="attributes__block" v-if="activeTab === 1 && attributesVisible">
      <div class="attributes__block-content" >
        <div class="attributes__block-content-item" v-if="item.length > 0 && info.rating_index">
          <h3 class="attributes__block-content-item-title">Rarity rank</h3>
          <h3 class="attributes__block-content-item-subtitle">{{ info.rating_index }}</h3>
        </div>
        <div class="attributes__block-content-item" :key="idx" v-for="(attribute, idx) of item">
          <h3 class="attributes__block-content-item-title">{{ attribute.trait_type }}</h3>
          <h3 class="attributes__block-content-item-subtitle">{{ attribute.value }}</h3>
        </div>
      </div>
    </div>
    <div class="attributes__block" v-else>
      <div class="attributes__block-content">
        <div class="attributes__block-content-item">
          <h3 class="attributes__block-content-item-title">Owned by</h3>
          <div class="attributes__block-content-item-address" @click="copyOwnerAddress">
            <h3 class="attributes__block-content-item-subtitle attributes__block-content-item-address-info">{{ cutAddress( info.owner) }}</h3>
            <img src="/copy.svg" alt="copy">
          </div>
        </div>
        <div class="attributes__block-content-item">
          <h3 class="attributes__block-content-item-title">Token ID</h3>
          <h3 class="attributes__block-content-item-subtitle">#{{ info.contract_id }}</h3>
        </div>
        <div class="attributes__block-content-item">
          <h3 class="attributes__block-content-item-title">Contract Address</h3>
          <a
            :href="`https://explorer.celo.org/address/${contractAddress}`"
            target="_blank"
            class="attributes__block-content-item-subtitle"
          >
            {{ cutAddress(contractAddress) }}
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
      id: 0,
      activeTab: 1
    }
  },
  computed: {
    contractAddress() {
      if (this.info.contract !== 'nomdom') {
        return this.info.contract_address
      } else {
        return this.$store.state.nomContractAddress
      }
    },
    attributesVisible() {
      return this.info.contract !== 'nomdom'
    }
  },
  methods: {
    copyOwnerAddress(e) {
      this.$copyText(this.info.owner)
      this.$store.commit('setMessage', 'Address copied!')
      setTimeout(() => {
        this.$store.commit('setMessage', '')
      }, 2000)
      e.preventDefault()
      e.stopPropagation()
    },
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
  padding: 3rem 0.8rem 0;
  margin-top: 1.6rem;
  box-shadow: 0 .4rem 1.2rem rgba(0, 0, 0, 0.05);
  &__tab {
    display: flex;
    align-items: center;
    border-bottom: 1px solid $modalColor;
    &-item {
      display: block;
      padding-bottom: 1.2rem;
      font-weight: 600;
      font-size: 1.6rem;
      color: $border;
      cursor: pointer;
      &.active {
        border-bottom: 1px solid $pink;
        color: $textColor;
        transform: translateY(1px);
      }
      &:last-child {
        padding-left: 2.4rem;
        padding-right: 2.4rem;
      }
    }
  }
  &__block {
    width: 100%;
    &:first-child {
      margin-right: 24px;
    }
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
      &-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 2.6rem;
        &-title {
          font-family: OpenSans-Bold;
        }
        &-address {
          display: flex;
          align-items: center;
          cursor: pointer;
          &-info {
            margin-right: 10px;
          }
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
    padding-left: 0;
    padding-right: 0;
    box-shadow: none;
    flex-direction: column;
    &__block {
      width: 26.4rem;
      margin: 0;
      &:first-child {
        margin: 0;
      }
    }
  }
}
</style>
