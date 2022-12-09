<template>
  <div class="app">
    <Header />
    <Nuxt />
    <Footer />
    <h3 class="message" v-if="message">{{ message }}</h3>
  </div>
  
</template>
<script>
import Header from './../components/Header'
import Footer from './../components/Footer'
export default {
  middleware: ['redirectMiddleware'],
  head() {
    if (this.$route.params.collectionid) {
      return {
        meta: [
          { hid: 'title', name: 'title', content: this.pageTitle },
          { hid: 'og:title', property: 'og:title', content: this.pageTitle },
          { hid: 'description', name: 'description', content: this.description },
          { hid: 'og:description', property: 'og:description', content: this.description },
          { hid: 'og:image', property: 'og:image', content: this.metaIcon },
          { hid: 'twitter:image', name: 'twitter:image', content: this.metaIcon }
        ]
      }
    } else {
	  return {}
	}
  },
  computed: {
    message() {
      return this.$store.state.message
    },
    address() {
      return this.$store.state.address
	},
	collection() {
	  if (this.$route.params.collectionid) {
		const collectionId = this.$route.params.collectionid
		const collection = this.$store.state.collectionList.find(item => item.route === collectionId)
		return collection || {}
	  } else {
		return {}
	  }
	},
	pageTitle() {
      return `${this.collection.name} | Cyberbox ReFi NFT Marketplace`
    },
    description() {
      return this.collection.description
    },
    metaIcon() {
	  let imageSrc = ''
      switch (this.$route.params.collectionid) {
        case 'cpunk': imageSrc = this.getCDNImage('collections/Media_punks.png')
          break
        case 'ctoadz': imageSrc = this.getCDNImage('collections/Media_toadz.png')
          break
        case 'knoxnft': imageSrc = this.getCDNImage('collections/KnoxersDAO.png')
          break
        default: imageSrc = this.collection.image
          break
      }
      return imageSrc
    },
  },
  components: {
    Header,
    Footer,
  },
  watch: {
    address() {
      if (this.$store.state.address) {
        this.$store.dispatch('loadNomNameAddress')
      }
    }
  },
 async mounted() {
    await this.$store.dispatch('updateUser')
    await this.$store.dispatch('walletConnect', false)
    if (!this.$store.state.cMCO2Price) {
      await this.$store.dispatch('getCMCO2TokenPrice')
    }
    this.$store.dispatch('loadNotificationList')
  }
}
</script>
<style lang="scss">
.message {
  position: fixed;
  bottom: 2.4rem;
  left: 6rem;
  padding: 1.2rem 2.5rem;
  background: $lightGreen;
  border-radius: .8rem;
}
.gradient-button {
  position: relative;
  background-clip: padding-box;
  background: #fff;
  color: $pink;
  justify-self: end;
  border-radius: 2.3rem;
  letter-spacing: 0.04em;
  border: .1rem solid transparent;
  &::after {
    position: absolute;
    top: -.2rem; bottom: -.2rem;
    left: -.2rem; right: -.2rem;
    background: linear-gradient(93.06deg, #FC2EF5 8.21%, #5489D8 50.57%, #2CFF64 100%);
    content: '';
    z-index: -1;
    border-radius: 2.3rem;
  }
  &:disabled {
    color: $border;
    border: .2rem solid $border;
  }
}

.gradient-border-button {
  background: $white;
  background-origin: border-box;
  background-clip: content-box, border-box;
  background-image: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), linear-gradient(93.06deg, #FC2EF5 8.21%, #5489D8 50.57%, #2CFF64 100%);
  box-shadow: 0.2rem 1000px 1px #fff inset;
  border: 0.2rem solid transparent;
  border-radius: 0.8rem;
}

.gradient-text {
  background: linear-gradient(93.06deg, #FC2EF5 8.21%, #5489D8 50.57%, #2CFF64 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

//DEFAULT STYLES

* {
  font-family: OpenSans-Regular;
}
html,
body {
  margin: 0;
  padding: 0;
  font-family: OpenSans-Regular;
  font-style: normal;
  overflow-x: hidden;
  font-size: var(--fontSize);
  scroll-behavior: smooth;
}
h1,h2,h3,h4,h5,h6,p,span,a {
  margin: 0;
  padding: 0;
  color: $textColor;
}
h1 {
  font-size: 3.2rem;
  font-family: Cabin-Bold;
}
h2 {
  font-size: 2rem;
}
a,h3 {
  font-size: 1.6rem;
  font-weight: 600;
}
p {
  font-size: 1.4rem;
  letter-spacing: 0.03em;
}
h4 {
  font-size: 1.3rem;
}
button {
  border-style: none;
  font-size: 1.6rem;
  border-radius: 2.5rem;
  color: $textColor;
  font-family: OpenSans-SemiBold;
  padding: 0;
  outline: 0;
  cursor: pointer;
  &:focus {
    outline: 0;
  }
}
a {
  text-decoration: none;
  font-family: OpenSans-SemiBold;
}
ul {
  padding-left: 0;
}
li {
  list-style: none;
}
input,textarea {
  background: $white;
  border: .1rem solid $border2;
  border-radius: .4rem;
  font-size: 1.6rem;
  color: $textColor;
  padding: 1.2rem 1rem;
  outline: $lightGreen;
  resize: none;
  font-family: OpenSans-Regular;
  &::placeholder {
    color: $border2;
  }
}
input, textarea, button, select, a {
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}
ul {
  margin: 0;
}
.container-xl {
  width: 132rem;
  margin: 0 auto;
}
.container-l {
  width: 81.8rem;
  margin: 0 auto;
}

//SCROLL BAR

::-webkit-scrollbar {
  width: 9px;
  background: #fff;
}

::-webkit-scrollbar-thumb {
  background: #000;
  cursor: pointer;
}

// MODALS


.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, .5);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  &__block {
    position: relative;
    padding: 2.8rem 6.9rem;
    background: $modalColor;
    border-radius: .8rem;
  }
  &__title {
    color: $titleColor;
    text-align: center;
  }
  &__close {
    width: 1.4rem;
    position: absolute;
    right: 2.1rem;
    top: 2.1rem;
    z-index: 4;
    cursor: pointer;
  }
  &__step {
    display: flex;
    align-items: center;
    margin-top: 2.4rem;
    padding: 0 13.7rem;
    &-status {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border: 2px solid $border2;
      border-radius: 50%;
      font-size: 1rem;
      color: $border2;
      &.active {
        border: 1px solid $pink;
        color: $pink;
        * {
          color: $pink;
        }
      }
      &.approved {
        border: 0;
      }
    }
    &-line {
      flex: 1;
      height: 2px;
      background: $border2;
      opacity: 0.65;
      &.active {
        background: linear-gradient(93.06deg,  #2CFF64 8.21%, #FC2EF5 100%);
        opacity: 1;
      }
    }
  }
}

.dropdown {
  display: flex;
  position: relative;
  .dropdown-toggle {
    cursor: pointer;
  }
  .dropdown-menu {
    position: absolute;
	top: calc(100% + 2.4rem);
	background: $white;
	box-shadow: 0px 1.5rem 3rem rgba(0, 0, 0, 0.1);
	border-radius: 0.4rem;
	&.right {
	  right: 0;
	}
    .dropdown-item {
	  display: flex;
	  align-items: center;
	  justify-content: space-between;
	  padding: 2rem 2.2rem 2rem 1.6rem;
	  font-size: 1.6rem;
	  @media (max-width: 460px) {
		font-size: 1.4rem;
	  }
    }
  }
  .dropdown-menu-right {
	right: 0;
  }
}

.features-list {
  list-style: none;
  &-item {
	padding-bottom: 0.8rem;
	font-size: 1.4rem;
	color: $grayDark;
	&::before {
	  content: "\2022";
	  display: inline-block;
	  color: $green;
	  font-weight: bold;
	  width: 1em;
	}
	&:last-child {
	  padding: 0;
	}
  }
}

.indent-features-list {
  &-item {
	display: flex;
	margin-top: 0.8rem;
	&:first-child {
	  margin: 0;
	}
    &-mark {
	  display: inline-block;
	  width: 0.6rem;
	  height: 0.6rem;
	  background: $green;
	  margin-right: 1.3rem;
	  border-radius: 50%;
    }
	&-text {
      flex: 1;
	  font-size: 1.4rem;
	  line-height: 2rem;
	  color: $grayDark;
	}
  }
}

.without-scroll {
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}

.semibold {
  font-family: OpenSans-Medium;
  font-weight: 600;
}

//FONTS

@font-face {
  font-display: swap;
  font-family: "Cabin-Bold";
  src: local("Cabin-Bold"),
  url(./assets/fonts/Cabin-Bold.ttf) format('truetype');
}
@font-face {
  font-display: swap;
  font-family: "Cabin-Medium";
  src: local("Cabin-Medium"),
  url(./assets/fonts/Cabin-Medium.ttf) format('truetype');
}
@font-face {
  font-display: swap;
  font-family: "Cabin-Regular";
  src: local("Cabin-Regular"),
  url(./assets/fonts/Cabin-Regular.ttf) format('truetype');
}
@font-face {
  font-display: swap;
  font-family: 'OpenSans-Bold';
  src: local("OpenSans-Bold"),
  url(./assets/fonts/OpenSans-Bold.ttf) format('truetype');
}
@font-face {
  font-display: swap;
  font-family: 'OpenSans-SemiBold';
  src: local("OpenSans-SemiBold"),
  url(./assets/fonts/OpenSans-SemiBold.ttf) format('truetype');
}
@font-face {
  font-display: swap;
  font-family: 'OpenSans-Light';
  src: local("OpenSans-Light"),
  url(./assets/fonts/OpenSans-Light.ttf) format('truetype');
}
@font-face {
  font-display: swap;
  font-family: 'OpenSans-Medium';
  src: local("OpenSans-Medium"),
  url(./assets/fonts/OpenSans-Medium.ttf) format('truetype');
}
@font-face {
  font-display: swap;
  font-family: 'OpenSans-Regular';
  src: local("OpenSans-Regular"),
  url(./assets/fonts/OpenSans-Regular.ttf) format('truetype');
}
@font-face {
  font-display: swap;
  font-family: 'Orbitron-Black';
  src: local("Orbitron-Black"),
  url(./assets/fonts/Orbitron-Black.ttf) format('truetype');
}

@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@media screen and (max-width: 460px) {
  .container-xl {
    width: 30.4rem;
  }
  .modal__block {
    padding: 2.8rem 2.5rem;
  }
  .modal__step {
	padding: 0 4.5rem;
  }
}
</style>
