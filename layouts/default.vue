<template>
  <div class="app">
    <Nuxt />
  </div>
</template>
<style>
html,
body {
  margin: 0;
  padding: 0;
  font-style: normal;
  overflow-x: hidden;
  font-size: var(--fontSize);
  scroll-behavior: smooth;
}
h1,h2,h3,h4,h5,h6,p,span,a {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
}
ul {
  padding-left: 0;
}
li {
  list-style: none;
}

  /*SCROLL BAR*/

::-webkit-scrollbar {
  width: 9px;
  background: #000;
}

::-webkit-scrollbar-thumb {
  background: #fff;
  cursor: pointer;
}
</style>
