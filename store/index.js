import Web3 from 'web3'
import {ethers, providers, BigNumber} from 'ethers'
import WalletConnectProvider from "@walletconnect/web3-provider"
import { mobileLinkChoiceKey, setLocal, removeLocal } from "@walletconnect/utils"
import ENS from "@ensdomains/ensjs"
import MarketMainABI from '../abis/marketMain.json'
import MarketCertificateABI from '../abis/marketCertificate.json'
import API from '../api'
import daosABI from '../abis/daos.json'
import punksABI from '../abis/punks.json'
import toadsABI from '../abis/toads.json'
import cshapeABI from '../abis/cshape.json'
import pxaABI from '../abis/pixcel.json'
import nomABI from '../abis/nomMarket.json'
import { uuid } from "@walletconnect/utils"
import {gql} from "nuxt-graphql-request";
const ContractKit = require('@celo/contractkit')
import redstone from 'redstone-api'
import { Magic } from 'magic-sdk'
import { RESOURCE_CDN_ROOT } from '@/config'
export const state = () => ({
  marketMain: '0xaBb380Bd683971BDB426F0aa2BF2f111aA7824c2',
  marketNom: '0x2C66111c8eB0e18687E6C83895e066B0Bd77556A',
  marketCertificate: '0xD734bB58a28AAAAcbE5a738398f471B3187B2960',
  nomContractAddress: '0xdf204de57532242700D988422996e9cED7Aba4Cb',
  certContractAddress: '0xA4A8E345E1a88EFc9164014BB2CeBd4C2F98E986',
  user: {},
  chainId: null,
  address: null,
  balance: 0,
  sharedWallet: null,
  walletUri: null,
  walletConnected: false,
  wrongNetwork: false,
  magicConnected: false,
  fullAddress: null,
  nftList: [],
  myNftList: [],
  traitFilters: [],
  notificationList: [],
  certificateList: [],
  certificateSaleList: [],
  boxCollection: null,
  boxCollectionList: [],
  filteredTraits: null,
  nft: {},
  approveToken: '',
  listToken: '',
  countPage: 1,
  cMCO2Price: 0, // CELO price for cMCO2
  mintNumFilter: null,
  nomNameFilter: null,
  successApproveBuyToken: false,
  buyTokenApproved: false,
  successBuyToken: false,
  successRemoveToken: false,
	successTransferToken: false,
	sellTokenClosed: false,
  message: '',
  sort: `orderBy: contract_id`,
  raritySort: null,
  pagination: null,
  collectionSetting: null,
	multiNftSymbols: ['knoxnft', 'CBCN'],
	availableCDNCollections: ['daos', 'nomdom'],
  multiNftNames: [
    { id: 'COMMON', name: 'Knoxer' },
    { id: 'LEGENDARY', name: 'LydianKnoxer' },
    { id: 'RARE', name: 'SuperKnoxer' },
    { id: 'SUPER-RARE', name: 'MegaKnoxer' }
  ],

  collectionList: [
	{
	  id: 22,
	  name: 'ReFi Calendar',
	  route: 'CBCN',
	  image: `${RESOURCE_CDN_ROOT}/collections/CBCN.webp`,
	  mobileImage: `${RESOURCE_CDN_ROOT}/collections/CBCN-mobile.webp`,
	  banner: `${RESOURCE_CDN_ROOT}/collections/CBCN-banner.webp`,
	  logo: `${RESOURCE_CDN_ROOT}/collections/CBCN-logo.webp`,
	  website: '/calendar',
	  twitter: 'https://twitter.com/CyberboxArt',
	  discord: 'https://discord.gg/cKcWfCux4s',
	  telegram: 'https://t.me/cyberboxArt',
	  description: "Like man, nature has its own unique features that can't be found anywhere else. Each certificate is a portrait of plants. Portraits of plants, like those of people, reflect the unique features and beauty of a plant, worthy of appreciation and admiration. The beauty of nature is in our hands."
	},
	{
	  id: 2,
	  name: 'The Butterfly Effect',
	  route: 'butterfly',
	  image: `${RESOURCE_CDN_ROOT}/collections/Hive.webp`,
	  mobileImage: `${RESOURCE_CDN_ROOT}/collections/Hive-mobile.webp`,
	  banner: `${RESOURCE_CDN_ROOT}/collections/Hive-banner.webp`,
	  logo: `${RESOURCE_CDN_ROOT}/collections/Hive-logo.webp`,
	  website: 'https://valoraapp.com/',
	  twitter: 'https://www.twitter.com/valoraApp',
	  discord: 'https://valoraapp.co/discord',
	  instagram: 'https://www.instagram.com/valoraApp',
	  description: "You don't need tokens to buy into this project; you just need to spread the word. That's how the butterfly effect and the snowball effect collide. If you believe in the power of small actions, join us on our quest to build a better future.",
	  subDescription: "<b>Important!</b> The total number of NFTs in the collection is 2000. NFTs are issued by invitees in the referral program from Valora app."
	},
	{
		id: 3,
		name: 'Hive Mind',
		route: 'hive',
		image: `${RESOURCE_CDN_ROOT}/collections/NFTBee.webp`,
		mobileImage: `${RESOURCE_CDN_ROOT}/collections/NFTBee-mobile.webp`,
		banner: `${RESOURCE_CDN_ROOT}/collections/NFTBee-banner.webp`,
		logo: `${RESOURCE_CDN_ROOT}/collections/NFTBee-logo.webp`,
		website: 'https://valoraapp.com/',
		twitter: 'https://www.twitter.com/valoraApp',
		discord: 'https://valoraapp.co/discord',
		instagram: 'https://www.instagram.com/valoraApp',
		description: "You don't need tokens to buy into this project; you just need to spread the word. That's how the butterfly effect and the snowball effect collide. If you believe in the power of small actions, join us on our quest to build a better future.",
		subDescription: "<b>Important!</b> The total number of NFTs in the collection is 2000. NFTs are issued by invitees in the referral program from Valora app."
	},
	{
		id: 4,
		name: 'Daopolis',
		route: 'daos',
		image: `${RESOURCE_CDN_ROOT}/collections/daopolis.webp`,
		banner: `${RESOURCE_CDN_ROOT}/collections/daopolis-banner.webp`,
		logo: `${RESOURCE_CDN_ROOT}/collections/daopolis-logo.webp`,
		website: 'https://www.daopolis.city',
		twitter: 'https://twitter.com/CyberboxArt',
		discord: 'https://discord.gg/cKcWfCux4s',
		telegram: 'https://t.me/cyberboxArt',
		description: "Automatically generated 9192 NFT's. Born in the CyberTime era, Daopolis citizens will be the foundation of a new gaming metaverse on Celo. Find your digital avatar, gain access to a private club and participate in unique NFT games!"
	},
	{
		id: 2,
		name: 'Celostrials',
		route: 'nfet',
		image: `${RESOURCE_CDN_ROOT}/collections/celostrials.webp`,
		banner: `${RESOURCE_CDN_ROOT}/collections/celostrials-banner.webp`,
		logo: `${RESOURCE_CDN_ROOT}/collections/celostrials-logo.webp`,
		website: 'https://celostrials.com/#/',
		twitter: 'https://mobile.twitter.com/celostrials',
		discord: 'https://discord.gg/HvvtgPuWHe',
		instagram: 'https://www.instagram.com/celostrials/',
		description: 'Celostrials are an intergalactic collection of unique beings, found exclusively on the Celo Blockchain. Their features are algorithmically generated resulting in an interstellar collectible completely unique to you!'
	},
	{
	  id: 20,
	  name: 'KnoxerDAO',
	  route: 'knoxnft',
	  image: `${RESOURCE_CDN_ROOT}/collections/knoxnft.webp`,
	  banner: `${RESOURCE_CDN_ROOT}/collections/knoxnft-banner.webp`,
	  logo: `${RESOURCE_CDN_ROOT}/collections/knoxnft-logo.webp`,
	  website: 'https://www.knoxdao.xyz/?utm_source=tofuNFT.com&utm_medium=web&utm_campaign=collection',
	  twitter: 'https://twitter.com/KnoxEdgeDAO?utm_source=tofuNFT.com&utm_medium=web&utm_campaign=collection',
	  discord: 'https://discord.gg/Ec5ZwdzZ?utm_source=tofuNFT.com&utm_medium=web&utm_campaign=collection',
	  description: 'Knoxers are Celorians with wisdom beyond those of the same kind :and the ability to see the future:. According to ancient Celorian myths some Knoxers even possess diamond hands and laser eyes'
	},
	{
		id: 3,
		name: 'ChinChilla Gang',
		route: 'gang',
		image: `${RESOURCE_CDN_ROOT}/collections/gang.webp`,
		banner: `${RESOURCE_CDN_ROOT}/collections/gang-banner.webp`,
		logo: `${RESOURCE_CDN_ROOT}/collections/gang-logo.webp`,
		wallet: '0xAfd1dEE2Ac3790aA28d679E82Aaad6Fb9aba24f1',
		website: 'https://www.chinchillagang.com/',
		twitter: 'https://twitter.com/Chinchilla_Gang',
		telegram: 'https://t.co/E8XPvASIrz',
		description: `The ChinChilla Gang collection is composed by 8888 ultra HD NFTs living on Celo blockchain.`
	},
	{
		id: 5,
		name: 'CeloPunks',
		route: 'cpunk',
		image: `${RESOURCE_CDN_ROOT}/collections/Celopunks.webp`,
		banner: `${RESOURCE_CDN_ROOT}/collections/CeloPunks-banner.webp`,
		logo: `${RESOURCE_CDN_ROOT}/collections/CeloPunks-logo.webp`,
		wallet: '0x29a6520A99656e5b17A34471D5d458eFD3696695',
		website: 'https://celopunks.club/',
		twitter: 'https://twitter.com/CeloPunks',
		discord: 'https://discord.com/invite/Dzukufsrqe',
		telegram: 'https://t.me/celopunksclub',
		description: 'CeloPunks is the first NFT Punks tribute on the Celo Blockchain. Only 10000 Punks will be minted with new and unique traits! Not affiliated with LarvaLabs'
	},
    {
      id: 1,
      name: 'NOM domains',
      route: 'nomdom',
      image: `${RESOURCE_CDN_ROOT}/collections/nomdom.webp`,
      banner: `${RESOURCE_CDN_ROOT}/collections/nomdom-banner.webp`,
      logo: `${RESOURCE_CDN_ROOT}/collections/nomdom-logo.webp`,
      website: 'https://www.nom.space/',
      twitter: 'https://twitter.com/nomspace_nom',
      discord: 'https://discord.gg/byMNXabAxZ',
      description: 'Nomspace is a cross-chain name resolution service. Users can reserve a .nom from any supported chain'
    },
    {
      id: 6,
      name: 'CeloApes',
      route: 'cak',
      image: `${RESOURCE_CDN_ROOT}/collections/cak.webp`,
      banner: `${RESOURCE_CDN_ROOT}/collections/cak-banner.webp`,
      logo: `${RESOURCE_CDN_ROOT}/collections/cak-logo.webp`,
      website: 'https://www.celoapes.club',
      twitter: 'https://twitter.com/Celo_Apes',
      discord: 'https://discord.gg/bxEAVV8Fcj',
      description: 'The Celo Apes Kingdom is a collection of 10000 APE NFT on the Celo Blockchain. Own an Ape to become part of the most epic Ape Kingdom.'
    },
    {
      id: 7,
      name: 'Nomstronaut',
      route: 'nomstronaut',
      image: `${RESOURCE_CDN_ROOT}/collections/nomstronaut.webp`,
      banner: `${RESOURCE_CDN_ROOT}/collections/nomstronaut-banner.webp`,
      logo: `${RESOURCE_CDN_ROOT}/collections/nomstronaut-logo.webp`,
      website: 'https://www.nom.space/',
      twitter: 'https://twitter.com/nomspace_nom',
      discord: 'https://discord.gg/byMNXabAxZ',
      description: "NFT Collection of the nomspace team. Trade yours on CyberBox"
    },
    {
      id: 8,
      name: 'MooPunks',
      route: 'mpunk',
      image: `${RESOURCE_CDN_ROOT}/collections/mpunk.webp`,
      banner: `${RESOURCE_CDN_ROOT}/collections/mpunk-banner.webp`,
      logo: `${RESOURCE_CDN_ROOT}/collections/mpunk-logo.webp`,
      website: 'https://app.moola.market/',
      telegram: 'https://t.me/moolamarket',
      twitter: 'https://twitter.com/Moola_Market',
      discord: 'https://discord.com/invite/NsphyqbESK',
      description: 'Moola is a non-custodial liquidity protocol built on the Celo blockchain that is democratizing access to yield and credit. Depositors earn yield which is paid for by borrowers who are able to take over-collateralized loans in perpetuity or under-collateralized flash loans.'
    },
    {
      id: 9,
      name: 'CeloToadz',
      route: 'ctoadz',
      image: `${RESOURCE_CDN_ROOT}/collections/celoToadz.webp`,
      banner: `${RESOURCE_CDN_ROOT}/collections/celoToadz-banner.webp`,
      logo: `${RESOURCE_CDN_ROOT}/collections/celoToadz-logo.webp`,
      wallet: '0xdbde524ed479f9effe777ba6b708ed8463fba445',
      website: 'https://www.celotoadz.com/',
      twitter: 'https://twitter.com/c_ToadzOfficial',
      discord: 'https://discord.gg/dD3D223k8N',
      instagram: 'https://www.instagram.com/celotoadzofficial/',
      description: 'First collection of 6969 randomly generated Toadz made up of more than 120 different traits on Celo Blockchain!'
    },
    {
      id: 10,
      name: 'CeloShapes',
      route: 'cshape',
      image: `${RESOURCE_CDN_ROOT}/collections/cshape.webp`,
      banner: `${RESOURCE_CDN_ROOT}/collections/cshape-banner.webp`,
      logo: `${RESOURCE_CDN_ROOT}/collections/cshape-logo.webp`,
      website: 'https://celoshapes.art',
      twitter: 'https://twitter.com/CeloShapesNFT',
      discord: 'https://discord.com/invite/H7NnhjHwWy',
      description: 'CeloShapes is a generative art collection living on the Celo blockchain. Collection contains 4444 algorithmically generated colorful artwork.'
    },
    {
      id: 11,
      name: 'PunksChristmas',
      route: 'christmaspunk',
      image: `${RESOURCE_CDN_ROOT}/collections/christmaspunk.webp`,
      banner: `${RESOURCE_CDN_ROOT}/collections/christmaspunk-banner.webp`,
      logo: `${RESOURCE_CDN_ROOT}/collections/christmaspunk-logo.webp`,
      website: 'https://celopunks.club/',
      twitter: 'https://twitter.com/CeloPunks',
      discord: 'https://discord.com/invite/Dzukufsrqe',
      telegram: 'https://t.me/celopunksclub',
      description: 'Christmas Collection of the CeloPunks! Trade yours on CyberBox'
    },
    {
      id: 12,
      name: 'PunksNeon',
      route: 'cpunkneon',
      image: `${RESOURCE_CDN_ROOT}/collections/cpunkneon.webp`,
      banner: `${RESOURCE_CDN_ROOT}/collections/cpunkneon-banner.webp`,
      logo: `${RESOURCE_CDN_ROOT}/collections/cpunkneon-logo.webp`,
      website: 'https://celopunks.club/',
      twitter: 'https://twitter.com/CeloPunks',
      discord: 'https://discord.com/invite/Dzukufsrqe',
      telegram: 'https://t.me/celopunksclub',
      description: 'Neon Collection of the CeloPunks! Trade yours on CyberBox'
    },
    {
      id: 13,
      name: 'CeloPaints',
      route: 'cpaint',
      image: `${RESOURCE_CDN_ROOT}/collections/cpaint.webp`,
      banner: `${RESOURCE_CDN_ROOT}/collections/cpaint-banner.webp`,
      logo: `${RESOURCE_CDN_ROOT}/collections/cpaint-logo.webp`,
      website: 'https://celopaints.art',
      twitter: 'https://twitter.com/CeloPaintsNFT',
      discord: 'https://discord.com/invite/H7NnhjHwWy',
      description: 'CeloPaints is a generative abstract art collection living on the Celo blockchain. Collection contains 444 algorithmically generated colorful abstract paintings.'
    },
    {
      id: 14,
      name: 'DimsOfCelo',
      route: 'dimcelo',
      image: `${RESOURCE_CDN_ROOT}/collections/DimsOfCelo.webp`,
      banner: `${RESOURCE_CDN_ROOT}/collections/DimsOfCelo-banner.webp`,
      logo: `${RESOURCE_CDN_ROOT}/collections/DimsOfCelo-logo.webp`,
      website: 'https://dimsofcelo.art',
      twitter: 'https://twitter.com/dimsofcelonft',
      discord: 'https://discord.com/invite/rhJjVUtKEs',
      description: 'Dimensions of Celo a.k.a. DimsOfCelo NFTs are 10,000 tokens of appreciation on Celo Blockchain, trying to reach their way into generative art.'
    },
    {
      id: 15,
      name: 'CeloDAOPunks',
      route: 'cdp',
      image: `${RESOURCE_CDN_ROOT}/collections/cdp.webp`,
      banner: `${RESOURCE_CDN_ROOT}/collections/cdp-banner.webp`,
      logo: `${RESOURCE_CDN_ROOT}/collections/cdp-logo.webp`,
      description: 'NFT Collection of 7777 pieces generated on the Celo blockchain'
    },
    {
      id: 16,
      name: 'Womxn of Celo',
      route: 'wmxn',
      image: `${RESOURCE_CDN_ROOT}/collections/womxnofcelo.webp`,
      banner: `${RESOURCE_CDN_ROOT}/collections/womxnofcelo-banner.webp`,
      logo: `${RESOURCE_CDN_ROOT}/collections/womxnofcelo-logo.webp`,
      website: 'https://www.womxnofcelo.com/',
      twitter: 'https://twitter.com/WomxnOfCelo',
      discord: 'https://discord.com/invite/SuFUEn2Vzn',
      description: 'This Collection was created to empower women in the NFT space as well as women artists from all parts of the globe. The collection is located on the Celo blockchain and includes 5k unique gorgeous girls. Every girl has various rare attributes and features'
    },
    {
      id: 17,
      name: 'Celo Espresso',
      route: 'cespresso',
      image: `${RESOURCE_CDN_ROOT}/collections/celoespresso.webp`,
      banner: `${RESOURCE_CDN_ROOT}/collections/celoespresso-banner.webp`,
      logo: `${RESOURCE_CDN_ROOT}/collections/celoespresso-logo.webp`,
      website: 'https://celo-espresso.cafe/',
      twitter: 'https://twitter.com/CeloEspresso',
      discord: 'https://discord.gg/UKjyhb7xzQ',
      medium: 'https://medium.com/@CeloEspresso',
      description: 'GM fellow espresso baristas, the Espresso Hard Fork is live! Now all the beautiful cEspressi can be born and welcomed to the Celo Blockchain. Head over to the coffee machine to brew your own, unique cEspresso!'
    },
    {
      id: 18,
      name: 'NaviKatz',
      route: 'nkw',
      image: `${RESOURCE_CDN_ROOT}/collections/nkw.webp`,
      banner: `${RESOURCE_CDN_ROOT}/collections/nkw-banner.webp`,
      logo: `${RESOURCE_CDN_ROOT}/collections/nkw-logo.webp`,
      website: 'https://navikatz.com/',
      twitter: 'https://twitter.com/NaviKatz',
      discord: 'http://discord.link/navikatz',
      telegram: 'http://t.me/navikatz',
      description: 'NaviKatz is a terrific multichain Token, NFT-Marketplace, and GameFi project built on the Celo, Cronos and Fantom blockchain.'
    },
    {
      id: 19,
      name: 'CeloMonkey Business',
      route: 'cmbs',
      image: `${RESOURCE_CDN_ROOT}/collections/cmbs.webp`,
      banner: `${RESOURCE_CDN_ROOT}/collections/cmbs-banner.webp`,
      logo: `${RESOURCE_CDN_ROOT}/collections/cmbs-logo.webp`,
      website: 'https://celomonkeybusiness.xyz/',
      twitter: 'https://twitter.com/CeloMBS',
      discord: 'https://discord.com/invite/ktSQm5ukbq',
      description: 'Celo Monkey Business CeloOrg 888 inspired generative NFTs'
	},
	{
	  id: 21,
	  name: 'CeloErectus',
	  route: 'cer',
	  image: `${RESOURCE_CDN_ROOT}/collections/cer.webp`,
	  banner: `${RESOURCE_CDN_ROOT}/collections/cer-banner.webp`,
	  logo: `${RESOURCE_CDN_ROOT}/collections/cer-logo.webp`,
	  website: 'https://celoerectus.art/',
	  twitter: 'https://twitter.com/CeloErectus',
	  discord: 'https://discord.gg/eEPJCfeYf7',
	  telegram: 'https://t.me/celoerectus',
	  description: 'New creative NFT Collection on the Celo blockchain!'
	},
    // {
    //   id: 14,
    //   name: 'PixelAva',
    //   route: 'pxa',
    //   image: `${RESOURCE_CDN_ROOT}/collections/PixelAva.webp`,
    //   banner: `${RESOURCE_CDN_ROOT}/collections/PixelAva-banner.webp`,
    //   logo: `${RESOURCE_CDN_ROOT}/collections/PixelAva-logo.webp`,
    //   wallet: '0xeBD0A580fabb5a5DBE98030D074e532F025C1367',
    //   website: 'https://pixelava.space/',
    //   twitter: 'https://twitter.com/NPixelava',
    //   discord: 'https://discord.gg/sjjjFX2X',
    //   description: 'Pixaverse is a collection of GameFi worlds where PixelAva holders have extraordinary privileges.'
    // },
  ],
})

const KEY_TRANSACTION_TYPE = {
  LIST: 0,
  DELIST: 1,
  SELL: 2,
  BUY: 3,
  TRANSFER: 4,
  TRANSFERED: 5,
  CHANGEPRICE: 6,
}
const MAGIC_API_KEY = 'pk_live_B95E7FCF317028DC'
let magic = null

export const getters = {
  walletConnectProvider() {
	try {
	  return new WalletConnectProvider({
		rpc: {
			42220: "https://forno.celo.org",
		},
		qrcodeModalOptions: {
			mobileLinks: !window.ethereum ? ['metamask', 'valora'] : []
		}
	  })
	} catch(e) {
	  console.log(e)
	  return null
	}
  },
  provider(state, getters) {
    return state.walletConnected ? getters.walletConnectProvider : (window.ethereum || getters.walletConnectProvider)
  },
  paginationSort(state) {
	return state.pagination ? `${state.pagination} ${state.sort}` : state.sort
  },
  collectionFilterCondition(state) {
    let condition = ''
    if (state.nomNameFilter) {
      const collectionSetting = state.collectionSetting
      if (!collectionSetting || collectionSetting.fetchRequest === 'getGraphData') {
        condition = `name_contains: "${state.nomNameFilter}"`
      } else {
        condition = `contract_name_contains: "${state.nomNameFilter}"`
      }
    } else if (state.mintNumFilter) {
      condition = `mint_key_contains: "${state.mintNumFilter}"`
    } else {
      return ''
    }
    return condition
  },
  storedAddress(state) {
	let address = state.fullAddress
	try {
	  if (!address) {
		if (process.client) {
			address = localStorage ? (localStorage.getItem('address') || '') : ''
		} else {
			address = ''
		}
	  }
	} catch(e) {
	  console.log(e)
	  return null
	}
	return address.toLowerCase()
  },
  magicLib() {
	if (process.browser) {
		if (!magic) {
			magic = new Magic('pk_live_07BFC52E326230D5', {
				network: {
					rpcUrl: '"https://forno.celo.org"'
				}
			})
		}
	}
	return magic
  }
}
export const actions = {
  async getRarityNfts({state}) {
	try {
	  const apiPrams = {
		contract: $nuxt.$route.params.collectionid,
		page: state.countPage,
		direction: state.sort.includes('asc') ? 'asc' : 'desc'
	  }
	  const raritiyNfts = await API.getRarityNfts(apiPrams)
	  return raritiyNfts
	} catch {
	  return []
	}
  },
  async getRarirtyCollections({state}, rarityParams) {
    let newContractInfos = [
      ...rarityParams.contractInfos
    ]
    let rarityInfos = rarityParams.rarityNfts
    if (!rarityInfos) {
      rarityInfos = await API.getNftRankings(newContractInfos.map(item => !rarityParams.sold ? item.id : `${item.contract_id}_${item.contract}`))
    }
    newContractInfos.map(item => {
      const rarityItem = rarityInfos.find(info => (!rarityParams.sold && info.contract_info_id === item.id) || (rarityParams.sold && info.contract_info_id === `${item.contract_id}_${item.contract}`))
      if (rarityItem) {
        item.rating_index = rarityItem.rating_index
      }
    })
    if (state.raritySort) {
      if (state.raritySort.includes('rarity-rare')) {
        newContractInfos = newContractInfos.sort((a, b) => a.rating_index - b.rating_index)
      } else {
        newContractInfos = newContractInfos.sort((a, b) => b.rating_index - a.rating_index)
      }
    }
    return newContractInfos
  },
  async getMultiNftPriceData({}, contractInfos) {
	const queryRequests = []
	const queryFormat = `
		contractInfos: contractLists(first: 1 orderBy: price orderDirection: asc where: { contract: "nftContract" image: "nftImage" }) {
			price
			contract_id
			contract
			tag_element0
			tag_element1
			tag_element2
		}
	`
	const queryFormat2 = `
		contractInfos: contractSells(first: 1 orderBy: price_total orderDirection: asc where: { contract: "nftContract" image: "nftImage" }) {
			contract_id
			contract
			price_total
			tag_element0
			tag_element1
			tag_element2
		}
	`
	const queryFormat3 = `
		contractInfos(first: 1 orderBy: price orderDirection: asc where: { contract: "nftContract" image: "nftImage" }) {
			contract_id
			contract
			tag_element0
			tag_element1
			tag_element2
		}
	`
	contractInfos.forEach(item => {
	  let queryContent;
	  if (item.list_count > 0) {
	    queryContent = queryFormat.replace('nftContract', item.nftSymbol).replace('nftImage', item.image)
	  } else if (item.sell_count > 0) {
		queryContent = queryFormat2.replace('nftContract', item.nftSymbol).replace('nftImage', item.image)
	  } else {
		queryContent = queryFormat3.replace('nftContract', item.nftSymbol).replace('nftImage', item.image)
	  }
	  const query = gql`
		query Sample {
		  ${queryContent}
		}
	  `
	  queryRequests.push(this.$graphql.default.request(query))
	})

	const queryResults = await Promise.all(queryRequests)
	contractInfos.map((item, index) => {
	  const result = queryResults[index]
	  if (result && result.contractInfos.length > 0) {
		const contractInfo = result.contractInfos[0]
		if (contractInfo.price) {
		  item.list_price = contractInfo.price
		}
		if (contractInfo.price_total) {
			item.list_price = contractInfo.price_total
		  }
		if (!item.contract_id) {
		  item.contract_id = contractInfo.contract_id
		}
		if (item.nftSymbol === 'CBCN') {
		  item.contract = contractInfo.contract
		  item.tag_element0 = contractInfo.tag_element0
		  item.tag_element1 = contractInfo.tag_element1
		  item.tag_element2 = contractInfo.tag_element0
		}
	  }
	})
	return contractInfos
  },
  async replaceMultiNftCollections({state, dispatch}, collectionData) {
	let contractInfos = collectionData.contractInfos
	let multiNftInfos = contractInfos.filter(item => state.multiNftSymbols.includes(item.contract))
	if (multiNftInfos.length > 0) {
	  const nftImages = contractInfos.map(item => item.image)
	  contractInfos = contractInfos.filter((item, index) => item.image && nftImages.indexOf(item.image) === index)
	  contractInfos = contractInfos.map(item => {
		if (state.multiNftSymbols.includes(item.contract)) {
		  const newItem = collectionData.multiNFTs.find(nft => nft.nftSymbol === item.contract && nft.image === item.image) || {}
		  newItem.list_price = item.price
		  newItem.contract = item.contract
		  newItem.tag_element0 = item.tag_element0
		  newItem.tag_element1 = item.tag_element1
		  newItem.tag_element2 = item.tag_element2
		  return newItem
		}
		return item
	  })
	  contractInfos = await dispatch('getMultiNftPriceData', contractInfos)
	}
	return contractInfos
  },
  async getMultiNftGraphData({dispatch, commit}, filter) {
	try {
	  let condition = ''
	  if (filter === 'listed') {
		condition = 'list_count_gt: 0'
	  } else if (filter === 'sold') {
		condition = 'sell_count_gt: 0'
	  }
	  const query = gql`
		query Sample {
			multiNFTs(firt: 48 orderBy: image orderDirection: asc where: { nftSymbol: "${$nuxt.$route.params.collectionid}" ${condition} }) {
			id
			nftSymbol
			keySting
			image
			mint_count
			list_count
			sell_count
			sell_max_price
			sell_min_price
			sell_total_price
			list_min_price
			list_max_price
			}
		}`
	  const data = await this.$graphql.default.request(query)
	  let contractInfos = data.multiNFTs
	  if (filter === 'sold') {
		contractInfos.map(item => item.list_count = 0)
	  }
	  if ($nuxt.$route.params.collectionid === 'knoxnft') {
		const orderedSymbols = ['COMMON', 'RARE', 'SUPER-RARE', 'LEGENDARY']
		contractInfos = data.multiNFTs.sort((a, b) => {
		  const idA = a.id.replace('.png', '').split('/')[1]
		  const idB = b.id.replace('.png', '').split('/')[1]
		  return orderedSymbols.indexOf(idA) - orderedSymbols.indexOf(idB)
		})
	  }
	  contractInfos = await dispatch('getMultiNftPriceData', contractInfos)
	  commit('setNewNftList', contractInfos)
	  return contractInfos
	} catch {
	  return []
	}
  },
  async getGraphData({commit, state, getters, dispatch}, traitFilters) {
	try {
	  if (state.multiNftSymbols.includes($nuxt.$route.params.collectionid)) {
		return await dispatch('getMultiNftGraphData')
	  }
	  let sort = getters.paginationSort
	  let condition = ''
	  const collectionFilterCondition = getters.collectionFilterCondition
	  if ($nuxt.$route.params.collectionid) {
		condition = `where: { contract: "${$nuxt.$route.params.collectionid}" ${collectionFilterCondition}}`
	  }
	  let rarityNfts = null
	  let queryTables = ''
	  let traitFilterList = null
	  if (traitFilters) {
		traitFilterList = traitFilters.length > 0 ? traitFilters : traitFilters.traitFilters
	  }
	  const queryFormat = `
		contractInfos: contractInfos(sort first: 48 condition) {
		  id
		  contract
		  contract_id
		  mint_key
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
		  tag_element0
		  tag_element1
		  tag_element2
		  tag_element3
		  tag_element4
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
		multiNFTs: multiNFTs(firt: 48) {
		  id
		  nftSymbol
		  keySting
		  image
		  mint_count
		  list_count
		  sell_count
		  sell_max_price
		  sell_min_price
		  sell_total_price
		  list_min_price
		  list_max_price
		}
	  `
	  if (traitFilterList && traitFilterList.length > 0) {
		const isMyCollection = !$nuxt.$route.params.collectionid
		traitFilterList.forEach((item, index) => {
		  let traitSort = sort
		  if (!isMyCollection) {
			condition = `where: { contract: "${$nuxt.$route.params.collectionid}" tag_element${item.traitIndex}_in: [${item.values.map(filter => `"${filter.traitValue}"`)}] ${collectionFilterCondition} }`
		  } else {
			traitSort = sort.replace('trait_filter', `tag_element${item.traitIndex}_in: [${item.values.map(filter => `"${filter.traitValue}"`)}]`)
			condition = ''
		  }
		  queryTables += queryFormat.replace('contractInfos:', `contractInfos${index}:`).replace('sort', traitSort).replace('condition', condition)
		})
	  } else {
		if (state.raritySort && !state.sort.includes('owner') && $nuxt.$route.params.collectionid) {
		  rarityNfts = await dispatch('getRarityNfts')
		  condition = `where: { contract: "${$nuxt.$route.params.collectionid}" contract_id_in: [${rarityNfts.map(item => item.contract_id)}] ${collectionFilterCondition} }`
		  sort = ''
		}
		queryTables = queryFormat.replace('sort', sort).replace('condition', condition)
	  }
	  const query = gql`
		query Sample {
		  ${queryTables}
		}`;
	  const data = await this.$graphql.default.request(query)
	  let contractInfos = data.contractInfos || []
	  if (traitFilterList && traitFilterList.length > 0) {
		let contractIds = []
		traitFilterList.forEach((item, index) => {
		  const newContractInfos = data[`contractInfos${index}`].filter(dItem => !contractIds.includes(dItem.contract_id))
		  contractInfos = [
			...contractInfos,
			...newContractInfos
		  ]
		  contractIds = contractInfos.map(cItem => cItem.contract_id)
		})
		commit('setFilteredTraits', traitFilterList)
	  } else {
		commit('setFilteredTraits', null)
	  }
	  if ($nuxt.$route.params.collectionid !== 'nomdom') {
	    contractInfos = await dispatch('getRarirtyCollections', { contractInfos: contractInfos, rarityNfts })
	  }
	  if ($nuxt.$route.name === 'mycollection') {
		contractInfos = await dispatch('replaceMultiNftCollections', {
		  contractInfos,
		  multiNFTs: data.multiNFTs
		})
	  }
	  state.pagination ? commit('addNftToList', contractInfos) : commit('setNewNftList', contractInfos)
	  return contractInfos
	} catch {
	  return []
	}
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

  async getCollectionCountNft({state}, contract) {
    if (!state.fullAddress) return 0

	const address = state.sharedWallet ? state.sharedWallet : state.fullAddress
    let countCondition = `contract: "${contract}"`
	let nftSymbol = ''
	let contractQuery = ''
    if (contract === 'all') {
      countCondition = ''
    } else if (contract === 'sale') {
      countCondition = 'market_status: "LISTED"'
    } else {
      nftSymbol = contract ? contract.nftSymbol : ''
	  countCondition = `contract: "${nftSymbol}"`
	  contractQuery = `contracts(first: 1 where: { nftSymbol: "${nftSymbol}" }) {
		id
		mint_count
	  }`
    }
    const query = gql`
      query Sample {
        contractInfos(first: 1000 where: { owner: "${address.toLowerCase()}" ${countCondition} }) {
		  id
          contract
        }
        ${contractQuery}
      }`
    const data = await this.$graphql.default.request(query)
    if (nftSymbol) {
      return {
        owned_count: data.contractInfos.length,
        mint_count: data.contracts[0].mint_count
      }
    } else {
      return data.contractInfos.length
    }
  },

  async getOwnedCollectionInfo({state}, multiNft) {
    if (!state.fullAddress) return {}
    const query = gql`
      query Sample {
        all: contractInfos(first: 1000 where: { owner: "${state.fullAddress.toLowerCase()}" contract: "${multiNft.contract}" image: "${multiNft.image}" }) {
			    id
          contract
        },
        sale: contractInfos(first: 1000 where: { owner: "${state.fullAddress.toLowerCase()}" market_status: "LISTED" contract: "${multiNft.contract}" image: "${multiNft.image}" }) {
			    id
          contract
        }
      }`
    const data = await this.$graphql.default.request(query)
    const collectionInfo = {
      owned_count: data.all.length,
      owned_list_count: data.sale.length
    }
    return collectionInfo
  },

  async getMultiNftCollection({state}) {
    if (!state.fullAddress || !state.nft || !state.nft.contract) return []
    const query = gql`
      query Sample {
        sale: contractLists(first: 1000 orderBy: price where: { contract: "${state.nft.contract}" image: "${state.nft.image}" contract_id_not: ${state.nft.contract_id} }) {
		  id
          contract
          contract_id
          mint_key
          price
          owner
          contract_name
          image
		  updatedAt
		  tag_element0
		  tag_element1
		  tag_element2
		  tag_element3
		},
		addressInfos: contractInfos(first: 1000 orderBy: price where: { contract: "${state.nft.contract}" image: "${state.nft.image}" contract_id_not: ${state.nft.contract_id} }) {
		  id
		  contract_id
		  contract_address
		},
		contracts: contracts(first: 1 where: { nftSymbol: "${state.nft.contract}" }) {
		  producerFee
		},
        owned: contractInfos(first: 1000 where: { owner: "${state.fullAddress.toLowerCase()}" market_status_not: "LISTED" contract: "${state.nft.contract}" image: "${state.nft.image}" contract_id_not: ${state.nft.contract_id} }) {
		  id
          contract
          contract_id
          mint_key
          price
          seller
          owner
          contract_address
          market_status
          name
          image
          description
		  updatedAt
		  tag_element0
		  tag_element1
		  tag_element2
		  tag_element3
        }
      }`
	const data = await this.$graphql.default.request(query)
	const producerFee = data.contracts.length > 0 ? data.contracts[0].producerFee : 0
	const owned = data.owned.map(item => {
		item.refiOffset = 1 * (producerFee / 1000) * state.cMCO2Price
		return item
	})
	const saleNfts = data.sale.map(item => {
		item.market_status = 'LISTED'
		item.refiOffset = (item.price / 1000) * (producerFee / 1000) * state.cMCO2Price
		const contractAddress = data.addressInfos.find(addressItem => addressItem.contract_id === item.contract_id)
		if (contractAddress) {
		  item.contract_address = contractAddress.contract_address
		}
		return item
	})
	const ownedSale = saleNfts.filter(item => item.owner === state.fullAddress.toLowerCase())
	const othersSale = saleNfts.filter(item => item.owner !== state.fullAddress.toLowerCase())
    return [
	  ...owned,
	  ...ownedSale,
      ...othersSale
    ]
  },
  async getLatestListings({state, dispatch}) {
    const query = gql`
      query Sample {
        contractLists: contractLists(first: 48 orderBy: updatedAt, orderDirection: desc) {
          id
          contract
          contract_id
          mint_key
          contract_name
          price
          image
          owner
		  updatedAt
		  tag_element0
		  tag_element1
		  tag_element2
		  tag_element3
		  tag_element4
		}
		multiNFTs: multiNFTs(firt: 48) {
		  id
		  nftSymbol
		  keySting
		  image
		  mint_count
		  list_count
		  sell_count
		  sell_max_price
		  sell_min_price
		  sell_total_price
		  list_min_price
		  list_max_price
		}
      }`
	const data = await this.$graphql.default.request(query)
	let contractInfos = await dispatch('replaceMultiNftCollections', {
	  contractInfos: data.contractLists,
	  multiNFTs: data.multiNFTs
	})
	contractInfos = contractInfos.filter(item => !state.multiNftSymbols.includes(item.contract) || (state.multiNftSymbols.includes(item.contract) && item.list_count > 0))
	contractInfos = contractInfos.slice(0, 12)
	contractInfos = await dispatch('getRarirtyCollections', { contractInfos })
    return contractInfos
  },

  async getGraphDataListed({state, commit, getters, dispatch}, traitFilters) {
	try {
	  if (state.multiNftSymbols.includes($nuxt.$route.params.collectionid)) {
		return await dispatch('getMultiNftGraphData', 'listed')
	  }
	  const sort = getters.paginationSort
	  const collectionFilterCondition = getters.collectionFilterCondition
	  const fetchCount = state.raritySort ? 1000 : 48
	  let condition = `where: { contract: "${$nuxt.$route.params.collectionid}" ${collectionFilterCondition} }`
	  let queryTables = ''
	  const queryFormat = `
		contractLists(${sort} first: ${fetchCount} condition) {
		  id
		  contract
		  contract_id
		  mint_key
		  price
		  image
		  contract_name
		  owner
		  tag_element0
		  tag_element1
		  tag_element2
		  tag_element3
		  tag_element4
		}
	  `
	  if (traitFilters && traitFilters.length > 0) {
		traitFilters.forEach((item, index) => {
		  condition = `where: { contract: "${$nuxt.$route.params.collectionid}" tag_element${item.traitIndex}_in: [${item.values.map(filter => `"${filter.traitValue}"`)}] ${collectionFilterCondition} }`
		  queryTables += `contractLists${index}:` + queryFormat.replace('condition', condition).replace('sort', sort)
		})
	  } else {
		queryTables = queryFormat.replace('condition', condition)
	  }
	  const query = gql`
		query Sample {
		  ${queryTables}
		}`;
	  const data = await this.$graphql.default.request(query)
	  let contractLists = data.contractLists || []
	  if (traitFilters && traitFilters.length > 0) {
		let contractIds = []
		traitFilters.forEach((item, index) => {
		  const newContractLists = data[`contractLists${index}`].filter(dItem => !contractIds.includes(dItem.contract_id))
		  contractLists = [
			...contractLists,
			...newContractLists
		  ]
		  contractIds = contractLists.map(cItem => cItem.contract_id)
		})
		commit('setFilteredTraits', traitFilters)
	  } else {
		commit('setFilteredTraits', null)
	  }
	  if ($nuxt.$route.params.collectionid !== 'nomdom') {
		contractLists = await dispatch('getRarirtyCollections', { contractInfos: contractLists })
	  }
	  state.pagination ? commit('addNftToList', contractLists) : commit('setNewNftList', contractLists)
	} catch(e) {
	  console.log(e)
	}
  },

  async getGraphDataSells({state, commit, getters, dispatch}, traitFilters) {
	try {
	  if (state.multiNftSymbols.includes($nuxt.$route.params.collectionid)) {
		return await dispatch('getMultiNftGraphData', 'sold')
	  }
	  const sort = getters.paginationSort
	  const collectionFilterCondition = getters.collectionFilterCondition
	  const fetchCount = state.raritySort ? 1000 : 48
	  let condition = `where: { contract: "${$nuxt.$route.params.collectionid}" ${collectionFilterCondition}}`
	  let queryTables = ''
	  const queryFormat = `
		contractSells(${sort} first: ${fetchCount} condition) {
		  id
		  contract
		  contract_id
		  mint_key
		  price_total
		  price_value
		  price_fee
		  image
		  contract_name
		  seller
		  updatedAt
		  tag_element0
		  tag_element1
		  tag_element2
		  tag_element3
		  tag_element4
		}
	  `
	  if (traitFilters && traitFilters.length > 0) {
		traitFilters.forEach((item, index) => {
		  condition = `where: { contract: "${$nuxt.$route.params.collectionid}" tag_element${item.traitIndex}_in: [${item.values.map(filter => `"${filter.traitValue}"`)}] ${collectionFilterCondition} }`
		  queryTables += `contractSells${index}:` + queryFormat.replace('condition', condition)
		})
	  } else {
		queryTables = queryFormat.replace('condition', condition)
	  }
	  const query = gql`
		query Sample {
		  ${queryTables}
		}`;
	  const data = await this.$graphql.default.request(query)
	  let contractSells = data.contractSells || []
	  if (traitFilters && traitFilters.length > 0) {
		let contractIds = []
		traitFilters.forEach((item, index) => {
		  const newContractSells = data[`contractSells${index}`].filter(dItem => !contractIds.includes(dItem.contract_id))
		  contractSells = [
			...contractSells,
			...newContractSells
		  ]
		  contractIds = contractSells.map(cItem => cItem.contract_id)
		})
		commit('setFilteredTraits', traitFilters)
	  } else {
		commit('setFilteredTraits', null)
	  }
	  if ($nuxt.$route.params.collectionid !== 'nomdom') {
		contractSells = await dispatch('getRarirtyCollections', { contractInfos: contractSells, sold: true })
	  }
	  state.pagination ? commit('addNftToList', contractSells) : commit('setNewNftList', contractSells)
	} catch(e) {
	  console.log(e)
	}
  },

  async getCarbonData({state, getters}) {
	let address = getters.storedAddress
	const initialCarbonInfo = {
	  totalCount: 0,
	  totalTradingCelo: 0,
	  producerFee: 0
	}
	if (state.sharedWallet) {
	  address = state.sharedWallet
	}
	if (!address) {
	  return initialCarbonInfo
	}

	const query = gql`
      query Sample {
		co2Owners(first: 1 where: { owner: "${address}" }) {
		  mint_count
		  total_co2
		}
        co2Generators(first: 1 where: { owner: "${address}" }) {
		  mint_count
		  total_celo
		  total_co2
		}
	  }`
	const data = await this.$graphql.default.request(query)
	if (data.co2Owners.length > 0) {
	  try {
		const certificateInfo =  data.co2Owners[0]
		const ownerTrackerInfo =  data.co2Generators[0]
		return {
			totalCount: (certificateInfo.total_co2 || 0) / Math.pow(10, 5),
			totalTradingCelo: ownerTrackerInfo.total_co2 / Math.pow(10, 5),
		}	
	  } catch (e) {
		console.log(e)
		return initialCarbonInfo
	  }
	  
	} else {
	  return initialCarbonInfo
	}
  },

  async getCertificates({state, getters, commit}) {
	let address = getters.storedAddress
	if (state.sharedWallet) {
	  address = state.sharedWallet
	}
	if (!address) return

	const query = gql`
      query Sample {
        contractInfos(first: 48 orderBy: contract_id where: { contract: "CBCN" owner: "${address}" }) {
		  id
		  contract
		  contract_id
		  seller
		  owner
		  price
		  market_status
		  contract_address
		  image
		  description
		  updatedAt
		  tag_element0
		  tag_element1
		  tag_element2
		  tag_element3
		  tag_element4
		}
		saleCertificates: contractLists(first: 48 orderBy: tag_element3 where: { contract: "CBCN" owner_not: "${address}" }) {
		  id
		  contract
		  contract_id
		  contract_name
		  price
		  image
		  owner
		  updatedAt
		  tag_element0
		  tag_element1
		  tag_element2
		  tag_element3
		  tag_element4
		}
      }`
	const data = await this.$graphql.default.request(query)
	const certificates = data.contractInfos.map(item => {
	  item.token_type = parseInt(item.tag_element0)
	  item.year = parseInt(item.tag_element1)
	  item.month = parseInt(item.tag_element2)
	  if (item.market_status === 'LISTED') {
		item.price = item.price / 1000
	  } else {
		item.price = null
	  }
	  item.co2 = parseFloat(item.tag_element4) / 1000
	  return item
	})
	const saleCertificates = data.saleCertificates.map(item => {
	  item.token_type = parseInt(item.tag_element0)
	  item.year = parseInt(item.tag_element1)
	  item.month = parseInt(item.tag_element2)
	  item.price = item.price / 1000
	  return item
	})
	commit('setCertificateSaleList', saleCertificates)
    commit('setCertificateList', certificates)
  },

  async getReferralData({getters}, filter) {
	const address = getters.storedAddress
	if (!address) return null

	try {
	  const date = new Date()
	  const year = date.getFullYear()
	  const month = date.getMonth()
	  let day = date.getDate()
	  const dateFilters = []
	  if (filter === 0) {
		dateFilters.push(`"${date.toDateString()}"`)
	  } else {
		let newDay = day
		const filterDays = filter === 1 ? 7 : 30
		for (let i = 0; i < filterDays; i++) {
		  newDay = day - i
		  const newDate = new Date(year, month, newDay)
		  dateFilters.push(`"${newDate.toDateString()}"`)
		}
	  }
	  const query = gql`
	  query Sample {
		certReferUsers(first: 1 where: { referAddress: "${address}" }) {
			id
			referAddress
			refer_fee
			totalCount
		}
		certReferStatistics(first: 100 where: { referAddress_not: "0x454b9f80d3ea53000544eb7c9038d4ba8b84c324" date_key_in: [${dateFilters}] }) {
			id
			date_key
			referAddress
			refer_fee
			totalCount
		}
	  }`
	  const data = await this.$graphql.default.request(query)
	  const userInfo = data.certReferUsers.length > 0 ? data.certReferUsers[0] : null
	  let statistics = data.certReferStatistics
	  const referAddresses = statistics.map(item => item.referAddress)
	  let userList = statistics.filter((item, index) => referAddresses.indexOf(item.referAddress) === index)
	  userList.map(item => {
		const referList = statistics.filter(referItem => item.referAddress === referItem.referAddress && item.date_key !== referItem.date_key)
		if (referList.length > 0) {
		  let totalReferFees = item.refer_fee
		  let totalCount = item.totalCount
		  referList.forEach(rItem => {
			totalReferFees += rItem.refer_fee
			totalCount += rItem.totalCount
		  })
		  item.refer_fee = totalReferFees
		  item.totalCount = totalCount
		}
		return item
	  })
	  userList = userList.slice(0, 10)
	  if (userInfo) {
		userInfo.clicksInfo = await API.getClickCount(userInfo.referAddress.toLowerCase())
	  }
	  if (userList.length > 0) {
		const fetchRequests = []
		userList.forEach(referInfo => {
		  fetchRequests.push(API.getClickCount(referInfo.referAddress.toLowerCase()))
		})
		const fetchResults = await Promise.all(fetchRequests)
		userList.map((referInfo, index) => {
		  referInfo.clicksInfo = fetchResults[index]
		})
	  }
	  
	  return {
		userInfo,
		userList
	  }
	} catch (e) {
	  console.log(e)
	  return null
	}
  },

  // AUTHORIZATION

  async handleAccountChanged({commit, dispatch}, account) {
	try {
	  const oldAddress = localStorage.getItem('address')
	  commit('setAddress', account)
	  if (account !== oldAddress) {
		location.reload()
	  }
	} catch (e) {
	  console.log(e)
	}
  },

  async updateUser({commit, dispatch}) {
    const ethereum = window.ethereum
	if (!ethereum) return

	const provider = new ethers.providers.Web3Provider(ethereum)
    if (process.client && localStorage.getItem('address') && !localStorage.getItem('walletconnect') && ethereum) {
      try {
		const signer = await provider.getSigner()
		const address = await signer.getAddress()
		const chain = await provider.getNetwork()

        ethereum.on("chainChanged", async (chainId) => {
          commit('setChainId', BigNumber.from(chainId).toNumber())
        })
        ethereum.on("accountsChanged", async (accounts) => {
          dispatch('handleAccountChanged', accounts[0])
		})
		
		commit('setAddress', address)
		commit('setChainId', chain.chainId)
		dispatch('getBalance')
      } catch (error) {
        console.log(error)
      }
	}
  },
  async connectMetaTrust({commit, dispatch}) {
	try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const address = await provider.getSigner().getAddress();
        const chainId = await provider.getNetwork()
        commit('setChainId', chainId.chainId)
		commit('setAddress', address)
		dispatch('getBalance')
		this._vm.sendEvent({
		  category: 'Connect',
		  eventName: 'connect_status',
		  properties: {
			connect_status: 'Success'
		  }
		})
      } else if (window.web3) {
        window.web3 = new ethers.providers.Web3Provider(
          window.web3.currentProvider
        );
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const address = await provider.getSigner().getAddress();
        const chainId = await provider.getNetwork()
        commit('setChainId', chainId.chainId)
		commit('setAddress', address)
		dispatch('getBalance')
      } else {
        alert("please use web3 enabled browser.");
      }
    } catch (error) {
	  if (this._vm && this._vm.sendEvent) {
		this._vm.sendEvent({
		  category: 'Connect',
		  eventName: 'connect_status',
		  properties: {
			connect_status: 'Error'
		  }
		})
	  }
      console.log(error)
    }
  },
  addEventHandlerForWalletProvider({state, commit, dispatch}, provider) {
    provider.on("accountsChanged", async (accounts) => {
	  if (!state.address) {
		this._vm.sendEvent({
		  category: 'Connect',
		  eventName: 'connect_status',
		  properties: {
		    connect_status: 'Success'
		  }
		})
	  }
      await dispatch('handleAccountChanged', accounts[0])
      commit('setWalletConnected', true)
    });

    provider.on("chainChanged", async (chainId) => {
      commit('setChainId', BigNumber.from(chainId).toNumber())
    })
  },
  async createWalletConnect({state, getters, commit, dispatch}, isValora) {
	const provider = getters.walletConnectProvider
	if (!provider) return
    const wc = provider.wc
    dispatch('addEventHandlerForWalletProvider', provider)
    removeLocal(mobileLinkChoiceKey)

    // create session
    wc._key = await wc._generateKey()
    const request = wc._formatRequest({
      method: "wc_sessionRequest",
      params: [
        {
          peerId: wc.clientId,
          peerMeta: {
            description: "",
            icons: [`${location.origin}/favicon.ico`],
            name: "Cyberbox - ReFi NFT Marketplace",
            url: location.origin
          },
          chainId: state.chainId,
        }
      ],
    })
    wc.handshakeId = request.id
    wc.handshakeTopic = uuid()
    wc._sendSessionRequest(request, "Session update rejected", { topic: wc.handshakeTopic })
    if (isValora) {
      setLocal(mobileLinkChoiceKey, { href: `celo://wallet/wc?uri=${wc.uri}` }) 
    } else {
      setLocal(mobileLinkChoiceKey, { href: `https://metamask.app.link/wc?uri=${encodeURIComponent(wc.uri)}` }) 
    }
    commit('setWalletUri', wc.uri)
    // create session end

    provider.start()
    provider.subscribeWalletConnector()
  },
  async connectWithEmail({getters, commit, dispatch}, email) {
	try {
	  const magicLib = getters.magicLib
	  const isLoggedIn = await magicLib.user.isLoggedIn()
	  if (!isLoggedIn) {
		await magicLib.auth.loginWithMagicLink({ email })
		commit('setMagicConnected', true)  
	  }
	  const { publicAddress } = await magicLib.user.getMetadata()
	  commit('setAddress', publicAddress)
	  commit('setChainId', 42220)
	  dispatch('getBalance')
	} catch (e) {
	  console.log(e)
	}
  },
  disconnectWallet({ getters }, provider) {
    let walletProvider = provider
    if (!walletProvider) {
      walletProvider = getters.walletConnectProvider
	}
	if (!walletProvider) return
    walletProvider.wc._handshakeTopic = ""
    walletProvider.isConnecting = false
  },
  async walletConnect({getters, dispatch}, isConnect) {
	const provider = getters.walletConnectProvider
	if (!provider) return
    try {
      dispatch('addEventHandlerForWalletProvider', provider)

      if (localStorage.getItem('walletconnect') || isConnect) {
        provider.isConnecting = false
        provider.wc._handshakeTopic = ""
        await provider.enable();
      }
	  window.web3 = new Web3(provider);
	  if (isConnect) {
		this._vm.sendEvent({
		  category: 'Connect',
		  eventName: 'connect_status',
		  properties: {
		    connect_status: 'Success'
		  }
		})
	  }
    } catch(e) {
      console.log(e)
	  dispatch('disconnectWallet', provider)
	  this._vm.sendEvent({
		category: 'Connect',
		eventName: 'connect_status',
		properties: {
		  connect_status: 'Error'
		}
	  })
    }
  },
  async switchNetwork() {
    if (!window.ethereum) {
      alert('Please switch network manaully')
      return
    }
    try {
	  const provider = new ethers.providers.Web3Provider(ethereum)
	  const chain = await provider.getNetwork()
	  await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{"chainId": '0xa4ec'}] })
	  this._vm.sendEvent({
		category: 'Connect',
		eventName: 'switch_network',
		properties: {
		  switch_network: chain.name
		}
	  })
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
  async logout({state, commit}) {
    try {
      commit('setAddress', '')
      commit('setWalletConnected', false)
      localStorage.removeItem('walletconnect')
	  localStorage.removeItem('address')
	  if (state.magicConnected) {
		await magicLib.user.logout()
		commit('setMagicConnected', false)
	  }
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  },


  // GET INFORMATION USER

  async getBalance({state, getters, commit}) {
	const address = getters.storedAddress
	if (!address || state.chainId !== 42220) return 0
	try {
	  const web3 = new Web3(getters.provider)
	  const kit = ContractKit.newKitFromWeb3(web3)
	  const res = await kit.getTotalBalance(address)
	  const balance = (res.CELO.c.length < 2 && res.CELO.e < 18) ? 0 : res.CELO.c[0] / 10000
	  commit('setBalance', balance)
	  return balance
	} catch(e) {
	  console.log(e)
	  return 0
	}
  },
  async getPriceToken() {
	return await redstone.getPrice('CELO')
  },
  async getCMCO2TokenPrice({commit}) {
	try {
	  const query = gql`
      query Sample {
		pairs(first: 1 where: { token0: "0x32a9fe697a32135bfd313a6ac28792dae4d9979d" token1: "0x471ece3750da237f93b8e339c536989b8978a438" }) {
		  token0Price
		}
	  }`
	  let data = await this.$graphql.ubeswap.request(query)
	  const tokenCeloPrice = parseFloat(data.pairs[0].token0Price)
	  commit('setCMCO2TokenPrice', tokenCeloPrice)
	  return tokenCeloPrice
	} catch {
	  return 0
	}
  },

  // GET NFT

  async getNft({commit, state, getters}, token) {
    let nftQuery = ''
	const isMultiNft = state.multiNftSymbols.includes(token.collectionId)
	const tokenId = token.collectionId === 'CBCN' ? `${token.id}.jpg` : token.id
    const infoAttributes = `
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
	  tag_element0
	  tag_element1
	  tag_element2
	  tag_element3
	  tag_element4
    `
    if (!isMultiNft) {
      nftQuery = `
        contractInfo: contractInfo(id: "${token.id}_${token.collectionId}") {
          ${infoAttributes}
        }
      `
    } else {
      const address = getters.storedAddress
      nftQuery = `
        contractInfos: contractInfos(first: 1 where: { contract: "${token.collectionId}" image_contains: "${tokenId}" } orderBy: price orderDirection: asc ) {
          ${infoAttributes}
        }
        ownedListedInfos: contractInfos(first: 1 where: { owner: "${address.toLowerCase()}" contract: "${token.collectionId}" image_contains: "${tokenId}" market_status: "LISTED" } orderBy: price orderDirection: asc ) {
          ${infoAttributes}
        }
        ownedContractInfos: contractInfos(first: 1 where: { owner: "${address.toLowerCase()}" contract	: "${token.collectionId}" image_contains: "${tokenId}" } orderBy: price orderDirection: asc ) {
          ${infoAttributes}
        }
        listedContractInfos: contractInfos(first: 1 where: { contract: "${token.collectionId}" image_contains: "${tokenId}" market_status: "LISTED" } orderBy: price orderDirection: asc ) {
          ${infoAttributes}
        }
        multiNFTs: multiNFTs(first: 1 where: { nftSymbol: "${token.collectionId}" image_contains: "${tokenId}" } ) {
          id
          nftSymbol
          keySting
          image
          mint_count
          list_count
          sell_count
          sell_max_price
          sell_min_price
          sell_total_price
          list_min_price
          list_max_price
        }
      `
    }
    const query = gql`
      query Sample {
        ${nftQuery}
        contracts: contracts(first: 1 where: { nftSymbol: "${token.collectionId}" }) {
          producerFee
        }
      }`;
    const data = await this.$graphql.default.request(query)
    let multiNftInfo = null
    let multiNftCollection = null
    if (isMultiNft) {
	  if (data.contractInfos.length > 0) {
		multiNftInfo = data.contractInfos[0]
	  }
      if (data.ownedListedInfos.length > 0) {
        multiNftInfo = data.ownedListedInfos.find(item => {
		  const nftId = item.image.substring(item.image.lastIndexOf('/') + 1).split('.')[0]
		  return nftId === token.id
		})
      }
      else if (data.ownedContractInfos.length > 0) {
        multiNftInfo = data.ownedContractInfos.find(item => {
		  const nftId = item.image.substring(item.image.lastIndexOf('/') + 1).split('.')[0]
		  return nftId === token.id
		})
      }
      else if (data.listedContractInfos.length > 0) {
		multiNftInfo = data.listedContractInfos.find(item => {
		  const nftId = item.image.substring(item.image.lastIndexOf('/') + 1).split('.')[0]
		  return nftId === token.id
		})
      }
      if (data.multiNFTs.length > 0) {
        multiNftCollection = data.multiNFTs.find(item => {
		  const nftId = item.image.substring(item.image.lastIndexOf('/') + 1).split('.')[0]
		  return nftId === token.id
		})
      }
	}

    const nftInfo = {
      ...(isMultiNft ? multiNftInfo : data.contractInfo),
      multiNft: multiNftCollection,
      producerFee: data.contracts.length > 0 ? data.contracts[0].producerFee : 0
	}
	let price = nftInfo.price
	if (price > 0 || nftInfo.market_status === 'LISTED') {
	  price = price / 1000
	} else {
	  price = 1
	}
	nftInfo.refiOffset = price * (nftInfo.producerFee / 1000) * state.cMCO2Price
    commit('setNewNft', nftInfo)
    return nftInfo
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

  async approveToken({commit, state, getters}, submitApprove = true) {
    try {
	  const provider = new ethers.providers.Web3Provider(getters.provider)
	  const signer = provider.getSigner()
	  let resultAddress = state.marketNom
	  if (state.nft.contract === 'CBCN') {
		resultAddress = state.marketCertificate
	  } else if (state.nft.contract !== 'nomdom') {
	    const getSupportMarketPlace = new ethers.Contract(state.marketMain, MarketMainABI, signer)
	    resultAddress = await getSupportMarketPlace.getSupportMarketPlaceToken(state.nft.contract_address)
	  }
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
	    default: AbiNft = daosABI
	  	  break;
	  }
	  let contractAddress = state.nft.contract_address
	  if (state.nft.contract === 'nomdom') {
		contractAddress = state.nomContractAddress
	  } else if (state.nft.contract === 'CBCN') {
		contractAddress = state.certContractAddress
	  }
      const contract = new ethers.Contract(contractAddress, AbiNft, signer)
	  const approvedForAll = await contract.isApprovedForAll(getters.storedAddress, resultAddress)
      if (!submitApprove) {
		return approvedForAll
      } else {
        if (!approvedForAll) {
          await contract.setApprovalForAll(resultAddress, true, { gasPrice: ethers.utils.parseUnits('0.5', 'gwei') })
          contract.on("ApprovalForAll", () => {
			commit('changeApproveToken', 'approve')
			this._vm.sendEvent({
			  category: 'Listing',
			  eventName: 'listing_approve_status',
			  properties: {
				listing_approve_status: 'Success'
			  }
			})
          });
        } else {
		  commit('changeApproveToken', 'approve')
        }
      }
    } catch (error) {
	  commit('changeApproveToken', 'error')
	  this._vm.sendEvent({
		category: 'Listing',
		eventName: 'listing_approve_status',
		properties: {
		  listing_approve_status: 'Error'
		}
	  })
	  this._vm.sendEvent({
		category: 'Listing',
		eventName: 'listing_approve_error_type',
		properties: {
		  listing_approve_error_type: error
		}
	  })
	  console.log(error)
    }
  },
  async listingNFT({commit, state, getters}, price) {
    const provider = new ethers.providers.Web3Provider(getters.provider)
    const signer = provider.getSigner()
    let contract = null;
    try {
	  if (state.nft.contract === 'CBCN') {
		contract = new ethers.Contract(state.marketCertificate, MarketCertificateABI, signer)
		await contract.ListToken(state.nft.contract_id, web3.utils.toWei(String(price)), {
		  gasPrice: ethers.utils.parseUnits('0.5', 'gwei')
		})
      } else if (state.nft.contract !== 'nomdom') {
		contract = new ethers.Contract(state.marketMain, MarketMainABI, signer)
        await contract.listToken(state.nft.contract_address, state.nft.contract_id, web3.utils.toWei(String(price)), {
          gasPrice: ethers.utils.parseUnits('0.5', 'gwei')
        })
      } else {
		contract = new ethers.Contract(state.marketNom, nomABI, signer)	
        await contract.listToken(state.nft.name, web3.utils.toWei(String(price)), {
          gasPrice: ethers.utils.parseUnits('0.5', 'gwei')
        })
	  }
	  const collection = (state.collectionList || []).find(item => item.route === state.nft.contract) || {}
      provider.once(contract, async () => {
		commit('changelistToken', true)
		this._vm.sendEvent({
		  category: 'Listing',
		  eventName: 'lisitng_success',
		  properties: {
		    lisitng_success: collection.name
		  }
		})
		this._vm.sendEvent({
		  category: 'Listing',
		  eventName: 'listing_list_status',
		  properties: {
			listing_list_status: 'Success'
		  }
		})
      });
    } catch (error) {
      commit('changelistToken', false)
	  console.log(error)
	  this._vm.sendEvent({
		category: 'Listing',
		eventName: 'listing_list_status',
		properties: {
		  listing_list_status: 'Error'
		}
	  })
	  this._vm.sendEvent({
		category: 'Listing',
		eventName: 'listing_list_error_type',
		properties: {
		  listing_list_error_type: error
		}
	  })
    }
  },
  async changeNFTPrice({commit, state, getters}, price) {
    const provider = new ethers.providers.Web3Provider(getters.provider)
    const signer = provider.getSigner()
    let contract = null

    try {
	  if (state.nft.contract === 'CBCN' || state.nft.contract !== 'nomdom') {
		const contractAddress = state.nft.contract === 'CBCN' ? state.certContractAddress : state.nft.contract_address
		if (state.nft.contract !== 'CBCN') {
		  contract = new ethers.Contract(state.marketMain, MarketMainABI, signer)
		} else {
		  contract = new ethers.Contract(state.marketCertificate, MarketCertificateABI, signer)
		}
		await contract.changePrice(contractAddress, state.nft.contract_id, web3.utils.toWei(String(price)), {
		  gasPrice: ethers.utils.parseUnits('0.5', 'gwei')
		})
      } else {
		contract = new ethers.Contract(state.marketNom, nomABI, signer)
        await contract.changePrice(state.nft.name, web3.utils.toWei(String(price)), {
          gasPrice: ethers.utils.parseUnits('0.5', 'gwei')
        })
      }
      provider.once(contract, async () => {
        commit('changelistToken', true)
      });
    } catch (error) {
      commit('changelistToken', false)
      console.log(error)
    }
  },

  // BUY NFT

  async checkBuyTokenApproved({state, getters, commit}, price) {
	if (!price || !state.fullAddress) return
	try {
	  const ethereumProvider = getters.provider
	  const web3 = new Web3(ethereumProvider)
	  const accounts = await web3.eth.getAccounts()
	  const account = accounts[0]
	  const kit = ContractKit.newKitFromWeb3(web3)
	  const goldToken = await kit._web3Contracts.getGoldToken();
	  const tokenPrice = web3.utils.toBN(web3.utils.toWei(String(price)))
	  const allowanceAmount = web3.utils.toBN(await goldToken.methods.allowance(account, account).call())
	  commit('changeBuyTokenApproved', allowanceAmount.gte(tokenPrice))
	} catch(e) {
	  console.log(e)
	}
  },

  async approveBuyToken({state, commit, getters}, token) {
	try {
		const ethereumProvider = getters.provider
		const provider = new ethers.providers.Web3Provider(ethereumProvider)
		const web3 = new Web3(ethereumProvider)
		const accounts = await web3.eth.getAccounts()
		const account = accounts[0]
		const kit = ContractKit.newKitFromWeb3(web3)
		const goldToken = await kit._web3Contracts.getGoldToken();
		const minimumAmount = 100000
		const allowanceAmount = token.price > minimumAmount ? token.price : minimumAmount
		const parsePrice = ethers.utils.parseEther(String(allowanceAmount))
		const result = await goldToken.methods.approve(account, parsePrice).send({
		  from: account,
		})
		provider.once(result, async () => {
		  commit('changeSuccessApproveBuyToken', true)
		  this._vm.sendEvent({
			category: 'Buy',
			eventName: 'buy_approve_status',
			properties: {
			  buy_approve_status: 'Success'
			}
		  })
		})
	} catch(error) {
	  console.log(error)
	  this._vm.sendEvent({
		category: 'Buy',
		eventName: 'buy_approve_status',
		properties: {
		  buy_approve_status: 'Error'
		}
	  })
	  this._vm.sendEvent({
		category: 'Buy',
		eventName: 'buy_approve_error_type',
		properties: {
		  buy_approve_error_type: error
		}
	  })
	}
  },
  async reportRevenue({state, dispatch}, collection) {
	const price = await dispatch('getPriceToken')
	const start = new Date()
	const startTime = Math.round(start.setHours(0, 0, 0, 0) / 1000)
	const end = new Date()
    const endTime = Math.round(end.setHours(23, 59, 59, 999) / 1000)
	const query = gql`
      query Sample {
		contractSells(first: 1000 where: { contract: "${collection.route}" updatedAt_gte: ${startTime} updatedAt_lte: ${endTime} }) {
		  id
		  contract
		  contract_id
		  mint_key
		  price_total
		}
		contracts(first: 1 where: { nftSymbol: "CBCN" }) {
		  mint_count
		}
      }`
	let data = await this.$graphql.default.request(query)
	let totalSold = 0
	const contractSells = data.contractSells
	contractSells.forEach(item => totalSold += item.price_total / 1000)
	const itemExist = contractSells.find(item => item.contract_id === state.nft.contract_id)
	if (!itemExist) {
	  totalSold += state.nft.price
	}
	if (collection.route === 'CBCN' && data.contracts.length > 0) {
	  totalSold +=  data.contracts[0].mint_count * 15
	}

	const totalPrice = totalSold * price.value
	this._vm.sendRevenueEvent(`${collection.name} - ${state.nft.contract_id}`, price.value * state.nft.price, totalPrice, collection.name)
  },
  async buyNFT({commit, state, getters, dispatch}, token) {
	try {
		const ethereumProvider = getters.provider
		const provider = new ethers.providers.Web3Provider(ethereumProvider)
		const web3 = new Web3(ethereumProvider)
		const accounts = await web3.eth.getAccounts()
		const account = accounts[0]
		const kit = ContractKit.newKitFromWeb3(web3)
		let contract = null
		const parsePrice = ethers.utils.parseEther(String(token.price))
		console.log(token.price)
		let result = {}
		if (state.nft.contract === 'CBCN') {
			contract = new kit.web3.eth.Contract(MarketCertificateABI, state.marketCertificate)
			result = await contract.methods.buyToken(token.id, web3.utils.toWei(String(token.price))).send({
				from: account,
				value: parsePrice,
				gasPrice: ethers.utils.parseUnits('0.5', 'gwei'),
			})
		} else if (state.nft.contract !== 'nomdom') {
		  contract = new kit.web3.eth.Contract(MarketMainABI, state.marketMain)
		  result = await contract.methods.buyToken(state.nft.contract_address, token.id, web3.utils.toWei(String(token.price))).send({
			from: account,
			value: parsePrice,
			gasPrice: ethers.utils.parseUnits('0.5', 'gwei'),
		  })
		} else {
		  contract = new kit.web3.eth.Contract(nomABI, state.marketNom)
		  result = await contract.methods.buyToken(state.nft.name, web3.utils.toWei(String(token.price))).send({
			from: account,
			value: parsePrice,
			gasPrice: ethers.utils.parseUnits('0.5', 'gwei'),
		  })
		}
		const collectionList = state.collectionList || []
		const currCollection = collectionList.find(item => item.route === state.nft.contract) || {}
		provider.once(result, async () => {
		  commit('changeSuccessBuyToken', true)
		  this._vm.sendEvent({
			category: 'Buy',
			eventName: 'buy_status',
			properties: {
			  buy_status: 'Success'
			}
		  })
		  this._vm.sendEvent({
			category: 'Buy',
			eventName: 'buy_success',
			properties: {
			  buy_success: currCollection.name
			}
		  })
		  dispatch('reportRevenue', currCollection)
		});
	} catch(error) {
	  console.log(error)
	  this._vm.sendEvent({
		category: 'Buy',
		eventName: 'buy_status',
		properties: {
		  buy_status: 'Error'
		}
	  })
	  this._vm.sendEvent({
		category: 'Buy',
		eventName: 'buy_error_type',
		properties: {
		  buy_error_type: error
		}
	  })
	}
  },

  // Transfer NFT

  async transferNFT({commit, state, getters}, params) {
    const provider = new ethers.providers.Web3Provider(getters.provider)
    const signer = provider.getSigner()
    let contract = null
    
    try {
	  if (params.nft.contract === 'CBCN') {
		contract = new ethers.Contract(state.marketCertificate, MarketCertificateABI, signer)
		await contract.transfer(params.toAddress, params.nft.contract_id, {
		  gasPrice: ethers.utils.parseUnits('0.5', 'gwei')
		})
      } else if (params.nft.contract !== 'nomdom') {
		contract = new ethers.Contract(state.marketMain, MarketMainABI, signer)
        await contract.transfer(params.nft.contract_address, params.toAddress, params.nft.contract_id, {
          gasPrice: ethers.utils.parseUnits('0.5', 'gwei')
        })
      } else {
		contract = new ethers.Contract(state.marketNom, nomABI, signer)
        await contract.transferNom(params.toAddress, params.nft.name, {
          gasPrice: ethers.utils.parseUnits('0.5', 'gwei')
        })
      }
      provider.once(contract, async () => {
        commit('changeSuccessTransferToken', true)
      });
    } catch (error) {
      commit('changeSuccessTransferToken', false)
      console.log(error)
    }
  },

  // GET COLLECTION INFO

  async getCollectionInfo({commit, state}, isArray) {
	try {
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
			sell_refi_price
			list_count
			dna_count
			nftName
			nftSymbol
			ownerCount
			createrFee
			producerFee
			marketFee
			total_co2
		  }
		}`;
	  let data = await this.$graphql.default.request(query)
	  return isArray ? data.contracts : data.contracts[0]
	} catch {
	  return []
	}
  },

  async getContractInfoTimePercent({commit, state}, contract) {
    const currTime = new Date().getTime()
    const timeBeforeOneDay = Math.floor((currTime - (24 * 3600 * 1000)) / 1000)
    const timeBeforeTwoDays = Math.floor((currTime - (48 * 3600 * 1000)) / 1000)
    const time24hNftsQuery = gql`
      query Sample {
        contractSells(where: { contract: "${contract}" updatedAt_gte: ${timeBeforeOneDay} }) {
          price_total
        }
      }`;
    const time48hNftsQuery = gql`
      query Sample {
        contractSells(where: { contract: "${contract}" updatedAt_gte: ${timeBeforeTwoDays} updatedAt_lt: ${timeBeforeOneDay} }) {
		  price_total
        }
      }`;
    const data1 = await this.$graphql.default.request(time24hNftsQuery)
    const data2 = await this.$graphql.default.request(time48hNftsQuery)
    let ts1 = 0
    let ts2 = 0
    data1.contractSells.forEach(item => ts1 += item.price_total / 1000)
    data2.contractSells.forEach(item => ts2 += item.price_total / 1000)
	const tsOffset = ts1 - ts2;
    return ts2 === 0 ? 0 : Math.ceil(tsOffset / ts2 * 100)
  },
  async getContractInfoWeekPercent({commit, state}, contract) {
    const currTime = new Date().getTime()
    const timeBefore7Days = Math.floor((currTime - (7 * 24 * 3600 * 1000)) / 1000)
    const timeBefore14Days = Math.floor((currTime - (14 * 24 * 3600 * 1000)) / 1000)
    const time7dNftsQuery = gql`
      query Sample {
        contractSells(where: { contract: "${contract}" updatedAt_gte: ${timeBefore7Days} }) {
		  price_total
        }
      }`;
    const time14dNftsQuery = gql`
      query Sample {
        contractSells(where: { contract: "${contract}" updatedAt_gte: ${timeBefore14Days} updatedAt_lt: ${timeBefore7Days} }) {
		  price_total
        }
      }`;
    const data1 = await this.$graphql.default.request(time7dNftsQuery)
    const data2 = await this.$graphql.default.request(time14dNftsQuery)
    let ts1 = 0
    let ts2 = 0
    data1.contractSells.forEach(item => ts1 += item.price_total / 1000)
    data2.contractSells.forEach(item => ts2 += item.price_total / 1000)
	const tsOffset = ts1 - ts2;
    return ts2 === 0 ? 0 : Math.ceil(tsOffset / ts2 * 100)
  },

  // REMOVE NFT FROM LIST

  async removeNft({commit, state, getters}, nft) {
    const payloadNft = nft || state.nft
    try {
	  const provider = new ethers.providers.Web3Provider(getters.provider)
	  const signer = provider.getSigner()
	  let contract = null
	  if (payloadNft.contract === 'CBCN') {
		contract = new ethers.Contract(state.marketCertificate, MarketCertificateABI, signer)
		await contract.delistToken(payloadNft.contract_id, { gasPrice: ethers.utils.parseUnits('0.5', 'gwei') })
      } else if (payloadNft.contract !== 'nomdom') {
		contract = new ethers.Contract(state.marketMain, MarketMainABI, signer)
        await contract.delistToken(payloadNft.contract_address , payloadNft.contract_id, { gasPrice: ethers.utils.parseUnits('0.5', 'gwei') })
      } else {
		contract = new ethers.Contract(state.marketNom, nomABI, signer)
        await contract.delistToken(payloadNft.name , { gasPrice: ethers.utils.parseUnits('0.5', 'gwei') })
      }
      provider.once(contract, async () => {
        commit('changeSuccessRemoveToken', true)
        return true
      })
    } catch (error) {
      console.log(error)
      commit('changeSuccessRemoveToken', 'error')
    }
  },

  async loadNomNameAddress({commit}) {
    try {
	  const address = localStorage.getItem('address')
      const provider = new providers.JsonRpcProvider("https://forno.celo.org")
      const ens = new ENS({ provider, ensAddress: "0x3DE51c3960400A0F752d3492652Ae4A0b2A36FB3" })
      const result = await ens.getName(address)
      let ensName = result.name
      const ensAddress = await ens.name(`${ensName}.nom`).getAddress()
      if(ensName == null || address.toLowerCase() !== ensAddress?.toLowerCase()) {
        ensName = null
      }
      if (ensName) {
        commit('setAddressByNom', ensName)
      }
    } catch(e) {
      console.log(e)
    }
  },

  async loadTraitFilters({commit}, nftSymbol) {
	try {
	  const symbol = $nuxt.$route.params.collectionid || nftSymbol
	  const query = gql`
		query Sample {
		  traitTypes(first: 1000 where: { nftSymbol: "${symbol}" }) {
			nftSymbol
			traitType
			traitIndex
		  }
		  traitValues(first: 1000 where: { nftSymbol: "${symbol}" }) {
			nftSymbol
			traitType
			traitValue
			useCount
		  }
		}`;
	  const data = await this.$graphql.default.request(query)
	  const traitFilters = data.traitTypes
	  traitFilters.map(item => item.values = data.traitValues.filter(filter => filter.traitType === item.traitType))
	  commit('setTraitFilters', traitFilters)
	  return traitFilters
	} catch {
	  return []
	}
  },

  loadBoxCollectionList({commit}) {
	if (process.client) {
	  const boxList = localStorage.getItem('boxlist')
	  if (boxList) {
		commit('setBoxCollectionList', JSON.parse(boxList))
	  }
	}
  },

  async loadNotificationList({commit, getters}) {
	try {
	  const today = new Date()
	  const notificationCount = 20
	  const timeBefore2Months = Math.floor(new Date(today.getFullYear(), today.getMonth() - 2, 1).getTime() / 1000)
	  const address = getters.storedAddress
	  const query = gql`
		query Sample {
		  notifications(first: ${notificationCount} orderBy: updatedAt orderDirection: desc where: { fromAddress: "${address}" notify_type_not_in: [1, 6] updatedAt_gte: ${timeBefore2Months} }) {
			id
			title
			image
			tokenId
			identify
			notify_type
			transaction
			fromAddress
			toAddress
			nftSymbol
			amount
			updatedAt
			linked_contract {
			 tag_element0
			 tag_element1
			 tag_element2
			 tag_element3
			}
		  }
		  notificationInfos(first: 1) {
			id
			total_count
		  }
		}`
		const data = await this.$graphql.default.request(query)
		const maxId = parseInt(localStorage.getItem('notification_max_id') || '0')
		const notificationList = []
		data.notifications.forEach(item => {
		if (![KEY_TRANSACTION_TYPE.DELIST, KEY_TRANSACTION_TYPE.CHANGEPRICE].includes(item.notify_type)) {
		  const itemDate = new Date(item.updatedAt * 1000)
		  const updatedTime = new Date(itemDate.getFullYear(), itemDate.getMonth(), 1).getTime()
		  const notificationItem = item
		  notificationItem.name = `${item.title}${item.nftSymbol === 'nomdom' ? '.nom' : ''}`
		  notificationItem.amount = item.amount / 1000
		  notificationItem.owner = notificationItem.fromAddress
		  notificationItem.from = item.fromAddress.substr(0, 6)
		  notificationItem.to = item.toAddress.substr(0, 6)
		  notificationItem.owned = item.fromAddress.toLowerCase() === address
		  notificationItem.totalCount = data.notificationInfos[0].total_count
		  notificationItem.read = parseInt(item.id) <= maxId
		  if (item.nftSymbol === 'CBCN') {
			notificationItem.year = parseInt(item.linked_contract.tag_element1)
			notificationItem.month = parseInt(item.linked_contract.tag_element2)
		  }

		  switch(item.notify_type) {
			case KEY_TRANSACTION_TYPE.LIST:
			  notificationItem.type = 'LISTED'
			  break
			case KEY_TRANSACTION_TYPE.SELL:
			  notificationItem.type = 'SOLD'
			  break
			case KEY_TRANSACTION_TYPE.BUY:
			  notificationItem.type = 'BOUGHT'
			  notificationItem.owned = false
			  break
			case KEY_TRANSACTION_TYPE.TRANSFER:
			  notificationItem.type = 'TRANSFER'
			  break
			case KEY_TRANSACTION_TYPE.TRANSFERED:
			  notificationItem.type = 'TRANSFERED'
			  break
			default:
			  notificationItem.type = 'UNKNOWN'
			  break
		  }

		  const infoIndex = notificationList.findIndex(info => info.date === updatedTime)
		  if (infoIndex < 0) {
			notificationList.push({
			  date: updatedTime,
			  items: [notificationItem]
			})
		  } else {
			notificationList[infoIndex].items.push(notificationItem)
		  }	  
		}
	  })
	  commit('setNotificationList', notificationList)
	} catch(e) {
	  console.log(e)
	}
  },

  // Certificate Methods

  async mintCertificate({state, getters, commit, dispatch}, price) {
	try {
	  const ethereumProvider = getters.provider
	  const provider = new ethers.providers.Web3Provider(ethereumProvider)
	  const web3 = new Web3(ethereumProvider)
	  const accounts = await web3.eth.getAccounts()
	  const account = accounts[0]
	  const kit = ContractKit.newKitFromWeb3(web3)
	  const contract = new kit.web3.eth.Contract(MarketCertificateABI, state.marketCertificate)
	  const parsePrice = ethers.utils.parseEther(String(price))
	  const result = await contract.methods.mintMonthNFT().send({
	    from: account,
	    value: parsePrice,
	    gasPrice: ethers.utils.parseUnits('0.5', 'gwei')
	  })

	  const certCollection = (state.collectionList || []).find(item => item.route === 'CBCN')
	  provider.once(result, async () => {
		const currMonth = new Date().toLocaleString('en-us', { month: 'long' })
		commit('changeSuccessBuyToken', true)
		this._vm.sendEvent({
		  category: 'Certificates',
		  eventName: 'mint_success',
		  properties: {
		    mint_success: currMonth
		  }
		})
		dispatch('reportRevenue', certCollection)
	  })
	} catch (e) {
	  console.log(e)
	  commit('changeSuccessBuyToken', 'error')
	}
  },

  async mintReferralCertificate({state, getters, commit, dispatch}, referralInfo) {
	try {
	  const address = getters.storedAddress
	  if (!address) return
	  const ethereumProvider = getters.provider
	  const provider = new ethers.providers.Web3Provider(ethereumProvider)
	  const web3 = new Web3(ethereumProvider)
	  const accounts = await web3.eth.getAccounts()
	  const account = accounts[0]
	  const kit = ContractKit.newKitFromWeb3(web3)
	  const contract = new kit.web3.eth.Contract(MarketCertificateABI, state.marketCertificate)
	  const parsePrice = ethers.utils.parseEther(String(referralInfo.price))
	  const result = await contract.methods.mintMonthNFTFromRefer(referralInfo.referrer).send({
	    from: account,
	    value: parsePrice,
	    gasPrice: ethers.utils.parseUnits('0.5', 'gwei')
	  })

	  const certCollection = (state.collectionList || []).find(item => item.route === 'CBCN')
	  provider.once(result, async () => {
		const currMonth = new Date().toLocaleString('en-us', { month: 'long' })
		commit('changeSuccessBuyToken', true)
		this._vm.sendEvent({
		  category: 'Certificates',
		  eventName: 'mint_success',
		  properties: {
		    mint_success: currMonth
		  }
		})
		dispatch('reportRevenue', certCollection)
	  })
	} catch (e) {
	  console.log(e)
	  commit('changeSuccessBuyToken', 'error')
	}
  },

  async getCurrentMonthNFTID({state, getters}) {
	try {
	  if (!state.fullAddress) return 0
	  const web3 = new Web3(getters.provider)
	  const kit = ContractKit.newKitFromWeb3(web3)
	  const contract = new kit.web3.eth.Contract(MarketCertificateABI, state.marketCertificate)
	  const result = await contract.methods.getCurrentMonthNFTID(state.fullAddress).call()
	  return result
	  return 0
	} catch(e) {
	  console.log(e)
	  return 0
	}
  },

  async getMonthNFTID({state, getters}, date) {
	try {
	  if (!state.fullAddress) return 0
	  const web3 = new Web3(getters.provider)
	  const kit = ContractKit.newKitFromWeb3(web3)
	  const contract = new kit.web3.eth.Contract(MarketCertificateABI, state.marketCertificate)
	  return await contract.methods.getMonthNFTID(state.fullAddress, date.year, date.month).call()
	} catch(e) {
	  console.log(e)
	  return 0
	}
  },

  async exchangeBonusNFT({state, getters, commit}, year) {
	try {
	  const provider = new ethers.providers.Web3Provider(getters.provider)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(state.marketCertificate, MarketCertificateABI, signer)
	  await contract.exchangeMonthNFTToBonus(year).send({
	    gasPrice: ethers.utils.parseUnits('0.5', 'gwei'),
	  })
	  provider.once(contract, async () => {
	    commit('changeSuccessBuyToken', true)
	  })
	} catch(error) {
	  console.log(error)
	  commit('changeSuccessBuyToken', 'error')
    }
  }
}

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  setAddress(state,address) {
	if (!address) return
	if (process.browser) {
	  localStorage.setItem('address', address)
	}
	state.fullAddress = address.toLowerCase()
	// const startID = address.split("").slice(0, 6);
	const startID = ['0', 'x']
    const endID = address.split("").slice(-4);
    const dotArr = [".", ".", "."];
    state.address = startID
      .concat(dotArr)
      .concat(endID)
	  .join("");
  },
  setBalance(state, balance) {
	state.balance = balance;
  },
  setAddressByNom(state, nomAddress) {
    state.address = `${nomAddress}.nom`
  },
  setSharedWallet(state, wallet) {
	state.sharedWallet = wallet
  },
  setWalletConnected(state, connected) {
    state.walletConnected = connected
  },
  setMagicConnected(state, connected) {
    state.magicConnected = connected
  },
  setCMCO2TokenPrice(state, celoPrice) {
    state.cMCO2Price = celoPrice;
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
    let newNftList = [
      ...state.nftList
    ]
    for (let nft of list) {
      newNftList.push({
        ...nft,
        price: nft.price ? nft.price / 1000 : nft.price_total / 1000
      })
    }
    if (state.raritySort) {
      if (state.raritySort.includes('rarity-rare')) {
        newNftList = newNftList.sort((a, b) => a.rating_index - b.rating_index)
      } else {
        newNftList = newNftList.sort((a, b) => b.rating_index - a.rating_index)
      }
    }
    if (state.filteredTraits) {
      newNftList = newNftList.sort((a, b) => a.contract_id - b.contract_id)
    }
    state.nftList = newNftList
  },
  setBoxCollection(state, collection) {
	state.boxCollection = collection
  },
  setBoxCollectionList(state, list) {
	state.boxCollectionList = list
  },
  addBoxCollectionToList(state, collection) {
	state.boxCollection = null
	state.boxCollectionList = [
	  ...state.boxCollectionList,
	  collection
	]
	localStorage.setItem('boxlist', JSON.stringify(state.boxCollectionList))
  },
  setNotificationList(state, list) {
    state.notificationList = list
  },
  setCertificateSaleList(state, list) {
    state.certificateSaleList = list
  },
  setCertificateList(state, list) {
    state.certificateList = list
  },
  setNewNft(state, nft) {
	if (nft) {
	  state.nft = {
		...nft,
		price: nft.price / 1000
	  }
	} else {
	  state.nft = {}
	}
  },
  setMyNftList(state, list) {
    state.myNftList = list
  },
  setTraitFilters(state, filters) {
    state.traitFilters = filters || []
  },
  setFilteredTraits(state, traits) {
    state.filteredTraits = traits
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
  changeMintNumFilter(state, mintNum) {
    state.mintNumFilter = mintNum
    state.nomNameFilter = null
  },
  changeNomNameFilter(state, nomName) {
    state.nomNameFilter = nomName
    state.mintNumFilter = null
  },
  changeBuyTokenApproved(state, approved) {
    state.buyTokenApproved = approved
  },
  changeSuccessApproveBuyToken(state, status) {
    state.successApproveBuyToken = status
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
	changeSellTokenClosed(state, status) {
    state.sellTokenClosed = status
	},
  setChainId(state, chain) {
    state.chainId = chain
    state.wrongNetwork = chain !== 42220
  },
  setWalletUri(state, uri) {
    state.walletUri = uri
  },
  setMessage(state, msg) {
    state.message = msg
  },
  changeSortData(state, type) {
	try {
	  let myNftSort = ''
	  let address = state.fullAddress || localStorage.getItem('address') || ''
	  if (!address && process.browser) {
		address = localStorage.getItem('address')
	  }
	  if (state.sharedWallet) {
		address = state.sharedWallet
	  }
	  if (type.includes('myNft') && address) {
		if (type === 'myNft') {
		  myNftSort = `where: { owner: "${address.toLowerCase()}"}`
		} else if (type.toLowerCase().includes('sold')) {
		  myNftSort = `where: { seller: "${address.toLowerCase()}" contract: "${$nuxt.$route.params.collectionid}"}`
		} else {
		  if ($nuxt.$route.params.collectionid) {
			myNftSort = `where: { owner: "${address.toLowerCase()}" contract: "${$nuxt.$route.params.collectionid}"}`
		  }
		}
	  }
	  switch (type) {
		case 'myNft':
		case 'myNftAll':
		case 'myNftSold':
		case 'myNft-rarity-rare':
		case 'myNft-rarity-common': state.sort = myNftSort + ` orderBy: contract_id`;
		  break;
		case 'all': state.sort =  `orderBy: contract_id`;
		  break;
		case 'myNft-price-lowest': state.sort = myNftSort + ` orderBy: price, orderDirection: asc`;
		case 'myNft-price-lowest-sold': state.sort = myNftSort + ` orderBy: price_total, orderDirection: asc`;
		  break;
		case 'myNft-price-highest': state.sort = myNftSort + ` orderBy: price, orderDirection: desc`;
		case 'myNft-price-highest-sold': state.sort = myNftSort + ` orderBy: price_total, orderDirection: desc`;
		  break;
		// case 'myNft-rarity-rare': state.sort =  myNftSort + ` orderBy: rarity_rank, orderDirection: asc`;
		//   break;
		// case 'myNft-rarity-common': state.sort =  myNftSort + ` orderBy: rarity_rank, orderDirection: desc`;
		//   break;
		case 'myNft-rarity-rare-sold':
		case 'myNft-rarity-common-sold':
		case 'myNft-sold-latest-sold': state.sort =  myNftSort + ` orderBy: updatedAt orderDirection: desc`;
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
		// case 'rarity-rare': state.sort =  `orderBy: rarity_rank, orderDirection: asc`;
		//   break;
		// case 'rarity-common': state.sort =  `orderBy: rarity_rank, orderDirection: desc`;
		//   break;
		case 'mint-lowest':
		case 'mint-lowest-sold': state.sort = `orderBy: contract_id`;
		  break;
		case 'mint-highest':
		case 'mint-highest-sold': state.sort = `orderBy: contract_id orderDirection: desc`;
		  break;
		case 'rarity-rare':
		case 'rarity-rare-sold': state.sort = `orderBy: updatedAt orderDirection: asc`;
		  break;
		case 'rarity-common':
		case 'rarity-common-sold':
		case 'sold-latest-sold': state.sort = `orderBy: updatedAt orderDirection: desc`;
		  break;
		case 'pagination': state.pagination = `skip: ${48 * (state.countPage - 1)}`;
		  break;
	  }
	  if (type !== 'pagination') {
		state.countPage = 1
		state.pagination = null
	    if (type.includes('rarity')) {
		  state.raritySort = type
		} else {
		  state.raritySort = null
		}
	  }
	} catch(e) {
	  console.log(e)
	}
  },

  changeMyCollectionSort(state, option) {
    let address = state.fullAddress
    if (!address) {
	  if (process.browser) {
		address = localStorage.getItem('address') || ''
	  } else {
		address = ''
	  }
	}
	if (state.sharedWallet) {
	  address = state.sharedWallet
	}

	const mintNumFilter = option && option.mintNum ? `mint_key_contains: "${option.mintNum}"` : ''
	const traitFilter = (option && option.traits && option.traits.length > 0) ? 'trait_filter' : ''
	let newSort = `where: { owner: "${address.toLowerCase()}" ${mintNumFilter} ${traitFilter}}`
	if (option) {
	  if (option.filter) {
		if (option.filter === 'sale') {
		  newSort = `where: { owner: "${address.toLowerCase()}" market_status: "LISTED" ${mintNumFilter} ${traitFilter}}`  
		} else if (option.filter !=='all') {
		  newSort = `where: { owner: "${address.toLowerCase()}" contract: "${option.filter}" ${mintNumFilter} ${traitFilter}}`
		}
	  }

	  switch (option.type) {
		case 'mint-highest': newSort += ' orderBy: contract_id orderDirection: desc'
		  break
		case 'price-lowest': newSort += ' orderBy: price'
		  break
		case 'price-highest': newSort += ' orderBy: price orderDirection: desc'
		  break
		default: newSort += ' orderBy: contract_id'
		  break
	  }
	} else {
	  state.mintNumFilter = null
	  newSort += ' orderBy: contract_id'
	}

	state.sort = newSort
    state.countPage = 1
    state.pagination = null
  },
  updateCollectionSetting(state, setting) {
    state.collectionSetting = setting
  }
}
