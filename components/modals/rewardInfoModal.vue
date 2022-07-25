<template>
    <div class="modal">
        <div class="modal__reward">
            <a class="modal__reward-close" @click="closeModal"><img src="/close.svg" alt="close"></a>
            <div class="modal__reward-main">
                <h2 class="modal__reward-main-title">How to get rewarded?</h2>
                <div class="modal__reward-main-info">
                    <div class="modal__reward-main-info-steps">
                        <p class="modal__reward-main-info-steps-step">1</p>
                        <p class="modal__reward-main-info-steps-step">2</p>
                        <p class="modal__reward-main-info-steps-step">3</p>
                    </div>
                    <div class="modal__reward-main-info-items">
                        <p class="modal__reward-main-info-items-item"><b>Share</b> your referral link</p>
                        <p class="modal__reward-main-info-items-item"><b>Invite your friends</b> to buy a carbon certificate on the mint page</p>
                        <p class="modal__reward-main-info-items-item"><b>Earn CELO</b> for each purchased certificate through your referral link</p>
                    </div>
                </div>
            </div>
            <img class="modal__reward-picture" :src="getCDNImage('reward.webp')" alt="reward" v-if="!isMobile()">
            <img class="modal__reward-picture" :src="getCDNImage('reward-mobile.webp')" alt="reward" v-else>
        </div>
    </div>
</template>

<script>
export default {
  methods: {
    closeModal() {
      this.$emit('closeModal')
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  &__reward {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 75.2rem;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.88)), linear-gradient(90deg, #365BE0 -14.25%, #D676CF 48.65%, #FFE884 109.5%);
    padding: 3.2rem 6rem;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
    border-radius: 0.8rem;
    &-close {
      position: absolute;
      top: 2.8rem;
      right: 2.8rem;
      cursor: pointer;
    }
    &-main {
      max-width: 34.9rem;
      &-title {
        font-family: Cabin-Regular;
        font-weight: 500;
        font-size: 3.2rem;
      }
      &-info {
        margin-top: 2.4rem;
        display: flex;
        &-steps {
          margin-right: 2.1rem;
          &-step {
            position: relative;
            width: 2.8rem;
            height: 2.8rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background: $white;
            margin-top: 3.4rem;
            border-radius: 50%;
            font-weight: 600;
            font-size: 1.4rem;
            color: #FA78BF;
            &:first-child {
              margin: 0;
            }
            &:nth-child(2) {
              &::before, &::after {
                display: block;
                content: "";
                position: absolute;
                left: 50%;
                width: 1px;
                background: $white;
              }
              &::before {
                top: 0;
                height: 3.4rem;
                transform: translateY(-100%);
              }
              &::after {
                top: 100%;
                height: 4.6rem;
              }
            }
            &:last-child {
              margin-top: 4.6rem;
            }
          }
        }
        &-items {
          margin-top: 0.2rem;
          &-item {
            font-size: 1.6rem;
            color: $grayDark;
            &:nth-child(2) {
              padding-top: 3.7rem;
              padding-bottom: 3.3rem;
            }
          }
        }
      }
    }
    &-picture {
      width: 31.2rem;
    }
    @media (max-width: 360px) {
      display: block;
      width: calc(100% - 3.2rem);
      padding: 4.8rem 0.8rem;
      &-close {
        top: 2rem;
        right: 1.2rem;
      }
      &-main {
        max-width: none;
        &-title {
          font-family: OpenSans-SemiBold;
          font-weight: 600;
          font-size: 2.2rem;
        }
        &-info {
          &-steps {
            margin-right: 1.6rem;
            &-step {
              
            }
          }
          &-items {
            margin-top: 0.4rem;
            &-item {
              font-size: 1.4rem;
              &:nth-child(2) {
                padding-bottom: 3.8rem;
              }
            }
          }
        }
      }
      &-picture {
        display: block;
        width: 19.4rem;
        margin: 3.2rem auto 0;
      }
    }
  }
}
</style>
