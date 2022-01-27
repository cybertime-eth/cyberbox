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
  marketMain: '0x6575e9e5eC3d000CdcE68FC3236dC4AEe6e93b71',
  daosContract: '0xd72F0884eC13673a86D28686539e1cCF34de5c51',
  maosContract: '0x1FBB74537Bf8b8bbd2aF43fE2115638A67137D45',
  celo: '0xf194afdf50b03e69bd7d057c1aa9e10c9954e4c9',
  celoToken: '0x471EcE3750Da237f93B8E339c536989b8978a438',
  user: {},
  chainId: null,
  address: null,
  wrongNetwork: false,
  fullAddress: null,
  nftList: [],
  nft: {},
  approveToken: '',
  approvedContracts: [],
  listToken: '',
  countPage: 1,
  filter: filter.races.DAOS.layers,
  successBuyToken: false,
  successRemoveToken: false,
  message: '',
  sort: `orderBy: contract_id`,
  pagination: null,
})
export const getters = {
  provider() {
    const web3 = window.web3.eth ? window.web3.eth.currentProvider.connected : window.web3.eth
    return new ethers.providers.Web3Provider(web3 ? web3 : window.ethereum);
  },
  web3Provider() {
	let web3Provider = window.ethereum
	if (!web3Provider) {
	  web3Provider = new Web3.providers.HttpProvider('https://forno.celo.org')
	}
	return web3Provider
  },
  paginationSort(state) {
	return state.pagination ? `${state.pagination} ${state.sort}` : state.sort
  }
}
export const actions = {
  async getGraphData({commit, state, getters}) {
    const sort = getters.paginationSort
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
    state.pagination ? commit('addNftToList', data.contractInfos) : commit('setNewNftList', data.contractInfos)
    return data.contractInfos
  },

  async getFloorPrice({}, contract) {
    const query = gql`
      query Sample {
        contractInfos(first: 1 orderBy: price where: { market_status: "LISTED" contract: "${contract}" }) {
			id
			contract
			price
        }
      }`
	const data = await this.$graphql.default.request(query)
	const tokenPrice = data.contractInfos.length > 0 ? data.contractInfos[0].price : 0
	return tokenPrice ? (tokenPrice / 1000).toFixed(2) : '-'
  },

  async getGraphDataListed({state, commit, getters}) {
    const sort = getters.paginationSort
    const query = gql`
      query Sample {
        contractLists(${sort} first: 48 where: { contract: "${$nuxt.$route.params.collectionid}"}) {
          id
          contract
          contract_id
          price
          image
          contract_name
          owner
        }
      }`;
    const data = await this.$graphql.default.request(query)
    state.pagination ? commit('addNftToList', data.contractLists) : commit('setNewNftList', data.contractLists)
  },

  async getGraphDataSells({state, commit, getters}) {
    const sort = getters.paginationSort
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
          contract_name
          seller
        }
      }`;
    const data = await this.$graphql.default.request(query)
    state.pagination ? commit('addNftToList', data.contractSells) : commit('setNewNftList', data.contractSells)
  },

  // AUTHORIZATION



  async updateUser({commit, state, getters}) {
	const web3Provider = getters.web3Provider
	const provider = new ethers.providers.Web3Provider(web3Provider);
  const ethereum = web3Provider
  // localStorage.removeItem('address')
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
        44787: "https://alfajores-forno.celo-testnet.org",
        42220: "https://forno.celo.org",
      },
      qrcodeModalOptions: {
        mobileLinks: ['metamask']
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
  async switchNetwork() {
    try {
      await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{"chainId": '0xa4ec'}] })
    } catch(e) {
      try {
        if (e.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              "chainId": "0xa4ec",
              "chainName": "Celo (Mainnet)",
              "rpcUrls": [
                "https://forno.celo.org"
              ],
              "nativeCurrency": {
                "name": "Celo",
                "symbol": "CELO",
                "decimals": 18
              },
              "blockExplorerUrls": [
                "https://explorer.celo.org"
              ]
          }]})
        } else {
          console.log(e)
        }
      } catch(e) {
        console.log(e)
      }
    }
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

  async getBalance({state, getters}) {
	const web3 = new Web3(getters.web3Provider)
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
        contractInfo(id: "${token.id}_${token.collectionId}") {
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


  async getStatisticCountNft() {
    const timeYesterday = ((Date.now() / 1000) - 186400).toFixed(0)
    const query = gql`
      query Sample {
        contractSells(where:{ updatedAt_gt: ${timeYesterday} }) {
          updatedAt
          price_total
        }
      }`;
    const data = await this.$graphql.default.request(query)
    return data.contractSells
  },

  // SELL NFT

  async approveToken({commit, state, dispatch}) {
    const signer = this.getters.provider.getSigner()
    const getSupportMarketPlace = new ethers.Contract(state.marketMain, MarketMainABI, signer)
    const resultAddress = await getSupportMarketPlace.getSupportMarketPlaceToken(state.nft.contract_address)
    const contract = new ethers.Contract(state.nft.contract_address, DaosABI, signer)
    try {
      await contract.approve(resultAddress, state.nft.contract_id)
      contract.on("Approval", () => {
        commit('changeApproveToken', 'approve')
        const newApprovedContracts = [
          ...state.approvedContracts,
          state.nft.contract
        ]
        commit('changeApprovedContracts', newApprovedContracts)
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
      await contract.listToken(state.nft.contract_address, state.nft.contract_id, web3.utils.toWei(String(nft.price)))
      this.getters.provider.once(contract, async () => {
        commit('changelistToken', true)
      });
    } catch (error) {
      commit('changelistToken', false)
      console.log(error)
    }
  },
  async changeNFTPrice({commit, state}, price) {
    const signer = this.getters.provider.getSigner()
    const contract = new ethers.Contract(state.marketMain, MarketMainABI, signer)
    try {
      await contract.changePrice(state.nft.contract_address, state.nft.contract_id, web3.utils.toWei(String(price)))
      this.getters.provider.once(contract, async () => {
        commit('changelistToken', true)
      });
    } catch (error) {
      commit('changelistToken', false)
      console.log(error)
    }
  },

  // BUY NFT

  async approveBuyToken({commit,state, dispatch, getters}, token) {
	const web3 = new Web3(getters.web3Provider)
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
  async buyNFT({commit, state, getters}, token) {
    const web3 = new Web3(getters.web3Provider)
    const accounts = await web3.eth.getAccounts()
    const account = accounts[0]
    const kit = ContractKit.newKitFromWeb3(web3)
    let cUSDcontract = await kit.contracts.getStableToken()
    const contract = new kit.web3.eth.Contract(MarketMainABI, state.marketMain)
    const parsePrice = ethers.utils.parseEther(String(token.price))
    console.log(token.price)
    const result = await contract.methods.buyToken(state.nft.contract_address, token.id, web3.utils.toWei(String(token.price))).send({
      from: account,
      value: parsePrice,
      feeCurrency: cUSDcontract.address
    })
    this.getters.provider.once(result, async () => {
      commit('changeSuccessBuyToken', true)
    });
  },

  // GET COLLECTION INFO

  async getCollectionInfo({commit, state}, isArray) {
    const allArray = `orderBy: sell_total_price, orderDirection: desc where: { mint_count_gt: 0 }`
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
          nftName
          nftSymbol
          ownerCount
        }
      }`;
    let data = await this.$graphql.default.request(query)
    return isArray ? data.contracts : data.contracts[0]
  },

  async getContractInfoTimePercent({commit, state}, contract) {
    const currTime = new Date().getTime()
    const timeBeforeOneDay = Math.floor((currTime - (24 * 3600 * 1000)) / 1000)
    const timeBeforeTwoDays = Math.floor((currTime - (48 * 3600 * 1000)) / 1000)
    const time24hNftsQuery = gql`
      query Sample {
        contractInfos(where: { market_status: "MINT" contract: "${contract}" updatedAt_gte: ${timeBeforeOneDay} }) {
          id
        }
      }`;
    const time48hNftsQuery = gql`
      query Sample {
        contractInfos(where: { market_status: "MINT" contract: "${contract}" updatedAt_gte: ${timeBeforeTwoDays} updatedAt_lt: ${timeBeforeOneDay} }) {
          id
        }
      }`;
    const data1 = await this.$graphql.default.request(time24hNftsQuery)
    const data2 = await this.$graphql.default.request(time48hNftsQuery)
    const ts1 = data1.contractInfos.length;
    const ts2 = data2.contractInfos.length;
    const tsOffset = ts1 - ts2;
    return ts2 === 0 ? 0 : Math.ceil(tsOffset / ts2 * 100)
  },

  // REMOVE NFT FROM LIST

  async removeNft({commit, state}, id) {
    const signer = this.getters.provider.getSigner()
    const contract = new ethers.Contract(state.marketMain, MarketMainABI, signer)
    try {
      await contract.delistToken(state.nft.contract_address ,id)
      this.getters.provider.once(contract, async () => {
        commit('changeSuccessRemoveToken', true)
        return true
      })
    } catch (error) {
      console.log(error)
      commit('changeSuccessRemoveToken', true)
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
    state.nftList = []
    for (let nft of list) {
      state.nftList.push({
        ...nft,
        price: nft.price ? nft.price / 1000 : nft.price_total / 1000
      })
	}
	state.pagination = null
  },
  addNftToList(state, list) {
    for (let nft of list) {
      state.nftList.push({
        ...nft,
        price: nft.price / 1000
      })
    }
  },
  setNewNft(state, nft) {
    state.nft = {
      ...nft,
      price: nft.price / 1000
    }
  },
  changelistToken(state, status) {
    state.listToken = status
  },
  changeApproveToken(state, approve) {
    state.approveToken = approve
  },
  changeApprovedContracts(state, approvedContracts) {
    state.approvedContracts = approvedContracts
  },
  changeCountPage(state, count) {
    state.countPage = count
  },
  changeSuccessBuyToken(state, status) {
    state.successBuyToken = status
  },
  changeSuccessRemoveToken(state, status) {
    state.successRemoveToken = status
  },
  setChainId(state, chain) {
    state.chainId = chain
    // state.wrongNetwork = chain !== 42220
  },
  setMessage(state, msg) {
    state.message = msg
  },
  changeSortData(state, type) {
    let myNftSort = ''
    let prefixAddress = ''
    let suffixAddress = ''
    let address = state.address
    if (address) {
      const addressSplits = address.split('...')
      prefixAddress = addressSplits[0].toLowerCase()
      suffixAddress = addressSplits[1].toLowerCase()
    } else {
      if (process.browser) {
        address = localStorage.getItem('address')
        if (address) {
          prefixAddress = address.substr(0, 6).toLowerCase()
          suffixAddress = address.substr(-4).toLowerCase()
        }
      }
    }
    if (type.includes('myNft') && address) {
      if (type === 'myNft') {
        myNftSort = `first: 200 where: { owner_starts_with: "${prefixAddress}" owner_ends_with: "${suffixAddress}" } orderBy: contract_id`
      } else if (type.toLowerCase().includes('sold')) {
        myNftSort = `where: { seller_starts_with: "${prefixAddress}" seller_ends_with: "${suffixAddress}" contract: "${$nuxt.$route.params.collectionid}"}`
      } else {
        myNftSort = `where: { owner_starts_with: "${prefixAddress}" owner_ends_with: "${suffixAddress}" contract: "${$nuxt.$route.params.collectionid}"}`        
      }
    }
    switch (type) {
      case 'myNft': state.sort = myNftSort;
        break;
      case 'myNftAll': state.sort = myNftSort + ` orderBy: contract_id`;
        break;
      case 'myNftSold': state.sort = myNftSort + ` orderBy: contract_id`;
        break;
      case 'all': state.sort =  `orderBy: contract_id`;
        break;
      case 'myNft-price-lowest': state.sort = myNftSort + ` orderBy: price, orderDirection: asc`;
        break;
      case 'myNft-price-lowest-sold': state.sort = myNftSort + ` orderBy: price_total, orderDirection: asc`;
        break;
      case 'myNft-price-highest': state.sort = myNftSort + ` orderBy: price, orderDirection: desc`;
        break;
      case 'myNft-price-highest-sold': state.sort = myNftSort + ` orderBy: price_total, orderDirection: desc`;
        break;
      case 'myNft-rarity-rare': state.sort =  myNftSort + ` orderBy: rarity_rank, orderDirection: asc`;
        break;
      case 'myNft-rarity-common': state.sort =  myNftSort + ` orderBy: rarity_rank, orderDirection: desc`;
        break;
      case 'myNft-mint-lowest': state.sort = myNftSort + ` orderBy: contract_id`;
        break;
      case 'myNft-mint-lowest-sold': state.sort = myNftSort + ` orderBy: contract_id`;
        break;
      case 'myNft-mint-highest': state.sort = myNftSort + ` orderBy: contract_id orderDirection: desc`;
        break;
      case 'myNft-mint-highest-sold': state.sort = myNftSort + ` orderBy: contract_id orderDirection: desc`;
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
	  case 'pagination': state.pagination = `skip: ${48 * (state.countPage - 1)}`;
        break;
	}
	if (type !== 'pagination') {
	  state.countPage = 1
	  state.pagination = null
  }
  }
}
