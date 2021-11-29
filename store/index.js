import Web3 from 'web3'
import {ethers, Wallet, providers, BigNumber} from 'ethers'
import WalletConnectProvider from "@walletconnect/web3-provider";
import CyberBoxMarketplaceABI from './../abis/cyberBoxMarketPlace.json'
import DaosABI from './../abis/daos.json'
import {gql} from "nuxt-graphql-request";
const ContractKit = require('@celo/contractkit')
export const state = () => ({
  user: {},
  chainId: null,
  address: null,
  fullAddress: null,
  celoPunks: '0x9f46B8290A6D41B28dA037aDE0C3eBe24a5D1160',
  cyberBoxMarketplace: '0x2eBC5391C39Eb585DA0B828CB1e1Ef8f91946934',
  daosContract: '0xD3C4bD67C30eFB90CDCFb432d2c45fffC02F7090',
  celo: '0xf194afdf50b03e69bd7d057c1aa9e10c9954e4c9',
  nftList: [],
  myCollection: [],
  nft: {},
  approveToken: '',
  listToken: '',
})
export const getters = {
  provider() {
    const web3 = window.web3.eth ? window.web3.eth.currentProvider.connected : window.web3.eth
    return new ethers.providers.Web3Provider(web3 ? web3 : window.ethereum);
  }
}
export const actions = {
  async getGraphData({commit,state}, type) {
    let sort = `first: 50`
    switch (type) {
      case 'myNft': sort = `where: { seller: "${state.fullAddress}"}`
        break;
      case 'listed': sort = `where: { market_status: "LISTED"}`
        break;
      case 'all': sort = `first: 50`
        break;
      case 'bought': sort = `where: { market_status: "BOUGHT"}`
        break;
      case 'price-lowest': sort = `orderBy: price, orderDirection: asc`;
        break;
      case 'price-highest': sort = `orderBy: price, orderDirection: desc`;
        break;
      case 'rarity-rare': sort =  `orderBy: rarity_rank, orderDirection: asc`
        break;
      case 'rarity-common': sort =  `orderBy: rarity_rank, orderDirection: desc`
    }
    const query = gql`
      query Sample {
        daosInfos(${sort}) {
          id
          price
          seller
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
    const data = await this.$graphql.default.request(query)
    let sortData = data.daosInfos.sort((a, b) => BigNumber.from(a.id).toNumber() - BigNumber.from(b.id).toNumber())
    console.log(sortData)
    commit('setNewNftList', sortData)
  },
  async updateUser({commit}) {
    const web3 = window.web3.eth ? window.web3.eth.currentProvider.connected : window.web3.eth
    const provider = new ethers.providers.Web3Provider(web3 ? web3 : window.ethereum);
    if (localStorage.getItem('address') && !localStorage.getItem('walletconnect')) {
      const signer = await provider.getSigner()
      const address = await signer.getAddress()
      commit('setAddress', address)
    }
  },
  reloadOnAccChange({commit}) {
    try {
      if (window.ethereum) {
        const ethereum = window.ethereum;
        ethereum.autoRefreshOnNetworkChange = false;
        ethereum.on("accountsChanged", (accounts) => {
          commit('setAddress', accounts[0])
        });
      }
    } catch (error) {
      console.log("Something went wrong!", error);
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
  async getNft({commit, state}, id) {
    const query = gql`
      query Sample {
        daosInfo(id: "${id}") {
          id
          price
          seller
          attributes
          rarity_rank
          contract_address
          market_status
          name
          image
          description
          updatedAt
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
    commit('setNewNft', data.daosInfo)
    return data.daosInfo
  },
  async getCollectionNft({commit, state}) {
    const signer = this.getters.provider.getSigner()
    const address = signer.getAddress()
    const contract = new ethers.Contract(state.daosContract, DaosABI, signer)
    const res = await contract.tokensOfOwner(address)
    for (let number of res) {
      let bigNumber = BigNumber.from(number._hex).toNumber()
      const getNft = await contract.tokenURI(bigNumber)
      const res = await this.$axios.get(getNft)
      commit('setCollection', res.data)
    }
  },
  async approveToken({commit, state, dispatch}) {
    const signer = this.getters.provider.getSigner()
    const contract = new ethers.Contract(state.daosContract, DaosABI, signer)
    try {
      await contract.approve(state.cyberBoxMarketplace, state.nft.edition)
      contract.on("Approval", () => {
        commit('changeApproveToken', true)
      });
    } catch (error) {
      commit('changeApproveToken', false)
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
      console.log(nft.price, nft.date)
      await contract.listToken(state.nft.edition, nft.price, nft.date)
      this.getters.provider.once(contract, async () => {
        commit('changelistToken', true)
      });
    } catch (error) {
      commit('changelistToken', false)
      console.log(error)
    }
  },
  async approveBuyToken({commit,state, dispatch}, token) {
    const web3 = new Web3(window.ethereum)
    const accounts = await web3.eth.getAccounts()
    const account = accounts[0]
    const linkAddress = `https://alfajores-blockscout.celo-testnet.org/address/${account}`
    const kit = ContractKit.newKitFromWeb3(web3)
    const goldToken = await kit._web3Contracts.getGoldToken();
    const exchange = await kit._web3Contracts.getExchange()
    const balance = await goldToken.methods.balanceOf(account).call()
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
    const linkAddress = `https://alfajores-blockscout.celo-testnet.org/address/${account}`
    const kit = ContractKit.newKitFromWeb3(web3)
    const goldToken = await kit._web3Contracts.getGoldToken();
    const exchange = await kit._web3Contracts.getExchange()
    const balance = await goldToken.methods.balanceOf(account).call()
    const contract = new kit.web3.eth.Contract(CyberBoxMarketplaceABI, state.cyberBoxMarketplace)
    const parsePrice = ethers.utils.parseEther(String(token.price))
    const parseId = BigNumber.from(token.id).toNumber()
    const gas = ethers.utils.parseEther(String(3000000))
    const result = await contract.methods.buyToken(parseId).send({
      from: account,
      value: parsePrice,
      gas: 3000000
    })
    console.log(result)
  },
}
export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  setAddress(state,address) {
    localStorage.setItem('address', address)
    state.fullAddress = address
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
  setNewNft(state, nft) {
    state.nft = nft
  },
  setCollection(state, nftList) {
    state.myCollection.push(nftList)
  },
  changelistToken(state, status) {
    state.listToken = status
  },
  changeApproveToken(state, approve) {
    state.approveToken = approve
  },
}
