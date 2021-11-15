import Web3 from 'web3'
import {ethers, Wallet, providers, BigNumber} from 'ethers'
import WalletConnectProvider from "@walletconnect/web3-provider";
import CeloPunksABI from './../abis/celoPunks.json'
import CyberBoxMarketplaceABI from './../abis/cyberBoxMarketPlace.json'
import DaosABI from './../abis/daos.json'
export const state = () => ({
  user: {},
  chainId: null,
  address: null,
  celoPunks: '0xb4C1aF7e7A89E4b3EFEAc330c62e4E3B6Eea8c0b',
  cyberBoxMarketplace: '0xa6cBFBCa5b50282305114E39da7c6218a9BEFADb',
  daosContract: '0x33B823Da7AcAacD389473C7AE9fc03Fd129DCCfb',
  cards: [],
  myCollection: [],
  card: {},
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
  async getCeloCards({commit, state}) {
    if (process.browser) {
      const signer = new Wallet(state.daosContract, this.getters.provider)
      const contract = new ethers.Contract(state.daosContract, DaosABI, signer)
      let countCards = 105
      for (let i = 101; i < countCards; i++) {
        const getNft = await contract.tokenURI(i)
        const res = await this.$axios.get(getNft)
        commit('setNewCards', res.data)
      }
    }
  },
  async getCeloCard({commit, state}, id) {
    if (process.browser) {
      const signer = new Wallet(state.daosContract, this.getters.provider)
      const contract = new ethers.Contract(state.daosContract, DaosABI, signer)
      const getNft = await contract.tokenURI(id)
      const res = await this.$axios.get(getNft)
      commit('setNewCard', res.data)
    }
  },
  async getCollectionCard({commit, state}) {
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
      await contract.approve(state.cyberBoxMarketplace, state.card.edition)
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
  async listingNFT({commit, state}) {
    const signer = this.getters.provider.getSigner()
    const contract = new ethers.Contract(state.cyberBoxMarketplace, CyberBoxMarketplaceABI, signer)
    try {
      await contract.listToken(state.card.edition, 10, 1637412505)
      this.getters.provider.once(contract, async () => {
        commit('changelistTokenToken', true)
      });
    } catch (error) {
      commit('changelistTokenToken', false)
      console.log(error)
    }
  },
  async buyToken({commit, state}, token) {
    const signer = this.getters.provider.getSigner()
    const contract = new ethers.Contract(state.cyberBoxMarketplace, CyberBoxMarketplaceABI, signer)
    contract.buyToken(token.id, token.price)
  },
}
export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  setAddress(state,address) {
    localStorage.setItem('address', address)
    const startID = address.split("").slice(0, 6);
    const endID = address.split("").slice(-4);
    const dotArr = [".", ".", "."];
    state.address = startID
      .concat(dotArr)
      .concat(endID)
      .join("");
  },
  setNewCards(state, card) {
    state.cards.push(card)
  },
  setNewCard(state, card) {
    state.card = card
  },
  setCollection(state, cards) {
    state.myCollection.push(cards)
  },
  changelistTokenToken(state, status) {
    state.listToken = status
  },
  changeApproveToken(state, approve) {
    state.approveToken = approve
  },
}
