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
                maxlength="200"
              ></textarea>
              <h4 class="profile__edit-content-item-form-length">{{ user.bio.length }}/200</h4>
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
              <input type="file" @change="previewFilesAvatar($event)" class="profile__edit-content-item-form-button">
              <div class="profile__edit-content-item-form-image">
                <p class="profile__edit-content-item-form-image-text" v-if="!user.image">Drag and drop an image <br> here, or click to browse.</p>
                <div class="profile__edit-content-item-form-image-info" v-else>
                  <img :src="user.image" alt="avatar" class="profile__edit-content-item-form-image-info-image">
                  <div class="profile__edit-content-item-form-image-info-text">
                    <p class="profile__edit-content-item-form-image-info-text-name">{{ avatarInfo.name }}</p>
                    <h3 class="profile__edit-content-item-form-image-info-text-button" @click="removeImage('avatar')">Delete</h3>
                  </div>
                </div>
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
              <input type="file" @change="previewFilesCover($event)" class="profile__edit-content-item-form-button">
              <div class="profile__edit-content-item-form-image">
                <p class="profile__edit-content-item-form-image-text" v-if="!user.cover">Drag and drop an image <br> here, or click to browse.</p>
                <div class="profile__edit-content-item-form-image-info" v-else>
                  <img :src="user.cover" alt="avatar" class="profile__edit-content-item-form-image-info-image">
                  <div class="profile__edit-content-item-form-image-info-text">
                    <p class="profile__edit-content-item-form-image-info-text-name">{{ coverInfo.name }}</p>
                    <h3 class="profile__edit-content-item-form-image-info-text-button" @click="removeImage('cover')">Delete</h3>
                  </div>
                </div>
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
                v-model="user.links.telegram"
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
                v-model="user.links.instagram"
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
                v-model="user.links.twitter"
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
      coverInfo: '',
      avatarInfo: '',
      user: {
        name: '',
        bio: '',
        image: '',
        cover: '',
        links: {
          telegram: '',
          instagram: '',
          twitter: ''
        }
      }
    }
  },
  methods: {
    saveChanges() {
      this.$emit('saveChanges', false)
      this.$store.commit('setUser', this.user)
    },
    previewFilesAvatar(event) {
      this.avatarInfo = event.target.files[0]
      if (event.target.files[0]) {
        this.user.image = URL.createObjectURL(event.target.files[0]);
      }
    },
    previewFilesCover(event) {
      this.coverInfo = event.target.files[0]
      if (event.target.files[0]) {
        this.user.cover = URL.createObjectURL(event.target.files[0]);
      }
    },
    removeImage(type) {
      if (type === 'avatar') {
        this.avatarInfo = '';
        this.user.image = '';
      } else {
        this.coverInfo = '';
        this.user.cover = '';
      }
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
          position: relative;
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
            &-info {
              display: flex;
              align-items: center;
              width: 35.5rem;
              padding-left: 1rem;
              position: relative;
              z-index: 2;
              cursor: pointer;
              &-image {
                width: 7.5rem;
                height: 7.5rem;
                object-fit: cover;
                border-radius: .4rem;
              }
              &-text {
                padding-left: 1.6rem;
                &-name {
                  font-size: 1.8rem;
                  color: $textColor;
                }
                &-button {
                  color: $border;
                  font-weight: bold;
                  font-family: OpenSans-Bold;
                  padding-top: .5rem;
                }
              }
            }
          }
          &-button {
            position: absolute;
            width: 36.5rem;
            height: 11.2rem;
            z-index: 1;
            opacity: 0;
            content: '';
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            cursor: pointer;
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
