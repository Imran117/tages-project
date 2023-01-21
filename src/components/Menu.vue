<template>
  <main class="main">
    <section class="main__sort">
      <div class="main__sort-field">
        <p class="main__sort-name">Сортировать по:</p>
        <div class="main__sort-wrapper">
          <select class="main__sort-select" @change="changePosition($event)">
            <option value="top">Цена по возрастанию</option>
            <option value="bottom">Цена по убыванию</option>
          </select>
        </div>
      </div>
      <div class="main__sort-field">
        <p class="main__sort-name">Материал</p>
        <div class="main__sort-wrapper">
          <select class="main__sort-select" @change="changeProd($event)">
            <option value="2">Металл</option>
            <option value="1">Дерево</option>
          </select>
        </div>
      </div>
    </section>
    <section class="main__wrap">
      <Product :prod="prodArray" :position="position"/>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, computed} from "vue";
import { useStore } from "vuex";
import Product from "@/components/Product.vue";
export default defineComponent({
  name: "Menu",
  components: {
    Product,
  },
  setup(props, { emit }) {
    let position = ref('top')
    const state = useStore(),
          prodArray = computed(() => state.getters.getFilterProduct),



    changeProd = (event: any) => state.commit("setMaterial", event.target.value),
    changePosition = (event: any) : void => position.value = event.target.value
    
    return {
      prodArray,
      changeProd,
      changePosition,
      position
    };
  },
});
</script>

<style>
</style>