<template>
    <section id="notification">
        <div class="notification container-xl">
            <h1 class="notification__title">Notifications</h1>
            <div class="notification__tab">
                <p class="notification__tab-item" :class="{active: activeTab === 1}" @click="clickTab(1)">All</p>
                <p class="notification__tab-item" :class="{active: activeTab === 2}" @click="clickTab(2)">My activities</p>
            </div>
            <div class="notification__block" v-if="filteredList.length > 0">
                <div class="notification__list-container">
                    <div class="notification__list" :key="idx" v-for="(info, idx) of filteredList">
                        <h2 class="notification__list-date">{{ notificationDate(info.date) }}</h2>
                        <div class="notification__list-items">
                            <div class="notification__list-item" :class="{unread: !item.read}" :key="lidx" v-for="(item, lidx) of info.items">
                                <div class="notification__list-item-avatar">
                                    <div class="notification__list-item-avatar-box">
                                        <img :src="item.image" alt="nft">
                                    </div>
                                    <span class="notification__list-item-type" :class="{[notificationType(item)]: true}">
                                        <img :src="notificationIcon(item)" alt="icon">
                                    </span>
                                </div>
                                <div class="notification__list-item-info">
                                    <h2 class="notification__list-item-info-name">{{ item.name }}</h2>
                                    <p class="notification__list-item-info-status" v-if="item.type === 'LISTED'">
                                        Listed by <span class="notification__list-item-info-status-circle"/> <b>You</b> for <b>{{ item.price }} CELO</b>
                                    </p>
                                    <p class="notification__list-item-info-status" v-if="item.type === 'SOLD'">
                                        Sold to <span class="notification__list-item-info-status-circle other"/> <b>{{ item.seller }}</b> for <b>{{ item.price }} CELO</b>
                                    </p>
                                    <p class="notification__list-item-info-status" v-if="item.type === 'BOUGHT'">
                                        Bought from <span class="notification__list-item-info-status-circle"/> <b>{{ item.seller }}</b> for <b>{{ item.price }} CELO</b>
                                    </p>
                                    <p class="notification__list-item-info-status" v-if="item.type === 'TRANSFERED' && !item.owned">
                                        Transfered from <span class="notification__list-item-info-status-circle"/> <b>You</b> to <span class="notification__list-item-info-status-circle other"/> <b>{{ item.receiver }}</b>
                                    </p>
                                    <p class="notification__list-item-info-status" v-if="item.type === 'TRANSFERED' && item.owned">
                                        Transfered from <span class="notification__list-item-info-status-circle other"/> <b>{{ item.sender }}</b> to <span class="notification__list-item-info-status-circle"/> <b>You</b>
                                    </p>
                                    <p class="notification__list-item-info-time">4 hour ago <img src="/share.svg" alt="share"></p>
                                </div>
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
      activeFilter: null,
      filteredList: []
    }
  },
  computed: {
    notifications() {
      return this.$store.state.notificationList
    }
  },
  mounted() {
    document.body.style.overflow = 'visible'
    this.initNotifications()
  },
  watch: {
    notifications() {
      this.initNotifications()
    }
  },
  methods: {
    initNotifications() {
      let count = 0
      const list = this.notifications
      list.forEach(info => {
        count += info.items.filter(item => !item.read).length
      })
      this.filteredList = [
        ...this.notifications
      ]

      if (count > 0) {
        setTimeout(() => {
          list.map(info => info.items.map(item => item.read = true))
          this.$store.commit('setNotificationList', list)
          this.filteredList = list
        }, 3000)
      }

      this.updateFooter()
    },
    updateFooter() {
      const footerEl = document.querySelector('.footer')
      if (this.filteredList.length > 0) {
        footerEl.classList.remove('fixed')
      } else {
        footerEl.classList.add('fixed')
      }
    },
    notificationDate(datetime) {
      const date = new Date(datetime)
      const year = date.getFullYear()
      const month = date.toLocaleString('default', { month: 'long' })
      return `${month} ${year}`
    },
    notificationType(notification) {
      switch(notification.type) {
        case 'SOLD': return 'sale'
            break
        case 'BOUGHT': return 'purchase'
            break
        case 'TRANSFERED': return 'transmit'
            break
        default: return ''
            break
      }
    },
    notificationIcon(notification) {
      switch(notification.type) {
        case 'SOLD': return '/sales-filled.svg'
            break
        case 'BOUGHT': return '/check-filled.svg'
            break
        case 'TRANSFERED': return '/transmit-filled.svg'
            break
        default: return '/bookmark-filled.svg'
            break
      }
    },
    clickTab(tab) {
      this.activeTab = tab
    },
    changeFilter(filter) {
      this.activeFilter = filter;
      let type = ''
      switch(filter) {
        case 'sale': type = 'SOLD'
            break
        case 'purchase': type = 'BOUGHT'
            break
        case 'transmit': type = 'TRANSFERED'
            break
        default: type = 'LISTED'
            break
      }
      this.filteredList = this.notifications.filter(info => info.items.filter(item => item.type === type).length > 0)
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

  &__list-container {
    padding-right: 2.4rem;
    .notification__list:first-child {
      padding-top: 0;
    }
  }
  &__list {
    padding-top: 4.9rem;
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
          img {
            transform: translateX(-0.1rem);
          }
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