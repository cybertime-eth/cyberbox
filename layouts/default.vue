<template>
  <div class="app">
    <Header />
    <Nuxt />
  </div>
</template>
<script>
import Header from './../components/Header'
export default {
  components: {
    Header
  }
}
</script>
<style lang="scss">

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
}

//DEFAULT STYLES

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
  outline: none;
  resize: none;
  font-family: OpenSans-Regular;
  &::placeholder {
    color: $border2;
  }
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
  background: #000;
}

::-webkit-scrollbar-thumb {
  background: #fff;
  cursor: pointer;
}

//FONTS

@font-face {
  font-family: "Cabin-Bold";
  src: local("Cabin-Bold"),
  url(./assets/fonts/Cabin-Bold.ttf) format('truetype');
}
@font-face {
  font-family: "Cabin-Medium";
  src: local("Cabin-Medium"),
  url(./assets/fonts/Cabin-Medium.ttf) format('truetype');
}
@font-face {
  font-family: 'OpenSans-Bold';
  src: local("OpenSans-Bold"),
  url(./assets/fonts/OpenSans-Bold.ttf) format('truetype');
}
@font-face {
  font-family: 'OpenSans-SemiBold';
  src: local("OpenSans-SemiBold"),
  url(./assets/fonts/OpenSans-SemiBold.ttf) format('truetype');
}
@font-face {
  font-family: 'OpenSans-Light';
  src: local("OpenSans-Light"),
  url(./assets/fonts/OpenSans-Light.ttf) format('truetype');
}
@font-face {
  font-family: 'OpenSans-Medium';
  src: local("OpenSans-Medium"),
  url(./assets/fonts/OpenSans-Medium.ttf) format('truetype');
}
@font-face {
  font-family: 'OpenSans-Regular';
  src: local("OpenSans-Regular"),
  url(./assets/fonts/OpenSans-Regular.ttf) format('truetype');
}
</style>
