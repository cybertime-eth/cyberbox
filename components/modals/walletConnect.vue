	<template>
  <div class="modal">
    <div class="modal__wallet">
	  <div class="modal__wallet-header">
		<!-- <img class="modal__wallet-header-back" src="/arrow-left-black.svg" alt="back" @click="showConnectModal"> -->
      	<h2 class="modal__wallet-header-title">Connect your wallet</h2>
		<img class="modal__wallet-header-close" :src="getCDNImage('close.svg')" alt="close" @click="closeModal">
	  </div>
	  <div class="modal__wallet-buttons">
		<button	class="modal__wallet-buttons-button" @click="connectMetaTrust">
			<p class="modal__wallet-buttons-button-name">Metamask</p>
			<img class="modal__wallet-buttons-button-image" :src="getCDNImage('auth/metamask.svg')" alt="metamask">
		</button>
		<client-only v-if="!isMobile()">
			<button	class="modal__wallet-buttons-button" @click="connectWallet">
				<p class="modal__wallet-buttons-button-name">WalletConnect</p>
				<img class="modal__wallet-buttons-button-image" :src="getCDNImage('auth/wallet-connect.svg')" alt="wallet">
			</button>
			<button	class="modal__wallet-buttons-button" @click="connectValora">
				<p class="modal__wallet-buttons-button-name">Valora</p>
				<img class="modal__wallet-buttons-button-image" :src="getCDNImage('auth/valora.svg')" alt="valora">
			</button>
		</client-only>
		<client-only v-else>
			<button	class="modal__wallet-buttons-button" @click="connectValora">
				<p class="modal__wallet-buttons-button-name">Valora</p>
				<img class="modal__wallet-buttons-button-image" :src="getCDNImage('auth/valora.svg')" alt="valora">
			</button>
			<button	class="modal__wallet-buttons-button" @click="connectWallet">
				<p class="modal__wallet-buttons-button-name">WalletConnect</p>
				<img class="modal__wallet-buttons-button-image" :src="getCDNImage('auth/wallet-connect.svg')" alt="wallet">
			</button>
		</client-only>
		<button	class="modal__wallet-buttons-button" @click="connectMetaTrust">
			<p class="modal__wallet-buttons-button-name">Brave</p>
			<img class="modal__wallet-buttons-button-image" src="auth/brave.svg" alt="brave">
		</button>
	  </div>
    </div>
  </div>  
</template>
<script>
export default {
  computed: {
    walletUri() {
      return this.$store.state.walletUri
	},
	address() {
	  return this.$store.state.address
	}
  },
  watch: {
    walletUri() {
      if (this.$store.state.walletUri) {
        this.openMetamaskAppFromMobile()
      }
	},
	address() {
	  if (this.$store.state.address) {
		this.closeModal()
	  }
	}
  },
  methods: {
	sendConnectionEvent(type) {
	  this.sendEvent({
		category: 'Connect',
		eventName: 'connect',
		properties: {
		  connect: type
		}
	  })
	},
    async connectMetaTrust() {
      this.sendConnectionEvent('Metamask')
      if (window.ethereum) {
        await this.$store.dispatch('connectMetaTrust')
      } else {
        if (!this.walletUri) {
          this.$store.dispatch('createWalletConnect')
        } else {
          this.openMetamaskAppFromMobile()
        }
      }
    },
    openMetamaskAppFromMobile() {
      if (this.isMobile()) {
        location.href = `https://metamask.app.link/wc?uri=${encodeURIComponent(this.walletUri)}`
      }
    },
    async connectWallet() {
	  this.sendConnectionEvent('Walletconnect')
      await this.$store.dispatch('walletConnect', true)
	},
	connectValora() {
	  this.sendConnectionEvent('Valora')
      this.$emit('showValora')
    },
	showConnectModal() {
	  this.$emit('showConnect')
	},
    closeModal() {
      this.$emit('closeModal', false)
    }
  }
}
</script>
<style lang="scss">
.modal {
  &__wallet {
	background: $white;
	padding: 5.6rem 6.9rem 4rem;
	border-radius: 0.8rem;
	position: relative;
	&-header {
	  &-title {
		width: 100%;
		text-align: center;
		line-height: 1;
		font-weight: 600;
		font-size: 2rem;
		color: $titleColor;
	  }
	  &-close {
		position: absolute;
		top: 2.1rem;
		right: 2.1rem;
		cursor: pointer;
	  }
	}
	&-buttons {
	  margin-top: 3.2rem;
	  &-button {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 30.2rem;
		height: 4.8rem;
		background: $white;
		padding: 1.3rem;
		border: 1px solid $modalColor;
		border-radius: 0.4rem;
		margin-bottom: 1.6rem;
		&:last-child {
		  margin: 0;
		}
		&-image {
		  width: 2.4rem;
		}
		&-name {
		  font-family: OpenSans-Regular;
		  font-weight: 600;
		  font-size: 1.6rem;
		}
	  }
	}
  }
  @media screen and (max-width: 460px) {
	&__wallet {
	  width: 100%;
	  padding-left: 0.8rem;
	  padding-right: 0.8rem;
	  &-header {
		&-title {
		  font-size: 1.8rem;
		}
	  }
	  &-buttons {
		flex-wrap: wrap;
		&-button {
		  width: 28.8rem;
		  height: 4.8rem;
		  &:nth-child(2) {
			margin: 0;
		  }
		  &:last-child {
			margin-top: 0.8rem;
			min-width: 100%;
		  }
		}
	  }
	}
  }
}
</style>
