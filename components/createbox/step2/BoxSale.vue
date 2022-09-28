<template>
  <div class="createbox__nft">
	<div class="createbox__nft-steps">
		<p class="createbox__nft-steps-step active">1</p>
		<p class="createbox__nft-steps-step">2</p>
	</div>
    <div class="createbox__nft-header">
		<h2 class="createbox__nft-header-title">Add NFT for Box collection</h2>
		<p class="createbox__nft-header-description">Decide how many carbon tokens you want to burn and add nft to each rarity. Rarity is calculated based on the number of burned tokens.</p>
    </div>
    <div class="createbox__nft-setting">
		<div class="createbox__nft-setting-token">
			<div class="createbox__nft-setting-step">
				<p class="createbox__nft-setting-step-num">1</p>
				<p class="createbox__nft-setting-step-name">Enter the number of carbon tokens you are going to burn by creating a box</p>
			</div>
			<div class="createbox__nft-setting-token-detail">
				<p class="createbox__nft-setting-token-detail-info">Enter the number of carbon tokens to burn</p>
				<div class="createbox__nft-setting-token-detail-inputblock">
					<div class="createbox__nft-setting-token-detail-inputbox">
						<input class="createbox__nft-setting-token-detail-input" placeholder="0">
					</div>
					<a class="createbox__nft-setting-token-detail-buy">Buy cMCO2</a>
				</div>
			</div>
			<div class="createbox__nft-setting-token-units">
				<p class="createbox__nft-setting-token-units-unit">1000</p>
				<p class="createbox__nft-setting-token-units-unit">10000</p>
				<p class="createbox__nft-setting-token-units-unit">30000</p>
				<p class="createbox__nft-setting-token-units-unit">100000</p>
			</div>
			<p class="createbox__nft-setting-token-balance">Balance: <b>1034 cMCO2</b></p>
		</div>
		<div class="createbox__nft-setting-nfts">
			<div class="createbox__nft-setting-stepbox">
				<div class="createbox__nft-setting-step">
					<p class="createbox__nft-setting-step-num">2</p>
					<p class="createbox__nft-setting-step-name">Load your nft into each window according to rarity</p>
				</div>
				<img class="createbox__nft-setting-step-info" src="/question.svg">
			</div>
			<div class="createbox__nft-setting-nfts-file">
				<p class="createbox__nft-setting-nfts-file-label">Upload file for NFTs</p>
				<p class="createbox__nft-setting-nfts-file-kinds">JPEG, PNG, GIF, MP4. Max 50 MB</p>
			</div>
			<div class="createbox__nft-setting-nfts-add">
				<div class="createbox__nft-setting-nfts-add-block">
					<input class="createbox__nft-setting-nfts-add-block-input" placeholder="Enter name">
					<div class="createbox__nft-setting-nfts-add-block-category">
						<div class="createbox__nft-setting-nfts-add-block-category-plus">
							<button class="createbox__nft-setting-nfts-add-block-category-plus-button">
								<img class="createbox__nft-setting-nfts-add-block-category-plus-button-icon" src="/plus-grey.svg">
							</button>
							<p class="createbox__nft-setting-nfts-add-block-category-plus-quantity">Quantity: 0</p>
						</div>
						<div class="createbox__nft-setting-nfts-add-block-category-type">
							<img class="createbox__nft-setting-nfts-add-block-category-type-icon legendary" src="/diamond.svg">
							<p class="createbox__nft-setting-nfts-add-block-category-type-name">Legendary</p>
						</div>
					</div>
				</div>
				<div class="createbox__nft-setting-nfts-add-buttonbox">
					<button class="createbox__nft-setting-nfts-add-button">
						<p class="createbox__nft-setting-nfts-add-button-name">Add NFT</p>
						<img class="createbox__nft-setting-nfts-add-block-button-icon" src="/plus-grey-small.svg">
					</button>
					<div class="createbox__nft-setting-nfts-add-detail" v-if="!rarity">
						<p class="createbox__nft-setting-nfts-add-detail-count">Total NFT’s: 1</p>
						<p class="createbox__nft-setting-nfts-add-detail-quantity">Total quantity: 1</p>
					</div>
				</div>
			</div>
			<div class="createbox__nft-setting-nfts-add" v-if="rarity">
				<div class="createbox__nft-setting-nfts-add-block">
					<input class="createbox__nft-setting-nfts-add-block-input" placeholder="Enter name">
					<div class="createbox__nft-setting-nfts-add-block-category">
						<div class="createbox__nft-setting-nfts-add-block-category-plus">
							<button class="createbox__nft-setting-nfts-add-block-category-plus-button">
								<img class="createbox__nft-setting-nfts-add-block-category-plus-button-icon" src="/plus-grey.svg">
							</button>
							<p class="createbox__nft-setting-nfts-add-block-category-plus-quantity">Quantity: 0</p>
						</div>
						<div class="createbox__nft-setting-nfts-add-block-category-type">
							<img class="createbox__nft-setting-nfts-add-block-category-type-icon epic" src="/fire-filled-grey.svg">
							<p class="createbox__nft-setting-nfts-add-block-category-type-name">Epic</p>
						</div>
					</div>
				</div>
				<button class="createbox__nft-setting-nfts-add-button">
					<p class="createbox__nft-setting-nfts-add-button-name">Add NFT</p>
					<img class="createbox__nft-setting-nfts-add-block-button-icon" src="/plus-grey-small.svg">
				</button>
			</div>
			<div class="createbox__nft-setting-nfts-add" v-if="rarity">
				<div class="createbox__nft-setting-nfts-add-block">
					<input class="createbox__nft-setting-nfts-add-block-input" placeholder="Enter name">
					<div class="createbox__nft-setting-nfts-add-block-category">
						<div class="createbox__nft-setting-nfts-add-block-category-plus">
							<button class="createbox__nft-setting-nfts-add-block-category-plus-button">
								<img class="createbox__nft-setting-nfts-add-block-category-plus-button-icon" src="/plus-grey.svg">
							</button>
							<p class="createbox__nft-setting-nfts-add-block-category-plus-quantity">Quantity: 0</p>
						</div>
						<div class="createbox__nft-setting-nfts-add-block-category-type">
							<img class="createbox__nft-setting-nfts-add-block-category-type-icon" src="/snow.svg">
							<p class="createbox__nft-setting-nfts-add-block-category-type-name">Rare</p>
						</div>
					</div>
				</div>
				<button class="createbox__nft-setting-nfts-add-button">
					<p class="createbox__nft-setting-nfts-add-button-name">Add NFT</p>
					<img class="createbox__nft-setting-nfts-add-block-button-icon" src="/plus-grey-small.svg">
				</button>
			</div>
			<div class="createbox__nft-setting-nfts-add" v-if="rarity">
				<div class="createbox__nft-setting-nfts-add-block">
					<input class="createbox__nft-setting-nfts-add-block-input" placeholder="Enter name">
					<div class="createbox__nft-setting-nfts-add-block-category">
						<div class="createbox__nft-setting-nfts-add-block-category-plus">
							<button class="createbox__nft-setting-nfts-add-block-category-plus-button">
								<img class="createbox__nft-setting-nfts-add-block-category-plus-button-icon" src="/plus-grey.svg">
							</button>
							<p class="createbox__nft-setting-nfts-add-block-category-plus-quantity">Quantity: 0</p>
						</div>
						<div class="createbox__nft-setting-nfts-add-block-category-type">
							<p class="createbox__nft-setting-nfts-add-block-category-type-name">Common</p>
						</div>
					</div>
				</div>
				<button class="createbox__nft-setting-nfts-add-button">
					<p class="createbox__nft-setting-nfts-add-button-name">Add NFT</p>
					<img class="createbox__nft-setting-nfts-add-block-button-icon" src="/plus-grey-small.svg">
				</button>
			</div>
			<div class="createbox__nft-setting-nfts-total">
				<p class="createbox__nft-setting-nfts-total-count">Total NFT's: 4</p>
				<p class="createbox__nft-setting-nfts-total-quantity">Total quantity: 0</p>
			</div>
		</div>
	</div>
	<button class="createbox__nft-next">
		Next step
		<img class="createbox__nft-next-icon" src="/arrow-right.svg">
	</button>
  </div>
</template>
<script>
export default {
  props: ['rarity'],
  data() {
    return {

    }
  },
  methods: {
    
  }
}
</script>
<style lang="scss">
.createbox__nft {
  padding: 3.2rem 6rem;
  &-steps {
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
	  }
	  &.active {
		border-color: $pink;
		color: $pink;
	  }
	}
  }
  &-header {
	max-width: 42.4rem;
	margin: 4.8rem auto 0;
	&-title {
	  font-family: Cabin-Medium;
	  font-weight: 500;
	  font-size: 3.2rem;
	  line-height: 1;
	  text-align: center;
	}
	&-description {
	  margin-top: 1rem;
	  text-align: center;
	  line-height: 2rem;
	  font-size: 1.6rem;
	}
  }
  &-setting {
	display: flex;
	justify-content: space-between;
	margin-top: 7.9rem;
	&-step {
	  display: flex;
	  align-items: center;
	  &-num {
		min-width: 2.8rem;
		width: 2.8rem;
		height: 2.8rem;
		margin-right: 1.6rem;
		background: $grayDark;
		border-radius: 50%;
		text-align: center;
		line-height: 2.8rem;
		font-size: 1.4rem;
		color: $white;
	  }
	  &-name {
		font-family: OpenSans-SemiBold;
		font-weight: 600;
		font-size: 1.6rem;
	  }
	}
	&-stepbox {
	  display: flex;
	  align-items: center;
	  justify-content: space-between;
	  .createbox__nft-setting-step {
		&-num {
		  background: transparent;
		  border: 1px solid $border;
		  color: $border;
		}
		&-name {
		  color: $border;
		}
	  }
	}
	&-token {
	  max-width: 49.3rem; 
	  margin-right: 13.6rem;
	  &-detail {
		margin-top: 1rem;
		padding-top: 2.3rem;
		border-top: 1px solid $border2;
		&-info {
		  font-size: 1.4rem;
		}
		&-inputblock {
		  display: flex;
		  align-items: center;
		  margin-top: 2.2rem;
		}
		&-inputbox {
		  flex: 1;
		  position: relative;
		  margin-right: 2rem;
		  &::after {
			content: "cMCO2";
			display: block;
			position: absolute;
			top: 1.2rem;
			right: 1.6rem;
			pointer-events: none;
			font-family: OpenSans-SemiBold;
			font-weight: 600;
			font-size: 1.4rem;
			color: $grayLight;
		  }
		}
		&-input {
		  width: calc(100% - 3.2rem);
		  height: 1.8rem;
		  padding: 1.2rem 1.6rem;
		  border: 1px solid $border2;
		  border-radius: 2.5rem;
    	  font-size: 1.6rem;
		}
		&-buy {
		  font-family: OpenSans-SemiBold;
		  font-weight: 600;
		  font-size: 1.4rem;
		  color: $green;
		  cursor: pointer;
		}
	  }
	  &-units {
		display: flex;
		margin-top: 1.6rem;
		&-unit {
		  margin-right: 2.4rem;
		  font-family: OpenSans-SemiBold;
		  line-height: 2rem;
		  font-weight: 600;
		  font-size: 1.4rem;
		  color: $border2;
		  cursor: pointer;
		}
	  }
	  &-balance {
		margin-top: 2.6rem;
		line-height: 2rem;
		font-size: 1.4rem;
	  }
	}
	&-nfts {
	  flex: 1;
	  &-file {
		display: flex;
		justify-content: space-between;
		margin-top: 2.5rem;
		padding-top: 2.2rem;
		border-top: 1px solid $border2;
		&-label, &-kinds {
		  line-height: 2rem;
		  font-family: OpenSans-SemiBold;
		  font-weight: 600;
		  font-size: 1.4rem;
		  color: $border2;
		}
	  }
	  &-add {
		margin-top: 2.3rem;
		&-block {
		  padding: 1.8rem 1.6rem;
		  box-shadow: 0px 1px 10px 2px rgba(0, 0, 0, 0.06);
		  border-radius: 0.8rem;
		  &-input {
			width: 100%;
			height: 1.8rem;
			padding: 0;
			border: 0;
			padding-bottom: 1.2rem;
			border-bottom: 1px solid $modalColor;
			font-size: 1.6rem;
		  }
		  &-category {
			display: flex;
			justify-content: space-between;
			margin-top: 0.8rem;
			&-plus {
			  display: flex;
			  align-items: center;
			  &-button {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 3.1rem;
				height: 3.1rem;
				margin-right: 1.6rem;
				background: $white;
				border: 2px solid $border2;
				border-radius: 0.4rem;
			  }
			  &-quantity {
				font-family: OpenSans-SemiBold;
				font-weight: 600;
				font-size: 1.4rem;
				color: $border2;
			  }
			}
			&-type {
			  display: flex;
			  align-items: center;
			  padding: 0.5rem 0.8rem;
			  box-shadow: 0px 2px 5px rgba(28, 19, 39, 0.06);
			  border-radius: 2rem;
			  &-icon {
				width: 1.2rem;
				&.epic {
				  width: 0.9rem;
				}
				&.legendary {
				  margin-top: 0.6rem;
				}
				margin-right: 0.4rem;
			  }
			  &-name {
				font-family: OpenSans-Bold;
				font-weight: 700;
				font-size: 1.4rem;
				color: $border2;
			  }
			}
		  }
		}
		&-buttonbox {
		  display: flex;
		  align-items: center;
		  justify-content: space-between;
		  margin-top: 1.4rem;
		  .createbox__nft-setting-nfts-add-button {
			margin: 0;
		  }
		}
		&-button {
		  display: flex;
		  align-items: center;
		  background: transparent;
		  margin-top: 1.4rem;
		  &-name {
			margin-right: 1.4rem;
			font-size: 1.4rem;
			color: $border;
		  }
		}
		&-detail {
		  display: flex;
		  &-count, &-quantity {
			font-family: OpenSans-SemiBold;
			font-weight: 600;
			font-size: 1.4rem;
			color: $grayDark;
		  }
		  &-count {
			margin-right: 2.4rem;
		  }
		}
	  }
	  &-total {
		display: flex;
		align-items: center;
		margin-top: 2.6rem;
		&-count, &-quantity {
		  font-family: OpenSans-SemiBold;
		  font-weight: 600;
		  font-size: 1.4rem;
		  color: $border;
		}
		&-count {
		  margin-right: 2.4rem;
		}	  
	  }
	}
  }
  &-next {
	display: flex;
	align-items: center;
	width: 18rem;
	background: $white;
	padding: 1.6rem 4rem;
	margin: 13.6rem auto 0;
	margin-top: 13.4rem;
	border: 1px solid $border;
	font-family: OpenSans-SemiBold;
	font-weight: 600;
	font-size: 1.4rem;
	color: $border;
	&-icon {
	  margin-left: 1.4rem;
	}
  }
}
</style>
