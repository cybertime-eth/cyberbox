<template>
  <div class="modal">
    <div class="modal__buy">
      <h1 class="modal__title gradient-text">Congratulations!</h1>
      <img :src="image" alt="image" class="modal__image">
      <h3 class="modal__success">You successfully purchased</h3>
      <h3 class="modal__name">{{ name }}</h3>
      <p class="modal__link">View on Celo Explorer <img src="/share.svg" alt="share"></p>
      <div class="modal__buy-footer">
		<button class="modal__button modal__buy-footer-carbon" @click="routeCarbonTracker">Carbon tracker</button>
		<button class="modal__button" @click="routeMyCollection">My collection</button>
      </div>
	  <button class="modal__close-button" @click="closeModal">
		<img src="/close-bold.svg" class="modal__close-button-icon">
	  </button>
    </div>
  </div>
</template>
<script>
export default {
  props: ['image', 'name', 'certificate'],
  methods: {
    closeModal() {
      this.$store.commit('changeSuccessBuyToken', false)
	},
	routeCarbonTracker() {
	  this.$store.commit('changeSuccessBuyToken', false)
      this.$router.push('/carbon?tab=1')
	},
    routeMyCollection() {
      this.$store.commit('changeSuccessBuyToken', false)
      this.$router.push('/mycollection')
    }
  }
}
</script>
<style lang="scss" scoped>
.modal {
  &__buy {
    position: relative;
    background: $white;
    border-radius: .8rem;
    padding: 3.6rem 2.4rem 2.8rem;
    width: 38rem;
    z-index: 11;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__image {
    width: 28.1rem;
    height: 28.1rem;
    object-fit: cover;
    margin-top: 3.1rem;
  }
  &__success {
    padding-top: 1.7rem;
    font-size: 1.8rem;
    font-family: OpenSans-Regular;
    color: $textColor3;
  }
  &__name {
    padding-top: 1rem;
    font-size: 1.8rem;
    font-family: OpenSans-SemiBold;
  }
  &__link {
    display: flex;
    align-items: center;
    padding-top: 1.7rem;
    font-size: 1.4rem;
    cursor: pointer;
    color: $grayLight;
    img {
      width: 1.8rem;
      margin-left: 1.2rem;
    }
  }
  &__buy-footer {
	display: flex;
	width: 100%;
	margin-top: 2.8rem;
	.modal__button {
	  flex: 1;
	  height: 4.8rem;
	  border: .1rem solid $pink;
	  color: $pink;
	  background: $white;
	  font-size: 1.6rem;
	}
	&-carbon {
	  &.modal__button {
		margin-right: 0.8rem;
		border-color: $border;
		color: $textColor;
	  }
	}
  }
  &__close-button {
    position: absolute;
    top: 15px;
    right: 15px;
    background: transparent;
    &-icon {
      width: 20px;
    }
  }
  @media (max-width: 460px) {
    &__title {
      font-size: 3.2rem;
      line-height: 3.8rem;
    }
    &__image {
      margin-top: 1.6rem;
	}
	&__buy {
	  padding-left: 0.8rem;	
	  padding-right: 0.8rem;
	  .modal__name {
		font-size: 1.7rem;
	  }
	  &-footer {
		flex-direction: column-reverse;
		&-carbon {
		  margin-top: 0.8rem;
		}
	  }
	}
  }
}
</style>
