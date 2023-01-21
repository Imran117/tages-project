<template>
  <div
    class="main__wrap-block"
    v-for="(elem, index) in sortProduct" :key="index">
    <p class="main__wrap-sales" v-if="elem.price.old_price != null">Скидка</p>
    <div class="main__wrap-image">
      <img :src="require(`@/assets/image${elem.image.url}`)" :alt="elem.name" />
    </div>
    <div class="main__wrap-sub">
      <p class="main__wrap-code">{{ elem.code }}</p>
      <h3 class="main__wrap-name">{{ elem.name }}</h3>
      <div class="main__wrap-bottom">
        <p class="main__wrap-price">
          <span class="main__wrap-saleprice" v-if="elem.price.old_price != null"
            >{{ Math.floor(elem.price.old_price)}}&#8381;
          </span>
          <span>{{ Math.floor(elem.price.current_price)}}&#8381;</span>
        </p>

        <div class="main__wrap-items">
          <button class="main__wrap-btn" @click="addBasket(elem)">
            <img
              v-if="selectedProducts.basket.find((el:any) => el.id == elem.id)"
              src="@/assets/image/sucsess-icon.svg"
              alt=""
            />
            <img v-else src="@/assets/image/basket-icon.svg" alt="" />
          </button>
          <button class="main__wrap-btn" @click="addFavorites(elem)">
            <img src="@/assets/image/like-icon.svg" alt="" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect, computed } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "Product",
  props: {
    prod: {
      type: Array,
      required: true,
    },
    position: {
      type: String,
      default: "top",
    },
  },
  setup(props, contex) {
    const position = ref(""),
      elements = ref(),
      store = useStore(),
      sortProduct = computed(() => {
        return position.value == 'top' 
        ? elements.value.sort((a: any, b: any) => a.price.current_price - b.price.current_price) 
        : elements.value.sort((a: any, b: any) => a.price.current_price - b.price.current_price).reverse()
      }),
      selectedProducts = computed(() => store.state),
      addBasket = (elem: object | any) => {
        elem.selected = true;
        store.commit("addBasketToStorage", {
          el: elem,
          storeName: "basket",
        });
      },
      addFavorites = (elem: object | any) => {
        store.commit("addBasketToStorage", {
          el: elem,
          storeName: "favorites",
        });
      }; 
      watchEffect(() => (elements.value = props.prod));
      watchEffect(() => (position.value = props.position));
    return {
      elements,
      position,
      selectedProducts,
      sortProduct,
      addBasket,
      addFavorites,
    };
  },

  created() {
    const store = useStore();
    if (localStorage.getItem("basket") !== null) {
      const localData = localStorage.getItem("basket");
      store.commit("addStorage", {
        el: localData,
        storeName: "basket",
      });
    }
    if (localStorage.getItem("favorites") !== null) {
      const localData = localStorage.getItem("favorites");
      store.commit("addStorage", {
        el: localData,
        storeName: "favorites",
      });
    }
  },
});
</script>

<style>
</style> 