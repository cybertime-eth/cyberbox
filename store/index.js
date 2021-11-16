import Web3 from 'web3'
import {ethers, Wallet, providers, BigNumber} from 'ethers'
import WalletConnectProvider from "@walletconnect/web3-provider";
import CeloPunksABI from './../abis/celoPunks.json'
import CyberBoxMarketplaceABI from './../abis/cyberBoxMarketPlace.json'
import DaosABI from './../abis/daos.json'
import celoNativeAsset from './../abis/celoNativeAsset.json'
export const state = () => ({
  user: {},
  chainId: null,
  address: null,
  celoPunks: '0x9f46B8290A6D41B28dA037aDE0C3eBe24a5D1160',
  cyberBoxMarketplace: '0xa6cBFBCa5b50282305114E39da7c6218a9BEFADb',
  daosContract: '0x33B823Da7AcAacD389473C7AE9fc03Fd129DCCfb',
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
  async getCeloNftList({commit, state}) {
    if (process.browser) {
      const signer = new Wallet(state.cyberBoxMarketplace, this.getters.provider);
      const contract = new ethers.Contract(state.cyberBoxMarketplace, CyberBoxMarketplaceABI, signer);
      const items = await contract.getAllTokenListings();
      for (let item of items) {
        let result = {
          id: BigNumber.from(item[0]._hex).toNumber(),
          price: BigNumber.from(item[1]._hex).toNumber(),
          address: item[2],
          data: BigNumber.from(item[3]._hex).toNumber()
        }
        commit('setNewNftList', result)
      }
    }
  },
  async getCeloNft({commit, state}, id) {
    if (process.browser) {
      const signer = new Wallet(state.daosContract, this.getters.provider)
      const contract = new ethers.Contract(state.daosContract, DaosABI, signer)
      const getNft = await contract.tokenURI(id)
      const res = await this.$axios.get(getNft)
      commit('setNewNft', res.data)
    }
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
  async approveBuyToken({commit,state}) {
    const contractAddress = '0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9'
    const signer = this.getters.provider.getSigner();
    const contract = new ethers.Contract(contractAddress, celoNativeAsset, signer)
    console.log(contract)
  },
  async buyNFT({commit, state}, token) {
    const signer = this.getters.provider.getSigner();
    const address = await signer.getAddress()
    const contract = new ethers.Contract(state.cyberBoxMarketplace, CyberBoxMarketplaceABI, signer)
    await contract.buyToken(token.id).send({
      from: address,
      value: token.price + token.price * 30 / 1000,
    })
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
  setNewNftList(state, nft) {
    state.nftList.push(nft)
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
