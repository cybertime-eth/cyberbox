import Web3 from 'web3'
import { ethers, Wallet } from 'ethers'
export const state = () => ({
  user: {},
  chainId: null,
  address: null
})
export const actions = {
  async updateUser({commit, state}) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    if (localStorage.getItem('address')) {
      const signer = await provider.getSigner()
      const address = await signer.getAddress()
      commit('setAddress', address)
    }
  },
  async connectMetaTrust({commit, state}) {
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
    const result = startID
      .concat(dotArr)
      .concat(endID)
      .join("");
    console.log('WORK')
    state.address = result
  }
}
