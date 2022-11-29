<template>
    <div class="createnft">
        <div class="createnft-substeps">
            <p class="createnft-substeps-step active">
				<span>1</span>
			</p>
            <p class="createnft-substeps-step">2</p>
        </div>
		<AddNft @onNextStep="gotoNextStep" :rarity="!simple"/>
    </div>
</template>

<script>

import AddNft from "@/components/createnft/AddNft"

export default {
  data() {
	return {
	  simple: false
	}
  },
  components: {
	AddNft
  },
  computed: {
	boxNft() {
	  return this.$store.state.boxNftInfo
	},
	collectionList() {
	  return this.$store.state.boxCollectionList
	}
  },
  created() {
	if (!this.boxNft || !this.boxNft.collection || !this.boxNft.collection.collectionAddress) {
	  if (this.collectionList.length === 0) {
		const collectionAddress = this.$route.query.collectionAddress
		this.$store.dispatch('getBoxCollectionList', collectionAddress)
	  } else {
		this.loadCollection()
	  }
	}
    if (this.$route.query.simple) {
      this.simple = true
	}
  },
  watch: {
	collectionList() {
	  if (this.$store.state.collectionList.length > 0) {
		this.loadCollection()
	  }
	}
  },
  methods: {
	loadCollection() {
	  // TODO
	//   let boxCollection = {
	//   	collectionAddress: '0x9787de967a07d4bd2d88d190961694218e7da661',
	//   	collectionName: 'Street Art4',
	//   	collectionDesc: 'Wipies is the biggest collection of digital toilet paper on the blockchain. Each one of the 10,000 Wipies is as special as the next.',
	//   	collectionLogo: 'https://ipfs.moralis.io:2053/ipfs/QmQCvfKfFaMFm38K32WsEaRRJ2SARwM1S1FWxW2JCpw1fy/BoxImages/collection_logo.png',
	//   	collectionCover: 'https://ipfs.moralis.io:2053/ipfs/QmQCvfKfFaMFm38K32WsEaRRJ2SARwM1S1FWxW2JCpw1fy/BoxImages/collection_cover.png',
	//   	collectionBanner: 'https://ipfs.moralis.io:2053/ipfs/QmQCvfKfFaMFm38K32WsEaRRJ2SARwM1S1FWxW2JCpw1fy/BoxImages/collection_banner.png',
	//   	linkedNFTAddress: '0x5f108e1a78edf7fe09b71926c37d80c04cac71de',
	//   	linkedBoxAddress: ''
	//   }
	//-------
	  if (this.boxNft && this.boxNft.collection && this.boxNft.collection.collectionAddress) return
	  let boxCollection = null
	  const collectionList = this.collectionList
	  if (this.$route.query.collectionAddress) {
		const collectionAddress = this.$route.query.collectionAddress
		boxCollection = collectionList.find(collection => collection.collectionAddress === collectionAddress)
	  } else if (collectionList.length > 0) {
		boxCollection = collectionList[collectionList.length - 1]
	  }
	  if (boxCollection) {
		this.$store.commit('changeBoxNftInfo', {
		  collection: boxCollection
		})
		}
	},
	gotoNextStep() {
	  this.$router.push('/createnft/2')
	}
  }
}
</script>

<style lang="scss" scoped>
.createnft {
  padding: 3.2rem 0;
  &-substeps {
	display: flex;
	width: fit-content;
	margin: 0 auto;
	&-step {
	  width: 2.4rem;
	  height: 2.4rem;
	  border: 2px solid $border2;
	  border-radius: 50%;
	  text-align: center;
	  line-height: 2.4rem;
	  font-size: 1.2rem;
	  color: $border2;
	  position: relative;
	  &:first-child {
		margin-right: 15rem;
		&::after {
		  content: "";
		  position: absolute;
		  top: 50%;
		  left: calc(100% + 2px);
		  width: 15rem;
		  height: 2px;
		  background: $border2;
		  z-index: -1;
		}
		&.checked {
			background: $pink;
			border: 2px solid transparent;
		  &::after {
			background: $pink;
		  }
		}
	  }
	  &-icon {
		width: 1.2rem;
	  }
	  &.active {
		border-color: $pink;
		span {
		  color: $pink;
		}
	  }
	}
  }

  @media (max-width: 460px) {
	padding: 1.6rem 0;
  }
}
</style>
