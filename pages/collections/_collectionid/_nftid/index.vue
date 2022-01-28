<template>
  <section id="nft">
    <div class="nft">
      <div>
        <a class="nft__crumbs" @click="handleClickBack">
          Back
          <img src="/array-right.svg" alt="array">
          <span>{{ nft.name }}</span>
        </a>


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
            <div class="nft__block-info-status" v-if="!soldByMe">
              <p class="nft__block-info-status-title">Market status</p>
              <h3 class="nft__block-info-status-content">{{ nft.market_status === "BOUGHT" || nft.market_status === 'MINT' ? 'Not for sale' : 'For Sale'}}</h3>
            </div>
            <div class="nft__block-info-status" v-else>
              <p class="nft__block-info-status-title">Last sold</p>
              <div class="nft__block-info-price sold">
                <img src="/celo.svg" alt="celo">
                <h1>{{ nft.price }} CELO</h1>
                <span>= {{ priceToken }}$</span>
              </div>
            </div>
            <button class="nft__block-info-buy" @click="handleClickBuyNow" v-if="isSellNFT && nft.market_status === 'LISTED'">Buy now</button>
          </div>

          <!-- INFO SELLER -->

          <div class="nft__block-info" v-else-if="listStatus === 'default' && seller">
            <h1 class="nft__block-info-name">{{ nft.name }}</h1>
            <p class="nft__block-info-description">{{ nft.description }}</p>
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
            <button class="nft__block-info-sell gradient-button" @click="handleClickSell"  v-if="nft.market_status !== 'LISTED'">Sell</button>
            <div class="nft__content-buttons nft__content-buttons-mini delist-buttons" v-else>
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
                @click="handleClickChangePrice"
              >
                Change price
              </button>
            </div>
          </div>

          <!-- LIST INFO ACTIVE -->


          <div class="nft__block-info" v-else-if="listStatus === 'active'">
            <h1 class="nft__block-info-name">List into market</h1>
            <!-- <Navigation :step="step" /> -->
            <!-- <SellPrice :changeInfo="isApprovedNft" @changeStep="changeStep" @setInfo="setInfoNft" v-if="step === 1"/> -->
            <!-- <Sign @changeStep="changeStep" @setInfo="setInfoNft" :price="nftPrice" v-if="step === 2"/> -->
            <Listing :nft="nft" @changeStep="changeStep" @setPrice="setNftPrice" v-if="step === 1" />
            <Successful @changeList="changeList" :price="nftPrice" v-if="step === 2"/>
          </div>

          <!-- LIST INFO CHANGE -->

          <div class="nft__block-info" v-else-if="listStatus === 'change'">
            <h1 class="nft__block-info-name">Change price</h1>
            <!-- <Navigation :step="step" :changeInfo="true" /> -->
            <!-- <SellPrice @changeStep="changeStep" :changeInfo="true" v-if="step === 1"/> -->
            <!-- <Sign @changeStep="changeStep" :changeInfo="true" :price="nftInfo.price"  v-if="step === 3"/> -->
            <Listing :nft="nft" @changeStep="changeStep" :changeInfo="true" @setPrice="setNftPrice" v-if="step === 1" />
            <Successful @changeList="changeList" :price="nftPrice" v-if="step === 2"/>
          </div>
        </div>
      </div>
    </div>
  <Attributes :item="attributes" :info="nft"/>
  <connect v-if="showConnectModal" @closeModal="closeModal"/>
  <WrongNetwork v-if="showWrongNetworkModal" @closeModal="showWrongNetworkModal = false"/>
  <BuyToken v-if="showBuyTokenModal" :nft="nft" :priceToken="priceToken" :balance="balance" @closeModal="closeModal"/>
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
import connect from '@/components/modals/connect'
import WrongNetwork from '@/components/modals/wrongNetwork'
import BuyToken from '@/components/modals/buyToken';
import SuccessfullBuy from '@/components/modals/successBuy';
export default {
  data() {
    return {
      attributes: [],
      showConnectModal: false,
      showWrongNetworkModal: false,
      showBuyTokenModal: false,
      nft: {
        price: 0
      },
      priceToken: 0,
      listStatus: 'default',
      step: 1,
      loadButton: false,
      nftPrice: 0,
      daysDifference: 0,
      hoursDifference: 0,
      minutesDifference: 0,
      secondsDifference: 0,
      balance: 0,
    }
  },
  watch: {
    successRemoveNft(newVal) {
      if (this.$store.state.successRemoveToken) {
        this.changeList('default')
      }
    },
    address() {
      if (this.$store.state.address && !this.balance) {
        this.loadBalance()
      }
    }
  },
  components: {
    Attributes,
    History,
    SellPrice,
    Approve,
    Sign,
    Listing,
    Successful,
    connect,
    WrongNetwork,
    BuyToken,
    SuccessfullBuy
  },
  async mounted() {
    await this.loadNft()
    await this.loadBalance()
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
    address() {
      return this.$store.state.address
    },
    successRemoveNft() {
      return this.$store.state.successRemoveToken
    },
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
    },
    soldByMe() {
      return this.nft.market_status === 'BOUGHT' && this.nft.seller === this.$store.state.fullAddress
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
      this.loadButton = false
    },
    async loadBalance() {
      if (this.$store.state.address) {
        this.balance = await this.$store.dispatch('getBalance')
      }
      const price = await this.$store.dispatch('getPriceToken')
      this.priceToken = (price.value * this.nft.price).toFixed(1)
    },
    closeModal(payload) {
      this.showConnectModal = payload
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
    handleClickBack() {
      localStorage.setItem('move_back', true)
      this.$router.go(-1)
    },
   async removeFromMarket() {
      if (this.loadButton) return;
      this.loadButton = true
      this.$store.commit('changeSuccessRemoveToken', false)
      await this.$store.dispatch('removeNft', this.nft.contract_id)
    },
    changeStep(step) {
      this.step = step
    },
    changeList(list) {
      this.listStatus = list
      this.step = 1
      setTimeout(() => this.loadNft(), 2000)
    },
    setNftPrice(price) {
      this.nftPrice = price
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
    },
    handleClickBuyNow() {
      if (!this.address) {
        this.showConnectModal = true
      } else {
        if (!this.$store.state.wrongNetwork) {
          this.showBuyTokenModal = true
        } else {
          this.showWrongNetworkModal = true
        }
      }
    },
    handleClickSell() {
      if (!this.$store.state.wrongNetwork) {
        this.listStatus = 'active'
      } else {
        this.showWrongNetworkModal = true
      }
    },
    handleClickChangePrice() {
      if (!this.$store.state.wrongNetwork) {
        this.listStatus = 'change'
      } else {
        this.showWrongNetworkModal = true
      }
    },
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
    cursor: pointer;
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
        font-size: 2.46rem;
        color: $span;
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
          width: 2.46rem;
          margin-right: 1rem;
        }
        h1 {
          font-size: 2.46rem;
        }
        &-text {
          padding-top: 3rem;
          padding-bottom: .5rem;
        }
        span {
          margin-left: 1.4rem;
          font-size: 1rem;
          color: $span;
        }
        &.sold {
          margin-top: 9px;
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
      &-owner {
        padding-top: 2.2rem;
        font-size: 1.23rem;
        color: $span;
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
    &-header {
      display: flex;
      align-items: center;
    }
    &-title {
      font-family: Cabin-Medium;
      font-weight: 500;
      font-size: 2.46rem;
      color: $span;
    }
    &-success-icon {
      margin-left: 1.6rem;
    }
    &-fee {
      padding-top: 1.61rem;
      color: $border;
      letter-spacing: 0.03em;
      font-size: 1.08rem;
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
        &:focus {
          border: 1px solid $green;
        }
        &-box {
          position: relative;
          &::after {
            content: 'CELO';
            display: block;
            position: absolute;
            top: -0.7rem;
            right: 1rem;
            font-size: 1.6rem;
          }
        }
      }
      input::-webkit-outer-spin-button, input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
    &-subtitle {
      padding-top: 3.2rem;
      color: $black;
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
        &.gradient-button {
          border-width: 1px;
          &:disabled {
            opacity: 0.5;
            &::after {
              display: none;
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 460px) {
  #nft {
    width: auto;
    margin: 0 0.8rem;
  }
  .nft {
    padding-bottom: 1.6rem;
    &__crumbs {
      display: none;
    }
    &__block {
      display: block;
      margin: 0 -0.8rem;
      padding: 0 0.8rem;
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
        padding-bottom: 1.6rem;
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
          margin-top: 1.6rem;
          width: 100%;
        }
        &-sell {
          width: 100%;
          height: 4.8rem;
          margin-top: 3rem;
        }
      }
    }
    &__navigation {
      display: none;
    }
    &__content {
      padding-top: 3.2rem;
      &-title {
        font-size: 2.2rem;
      }
      &-form {
        margin-top: 1.6rem;
        &-title {
          font-size: 1.4rem;
        }
        &-input {
          width: calc(100% - 2.2rem);
        }
      }
      &-buttons {
        &-mini {
          padding-top: 3.2rem;
          &.delist-buttons {
            flex-direction: column-reverse;
          }
        }
        &-button {
          width: 100%;
          height: 4.8rem;
          margin: 0;
          &-confirm {
            margin-top: 1.6rem;
          }
          &-done {
            margin-top: 0.8rem;
          }
        }
      }
      &-fee {
        font-size: 1.3rem;
      }
    }
  }
  .attributes {
    margin-top: 0;
    &__block {
      width: calc(100% - 3.2rem);
      margin-bottom: 1.6rem;
      &-content-item {
        &-title, &-subtitle {
          font-size: 1.4rem;
        }
        &-subtitle {
          font-weight: normal;
          color: $textColor;
        }
      }
    }
  }
}
</style>
