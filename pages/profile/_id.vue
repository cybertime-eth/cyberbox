<template>
  <section id="profile">
    <div class="container-xl profile" v-if="!showEditProfile">
      <div class="profile__banner">
        <img :src="user.cover" alt="image" v-if="user.cover">
      </div>
      <div class="profile__block">
        <div class="profile__info">
          <div class="profile__info-avatar">
            <img :src="user.image" alt="image" v-if="user.image">
          </div>
          <div class="profile__info-address">
            <h3 class="profile__info-address-value">{{ address ? address : '' }}</h3>
            <img src="/copy.svg" alt="copy">
          </div>
          <h1 class="profile__info-name gradient-text" v-if="user.name">{{ user.name }}</h1>
          <div class="profile__info-bio" v-if="user.bio">
            <h3 class="profile__info-bio-title">Bio</h3>
            <p class="profile__info-bio-content">
              {{ user.bio }}
            </p>
          </div>
          <div class="profile__info-links" v-if="user.links">
            <h3 class="profile__info-links-title">Links</h3>
            <p class="profile__info-links-images">
              <a :href="'https://t.me/' + user.links.telegram" v-if="user.links.telegram" target="_blank"><img src="/socials/telegram.svg" alt="telegram"></a>
              <a :href="'https://twitter.com/' + user.links.twitter" v-if="user.links.twitter" target="_blank"><img src="/socials/twitter.svg" alt="twitter"></a>
              <a :href="'https://www.instagram.com/' + user.links.instagram" v-if="user.links.instagram" target="_blank"><img src="/socials/instagram.svg" alt="instagram"></a>
            </p>
          </div>
          <button class="profile__info-edit" @click="showEditProfile = true" v-if="address">
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
              <h4 class="profile__content-boxes-none-title" @click="$router.push('/createbox')">Create your first mystery box</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Edit v-else @saveChanges="closeEditProfile"/>
  </section>
</template>
<script>
import Edit from '@/components/profile/edit'
export default {
  data() {
    return {
      showEditProfile: false,
    }
  },
  methods: {
    closeEditProfile(payload) {
      this.showEditProfile = payload
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    address() {
      return this.$store.state.address
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
    img {
      width: 100%;
      height: 27.2rem;
      object-fit: cover;
    }
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
    display: grid;
    grid-template-rows: 14rem 9rem 1fr 11rem 12rem 9rem;
    align-items: center;
    &-avatar {
      width: 13rem;
      height: 13rem;
      background: $white;
      box-shadow: 0 .4rem 1.2rem rgba(0, 0, 0, 0.05);
      border-radius: 50%;
      margin-right: 4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      justify-self: center;
      img {
        width: 12rem;
        height: 12rem;
        object-fit: cover;
        border-radius: 50%;
      }
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
      img {
        width: 2.4rem;
        cursor: pointer;
      }
      &-value {
        letter-spacing: 0.03em;
      }
    }
    &-name {
      font-weight: 500;
      font-family: Cabin-Medium;
    }
    &-bio {
      &-title {
        border-bottom: .1rem solid $border2;
        padding-bottom: .6rem;
        font-family: OpenSans-SemiBold;
      }
      &-content {
        padding-top: 1rem;
        line-height: 2rem;
        letter-spacing: 0.03em;
      }
    }
    &-links {
      &-title {
        border-bottom: .1rem solid $border2;
        padding-bottom: .6rem;
        font-family: OpenSans-SemiBold;
      }
      &-images {
        padding-top: 1rem;
        display: flex;
        align-items: center;
        img {
          width: 2rem;
          padding-right: 2rem;
        }
      }
    }
    &-edit {
      width: 14.8rem;
      height: 4.8rem;
      background: none;
      border: .1rem solid $border;
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
