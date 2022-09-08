<template>
  <div class="menu-mobile">
    <div class="menu-mobile-header container-xl">
      <img :src="getCDNImage('logo.svg')" alt="logo" class="menu-mobile-header-logo" @click="gotoHome">
      <div class="menu-mobile-header-walletbox">
		<!-- <dropdown-menu class="header__wallet-dropdown" :right="true" interactive="interactive" v-model="showCeloDropdown">
			<div class="header__wallet" v-if="address">
				<h3 class="header__wallet-balance">{{ balance }} CELO</h3>
				<h3 class="header__wallet-address">{{ address }}</h3>
				<div class="header__wallet-avatar-box">
					<div class="header__wallet-avatar gradient-button">
						<img :src="getCDNImage('celo.svg')" alt="avatar">
					</div>
				</div>
			</div>
			<div slot="dropdown">
				<a class="dropdown-item" href="https://app.ubeswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x471ece3750da237f93b8e339c536989b8978a438" target="_blank">
					<span class="dropdown-item-name">Buy <img class="dropdown-item-celo" :src="getCDNImage('celo.svg')" alt="celo"> CELO</span>
				</a>
			</div>
		</dropdown-menu> -->
        <img :src="closeIcon" alt="close" class="menu-mobile-header-close" @click="closeModal">
      </div>
    </div>
    <div class="menu-mobile-list container-xl">
      <div class="menu-mobile-list-links" @click="closeModal">
        <nuxt-link to="/explorer" active-class="gradient-text" class="menu-mobile-list-link" @click="sendExplorerEvent">Explorer</nuxt-link>
        <nuxt-link to="/rankings" active-class="gradient-text" class="menu-mobile-list-link" @click="sendRankingEvent">Rankings</nuxt-link>
        <nuxt-link to="/tracker" active-class="gradient-text" class="menu-mobile-list-link">Tracker</nuxt-link>
        <nuxt-link to="/offsetbox" active-class="gradient-text" class="menu-mobile-list-link">Offset Box</nuxt-link>
      </div>
      <client-only>
        <profileModal :sideMenu="true" @closeModal="closeModal" v-if="isMobile()"/>
      </client-only>
      <!-- <a href="https://forms.gle/R7LmANz7iqsCA88X8" target="_blank" class="menu-mobile-list-link">Launchpad</a> -->
    </div>
  </div>
</template>
<script>
import profileModal from '@/components/modals/profileModal'

export default {
  props: ['balance'],
  components: {
    profileModal
  },
  data() {
	return {
	  showCeloDropdown: false
	}
  },
  computed: {
    address() {
      return this.$store.state.address
    },
    closeIcon() {
      if (!this.isMobile()) {
        return this.getCDNImage('close.svg')
      } else {
        return this.getCDNImage('close-header.svg')
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal', false)
	},
	gotoHome() {
	  this.closeModal()
	  this.$router.push('/')
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
    }
  }
}
</script>

<style lang="scss">
.menu-mobile {
  width: 100%;
  height: 100%;
  position: fixed;
  overflow: hidden;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $white;
  z-index: 10;
  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 1rem;
    &-logo {
      width: 4rem;
    }
    &-walletbox {
      display: flex;
      align-items: center;
    }
    &-close {
      width: 2.2rem;
    }
  }
  &-list {
    height: calc(100vh - 15.2rem);
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: column;
    padding-top: 4rem;
    &-links {
      display: flex;
      flex-direction: column;
    }
    &-link {
      width: 100%;
      padding-bottom: 2.5rem;
      font-family: OpenSans-Regular;
    }
  }
  @media (max-width: 460px) {
    &-header-close {
      width: 1.8rem;
	}
	&-header {
	  width: calc(100% - 1rem);
	  padding: 1.6rem 1rem 1.6rem 0;
	  margin: 0;
      box-shadow: 0px 2px 4px rgb(0 0 0 / 5%);
	}
	&-list {
	  padding-top: 3.4rem;
	}
  }
}
</style>