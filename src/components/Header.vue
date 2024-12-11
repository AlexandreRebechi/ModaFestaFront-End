<template>
    <header>
      <nav class="navbar navbar-light bg-light">
        <span class="navbar-brand mb-0 h1">Shop</span>
        <span class="navbar-brand mb-0 h1" v-if="showMenu()">
          Carrinho <span class="badge badge-primary">{{ totalQty }}</span>
        </span>
        <span class="navbar-brand mb-0 h1" v-else>
          Carrinho <span class="badge badge-primary">{{ totalQty =0 }}</span>
        </span>
      </nav>
    </header>
  </template>
  
  <script>
  import { mapGetters } from "vuex";
  
  export default {
    name: "Header",
    computed: {
      ...mapGetters(["cart"]),
      totalQty() {
        return this.cart.reduce((a, b) => a + b.qty, 0);
      },
    },
    methods: {
      showMenu() {
      console.log(localStorage.getItem('authUser'))
      if (localStorage.getItem('authUser')) {

        return this.autenthicate = true;


      } else {
        //this.emptyCart();
        return this.autenthicate = false;
      }

    }
    }
  };
  </script>
  
  <style scoped>
  header {
    margin-bottom: 10vh;
  }
  </style>