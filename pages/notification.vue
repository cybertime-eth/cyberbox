<template>
    <section id="notification">
        <div class="notification container-xl">
            <h1 class="notification__title">Notifications</h1>
            <div class="notification__block" :class="{ fixed: filterFixed }" v-if="filteredList.length > 0">
                <div class="notification__list-container">
                    <div class="notification__list" :key="idx" v-for="(info, idx) of filteredList" v-if="info.items.length > 0">
                        <h2 class="notification__list-date">{{ notificationDate(info.date) }}</h2>
                        <div class="notification__list-items">
                            <div class="notification__list-item" :class="{unread: !item.read}" :key="lidx" v-for="(item, lidx) of info.items">
                                <div class="notification__list-item-avatar">
                                    <div class="notification__list-item-avatar-box">
                                        <img :src="notificationImage(item)" alt="nft">
                                    </div>
                                    <span class="notification__list-item-type" :class="{[notificationType(item)]: true}">
                                        <img :src="notificationIcon(item)" alt="icon">
                                    </span>
                                </div>
                                <div class="notification__list-item-info">
                                    <h2 class="notification__list-item-info-name">{{ item.name }}</h2>
                                    <p class="notification__list-item-info-status" v-if="item.type === 'LISTED'">
                                        Listed by <span class="notification__list-item-info-status-circle" :class="{other: !item.owned}"/> <b>{{ item.owned ? 'You' : item.from }}</b> for <b>{{ item.amount }} CELO</b>
                                    </p>
                                    <p class="notification__list-item-info-status" v-if="item.type === 'SOLD'">
                                        Sold to <span class="notification__list-item-info-status-circle other"/> <b>{{ item.to }}</b> for <b>{{ item.amount }} CELO</b>
                                    </p>
                                    <p class="notification__list-item-info-status" v-if="item.type === 'BOUGHT'">
                                        Bought from <span class="notification__list-item-info-status-circle"/> <b>{{ item.to }}</b> for <b>{{ item.amount }} CELO</b>
                                    </p>
                                    <p class="notification__list-item-info-status" v-if="item.type === 'TRANSFER'">
                                        Transfered from <span class="notification__list-item-info-status-circle"/> <b>{{ item.owned ? 'You' : item.from }}</b> to <span class="notification__list-item-info-status-circle other"/> <b>{{ item.to }}</b>
                                    </p>
                                    <p class="notification__list-item-info-status" v-if="item.type === 'TRANSFERED'">
                                        Transfered from <span class="notification__list-item-info-status-circle other"/> <b>{{ item.to }}</b> to <span class="notification__list-item-info-status-circle"/> <b>{{ item.owned ? 'You' : item.from }}</b>
                                    </p>
                                    <p class="notification__list-item-info-time">{{ notificationTime(item) }} <img :src="getCDNImage('share.svg')" alt="share"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="notification__filter" :class="{ fixed: filterFixed }" ref="filter">
                    <h2 class="notification__filter-title">Filters</h2>
                    <div class="notification__filter-list">
                        <div class="notification__filter-item listing" :class="{active: activeFilter === 'listing'}" @click="changeFilter('listing')">
                            <img :src="getCDNImage('bookmark.svg')" alt="listing" v-if="activeFilter !== 'listing'"><img :src="getCDNImage('bookmark-blue.svg')" alt="listing" v-else>Listing
                        </div>
                        <div class="notification__filter-item purchase" :class="{active: activeFilter === 'purchase'}" @click="changeFilter('purchase')">
                            <img :src="getCDNImage('checked-grey.svg')" alt="purchase" v-if="activeFilter !== 'purchase'"><img :src="getCDNImage('check-green.svg')" alt="purchase" v-else>Purchase
                        </div>
                        <div class="notification__filter-item sales" :class="{active: activeFilter === 'sales'}" @click="changeFilter('sales')">
                            <img :src="getCDNImage('sales.svg')" alt="sales" v-if="activeFilter !== 'sales'"><img :src="getCDNImage('sales-yellow.svg')" alt="sales" v-else>Sales
                        </div>
                        <!-- <div class="notification__filter-item" :class="{active: activeFilter === 'offer'}" @click="changeFilter('offer')">
                            <img src="/broadcast.svg" alt="offer">Offers
                        </div> -->
                        <div class="notification__filter-item transfer" :class="{active: activeFilter === 'transfer'}" @click="changeFilter('transfer')">
                            <img :src="getCDNImage('transmit.svg')" alt="transfer" v-if="activeFilter !== 'transfer'"><img :src="getCDNImage('transmit-purple.svg')" alt="transfer" v-else>Transfer
                        </div>
                    </div>
                </div>
            </div>
			<div class="notification__loading" v-else-if="loading">
			  <img :src="getCDNImage('loading-button.svg')" alt="load">
		    </div>
            <p class="notification__empty" v-else>You don't have any action</p>
        </div>
    </section>
</template>

<script>
import { CDN_ROOT, COLLECTION_CDN_ROOT } from "@/config"
export default {
  data() {
    return {
      activeFilter: null,
	  filteredList: [],
	  loading: false,
	  filterFixed: false,
	  userScrolled: false
    }
  },
  computed: {
    notifications() {
      return this.$store.state.notificationList
    }
  },
  beforeMount() {
	window.addEventListener('wheel', this.wheelWindow)
	window.addEventListener('touchmove', this.wheelWindow)
	window.addEventListener('touchend', this.wheelWindow)
	window.addEventListener('scroll', this.fixFilterBlock)
  },
  beforeDestroy() {
	window.removeEventListener('wheel', this.wheelWindow)
	window.removeEventListener('touchmove', this.wheelWindow)
	window.removeEventListener('touchend', this.wheelWindow)
	window.removeEventListener('scroll', this.fixFilterBlock)
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
	  const list = JSON.parse(JSON.stringify(this.notifications))
      list.forEach(info => {
        count += info.items.filter(item => !item.read).length
      })
	  this.filteredList = list

      if (count > 0) {
		let maxId = 0;
		if (process.browser) {
		  maxId = parseInt(localStorage.getItem('notification_max_id') || '0')
		}
        setTimeout(() => {
          list.map(info => {
			info.items.map(item => {
			  item.read = true
			  if (parseInt(item.id) >= maxId) {
				maxId = parseInt(item.id)
			  }
			})
		  })
		  this.$store.commit('setNotificationList', [])
          this.$store.commit('setNotificationList', list)
		  this.filteredList = list
		  localStorage.setItem('notification_max_id', maxId)
        }, 3000)
      }

      this.updateFooter()
    },
    updateFooter() {
	  const footerEl = document.querySelector('.footer')
	  let notifyCount = 0
	  this.filteredList.forEach(info => notifyCount += info.items.length)
      if (notifyCount > 2) {
        footerEl.classList.remove('fixed')
      } else {
        footerEl.classList.add('fixed')
      }
    },
    notificationDate(datetime) {
      const date = new Date(datetime)
      const year = date.getFullYear()
      const month = date.toLocaleString('en-us', { month: 'long' })
      return `${month} ${year}`
    },
    notificationType(notification) {
      switch(notification.type) {
        case 'SOLD': return 'sale'
            break
        case 'BOUGHT': return 'purchase'
			break
		case 'TRANSFER':
		case 'TRANSFERED': return 'transmit'
            break
        default: return ''
            break
      }
	},
	notificationImage(notification) {
	  if (notification.nftSymbol !== 'CBCN') {
		let contractId = notification.tokenId
		let fileExtension = 'cwebp'
        if (notification.nftSymbol === 'nomdom') {
          contractId = notification.image
		} else if (notification.nftSymbol === 'knoxnft') {
		  contractId = notification.image.substring(notification.image.lastIndexOf('/') + 1).split('.')[0]
		  fileExtension = 'webp'
        }
		return COLLECTION_CDN_ROOT + '280/' + notification.nftSymbol + `/${contractId}.cwebp`
	  } else {
		return CDN_ROOT + `CBCN/thumb/${notification.month}.${fileExtension}`
	  }
      
	},
    notificationIcon(notification) {
      switch(notification.type) {
        case 'SOLD': return this.getCDNImage('sales-filled.svg')
            break
        case 'BOUGHT': return this.getCDNImage('check-filled.svg')
			break
		case 'TRANSFER': 
		case 'TRANSFERED': return this.getCDNImage('transmit-filled.svg')
            break
        default: return this.getCDNImage('bookmark-filled.svg')
            break
      }
	},
	notificationTime(notification) {
	  let difference = new Date() - parseInt(notification.updatedAt) * 1000;
      const daysDifference = Math.floor(difference/1000/60/60/24)
      difference -= daysDifference*1000*60*60*24

      const hoursDifference = Math.floor(difference/1000/60/60)
      difference -= hoursDifference*1000*60*60

      const minutesDifference = Math.floor(difference/1000/60)
      difference -= minutesDifference*1000*60

	  const secondsDifference = Math.floor(difference/1000)
      if (daysDifference) {
        return `${daysDifference} day${daysDifference > 1 ? 's' : ''} ago`
      } else if (hoursDifference) {
        return `${hoursDifference} hour${hoursDifference > 1 ? 's' : ''} ago`
      } else if (minutesDifference >= 5) {
        return `${minutesDifference} minutes ago`
      } else {
        return 'a few minutes ago'
      }
	},
	wheelWindow() {
	  this.userScrolled = true
	},
	fixFilterBlock() {
	  try {
		if (!this.isMobile() || !this.userScrolled) return
		const headerElement = document.getElementsByClassName('header')[0]
		if (window.pageYOffset > this.$refs.filter.offsetTop) {
		  if (!this.filterFixed) {
			this.filterFixed = true
			headerElement.classList.add('fixed')
			this.userScrolled = false
			window.scrollTo(0, 1)
		  }
		} else {
		  this.filterFixed = false
		  headerElement.classList.remove('fixed')
		}
	  } catch(e) {
		console.log(e)
	  }
	},
	updateNotifications() {
	  let newList = JSON.parse(JSON.stringify(this.notifications))
	  if (this.activeFilter) {
		const types = []
		switch(this.activeFilter) {
		  case 'sales': types.push('SOLD')
			break
		  case 'purchase': types.push('BOUGHT')
			break
		  case 'transfer':
			types.push('TRANSFER')
			types.push('TRANSFERED')
		  break
		  default: types.push('LISTED')
			break
		}
		newList.map(info => info.items = info.items.filter(item => types.includes(item.type)))
	  }
	  this.filteredList = newList
	  this.updateFooter()
	},
    changeFilter(filter) {
	  if (this.activeFilter !== filter) {
		this.activeFilter = filter;
		this.updateNotifications()
	  } else {
		this.activeFilter = null
		this.filteredList = JSON.parse(JSON.stringify(this.notifications))
		this.updateFooter()
	  }
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
	min-width: 54rem;
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
    top: 1rem;
	margin-top: 4.6rem;
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
  &__empty {
    padding: 5.6rem 0;
    text-align: center;
    font-size: 1.6rem;
    color: $grayLight;
  }

  @media (max-width: 530px) {
    padding: 2.5rem 0;
    &__title {
      font-size: 1.8rem;
    }
    &__tab {
      padding-top: 3rem;
      margin: 0;
    }
    &__block {
	  flex-direction: column-reverse;
      padding-top: 2.4rem;
      &.fixed {
        padding-top: 10rem;
      }
    }
    &__filter {
      position: static;
      top: 0;
	  margin: 0;
      padding-bottom: 1.6rem;
	  &.fixed {
		position: fixed;
		top: 0;
		background: white;
		padding: 8rem 0.8rem 1.6rem;
		margin: 0 -0.8rem;
		box-shadow: 0 5px 12px rgb(0 0 0 / 5%);
		z-index: 1;
	  }
      &-title {
        padding: 0;
        font-size: 1.4rem;
      }
      &-item {
        margin: 0.9rem 0.8rem 0 0;
        &:nth-child(2) {
          padding: 0.6rem;
        }
        &:nth-child(3) {
          margin-right: 0.8rem;
        }
      }
    }
	&__list-container {
	  flex: 1;
	  min-width: auto;
	  padding-right: 0;
	  overflow-y: auto;
	  -ms-overflow-style: none;
	  scrollbar-width: none;
	  &::-webkit-scrollbar {
	    display: none;
	  }
	}
    &__list {
      &:first-child {
        padding-top: 3.5rem;
      }
      &-date {
        font-size: 1.4rem;
      }
      &-item {
        width: calc(100% - 1.8rem);
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