<template>
    <div  class="custom-switch" @click="$emit('onChange')">
        <h3 class="custom-switch-text">{{ label }}</h3>
        <div class="custom-switch-switcher" :class="{'custom-switch-switcher-active': value}">
            <div class="custom-switch-switcher-element" :class="{'custom-switch-switcher-element-active': value}"></div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['label', 'value']
}
</script>

<style lang="scss" scoped>
.custom-switch {
  display: flex;
  align-items: center;
  &-text {
    margin-right: 1.6rem;
  }
  &-switcher {
    width: 5.3rem;
    height: 2.6rem;
    background: $border2;
    border-radius: 1.55rem;
    position: relative;
    cursor: pointer;
    transition: .5s;
    &-element {
      position: absolute;
      left: .2rem;
      top: .2rem;
      background: $white;
      width: 2.2rem;
      height: 2.2rem;
      border-radius: 1.5rem;
      transition: .5s;
      &-active {
        left: 2.8rem;
      }
    }
    &-active {
      background: $green;
    }
  }
}
</style>


