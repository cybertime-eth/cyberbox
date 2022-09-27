<template>
  <div class="createbox__nft">
	<div class="createbox__nft-steps">
		<p class="createbox__nft-steps-step">1</p>
		<p class="createbox__nft-steps-step">2</p>
	</div>
    <div class="createbox__nft-header">
		<h2 class="createbox__nft-header-title">Add NFT for Box collection</h2>
		<p class="createbox__nft-header-description">Decide how many carbon tokens you want to burn and add nft to each rarity. Rarity is calculated based on the number of burned tokens.</p>
    </div>
    <div class="createbox__nft-setting">
		<div class="createbox__nft-setting-token">
			<div class="createbox__nft-setting-stepbox">
				<p class="createbox__nft-setting-step-num">1</p>
				<p class="createbox__nft-setting-step-name">Enter the number of carbon tokens you are going to burn by creating a box</p>
			</div>
			<div class="createbox__nft-setting-token-detail">
				<p class="createbox__nft-setting-token-detail-info">Enter the number of carbon tokens to burn</p>
				<div class="createbox__nft-setting-token-detail-inputblock">
					<div class="createbox__nft-setting-token-detail-inputbox">
						<input class="createbox__nft-setting-token-detail-input" placeholder="0">
					</div>
					<p class="createbox__nft-setting-token-detail">Buy cMCO2</p>
				</div>
			</div>
			<div class="createbox__nft-setting-token-units">
				<p class="createbox__nft-setting-token-detail-units-unit">1000</p>
				<p class="createbox__nft-setting-token-detail-units-unit">10000</p>
				<p class="createbox__nft-setting-token-detail-units-unit">30000</p>
				<p class="createbox__nft-setting-token-detail-units-unit">100000</p>
			</div>
			<p class="createbox__nft-setting-token-balance">Balance: <b>1034 cMCO2</b></p>
		</div>
		<div class="createbox__nft-setting-nfts">
			<div class="createbox__nft-setting-step-box">
				<div class="createbox__nft-setting-step">
					<p class="createbox__nft-setting-step-num">2</p>
					<p class="createbox__nft-setting-step-name">Enter the number of carbon tokens you are going to burn by creating a box</p>
				</div>
				<img class="createbox__nft-setting-step-info" src="/question.svg">
			</div>
			<div class="createbox__nft-setting-nfts-file">
				<p class="createbox__nft-setting-nfts-file-label">Upload file for NFTs</p>
				<p class="createbox__nft-setting-nfts-file-kinds">JPEG, PNG, GIF, MP4. Max 50 MB</p>
			</div>
			<div class="createbox__nft-setting-nfts-add">
				<div class="createbox__nft-setting-nfts-add-block">
					<input class="createbox__nft-setting-nfts-add-block-name" placeholder="Enter name">
					<div class="createbox__nft-setting-nfts-add-block-category">
						<div class="createbox__nft-setting-nfts-add-block-category-plus">
							<button class="createbox__nft-setting-nfts-add-block-category-plus-button">
								<img class="createbox__nft-setting-nfts-add-block-category-plus-button-icon" src="/plus-grey.svg">
							</button>
							<p class="createbox__nft-setting-nfts-add-block-category-plus-quantity">Quantity: 0</p>
						</div>
					</div>
					<div class="createbox__nft-setting-nfts-add-block-type">
						<img class="createbox__nft-setting-nfts-add-block-type-icon" src="/diamond.svg">
						<p class="createbox__nft-setting-nfts-add-block-type-name">Legendary</p>
					</div>
				</div>
				<button class="createbox__nft-setting-nfts-add-button">
					<p class="createbox__nft-setting-nfts-add-button-name">Add NFT</p>
					<img class="createbox__nft-setting-nfts-add-block-button-icon" src="/plus-grey-small.svg">
				</button>
			</div>
			<div class="createbox__nft-setting-nfts-add">
				<div class="createbox__nft-setting-nfts-add-block">
					<input class="createbox__nft-setting-nfts-add-block-name" placeholder="Enter name">
					<div class="createbox__nft-setting-nfts-add-block-category">
						<div class="createbox__nft-setting-nfts-add-block-category-plus">
							<button class="createbox__nft-setting-nfts-add-block-category-plus-button">
								<img class="createbox__nft-setting-nfts-add-block-category-plus-button-icon" src="/plus-grey.svg">
							</button>
							<p class="createbox__nft-setting-nfts-add-block-category-plus-quantity">Quantity: 0</p>
						</div>
					</div>
					<div class="createbox__nft-setting-nfts-add-block-type">
						<img class="createbox__nft-setting-nfts-add-block-type-icon" src="/fire-filled.svg">
						<p class="createbox__nft-setting-nfts-add-block-type-name">Epic</p>
					</div>
				</div>
				<div class="createbox__nft-setting-nfts-add-buttonbox">
					<button class="createbox__nft-setting-nfts-add-button">
						<p class="createbox__nft-setting-nfts-add-button-name">Add NFT</p>
						<img class="createbox__nft-setting-nfts-add-block-button-icon" src="/plus-grey-small.svg">
					</button>
				</div>
			</div>
			<div class="createbox__nft-setting-nfts-add">
				<div class="createbox__nft-setting-nfts-add-block">
					<input class="createbox__nft-setting-nfts-add-block-name" placeholder="Enter name">
					<div class="createbox__nft-setting-nfts-add-block-category">
						<div class="createbox__nft-setting-nfts-add-block-category-plus">
							<button class="createbox__nft-setting-nfts-add-block-category-plus-button">
								<img class="createbox__nft-setting-nfts-add-block-category-plus-button-icon" src="/plus-grey.svg">
							</button>
							<p class="createbox__nft-setting-nfts-add-block-category-plus-quantity">Quantity: 0</p>
						</div>
					</div>
					<div class="createbox__nft-setting-nfts-add-block-type">
						<img class="createbox__nft-setting-nfts-add-block-type-icon" src="/snow.svg">
						<p class="createbox__nft-setting-nfts-add-block-type-name">Epic</p>
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
		<button class="createbox__nft-next">
			Next step
			<img class="createbox__nft-next-icon" src="/arrow-right.svg">
		</button>
	</div>
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
    nextStep() {
      this.$emit('nextStep', 3)
    },
    showAddNftPage() {
      this.$emit('changePage', true)
    },
    changeStep(step) {
      this.$emit('routeBack', step)
    }
  }
}
</script>
<style lang="scss">
.rarity {
}
</style>
