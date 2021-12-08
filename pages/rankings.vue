<template>
  <div class="rankings container-xl">
    <h1 class="rankings__title">NFT Ranking</h1>
    <h3 class="rankings__subtitle">With trading volume, floor price and etc., you can find the most trending NFTs here.</h3>
    <div class="rankings__navigation">
      <button class="rankings__navigation-button">7 Days</button>
      <button class="rankings__navigation-button rankings__navigation-button-active">30 Days</button>
    </div>
    <div class="rankings__table">
      <div class="rankings__table-header">
        <h3>#</h3>
        <h3>Collection</h3>
        <h3>Volume</h3>
        <h3>24h %</h3>
        <h3>7d %</h3>
        <h3>Floor Price</h3>
        <h3>Owners</h3>
        <h3>Items</h3>
      </div>
      <div class="rankings__table-content">
        <div class="rankings__table-content-item" v-for="item of list">
          <h3 class="rankings__table-content-item-number">{{ item.id }}</h3>
          <div class="rankings__table-content-item-collection">
            <div class="rankings__table-content-item-collection-image">
              <img :src="item.collectionImage" alt="item" class="rankings__table-content-item-collection-image-avatar">
              <img src="/confirmed.svg" alt="verify" class="rankings__table-content-item-collection-image-verify" v-if="item.verification">
              <div class="rankings__table-content-item-collection-image-new" v-if="item.new"></div>
              <h3 class="rankings__table-content-item-collection-image-new-active">New</h3>
            </div>
            <h3 class="rankings__table-content-item-collection-name">{{ item.name }}</h3>
          </div>
          <div class="rankings__table-content-item-volume">
            <h3 class="rankings__table-content-item-volume-title">${{ item.volumePrice }}</h3>
            <p class="rankings__table-content-item-volume-subtitle">{{ item.volumeCelo }} CELO</p>
          </div>
          <h3 class="rankings__table-content-item-day" :style="item.statDay >= 0 ? 'color: #27AE60;' : 'color: #BA0000;'">{{ item.statDay }}%</h3>
          <h3 class="rankings__table-content-item-week" :style="item.statWeek >= 0 ? 'color: #27AE60;' : 'color: #BA0000;'">{{ item.statWeek }}%</h3>
          <div class="rankings__table-content-item-floor">
            <h3 class="rankings__table-content-item-floor-title">${{ item.floorPrice }}</h3>
            <p class="rankings__table-content-item-floor-subtitle">{{ item.floorPriceCelo }} CELO</p>
          </div>
          <h3 class="rankings__table-content-item-owners">{{ item.owners }}</h3>
          <h3 class="rankings__table-content-item-items">{{ item.items }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          id: 1,
          collectionImage: '/item-1.png',
          verification: false,
          new: true,
          name: 'Farm Planet Land NFT Ga',
          volumePrice: 77405.88,
          volumeCelo: 146.3,
          statDay: 3,
          statWeek: 7,
          floorPrice: 25765.54,
          floorPriceCelo: 0.32,
          owners: 288,
          items: 344,
        },
        {
          id: 2,
          collectionImage: '/item-2.png',
          verification: true,
          new: false,
          name: 'Catgirl NFT',
          volumePrice: 46725.11,
          volumeCelo: 146.3,
          statDay: -13,
          statWeek: 27,
          floorPrice: 25765.54,
          floorPriceCelo: 0.32,
          owners: 2288,
          items: 344,
        },
        {
          id: 3,
          collectionImage: '/item-3.png',
          verification: true,
          new: true,
          name: 'Абра кадабра',
          volumePrice: 0,
          volumeCelo: 0,
          statDay: 99,
          statWeek: -122,
          floorPrice: 0.54,
          floorPriceCelo: 0.32,
          owners: 0,
          items: 0,
        },
        {
          id: 4,
          collectionImage: '/item-4.png',
          verification: false,
          new: false,
          name: 'Bitcoin',
          volumePrice: 0,
          volumeCelo: 0,
          statDay: 2299,
          statWeek: -1122,
          floorPrice: 0.54,
          floorPriceCelo: 0.32,
          owners: 0,
          items: 0,
        },
      ]
    }
  }
}
</script>
<style lang="scss">
.rankings {
  padding-top: 2.6rem;
  &__title {
    text-align: center;
  }
  &__subtitle {
    letter-spacing: 0.04em;
    padding-top: 1rem;
    text-align: center;
    font-family: OpenSans-SemiBold;
  }
  &__navigation {
    display: flex;
    align-items: center;
    padding-top: 5rem;
    &-button {
      width: 9.15rem;
      height: 4rem;
      border-radius: .8rem;
      box-shadow: 0 .2rem .8rem rgba(0, 0, 0, 0.05);
      background: $white;
      margin-right: 2rem;
      font-family: OpenSans-Regular;
      &-active {
        background: $modalColor;
        box-shadow: none;
        font-family: OpenSans-SemiBold;
      }
    }
  }
  &__table {
    width: 100%;
    padding-top: 2.4rem;
    &-header {
      display: grid;
      background: $modalColor;
      height: 4rem;
      grid-template-columns: 8.5rem 22.5rem 15rem 17rem 16.5rem 17rem 17rem 16.5rem;
      align-items: center;
      justify-items: flex-end;
      :first-child {
        justify-self: center;
      }
      :nth-child(2) {
        justify-self: flex-start;
      }
      h3 {
        letter-spacing: 0.04em;
      }
    }
    &-content {
      &-item {
        display: grid;
        grid-template-columns: 8.5rem 22.5rem 15rem 17rem 16.5rem 17rem 17rem 16.5rem;
        height: 8rem;
        border-bottom: .1rem solid $modalColor;
        align-items: center;
        :first-child {
          justify-self: center;
        }
        &-collection {
          display: flex;
          align-items: center;
          &-image {
            position: relative;
            &-avatar {
              width: 4.8rem;
              height: 4.8rem;
              border-radius: 50%;
              object-fit: cover;
            }
            &-verify {
              position: absolute;
              width: 1.6rem;
              height: 1.6rem;
              right: 0;
              bottom: 0;
            }
            &-new {
              width: .8rem;
              height: .8rem;
              background: $green;
              position: absolute;
              left: .5rem;
              top: 0;
              border-radius: 50%;
              &:hover ~ .rankings__table-content-item-collection-image-new-active {
                display: block;
              }
              &-active {
                display: none;
                padding: .6rem 1.65rem;
                background: $lightGreen;
                position: absolute;
                left: -2rem;
                top: -3.5rem;
              }
            }
          }
          &-name {
            font-family: OpenSans-SemiBold;
            padding-left: .8rem;
            letter-spacing: 0.04em;
          }
        }
        &-volume {
          justify-self: flex-end;
          text-align: right;
          &-title {
            letter-spacing: 0.03em;
          }
          &-subtitle {
            padding-top: .4rem;
            color: $textColor3;
          }
        }
        &-day {
          justify-self: flex-end;
        }
        &-week {
          justify-self: flex-end;
        }
        &-floor {
          justify-self: flex-end;
          text-align: right;
          &-title {
            letter-spacing: 0.03em;
          }
          &-subtitle {
            padding-top: .4rem;
            color: $textColor3;
          }
        }
        &-owners {
          justify-self: flex-end;
        }
        &-items {
          justify-self: flex-end;
        }
      }
    }
  }
}
</style>
