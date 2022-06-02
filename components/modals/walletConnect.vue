	<template>
  <div class="modal">
    <div class="modal__wallet">
	  <div class="modal__wallet-header">
		<img class="modal__wallet-header-back" src="/arrow-left-black.svg" alt="back" @click="showConnectModal">
      	<h2 class="modal__wallet-header-title">Connect Wallet</h2>
		<img class="modal__wallet-header-close" src="/close.svg" alt="close" @click="closeModal">
	  </div>
	  <div class="modal__wallet-buttons">
		<button	class="modal__wallet-buttons-button" @click="connectMetaTrust">
			<img class="modal__wallet-buttons-button-image" src="/auth/metamask.svg" alt="metamask">
			<p class="modal__wallet-buttons-button-name">Metamask</p>
		</button>
		<client-only v-if="!isMobile()">
			<button	class="modal__wallet-buttons-button" @click="connectWallet">
				<img class="modal__wallet-buttons-button-image" src="/auth/wallet-connect.svg" alt="wallet">
				<p class="modal__wallet-buttons-button-name">WalletConnect</p>
			</button>
			<button	class="modal__wallet-buttons-button" @click="connectValora">
				<img class="modal__wallet-buttons-button-image" src="/auth/valora.svg" alt="valora">
				<p class="modal__wallet-buttons-button-name">Valora</p>
			</button>
		</client-only>
		<client-only v-else>
			<button	class="modal__wallet-buttons-button" @click="connectValora">
				<img class="modal__wallet-buttons-button-image" src="/auth/valora.svg" alt="valora">
				<p class="modal__wallet-buttons-button-name">Valora</p>
			</button>
			<button	class="modal__wallet-buttons-button" @click="connectWallet">
				<img class="modal__wallet-buttons-button-image" src="/auth/wallet-connect.svg" alt="wallet">
				<p class="modal__wallet-buttons-button-name">WalletConnect</p>
			</button>
		</client-only>
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
	padding: 3.4rem 1.6rem 4.1rem;
	border-radius: 0.8rem;
	&-header {
	  display: flex;
	  align-items: center;
	  justify-content: space-between;
	  margin: 0 0.4rem;
	  &-title {
		font-weight: 600;
		font-size: 2rem;
		color: $titleColor;
	  }
	}
	&-buttons {
	  display: flex;
	  margin-top: 4.2rem;
	  &-button {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-direction: column;
		width: 14.3rem;
		height: 10.7rem;
		background: $white;
		padding-top: 1.6rem;
		padding-bottom: 0.8rem;
		border: 1px solid $modalColor;
		border-radius: 4px;
		margin-right: 0.8rem;
		&:last-child {
		  margin: 0;
		}
		&-image {
		  width: 4rem;
		}
		&-name {
		  font-size: 1.4rem;
		}
	  }
	}
  }
  @media screen and (max-width: 460px) {
	&__wallet {
	  width: 100%;
	  padding: 3.4rem 0.8rem 2.4rem;
	  &-header {
		margin: 0 0.8rem;
		&-title {
		  font-size: 1.8rem;
		}
	  }
	  &-buttons {
		flex-wrap: wrap;
		&-button {
		  flex: 1;
		  width: auto;
		  height: 8rem;
		  padding-top: 1.2rem;
		  &:nth-child(2) {
			margin: 0;
		  }
		  &:last-child {
			margin-top: 0.8rem;
			min-width: 100%;
		  }
		  &-image {
			width: 3.2rem;
		  }
		}
	  }
	}
  }
}
</style>
