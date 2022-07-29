<template>
    <div class="modal">
        <div class="exchange__bonus">
            <a class="exchange__bonus-close" @click="$emit('closeModal')">
                <img class="exchange__bonus-close-icon" src="/close.svg" alt="close">
            </a>
			<div class="exchange__bonus-box">
				<div class="exchange__bonus-info">
					<div class="exchange__bonus-info-block">
						<h2 class="exchange__bonus-guide-title">Get an exclusive NFT for the entire 2022 collection</h2>
						<div class="exchange__bonus-guide">
							<p class="exchange__bonus-guide-description">Collect all 12 carbon certificates in a year and exchange them for a secret super rare unique NFT.</p>
							<button class="exchange__bonus-get" :class="{disabled: !bonusAvailable}" @click="$emit('onExchange')" v-if="webVersion">Get a bouns</button>
							<p class="exchange__bonus-guide-sub-description">Exclusive NFT gives you a chance to get into the closed ReFi DAO club</p>
						</div>
					</div>
					<div class="exchange__bonus-picture">
						<img class="exchange__bonus-picture-img" :src="bonusImage" alt="unknown">
					</div>
					<button class="exchange__bonus-get" :class="{disabled: !bonusAvailable}" @click="$emit('onExchange')" v-if="!webVersion">Get a bouns</button>
				</div>
				<div class="exchange__bonus-content">
					<p class="exchange__bonus-guide-tip"><span>Attention!</span> To get 1 exclusive NFT you need to <b>burn</b> a collection of <b>12 monthly NFTs</b></p>
					<p class="exchange__bonus-guide-footprint">If you missed a month, you can buy a certificate on the secondary market, but this certificate will no longer cover your carbon footprint</p>
				</div>
			</div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['bonusAvailable'],
  data() {
	return {
	  webVersion: true
	}
  },
  computed: {
	bonusImage() {
	  const date = new Date()
	  return this.getCDNImage('certificates/rare.webp')
	}
  },
  created() {
	this.webVersion = !this.isMobile()
  }
}
</script>

<style lang="scss" scoped>
.exchange__bonus {
  width: 62.6rem;
  padding: 7.8rem 1.6rem 3.6rem 2.4rem;
  background: $white;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
  border-radius: 0.8rem;
  position: relative;
  &-close {
    display: flex;
    position: absolute;
    top: 2.8rem;
    right: 2.8rem;
    cursor: pointer;
  }
  &-info {
	display: flex;
	justify-content: flex-end;
	padding-bottom: 3.1rem;
	&-block {
	  flex: 1;
	  margin-right: 2.4rem;
	}
  }
  &-guide {
    flex: 1;
	max-width: 30.2rem;
	&-title {
	  max-width: 30.2rem;
	  font-family: Cabin-Bold;
	  font-size: 3.2rem;
      line-height: 3.6rem;
	}
    &-description, &-sub-description {
      font-weight: 600;
      font-size: 1.4rem;
      color: $grayDark;
	}
	&-description {
	  margin-top: 1.2rem;
	}
	&-sub-description {
	  background: linear-gradient(90deg, #365BE0 -14.25%, #D676CF 48.65%, #FFE884 109.5%);
	  -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
	}
    &-tip {
	  flex: 1;
	  margin-right: 2.4rem;
      font-weight: 400;
	  font-size: 1.4rem;
	  color: $textColor;
      span {
		font-weight: 600;
		color: $pink;
	  }
    }
    &-footprint {
	  max-width: 26.3rem;
      font-size: 1.4rem;
      color: $grayLight;
    }
  }
  &-get {
    background: linear-gradient(90deg, #365BE0 -14.25%, #D676CF 48.65%, #FFE884 109.5%);
    margin: 2.3rem 0;
	padding: 0.8rem 1.7em;
    font-weight: 700;
    font-size: 1.6rem;
    color: $white;
	&.disabled {
	  background: $white;
	  border: 1px solid $border;
	  pointer-events: none;
	  font-weight: 400;
	  color: $border;
	  opacity: 0.5;
	}
  }
  &-picture {
    min-width: 26.3rem;
	max-width: 26.3rem;
    height: 26.3rem;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.75)), linear-gradient(46.74deg, #365BE0 -17.17%, #D676CF 48.99%, #FFE884 113%);
    border-radius: 0.4rem;
	overflow: hidden;
    &-img {
      width: 100%;
	  height: 100%;
    }
  }
  &-content {
    display: flex;
    justify-content: flex-end;
	padding-top: 3rem;
	border-top: 1px solid $modalColor;
  }

  @media (max-width: 460px) {
	padding: 2.4rem 0.8rem;
	&-info {
	  display: block;
	  padding-bottom: 0;
	  &-block {
		margin: 0;
	  }
	}
	&-guide {
	  max-height: 70vh;
	  overflow-y: auto;
	  &-title {
		margin-right: 7rem;
		font-size: 2.2rem;
		line-height: 2.4rem;
	  }
	  &-description {
		margin-right: 1rem;
	  }
	  &-sub-description {
		margin-top: 1.2rem;
	  }
	  &-tip {
		margin: 0;
	  }
	  &-footprint {
		max-width: none;
		margin-top: 1.6rem;
	  }
	}
	&-get {
	  width: 100%;
	  font-size: 1.4rem;
	}
	&-picture {
	  width: 100%;
	  min-width: 28.8rem;
	  max-width: 28.8rem;
	  height: 28.8rem;
	  margin-top: 2.4rem;
	}
	&-content {
	  display: block;
	  padding: 0;
	  border: 0;
	}
  }
  @media (max-width: 460px) and (max-height: 50rem) {
	&-box {
	  max-height: 48rem;
	  overflow-x: hidden;
	  overflow-y: auto;
	}
  }
}
</style>
