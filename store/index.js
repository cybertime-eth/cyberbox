import Web3 from 'web3'
import {ethers, Wallet, providers, BigNumber} from 'ethers'
import WalletConnectProvider from "@walletconnect/web3-provider";
import CyberBoxMarketplaceABI from './../abis/cyberBoxMarketPlace.json'
import DaosABI from './../abis/daos.json'
import {gql} from "nuxt-graphql-request";
const ContractKit = require('@celo/contractkit')
import filter from './../config.js'
export const state = () => ({
  celoPunks: '0x9f46B8290A6D41B28dA037aDE0C3eBe24a5D1160',
  cyberBoxMarketplace: '0x2C66111c8eB0e18687E6C83895e066B0Bd77556A',
  daosContract: '0xc43e4469DB9aF84370b7bC4e7EFfEefCc2251B4f',
  maosContract: '0x22E495DA2A5f00134408A183830Cf9b792684d9E',
  celo: '0xf194afdf50b03e69bd7d057c1aa9e10c9954e4c9',
  user: {},
  chainId: null,
  address: null,
  fullAddress: null,
  nftList: [],
  nft: {},
  approveToken: '',
  listToken: '',
  countPage: 0,
  filter: filter.races.DAOS.layers
})
export const getters = {
  provider() {
    const web3 = window.web3.eth ? window.web3.eth.currentProvider.connected : window.web3.eth
    return new ethers.providers.Web3Provider(web3 ? web3 : window.ethereum);
  }
}
export const actions = {
  async getGraphData({commit,state}, type) {
    let sort = `orderBy: contract_id`
    switch (type) {
      case 'myNft': sort = `where: { owner: "${localStorage.getItem('address')}"} orderBy: contract_id`;
        break;
      case 'myNftAll': sort = `where: { owner: "${localStorage.getItem('address')}" contract: "${$nuxt.$route.params.collectionid}"} orderBy: contract_id`;
        break;
      case 'myNftlisted': sort = `where: { owner: "${localStorage.getItem('address')}" market_status: "LISTED"  contract: "${$nuxt.$route.params.collectionid}"} orderBy: contract_id`;
        break;
      case 'myNftbought': sort = `where: { owner: "${localStorage.getItem('address')}" market_status: "BOUGHT"  contract: "${$nuxt.$route.params.collectionid}"} orderBy: contract_id`;
        break;
      case 'listed': sort = `where: { market_status: "LISTED"  contract: "${$nuxt.$route.params.collectionid}"} orderBy: contract_id`;
        break;
      case 'all': sort =  `orderBy: contract_id`;
        break;
      case 'bought': sort = `where: { market_status: "BOUGHT"  contract: "${$nuxt.$route.params.collectionid}"} orderBy: contract_id`;
        break;
      case 'price-lowest': sort = `orderBy: price, orderDirection: asc`;
        break;
      case 'price-highest': sort = `orderBy: price, orderDirection: desc`;
        break;
      case 'rarity-rare': sort =  `orderBy: rarity_rank, orderDirection: asc`;
        break;
      case 'rarity-common': sort =  `orderBy: rarity_rank, orderDirection: desc`;
        break;
      case 'mint-lowest': sort = `orderBy: contract_id`;
        break;
      case 'mint-highest': sort = `orderBy: contract_id orderDirection: desc`;
        break;
      case 'pagination': sort = `skip: ${48 * state.countPage} orderBy: contract_id`;
        break;
    }
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
    type === 'pagination' ? commit('addNftToList', data.contractInfos) : commit('setNewNftList', data.contractInfos)
    return data.contractInfos
  },



  // AUTHORIZATION



  async updateUser({commit}) {
    const web3 = window.web3.eth ? window.web3.eth.currentProvider.connected : window.web3.eth
    const provider = new ethers.providers.Web3Provider(web3 ? web3 : window.ethereum);
    if (localStorage.getItem('address') && !localStorage.getItem('walletconnect')) {
      const signer = await provider.getSigner()
      const address = await signer.getAddress()
      commit('setAddress', address)
    }
  },
  async connectMetaTrust({commit}) {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const address = await provider.getSigner().getAddress();
        commit('setAddress', address)
      } else if (window.web3) {
        window.web3 = new ethers.providers.Web3Provider(
          window.web3.currentProvider
        );
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const address = await provider.getSigner().getAddress();
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
    const contract = new ethers.Contract(state.daosContract, DaosABI, signer)
    try {
      await contract.approve(state.cyberBoxMarketplace, state.nft.contract_id)
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
    const contract = new ethers.Contract(state.cyberBoxMarketplace, CyberBoxMarketplaceABI, signer)
    try {
      await contract.listToken(state.nft.contract_id, nft.price, nft.date.toFixed(0))
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
    const parsePrice = ethers.utils.parseEther(String(token.price + token.price * 30 / 1000))
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
    const contract = new kit.web3.eth.Contract(CyberBoxMarketplaceABI, state.cyberBoxMarketplace)
    const parsePrice = ethers.utils.parseEther(String(token.price))
    const parseId = BigNumber.from(token.id).toNumber()
    const result = await contract.methods.buyToken(parseId).send({
      from: account,
      value: parsePrice,
      gas: 3000000
    })
  },

  // GET COLLECTION INFO

  async getCollectionInfo({commit, state}) {
    const query = gql`
      query Sample {
        contracts(first: 5) {
           id
          title
          mint_count
          bid_count
          sell_count
          sell_max_price
          sell_min_price
          sell_total_price
          dna_count
        }
      }`;
    let data = await this.$graphql.default.request(query)
    return data.contracts[0]
  },

  // REMOVE NFT FROM LIST

  async removeNft({commit, state}, id) {
    const signer = this.getters.provider.getSigner()
    const contract = new ethers.Contract(state.cyberBoxMarketplace, CyberBoxMarketplaceABI, signer)
    try {
      await contract.delistToken(id)
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
    state.countPage = count
  },
}
