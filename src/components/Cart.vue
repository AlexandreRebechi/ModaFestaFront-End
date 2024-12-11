<template>
  <div class="cart"  v-show="statusShowMenu()">
    <div v-if="!cart.length" class="alert alert-secondary" role="alert">Nenhum produto no carrinho!</div>
    <div
      v-if="orderPlaced"
      @click="() => this.orderPlaced=false"
      class="alert alert-success alert-dismissible fade show"
      role="alert"
    >
      Pedido realizado com sucesso!
      <button
        type="button"
        class="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
      <div v-if="showMenu()">
        <router-link to="/addreserva2" class="badge badge-success">Continuar ==></router-link>
      </div>
      <div v-else>
        <router-link to="/login" class="badge badge-danger"> fazer login ==></router-link>

      </div>
    </div>
    <ul class="list-group">
      <li class="list-group-item" v-for="item in cart" :key="item.id">
        <button
          @click="removeItemFromCart(item.id)"
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <div class="media">
          <img width="80px" :src="item.b64" class="mr-3" alt="item.title" />
         
          <div class="media-boby">
            <p class="h5">{{ item.descricao }}</p>
          </div>
          
         <!-- <div class="media-body">
            <p class="mt-0">{{ item.title }}</p>
            <button class="qty-button btn btn-sm btn-secondary" @click="reduceQty(item.id)">-</button>
            x {{ item.qty }}
            <button
              class="qty-button btn btn-sm btn-secondary"
              @click="addQty(item.id) || addstoresQty(item.id)"
            >+</button>
          </div>-->
        </div>
            
         
      </li>
    </ul>
    <button
      v-if="cart.length"
      @click="placeOrder"
      class="checkout-button btn btn-lg btn-block btn-success"
      :disabled="isProcessing"
    >
      <div v-if="isProcessing" class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <span v-else>Checkout (R$ {{ totalPrice.toLocaleString() }})</span>
    </button>

  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Cart",
  data() {
    return {
      isProcessing: false,
      orderPlaced: false,
      pessoas: [],
      currentLogin: null,
      autenthicate: false
    };
  },
  computed: {
    ...mapGetters(["cart"]),
    totalPrice() {
      return this.cart.reduce((a, b) => a + b.qty * b.valor_custo, 0);
    }
  },
  methods: {
    ...mapActions(["removeItemFromCart", "addQty", "reduceQty", "emptyCart", "addstoresQty"]),
    placeOrder() {
      this.isProcessing = true;
      setTimeout(() => {
        this.isProcessing = false;
        this.orderPlaced = true;
        
     //   this.emptyCart();
      }, 1000);
    },
    showMenu() {
      console.log(localStorage.getItem('authUser'))
      if (localStorage.getItem('authUser')) {

        return this.autenthicate = true;


      } else {
        //this.emptyCart();
        return this.autenthicate = false;
      }

    },
    statusShowMenu() {
     


      let aux = localStorage.getItem('authUser')
      if (localStorage.getItem('authUser') == null) {
        return true
     } else {
      if (aux.includes('C')) {
      
      return true
    } else {
      this.emptyCart();
      return false
    }
     }

    },
  }
};
</script>

<style scoped>
.media {
  width: 90%;
  text-align: left;
}

.qty-button {
  border-radius: 50%;
  width: 30px;
}

.checkout-button {
  margin-top: 20px;
}
</style>