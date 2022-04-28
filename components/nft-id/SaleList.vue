<template>
    <section id="sale-list">
        <div class="listing" v-if="nftList && nftList.length > 0">
            <div class="listing__table">
                <div class="listing__table-header">
                    <h3>Quantitity</h3>
                    <h3>Price</h3>
                    <h3>From</h3>
                    <h3>Date</h3>
                    <h3/>
                </div>
                <div class="listing__table-content">
                    <div class="listing__table-content-item" :key="nft.contract_id" v-for="nft of nftList" v-if="!isMobile()">
                        <h3 class="quantitiy-num">1</h3>
                        <div class="listing__table-content-item-price" v-if="nft.market_status === 'LISTED'">
                            <h3 class="listing__table-content-item-price-celo"><img src="/celo.svg" alt="celo"> {{ nft.price }}</h3>
                            <h3 class="listing__table-content-item-price-usd">${{ nftDollarPrice(nft) }}</h3>
                        </div>
						<div class="listing__table-content-item-price" v-else>
                            <h3 class="listing__table-content-item-price-usd">-</h3>
                        </div>
                        <h3>{{ nftFromAddress(nft) }}</h3>
                        <h3 class="listing__table-content-item-date">
                            <span>{{ nftUpdatedDate(nft) }}</span>
                            <a :href="nftTxnAddress(nft)" target="_blank"><img src="/share.svg" alt="share"></a>
                        </h3>
                        <div class="listing__table-content-item-buttons">
                            <button class="listing__table-content-item-buttons-button listing__table-content-item-buttons-button-remove" @click="showRemoveNftAlert(nft)" v-if="nftListedByOwner(nft)">
                                Remove<img class="listing__table-content-item-buttons-button-loading" src="/loading-button-black.svg" alt="loading" v-if="nft.deleting">
                            </button>
                            <button class="listing__table-content-item-buttons-button listing__table-content-item-buttons-button-change" @click="showSellModal(nft)" v-if="nftListedByOwner(nft)">
                                Change price<img class="listing__table-content-item-buttons-button-loading" src="/loading-button-black.svg" alt="loading" v-if="nft.selling">
                            </button>
							<button class="listing__table-content-item-buttons-button" @click="showSellModal(nft)" v-else-if="nftOwned(nft)">
                                Sell<img class="listing__table-content-item-buttons-button-loading" src="/loading-button.svg" alt="loading" v-if="nft.selling">
                            </button>
                            <button class="listing__table-content-item-buttons-button" @click="showBuyModal(nft)" v-else>
                                Buy<img class="listing__table-content-item-buttons-button-loading" src="/loading-button.svg" alt="loading" v-if="nft.buying">
                            </button>
                        </div>
                    </div>
                    <div class="listing__table-content-item" :key="nft.contract_id" v-for="nft of nftList" v-if="isMobile()">
                        <div class="listing__table-content-item-info">
                            <h3 class="listing__table-content-item-info-address">{{ nftFromAddress(nft) }}</h3>
                            <p class="listing__table-content-item-info-date">{{ nftUpdatedDate(nft) }}</p>
                        </div>
                        <div class="listing__table-content-item-buttons">
                            <div class="listing__table-content-item-price" v-if="nft.market_status === 'LISTED'">
                                <h3 class="listing__table-content-item-price-celo"><img src="/celo.svg" alt="celo"> {{ nft.price }}</h3>
                                <p class="listing__table-content-item-price-usd">${{ nftDollarPrice(nft) }}</p>
                            </div>
							<div class="listing__table-content-item-price" v-else>
								<h3 class="listing__table-content-item-price-usd">-</h3>
							</div>
                            <div class="listing__table-content-item-buttons">
                                <div class="listing__table-content-item-buttons-wrapper" v-if="nftOwned(nft)">
                                    <button class="listing__table-content-item-buttons-button listing__table-content-item-buttons-button-edit" @click="showNftActionsDropdown(nft)">
                                        Edit
                                        <img class="listing__table-content-item-buttons-button-loading" src="/loading-button-black.svg" alt="loading" v-if="nft.selling || nft.deleting">
                                    </button>
                                    <div class="listing__table-content-item-buttons-dropdown" v-if="nft.showDropdown">
                                        <div class="listing__table-content-item-buttons-dropdown-item" @click="showRemoveNftAlert(nft)" v-if="nftListedByOwner(nft)">
                                            <img src="/outline-sell.svg" alt="delete">
                                            <h3>Remove<br/>from market</h3>
                                        </div>
                                        <div class="listing__table-content-item-buttons-dropdown-item" @click="showSellModal(nft)" v-if="nftListedByOwner(nft)">
                                            <img src="/refresh-dollar.svg" alt="change">
                                            <h3>Change price</h3>
                                        </div>
										<button class="listing__table-content-item-buttons-button listing__table-content-item-buttons-button-sell" @click="showSellModal(nft)" v-else>
											Sell<img class="listing__table-content-item-buttons-button-loading" src="/loading-button.svg" alt="loading" v-if="nft.selling">
										</button>
                                    </div>
                                </div>
                                <button class="listing__table-content-item-buttons-button" @click="showBuyModal(nft)" v-else>
                                    Buy<img class="listing__table-content-item-buttons-button-loading" src="/loading-button.svg" alt="loading" v-if="nft.buying">
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <SellToken :nft="currNft" :celoPrice="celoPrice" :approved="approved" @done="completeSell" @closeModal="closeModal" v-if="currNft && showSellTokenModal" />
        <BuyToken :nft="currNft" :priceToken="nftDollarPrice(currNft)" :balance="balance" @closeModal="closeModal" v-if="currNft && showBuyTokenModal" />
        <ConfirmAlert :title="confirmModalTitle" @confirm="removeCurrentNft" @close="cancelRemove" v-if="showRemoveModal" />
    </section>
</template>

<script>
import SellToken from '@/components/modals/sellToken'
import BuyToken from '@/components/modals/buyToken';
import ConfirmAlert from '@/components/modals/ConfirmAlert';
export default {
  props: ['collection', 'celoPrice', 'approved', 'balance'],
  data() {
    return {
      nftList: [],
      showSellTokenModal: false,
      showBuyTokenModal: false,
      showRemoveModal: false,
      currNft: null
    }
  },
  components: {
    SellToken,
    BuyToken,
    ConfirmAlert
  },
  mounted() {
    this.updateNftList()
  },
  computed: {
    successRemoveNft() {
      return this.$store.state.successRemoveToken
    },
    successBuyToken() {
      return this.$store.state.successBuyToken
    },
    confirmModalTitle() {
      return this.currNft ? `Remove ${this.currNft.name} from<br/>market?` : ''
    }
  },
  watch: {
    successRemoveNft() {
      if (this.$store.state.successRemoveToken === true) {
        this.deleteNftFromList()
      } else {
        this.updateNftStatus({
          ...this.currNft,
          deleting: false
        })
        this.currNft = null
      }
    },
    successBuyToken() {
      if (this.$store.state.successBuyToken === true) {
        this.showBuyModal = false
        this.deleteNftFromList()
      } else {
        this.closeModal()
      }
    },
    collection() {
      this.updateNftList()
    }
  },
  methods: {
    updateNftList() {
      let nftList = JSON.parse(JSON.stringify(this.collection))
      nftList.map(nft => nft.price = nft.price / 1000 )
      this.nftList = nftList
    },
    nftDollarPrice(nft) {
      return parseFloat(nft.price * this.celoPrice).toFixed(1)
    },
    nftFromAddress(nft) {
      const address = nft.owner.toLowerCase()
      const startID = address.split("").slice(0, 4)
      const endID = address.split("").slice(-4)
      const dotArr = [".", ".", "."]
      return startID
        .concat(dotArr)
        .concat(endID)
        .join("")
    },
    nftUpdatedDate(nft) {
      let difference = new Date() - parseInt(nft.updatedAt) * 1000;
      const daysDifference = Math.floor(difference/1000/60/60/24)
      difference -= this.daysDifference*1000*60*60*24

      const hoursDifference = Math.floor(difference/1000/60/60)
      difference -= this.hoursDifference*1000*60*60

      const minutesDifference = Math.floor(difference/1000/60)
      difference -= this.minutesDifference*1000*60

      const secondsDifference = Math.floor(difference/1000)
      if (daysDifference) {
        return `${daysDifference} day${daysDifference > 1 ? 's' : ''} ago`
      } else if (hoursDifference) {
        return `${hoursDifference} hour${hoursDifference > 1 ? 's' : ''} ago`
      } else if (minutesDifference >= 5) {
        return `${minutesDifference} minutes ago`
      } else {
        return 'a few minutes ago'
      }
    },
    nftTxnAddress(nft) {
      return `https://explorer.celo.org/address/${nft.contract_address}`
	},
    nftOwned(nft) {
      return this.$store.state.fullAddress === nft.owner
	},
	nftListedByOwner(nft) {
      return this.nftOwned(nft) && nft.market_status === 'LISTED'
    },
    showSellModal(nft) {
      if (nft.selling || nft.deleting) return
      this.$emit('onSale')
      this.currNft = nft
      this.showSellTokenModal = true
      this.updateNftStatus({
        ...this.currNft,
        selling: true,
        showDropdown: false
      })
    },
    showBuyModal(nft) {
      if (nft.buying) return
      this.$emit('onSale')
      this.currNft = nft
      this.showBuyTokenModal = true
      this.updateNftStatus({
        ...this.currNft,
        buying: true
      })
    },
    updateNftStatus(newNft) {
      if (!this.currNft) return
      let newNftList = JSON.parse(JSON.stringify(this.nftList))
      const nftIndex = newNftList.findIndex(item => item.contract_id === this.currNft.contract_id)
      newNftList[nftIndex] = newNft
      this.nftList = newNftList
    },
    completeSell(newPrice) {
      this.updateNftStatus({
        ...this.currNft,
        price: newPrice,
        selling: false
      })
      this.showSellTokenModal = false
      this.$emit('onComplete')
    },
    showRemoveNftAlert(nft) {
      if (nft.deleting) return
      this.currNft = nft
      this.showRemoveModal = true
      if (this.isMobile()) {
        this.updateNftStatus({
          ...this.currNft,
          showDropdown: false
        })
      }
    },
    cancelRemove() {
      this.showRemoveModal = false
      this.currNft = null
    },
    removeCurrentNft() {
      if (this.currNft) {
        const nft = this.nftList.find(item => item.contract_id === this.currNft.contract_id)
        if (nft.deleting || nft.selling) return
        this.showRemoveModal = false
        this.$emit('onSale')
        this.updateNftStatus({
          ...this.currNft,
          deleting: true,
          showDropdown: false
        })
        this.$store.commit('changeSuccessRemoveToken', false)
        this.$store.dispatch('removeNft', this.currNft)
      }
    },
    deleteNftFromList() {
      this.$emit('onComplete')
      if (this.currNft) {
        this.nftList = this.nftList.filter(item => item.contract_id !== this.currNft.contract_id)
        this.currNft = null
      }
    },
    closeModal() {
      this.updateNftStatus({
        ...this.currNft,
        buying: false,
        selling: false,
        showDropdown: false
      })
      this.currNft = null
      this.showSellTokenModal = false
      this.showBuyTokenModal = false
      this.$emit('onComplete')
    },
    showNftActionsDropdown(nft) {
      if (nft.selling || nft.deleting) return
      this.currNft = nft
      this.updateNftStatus({
        ...nft,
        showDropdown: !nft.showDropdown
      })
      this.currNft = null
    },
  }
}
</script>

<style lang="scss" scoped>
.listing {
  &__table {
    &-header {
      display: grid;
      align-items: center;
      justify-items: flex-end;
      grid-template-columns: 5.3rem 21.7rem 21rem 21rem 1fr;
      background: $modalColor;
      padding: .8rem 1.6rem;
      h3 {
        width: 100%;
        text-align: right;
        font-size: 1.6rem;
        color: $black;
      }
    }
    &-content {
      padding: 0 1.9rem;
      &-item {
        display: grid;
        align-items: center;
        justify-items: flex-end;
        grid-template-columns: 5.3rem 21.7rem 21rem 21rem 1fr;
        height: 6.6rem;
        border-bottom: 1px solid $modalColor;
        > h3 {
          text-align: right;
          font-weight: 400;
          font-size: 1.6rem;
          &.quantitiy-num {
            width: 100%;
            text-align: left;
          }
        }
        &-price {
          &-celo {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            font-weight: 600;
            img {
              width: 1.6rem;
              margin-right: .6rem;
            }
          }
          &-usd {
            text-align: right;
            font-weight: 400;
            font-size: 1.2rem;
            color: $grayLight;
          }
        }
        &-date {
          display: flex;
          align-items: flex-end;
          span {
            margin-right: 1.2rem;
            line-height: 1.1;
          }
          a {
            width: 2rem;
            line-height: 0.8;
          }
        }
        &-buttons {
          display: flex;
		  align-items: center;
          &-button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 11.4rem;
            height: 4rem;
            background: $white;
            border: 1px solid $pink;
            font-weight: 600;
            font-size: 1.6rem;
            color: $pink;
            &-remove, &-change, &-edit {
              background: $modalColor; 
              border: 0;
              font-weight: 400;
              color: $textColor;
            }
            &-remove {
              margin-right: 1rem;
            }
            &-change {
              width: 15.1rem;
            }
            &-loading {
              margin-left: 1rem;
              animation: loading 1s infinite;
            }
          }
        }
      }
    }
  }
  @media(max-width: 460px) {
    &__table {
      &-header {
        display: none;
      }
      &-content {
        padding: 0;
        &-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 0;
          &-address {
            padding-bottom: 0.4rem;
            font-size: 1.4rem;
          }
          &-date {
            font-size: 1.2rem;
            color: $border;
          }
          &-price {
            margin-right: 1.6rem;
            &-celo {
              padding-bottom: 0.4rem;
              font-size: 1.4rem;
            }
          }
          &-buttons {
            &-wrapper {
              position: relative;
            }
            &-button {
              width: 7.8rem;
              height: 3.2rem;
              font-size: 1.4rem;
              span {
                font-size: 1.4rem;
              }
              &-loading {
                width: 1.6rem;
                margin-left: 0.5rem;
              }
            }
            &-dropdown {
              position: absolute;
              right: 0;
              width: 14.4rem;
              background: $white;
              margin-top: 0.1rem;
              box-shadow: 0px 5px 30px rgb(0 0 0 / 5%);
              border-radius: 4px;
              &-item {
                display: flex;
                align-items: flex-start;
                padding: 1.6rem 1rem 1.6rem 0.8rem;
                img {
                  margin-right: 1.3rem;
                }
                h3 {
                  font-size: 1.4rem
                }
                &:hover {
                  background: rgb(0 0 0 / 4%)
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>

