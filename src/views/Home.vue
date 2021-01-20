<template>
  <div class="container">
    <div>
      <h1 class="title">catalog of libraries</h1>
    </div>
    <div class="app-main-layout">
      <Loader v-if="loading" />
      <Libraries v-else />
    </div>
  </div>
</template>

<script>
import Libraries from "@/components/Libraries";
import Loader from "@/components/app/Loader";

export default {
  name: "Home",
  data: () => ({
    loading: true,
    error: false,
  }),
  async mounted() {
    if (this.$store.getters.libraries) {
      await this.$store.dispatch("fetchLibraries");
      await this.$store.dispatch("fetchLibrarieByType");
    }
    this.loading = false;
  },
  components: {
    Libraries,
    Loader,
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  padding-top: 50px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  background: #51627412;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 70px;
  color: #35495e;
  letter-spacing: 1px;

  @media (max-width: 400px) {
    font-size: 40px;
  }
}
</style>


