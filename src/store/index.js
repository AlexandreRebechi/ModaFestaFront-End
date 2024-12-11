import Vue from "vue";
import Vuex from "vuex";
//import {products} from "../components/mosk/products.json"
import FotoDataService from "../services/FotoDataService";

Vue.use(Vuex);

const state = {
  products: [],
  cart: [],
  stores: [],
  currentProdutos: null
};



const getters = {
  products: (state) => state.products,
  cart: (state) => state.cart,
  stores: (state) => state.stores
};

const actions = {
  getProducts({ commit }) {
    commit("getProductData");
  },
  getstores({commit}){
    commit("getstoresData")
  },
  addItemTostores({commit}, item){
    commit("addTostores", item)
  },
  addItemToCart({ commit }, item) {
    commit("addToCart", item);
  },
  removeItemFromCart({ commit }, id) {
    commit("removeFromCart", id);
  },
  addstoresQty({ commit }, id) {
    commit("addstoresQty", id);
  },
  addQty({ commit }, id) {
    commit("addQty", id);
  },
  reduceQty({ commit }, id) {
    commit("reduceQty", id);
  },
  emptyCart({ commit }) {
    commit("emptyCart");
  }
};
const mutations = {
  getProductData(state) {
     /*  FotoDataService.list2().then(response =>{

          console.log("Retorno do seviço authenticateFoto", response.status);
          
         
          state.products = response.data
         console.log('state.products: '+ state.products.id)

      }).catch(response => {

          // error callback
          alert('Não conectou no serviço listarFotos');
          console.log(response);
      });*/
  
   
},
getstoresData(state){
  
},
  addToCart(state, item) {  
    const productInCart = state.cart.find((product) => product.id === item.id);
    if (!productInCart) {
      state.cart.push({ ...item, qty: 1 });
      localStorage.setItem("cart", JSON.stringify(state.cart))
    } else {
      productInCart.qty++;
    }
  },
  removeFromCart(state, id) {
    state.cart = state.cart.filter((item) => item.id !== id);
  },
  addQty(state, id) {
    const productInCart = state.cart.find((product) => product.id === id);
    productInCart.qty++;
  },
 
  reduceQty(state, id) {
    const productInCart = state.cart.find((product) => product.id === id);
    if (productInCart.qty > 1) {
      productInCart.qty--;
    } else {
      state.cart.splice(state.cart.indexOf(productInCart, 1));
    }
  },
  emptyCart(state) {
    state.cart = []
  },
  addToStores(state, id){
    const productInstores = state.stores.find((product) => product.id === item.id);
    if (!productInstores) {
      state.stores.push({ ...item, qty: 1 });
      console.log('state.stores: '+ state.stores)
    } else {
      productInCart.qty++;
    }
  },
  addStoresQty(state, id) {
    const productInstores = state.stores.find((product) => product.id === id);
    productInstores.qty++;
  },
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});