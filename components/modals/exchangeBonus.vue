<template>
    <div class="modal">
        <div class="exchange__bonus">
            <a class="exchange__bonus-close" @click="$emit('closeModal')">
                <img class="exchange__bonus-close-icon" src="/close.svg" alt="close">
            </a>
			<h2 class="exchange__bonus-guide-title" v-if="!webVersion">Access to ReFi DAO club</h2>
			<div class="exchange__bonus-content">
				<div class="exchange__bonus-box">
					<div class="exchange__bonus-info">
						<h2 class="exchange__bonus-guide-title" v-if="webVersion">Access to ReFi DAO club</h2>
						<p class="exchange__bonus-guide-description">Participants get the opportunity to:</p>
						<ul class="exchange__bonus-info-features indent-features-list">
							<li class="indent-features-list-item">
								<span class="indent-features-list-item-mark"/>
								<p class="indent-features-list-item-text">Vote for the distribution of the DAO fund</p>
							</li>
							<li class="indent-features-list-item">
								<span class="indent-features-list-item-mark"/>
								<p class="indent-features-list-item-text">Participate in the development of ReFi initiatives</p>
							</li>
							<li class="indent-features-list-item">
								<span class="indent-features-list-item-mark"/>
								<p class="indent-features-list-item-text">Define tokens for offset for a period</p>
							</li>
							<li class="indent-features-list-item">
								<span class="indent-features-list-item-mark"/>
								<p class="indent-features-list-item-text">Participate in the development<br/>of CyberBox</p>
							</li>
						</ul>
						<p class="exchange__bonus-info-hint">Collect all 12 certificates!</p>
						<button class="exchange__bonus-get" :class="{disabled: !bonusAvailable}" @click="$emit('onExchange')" v-if="webVersion">Get a bouns</button>
					</div>
					<div class="exchange__bonus-picture">
						<img class="exchange__bonus-picture-img" :src="bonusImage" alt="unknown">
					</div>
				</div>
				<button class="exchange__bonus-get" :class="{disabled: !bonusAvailable}" @click="$emit('onExchange')" v-if="!webVersion">Get a bouns</button>
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
  width: 68.6rem;
  padding: 6.4rem 2.4rem 2.9rem 2.4rem;
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
  &-box {
	display: flex;
	justify-content: space-between;
  }
  &-info {
	&-features {
	  max-width: 31rem;
	  margin-top: 1rem;
	  .indent-features-list-item {
		align-items: center;
		color: $textColor;
	  }
	}
	&-hint {
	  margin-top: 2.8rem;
	  font-weight: 600;
	  font-size: 1.4rem;
	  color: $green;
	}
  }
  &-guide {
    flex: 1;
	&-title {
	  font-family: Cabin-Bold;
	  font-size: 3.2rem;
      line-height: 3.6rem;
	}
    &-description {
	  margin-top: 2.4rem;
      font-weight: 600;
      font-size: 1.6rem;
	}
  }
  &-get {
    background: linear-gradient(90deg, #365BE0 -14.25%, #D676CF 48.65%, #FFE884 109.5%);
    margin-top: 2.8rem;
	padding: 0.8rem 3rem;
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
    min-width: 30.5rem;
	max-width: 30.5rem;
    height: 30.5rem;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.75)), linear-gradient(46.74deg, #365BE0 -17.17%, #D676CF 48.99%, #FFE884 113%);
    border-radius: 0.4rem;
	overflow: hidden;
    &-img {
      width: 100%;
	  height: 100%;
    }
  }

  @media (max-width: 460px) {
	padding: 4.8rem 0.8rem 2.4rem;
	&-close {
	  top: 2rem;
	  right: 2rem;
	}
	&-box {
	  display: block;
	}
	&-guide {
	  max-height: 70vh;
	  overflow-y: auto;
	  &-title {
		font-size: 2.2rem;
		line-height: 2.4rem;
	  }
	  &-description {
		margin-top: 1.6rem;
		font-size: 1.4rem;
	  }
	}
	&-info {
	  &-features {
		max-width: 100%;
		margin-top: 1.2rem;
	  }
	  &-hint {
		width: 100%;
		text-align: center;
	  }
	}
	&-get {
	  width: 100%;
	  margin-top: 2.4rem;
	  font-size: 1.4rem;
	}
	&-picture {
	  width: 100%;
	  min-width: 28.8rem;
	  max-width: 28.8rem;
	  height: 28.8rem;
	  margin-top: 2.4rem;
	}
  }
  @media (max-width: 460px) and (max-height: 50rem) {
	&-content {
	  max-height: 70vh;
	  overflow-y: auto;
	}
  }
}
</style>
