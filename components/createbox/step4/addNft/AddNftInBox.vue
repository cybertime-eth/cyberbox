<template>
  <div class="add-nft__items">
    <div class="add-nft__item">
      <div class="add-nft__item-info">
        <img src="/item-1.png" alt="item" class="add-nft__item-info-image">
        <div class="add-nft__item-block">
          <h3 class="add-nft__item-info-name">Mega magic Box</h3>
          <h3 class="add-nft__item-info-price">0.38477  SAVENFT</h3>
          <p class="add-nft__item-info-price-text">Price</p>
          <div class="add-nft__item-info-count">
            <img src="/cub.svg" alt="quad">
            <h4>x1</h4>
          </div>
        </div>
      </div>
      <button class="gradient-button add-nft__item-plus"><img src="/plus.svg" alt="plus"></button>
    </div>
    <div class="add-nft__item">
      <div class="add-nft__item-info">
        <img src="/item-2.png" alt="item" class="add-nft__item-info-image">
        <div class="add-nft__item-block">
          <h3 class="add-nft__item-info-name">Mega magic Box</h3>
          <h3 class="add-nft__item-info-price">0.38477  SAVENFT</h3>
          <p class="add-nft__item-info-price-text">Price</p>
          <div class="add-nft__item-info-count">
            <img src="/cub.svg" alt="quad">
            <h4>x1</h4>
          </div>
        </div>
      </div>
      <button class="gradient-button add-nft__item-plus"><img src="/plus.svg" alt="plus"></button>
    </div>
    <div class="add-nft__item">
      <div class="add-nft__item-info">
        <img src="/item-3.png" alt="item" class="add-nft__item-info-image">
        <div class="add-nft__item-block">
          <h3 class="add-nft__item-info-name">Mega magic Box</h3>
          <h3 class="add-nft__item-info-price">0.38477  SAVENFT</h3>
          <p class="add-nft__item-info-price-text">Price</p>
          <div class="add-nft__item-info-count">
            <img src="/cub.svg" alt="quad">
            <h4>x1</h4>
          </div>
        </div>
      </div>
      <button class="gradient-button add-nft__item-plus"><img src="/plus.svg" alt="plus"></button>
    </div>
    <div class="add-nft__item">
      <div class="add-nft__item-info">
        <img src="/item-4.png" alt="item" class="add-nft__item-info-image">
        <div class="add-nft__item-block">
          <h3 class="add-nft__item-info-name">Mega magic Box</h3>
          <h3 class="add-nft__item-info-price">0.38477  SAVENFT</h3>
          <p class="add-nft__item-info-price-text">Price</p>
          <div class="add-nft__item-info-count">
            <img src="/cub.svg" alt="quad">
            <h4>x1</h4>
          </div>
        </div>
      </div>
      <button class="gradient-button add-nft__item-plus"><img src="/plus.svg" alt="plus"></button>
    </div>
  </div>
</template>
<style lang="scss">
.add-nft {
  &__items {
    display: grid;
    grid-template-columns: 31.5rem 31.5rem 31.5rem 31.5rem;
    grid-gap: 2rem;
    margin-top: 2.4rem;
    padding-bottom: 10rem;
  }
  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    &-plus {
      width: 4.4rem;
      height: 4.4rem;
      margin-top: 3rem;
      border-radius: .8rem;
      cursor: pointer;
      &::after {
        border-radius: .8rem;
      }
      img {
        width: 1.5rem;
      }
    }
    &-block {
      padding: .5rem 1.5rem 1.5rem;
      display: flex;
      flex-direction: column;
    }
    &-info {
      width: 100%;
      box-shadow: 0 .4rem 1.2rem rgba(0, 0, 0, 0.05);
      border-radius: .4rem;
      &-image {
        width: 31.5rem;
        height: 31.2rem;
        object-fit: cover;
      }
      &-name {
        letter-spacing: 0.04em;
      }
      &-price {
        letter-spacing: 0.04em;
        padding-top: 1.5rem;
        &-text {
          color: $border;
          font-size: 1.1rem;
        }
      }
      &-count {
        display: flex;
        align-items: center;
        align-self: end;
        justify-content: space-around;
        box-shadow: 0 .4rem 1.2rem rgba(0, 0, 0, 0.05);
        border-radius: .4rem;
        width: 4.8rem;
        height: 2rem;
        margin-top: 2rem;
      }
    }
  }
}
</style>
