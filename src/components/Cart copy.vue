<template>
 
    <div>
    
      <b-container>
        <b-row>
          <b-col>
            <h2>Imagens</h2>
          </b-col>
        </b-row>
  
        <b-row>
          <b-col v-for="(f, indice) in fotos" :key ="f.id" :class="{ active: indice == currentIndex }">
         
            <b-card
            :title= f.descricao
            :img-src= f.b64
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
            >
            <b-card-text>
              valor: {{ f.valor_custo }}
            </b-card-text>
          
            <b-button @click=" addItemToCart(f.produto_id)"  href="#"
            variant="primary">
            <BIconCartPlus></BIconCartPlus>
              ADD to Cart
            </b-button>
            <b-button @click=" removeCart(f.produto_id)" href="#"
            variant="danger">
            <BIconCartX></BIconCartX>
              Remove
            </b-button>
  
  
            </b-card>
           
  
          </b-col>
        
        </b-row>
        
      </b-container>
      <!--<Add2/>-->
    </div>
    
    
    
  </template>
  
  <script>
  import { BRow, BCol, BCard, BContainer, BTable, BImg } from 'bootstrap-vue';
  //import CardBTN from '../components/CardBTN.vue'
  import Add2 from './reserva/Add2.vue';
  import { BCardText } from 'bootstrap-vue';
  import { BButton } from 'bootstrap-vue';
  import {BIconCartCheck, BIconCartPlus, BIconCartX} from 'bootstrap-vue'
  import Vue from 'vue';
  import FotoDataService from '../services/FotoDataService';
  import { mapGetters } from 'vue';
  
  export default {
    
    name: 'home', 
    setup() {
      
    },
    data() {
               return {
                   fotos: [],
                   produtos: [],
                   pessoas: [],
                   cart: [],
                   currentLogin: null,
                   currentFoto: null,
                   currentIndex: -1,
                   imageSrc: null
               }
           },
           components:{
            BRow, BCol, BCard, BContainer, BCardText, BButton, Add2,BImg , BIconCartCheck, BIconCartPlus,BTable,BIconCartX,
              totalQty() {
        return this.cart.reduce((a, b) => a + b.qty, 0);
      },
      },
     
      methods: {
        statusShowMenu() {
      PessoaDataService.t
     this.currentLogin = JSON.parse(localStorage.getItem('authUser'))
      console.log('this.currentLogin objeto: '+ this.currentLogin.cpf)


      let aux = localStorage.getItem('authUser', this.pessoas.tipo)
      if (aux.includes('F') || aux.includes('C')) {
        return true

      } else {
        alert('Tem que fazer login ou se cadastrar para realizar a escolha')
        return false
      }

    },
        addItemToCart(item) {
        
          if (localStorage.getItem("cart") == null) {
              localStorage.setItem("cart", JSON.stringify([]))
          } else {
            this.cart = JSON.parse(localStorage.getItem("cart"))
          }
         // console.log(item)
    
              this.cart.push({item})
          
         
          
          localStorage.setItem("cart", JSON.stringify(this.cart))
          console.log(localStorage.getItem("cart"))
    },
    somaCart(s){
      let soma = s
      soma = parseFloat(soma)
      soma ++
      console.log('soma: '+ soma)
    },
    showStore(p){
      localStorage.setItem('store', JSON.stringify(p)); 
    },
    removeCart(item){
        localStorage.removeItem('cart', item.id)
    },
       selectProdutos(p){
          console.log(p)
       },
        uploadImage() {    
        var file = document
          .querySelector('input[type=file]')
          .files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
          imageSrc = e.target.result             
        };
        reader.onerror = function(error) {
          alert(error);
        };
        reader.readAsDataURL(file);      
      },
    
  
              listarFotos(){
  
                  FotoDataService.list2().then(response =>{
  
                      console.log("Retorno do seviço authenticateFoto", response.status);
  
                     this.fotos = response.data;
                    
                  }).catch(response => {
  
                      // error callback
                      alert('Não conectou no serviço listarFotos');
                      console.log(response);
                  });
              },
              setCurrentFoto(foto, index){
  
                  this.currentFoto = foto;
                  this.currentIndex = index;
              },
              remFoto(foto, index){
  
                  FotoDataService.delete(foto.id)
                  .then(response => {
                      alert('Erro ao remover foto: '+e)
                      console.log(response.data);
                      this.refreshList();
                  })
                  .catch(e => {
                      console.log(e);
                  });
  
              },
              refreshList() {
                  this.listarFotos();
                  this.currentTutorial = null;
                  this.currentIndex = -1;
              }
  
           },
           mounted() {
              this.listarFotos();
              this.showStore();
           }
  }
  </script>
  
  
  