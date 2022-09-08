<template>
    <div class="profile-dropdown">
        <div class="dropdown-item" @click="gotoMyCollection">
            <div class="dropdown-item-profile">
                <img class="dropdown-item-profile-icon" src="/profile.svg">
                <h3 class="dropdown-item-profile-name">Profile</h3>
            </div>
            <img class="dropdown-item-arrow" src="/array-right-grey.svg">
        </div>
        <div class="dropdown-item address" @click="logout">
            <div class="dropdown-item-address">
                <div class="dropdown-item-address-balance">
                    <p class="dropdown-item-address-balance-name">Ballance</p>
                    <h3 class="dropdown-item-address-balance-celo">142 CELO</h3>
                </div>
                <div class="dropdown-item-address-info">
                    <p class="dropdown-item-address-info-wallet">0x029...2323</p>
                    <span class="dropdown-item-address-info-status"/>
                </div>
            </div>
            <img class="dropdown-item-arrow logout" src="/power-off.svg">
        </div>
        <a class="dropdown-item" target="_blank" href="https://app.ubeswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x471ece3750da237f93b8e339c536989b8978a438">
            <p class="dropdown-item-name">Buy CELO</p>
            <img class="dropdown-item-arrow" src="/array-right-grey.svg">
        </a>
        <a class="dropdown-item" href="/referral">
            <p class="dropdown-item-name">Referral</p>
            <img class="dropdown-item-arrow" src="/array-right-grey.svg">
        </a>
    </div>
</template>

<script>
export default {
  methods: {
    gotoMyCollection() {
      this.$router.push('/mycollection')
      this.$emit('onMyCollection')
    },
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-dropdown {
  .dropdown-item {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 2.1rem 0 !important;
    &:first-child {
      border-bottom: 1px solid $modalColor;
    }
    &.address {
      align-items: flex-start !important;
    }
    &-profile {
      display: flex;
      align-items: center;
      &-icon {
        width: 5.8rem;
        height: 5.8rem;
        margin-right: 1.6rem;
        border-radius: 50%;
        overflow: hidden;
      }
      &-name {
        font-weight: 600;
        font-size: 1.6rem;
      }
    }
    &-address {
      display: flex;
      &-balance {
        margin-right: 4.2rem;
        &-name {
          font-weight: 400;
          font-size: 1.6rem;
        }
        &-celo {
          margin-top: 1rem;
          font-weight: 600;
        }
      }
      &-info {
        display: flex;
        align-items: center;
        background: $modalColor;
        border-radius: 0.4rem;
        padding: 0.4rem 0.7rem;
        height: fit-content;
        &-wallet {
          margin-right: 0.8rem;
          font-size: 1.4rem;
          color: $grayDark;
        }
        &-status {
          display: block;
          width: 0.8rem;
          height: 0.8rem;
          background: $green;
          border-radius: 50%;
        }
      }
    }
    &-name {
      font-family: OpenSans-Regular;
      font-weight: 600;
      font-size: 1.6rem;
    }
    &-arrow {
      width: 1.2rem;
      &.logout {
        width: 1.8rem;
        margin-top: 0.6rem;
      }
    }
  }
}
</style>
