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
          <img :src="getNFTImage(nft)" alt="item" class="nft__block-image" v-if="nft.image">
          <div class="nft__block-image-loading" v-else>
            <img src="/loading-button.svg" alt="load">
          </div>

          <!-- INFO BUYER -->

          <div class="nft__block-info" v-if="!seller">
            <h1 class="nft__block-info-name">{{ nft.name }}</h1>
            <p class="nft__block-info-description">{{ nft.description }}</p>
            <p class="nft__block-info-price-text" v-if="isSellNFT && nft.market_status === 'LISTED'">Price</p>
            <div class="nft__block-info-price" v-if="isSellNFT && nft.market_status === 'LISTED'"><img src="/celo.svg" alt="celo"><h1>{{ nft.price }} CELO</h1><span>= {{ priceToken }}$</span></div>
<!--            <p class="nft__block-info-date" v-if="isSellNFT && nft.market_status === 'LISTED'"><img src="/time.svg" alt="time"> Sale ends in-->
<!--              {{ daysDifference }} days-->
<!--              {{ hoursDifference }} hours-->
<!--              {{ minutesDifference }} minutes-->
<!--            </p>-->
            <div class="nft__block-info-status">
              <p class="nft__block-info-status-title">Market status</p>
              <h3 class="nft__block-info-status-content">{{ nft.market_status === "BOUGHT" || nft.market_status === 'MINT' ? 'Not for sale' : 'For Sale'}}</h3>
            </div>
            <button class="nft__block-info-buy" @click="showBuyTokenModal = true" v-if="isSellNFT && nft.market_status === 'LISTED'">Buy now</button>
          </div>

          <!-- INFO SELLER -->

          <div class="nft__block-info" v-else-if="listStatus === 'default' && seller">
            <h1 class="nft__block-info-name">{{ nft.name }}</h1>
            <p class="nft__block-info-description" v-if="isSellNFT">{{ nft.description }}</p>
            <p class="nft__block-info-price-text" v-if="isSellNFT && nft.market_status === 'LISTED'">Price</p>
            <div class="nft__block-info-price" v-if="isSellNFT && nft.market_status === 'LISTED'">
              <img src="/celo.svg" alt="celo">
              <h1>{{ nft.price }} CELO</h1>
              <span>= {{ priceToken }}$</span>
            </div>
<!--            <p class="nft__block-info-date" v-if="isSellNFT"><img src="/time.svg" alt="time"> Sale ends in-->
<!--              {{ daysDifference }} days-->
<!--              {{ hoursDifference }} hours-->
<!--              {{ minutesDifference }} minutes-->
<!--            </p>-->
            <div class="nft__block-info-status">
              <p class="nft__block-info-status-title">Market status</p>
              <h3 class="nft__block-info-status-content">
                {{ nft.market_status === "BOUGHT" || nft.market_status === 'MINT' ? 'Not for sale' : 'For Sale'}}
              </h3>
            </div>
<!--            <h3 class="nft__block-info-transfer"><img src="/transfer.svg" alt="transfer">Transfer</h3>-->
            <button class="nft__block-info-sell gradient-button" @click="listStatus = 'active'"  v-if="nft.market_status !== 'LISTED'">Sell</button>
            <div class="nft__content-buttons nft__content-buttons-mini" v-else>
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
<!--              <button-->
<!--                class="nft__content-buttons-button nft__content-buttons-button-confirm gradient-button"-->
<!--                @click="listStatus = 'change'"-->
<!--              >-->
<!--                Change sell price-->
<!--              </button>-->
            </div>
          </div>

          <!-- LIST INFO ACTIVE -->


          <div class="nft__block-info" v-else-if="listStatus === 'active'">
            <h1 class="nft__block-info-name">List onto market</h1>
            <Navigation :step="step" />
            <SellPrice @changeStep="changeStep" @setInfo="setInfoNft" v-if="step === 1"/>
            <Approve @changeStep="changeStep" v-if="step === 2"/>
            <Sign @changeStep="changeStep" @setInfo="setInfoNft" :price="nftInfo.price" v-if="step === 3"/>
            <Listing @changeStep="changeStep" :nft="nftInfo" v-if="step === 4" />
            <Successful @changeList="changeList" :price="nftInfo.price" v-if="step === 5"/>
          </div>

          <!-- LIST INFO CHANGE -->

          <div class="nft__block-info" v-else-if="listStatus === 'change'">
            <h1 class="nft__block-info-name">List onto market</h1>
            <Navigation :step="step" :changeInfo="true" />
            <SellPrice @changeStep="changeStep" :changeInfo="true" v-if="step === 1"/>
            <Sign @changeStep="changeStep" :changeInfo="true" :price="nftInfo.price"  v-if="step === 3"/>
            <Successful @changeList="changeList" :price="nftInfo.price" v-if="step === 4"/>
          </div>
        </div>
      </div>
    </div>
  <Attributes :item="attributes" :info="nft"/>
 <BuyToken v-if="showBuyTokenModal" :price="nft.price" @closeModal="closeModal"/>
  <SuccessfullBuy v-if="showSuccessModal" :image="getNFTImage(nft)" :name="nft.name"/>
<!--    <History />-->
  </section>
</template>
<script>
import Attributes from '@/components/nft-id/Attributes';
import History from '@/components/nft-id/History-table';
import SellPrice from '@/components/sale-nft/SellPrice';
import Approve from '@/components/sale-nft/Approve';
import Sign from '@/components/sale-nft/Sign';
import Listing from '@/components/sale-nft/Listing';
import Successful from '@/components/sale-nft/Successful';
import Navigation from '@/components/sale-nft/Navigation';
import BuyToken from '@/components/modals/buyToken';
import SuccessfullBuy from '@/components/modals/successBuy';
export default {
  data() {
    return {
      attributes: [],
      showBuyTokenModal: false,
      nft: {
        price: 0
      },
      priceToken: 0,
      listStatus: 'default',
      step: 1,
      loadButton: false,
      nftInfo: {},
      daysDifference: 0,
      hoursDifference: 0,
      minutesDifference: 0,
      secondsDifference: 0,
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
    Successful,
    BuyToken,
    SuccessfullBuy
  },
  async mounted() {
    await this.loadNft()
    const price = await this.$store.dispatch('getPriceToken')
    this.priceToken = (price.value * this.nft.price).toFixed(1)
    await this.getAttributes()
    setInterval(() => {
      if(Date.now() / 1000 <= this.nft.updatedAt * 1000) {
        this.timeDifference();
      } else {
        this.daysDifference = 0;
        this.hoursDifference = 0;
        this.minutesDifference = 0;
        this.secondsDifference = 0;
      }
    }, 1000)
  },
  computed: {
    isSellNFT() {
      return this.nft.market_status !== 'BOUGHT' && this.nft.price !== 0
    },
    showSuccessModal() {
      return this.$store.state.successBuyToken
    },
    getDate() {
      const month = ['January', 'February', 'March',
        'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'];
      let getDate = new Date(+this.nft.updatedAt * 1000)
      return `
      ${month[getDate.getMonth()]}
      ${getDate.getDate()},
      ${getDate.getFullYear()} at
      ${getDate.getHours()}:${getDate.getUTCMinutes() < 10 ? '0' + getDate.getUTCMinutes() : getDate.getMinutes()}`

    },
    seller() {
      return this.nft.owner === this.$store.state.fullAddress
    }
  },
  methods: {
    async loadNft() {
      const nft = await this.$store.dispatch('getNft', {
        id: this.$route.params.nftid,
        collectionId: this.$route.params.collectionid
      })
      this.nft = {
        ...nft,
        price: nft.price / 1000
      }
    },
    closeModal(payload) {
      this.showBuyTokenModal = payload
    },
    timeDifference() {
      let difference = this.nft.updatedAt * 1000 - new Date();
      this.daysDifference = Math.floor(difference/1000/60/60/24)
      difference -= this.daysDifference*1000*60*60*24

      this.hoursDifference = Math.floor(difference/1000/60/60)
      difference -= this.hoursDifference*1000*60*60

      this.minutesDifference = Math.floor(difference/1000/60)
      difference -= this.minutesDifference*1000*60

      this.secondsDifference = Math.floor(difference/1000)
    },
   async removeFromMarket() {
      this.loadButton = true
      const res = await this.$store.dispatch('removeNft', this.nft.contract_id)
      console.log('0000', res)
      if (res) {
        this.step = 1
        this.listStatus = 'default'
        if (process.browser) {
          await this.loadNft()
        }
      }
    },
    changeStep(step) {
      this.step = step
    },
    async changeList(list) {
      this.listStatus = list
      this.step = 1
      await this.loadNft()
    },
    setInfoNft(info) {
      this.nftInfo = info
    },
    async getAttributes() {
      const attributes = []
      this.nft.trait.forEach(item => {
        const attributeItem = JSON.parse(item);
        attributes.push({
          trait_type: Object.keys(attributeItem)[0],
          value: Object.values(attributeItem)[0]
        })
      })
      this.attributes = attributes
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
      &-date {
        padding-top: 1.8rem;
        color: $grayLight;
        display: flex;
        align-items: center;
        img {
          width: 2rem;
          margin-right: 1rem;
        }
      }
      &-owner {
        padding-top: 2.4rem;
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
    &-fee {
      padding-top: 2.1rem;
      color: $border;
      letter-spacing: 0.03em;
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
        font-family: OpenSans-Regular;
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
  #nft {
    width: 30.4rem;
  }
  .nft {
    &__crumbs {
      display: none;
    }
    &__block {
      grid-template-columns: 1fr;
      padding: 0;
      margin: 0;
      &-image {
        width: 30.4rem;
        height: 30.4rem;
        &-loading {
          width: 30.4rem;
          height: 30.4rem;
        }
      }
      &-info {
        text-align: left;
        padding-top: 1.8rem;
        padding-bottom: 2rem;
        &-company {
          font-size: 1.4rem;
        }
        &-name {
          text-align: left;
          padding-top: 1rem;
          font-size: 2.2rem;
        }
        &-minted {
          font-size: 1.4rem;
          padding-top: .5rem;
        }
        &-description {
          padding-top: 1.5rem;
        }
        &-price {
          padding-top: 1rem;
          img {
            width: 2rem;
            margin-right: 1.5rem;
          }
          h1 {
            font-size: 1.8rem;
          }
        }
        &-date {
          display: none;
        }
        &-buy {
          margin-top: 4rem;
          width: 100%;
        }
      }
    }
  }
}
</style>
