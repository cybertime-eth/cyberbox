<template>
  <section id="list-nft">
    <div class="list-nft">
      <div class="list-nft__container container-xl">
        <nuxt-link to="/collections/daopolis" class="list-nft__crumbs">
          Marketplace
          <img src="/array-right.svg" alt="array">
          <span>{{ card.name }}</span>
        </nuxt-link>
        <div class="list-nft__block">
          <img :src="card.image" alt="item" class="list-nft__block-image" v-if="card.image">
          <div v-else class="list-nft__block-image-loading">
            <img src="/loading-button.svg" alt="load">
          </div>

          <!-- LIST INFO DEFAULT -->

          <div class="list-nft__block-info" v-if="listStatus === 'default'">
            <h1 class="list-nft__block-info-name">{{ card.name }}</h1>
            <h3 class="list-nft__block-info-minted">Rarity rank 3629</h3>
            <div class="list-nft__block-info-status">
              <p class="list-nft__block-info-status-title">Market status</p>
              <h3 class="list-nft__block-info-status-content">For sale</h3>
            </div>
            <h3 class="list-nft__block-info-transfer">Transfer</h3>
            <button class="list-nft__block-info-buy gradient-button" @click="listStatus = 'active'">List onto market</button>
          </div>

          <!-- LIST INFO ACTIVE -->


          <div class="list-nft__block-info" v-else-if="listStatus === 'active'">
            <h1 class="list-nft__block-info-name">List onto market</h1>
            <Navigation :step="step" />
            <SellPrice @changeStep="changeStep" v-if="step === 1"/>
            <Approve @changeStep="changeStep" v-if="step === 2"/>
            <Sign @changeStep="changeStep" v-if="step === 3"/>
            <Listing @changeStep="changeStep" v-if="step === 4"/>
            <Successful @changeList="changeList" v-if="step === 5"/>
          </div>


          <!-- LIST INFO CHANGE -->


          <div class="list-nft__block-info" v-else-if="listStatus === 'change'">
            <h1 class="list-nft__block-info-name">List onto market</h1>
            <Navigation :step="step" :changeInfo="true" />
            <SellPrice @changeStep="changeStep" :changeInfo="true" v-if="step === 1"/>
            <Sign @changeStep="changeStep"  v-if="step === 3"/>
            <Successful @changeList="changeList" v-if="step === 4"/>
          </div>

          <!-- LIST INFO DONE -->

          <div class="list-nft__block-info" v-else>
            <h1 class="list-nft__block-info-name">{{ card.name }}</h1>
            <h3 class="list-nft__block-info-minted">Rarity rank 3629</h3>
            <p class="list-nft__block-info-price-text">Price</p>
            <div class="list-nft__block-info-price"><img src="/celo.png" alt="celo"><h1>2 CELO</h1><span>= 30$</span></div>
            <p class="list-nft__block-info-description">{{ card.description }}</p>
            <div class="list-nft__block-info-status">
              <p class="list-nft__block-info-status-title">Market status</p>
              <h3 class="list-nft__block-info-status-content">For sale</h3>
            </div>
            <div class="list-nft__content-buttons list-nft__content-buttons-mini">
              <button
                class="
                list-nft__content-buttons-button
                list-nft__content-buttons-button-confirm
                list-nft__content-buttons-button-cancel"
                @click="removeFromMarket"
              >
                Remove from market
                <img src="/loading-button.svg" alt="load" v-if="loadButton">
              </button>
              <button
                class="list-nft__content-buttons-button list-nft__content-buttons-button-confirm gradient-button"
                @click="listStatus = 'change'"
              >
                Change sell price
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
    <Attributes :item="card"/>
<!--    <History />-->
  </section>
</template>
<script>
import Attributes from '@/components/card-id/Attributes'
import History from '@/components/card-id/History-table'
import SellPrice from '@/components/list-nft/SellPrice'
import Approve from '@/components/list-nft/Approve'
import Sign from '@/components/list-nft/Sign'
import Listing from '@/components/list-nft/Listing'
import Successful from '@/components/list-nft/Successful'
import Navigation from '@/components/list-nft/Navigation'
export default {
  data() {
    return {
      listStatus: 'default',
      step: 1,
      loadButton: false
    }
  },
  components: {
    Attributes,
    History,
    Navigation,
    SellPrice,
    Approve,
    Sign,
    Listing,
    Successful
  },
  async mounted() {
    await this.$store.dispatch('getCeloCard', this.$route.params.nftid)
  },
  methods: {
    removeFromMarket() {
      this.loadButton = true
      setTimeout(() => {
        this.step = 1
        this.listStatus = 'default'
      }, 2000)
    },
    changeStep(step) {
      this.step = step
    },
    changeList(list) {
      this.listStatus = list
      this.step = 1
    }
  },
  computed: {
    card() {
      return this.$store.state.card
    }
  }
}
</script>
<style lang="scss">
#list-nft {
  padding-bottom: 10rem;
  padding-top: 4rem;
}
.list-nft {
  box-shadow: 0 .4rem 1.2rem rgba(0, 0, 0, 0.05);
  padding-bottom: 3rem;
  &__crumbs {
    display: flex;
    align-items: center;
    color: $border;
    span {
      color: $pink;
      margin-left: 1rem;
    }
    img {
      margin-left: 1rem;
    }
  }
  &__block {
    display: grid;
    grid-template-columns: 56.6rem 1fr;
    grid-column-gap: 10.2rem;
    justify-content: space-between;
    padding-top: 4.5rem;
    &-image {
      width: 56.6rem;
      height: 56.6rem;
      object-fit: cover;
      &-loading {
        width: 56.6rem;
        height: 56.6rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border: .1rem solid $pink;
        img {
          width: 8rem;
          animation: loading 1s infinite;
        }
      }
    }
    &-info {
      &-name {
        font-family: Cabin-Bold;
      }
      &-minted {
        font-family: OpenSans-Regular;
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
      &-description {
        padding-top: 1rem;
      }
      &-status {
        padding-top: 3.2rem;
        &-content {
          font-size: 1.8rem;
          padding-top: .4rem;
          font-family: OpenSans-SemiBold;
        }
      }
      &-transfer {
        padding-top: 3.2rem;
        font-family: OpenSans-SemiBold;
      }
      &-buy {
        margin-top: 10rem;
        width: 22.4rem;
        height: 5.4rem;
        color: $pink;
        ::after {
          border-radius: 2.5rem;

        }
      }
    }
  }
  &__content {
    padding-top: 2rem;
    &-title {
      font-family: Cabin-Medium;
      font-weight: 500;
    }
    &-time {
      margin-top: 2.4rem;
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: space-between;
      border: .1rem solid $modalColor;
      border-radius: 2.5rem;
      &-button {
        width: 14.7rem;
        height: 5.4rem;
        border-radius: 2.5rem;
        background: none;
      }
    }
    &-active {
      background: $lightGreen;
    }
    &-form {
      margin-top: 2.4rem;
      &-title {
        letter-spacing: 0.03em;
      }
      &-input {
        margin-top: 1.8rem;
        width: 97%;
        height: 1.5rem;
        border-radius: .4rem;
      }
    }
    &-subtitle {
      padding-top: 3.2rem;
      &-second {
        padding-top: 1.6rem;
      }
    }
    &-text {
      padding-top: 1rem;
      &-border {
        padding-top: 3.2rem;
        padding-bottom: 2.4rem;
        border-bottom: .1rem solid $modalColor;
      }
    }
    &-date {
      padding-bottom: 2.4rem;
      padding-top: 4rem;
      border-bottom: .1rem solid $modalColor;
    }
    &-price {
      padding-top: 1.6rem;
    }
    &-buttons {
      padding-top: 6.1rem;
      display: flex;
      align-items: center;
      &-mini {
        padding-top: 3.7rem;
      }
      &-button {
        width: 16.4rem;
        height: 5.4rem;
        margin-right: 1.6rem;
        &-cancel {
          background: none;
          border: .1rem solid $border;
        }
        &-confirm {
          width: 26.2rem;
          height: 5.4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            margin-left: 1rem;
            animation: loading 1s infinite;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 460px) {
  .list-nft {
    &__block {
      grid-template-columns: 1fr;
      &-image {
        width: 32.6rem;
        height: 32.6rem;
      }
      &-info {
        text-align: center;
        &-name {
          text-align: center;
          padding-top: 2rem;
        }
        &-price {
          justify-content: center;
        }
        &-buy {
          margin-top: 4rem;
        }
      }
    }
    &__navigation {
      width: 32rem;
      margin: 0;
    }
  }
}
</style>
