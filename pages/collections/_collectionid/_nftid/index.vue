<template>
  <section id="nft" :class="{ mobile: !contentVisible }">
    <div class="nft" v-if="contentVisible">
      <div>
        <a class="nft__crumbs" @click="handleClickBack">
          Back
          <img :src="getCDNImage('array-right.svg')" alt="array">
          <span>{{ collectionName }}</span>
        </a>


        <div class="nft__block">
          <img :src="getNFTImage(nft, true, isCloudImage)" alt="item" class="nft__block-image" v-if="nftImageLoaded">
          <div class="nft__block-image-loading" v-else>
            <img :src="getCDNImage('loading-nft.webp')" alt="load">
          </div>

          <!-- INFO BUYER -->

          <div class="nft__block-info" v-if="!seller">
            <div v-if="!nftReloading">
              <div class="nft__block-info-collection">
                <img :src="collectionIcon(nft.contract)" alt="collection" class="nft__block-info-collection-icon" v-if="nft.contract">
                <h2 class="nft__block-info-collection-name" @click="gotoCollection">{{ collectionName }}</h2>
              </div>
              <h1 class="nft__block-info-name">{{ nftName }}</h1>
  <!--            <p class="nft__block-info-date" v-if="isSellNFT && nft.market_status === 'LISTED'"><img src="/time.svg" alt="time"> Sale ends in-->
  <!--              {{ daysDifference }} days-->
  <!--              {{ hoursDifference }} hours-->
  <!--              {{ minutesDifference }} minutes-->
  <!--            </p>-->
              <!-- <div class="nft__block-info-status" v-if="!soldByMe">
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
              </div> -->
              <p class="nft__block-info-quantity nft__block-info-quantity-buy" v-if="quantityCountInfo">{{ quantityCountInfo }}</p>
              <p class="nft__block-info-salecount" v-if="saleCountInfo">{{ saleCountInfo }}</p>
              <div class="nft__block-info-box nft__block-info-box-buy" v-if="isBuyAvailable">
                <div class="nft__block-info-price">
                  <div class="nft__block-info-price-celo">
                    <img :src="getCDNImage('celo.svg')" alt="celo">
                    <h1>{{ nft.price }}</h1>
                  </div>
                  <p class="nft__block-info-price-text">Price (${{ priceToken }})</p>
                </div>
                <button class="nft__block-info-buy" @click="handleClickBuyNow">Buy now</button>
              </div>
              <div class="nft__block-info-refi" v-if="nft.market_status === 'LISTED' && nft.price">
			  	<p class="nft__block-info-refi-total"><img class="nft__block-info-refi-total-carbon" :src="getCDNImage('plant.svg')" alt="plant">Total carbon offset = <span class="nft__block-info-refi-total-amount">{{ refiOffset }} ton co2</span></p>
				<p class="nft__block-info-refi-offset">Buy NFT and we add 50% of total offset to your <img class="nft__block-info-refi-offset-carbon" :src="getCDNImage('carbon-tracker.svg')" alt="tracker"> Offset Tracker</p>
              </div>
              <p class="nft__block-info-description" v-if="nft.description">{{ nft.description }}</p>
			  <p class="nft__block-info-description" v-else-if="isCertificateNft">Like man, nature has its own unique features that can't be found anywhere else. Each certificate is a portrait of plants. Portraits of plants, like those of people, reflect the unique features and beauty of a plant, worthy of appreciation and admiration. The beauty of nature is in our hands.</p>
              <Attributes :item="attributes" :info="nft" v-if="!isMultiNft && !isCertificateNft"/>
              <div class="nft__block-info-address" v-else-if="nft.contract_address">
                <h3 class="nft__block-info-address-title">Contract Address</h3>
                <a
                  :href="`https://explorer.celo.org/address/${nft.contract_address}`"
                  target="_blank"
                  class="nft__block-info-address-subtitle"
                >
                  {{ cutContractAddress }}
                  <img src="/send.svg" alt="send">
                </a>
              </div>
            </div>
            <div class="nft__block-info-loading" v-else>
              <img :src="getCDNImage('loading-nft.webp')" alt="load">
            </div>
          </div>

          <!-- INFO SELLER -->

          <div class="nft__block-info" v-else-if="seller">
            <div v-if="!nftReloading">
              <div class="nft__block-info-collection">
                <img :src="collectionIcon(nft.contract)" alt="collection" class="nft__block-info-collection-icon" v-if="nft.contract">
                <h2 class="nft__block-info-collection-name" @click="gotoCollection">{{ collectionName }}</h2>
              </div>
              <h1 class="nft__block-info-name">{{ nftName }}</h1>
  <!--            <p class="nft__block-info-date" v-if="isSellNFT"><img src="/time.svg" alt="time"> Sale ends in-->
  <!--              {{ daysDifference }} days-->
  <!--              {{ hoursDifference }} hours-->
  <!--              {{ minutesDifference }} minutes-->
  <!--            </p>-->
              <!-- <div class="nft__block-info-status">
                <p class="nft__block-info-status-title">Market status</p>
                <h3 class="nft__block-info-status-content">
                  {{ nft.market_status === "BOUGHT" || nft.market_status === 'MINT' ? 'Not for sale' : 'For Sale'}}
                </h3>
              </div> -->
              <p class="nft__block-info-quantity" v-if="quantityCountInfo">{{ quantityCountInfo }}</p>
              <button class="nft__block-info-transfer" @click="showTransferModal = true" v-if="nft.market_status !== 'LISTED'"><img :src="getCDNImage('transfer.svg')" alt="transfer">Transfer</button>
              <p class="nft__block-info-salecount" v-if="saleCountInfo">{{ saleCountInfo }}</p>
              <button class="nft__block-info-sell gradient-button" @click="handleClickSell"  v-if="nft.market_status !== 'LISTED'">Sell</button>
              <div class="nft__block-info-box" v-else>
                <div class="nft__block-info-price">
                  <div class="nft__block-info-price-celo">
                    <img :src="getCDNImage('celo.svg')" alt="celo">
                    <h1>{{ nft.price }}</h1>
                  </div>
                  <p class="nft__block-info-price-text">Price (${{ priceToken }})</p>
                </div>
                <div class="nft__content-buttons nft__content-buttons-mini delist-buttons">
                  <button
                    class="nft__content-buttons-button nft__content-buttons-button-confirm"
                    :class="{delete: loadButton}"
                    @click="handleClickChangePrice"
                  >
                    {{ confirmButtonText }}
                    <img :src="getCDNImage('loading-button-black.svg')" alt="load" v-if="loadButton">
                  </button>
                  <button
                    class="
                    nft__content-buttons-button
                    nft__content-buttons-button-cancel"
                    @click="removeFromMarket"
                  >
                    <img :src="getCDNImage('icon-delete.svg')" alt="delete">
                    Remove from market
                  </button>
                </div>
              </div>
			  <div class="nft__block-info-refi listed" v-if="nft.market_status === 'LISTED' && nft.price">
			  	<p class="nft__block-info-refi-total"><img class="nft__block-info-refi-total-carbon" :src="getCDNImage('plant.svg')" alt="plant">Total carbon offset = <span class="nft__block-info-refi-total-amount">{{ refiOffset }} ton co2</span></p>
				<p class="nft__block-info-refi-offset">Buy NFT and we add 50% of total offset to your <img class="nft__block-info-refi-offset-carbon" :src="getCDNImage('carbon-tracker.svg')" alt="tracker"> Offset Tracker</p>
              </div>
              <p class="nft__block-info-description" v-if="nft.description">{{ nft.description }}</p>
			  <p class="nft__block-info-description" v-else-if="isCertificateNft">Like man, nature has its own unique features that can't be found anywhere else. Each certificate is a portrait of plants. Portraits of plants, like those of people, reflect the unique features and beauty of a plant, worthy of appreciation and admiration. The beauty of nature is in our hands.</p>
              <Attributes :item="attributes" :info="nft" v-if="!isMultiNft && !isCertificateNft"/>
              <div class="nft__block-info-address" v-else-if="nft.contract_address">
                <h3 class="nft__block-info-address-title">Contract Address</h3>
                <a
                  :href="`https://explorer.celo.org/address/${nft.contract_address}`"
                  target="_blank"
                  class="nft__block-info-address-subtitle"
                >
                  {{ cutContractAddress }}
                  <img :src="getCDNImage('send.svg')" alt="send">
                </a>
              </div>
            </div>
            <div class="nft__block-info-loading" v-else>
              <img :src="getCDNImage('loading-nft.webp')" alt="load">
            </div>
          </div>
        </div>

        <!-- MultiNFT Listing -->
        <div class="nft__details" v-if="collectionInfo.multiNftList && collectionInfo.multiNftList.length > 0">
          <div class="nft__details-tab">
            <p class="nft__details-tab-item">Listings</p>
          </div>
          <SaleList class="nft__details-content"
            :nft="nft"
            :celoPrice="celoPrice"
            :balance="balance"
            :approved="nftApproved"
            :collection="collectionInfo.multiNftList"
			:collectionName="collectionName"
            @onSale="multiNftSaling=true"
            @onComplete="multiNftSaling=false"
          />
        </div>
      </div>
    </div>
  <!-- <connect @showWallet="openWalletModal" @showEmail="openEmailModal" @closeModal="closeModal" v-if="showConnectModal"/> -->
  <walletConnect @showConnect="openConnectModal" @closeModal="closeModal" v-if="showConnectModal"/>
  <valoraConnect @closeModal="closeModal" v-if="showValoraModal"/>
  <WrongNetwork v-if="showWrongNetworkModal" @closeModal="showWrongNetworkModal = false"/>
  <Transfer :nft="nft" @done="closeAndReload" :approved="nftApproved" @closeModal="showTransferModal=false"  v-if="showTransferModal" />
  <SellToken :nft="nft" :celoPrice="celoPrice" :approved="nftApproved" @done="closeAndReload" @closeModal="closeSellModal" v-if="showSellTokenModal" />
  <BuyToken v-if="showBuyTokenModal" :nft="nft" :priceToken="priceToken" :balance="balance" :multiNft="isMultiNft" @closeModal="closeModal"/>
  <SuccessfullBuy v-if="showSuccessModal" :image="getNFTImage(nft, true, isCloudImage)" :name="nftName" :refiOffset="refiOffset"/>
  </section>
</template>
<script>
import Attributes from '@/components/nft-id/Attributes';
import SaleList from '@/components/nft-id/SaleList';
import History from '@/components/nft-id/History-table';
import Approve from '@/components/sale-nft/Approve';
import Sign from '@/components/sale-nft/Sign';
import Successful from '@/components/sale-nft/Successful';
import connect from '@/components/modals/connect'
import walletConnect from '@/components/modals/walletConnect'
import valoraConnect from '@/components/modals/valoraConnect'
import WrongNetwork from '@/components/modals/wrongNetwork'
import Transfer from '@/components/modals/transfer'
import SellToken from '@/components/modals/sellToken'
import BuyToken from '@/components/modals/buyToken';
import SuccessfullBuy from '@/components/modals/successBuy';
import API from '@/api';
export default {
  data() {
    return {
      attributes: [],
	  showConnectModal: false,
	  showWalletModal: false,
	  showValoraModal: false,
	  showEmailModal: false,
      showWrongNetworkModal: false,
      showTransferModal: false,
      showSellTokenModal: false,
      showBuyTokenModal: false,
      nftReloading: false,
      oldNftStatus: null,
      oldNftPrice: null,
	  nftImageLoaded: false,
	  isCloudImage: false,
      nft: {
        price: 0
      },
	  nftProducerFee: 0,
      nftApproved: false,
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
      celoPrice: 0,
      collectionInfo: {},
      multiNftSaling: false
    }
  },
  watch: {
    successRemoveNft(newVal) {
      if (this.$store.state.successRemoveToken) {
        this.loadButton = false
        if (this.$store.state.successRemoveToken === true) {
          if (!this.multiNftSaling) {
            this.startReloading()
          } else {
            this.multiNftSaling = false
            this.loadMultiNftCollection()
          }
        }
      }
    },
    address() {
      if (this.$store.state.address && !this.balance) {
        this.loadBalance()
      }
    },
    showSuccessModal() {
      if (this.$store.state.successBuyToken) {
        this.showBuyTokenModal = false
        if (!this.multiNftSaling) {
          this.startReloading()
        } else {
          this.loadMultiNftCollection()
        }
      }
    },
    refiPrice() {
      this.updateRefiOffset()
    }
  },
  components: {
    Attributes,
    SaleList,
    History,
    Approve,
    Sign,
    Successful,
	connect,
	walletConnect,
	valoraConnect,
    WrongNetwork,
    Transfer,
    SellToken,
    BuyToken,
    SuccessfullBuy
  },
  async mounted() {
    const footerEl = document.querySelector('.footer')
    if (process.browser && (window.innerWidth > 910 || window.innerWidth <= 460)) {
			footerEl.classList.remove('fixed')
    } else {
      footerEl.classList.add('fixed')
    }

	await this.loadNft()
	const imageURL = this.getNFTImage(this.nft, true, true)
    if (imageURL && !this.nftImageLoaded) {
      const img = new Image(imageURL)
      if (img.complete) {
		this.nftImageLoaded = true
		this.isCloudImage = true
      } else {
        img.onload = () => {
		  this.nftImageLoaded = true
		  this.isCloudImage = true
        }
      }
	}

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
    if (this.isSellNFT && this.nft.market_status === 'LISTED' && !this.seller) {
      this.$store.dispatch('checkBuyTokenApproved', this.nft.price)
    } else if (this.seller) {
      this.nftApproved = await this.$store.dispatch('approveToken', false)
    }

    this.loadNftStatus()
  },
  computed: {
    address() {
      return this.$store.state.address
	},
	listToken() {
      return this.$store.state.listToken
    },
	contentVisible() {
	  return !this.isMobile() || (this.isMobile() && (!this.showSellTokenModal || this.listToken))
	},
    isMultiNft() {
      return this.$store.state.multiNftSymbols.includes(this.$route.params.collectionid)
	},
	isCertificateNft() {
      return this.nft.contract === 'CBCN'
    },
    nftName() {
	  if (this.isCertificateNft) {
		return this.getCertificateName(this.nft)
      } else if (!this.isMultiNft) {
        if (!this.nft.name) {
          return ''
        } else {
          return this.nft.contract !== 'nomdom' ? this.nft.name : `${this.nft.name}.nom`
        }
      } else {
		if (this.nft.contract === 'knoxnft') {
		  return this.$store.state.multiNftNames.find(item => item.id === this.$route.params.nftid).name
		} else {
		  return ''
		}
        
      }
    },
    cutContractAddress() {
      const address = !this.isCertificateNft ? this.nft.contract_address : this.$store.state.certContractAddress
      if (address) {
        const startID = address.split("").slice(0, 6);
        const endID = address.split("").slice(-4);
        const dotArr = [".", ".", "."];
        return startID
          .concat(dotArr)
          .concat(endID)
          .join("");
      }
    },
    totalQuantityCount() {
      return this.nft.multiNft ? this.nft.multiNft.mint_count : 0
    },
    totalOwnedCount() {
      return this.collectionInfo.owned_count
    },
    saleCountInfo() {
      if (this.totalOwnedCount && (this.seller || (!this.seller && this.market_status !== 'LISTED'))) {
        const availableSaleCount = (this.collectionInfo.owned_count - this.collectionInfo.owned_list_count) || 0
        return `For sale ${availableSaleCount} of ${this.totalOwnedCount} available`
      } else {
        return null
      }
    },
    quantityCountInfo() {
      if (this.seller || (!this.seller && this.nft.market_status !== 'LISTED')) {
        return this.totalQuantityCount && (this.totalOwnedCount !== undefined) ? `Quantity: ${this.totalOwnedCount} of ${this.totalQuantityCount}` : null
      } else {
        const totalListCount = this.nft.multiNft ? this.nft.multiNft.list_count : 0
        const ownedListCount = this.collectionInfo.owned_list_count || 0
        return this.totalQuantityCount ? `${totalListCount - ownedListCount} of ${this.totalQuantityCount} available` : null
      }
    },
    confirmButtonText() {
      return !this.loadButton ? 'Change price' : 'Remove';
    },
    successRemoveNft() {
      return this.$store.state.successRemoveToken
    },
    isSellNFT() {
      return this.nft.market_status !== 'BOUGHT' && this.nft.price !== 0
    },
    isBuyAvailable() {
      return this.isSellNFT && this.nft.market_status === 'LISTED'
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
    },
    collection() {
	  if (!this.nft.contract) return {}
	  const collectionList = this.$store.state.collectionList || []
	  const foundCollection = collectionList.find(item => item.route === this.nft.contract) || {}
      return foundCollection
    },
    pageTitle() {
      return `${this.collection.name} | Cyberbox ReFi NFT Marketplace`
    },
    refiOffset() {
      return this.nft.refiOffset > 0 ? parseFloat(this.nft.refiOffset).toFixed(3) : 0
    },
    description() {
      return this.collection.description
    },
    metaIcon() {
			let imageSrc = ''
      switch (this.$route.params.collectionid) {
        case 'cpunk': imageSrc = this.getCDNImage('collections/Media_punks.webp')
          break
        case 'ctoadz': imageSrc = this.getCDNImage('collections/Media_toadz.webp')
          break
        case 'knoxnft': imageSrc = this.getCDNImage('collections/KnoxersDAO.webp')
          break
        default: imageSrc = this.collection.image
          break
      }
      return imageSrc
    },
    refiPrice() {
      return this.$store.state.cMCO2Price
    },
    collectionName() {
	  return this.collection.name
    }
  },
  head() {
    return {
      meta: [
        { hid: 'title', name: 'title', content: this.pageTitle },
        { hid: 'og:title', property: 'og:title', content: this.pageTitle },
        { hid: 'description', name: 'description', content: this.description },
        { hid: 'og:description', property: 'og:description', content: this.description },
        { hid: 'og:image', property: 'og:image', content: this.metaIcon }
      ]
    }
  },
  methods: {
    collectionIcon(contract) {
      return contract ? this.getCDNImage(`${contract}.webp`) : null
    },
    async loadNft() {
      const nft = await this.$store.dispatch('getNft', {
        id: this.$route.params.nftid,
        collectionId: this.$route.params.collectionid
      })
      let rarityInfos = null
      if (nft.contract !== 'nomdom' && (nft.market_status !== this.oldNftStatus || nft.price !== this.oldNftPrice)) {
        rarityInfos = await API.getNftRankings([nft.id])
      }
      this.nft = {
        ...nft,
        rating_index: rarityInfos && rarityInfos.length > 0 ? rarityInfos[0].rating_index : null,
        price: nft.price / 1000
	  }
      this.updateRefiOffset()
      this.loadButton = false
    },
    async loadMultiNftCollection() {
      const multiNftCollection = await this.$store.dispatch('getMultiNftCollection')
	  const sales = multiNftCollection.filter(item => item.market_status === 'LISTED')
      if (!this.$store.state.buyTokenApproved && sales.length > 0) {
		const price = sales.map(item => item.price / 1000).sort((a, b) => b-a)[0]
        this.$store.dispatch('checkBuyTokenApproved', price)
      }
      this.collectionInfo = {
        ...this.collectionInfo,
        multiNftList: multiNftCollection
      }
    },
    async loadNftStatus() {
      const collectionResult = await this.$store.dispatch('getCollectionInfo') || {}
      if (collectionResult.nftSymbol !== 'CBCN') {
		this.nftProducerFee = collectionResult.producerFee ? collectionResult.producerFee / 10 : 0
	  }
      if (this.$store.state.multiNftSymbols.includes(this.$route.params.collectionid)) {
        if ((!this.seller || (this.seller && this.nft.market_status !== 'LISTED'))) {
          const ownedCollectionInfo = await this.$store.dispatch('getOwnedCollectionInfo', this.nft)
          this.collectionInfo = {
            ...collectionResult,
            ...ownedCollectionInfo
          }
        }
        this.loadMultiNftCollection()
      }
    },
    async loadBalance() {
      if (this.$store.state.address) {
        this.balance = await this.$store.dispatch('getBalance')
      }
      const price = await this.$store.dispatch('getPriceToken')
      this.celoPrice = price.value
      this.priceToken = (price.value * this.nft.price).toFixed(1)
    },
    startReloading() {
      this.nftReloading = true
      this.oldNftStatus = this.nft.market_status
      this.oldNftPrice = this.nft.price
      this.reloadNft()
    },
    async reloadNft() {
      await this.loadNft()
      if (this.nft.market_status === this.oldNftStatus && this.nft.price === this.oldNftPrice) {
        setTimeout(() => this.reloadNft(), 1000)
      } else {
        this.nftReloading = false
        this.oldNftStatus = null
        this.oldNftPrice = null
        this.collectionInfo = {}
        await this.loadBalance()
        this.loadNftStatus()
      }
    },
    updateRefiOffset() {
      if (this.$store.state.cMCO2Price) {
		let producerFee = this.nft.producerFee
		if (this.nft.contract === 'CBCN') {
		  producerFee = 55
		}
        this.nft = {
          ...this.nft,
          refiOffset: (this.nft.market_status === 'LISTED' ? this.nft.price : 1) * (producerFee / 1000) * this.$store.state.cMCO2Price
        }  
      }
    },
    closeAndReload() {
      this.showTransferModal = false
      this.showSellTokenModal = false
      this.startReloading()
    },
    async closeSellModal(approved) {
      this.showSellTokenModal = false
      if (!this.nftApproved && approved) {
        this.nftApproved = true
      }
	},
	openConnectModal() {
	  this.showWalletModal = false
	  this.showEmailModal = false
	  this.showConnectModal = true
	},
    openWalletModal() {
      this.showWalletModal = true
      this.showConnectModal = false
	},
	openValoraModal() {
      this.showValoraModal = true
      this.showWalletModal = false
	},
	openEmailModal() {
      this.showEmailModal = true
      this.showConnectModal = false
    },
    closeModal(payload) {
	  this.showConnectModal = payload
	  this.showWalletModal = payload
	  this.showValoraModal = payload
	  this.showEmailModal = payload
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
      await this.$store.dispatch('removeNft')
    },
    changeStep(step) {
      this.step = step
    },
    changeList(list) {
      this.listStatus = list
      this.step = 1
      if (list === 'default') {
        this.startReloading()
      }
    },
    setNftPrice(price) {
      this.nftPrice = price
    },
    async getAttributes() {
      const attributes = []
      if (this.nft.trait) {
        this.nft.trait.forEach(item => {
          const attributeItem = JSON.parse(item);
          attributes.push({
            trait_type: Object.keys(attributeItem)[0],
            value: Object.values(attributeItem)[0]
          })
        })
      }
      this.attributes = attributes
	},
	gotoCollection() {
	  this.$router.push(`/collections/${this.$route.params.collectionid}`)
	},
    handleClickBuyNow() {
      if (!this.address) {
        this.showConnectModal = true
      } else {
        if (!this.$store.state.wrongNetwork) {
          this.showBuyTokenModal = true
          this.sendEvent({
            category: 'Buy',
            eventName: 'buy',
            properties: {
              buy: this.collectionName
            }
          })
        } else {
          this.showWrongNetworkModal = true
        }
      }
    },
    handleClickSell() {
      if (!this.$store.state.wrongNetwork) {
		this.showSellTokenModal = true
		this.sendEvent({
		  category: 'Listing',
		  eventName: 'listing',
		  properties: {
			listing: this.collection.name
		  }
		})
      } else {
        this.showWrongNetworkModal = true
      }
    },
    handleClickChangePrice() {
      if (this.loadButton) return
      if (!this.$store.state.wrongNetwork) {
        this.showSellTokenModal = true
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
  &.mobile {
	padding-bottom: 0;
	margin: 0;
  }
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
          width: 100%;
        }
      }
    }
    &-info {
      &-collection {
        display: flex;
        align-items: center;
        &-icon {
          width: 28px;
          height: 28px;
          border-radius: 50%;
        }
        &-name {
          margin-left: 0.62rem;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
        }
      }
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
      &-refi {
        width: fit-content;
        width: -moz-fit-content;
        margin-top: 1.8rem;
        padding: 0.8rem;
        border: 1px solid $modalColor;
		border-radius: 0.4rem;
        font-size: 1.2rem;
        &.listed {
          margin-top: 5.8rem;
        }
		&-total {
		  font-size: 1.2rem;
		  color: $black;
		  &-carbon {
			width: 1.4rem;
			margin-right: 0.9rem;
			transform: translateY(0.2rem);
		  }
		  &-amount {
			font-weight: 700;
			font-size: 1.3rem;
			color: $green3;
		  }
		}
		&-offset {
		  margin-top: 1.2rem;
		  font-size: 1.2rem;
		  color: $border;
		  &-carbon {
			transform: translateY(0.2rem);
		  }
		}
      }
      &-description {
        padding-top: 2.4rem;
      }
      &-address {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 2.5rem;
        padding-bottom: 1.8rem;
        font-size: 1.6rem;
        &-title {
          font-family: OpenSans-SemiBold;
          font-weight: 600;
        }
        &-subtitle {
          display: flex;
          align-items: center;
          font-family: OpenSans-Regular;
          font-weight: 400;
          img {
            margin-left: 1rem;
          }
        }
      }
      &-price {
        &-celo {
          display: flex;
          align-items: center;
          img {
            width: 2.4rem;
            margin-right: 1rem;
          }
          h1 {
            font-size: 3.2rem;
          }
        }
        &-text {
          padding-top: 1rem;
          font-size: 1.4rem;
          color: $grayLight;
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
        font-size: 1.6rem;
        color: $span;
      }
      &-buy {
        background: $pink;
        width: 14.8rem;
        height: 5.4rem;
        color: $white;
      }
      &-sell {
        margin-top: 3.2rem;
        width: 16.4rem;
        height: 5.4rem;
        color: $pink;
        border-radius: 2.5rem;
        &::after {
          border-radius: 2.5rem;
        }
      }
      &-quantity, &-salecount {
        margin-top: 3.2rem;
        font-weight: 600;
      }
      &-quantity {
        font-size: 1.6rem;
        color: $grayLight;
        &-buy {
          margin-top: 2.4rem;
        }
      }
      &-transfer {
        margin-top: 3.2rem;
        background: transparent;
        font-family: OpenSans-SemiBold;
        display: flex;
        align-items: center;
        cursor: pointer;
        img {
          width: 1.6rem;
          padding-right: 0.9rem;
        }
      }
      &-salecount {
        font-size: 1.4rem;
        color: $border;
      }
      &-loading {
        width: 100%;
        img {
          width: 100%;
        }
      }
      &-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 2.4rem;
        margin-bottom: 4.4rem;
        padding: 1.4rem 0.8rem;
        box-shadow: 0px 4px 12px rgb(0 0 0 / 5%);
        border-radius: .8rem;
        position: relative;
        &-buy {
          margin-bottom: 0;
        }
      }
    }
  }
  &__details {
    margin-top: 2.4rem;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    &-tab {
      display: flex;
      align-items: center;
      padding-top: 2.2rem;
      margin: 0 .8rem;
      border-bottom: 1px solid $modalColor;
      &-item {
        width: fit-content;
        width: -moz-fit-content;
        padding-bottom: 1.2rem;
        font-weight: 600;
        font-size: 1.6rem;
        border-bottom: 1px solid $pink;
        transform: translateY(1px);
        cursor: pointer;
      }
    }
    &-content {
      padding-top: 1.6rem;
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
        padding: 0
      }
      &-button {
        width: 16.4rem;
        height: 5.4rem;
        &-cancel {
          display: flex;
          align-items: center;
          width: auto;
          height: auto;
          position: absolute;
          top: 100%;
          left: 50%;
          margin-top: 2.4rem;
          background: none;
          border: 0;
          font-size: 1.4rem;
          color: $pink;
          transform: translateX(-50%);
          img {
            margin-right: .7rem;
          }
        }
        &-confirm {
          width: 16.4rem;
          height: 5.4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: $white;
          border: 1px solid $black;
          color: $black;
          &.delete {
            width: 14.6rem;
          }
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
        min-width: 30.4rem;
        max-height: 30.4rem;
        object-fit: cover;
        &-loading {
          width: 30.4rem;
          height: 30.4rem;
        }
      }
      &-info {
        text-align: left;
        padding-top: 1.8rem;
        &-collection {
          &-icon {
            width: 24px;
            height: 24px;
          }
          &-name {
            margin-left: 0.8rem;
            font-size: 1.4rem;
          }
      }
        &-company {
          font-size: 1.4rem;
        }
        &-name {
          text-align: left;
          padding-top: 1rem;
          font-size: 2.2rem;
        }
		&-refi {
		  padding: 1rem;
		}
        &-minted {
          font-size: 1.4rem;
          padding-top: .5rem;
        }
        &-description {
          padding-top: 1.5rem;
        }
        &-address {
          padding-left: 0.8rem;
          padding-right: 0.8rem;
          &-title {
            font-size: 1.4rem;
          }
          &-subtitle {
            font-size: 1.4rem;
            img {
              margin-left: 0.8rem;
            }
          }
        }
        &-price {
          &-celo {
            img {
              width: 2rem;
            }
            h1 {
              font-size: 2.2rem;
            }
          }
        }
        &-date {
          display: none;
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
          &.delist-buttons {
            flex-direction: column-reverse;
          }
        }
        &-button {
          width: 14.8rem;
          height: 4.8rem;
          margin: 0;
          &-cancel {
            width: fit-content;
            width: -moz-fit-content;
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
    &__details {
      box-shadow: none;
      border-radius: 0;
      &-tab {
        margin: 0;
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
