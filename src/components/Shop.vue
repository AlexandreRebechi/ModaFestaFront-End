<template>
  <div>
    <b-container>
        <b-row>
          <b-col>
            <h2>Imagens</h2>
          </b-col>
        </b-row>
  
        <b-row>
          <b-col v-for="(f, indice) in produto" :key ="f.id" :class="{ active: indice == currentIndex }" v-if="f.produto_id == f.id">
          
            <b-card
            :title= f.descricao
            :img-src= f.b64
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
            >
            valor R$: {{ f.valor_custo }}
          
            <b-button @click=" addItemToCart(f) || addItemToStore(f)" v-show="statusShowMenu()" href="#"
            variant="primary">
            <BIconCartPlus></BIconCartPlus>
              Adicionar no Carinho
            </b-button>
         <!--  <b-button @click=" removeFromCart(f) || removeFromStore(f)" href="#"
            variant="danger">
            <BIconCartX></BIconCartX>
              Remove
            </b-button> -->
  
  
            </b-card>
           
  
          </b-col>
        
        </b-row>
        
      </b-container>
  </div>
  <!-- <div class="row">
    <div class="card" 
    style="width: 15rem;" 
    v-for="p in produto" 
    :key="p.id"
    >
      <label for="">id {{ p.id }}</label>
      <img :src="p.b64" class="card-img-top" :alt="p.descricao" />
      <div class="card-body">
        <p class="card-title">{{ p.descricao }}</p>
        <p class="card-text">$ {{ p.price.toLocaleString() }}</p>
        <button class="btn btn-primary" @click="addItemToCart(p)">
          Add to cart
        </button>
      </div>
    </div>
  </div>-->
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { BContainer, BRow, BCol, BCard, BButton, BIconCartPlus, BIconCartX } from "bootstrap-vue";
import FotoDataService from '../services/FotoDataService';

export default {
  name: "Shop",
  data() {
             return {
                 produto: [],
                 currentFoto: null,
                 currentIndex: -1
             }
         },
         components:{
    BContainer, BRow, BCol, BCard, BButton, BIconCartPlus, BIconCartX
  },

  methods: {
    ...mapActions(["addItemToCart", "emptyCart"]),
    listarFotos(){

FotoDataService.list2().then(response =>{

    console.log("Retorno do seviço authenticateFoto", response.status);

    this.produto = response.data;
    console.log(this.produto)
}).catch(response => {

    // error callback
    alert('Não conectou no serviço listarFotos');
    console.log(response);
});
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
  },
    
         
           
          
  mounted() {
   /// this.getProducts();
    this.listarFotos();

  },
  computed: {
    ...mapGetters(["products"]),
  },
 
 

}
</script>

<style scoped>
.card {
  padding: 20px;
  border: none;
}
</style>