<template>
  <div class="item" @click="goToLotPage">
    <h2 class="item__name">{{ data.name }}</h2>
    <h2 class="item__address">Адрес: {{ data.address.fullAddress }}</h2>
  </div>
</template>

<script>
export default {
  props: ["data"],
  methods: {
    goToLotPage() {
      this.$router.push("/lib/" + this.data.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  border-radius: 0.5rem;
  width: 370px;
  margin-right: 20px;
  margin-bottom: 20px;
  padding: 10px;
  overflow: hidden;
  color: #000;
  border: 1px solid #000;

  &__name {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0 auto 10px;
  }
  &__address {
    font-size: 1.4rem;
    font-weight: 300;
    margin: 0 auto;
  }
}

@media (max-width: 800px) {
  .item {
    width: 285px;
    flex-direction: column;
    padding-right: 0;
    padding-bottom: 5px;

    &__name {
      font-size: 24px;
    }
    &__address {
      font-size: 20px;
    }
  }
}
</style>