<template>
  <section>
    <div class="container-l profile">
      <div class="profile__edit">
        <h1 class="profile__edit-title">Edit your Profile</h1>
        <div class="profile__edit-content">

          <!--USER NAME-->

          <div class="profile__edit-content-item">
            <h2 class="profile__edit-content-item-title">Enter your details</h2>
            <div class="profile__edit-content-item-form">
              <h3 class="profile__edit-content-item-form-text">Username</h3>
              <input
                type="text"
                placeholder="Enter your username"
                class="profile__edit-content-item-form-input"
                v-model="user.name"
              >
            </div>
          </div>

          <!--BIO-->

          <div class="profile__edit-content-item">
            <h2 class="profile__edit-content-item-title">Add a short bio</h2>
            <div class="profile__edit-content-item-form">
              <h3 class="profile__edit-content-item-form-text">Short bio</h3>
              <textarea
                placeholder="A little bit words about you"
                class="profile__edit-content-item-form-textarea"
                v-model="user.bio"
              ></textarea>
              <h4 class="profile__edit-content-item-form-length">0/200</h4>
            </div>
          </div>

          <!--PROFILE IMAGE-->

          <div class="profile__edit-content-item">
            <div class="profile__edit-content-item-text">
              <h2 class="profile__edit-content-item-title">Upload a profile image</h2>
              <p class="profile__edit-content-item-subtitle">
                Recommended size: <br>
                1000x1000px. <br>
                JPG, PNG or GIF. <br>
                10MB max size.
              </p>
            </div>
            <div class="profile__edit-content-item-form">
              <div class="profile__edit-content-item-form-image">
                <p class="profile__edit-content-item-form-image-text">Drag and drop an image <br> here, or click to browse.</p>
              </div>
            </div>
          </div>

          <!--COVER IMAGE-->

          <div class="profile__edit-content-item">
            <div class="profile__edit-content-item-text">
              <h2 class="profile__edit-content-item-title">Upload a cover image</h2>
              <p class="profile__edit-content-item-subtitle">
                Recommended size: <br>
                1000x1000px. <br>
                JPG, PNG or GIF. <br>
                10MB max size.
              </p>
            </div>
            <div class="profile__edit-content-item-form">
              <div class="profile__edit-content-item-form-image">
                <p class="profile__edit-content-item-form-image-text">Drag and drop an image <br> here, or click to browse.</p>
              </div>
            </div>
          </div>

          <!--SOCIALS LINKS-->

          <div class="profile__edit-content-socials">
            <h2 class="profile__edit-content-socials-title">Add links to your social media profiles</h2>

            <!--TELEGRAM-->

            <div class="profile__edit-content-socials-link">
              <div class="profile__edit-content-socials-link-info">
                <div class="profile__edit-content-socials-link-info-name">
                  <img src="/socials/telegram.svg" alt="telegram">
                  <h3>Telegram</h3>
                </div>
                <p class="profile__edit-content-socials-link-info-https">https://</p>
              </div>
              <input
                type="text"
                class="profile__edit-content-socials-link-value"
                placeholder="Website URL"
                v-model="user.telegram"
              >
            </div>

            <!--INSTAGRAM-->

            <div class="profile__edit-content-socials-link">
              <div class="profile__edit-content-socials-link-info">
                <div class="profile__edit-content-socials-link-info-name">
                  <img src="/socials/instagram.svg" alt="instagram">
                  <h3>Instagram</h3>
                </div>
                <p class="profile__edit-content-socials-link-info-https">https://</p>
              </div>
              <input
                type="text"
                class="profile__edit-content-socials-link-value"
                placeholder="Website URL"
                v-model="user.instagram"
              >
            </div>

            <!--TWITTER-->

            <div class="profile__edit-content-socials-link">
              <div class="profile__edit-content-socials-link-info">
                <div class="profile__edit-content-socials-link-info-name">
                  <img src="/socials/twitter.svg" alt="twitter">
                  <h3>Twitter</h3>
                </div>
                <p class="profile__edit-content-socials-link-info-https">https://</p>
              </div>
              <input
                type="text"
                class="profile__edit-content-socials-link-value"
                placeholder="Website URL"
                v-model="user.twitter"
              >
            </div>
          </div>

          <!--SAVE CHANGE-->
          <button class="gradient-button profile__edit-content-save" @click="saveChanges">Save Changes</button>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      user: {
        name: '',
        bio: '',
        image: '',
        cover: '',
        telegram: '',
        instagram: '',
        twitter: ''
      }
    }
  },
  methods: {
    saveChanges() {
      this.$emit('saveChanges', this.user)
    }
  }
}
</script>
<style lang="scss">
.profile {
  &__edit {
    padding-top: 4rem;
    &-title {
      text-align: center;
      font-family: Cabin-Medium;
      font-weight: 500;
    }
    &-content {
      margin-top: 4rem;
      width: 91.5%;
      box-shadow: 0 .4rem 2.5rem rgba(28, 19, 39, 0.16);
      padding: 3.2rem 3.4rem 5rem;
      display: grid;
      grid-row-gap: 6.3rem;
      grid-template-rows: 8.1rem 21.1rem 13.7rem 12.1rem 25.4rem;
      margin-bottom: 13.2rem;
      &-socials {
        &-title {
          letter-spacing: 0.05em;
          width: 27.1rem;
          line-height: 2.3rem;
          padding-bottom: 1.8rem;
        }
        &-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: .1rem solid $modalColor;
          border-radius: .8rem;
          height: 5.4rem;
          margin-bottom: .5rem;
          &-info {
            padding: 1.9rem 1.8rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 27.3rem;
            &-name {
              display: flex;
              align-items: center;
              img {
                width: 2rem;
              }
              h3 {
                padding-left: 1rem;
                font-weight: 600;
                letter-spacing: 0.04em;
              }
            }
            &-https {
              color: $grayLight;
              opacity: .6;
            }
          }
          &-value {
            width: 42rem;
            height: 3rem;
            border-radius: .8rem;
            background: $modalColor;
            border: none;
            &::placeholder {
              color: $border;
            }
          }
        }
      }
      &-item {
        display: flex;
        justify-content: space-between;
        &-title {
          letter-spacing: 0.05em;
          width: 27.1rem;
        }
        &-subtitle {
          padding-top: 1rem;
          width: 27.1rem;
        }
        &-form {
          &-input {
            width: 34.4rem;
            margin-top: 1.5rem;
            height: 1.8rem
          }
          &-textarea {
            width: 34.4rem;
            margin-top: 1.5rem;
            height: 12rem;
          }
          &-length {
            text-align: right;
            padding-top: 1rem;
            color: $border;
          }
          &-image {
            width: 36.5rem;
            height: 11.2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border: .1rem dashed $border2;
            &-text {
              color: $grayLight;
            }
          }
        }
      }
      &-save {
        color: $pink;
        width: 16.4rem;
        height: 5.4rem;
        margin: auto;
        cursor: pointer;
      }
    }
  }
}
</style>
