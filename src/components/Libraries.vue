<template>
  <div class="libraries">
    <div class="type-container">
      <div class="text">
        <h1>Местоположение:</h1>
        <select name="categories" v-model="typeName">
          <option value="all">Все</option>
          <option v-for="(t, i) in type" :key="i" :value="t">{{ t }}</option>
        </select>
      </div>
      <div class="sort" @click.prevent="sortedLibs">
        <img
          src="@/assets/image/sort-alpha-down-solid.svg"
          alt="sort"
          v-if="sort || sort === null"
        />
        <img
          src="@/assets/image/sort-alpha-down-alt-solid.svg"
          alt="sort"
          v-else
        />
      </div>
    </div>
    <div class="content" id="items">
      <Item v-for="(e, idx) in getLib" :key="idx" :data="e" />
    </div>
  </div>
</template>

<script>
import Item from "@/components/ItemLibrarie.vue";

export default {
  name: "libraries",
  data: () => ({
    type: [],
    typeName: "all",
    sort: null,
  }),
  mounted() {
    this.type = this.$store.getters.typeNameLibraries;
  },
  computed: {
    getLib() {
      return this.typeName === "all"
        ? this.$store.getters.libraries
        : this.$store.getters.librariesByType(this.typeName);
    },
  },
  methods: {
    sortedLibs() {
      this.sort === null || this.sort === false
        ? (this.$store.dispatch("sortLibraries", [true, this.typeName]),
          (this.sort = true))
        : (this.$store.dispatch("sortLibraries", [false, this.typeName]),
          (this.sort = false));
      console.log("this.sort", this.sort, this.typeName);
    },
  },
  components: {
    Item,
  },
};
</script>

<style lang="scss" scoped>
.content {
  margin: 0 auto;
  padding-top: 20px;
  max-width: 1300px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (max-width: 1300px) {
    justify-content: space-around;
  }
}

.type-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  .text {
    display: flex;
    align-items: center;
    h1 {
      font-style: normal;
      font-weight: bold;
      font-size: 40px;
      color: #000;
      margin-right: 5%;
    }
    select {
      border: 1px solid #000;
      background-color: transparent;
      font-style: normal;
      font-weight: bold;
      font-size: 24px;
      color: #000;
      margin-top: 2px;
      padding-right: 10px;
      max-width: 250px;
      height: 60px;
    }
    img {
      width: 12px;
      height: 8px;
      margin-top: 5px;
    }
  }

  .sort {
    &:hover {
      cursor: pointer;
    }
    img {
      width: 45px;
      height: 45px;
    }
  }
  @media (max-width: 800px) {
    .text {
      flex-direction: column;
      h1 {
        font-size: 30px;
      }
    }
  }
}
</style>