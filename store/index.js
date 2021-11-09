import Web3 from 'web3'
import { ethers, Wallet, providers } from 'ethers'
import WalletConnectProvider from "@walletconnect/web3-provider";
import CeloPunksABI from './../abis/celoPunks.json'
export const state = () => ({
  user: {},
  chainId: null,
  address: null,
  celoPunks: '0x9f46B8290A6D41B28dA037aDE0C3eBe24a5D1160',
  cards: [],
  card: {}
})
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
  async getCeloCards({commit, state}, collection) {
    if (process.browser) {
      const web3 = window.web3.eth ? window.web3.eth.currentProvider.connected : window.web3.eth
      const provider = new ethers.providers.Web3Provider(web3 ? web3 : window.ethereum);
      const signer = new Wallet(state.celoPunks, provider)
      const contract = new ethers.Contract(state.celoPunks, CeloPunksABI, signer)
      for (let i = 1; i < 20; i++) {
        const getNft = await contract.tokenURI(i)
        const res = await this.$axios.get(getNft)
        commit('setNewCards', res.data)
      }
    }
  },
  async getCeloCard({commit, state}, id) {
    if (process.browser) {
      const web3 = window.web3.eth ? window.web3.eth.currentProvider.connected : window.web3.eth
      const provider = new ethers.providers.Web3Provider(web3 ? web3 : window.ethereum);
      const signer = new Wallet(state.celoPunks, provider)
      const contract = new ethers.Contract(state.celoPunks, CeloPunksABI, signer)
      const getNft = await contract.tokenURI(id)
      const res = await this.$axios.get(getNft)
      commit('setNewCard', res.data)
    }
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
}
