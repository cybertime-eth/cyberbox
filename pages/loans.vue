<template>
    <div class="loans container-xl">
        <div class="loans__borrow">
            <div class="loans__borrow-info">
                <h1 class="loans__borrow-info-title">Borrow money  against your NFT</h1>
                <p class="loans__borrow-info-description">Fill out the form and be the first to get instant  access to money secured by your NFT</p>
            </div>
            <a href="https://forms.gle/UHUSg53eVnrKdQc47" target="_blank"><button class="loans__button">Get on Whitelist</button></a>
        </div>
        <img src="/loans.png" alt="loans" class="loans__img">
    </div>
</template>

<script>
export default {
  mounted() {
    const footerEl = document.querySelector('.footer')
    footerEl.classList.add('fixed')
  }
}
</script>

<style lang="scss" scoped>
.loans {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-top: 6.15rem;
  &__borrow {
    padding-top: 1rem;
    &-info {
      padding: 1.3rem 0;
      &-title {
        font-family: Cabin-Bold;
        font-size: 32px;
      }
      &-description {
        padding-top: 10px;
        max-width: 35rem;
        font-weight: 400;
        font-size: 16px;
        line-height: 20px;
      }
    }
  }
  &__button {
    background: $pink;
    margin-top: 2.46rem;
    padding: 15px 47px;
    border-radius: 25px;
    font-weight: 700;
    font-size: 16px;
    color: $white;
  }
  &__img {
    margin-left: 8rem;
  }

  @media(max-width: 460px) {
    padding-top: 0;
    &__borrow {
      padding: 2.4rem 0;
      &-info {
        &-title, &-description {
          text-align: center;
        }
        &-title {
          font-weight: 600;
          font-size: 1.8rem;
        }
        &-description {
          max-width: 100%;
          padding: 1rem 2rem 0;
          font-size: 1.4rem;
        }
      }
    }
    &__button {
      width: calc(100% - 4.8rem);
      margin: 2.4rem 2.4rem 0 2.4rem;
    }
    &__img {
      width: 80%;
      margin: 3rem 0 0;
    }
  }
}
</style>
