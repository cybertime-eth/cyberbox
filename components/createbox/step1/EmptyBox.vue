<template>
    <div class="createbox__emptybox">
        <div class="createbox__emptybox-block">
            <h2 class="createbox__emptybox-title">Create on Cyberbox</h2>
            <div class="createbox__emptybox-create" @click="clickCreate">
                <button class="createbox__emptybox-create-add gradient-border-button">
                    <img class="createbox__emptybox-create-add-icon" src="/plus.svg">
                </button>
                <p class="createbox__emptybox-create-collection">Create New Collection</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  methods: {
    clickCreate() {
      this.$emit('changeSubStep', 2)
    }
  }
}
</script>

<style lang="scss" scoped>
.createbox__emptybox {
  padding-top: 17.1rem;
  padding-bottom: 0.4rem;
  font-family: OpenSans-Regular;
  &-block {
    width: fit-content;
    margin: 0 auto;
  }
  &-title {
    font-family: Cabin-Bold;
    font-weight: 700;
    font-size: 5rem;
    line-height: 1;
    color: $grayDark;
  }
  &-create {
    display: flex;
    align-items: center;
    background: $white;
    box-shadow: 0px 0.4rem 1.2rem rgba(0, 0, 0, 0.05);
    border-radius: 0.8rem;
    padding: 1.6rem;
    margin-top: 4.8rem;
    cursor: pointer;
    &-add {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 5.6rem;
      height: 5.6rem;
      margin-right: 2.4rem;
      &-icon {
        width: 1.4rem;
      }
    }
    &-collection {
      font-weight: 600;
      font-size: 1.8rem;
      line-height: 1;
      color: $grayDark;
    }
  }
}
</style>

