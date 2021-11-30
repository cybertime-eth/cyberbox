<template>
  <section id="nft">
    <div class="nft">
      <div>
        <nuxt-link :to="'/collections/' + nft.contract" class="nft__crumbs">
          Marketplace
          <img src="/array-right.svg" alt="array">
          <span>{{ nft.name }}</span>
        </nuxt-link>


        <div class="nft__block">
          <img :src="nft.image" alt="item" class="nft__block-image" v-if="nft.image">
          <div class="nft__block-image-loading" v-else>
            <img src="/loading-button.svg" alt="load">
          </div>

          <!-- INFO BUYER -->

          <div class="nft__block-info" v-if="!seller">
            <h3 class="nft__block-info-company">Cybertime.finance</h3>
            <h1 class="nft__block-info-name">{{ nft.name }}</h1>
            <h3 class="nft__block-info-minted">Rarity rank {{ nft.rarity_rank }}</h3>
            <p class="nft__block-info-description">{{ nft.description }}</p>
            <p class="nft__block-info-price-text" v-if="nft.price !== 0">Price</p>
            <div class="nft__block-info-price" v-if="nft.price !== 0"><img src="/celo.png" alt="celo"><h1>{{ nft.price }} CELO</h1><span>= 30$</span></div>
            <div class="nft__block-info-status">
              <p class="nft__block-info-status-title">Market status</p>
              <h3 class="nft__block-info-status-content">{{ nft.market_status === "BOUGHT" || nft.market_status === 'MINT' ? 'Not for sale' : 'For Sale'}}</h3>
            </div>
            <button class="nft__block-info-buy" @click="buyToken" v-if="nft.price !== 0">Buy now</button>
          </div>

          <!-- INFO SELLER -->

          <div class="nft__block-info" v-else-if="listStatus === 'default'">
            <h3 class="nft__block-info-company">Cybertime.finance</h3>
            <h1 class="nft__block-info-name">{{ nft.name }}</h1>
            <h3 class="nft__block-info-minted">Rarity rank {{ nft.rarity_rank }}</h3>
            <div class="nft__block-info-status">
              <p class="nft__block-info-status-title">Market status</p>
              <h3 class="nft__block-info-status-content">{{ nft.market_status === "BOUGHT" || nft.market_status === 'MINT' ? 'Not for sale' : 'For Sale'}}</h3>
            </div>
            <h3 class="nft__block-info-transfer"><img src="/transfer.svg" alt="transfer">Transfer</h3>
            <button class="nft__block-info-sell gradient-button" @click="listStatus = 'active'">Sell</button>
          </div>

          <!-- LIST INFO ACTIVE -->


          <div class="nft__block-info" v-else-if="listStatus === 'active'">
            <h1 class="nft__block-info-name">List onto market</h1>
            <Navigation :step="step" />
            <SellPrice @changeStep="changeStep" @setInfo="setInfoNft" v-if="step === 1"/>
            <Approve @changeStep="changeStep" v-if="step === 2"/>
            <Sign @changeStep="changeStep" :nft="nftInfo" v-if="step === 3"/>
            <Successful @changeList="changeList" :price="nftInfo.price" v-if="step === 4"/>
          </div>

          <!-- LIST INFO CHANGE -->

          <div class="nft__block-info" v-else-if="listStatus === 'change'">
            <h1 class="nft__block-info-name">List onto market</h1>
            <Navigation :step="step" :changeInfo="true" />
            <SellPrice @changeStep="changeStep" :changeInfo="true" v-if="step === 1"/>
            <Sign @changeStep="changeStep" :price="nftInfo.price"  v-if="step === 3"/>
            <Successful @changeList="changeList" :price="nftInfo.price" v-if="step === 4"/>
          </div>

          <!-- LIST INFO DONE -->

          <div class="nft__block-info" v-else>
            <h1 class="nft__block-info-name">{{ nft.name }}</h1>
            <h3 class="nft__block-info-minted">Rarity rank 3629</h3>
            <p class="nft__block-info-price-text">Price</p>
            <div class="nft__block-info-price"><img src="/celo.png" alt="celo"><h1>2 CELO</h1><span>= 30$</span></div>
            <p class="nft__block-info-description">{{ nft.description }}</p>
            <div class="nft__block-info-status">
              <p class="nft__block-info-status-title">Market status</p>
              <h3 class="nft__block-info-status-content">For sale</h3>
            </div>
            <div class="nft__content-buttons nft__content-buttons-mini">
              <button
                class="
                nft__content-buttons-button
                nft__content-buttons-button-confirm
                nft__content-buttons-button-cancel"
                @click="removeFromMarket"
              >
                Remove from market
                <img src="/loading-button.svg" alt="load" v-if="loadButton">
              </button>
              <button
                class="nft__content-buttons-button nft__content-buttons-button-confirm gradient-button"
                @click="listStatus = 'change'"
              >
                Change sell price
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  <Attributes :item="attributes" :info="nft"/>
<!--    <History />-->
  </section>
</template>
<script>
import Attributes from '@/components/nft-id/Attributes'
import History from '@/components/nft-id/History-table'
import SellPrice from '@/components/sale-nft/SellPrice'
import Approve from '@/components/sale-nft/Approve'
import Sign from '@/components/sale-nft/Sign'
import Successful from '@/components/sale-nft/Successful'
import Navigation from '@/components/sale-nft/Navigation'
export default {
  data() {
    return {
      attributes: [],
      nft: {
        price: 0
      },
      listStatus: 'default',
      step: 1,
      loadButton: false,
      nftInfo: {},
    }
  },
  components: {
    Attributes,
    History,
    Navigation,
    SellPrice,
    Approve,
    Sign,
    Successful
  },
  async mounted() {
    this.nft = await this.$store.dispatch('getNft', {
      id: this.$route.params.nftid,
      collectionId: this.$route.params.collectionid
    })
    await this.getAttributes()
  },
  computed: {
    seller() {
      return this.$store.state.testSeller
    }
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
    },
    setInfoNft(info) {
      this.nftInfo = info
    },
    buyToken() {
      this.$store.dispatch('approveBuyToken', {
        id: this.$route.params.nftid,
        price: this.nft.price
      })
    },
    async getAttributes() {
      const res =  await this.$axios.get(this.nft.attributes);
      this.attributes = res.data.attributes
    }
  },
}
</script>
<style lang="scss">
#nft {
  padding-bottom: 10rem;
  padding-top: 2.5rem;
  width: 109.6rem;
  margin: 0 auto;
}
.nft {
  padding-bottom: 3rem;
  &__crumbs {
    display: flex;
    align-items: center;
    color: $border;
    img {
      margin-left: 1rem;
    }
    span {
      color: $pink;
      margin-left: 1rem;
    }
  }
  &__block {
    display: grid;
    grid-template-columns: 52rem 52rem;
    box-shadow: 0 .4rem 1.2rem rgba(0, 0, 0, 0.05);
    grid-column-gap: 2.4rem;
    justify-content: space-between;
    padding: 1.6rem 1.5rem 4rem 1.5rem;
    margin-top: 2.5rem;
    &-image {
      width: 52rem;
      height: 52rem;
      object-fit: cover;
      border-radius: .4rem;
      &-loading {
        width: 52rem;
        height: 52rem;
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
      &-company {
        letter-spacing: 0.04em;
      }
      &-name {
        font-family: Cabin-Bold;
        padding-top: 1.5rem;
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
      &-sell {
        margin-top: 10rem;
        width: 22.4rem;
        height: 5.4rem;
        color: $pink;
      }
      &-transfer {
        padding-top: 3.2rem;
        font-family: OpenSans-SemiBold;
        display: flex;
        align-self: center;
        cursor: pointer;
        img {
          width: 1.6rem;
          padding-right: 1.1rem;
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
      margin-top: 4.6rem;
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
      &-second {
        padding-top: 6.2rem;
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
      padding-top: 9.7rem;
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
  .nft {
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
    &__crumbs {

    }
  }
}
</style>
