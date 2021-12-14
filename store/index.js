import Web3 from 'web3'
import {ethers, Wallet, providers, BigNumber} from 'ethers'
import WalletConnectProvider from "@walletconnect/web3-provider";
import MarketMainABI from './../abis/marketMain.json'
import DaosABI from './../abis/daos.json'
import MaosABI from './../abis/maos.json'
import CeloToken from './../abis/celoToken.json'
import {gql} from "nuxt-graphql-request";
const ContractKit = require('@celo/contractkit')
import filter from './../config.js'
import redstone from 'redstone-api';
export const state = () => ({
  celoPunks: '0x9f46B8290A6D41B28dA037aDE0C3eBe24a5D1160',
  cyberBoxMarketplace: '0x4Dbf292BAD2cc86B318036f55C876e96bb7863D5',
  marketMain: '0x0874b64E20690aEed36a33a55F529ad05734Fbc6',
  daosContract: '0x34d63dc2f8c5655bA6E05124B3D4a283A402CEd9',
  maosContract: '0x1FBB74537Bf8b8bbd2aF43fE2115638A67137D45',
  celo: '0xf194afdf50b03e69bd7d057c1aa9e10c9954e4c9',
  celoToken: '0x471EcE3750Da237f93B8E339c536989b8978a438',
  user: {},
  chainId: null,
  address: null,
  fullAddress: null,
  nftList: [],
  nft: {},
  approveToken: '',
  listToken: '',
  countPage: 1,
  filter: filter.races.DAOS.layers,
  successBuyToken: false,
  message: '',
  sort: `orderBy: contract_id`,
  collectionList: [
    {
      id: 0,
      name: 'Daopolis',
      route: false,
      image: '/daopolis.JPG',
      banner: '/daopolis-nft.png',
      logo: '/daopolis-nft.png',
      wallet: '0x29a6520A99656e5b17A34471D5d458eFD3696695',
      website: 'https://celopunks.club/',
      twitter: 'https://twitter.com/CeloPunks',
      discord: 'https://discord.com/invite/Dzukufsrqe',
      telegram: 'https://t.me/celopunksclub',
    },
    {
      id: 1,
      name: 'CeloPunks',
      route: 'CPUNK',
      image: '/collections/Celopunks.jpg',
      banner: '/collections/CeloPunks-banner.png',
      logo: '/collections/CeloPunks-logo.png',
      wallet: '0x29a6520A99656e5b17A34471D5d458eFD3696695',
      website: 'https://celopunks.club/',
      twitter: 'https://twitter.com/CeloPunks',
      discord: 'https://discord.com/invite/Dzukufsrqe',
      telegram: 'https://t.me/celopunksclub',
    },
    {
      id: 2,
      name: 'CeloToadz',
      route: 'CTOADS',
      image: '/collections/celoToadz.png',
      banner: '/collections/celoToadz-banner.png',
      logo: '/collections/celoToadz-logo.png',
      wallet: '0xdbde524ed479f9effe777ba6b708ed8463fba445',
      website: 'https://www.celotoadz.com/',
      twitter: 'https://twitter.com/c_ToadzOfficial',
      discord: 'https://discord.gg/dD3D223k8N',
      instagram: 'https://www.instagram.com/celotoadzofficial/',
    },
    // {
    //   id: 3,
    //   name: 'DimsOfCelo',
    //   route: 'dimsofcelo',
    //   image: '/collections/DimsOfCelo.png',
    //   banner: '/collections/DimsOfCelo-banner.png',
    //   logo: '/collections/DimsOfCelo-logo.png',
    //   wallet: '0x462BFAFE102e9EAFd3A8c95097cFcb21B6A3c9B2',
    //   website: 'https://dimsofcelo.art/',
    //   twitter: 'https://twitter.com/dimsofcelonft',
    //   discord: 'https://discord.com/invite/rhJjVUtKEs',
    // },
    // {
    //   id: 4,
    //   name: 'PixelAva',
    //   route: 'pixelava',
    //   image: '/collections/PixelAva.png',
    //   banner: '/collections/PixelAva-banner.png',
    //   logo: '/collections/PixelAva-logo.png',
    //   wallet: '0xeBD0A580fabb5a5DBE98030D074e532F025C1367',
    //   website: 'https://pixelava.space/',
    //   twitter: 'https://twitter.com/NPixelava',
    //   discord: 'https://discord.gg/sjjjFX2X',
    // },
    // {
    //   id: 5,
    //   name: 'CeloPunksNeon',
    //   route: 'celopunksneon',
    //   image: '/collections/celopunksneon.png',
    //   banner: '/collections/celopunksneon-banner.png',
    //   logo: '/collections/celopunksneon-logo.png',
    //   wallet: '0x29a6520A99656e5b17A34471D5d458eFD3696695',
    //   website: 'https://celopunks.club/',
    //   twitter: 'https://twitter.com/CeloPunks',
    //   discord: 'https://discord.com/invite/Dzukufsrqe',
    //   telegram: 'https://t.me/celopunksclub'
    // },
  ],
})
export const getters = {
  provider() {
    const web3 = window.web3.eth ? window.web3.eth.currentProvider.connected : window.web3.eth
    return new ethers.providers.Web3Provider(web3 ? web3 : window.ethereum);
  }
}
export const actions = {
  async getGraphData({commit,state}) {
    const sort = state.sort
    const query = gql`
      query Sample {
        contractInfos(${sort} first: 48 where: { contract: "${$nuxt.$route.params.collectionid}"}) {
          id
          contract
          contract_id
          price
          seller
          owner
          attributes
          rarity_rank
          contract_address
          market_status
          name
          image
          description
          updatedAt
          dna
          trait
          listData {
            id
            owner
            price
          }
          bidData {
            id
            owner
            bidder
            price_total
            price_value
            price_fee
          }
          selled {
            id
            seller
            buyer
            price_total
            price_value
            price_fee
          }
        }
      }`;
    const data = await this.$graphql.default.request(query)
    sort === `skip: ${48 * (state.countPage - 1)} orderBy: contract_id` ? commit('addNftToList', data.contractInfos) : commit('setNewNftList', data.contractInfos)
    return data.contractInfos
  },

  async getGraphDataListed({commit, state}) {
    const sort = state.sort
    const query = gql`
      query Sample {
        contractLists(${sort} first: 48 where: { contract: "${$nuxt.$route.params.collectionid}"}) {
          id
          contract
          contract_id
          price
          image
        }
      }`;
    const data = await this.$graphql.default.request(query)
    commit('setNewNftList', data.contractLists)
  },

  async getGraphDataSells({commit, state}) {
    const sort = state.sort
    const query = gql`
      query Sample {
        contractSells(${sort} first: 48 where: { contract: "${$nuxt.$route.params.collectionid}"}) {
          id
          contract
          contract_id
          price_total
          price_value
          price_fee
          image
        }
      }`;
    const data = await this.$graphql.default.request(query)
    commit('setNewNftList', data.contractSells)
  },

  // AUTHORIZATION



  async updateUser({commit, state}) {
    const web3 = window.web3.eth ? window.web3.eth.currentProvider.connected : window.web3.eth
    const provider = new ethers.providers.Web3Provider(web3 ? web3 : window.ethereum);
    const ethereum = window.ethereum || window.web3
    if (localStorage.getItem('address') && !localStorage.getItem('walletconnect') && ethereum) {
      const signer = await provider.getSigner()
      const address = await signer.getAddress()
      const chain = await provider.getNetwork()
      try {
        ethereum.on("chainChanged", async (chainId) => {
          commit('setChainId', BigNumber.from(chainId).toNumber())
        })
      } catch (error) {
        console.log(error)
      }
      commit('setAddress', address)
      commit('setChainId', chain.chainId)
    }
  },
  async connectMetaTrust({commit}) {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const address = await provider.getSigner().getAddress();
        const chainId = await provider.getNetwork()
        commit('setChainId', chainId.chainId)
        commit('setAddress', address)
      } else if (window.web3) {
        window.web3 = new ethers.providers.Web3Provider(
          window.web3.currentProvider
        );
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const address = await provider.getSigner().getAddress();
        const chainId = await provider.getNetwork()
        commit('setChainId', chainId.chainId)
        commit('setAddress', address)
      } else {
        alert("please use web3 enabled browser.");
      }
    } catch (error) {
      throw new Error(error);
    }
  },
  async walletConnect({commit}, isConnect) {
    const provider = new WalletConnectProvider({
      rpc: {
        56: "https://bsc-dataseed1.ninicoin.io"
      },
      qrcodeModalOptions: {
        mobileLinks: ['metamask', 'trust', 'safepal', 'math']
      },
    });
    provider.on("accountsChanged", (accounts) => {
      commit('setAddress', accounts[0])
    });
    if (localStorage.getItem('walletconnect') || isConnect) {
      await provider.enable();
    }
    window.web3 = new Web3(provider);
  },
  async logout({commit}) {
    try {
      commit('setAddress', '')
      localStorage.removeItem('walletconnect')
      localStorage.removeItem('address')
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  },


  // GET INFORMATION USER

  async getBalance({state}) {
    const web3 = new Web3(window.ethereum)
    const kit = ContractKit.newKitFromWeb3(web3)
    const res = await kit.getTotalBalance(state.fullAddress)
    return res.CELO.c[0] / 10000
  },
  async getPriceToken() {
    return await redstone.getPrice('CELO')
  },

  // GET NFT

  async getNft({commit, state}, token) {
    const query = gql`
      query Sample {
        contractInfo(id: "${token.id}_${token.collectionId ? token.collectionId : 'daos'}") {
          id
          contract
          contract_id
          price
          seller
          owner
          attributes
          rarity_rank
          contract_address
          market_status
          name
          image
          description
          updatedAt
          dna
          listData {
            id
            owner
            price
          }
          bidData {
            id
            owner
            bidder
            price_total
            price_value
            price_fee
          }
          selled {
            id
            seller
            buyer
            price_total
            price_value
            price_fee
          }
        }
      }`;
    let data = await this.$graphql.default.request(query)
    commit('setNewNft', data.contractInfo)
    return data.contractInfo
  },

  async getCountAttributes({commit, state}) {
    const query = gql`
      query Sample {
        contracts(first: 1) {
          attributes_use
          element_use0
          element_use1
          element_use2
          element_use3
          element_use4
          element_use5
          element_use6
          element_use7
        }
      }`;
      let data = await this.$graphql.default.request(query)
      return data.contracts[0]
  },

  // SELL NFT

  async approveToken({commit, state, dispatch}) {
    const signer = this.getters.provider.getSigner()
    const getSupportMarketPlace = new ethers.Contract(state.marketMain, MarketMainABI, signer)
    const resultAddress = await getSupportMarketPlace.getSupportMarketPlaceToken(state.nft.contract_address)
    const contract = new ethers.Contract(state.daosContract, DaosABI, signer)
    try {
      await contract.approve(resultAddress, state.nft.contract_id)
      contract.on("Approval", () => {
        commit('changeApproveToken', 'approve')
      });
    } catch (error) {
      commit('changeApproveToken', 'error')
    }
  },
  async startSale({commit, state}) {
    const signer = this.getters.provider.getSigner()
    const contract = new ethers.Contract(state.daosContract, DaosABI, signer);
    contract.startSale();
  },
  async listingNFT({commit, state}, nft) {
    const signer = this.getters.provider.getSigner()
    const contract = new ethers.Contract(state.marketMain, MarketMainABI, signer)
    try {
      await contract.listToken(state.nft.contract_address, state.nft.contract_id, nft.price, nft.date.toFixed(0))
      this.getters.provider.once(contract, async () => {
        commit('changelistToken', true)
      });
    } catch (error) {
      commit('changelistToken', false)
      console.log(error)
    }
  },

  // BUY NFT

  async approveBuyToken({commit,state, dispatch}, token) {
    const web3 = new Web3(window.ethereum)
    const accounts = await web3.eth.getAccounts()
    const account = accounts[0]
    const kit = ContractKit.newKitFromWeb3(web3)
    const goldToken = await kit._web3Contracts.getGoldToken();
    const parsePrice = ethers.utils.parseEther(String(token.price))
    const result = await goldToken.methods.approve(account, parsePrice).send({
      from: account,
    })
    this.getters.provider.once(result, async () => {
     dispatch('buyNFT', token)
    });
  },
  async buyNFT({commit, state}, token) {
    const web3 = new Web3(window.ethereum)
    const accounts = await web3.eth.getAccounts()
    const account = accounts[0]
    const kit = ContractKit.newKitFromWeb3(web3)
    const contract = new kit.web3.eth.Contract(MarketMainABI, state.marketMain)
    const parsePrice = ethers.utils.parseEther(String(token.price))
    const result = await contract.methods.buyToken(state.nft.contract_address, token.id, token.price).send({
      from: account,
      value: parsePrice,
      gas: 3000000
    })
    this.getters.provider.once(result, async () => {
      commit('changeSuccessBuyToken')
    });
  },

  // GET COLLECTION INFO

  async getCollectionInfo({commit, state}, isArray) {
    const allArray = `first: 5`
    const firstObject = `where: { title: "${$nuxt.$route.params.collectionid}"}`
    const query = gql`
      query Sample {
        contracts(${isArray ? allArray : firstObject}) {
          id
          title
          mint_count
          bid_count
          sell_count
          sell_max_price
          sell_min_price
          sell_total_price
          list_count
          dna_count
        }
      }`;
    let data = await this.$graphql.default.request(query)
    return isArray ? data.contracts : data.contracts[0]
  },

  // REMOVE NFT FROM LIST

  async removeNft({commit, state}, id) {
    const signer = this.getters.provider.getSigner()
    const contract = new ethers.Contract(state.marketMain, MarketMainABI, signer)
    try {
      await contract.delistToken(state.nft.contract_address ,id)
      this.getters.provider.once(contract, async () => {
        return true
      });
    } catch (error) {
      console.log(error)
      return false
    }
  }
}


export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  setAddress(state,address) {
    localStorage.setItem('address', address)
    state.fullAddress = address.toLowerCase()
    const startID = address.split("").slice(0, 6);
    const endID = address.split("").slice(-4);
    const dotArr = [".", ".", "."];
    state.address = startID
      .concat(dotArr)
      .concat(endID)
      .join("");
  },
  setNewNftList(state, list) {
    state.nftList = list
  },
  addNftToList(state, list) {
    for (let nft of list) {
      state.nftList.push(nft)
    }
  },
  setNewNft(state, nft) {
    state.nft = nft
  },
  changelistToken(state, status) {
    state.listToken = status
  },
  changeApproveToken(state, approve) {
    state.approveToken = approve
  },
  changeCountPage(state, count) {
    console.log(count)
    state.countPage = count
  },
  changeSuccessBuyToken(state) {
    state.successBuyToken = true
  },
  setChainId(state, chain) {
    state.chainId = chain
  },
  setMessage(state, msg) {
    state.message = msg
  },
  changeSortData(state, type) {
    console.log(type)
    switch (type) {
      case 'myNft': state.sort = `first: 200 where: { owner: "${localStorage.getItem('address').toLowerCase()}"} orderBy: contract_id`;
        break;
      case 'myNftAll': state.sort = `where: { owner: "${localStorage.getItem('address').toLowerCase()}" contract: "${$nuxt.$route.params.collectionid}"} orderBy: contract_id`;
        break;
      case 'myNftSold': state.sort = `where: { seller: "${localStorage.getItem('address').toLowerCase()}" contract: "${$nuxt.$route.params.collectionid}"} orderBy: contract_id`;
        break;
      case 'all': state.sort =  `orderBy: contract_id`;
        break;
      case 'price-lowest': state.sort = `orderBy: price, orderDirection: asc`;
        break;
      case 'price-lowest-sold': state.sort = `orderBy: price_total, orderDirection: asc`;
        break;
      case 'price-highest': state.sort = `orderBy: price, orderDirection: desc`;
        break;
      case 'price-highest-sold': state.sort = `orderBy: price_total, orderDirection: desc`;
        break;
      case 'rarity-rare': state.sort =  `orderBy: rarity_rank, orderDirection: asc`;
        break;
      case 'rarity-common': state.sort =  `orderBy: rarity_rank, orderDirection: desc`;
        break;
      case 'mint-lowest': state.sort = `orderBy: contract_id`;
        break;
      case 'mint-lowest-sold': state.sort = `orderBy: contract_id`;
        break;
      case 'mint-highest': state.sort = `orderBy: contract_id orderDirection: desc`;
        break;
      case 'mint-highest-sold': state.sort = `orderBy: contract_id orderDirection: desc`;
        break;
      case 'pagination': state.sort = `skip: ${48 * (state.countPage - 1)} orderBy: contract_id`;
        break;
    }
  }
}
