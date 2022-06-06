<template>
  <div class="modal">
    <div class="modal__block">
      <h2 class="modal__title">{{ modalTitle }}</h2>
      <div class="modal__connect">
        <button class="modal__connect-button" @click="connectWeb3">
          Web3 wallet
		  <a class="modal__connect-button-nav">
			<span class="modal__connect-button-nav-icons">
			  <img src="/auth/metamask.svg" alt="metamsk" class="modal__connect-button-nav-icons-image">
			  <img src="/auth/valora.svg" alt="valora" class="modal__connect-button-nav-icons-image">
			  <client-only>
				<img src="/auth/wallet.svg" alt="wallet" class="modal__connect-button-nav-icons-image" v-if="isWeb">
				<span class="modal__connect-button-nav-icons-ellipsis" v-else>...</span>
			  </client-only>
			</span>
			<img src="/array-right.svg" alt="arrow" class="modal__connect-button-detail">
		  </a>
        </button>
        <!-- <button class="modal__connect-button" @click="connectEmail">
          Email or Social Media
		  <a class="modal__connect-button-nav">
			<span class="modal__connect-button-nav-icons">
			  <img src="/auth/email.svg" alt="email" class="modal__connect-button-nav-icons-image">
			  <img src="/auth/google.svg" alt="google" class="modal__connect-button-nav-icons-image">
			  <client-only>
				<img src="/auth/facebook.svg" alt="facebook" class="modal__connect-button-nav-icons-image" v-if="isWeb">
			  	<img src="/auth/apple.svg" alt="apple" class="modal__connect-button-nav-icons-image" v-if="isWeb">
				<span class="modal__connect-button-nav-icons-ellipsis" v-else>...</span>
			  </client-only>
			</span>
			<img src="/array-right.svg" alt="arrow" class="modal__connect-button-detail">
		  </a>
        </button> -->
      </div>
      <img src="/close.svg" alt="close" class="modal__close" @click="closeModal">
    </div>
  </div>  
</template>
<script>

export default {
  data() {
	return {
	  isWeb: true
	}
  },
  computed: {
    modalTitle() {
      return !this.isMobile() ? 'Connect to Cyberbox' : 'Connect wallet';
	}
  },
  mounted() {
	this.isWeb = !this.isMobile()
  },
  methods: {
    connectWeb3() {
	  this.$emit('showWallet')
	},
	connectEmail() {
	  this.$emit('showEmail')
	},
    closeModal() {
      this.$emit('closeModal', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.modal {
  &__title {
    text-align: center;
    color: $titleColor;
  }
  &__block {
	background: $white;
	padding: 3.2rem 1.6rem 2.8rem;
  }
  &__close {
	width: 1.6rem;
	top: 3.6rem;
	right: 2rem;
  }
  @media screen and (max-width: 460px) {
    &__block {
      width: 100%;
	  padding: 3.2rem 0.8rem 2.4rem;
    }
    &__title {
      width: 100%;
      text-align: center;
      color: $titleColor;
    } 
  }
}
</style>
<style lang="scss">
.modal {
  &__title {
    text-align: center;
  }
  &__connect {
    padding-top: 4.1rem;
    &-button {
	  width: 44.4rem;
      background: $white;
	  margin-bottom: 1.6rem;
      border-radius: .4rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
	  padding: 1.6rem 1.2rem 1.6rem 0.8rem;
	  border: 1px solid $modalColor;
	  cursor: pointer;
	  &-nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		&-icons {
		  display: flex;
		  align-items: center;
		  margin-right: 3rem;
		  &-image {
			display: flex;
			width: 1.8rem;
			max-height: 1.8rem;
			margin-right: 0.8rem;
			&:last-child {
			  margin: 0;
			}
		  }
		}
	  }
	  &-detail {
		width: 0.9rem;
      }
    }
  }
}
@media screen and (max-width: 460px) {
  .modal {
    > div:first-child {
      margin: 0 .8rem;
    }
    &__connect {
      padding-top: 2.4rem;
      &-button {
		width: 100%;
		font-size: 1.4rem;
		text-align: left;
		&-nav {
		  &-icons {
			justify-content: flex-end;
			margin-right: 1.4rem;
			&-ellipsis {
			  font-weight: 600;
			  font-size: 1.4rem;
			  color: $grayDark;
			}
		  }
		}
      }
    }
    &__title {
      width: 100%;
      margin: 0 auto;
      line-height: 2.2rem;
      text-align: center;
      font-size: 1.8rem;
    }
  }
}
</style>
