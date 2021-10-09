<template>
  <section id="profile">
    <div class="container-xl profile" v-if="!showEditProfile">
      <div class="profile__banner"></div>
      <div class="profile__block">
        <div class="profile__info">
          <div class="profile__info-avatar"></div>
          <div class="profile__info-address">
            <h3 class="profile__info-address-value">0x5cbd...031a</h3>
            <img src="/copy.svg" alt="copy">
          </div>
          <button class="profile__info-edit" @click="showEditProfile = true">
            Edit profile
          </button>
        </div>
        <div class="profile__content">
          <div class="profile__content-header">
            <h3 class="profile__content-header-active">Created</h3>
          </div>
          <div class="profile__content-boxes">
            <div class="profile__content-boxes-none">
              <p class="profile__content-boxes-none-subtitle">You haven’t got any boxes</p>
              <h4 class="profile__content-boxes-none-title">Create your first mystery box</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Edit v-else @saveChanges="userInfo"/>
  </section>
</template>
<script>
import Edit from '@/components/profile/edit'
export default {
  data() {
    return {
      showEditProfile: false,
      user: {}
    }
  },
  methods: {
    userInfo(user) {
      console.log(user)
      this.user = user
      this.showEditProfile = false
    }
  },
  components: {
    Edit
  }
}
</script>
<style lang="scss">
.profile {
  &__banner {
    width: 100%;
    height: 27.2rem;
    background: $modalColor;
  }
  &__block {
    display: grid;
    grid-template-columns: 23rem 1fr;
    grid-column-gap: 10.5rem;
  }
  &__info {
    position: relative;
    top: -6.5rem;
    width: 23.1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    &-avatar {
      width: 13rem;
      height: 13rem;
      background: $white;
      box-shadow: 0 .4rem 1.2rem rgba(0, 0, 0, 0.05);
      border-radius: 50%;
      margin-right: 4rem;
    }
    &-address {
      display: flex;
      align-items: center;
      width: 19rem;
      height: 4.8rem;
      justify-content: space-between;
      box-shadow: 0 .4rem 1.2rem rgba(0, 0, 0, 0.05);
      border-radius: 2.5rem;
      padding: 0 2rem;
      margin-top: 1.65rem;
      img {
        width: 2.4rem;
        cursor: pointer;
      }
      &-value {
        letter-spacing: 0.03em;
      }
    }
    &-edit {
      width: 14.8rem;
      height: 4.8rem;
      background: none;
      border: .1rem solid $border;
      align-self: flex-start;
      margin-top: 5rem;
      cursor: pointer;
    }
  }
  &__content {
    &-header {
      border-bottom: .1rem solid $modalColor;
      padding-bottom: 1.2rem;
      padding-top: 8.6rem;
      &-active {
        letter-spacing: 0.04em;
        position: relative;
        &::after {
          content: '';
          background: linear-gradient(93.06deg, #FC2EF5 8.21%, #5489D8 50.57%, #2CFF64 100%);
          width: 6.6rem;
          position: absolute;
          top: 3.4rem;
          left: 0;
          right: 0;
          bottom: 0;
          height: .1rem;
        }
      }
    }
    &-boxes {
      &-none {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        padding-top: 6rem;
        &-title {
          font-size: 1.8rem;
          color: $pink;
          font-weight: 500;
          padding-top: 2.5rem;
          letter-spacing: 0.03em;
        }
        &-subtitle {
          color: $grayLight;
          letter-spacing: 0.08em;
        }
      }
    }
  }
}
</style>
