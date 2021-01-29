<template>
  <div class="main">
    <div class="main__location">
      Главная / Системы хранения / <span>Комплекты стеллажных систем</span>
    </div>
    <div class="main__title">Комплекты стеллажных систем</div>
    <div class="main__container">
      <Loader v-if="loading" />
      <Catalog v-else />
    </div>
  </div>
</template>

<script>
import Catalog from "@/components/Catalog";
import Loader from "@/components/app/Loader";

export default {
  name: "Main",
  data: () => ({
    loading: true,
    error: false,
  }),
  async mounted() {
    if (this.$store.getters.catalog) {
      await this.$store.dispatch("fetchCatalog");
      await this.$store.dispatch("fetchMaterial");
      await this.$store.dispatch("fetchCatalogByType");
    }
    if (!localStorage.cart) {
      localStorage.cart = "";
      localStorage.favorites = "";
    }
    this.loading = false;
  },
  components: {
    Catalog,
    Loader,
  },
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 30px auto 0;
  width: 100%;

  &__location {
    font-weight: normal;
    font-size: 16px;
    line-height: 16px;
    color: #828282;
    margin-bottom: 10px;
    span {
      color: #000000;
    }
  }
  &__title {
    font-weight: bold;
    font-size: 36px;
    line-height: 48px;
    font-feature-settings: "ss04" on;
    color: #000000;
    margin-bottom: 15px;
  }
  &__container {
  }
}
</style>


