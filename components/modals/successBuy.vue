<template>
  <div class="modal">
    <div class="modal__buy">
      <h1 class="modal__title gradient-text">Congratulations!</h1>
      <img :src="image" alt="image" class="modal__image">
      <h3 class="modal__success">You successfully purchased</h3>
      <h3 class="modal__name">{{ name }}</h3>
      <p class="modal__link">View on Celo Explorer <img src="/share.svg" alt="share"></p>
      <button class="modal__button" @click="routeMyCollection">My collection</button>
      <button class="modal__close-button" @click="closeModal">
        <img src="/close-bold.svg" class="modal__close-button-icon">
      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: ['image', 'name'],
  methods: {
    closeModal() {
      this.$store.commit('changeSuccessBuyToken', false)
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
    padding: 2.76rem 1.84rem 2.15rem;
    width: 29.2rem;
    z-index: 11;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__image {
    width: 21.61rem;
    height: 21.61rem;
    object-fit: cover;
    margin-top: 2.38rem;
  }
  &__success {
    padding-top: 1.3rem;
    font-size: 1.38rem;
    font-family: OpenSans-Regular;
    color: $textColor3;
  }
  &__name {
    padding-top: 0.76rem;
    font-size: 1.38rem;
    font-family: OpenSans-SemiBold;
  }
  &__link {
    display: flex;
    align-items: center;
    padding-top: 1.3rem;
    font-size: 1.07rem;
    cursor: pointer;
    color: $grayLight;
    img {
      width: 1.38rem;
      margin-left: 0.92rem;
    }
  }
  &__button {
    width: 100%;
    height: 4.8rem;
    border: .1rem solid $pink;
    color: $pink;
    background: $white;
    margin-top: 2.15rem;
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
}
</style>
