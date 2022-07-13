<template>
  <ul class="profile__menu" :class="{sidemenu: sideMenu }" @mouseleave="closeModal">
    <!-- <li class="profile__menu-list">
      <nuxt-link to="/mycollection" class="profile__menu-link">
        <div class="profile__menu-link-info">
          <img src="/my-collection.png" alt="coolicon" class="profile__menu-link-info-icon">
          My collection
        </div>
        <img src="/array-right.svg" alt="array">
      </nuxt-link>
    </li> -->
    <li class="profile__menu-list" @click="logout">
      <div class="profile__menu-link">
        <div class="profile__menu-link-info">
          <img :src="getCDNImage('logout.svg')" alt="logout" class="profile__menu-link-info-icon">
          <h3>Logout</h3>
        </div>
      </div>
    </li>
  </ul>
</template>
<script>
export default {
  props: ['sideMenu'],
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    },
    closeModal() {
      this.$emit('closeModal', false)
    }
  }
}
</script>
<style lang="scss">
.profile__menu {
  position: absolute;
  right: 6rem;
  top: 7.6rem;
  background: $white;
  width: 9.4rem;
  box-shadow: 0 1.5rem 3rem rgba(0, 0, 0, 0.1);
  border-radius: .4rem;
  animation: showModal .5s;
  padding: 2rem 1.6rem;
  z-index: 2;
  &-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    cursor: pointer;
    &-avatar {
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
      background: $modalColor;
      margin-right: 1.7rem;
      img {
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        object-fit: cover;
      }
    }
    &-info {
      display: flex;
      align-items: center;
      h3 {
        font-family: OpenSans-SemiBold;
      }
      &-icon {
        width: 1.8rem;
        padding-right: 1.8rem;
        &-savenft {
          width: 2.4rem;
          padding-right: 1.3rem;
        }
      }
    }
  }
}
@keyframes showModal {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@media screen and (max-width: 460px) {
  .profile__menu {
    right: 0;
    top: 6.6rem;
    width: 100%;
    &.sidemenu {
      position: static;
      top: auto;
      box-shadow: none;
      border: 0;
      border-radius: 0;
      .profile__menu-link {
        display: block;
      }
      .profile__menu-list {
        height: auto;
        padding: 0 0 2.5rem;
        img {
          display: none;
        }
      }
    }
  }
}
</style>
