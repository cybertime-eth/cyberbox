<template>
    <div class="certificate__item collection__item">
        <img src="/more.png" alt="more" class="collection__item-more">
        <img src="/carbon.svg" alt="item" class="collection__item-image">
        <div class="collection__item-info">
            <h2 class="collection__item-info-name">January 2022</h2>
            <p class="collection__item-info-type">Price</p>
            <div class="collection__item-info-price">
                <img src="/celo.svg" alt="celo">
                <h3 class="collection__item-info-price-text">12</h3>
            </div>
            <!-- <h3 class="collection__item-info-price-null">Not for sale</h3> -->
            <button class="collection__item-info-details">Details</button>
        </div>
    </div>    
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.certificate__item {
  height: 39.7rem;
  .collection__item-info-name {
    padding-bottom: 4rem;
    border-bottom: .1rem solid $modalColor;
  }
}
</style>
