import Web3 from 'web3'
import {ethers, Wallet, providers, BigNumber} from 'ethers'
import WalletConnectProvider from "@walletconnect/web3-provider";
import MarketMainABI from '../abis/marketMain.json'
import daosABI from '../abis/daos.json'
import punksABI from '../abis/punks.json'
import toadsABI from '../abis/toads.json'
import cshapeABI from '../abis/cshape.json'
import pxaABI from '../abis/pixcel.json'
import {gql} from "nuxt-graphql-request";
const ContractKit = require('@celo/contractkit')
import filter from './../config.js'
import redstone from 'redstone-api';
export const state = () => ({
  celoPunks: '0x9f46B8290A6D41B28dA037aDE0C3eBe24a5D1160',
  cyberBoxMarketplace: '0x78253a54a7FD429605E8815f96EedB91c92073e0',
  marketMain: '0xaBb380Bd683971BDB426F0aa2BF2f111aA7824c2',
  daosContract: '0x34d63dc2f8c5655bA6E05124B3D4a283A402CEd9',
  maosContract: '0x1FBB74537Bf8b8bbd2aF43fE2115638A67137D45',
  celo: '0xf194afdf50b03e69bd7d057c1aa9e10c9954e4c9',
  celoToken: '0x471EcE3750Da237f93B8E339c536989b8978a438',
  user: {},
  chainId: null,
  address: null,
  wrongNetwork: false,
  fullAddress: null,
  nftList: [],
  myNftList: [],
  nft: {},
  approveToken: '',
  listToken: '',
  countPage: 1,
  filter: filter.races.DAOS.layers,
  successBuyToken: false,
  successRemoveToken: false,
  successTransferToken: false,
  message: '',
  sort: `orderBy: contract_id`,
  pagination: null,
  collectionSetting: null,

  collectionList: [
    {
      id: 1,
      name: 'Daopolis',
      route: 'daos',
      image: '/collections/daopolis.jpg',
      banner: '/collections/daopolis-banner.jpg',
      logo: '/collections/daopolis-logo.png',
      website: 'https://www.daopolis.city',
      twitter: 'https://twitter.com/cybertime_eth',
      discord: 'https://discord.gg/cKcWfCux4s',
      telegram: 'https://t.me/cybertime_eth',
      description: "Automatically generated 9192 NFT's. Born in the CyberTime era, Daopolis citizens will be the foundation of a new gaming metaverse on Celo. Find your digital avatar, gain access to a private club and participate in unique NFT games!"
    },
    {
      id: 2,
      name: 'CeloPunks',
      route: 'cpunk',
      image: '/collections/Celopunks.jpg',
      banner: '/collections/CeloPunks-banner.png',
      logo: '/collections/CeloPunks-logo.png',
      wallet: '0x29a6520A99656e5b17A34471D5d458eFD3696695',
      website: 'https://celopunks.club/',
      twitter: 'https://twitter.com/CeloPunks',
      discord: 'https://discord.com/invite/Dzukufsrqe',
      telegram: 'https://t.me/celopunksclub',
      description: 'CeloPunks is the first NFT Punks tribute on the Celo Blockchain. Only 10000 Punks will be minted with new and unique traits! Not affiliated with LarvaLabs'
    },
    {
      id: 3,
      name: 'CeloToadz',
      route: 'ctoadz',
      image: '/collections/celoToadz.png',
      banner: '/collections/celoToadz-banner.png',
      logo: '/collections/celoToadz-logo.png',
      wallet: '0xdbde524ed479f9effe777ba6b708ed8463fba445',
      website: 'https://www.celotoadz.com/',
      twitter: 'https://twitter.com/c_ToadzOfficial',
      discord: 'https://discord.gg/dD3D223k8N',
      instagram: 'https://www.instagram.com/celotoadzofficial/',
      description: 'CeloToadz | First collection of 6969 randomly generated Toadz made up of more than 120 different traits on Celo Blockchain!'
    },
    {
      id: 4,
      name: 'CeloShapes',
      route: 'cshape',
      image: '/collections/cshape.png',
      banner: '/collections/cshape-banner.png',
      logo: '/collections/cshape-logo.png',
      website: 'https://celoshapes.art',
      twitter: 'https://twitter.com/CeloShapesNFT',
      discord: 'https://discord.com/invite/H7NnhjHwWy',
      description: 'CeloShapes is a generative art collection living on the Celo blockchain. Collection contains 4444 algorithmically generated colorful artwork.'
    },
    {
      id: 5,
      name: 'CeloApes',
      route: 'cak',
      image: '/collections/cak.png',
      banner: '/collections/cak-banner.png',
      logo: '/collections/cak-logo.png',
      website: 'https://www.celoapes.club',
      twitter: 'https://twitter.com/Celo_Apes',
      discord: 'https://discord.gg/bxEAVV8Fcj',
      description: 'The Celo Apes Kingdom is an collection of 10000 APE NFT (10000 minted!) on Celo Blockchain. Own an Ape to become part of the most epic Ape Kingdom. 10% of all money goes towards eradicating poverty.'
    },
    {
      id: 6,
      name: 'PunksChristmas',
      route: 'christmaspunk',
      image: '/collections/christmaspunk.png',
      banner: '/collections/christmaspunk-banner.png',
      logo: '/collections/christmaspunk-logo.png',
      website: 'https://celopunks.club/',
      twitter: 'https://twitter.com/CeloPunks',
      discord: 'https://discord.com/invite/Dzukufsrqe',
      telegram: 'https://t.me/celopunksclub',
      description: 'CeloPunks is the first NFT Punks tribute on the Celo Blockchain. Only 10000 Punks will be minted with new and unique traits! Not affiliated with LarvaLabs'
    },
    {
      id: 7,
      name: 'PunksNeon',
      route: 'cpunkneon',
      image: '/collections/cpunkneon.png',
      banner: '/collections/cpunkneon-banner.png',
      logo: '/collections/cpunkneon-logo.png',
      website: 'https://celopunks.club/',
      twitter: 'https://twitter.com/CeloPunks',
      discord: 'https://discord.com/invite/Dzukufsrqe',
      telegram: 'https://t.me/celopunksclub',
      description: 'CeloPunksNeon are a special collection of CeloPunks with a unique Neon style designed for CeloPunks holders. Not affiliated with LarvaLabs.'
    },
    {
      id: 8,
      name: 'Nomstronaut',
      route: 'nomstronaut',
      image: '/collections/nomstronaut.png',
      banner: '/collections/nomstronaut-banner.png',
      logo: '/collections/nomstronaut-logo.png',
      website: 'https://www.nom.space/',
      twitter: 'https://twitter.com/nomspace_nom',
      discord: 'https://discord.gg/byMNXabAxZ',
      description: "All .nom's are NFTs which means you can easily transfer and sell them."
    },
    {
      id: 9,
      name: 'CeloPaints',
      route: 'cpaint',
      image: '/collections/cpaint.png',
      banner: '/collections/cpaint-banner.png',
      logo: '/collections/cpaint-logo.png',
      website: 'https://celopaints.art',
      twitter: 'https://twitter.com/CeloPaintsNFT',
      discord: 'https://discord.com/invite/H7NnhjHwWy',
      description: 'CeloPaints is a generative abstract art collection living on the Celo blockchain. Collection contains 444 algorithmically generated colorful abstract paintings.'
    },
    {
      id: 10,
      name: 'DimsOfCelo',
      route: 'dimcelo',
      image: '/collections/DimsOfCelo.png',
      banner: '/collections/DimsOfCelo-banner.png',
      logo: '/collections/DimsOfCelo-logo.png',
      website: 'https://dimsofcelo.art',
      twitter: 'https://twitter.com/dimsofcelonft',
      discord: 'https://discord.com/invite/rhJjVUtKEs',
      description: 'Dimensions of Celo a.k.a. DimsOfCelo NFTs are 10,000 tokens of appreciation on Celo Blockchain, trying to reach their way into generative art.'
    },
    // {
    //   id: 4,
    //   name: 'PixelAva',
    //   route: 'pxa',
    //   image: '/collections/PixelAva.png',
    //   banner: '/collections/PixelAva-banner.png',
    //   logo: '/collections/PixelAva-logo.png',
    //   wallet: '0xeBD0A580fabb5a5DBE98030D074e532F025C1367',
    //   website: 'https://pixelava.space/',
    //   twitter: 'https://twitter.com/NPixelava',
    //   discord: 'https://discord.gg/sjjjFX2X',
    //   description: 'Pixaverse is a collection of GameFi worlds where PixelAva holders have extraordinary privileges.'
    // },
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

  async approveListing({state, commit, dispatch}, { listingMethod, price }) {
    commit('changeApproveToken', 'approve')

    if (listingMethod === 'listingNFT') {
      dispatch(listingMethod, {
        ...state.nft,
        price
      })
    } else {
      dispatch(listingMethod, price)
    }
  },

  async approveToken({commit, state, dispatch}, { listingMethod, price }) {
    const signer = this.getters.provider.getSigner()
    const getSupportMarketPlace = new ethers.Contract(state.marketMain, MarketMainABI, signer)
    const resultAddress = await getSupportMarketPlace.getSupportMarketPlaceToken(state.nft.contract_address)
    let AbiNft = null
    switch (state.nft.contract) {
      case 'daos': AbiNft = daosABI
        break;
      case 'cpunk': AbiNft = punksABI
        break;
      case 'ctoadz': AbiNft = toadsABI
        break;
      case 'cshape': AbiNft = cshapeABI
        break;
      case 'pxa': AbiNft = pxaABI
        break;
    }
    try {
      const contract = new ethers.Contract(state.nft.contract_address, AbiNft, signer)
      const approvedForAll = await contract.isApprovedForAll(state.fullAddress, resultAddress)
      if (!approvedForAll) {
        await contract.setApprovalForAll(resultAddress, state.nft.contract_id, { gasPrice: ethers.utils.parseUnits('0.5', 'gwei') })
        contract.on("ApprovalForAll", () => {
          dispatch('approveListing', { listingMethod, price })
        });
      } else {
        dispatch('approveListing', { listingMethod, price })
      }
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
      await contract.listToken(state.nft.contract_address, state.nft.contract_id, web3.utils.toWei(String(nft.price)), {
        gasPrice: ethers.utils.parseUnits('0.5', 'gwei')
      })
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
      await contract.changePrice(state.nft.contract_address, state.nft.contract_id, web3.utils.toWei(String(price)), {
        gasPrice: ethers.utils.parseUnits('0.5', 'gwei')
      })
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
    const contract = new kit.web3.eth.Contract(MarketMainABI, state.marketMain)
    const parsePrice = ethers.utils.parseEther(String(token.price))
    console.log(token.price)
    const result = await contract.methods.buyToken(state.nft.contract_address, token.id, web3.utils.toWei(String(token.price))).send({
      from: account,
      value: parsePrice,
      gasPrice: ethers.utils.parseUnits('0.5', 'gwei')
    })
    this.getters.provider.once(result, async () => {
      commit('changeSuccessBuyToken', true)
    });
  },

  // Transfer NFT

  async transferNFT({commit, state, getters}, params) {
    const signer = getters.provider.getSigner()
    const contract = new ethers.Contract(state.marketMain, MarketMainABI, signer)
    try {
      await contract.transfer(params.nft.contract_address, params.toAddress, params.nft.contract_id, {
        gasPrice: ethers.utils.parseUnits('0.5', 'gwei')
      })
      this.getters.provider.once(contract, async () => {
        commit('changeSuccessTransferToken', true)
      });
    } catch (error) {
      commit('changeSuccessTransferToken', false)
      console.log(error)
    }
  },

  // GET COLLECTION INFO

  async getCollectionInfo({commit, state}, isArray) {
    const collectionId = $nuxt.$route.params.collectionid
    const allArray = `orderBy: sell_total_price, orderDirection: desc where: { mint_count_gt: 0 }`
    const firstObject = collectionId === 'nomstronaut' ? `where: { id: "0x8237f38694211f25b4c872f147f027044466fa80" }` : `where: { nftSymbol: "${$nuxt.$route.params.collectionid}"}`
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
          createrFee
          producerFee
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
  async getContractInfoWeekPercent({commit, state}, contract) {
    const currTime = new Date().getTime()
    const timeBefore7Days = Math.floor((currTime - (7 * 24 * 3600 * 1000)) / 1000)
    const timeBefore14Days = Math.floor((currTime - (14 * 24 * 3600 * 1000)) / 1000)
    const time7dNftsQuery = gql`
      query Sample {
        contractInfos(where: { market_status: "MINT" contract: "${contract}" updatedAt_gte: ${timeBefore7Days} }) {
          id
        }
      }`;
    const time14dNftsQuery = gql`
      query Sample {
        contractInfos(where: { market_status: "MINT" contract: "${contract}" updatedAt_gte: ${timeBefore14Days} updatedAt_lt: ${timeBefore7Days} }) {
          id
        }
      }`;
    const data1 = await this.$graphql.default.request(time7dNftsQuery)
    const data2 = await this.$graphql.default.request(time14dNftsQuery)
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
      await contract.delistToken(state.nft.contract_address ,id, { gasPrice: ethers.utils.parseUnits('0.5', 'gwei') })
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
  setMyNftList(state, list) {
    state.myNftList = list
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
  changeSuccessBuyToken(state, status) {
    state.successBuyToken = status
  },
  changeSuccessRemoveToken(state, status) {
    state.successRemoveToken = status
  },
  changeSuccessTransferToken(state, status) {
    state.successTransferToken = status
  },
  setChainId(state, chain) {
    state.chainId = chain
    state.wrongNetwork = chain !== 42220
  },
  setMessage(state, msg) {
    state.message = msg
  },
  changeSortData(state, type) {
    let myNftSort = ''
    let address = state.fullAddress
    if (!address && process.browser) {
      address = localStorage.getItem('address')
    }
    if (type.includes('myNft') && address) {
      if (type === 'myNft') {
        myNftSort = `first: 200 where: { owner: "${address.toLowerCase()}"} orderBy: contract_id`
      } else if (type.toLowerCase().includes('sold')) {
        myNftSort = `where: { seller: "${address.toLowerCase()}" contract: "${$nuxt.$route.params.collectionid}"}`
      } else {
        myNftSort = `where: { owner: "${address.toLowerCase()}" contract: "${$nuxt.$route.params.collectionid}"}`        
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
  },
  updateCollectionSetting(state, setting) {
    state.collectionSetting = setting
  }
}
