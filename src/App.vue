<template>
  <div class="container">
    <Navbar/>
    <Menu/>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref} from "vue";
import Navbar from "@/components/Navbar.vue";
import Menu from "@/components/Menu.vue";

export default defineComponent({
  name: "App",
  components: {
    Navbar,
    Menu,
  },
  setup(_, contex) {}
});
</script>

<style lang="scss">

</style>
