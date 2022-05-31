<template>
    <div class="modal">
        <div class="exchange__bonus">
            <a class="exchange__bonus-close" @click="$emit('closeModal')">
                <img class="exchange__bonus-close-icon" src="/close.svg" alt="close">
            </a>
			<h2 class="exchange__bonus-guide-title">Get a Carbon Super<br/>Rare bonus!</h2>
            <div class="exchange__bonus-guide">
                <div class="exchange__bonus-guide-header">
					<p class="exchange__bonus-guide-description">Collect all 12 carbon certificates in a year and exchange them for a secret super rare unique NFT.</p>
                    <div class="exchange__bonus-picture">
						<img class="exchange__bonus-picture-img" src="/question-mark.svg" alt="unknown">
					</div>
                </div>
                <button class="exchange__bonus-get" :class="{disabled: !bonusAvailable}">Get a bouns</button>
                <p class="exchange__bonus-guide-tip">You exchange your 12 certificates irrevocably.</p>
                <p class="exchange__bonus-guide-footprint">If you missed a month, you can buy a certificate on the secondary market, but this certificate will no longer cover your carbon footprint</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['bonusAvailable']
}
</script>

<style lang="scss" scoped>
.exchange__bonus {
  width: 62.6rem;
  padding: 2.4rem;
  background: $white;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
  border-radius: 0.8rem;
  position: relative;
  &-close {
    display: flex;
    position: absolute;
    top: 2.9rem;
    right: 2.9rem;
  }
  &-title {
	font-family: Cabin-Bold;
	font-size: 3.2rem;
  }
  &-guide {
    flex: 1;
    max-width: 30.2rem;
    &-description {
      margin-top: 1.2rem;
      font-weight: 600;
      font-size: 1.4rem;
      color: $grayDark;
    }
    &-tip {
      font-weight: 600;
      font-size: 1.4rem;
      color: $pink;
    }
    &-footprint {
      margin-top: 1.6rem;
      font-size: 1.4rem;
      color: $grayLight;
    }
  }
  &-get {
    background: linear-gradient(90deg, #365BE0 -14.25%, #D676CF 48.65%, #FFE884 109.5%);
    margin: 2.4rem 0;
    padding: 1.2rem 2.7em;
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
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 2.8rem;
    top: 50%;
    transform: translateY(-50%);
    min-width: 26.3rem;
	max-width: 26.3rem;
    height: 26.3rem;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.75)), linear-gradient(46.74deg, #365BE0 -17.17%, #D676CF 48.99%, #FFE884 113%);
    border-radius: 0.4rem;
    &-img {
      width: 3.9rem;
    }
  }

  @media (max-width: 675px) {
    display: block;
    width: 100%;
	margin: 0 0.8rem;
	&-title {
	  font-size: 2.2rem;
	}
    &-guide {
      max-width: 100%;
	}
	&-picture {
	  position: static;
	  margin-top: 2.4rem;
	  right: auto;
	  top: auto;
	  transform: none;
	}
  }
  @media (max-width: 460px) {
	padding: 2.4rem 0.8rem;
	&-guide {
	  max-height: 70vh;
	  overflow-y: auto;
	}
	&-get {
	  width: 100%;
	  font-size: 1.4rem;
	}
	&-picture {
	  width: 100%;
	  min-width: auto;
	  max-width: none;
	}
  }
}
</style>
