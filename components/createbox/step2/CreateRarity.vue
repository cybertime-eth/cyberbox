<template>
  <div class="rarity">
    <h3 class="rarity__title">Create rarity</h3>
    <div class="rarity__header">
      <h3 class="rarity__header-text">Rank</h3>
      <h3 class="rarity__header-text">Quantity <img src="/question.svg" alt="question"></h3>
      <h3 class="rarity__header-text">Probability <img src="/question.svg" alt="question"></h3>
      <h3 class="rarity__header-text">Add NFT</h3>
    </div>
    <div class="rarity__block">
      <p class="rarity__block-title">Specially Super Rare</p>
      <div class="rarity__block-item">
        <div class="rarity__block-item-info">
          <h3 class="rarity__block-item-info-rank">SSR</h3>
          <h3 class="rarity__block-item-info-quantity">0</h3>
          <h3 class="rarity__block-item-info-probability">0</h3>
          <button class="gradient-button rarity__block-item-info-plus" @click="showAddNftPage"><img src="/plus.svg" alt="plus"></button>
        </div>
        <img src="/close-bold.svg" alt="close" class="rarity__block-item-close">
      </div>
      <p class="rarity__block-add">Add NFT <span>+</span></p>
    </div>
    <div class="rarity__block">
      <p class="rarity__block-title">Super Rare</p>
      <div class="rarity__block-item">
        <div class="rarity__block-item-info">
          <h3 class="rarity__block-item-info-rank">SR</h3>
          <h3 class="rarity__block-item-info-quantity">0</h3>
          <h3 class="rarity__block-item-info-probability">0</h3>
          <button class="gradient-button rarity__block-item-info-plus" @click="showAddNftPage"><img src="/plus.svg" alt="plus"></button>
        </div>
        <img src="/close-bold.svg" alt="close" class="rarity__block-item-close">
      </div>
      <p class="rarity__block-add">Add NFT <span>+</span></p>
    </div>
    <div class="rarity__block">
      <p class="rarity__block-title">Rare</p>
      <div class="rarity__block-item">
        <div class="rarity__block-item-info">
          <h3 class="rarity__block-item-info-rank">R</h3>
          <h3 class="rarity__block-item-info-quantity">0</h3>
          <h3 class="rarity__block-item-info-probability">0</h3>
          <button class="gradient-button rarity__block-item-info-plus" @click="showAddNftPage"><img src="/plus.svg" alt="plus"></button>
        </div>
        <img src="/close-bold.svg" alt="close" class="rarity__block-item-close">
      </div>
      <p class="rarity__block-add">Add NFT <span>+</span></p>
    </div>
    <div class="rarity__block">
      <p class="rarity__block-title">Normal</p>
      <div class="rarity__block-item">
        <div class="rarity__block-item-info">
          <h3 class="rarity__block-item-info-rank">N</h3>
          <h3 class="rarity__block-item-info-quantity">0</h3>
          <h3 class="rarity__block-item-info-probability">0</h3>
          <button class="gradient-button rarity__block-item-info-plus" @click="showAddNftPage"><img src="/plus.svg" alt="plus"></button>
        </div>
        <img src="/close-bold.svg" alt="close" class="rarity__block-item-close">
      </div>
      <p class="rarity__block-add">Add NFT <span>+</span></p>
    </div>
    <h4 class="rarity__subtitle">You need to create at least 4 ranks</h4>
    <p class="rarity__ranks">Total filled ranks: 0</p>
    <h2 class="rarity__total">Total Boxes:  0</h2>
    <div class="rarity__buttons">
      <button class="gradient-button rarity__buttons-back" @click="changeStep(1)"><img src="/array-right-long.svg" alt="array">Back</button>
      <button class="gradient-button rarity__buttons-next" @click="changeStep(3)">Next step<img src="/array-right-long.svg" alt="array"></button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    nextStep() {
      this.$emit('nextStep', 3)
    },
    showAddNftPage() {
      this.$emit('changePage', true)
    },
    changeStep(step) {
      this.$emit('routeBack', step)
    }
  }
}
</script>
<style lang="scss">
.rarity {
  width: 90.2rem;
  padding-left: 25.1rem;
  padding-top: 5.8rem;
  padding-bottom: 10rem;
  &__title {
    font-family: OpenSans-Medium;
    letter-spacing: 0.06em;
  }
  &__header {
    padding: 1.3rem 1.6rem;
    background: $lightGreen;
    margin-top: 3rem;
    margin-bottom: 2.8rem;
    width: 79rem;
    display: grid;
    grid-template-columns: 24.1rem 24rem 24rem 7rem;
    align-items: center;
    &-text {
      display: flex;
      align-items: center;
      letter-spacing: 0.04em;
      img {
        padding-left: .75rem;
        width: 1.5rem;
      }
    }
  }
  &__block {
    padding-bottom: 2.6rem;
    &-item {
      display: flex;
      align-items: center;
      &-info {
        display: grid;
        grid-template-columns: 24.4rem 24.1rem 23.6rem 7rem;
        padding: .8rem 1.4rem;
        align-items: center;
        margin-top: .8rem;
        border: .1rem solid $lightGreen;
        &-plus {
          width: 6.4rem;
          height: 6.4rem;
          border-radius: .8rem;
          cursor: pointer;
          &::after {
            border-radius: .8rem;
          }
          img {
            width: 1.5rem;
          }
        }
      }
      &-close {
        width: 1.4rem;
        padding-left: 3.3rem;
      }
    }
    &-add {
      display: flex;
      align-items: center;
      span {
        font-size: 3rem;
        padding-left: 1.2rem;
      }
    }
  }
  &__subtitle {
    color: $border;
    letter-spacing: 0.03em;
  }
  &__ranks {
    padding-top: 1rem;
  }
  &__total {
    padding-top: 2.2rem;
    letter-spacing: 0.03em;
  }
  &__buttons {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-top: 3rem;
    padding-right: 8.5rem;
    &-next {
      width: 14.6rem;
      height: 5.2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      img {
        padding-left: 1rem;
      }
    }
    &-back {
      width: 14.6rem;
      height: 5.2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 1.6rem;
      cursor: pointer;
      img {
        padding-left: 1rem;
        transform: rotate(180deg);
      }
    }
  }
}
</style>
