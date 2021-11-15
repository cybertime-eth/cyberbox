<template>
  <section class="collection container-xl">
    <div class="collection__header">
      <h1 class="collection__header-title">Daopolis</h1>
      <div class="collection__header-socials">
        <img src="/socials/disckord.svg" alt="social">
        <img src="/socials/telegram.svg" alt="social">
        <img src="/socials/twitter.svg" alt="social">
        <img src="/socials/web.svg" alt="social">
      </div>
      <div class="collection__header-info">
        <div class="collection__header-info-block">
          <h3 class="collection__header-info-block-title">{{ cards ? cards.length : 0 }}</h3>
          <h3 class="collection__header-info-block-subtitle">Items</h3>
        </div>
        <div class="collection__header-info-block">
          <h3 class="collection__header-info-block-title">76 CELO</h3>
          <h3 class="collection__header-info-block-subtitle">Volume traded</h3>
        </div>
        <div class="collection__header-info-block">
          <h3 class="collection__header-info-block-title">0.1 Celo</h3>
          <h3 class="collection__header-info-block-subtitle">Floor price</h3>
        </div>
      </div>
    </div>
    <div class="collection__filter">
      <button
        class="collection__filter-button"
        :class="{'collection__filter-button-active': filter === 1}"
        @click="filter = 1"
      >
        All
      </button>
      <button
        class="collection__filter-button"
        :class="{'collection__filter-button-active': filter === 2}"
        @click="filter = 2"
      >
        Listings
      </button>
      <button
        class="collection__filter-button"
        :class="{'collection__filter-button-active': filter === 3}"
        @click="filter = 3"
      >
        Sold
      </button>
    </div>
    <div class="collection__sort">
      <button
        class="collection__sort-button"
        :class="{'collection__sort-button-active': sort === 1}"
        @click="sort = 1"
      >
        Sold - Latest
      </button>
      <button
        class="collection__sort-button"
        :class="{'collection__sort-button-active': sort === 2}"
        @click="sort = 2"
      >
        Price - Lowest
      </button>
      <button
        class="collection__sort-button"
        :class="{'collection__sort-button-active': sort === 3}"
        @click="sort = 3"
      >
        Price - Highest
      </button>
      <button
        class="collection__sort-button"
        :class="{'collection__sort-button-active': sort === 4}"
        @click="sort = 4"
      >
        Traits
        <img src="/sort.svg" alt="sort">
      </button>
    </div>
    <div class="collection__items">
      <div class="collection__item" @click="$router.push(`/collections/daopolis/${index+1}`)" v-for="(card, index) of cards">
        <img :src="card.image" alt="item" class="collection__item-image">
        <div class="collection__item-info">
          <h2 class="collection__item-info-name">
            {{ card.name }}
          </h2>
          <div class="collection__item-info-price">
            <img src="/celo.png" alt="celo">
            <h3 class="collection__item-info-price-text">0.38477 <span>CELO</span></h3>
          </div>
          <p class="collection__item-info-type">Price</p>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      filter: 1,
      sort: 0,
    }
  },
  async created() {
    if (!this.cards.length) {
      await this.$store.dispatch('getCeloCards')
    }
  },
  computed: {
    cards() {
      return this.$store.state.cards
    }
  }
}
</script>
<style lang="scss">
.collection {
  padding-bottom: 20rem;
  &__header {
    padding-top: 2.6rem;
    display: grid;
    grid-template-columns: 60.5rem 17rem 46rem;
    justify-content: space-between;
    align-items: center;
    &-socials {
      display: flex;
      align-items: center;
      justify-content: space-between;
      :first-child {
        width: 2.1rem;
      }
      img {
        width: 2rem;
      }
    }
    &-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      &-block {
        width: 14.6rem;
        height: 6.8rem;
        border: .1rem solid $lightGreen;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        &-title {
          font-family: OpenSans-SemiBold;
        }
        &-subtitle {
          font-family: OpenSans-Regular;
          margin-top: .4rem;
        }
      }
    }
  }
  &__filter {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border: .1rem solid $modalColor;
    border-radius: 2.5rem;
    margin-top: 3rem;
    &-button {
      width: 42.6rem;
      height: 5.4rem;
      border-radius: 2.5rem;
      background: none;
      &-active {
        background: $lightGreen;
      }
    }
  }
  &__sort {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 3.2rem;
    &-button {
      width: 31.5rem;
      height: 4rem;
      box-shadow: 0 .4rem 1.2rem rgba(0, 0, 0, 0.05);
      border-radius: .8rem;
      background: none;
      font-family: OpenSans-Regular;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        margin-left: 1.2rem;
        width: 2rem;
      }
      &-active {
        background: $modalColor;
      }
    }
  }
  &__items {
    display: grid;
    grid-template-columns: 31.5rem 31.5rem 31.5rem 31.5rem;
    grid-column-gap: 2rem;
    grid-row-gap: 2rem;
    padding-top: 3.2rem;
  }
  &__item {
    width: 31.5rem;
    height: 48rem;
    border-radius: .4rem;
    box-shadow: 0 .4rem 1.2rem rgba(0, 0, 0, 0.05);
    cursor: pointer;
    &-image {
      width: 31.5rem;
      height: 31.5rem;
      object-fit: cover;
    }
    &-info {
      padding: 1.3rem 1.6rem 3.4rem;
      &-name {
        font-size: 1.8rem;
        font-family: OpenSans-SemiBold;
      }
      &-price {
        display: flex;
        align-items: center;
        padding-top: 2.5rem;
        img {
          width: 1.8rem;
        }
        &-text {
          padding-left: .8rem;
          font-family: OpenSans-SemiBold;
          span {
            padding-left: 1rem;
          }
        }
      }
      &-type {
        color: $border;
        font-size: 1.1rem;
      }
    }
  }
}
@media screen and (max-width: 460px) {
  .collection {
    &__items {
      grid-template-columns: 1fr;
    }
  }
}
</style>
