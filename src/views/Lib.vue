<template>
  <div class="lib">
    <Loader v-if="loading" />
    <div class="lib-page" v-else>
      <div class="lib__img">
        <img :src="lib.image.url" :alt="lib.image.title" />
      </div>
      <div class="lib__name">{{ lib.name }}</div>
      <div class="lib__text">
        <b>Описание:</b>
        <span v-html="lib.description"></span>
      </div>
      <div class="lib__text" v-if="lib.contacts.phones.value">
        <b>Номер:</b> {{ lib.contacts.phones.value }}
      </div>
      <div class="lib__text"><b>Адрес:</b> {{ lib.address.fullAddress }}</div>
      <div class="lib__text"><b>Юр лицо:</b> {{ lib.organization.name }}</div>
      <div class="lib__text"><b>ИНН:</b> {{ lib.organization.inn }}</div>
      <div class="lib__text"><b>Категория:</b> {{ lib.category.name }}</div>
    </div>
    <div class="button-reload" @click.prevent="goToHome">
      <p>Go To Home</p>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/app/Loader";
export default {
  name: "lib",
  data: () => ({
    loading: true,
    lib: null,
  }),
  async created() {
    if (this.$store.getters.libraries) {
      await this.$store.dispatch("fetchLibraries");
    }

    let item = await this.$store.dispatch(
      "fetchLibrarieById",
      this.$route.params.id
    );
    this.lib = this.$store.getters.librarieById;
    this.loading = false;
  },
  methods: {
    goToHome() {
      this.$router.push("/");
    },
  },
  components: {
    Loader,
  },
};
</script>

<style lang="scss" scoped>
.lib {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 90vh;
  &-page {
    color: #000;
    width: 95%;
    padding: 10px;
    border: 1px solid #000;
    border-radius: 0.5rem;
  }
  &__img {
    margin: 0 auto;
    img {
      width: 200px;
      height: 200px;
      object-fit: contain;
    }
  }
  &__image {
    height: 100%;
    opacity: 1;
    transition: opacity 0.5s ease 0s;
    object-position: center;
    object-fit: cover;
  }
  &__name {
    padding-bottom: 20px;
    font-size: 30px;
    font-weight: bold;
  }
  &__text {
    padding-bottom: 5px;
    font-size: 22px;
  }
}

.button-reload {
  display: flex;
  justify-content: center;
  width: 161px;
  height: 48px;
  background: #ddd;
  border-radius: 12px;
  position: fixed;
  bottom: 10px;
  right: 10px;
  p {
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 14px;
    color: #000;
    align-self: center;
    background: #ddd;
  }
  &:hover {
    cursor: pointer;
  }
  @media screen and (max-width: 425px) {
    .button-reload {
      width: 133px;
      height: 44px;
      p {
        font-size: 14px;
        line-height: 12px;
      }
    }
  }
}
</style>