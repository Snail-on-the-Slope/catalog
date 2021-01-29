<template>
  <div class="catalog">
    <div class="catalog__select-container">
      <div class="catalog__select">
        <div class="catalog__subtitle">Сортировать по:</div>
        <select name="price" v-model="sortPrice">
          <option value="all">---</option>
          <option v-for="(t, i) in sortPriceItems" :key="i" :value="t.value">
            {{ t.name }}
          </option>
        </select>
      </div>
      <div class="catalog__select">
        <div class="catalog__subtitle">Материал:</div>
        <select name="material" v-model="sortMaterial">
          <option value="all">---</option>
          <option v-for="t in sortMaterialItems" :key="t.id" :value="t.id">
            {{ t.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="catalog__content" id="items" :key="componentKey">
      <Item v-for="(e, idx) in currentItems" :key="idx" :data="e" />
    </div>
  </div>
</template>

<script>
import Item from "@/components/ItemDetail.vue";

export default {
  name: "Catalog",
  data: () => ({
    sortPrice: "",
    sortMaterial: "",
    sortPriceItems: [
      { value: "increase", name: "Цена по возрастанию" },
      { value: "decrease", name: "Цена по убыванию" },
    ],
    sortMaterialItems: [],
    componentKey: 0,
  }),
  mounted() {
    this.sortMaterialItems = this.$store.getters.materials;
    this.sortPrice = this.$store.getters.sortPriceType;
    this.sortMaterial = this.$store.getters.sortMaterialType;
  },
  watch: {
    sortPrice() {
      this.$store.dispatch("sortCatalog", this.sortPrice);
      this.componentKey += 1;
    },
  },
  computed: {
    currentItems() {
      this.componentKey += 1;
      return this.sortMaterial === "all"
        ? this.$store.getters.catalog
        : this.$store.getters.catalogByType(this.sortMaterial);
    },
  },
  components: {
    Item,
  },
};
</script>

<style lang="scss" scoped>
.catalog {
  &__select-container {
    margin-bottom: 40px;
    display: flex;
    align-items: center;
    @media (max-width: 640px) {
      flex-direction: column;
      align-items: flex-start;
    }
  }
  &__select {
    &:not(:last-child) {
      margin-right: 40px;
    }
    @media (max-width: 640px) {
      &:not(:last-child) {
        margin-right: 0;
        margin-bottom: 20px;
      }
    }
  }
  &__subtitle {
    font-weight: normal;
    font-size: 12px;
    line-height: 18px;
    letter-spacing: 0.03em;
    color: #4f4f4f;
    margin-left: 15px;
    margin-bottom: 10px;
  }
  select {
    position: relative;
    background-color: #f2f2f2;
    height: 40px;
    width: 288px;
    padding: 0 16px;
    border: none;
    option {
      font-weight: normal;
      font-size: 14px;
      line-height: 21px;
      letter-spacing: 0.03em;
      color: #000000;
    }
  }
  &__content {
    display: flex;
    justify-content: space-between;
    // align-items: center;
    flex-wrap: wrap;
    @media (max-width: 800px) {
      justify-content: space-around;
    }
  }
}

// .content {
//   margin: 0 auto;
//   padding-top: 20px;
//   max-width: 1300px;
//   width: 100%;
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: space-between;

//   @media (max-width: 1300px) {
//     justify-content: space-around;
//   }
// }

// .type-container {
//   display: flex;
//   justify-content: space-around;
//   align-items: center;
//   max-width: 1200px;
//   margin: 0 auto;
//   .text {
//     display: flex;
//     align-items: center;
//     h1 {
//       font-style: normal;
//       font-weight: bold;
//       font-size: 40px;
//       color: #000;
//       margin-right: 5%;
//     }
//     select {
//       border: 1px solid #000;
//       background-color: transparent;
//       font-style: normal;
//       font-weight: bold;
//       font-size: 24px;
//       color: #000;
//       margin-top: 2px;
//       padding-right: 10px;
//       max-width: 250px;
//       height: 60px;
//     }
//     img {
//       width: 12px;
//       height: 8px;
//       margin-top: 5px;
//     }
//   }

//   .sort {
//     &:hover {
//       cursor: pointer;
//     }
//     img {
//       width: 45px;
//       height: 45px;
//     }
//   }
//   @media (max-width: 800px) {
//     .text {
//       flex-direction: column;
//       h1 {
//         font-size: 30px;
//       }
//     }
//   }
// }
</style>