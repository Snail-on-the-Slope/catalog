<template>
  <div class="item">
    <div class="item__sale" v-if="data.sale"><p>Скидка</p></div>
    <div class="item__image">
      <img
        :src="require(`../assets/images/items/${data.image.url}`)"
        alt="pic"
      />
    </div>
    <div class="item__info">
      <div class="item__subtext" v-if="data.code">{{ data.code }}</div>
      <div class="item__name">{{ data.name }}</div>
      <div class="item__block item__block_between">
        <div class="item__block">
          <div class="item__price_old" v-if="data.price.old_price">
            {{ data.price.old_price }}
          </div>
          <div class="item__price">{{ data.price.current_price }}</div>
        </div>
        <div class="item__block">
          <div
            class="item__icon item__icon_cart"
            :class="{
              'item__icon_cart-add': cart,
            }"
            @click="chgCartState"
          ></div>
          <div
            class="item__icon item__icon_favorites"
            :class="{
              'item__icon_favorites-add': favorites,
            }"
            @click="chgFavoritesState"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data: () => ({
    cart: false,
    favorites: false,
  }),
  created() {
    if (localStorage.cart.includes(`/${this.data.id}/`)) this.cart = true;
    if (localStorage.favorites.includes(`/${this.data.id}/`))
      this.favorites = true;
  },
  methods: {
    chgCartState() {
      !this.cart
        ? ((localStorage.cart += `/${this.data.id}/`), (this.cart = true))
        : (localStorage.cart.replace(`/${this.data.id}/`, ""),
          (this.cart = false));
    },
    chgFavoritesState() {
      !this.favorites
        ? ((localStorage.favorites += `/${this.data.id}/`),
          (this.favorites = true))
        : (localStorage.favorites.replace(`/${this.data.id}/`, ""),
          (this.favorites = false));
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  padding: 10px 15px;
  border: 1px solid #888888;
  position: relative;
  margin-bottom: 40px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &__sale {
    padding: 5px 15px;
    background: #eb5757;
    color: #fff;
    font-weight: normal;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: 0.01em;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 10px;
    left: 0;
  }
  &__image {
    width: 238px;
    height: 237px;
    margin: 0 auto 25px;
    img {
      width: 100%;
      object-fit: contain;
    }
  }
  &__subtext {
    font-weight: normal;
    font-size: 10px;
    line-height: 14px;
    letter-spacing: 0.02em;
    color: #888888;
    margin-bottom: 10px;
  }
  &__name {
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 0.02em;
    color: #000;
    margin-bottom: 10px;
  }
  &__block {
    display: flex;
    align-items: center;
    &_between {
      justify-content: space-between;
    }
  }
  &__price {
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 0.02em;
    color: #000;
    &_old {
      text-decoration-line: line-through;
      color: #888888;
      margin-right: 10px;
    }
  }
  &__icon {
    width: 21px;
    height: 21px;
    cursor: pointer;
    &_cart {
      background: url("../assets/images/icons/cart.svg") no-repeat center;
      background-size: contain;
    }
    &_cart-add {
      background: url("../assets/images/icons/cart_checked.svg") no-repeat
        center;
    }
    &_favorites {
      background: url("../assets/images/icons/favorites.svg") no-repeat center;
      background-size: contain;
    }
    &_favorites-add {
      background: url("../assets/images/icons/favorites_checked.svg") no-repeat
        center;
      background-size: contain;
    }
    &:not(:last-child) {
      margin-right: 25px;
    }
  }
}
</style>