<template>
    <div class="custom-select">
        <div class="custom-select__trigger" :class="{active: showDropdown}" ref="trigger" @click="showDropdown = !showDropdown">
            <span class="custom-select__trigger-name">{{ currOpion }}</span>
            <img class="custom-select__trigger-arrow" src="/dropdown-down.svg" alt="arrow" v-if="!showDropdown">
            <img class="custom-select__trigger-arrow" src="/dropdown-up.svg" alt="arrow" v-else>
        </div>
        <div class="custom-select__dropdown" v-if="showDropdown">
            <div class="custom-select__dropdown-option"
                :class="{ active: currOpion === option.value }"
                :key="idx"
                @click="selectOption(option)"
                v-for="(option, idx) of options"
             >{{ option.value }}</div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['options'],
  data() {
    return {
      currOpion: '',
      showDropdown: false
    }
  },
  created() {
    this.currOpion = this.options ? this.options[0].value : ''
  },
  beforeMount() {
    window.addEventListener('click', this.handleClickWindow)
  },
  beforeDestroy() {
    window.removeEventListener('click', this.handleClickWindow)
  },
  methods: {
    handleClickWindow(e) {
      if (!this.$refs.trigger.contains(e.target)) {
        this.showDropdown = false
      }
    },
    selectOption(option) {
      this.currOpion = option.value
      this.showDropdown = false
      this.$emit('@change', option.key)
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-select {
  width: 16.7rem;
  position: relative;
  &__trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: $white;
    height: 3.8rem;
    padding: 0 1.8rem 0 0.8rem;
    border: 1px solid $modalColor;
    border-radius: 0.4rem;
    cursor: pointer;
    &-name {
      margin-right: 0.5rem;
      font-size: 1.4rem;
    }
    &-arrow {
      width: 1rem;
    }
    &.active {
      box-shadow: 0 0 5px $border2;
    }
  }
  &__dropdown {
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    background: $white;
    padding: 0.9rem 0;
    margin-top: 0.4rem;
    border-radius: 0.4rem;
    box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.1);
    z-index: 1;
    &-option {
      background: $white;
      padding: 1.2rem 1.6rem;
      font-size: 1.4rem;
      color: $grayDark;
      cursor: pointer;
      &.active {
        background: $lightGreen;
      }
    }
  }
}
</style>

