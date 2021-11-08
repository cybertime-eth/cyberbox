<template>
  <section id="card">
    <div class="card container-xl">
      <nuxt-link to="/collections/daopolis" class="card__crumbs">
        Marketplace
        <img src="/array-right.svg" alt="array">
        <span>Daopolis #11111</span>
      </nuxt-link>
      <div class="card__block">
        <img src="/daopolis-nft.png" alt="item" class="card__image">
        <div class="card__info">
          <h1 class="card__info-name">Daopolis #11111</h1>
          <h3 class="card__info-minted">Rarity rank 3629</h3>
          <p class="card__info-price-text">Price</p>
          <div class="card__info-price"><img src="/celo.png" alt="celo"><h1>2 CELO</h1><span>= 30$</span></div>
          <p class="card__info-description">Sale ends in 29 days 23 hours 58 minutes</p>
          <div class="card__info-status">
            <p class="card__info-status-title">Market status</p>
            <h3 class="card__info-status-content">For sale</h3>
          </div>
          <button class="card__info-buy">Buy now</button>
        </div>
      </div>
    </div>
  </section>
</template>
<style lang="scss">
.card {
  padding-top: 4rem;
  padding-bottom: 18rem;
  &__crumbs {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 26rem;
    color: $border;
    span {
      color: $pink;
    }
  }
  &__block {
    display: grid;
    grid-template-columns: 56.6rem 1fr;
    grid-column-gap: 10.2rem;
    justify-content: space-between;
    padding-top: 4.5rem;
  }
  &__image {
    width: 56.6rem;
  }
  &__info {
    &-name {
      font-family: Cabin-Bold;
    }
    &-minted {
      font-family: OpenSans-Regular;
      padding-top: 1rem;
    }
    &-description {
      padding-top: 1rem;
    }
    &-price {
      display: flex;
      align-items: center;
      img {
        width: 3.2rem;
        margin-right: 1rem;
      }
      &-text {
        padding-top: 3rem;
        padding-bottom: .5rem;
      }
      span {
        margin-left: 1.4rem;
        font-size: 1.3rem;
        color: $span;
      }
    }
    &-status {
      padding-top: 3.2rem;
      &-content {
        font-size: 1.8rem;
        padding-top: .4rem;
        font-family: OpenSans-SemiBold;
      }
    }
    &-buy {
      margin-top: 10rem;
      background: $pink;
      width: 22.4rem;
      height: 5.4rem;
      color: $white;
    }
  }
}
</style>
