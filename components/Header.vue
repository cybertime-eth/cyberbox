<template>
  <header>
    <div class="header container-xl" ref="header">
      <button class="header__back" v-if="nftId" @click="handleClickBack">
        <img :src="getCDNImage('arrow-left.svg')" alt="back" class="header__back-img">
      </button>
      <div class="header__logo" :class="{ 'has-nft': nftId }" @click="$router.push('/')">
        <img :src="getCDNImage('logo.svg')" alt="logo" class="header__logo-img">
      </div>
      <searchInput class="header__search" />
      <nav class="header__navigation">
        <ul class="header__ul">
          <li class="header__list">
            <nuxt-link class="header__link" to="/explorer" append active-class="gradient-text" exact @click="sendExplorerEvent">Explorer</nuxt-link>
          </li>
          <li class="header__list">
            <nuxt-link class="header__link" active-class="gradient-text" to="/rankings" exact @click="sendRankingEvent">Rankings</nuxt-link>
          </li>
          <li class="header__list">
            <nuxt-link class="header__link" active-class="gradient-text" to="/tracker" @click="sendTrackerEvent" exact>Tracker</nuxt-link>
          </li>
          <li class="header__list">
            <nuxt-link class="header__link" active-class="gradient-text" to="/referral" @click="sendReferralEvent" exact>Referral</nuxt-link>
          </li>
        </ul>
      </nav>
      <client-only>
        <div class="header__box" v-if="address && !isMobile()">
          <nuxt-link class="header__link" active-class="gradient-text" to="/mycollection" exact>My NFT</nuxt-link>
          <nuxt-link class="header__notification" to="/notification" exact>
            <img :src="getCDNImage('lightning.svg')" alt="lightning">
            <span class="header__notification-count" v-if="notificationCount">{{ notificationCount }}</span>
          </nuxt-link>
        </div>
        <button v-else class="header__null"></button>
        <div class="header__wallet" v-if="address && !isMobile()">
		  <dropdown-menu class="header__wallet-dropdown" :right="true" v-model="showCeloDropdown">
          	<h3 class="header__wallet-balance dropdown-toggle">{{ balance }} CELO</h3>
			<div slot="dropdown">
				<!-- <a class="dropdown-item" href="https://app.ubeswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x471ece3750da237f93b8e339c536989b8978a438" target="_blank">
					<span class="dropdown-item-name">Buy <img class="dropdown-item-celo" src="/celo.svg" alt="celo"> CELO by Credit Card <img class="dropdown-item-cards" src="/payable-cards.svg" alt="cards"></span>
					<img class="dropdown-item-nav" src="/array-right.svg" alt="right">
				</a> -->
				<a class="dropdown-item" href="https://app.ubeswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x471ece3750da237f93b8e339c536989b8978a438" target="_blank">
					<span class="dropdown-item-name">Buy <img class="dropdown-item-celo" :src="getCDNImage('celo.svg')" alt="celo"> CELO</span>
				</a>
			</div>
		  </dropdown-menu>
		  <h3 class="header__wallet-address" ref="wallet" @click="showProfileMenu = !showProfileMenu">{{ address }}</h3>
		  <div class="header__wallet-avatar-box">
			<div class="header__wallet-avatar gradient-button">
				<img :src="getCDNImage('celo.svg')" alt="avatar">
			</div>
		  </div>
        </div>
      </client-only>
      <button class="gradient-button header__connect" v-if="!address" @click="showConnectModal = true">Connect Wallet</button>
      <div class="header__mobile">
        <client-only>
          <nuxt-link class="header__notification" to="/notification" exact v-if="mobileMenuVisible">
            <img :src="getCDNImage('lightning.svg')" alt="lightning">
            <span class="header__notification-count" v-if="notificationCount">{{ notificationCount }}</span>
          </nuxt-link>
          <div class="header__box" v-if="address && mobileMenuVisible">
            <nuxt-link class="header__link header__mycollection" active-class="gradient-text" to="/mycollection" exact><img :src="getCDNImage('mycollection.svg')" alt="mycollection"></nuxt-link>
          </div>
        </client-only>
        <button class="gradient-button header__mobile-connect" v-if="!address"  @click="showConnectModal = true">Connect</button>
        <img :src="getCDNImage('search-mobile.svg')" alt="search" class="header__mobile-search" @click="showSearchView = true">
        <img :src="getCDNImage('burger.svg')" alt="burger" class="header__mobile-menu" @click="showMobileMenu">
		<img :src="getCDNImage('close.svg')" alt="close" class="header__mobile-close" @click="closeSellModal">
      </div>
      <div class="header__error-network" v-if="showWrongNetwork">
        <img :src="getCDNImage('pulse.svg')" alt="pulse">
        <p class="header__error-network-text">You are on the wrong network</p>
      </div>
    </div>
    <!-- <connect @showWallet="openWalletModal" @showEmail="openEmailModal" @closeModal="closeModal" v-if="showConnectModal && !address"/> -->
	<walletConnect @showConnect="openConnectModal" @showValora="openValoraModal" @closeModal="closeModal" v-if="showConnectModal && !address"/>
	<valoraConnect @closeModal="closeModal" v-if="showValoraModal"/>
	<socialConnect @showConnect="openConnectModal" @closeModal="closeModal" v-if="showEmailModal"/>
    <wrongNetwork v-if="showWrongNetworkModal" @closeModal="showWrongNetworkModal = false"/>
    <profileModal v-if="showProfileMenu" @closeModal="closeModal"/>
    <profileModalMobile v-if="showProfileMenuMobile" :balance="balance" @closeModal="closeModal"/>
    <searchView v-if="showSearchView" @close="showSearchView = false"/>
  </header>
</template>
<script>
import connect from '@/components/modals/connect'
import walletConnect from '@/components/modals/walletConnect'
import valoraConnect from '@/components/modals/valoraConnect'
import socialConnect from '@/components/modals/socialConnect'
import profileModal from '@/components/modals/profileModal'
import profileModalMobile from '@/components/modals/profileModalMobile'
import wrongNetwork from '@/components/modals/wrongNetwork'
import searchInput from '@/components/search/searchInput'
import searchView from '@/components/search/searchView'
export default {
  data() {
    return {
	  image: false,
	  mobileMenuVisible: false,
      showConnectModal: false,
	  showWalletModal: false,
	  showValoraModal: false,
	  showEmailModal: false,
	  showCeloDropdown: false,
      showProfileMenu: false,
      showProfileMenuMobile: false,
      showWrongNetwork: false,
      showWrongNetworkModal: false,
      showSearchView: false
    }
  },
  watch: {
    chainId() {
      const id = this.$store.state.chainId
      id === 42220 || id === null ? this.showWrongNetwork = false :  this.showWrongNetwork = true
    },
    address() {
      if (this.address && this.chainId !== 42220) {
        this.showWrongNetworkModal = true
      }
	},
	$route() {
      try {
		this.$refs.header.classList.remove('fixed')
	  } catch(e) {
		console.log(e)
	  }
    }
  },
  components: {
    connect,
	walletConnect,
	valoraConnect,
	socialConnect,
    wrongNetwork,
    profileModal,
    profileModalMobile,
    searchInput,
    searchView
  },
  computed: {
    chainId() {
      return this.$store.state.chainId
    },
    user() {
      return this.$store.state.user
    },
    address() {
      return this.$store.state.address
	},
	balance() {
	  return this.$store.state.balance.toFixed(1);
	},
    nftId() {
      return this.$route.params.nftid
    },
    notificationCount() {
      let totalCount = 0
      if (process.browser) {
        totalCount = parseInt(localStorage.getItem('notification_max_id') || '0')
      }
      let count = 0
      this.$store.state.notificationList.forEach(info => {
        count += info.items.filter(item => totalCount > 0 ? parseInt(item.id) > totalCount : true).length
      })
      return count
    }
  },
  async created() {
    if (process.browser) {
      window.addEventListener('click', this.handleClickWindow)
	}
	this.$nextTick(function() {
	  this.mobileMenuVisible = this.isMobile()
    })
  },
  beforeDestroy() {
    window.removeEventListener('click', this.handleClickWindow)
  },
  methods: {
    handleClickWindow(e) {
      if (this.$refs.wallet && !this.$refs.wallet.contains(e.target)) {
        this.showProfileMenu = false
      }
    },
    handleClickBack() {
      localStorage.setItem('move_back', true)
      this.$router.go(-1)
    },
    showMobileMenu() {
      this.showProfileMenuMobile = true;
      const footerEl = document.querySelector('.footer')
      footerEl.classList.add('fixed')
      footerEl.classList.add('sidemenu')
	},
	closeSellModal() {
	  this.$store.commit('changeSellTokenClosed', true)
	  this.$refs.header.classList.remove('buy')
	},
	openConnectModal() {
	  this.showWalletModal = false
	  this.showEmailModal = false
	  this.showConnectModal = true
	},
    openWalletModal() {
      this.showWalletModal = true
      this.showConnectModal = false
	},
	openValoraModal() {
      this.showValoraModal = true
      this.showWalletModal = false
	},
	openEmailModal() {
      this.showEmailModal = true
      this.showConnectModal = false
    },
    closeModal(payload) {
	  this.showConnectModal = payload
	  this.showWalletModal = payload
	  this.showValoraModal = payload
	  this.showEmailModal = payload
      this.showProfileMenu = payload
      this.showProfileMenuMobile = payload
      if (this.isMobile()) {
        const footerEl = document.querySelector('.footer')
        footerEl.classList.remove('fixed')
        footerEl.classList.remove('sidemenu')
      }
	},
	sendExplorerEvent() {
	  this.sendEvent({
		category: 'Browse',
		eventName: 'explorer_enter',
		properties: {
		  explorer_enter: 'Menu'
		}
	  })
	},
    sendRankingEvent() {
      this.sendEvent({
		category: 'Browse',
		eventName: 'rankings_enter',
		properties: {
		  rankings_enter: 'Menu'
		}
	  })
	},
	sendTrackerEvent() {
	  this.sendEvent({
		category: 'Browse',
		eventName: 'tracker_enter',
		properties: {
		  tracker_enter: 'Menu'
		}
	  })
	},
	sendReferralEvent() {
	  this.sendEvent({
		category: 'Browse',
		eventName: 'referral_enter',
		properties: {
		  referral_enter: 'Menu'
		}
	  })
	}
  }
}
</script>
<style lang="scss">
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
header {
  box-shadow: 0px 4px 12px rgb(0 0 0 / 5%);
}
.header {
  height: 9.5rem;
  display: grid;
  grid-template-columns: 6.4rem 23.6rem 36rem 42.2rem 24rem;
  align-items: center;
  position: relative;
  &__back {
    display: none;
  }
  &__logo {
    display: flex;
    align-items: center;
    width: 5.1rem;
    justify-content: space-between;
    &-link {
      letter-spacing: 0.04em;
    }
    &-img {
      width: 6rem;
    }
  }
  &__search {
    width: 19.3rem;
  }
  &__ul {
    display: flex;
    justify-content: space-between;
  }
  &__box {
    display: flex;
    align-items: center;
	justify-self: end;
	padding-right: 1.2rem;
  }
  &__notification {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4.4rem;
    height: 4.4rem;
    background: $white;
    margin-left: 2.8rem;
    border-radius: 50%;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
    img {
      width: 1.7rem;
    }
    &-count {
      position: absolute;
      top: 0;
      right: 0;
      width: 2rem;
      height: 2rem;
      background: $pink;
      border-radius: 50%;
      line-height: 2rem;
      text-align: center;
      font-size: 1.1rem;
      color: $white;
    }
  }
  &__error {
    &-network {
      position: absolute;
      right: 0;
      top: 100%;
      padding: 1.2rem .8rem;
      background: $pink;
      display: flex;
      align-items: center;
      border-radius: .8rem;
      width: 24rem;
      margin-top: 32px;
      justify-self: flex-end;
      &-text {
        color: $white;
        padding-left: .8rem;
      }
    }
  }
  &__wallet {
	display: flex;
    align-items: center;
	width: 24rem;
    justify-self: end;
	position: relative;
    cursor: pointer;
    z-index: 1;
    &-balance, &-address {
      white-space: nowrap;
      overflow: hidden;
	  text-overflow: ellipsis;
	  width: 7.4rem;
      max-width: 7.4rem;
    }
	&-balance {
	  background: $white;
	  padding: 1rem 3rem 1rem 1.2rem;
	  border: 1px solid $lightGreen;
	  border-radius: 2.5rem 0 0 2.5rem;
	}
	&-dropdown {
	  .dropdown-menu {
		top: calc(100% + 1.2rem) !important;
		right: 1rem !important;
		width: 12.4rem;
	  }
	  .dropdown-item {
		cursor: pointer;
		&:hover {
			background: $lightGreen;
		}
		&-name {
			display: flex;
			align-items: center;
			font-weight: 600;
			font-size: 1.6rem;
		}
		&-celo {
			width: 1.6rem;
			margin: 0 0.4rem;
		}
		&-cards {
			margin-left: 1.6rem;
		}
	  }
	}
	&-address {
	  background: $lightGreen;
	  padding: 1.1rem 1.2rem 1.1rem 3rem;
	  border-radius: 0 2.5rem 2.5rem 0;
    }
	&-avatar-box {
	  position: absolute;
	  left: 50%;
	  transform: translateX(-55%);
	}
    &-avatar {
      width: 4rem;
      height: 4rem;
      border-radius: 50% !important;
      display: flex;
      align-items: center;
      justify-content: center;
      &::after {
        border-radius: 50% !important;
      }
      img {
        width: 2.4rem;
        height: 2.4rem;
        object-fit: cover;
        border-radius: 25%;
      }
    }
  }
  &__connect {
    width: 17.4rem;
    height: 4.8rem;
    cursor: pointer;
  }
  &__mobile {
    display: none;
    &-search, &-menu, &-connect, &-close {
      display: none;
    }
  }
  &.buy {
	.header__back-img, .header__mobile-search, .header__mobile-menu {
	  display: none;
  	}
	.header__mobile-close {
	  display: block;
	}
  }
}
@media screen and (max-width: 460px) {
  .header {
    display: flex;
    justify-content: space-between;
    height: 6.5rem;
    margin: 0 .8rem !important;
	position: relative;
	&.fixed {
	  position: fixed;
	  width: calc(100% - 1.6rem);
	  margin: 0 !important;
	  padding: 0 0.8rem;
	  box-shadow: 0 4px 12px rgb(0 0 0 / 5%);
	  z-index: 2;
	}
    &__null {
      display: none;
    }
    &__search {
      display: none;
    }
    &__navigation {
      display: none;
    }
    &__back {
      display: block;
      height: 2rem;
      background: transparent;
      margin-right: 2.2rem;
    }
    &__logo {
      img {
        width: 4rem;
      }
      &.has-nft {
        display: none;
      }
	}
	&__mycollection {
	  img {
		width: 1.8rem;
	  }
	}
    &__notification {
      width: 2.4rem;
      height: 2.4rem;
      margin-left: 0;
	  margin-right: 1.9rem;
	  transform: translateY(0.1rem);
      img {
        width: 0.9rem;
      }
      &-count {
        width: 1.1rem;
        height: 1.1rem;
        line-height: 1.1rem;
        font-size: 0.7rem;
      }
    }
    &__box {
      height: 1.8rem;
      a {
        height: 100%;
      }
    }
    &__connect {
      display: none;
    }
    &__error {
      &-network {
        width: auto;
        position: absolute;
        left: 50%;
        right: auto;
        top: 7.8rem;
        margin-top: 0;
        padding: 0.8rem 0.5rem;
        transform: translateX(-50%);
        img {
          width: 1.4rem;
        }
        &-text {
          white-space: nowrap;
          font-size: 1.2rem;
        }
      }
	}
    &__wallet {
      width: 18.8rem;
	  margin-right: 1rem;
	  cursor: default;
      &-balance, &-address {
        font-size: 1.2rem;
	  }
	  &-balance {
		padding: 0.4rem 2rem 0.4rem 1rem;
	  }
	  &-address {
		padding: 0.4rem 1rem 0.4rem 2rem;
	  }
	  &-avatar {
		width: 2.2rem;
		height: 2.2rem;
		img {
		  width: 1.2rem;
		  height: 1.2rem;
		}
	  }
	  &-dropdown {
		.dropdown-menu {
		  width: 12.3rem;
		  z-index: 3;
		  .dropdown-item {
			&-name {
			  font-size: 1.4rem;
			}
			&-cards {
			  margin-left: 0;
			  margin-top: 0.8rem;
			}
		  }
		}
	  }
    }
    &__mobile {
      display: flex;
      align-items: center;
      &-connect {
        margin-right: 1.9rem;
      }
      &-search {
        display: block;
        width: 1.8rem;
        margin-right: 1.9rem;
      }
      &-menu {
        display: block;
        justify-self: flex-end;
        width: 1.8rem;
      }
      &-connect {
        display: block;
        width: 10.1rem;
        height: 2.4rem;
        font-size: 1.3rem;
      }
    }
  }
}
</style>
