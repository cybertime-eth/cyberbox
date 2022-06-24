	<template>
  <div class="modal">
    <div class="modal__social">
	  <div class="modal__social-header">
		<img class="modal__social-header-back" src="/arrow-left-black.svg" alt="back" @click="showConnectModal">
      	<h2 class="modal__social-header-title">Connect Email</h2>
		<img class="modal__social-header-close" src="/close.svg" alt="close" @click="closeModal">
	  </div>
      <input class="modal__social-input" placeholder="Email Address" v-model="email">
	  <div class="modal__social-buttons" @click="connectEmail">
		<button class="modal__social-buttons-button" :class="{disabled: !email}">Login / Signup</button>
	  </div>
    </div>
  </div>  
</template>
<script>
export default {
  data() {
	return {
	  email: ''
	}
  },
  computed: {
	address() {
	  return this.$store.state.address
	}
  },
  watch: {
	address() {
	  if (this.$store.state.address) {
		this.closeModal()
	  }
	}
  },
  methods: {
    showConnectModal() {
	  this.$emit('showConnect')
    },
    connectEmail() {
      if (!this.email) return
	  this.$store.dispatch('connectWithEmail', this.email)
	},
    closeModal() {
      this.$emit('closeModal', false)
    }
  }
}
</script>
<style lang="scss">
.modal {
  &__social {
    width: 30rem;
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
    &-input {
      width: calc(100% - 2.4rem);
      margin-top: 2.4rem;
      &:focus {
        border: 1px solid $green;
        box-shadow: 0 0 3px $green;
      }
    }
	&-buttons {
	  display: flex;
      margin-top: 3.2rem;
	  &-button {
        width: 100%;
        height: 5rem;
        background: $pink;
        color: $white;
        &.disabled {
          background: $white;
          color: $border;
          pointer-events: none;
          border: 1px solid $border;
          opacity: 0.5;
        }
	  }
	}
  }
  @media screen and (max-width: 460px) {
	&__social {
	  width: 100%;
	  padding: 3.4rem 0.8rem 2.4rem;
	  &-header {
		margin: 0 0.8rem;
		&-title {
		  font-size: 1.8rem;
		}
	  }
	  &-buttons {
		&-button {
        }
	  }
	}
  }
}
</style>
