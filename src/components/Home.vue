<template>
  <div id="home">
    <Header/>
    <div class="main">
      <div class="container">
        <div class="row">
          <div class="col-8"><Shop /></div>
          <div class="col-4"><Cart /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Shop from "../components/Shop.vue";
import Cart from "../components/Cart.vue";

export default {
  name: "home",
  components: {
    Shop,
    Header,
    Cart,
  },
};
</script>

<style>
#home {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>