<template>
    <section id="notification">
        <div class="notification container-xl">
            <h1 class="notification__title">Notifications</h1>
            <div class="notification__tab">
                <p class="notification__tab-item" :class="{active: activeTab === 1}" @click="clickTab(1)">All</p>
                <p class="notification__tab-item" :class="{active: activeTab === 2}" @click="clickTab(2)">My activities</p>
            </div>
            <div class="notification__block" v-if="true">
                <div class="notification__list">
                    <h2 class="notification__list-date">April 2022</h2>
                    <div class="notification__list-items">
                        <div class="notification__list-item">
                            <div class="notification__list-item-avatar">
                                <div class="notification__list-item-avatar-box">
                                    <img src="/daos.png" alt="nft">
                                </div>
                                <span class="notification__list-item-type">
                                    <img src="/bookmark-filled.svg" alt="bookmark">
                                </span>
                            </div>
                            <div class="notification__list-item-info">
                                <h2 class="notification__list-item-info-name">Seloapes #1112</h2>
                                <p class="notification__list-item-info-status">
                                    Listed by <span class="notification__list-item-info-status-circle"/> <b>You</b> for <b>34 CELO</b>
                                </p>
                                <p class="notification__list-item-info-time">4 hour ago <img src="/share.svg" alt="share"></p>
                            </div>
                        </div>
                        <div class="notification__list-item">
                            <div class="notification__list-item-avatar">
                                <div class="notification__list-item-avatar-box">
                                    <img src="/daos.png" alt="nft">
                                </div>
                                <span class="notification__list-item-type sale">
                                    <img src="/sales-filled.svg" alt="bookmark">
                                </span>
                            </div>
                            <div class="notification__list-item-info">
                                <h2 class="notification__list-item-info-name">Seloapes #1112</h2>
                                <p class="notification__list-item-info-status">
                                    Sold to <span class="notification__list-item-info-status-circle other"/> <b>0x5cbd</b> for <b>34 CELO</b>
                                </p>
                                <p class="notification__list-item-info-time">4 hour ago <img src="/share.svg" alt="share"></p>
                            </div>
                        </div>
                        <div class="notification__list-item">
                            <div class="notification__list-item-avatar">
                                <div class="notification__list-item-avatar-box">
                                    <img src="/daos.png" alt="nft">
                                </div>
                                <span class="notification__list-item-type purchase">
                                    <img src="/check-filled.svg" alt="bookmark">
                                </span>
                            </div>
                            <div class="notification__list-item-info">
                                <h2 class="notification__list-item-info-name">Seloapes #1112</h2>
                                <p class="notification__list-item-info-status">
                                    Bought from <span class="notification__list-item-info-status-circle"/> <b>0x5cbd</b> for <b>34 CELO</b>
                                </p>
                                <p class="notification__list-item-info-time">4 hour ago <img src="/share.svg" alt="share"></p>
                            </div>
                        </div>
                        <div class="notification__list-item">
                            <div class="notification__list-item-avatar">
                                <div class="notification__list-item-avatar-box">
                                    <img src="/daos.png" alt="nft">
                                </div>
                                <span class="notification__list-item-type transmit">
                                    <img src="/transmit-filled.svg" alt="bookmark">
                                </span>
                            </div>
                            <div class="notification__list-item-info">
                                <h2 class="notification__list-item-info-name">Seloapes #1112</h2>
                                <p class="notification__list-item-info-status">
                                    Transfered from <span class="notification__list-item-info-status-circle"/> <b>You</b> to <span class="notification__list-item-info-status-circle other"/> <b>0x5cbd</b> for <b>34 CELO</b>
                                </p>
                                <p class="notification__list-item-info-time">4 hour ago <img src="/share.svg" alt="share"></p>
                            </div>
                        </div>
                        <div class="notification__list-item">
                            <div class="notification__list-item-avatar">
                                <div class="notification__list-item-avatar-box">
                                    <img src="/daos.png" alt="nft">
                                </div>
                                <span class="notification__list-item-type transmit">
                                    <img src="/transmit-filled.svg" alt="bookmark">
                                </span>
                            </div>
                            <div class="notification__list-item-info">
                                <h2 class="notification__list-item-info-name">Seloapes #1112</h2>
                                <p class="notification__list-item-info-status">
                                    Transfered from <span class="notification__list-item-info-status-circle other"/> <b>0x5cbd</b> to <span class="notification__list-item-info-status-circle"/> <b>You</b>
                                </p>
                                <p class="notification__list-item-info-time">4 hour ago <img src="/share.svg" alt="share"></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="notification__filter">
                    <h2 class="notification__filter-title">Filters</h2>
                    <div class="notification__filter-list">
                        <div class="notification__filter-item listing" :class="{active: activeFilter === 'listing'}" @click="changeFilter('listing')">
                            <img src="/bookmark.svg" alt="listing" v-if="activeFilter !== 'listing'"><img src="/bookmark-blue.svg" alt="listing" v-else>Listing
                        </div>
                        <div class="notification__filter-item purchase" :class="{active: activeFilter === 'purchase'}" @click="changeFilter('purchase')">
                            <img src="/checked-grey.svg" alt="purchase" v-if="activeFilter !== 'purchase'"><img src="/check-green.svg" alt="purchase" v-else>Purchase
                        </div>
                        <div class="notification__filter-item sales" :class="{active: activeFilter === 'sales'}" @click="changeFilter('sales')">
                            <img src="/sales.svg" alt="sales" v-if="activeFilter !== 'sales'"><img src="/sales-yellow.svg" alt="sales" v-else>Sales
                        </div>
                        <!-- <div class="notification__filter-item" :class="{active: activeFilter === 'offer'}" @click="changeFilter('offer')">
                            <img src="/broadcast.svg" alt="offer">Offers
                        </div> -->
                        <div class="notification__filter-item transfer" :class="{active: activeFilter === 'transfer'}" @click="changeFilter('transfer')">
                            <img src="/transmit.svg" alt="transfer" v-if="activeFilter !== 'transfer'"><img src="/transmit-purple.svg" alt="transfer" v-else>Transfer
                        </div>
                    </div>
                </div>
            </div>
            <p class="notification__empty" v-else>You don't have any action</p>
        </div>
    </section>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 1,
      activeFilter: null
    }
  },
  mounted() {
    const footerEl = document.querySelector('.footer')
    footerEl.classList.remove('fixed')
    document.body.style.overflow = 'visible'
  },
  methods: {
    clickTab(tab) {
      this.activeTab = tab
    },
    changeFilter(filter) {
      this.activeFilter = filter;
    }
  }
}
</script>
<style lang="scss" scoped>
.notification {
  padding-top: 4.8rem;
  padding-bottom: 8.3rem;
  max-width: 89.5rem;
  &__title {
    font-family: Cabin-Bold;
    font-size: 3.2rem;
    text-align: center;
  }
  &__tab {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 86rem;
    padding-top: 4.6rem;
    margin-left: 0.8rem;
    border-bottom: 1px solid $modalColor;
    &-item {
      padding-bottom: 1.2rem;
      font-family: OpenSans-SemiBold;
      font-weight: 600;
      font-size: 1.6rem;
      color: $border;
      transform: translateY(0.1rem);
      cursor: pointer;
      &.active {
        border-bottom: 1px solid $pink;
        color: $textColor;
      }
      &:last-child {
        margin-left: 2.4rem;
      }
    }
  }
  &__block {
    display: flex;
    padding-top: 3.7rem;
  }
  &__list {
    padding-bottom: 4.9rem;
    padding-right: 2.4rem;
    &-date {
      font-family: OpenSans-SemiBold;
      font-weight: 600;
      font-size: 1.6rem;
    }
    &-item {
      display: flex;
      align-items: center;
      width: 52rem;
      padding: 0.8rem;
      margin-top: 1.6rem;
      border: 1px solid $modalColor;
      border-radius: 4px;
      &:first-child {
        margin-top: 2.1rem;
      }
      &.unread {
        background: #FAFBFD;
      }
      &-avatar {
        position: relative;
        margin-right: 0.8rem;
        &-box {
          width: 4.8rem;
          height: 4.8rem;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 100%;
          }
        }
      }
      &-type {
        position: absolute;
        top: -0.4rem;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1.8rem;
        height: 1.8rem;
        background: #528FD2;
        border-radius: 50%;
        img {
          width: 0.9rem;
        }
        &.sale {
          background: $yellow;
        }
        &.purchase {
          background: $green;
          img {
            width: 100%;
          }
        }
        &.transmit {
          background: $purple; 
        }
      }
      &-info {
        &-name {
          font-family: OpenSans-SemiBold;
          font-weight: 600;
          font-size: 1.6rem;
        }
        &-status {
          margin-top: 0.4rem;
          font-size: 1.4rem;
          &-circle {
            display: inline-block;
            width: 1.6rem;
            height: 1.6rem;
            background: #528FD2;
            border-radius: 50%;
            transform: translateY(0.3rem);
            &.other {
              background: #C4C4C4;
            }
          }
        }
        &-time {
          margin-top: 0.4rem;
          font-size: 1.2rem;
          color: $border;
          img {
            width: 1.2rem;
            transform: translateY(0.1rem);
          }
        }
      }
    }
  }
  &__filter {
    position: sticky;
    position: -webkit-sticky;
    position: sticky;
    top: 1rem;
    align-self: flex-start;
    &-title {
      padding-bottom: 1.6rem;
      font-family: OpenSans-SemiBold;
      font-weight: 600;
      font-size: 1.4rem;
    }
    &-list {
      display: flex;
      flex-wrap: wrap;
    }
    &-item {
      display: flex;
      align-items: center;
      padding: 0.6rem 1.6rem;
      margin-right: 1.6rem;
      margin-bottom: 0.9rem;
      border: 1px solid $modalColor;
      font-size: 1.4rem;
      cursor: pointer;
      &.active {
        border-color: transparent;
        &.listing {
          background: #E4F1FF;
        }
        &.purchase {
          background: $lightGreen;
          img {
            width: 100%;
          }
        }
        &.sales {
          background: #FFF1D2;
        }
        &.transfer {
          background: #F0E2FF;
        }
      }
      &:nth-child(3) {
        margin-right: 0;
      }
      img {
        width: 1.3rem;
        margin-right: 0.6rem;
      }
    }
  }
  &__empty {
    padding: 5.6rem 0;
    text-align: center;
    font-size: 1.6rem;
    color: $grayLight;
  }

  @media (max-width: 530px) {
    padding-top: 2.5rem;
    &__title {
      font-size: 1.8rem;
    }
    &__tab {
      padding-top: 3rem;
      margin: 0;
    }
    &__block {
      padding-top: 2.4rem;
      flex-direction: column-reverse;
    }
    &__filter {
      position: static;;
      &-item {
        margin-right: 0.8rem;
        &:nth-child(2) {
          padding: 0.6rem;
        }
        &:nth-child(3) {
          flex: 1;
          margin-right: 0.8rem;
        }
      }
    }
    &__list {
      padding-top: 2.4rem;
      &:first-child {
        padding-top: 3.5rem;
      }
      &-item {
        width: 100%;
        &-avatar {
          &-box {
            width: 4rem;
            height: 4rem;
          }
        }
        &-type {
          width: 1.6rem;
          height: 1.6rem;
          &.sale {
            img {
              transform: translateX(-0.1rem);
            }
          }
        }
        &-info {
          &-name {
            font-size: 1.4rem;
          }
          &-status {
            font-size: 1.2rem;
            &-circle {
              width: 1.4rem;
              height: 1.4rem;
            }
          }
        }
      }
    }
  }
}
</style>