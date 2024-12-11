<template>




  <div id="app">

    <!--navbar-->
    <nav class="navbar navbar-expand-sm" style="background-color: blueviolet;">
      <a class="navbar-brand mb-0 h1" href="#">Vestidos Noivas</a>

      <button class="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId"
        aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation"></button>
      <div class="collapse navbar-collapse" id="collapsibleNavId">
        <template>
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">

            <li class="nav-item active">
              <a class="nav-link" v-show="showMenu() && statusShowMenu()" href="#">Home <span class="sr-only">(
                  )</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" v-show="showMenu() && statusShowMenu()" href="#">Link</a>
            </li>
            <div>


            </div>


            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" v-show="showMenu()" href="#" id="dropdownId" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">Classes</a>
              <div class="dropdown-menu" aria-labelledby="dropdownId">
            <li class="nav-item">

              <router-link class="dropdown-item" to="/clientes"
                v-show="showMenu() && statusShowMenu()">Cliente</router-link>
            </li>
            <li class="nav-item">
              <router-link class="dropdown-item" to="/funcionarios"
                v-show="showMenu() && statusShowMenu()">Funcionario</router-link>
            </li>
            <li class="nav-item">
              <router-link class="dropdown-item" to="/perfis"
                v-show="showMenu() && statusShowMenu()">Perfil</router-link>
            </li>
            <li class="nav-item">
              <router-link class="dropdown-item" to="/funcionalidades"
                v-show="showMenu() && statusShowMenu()">Funcionalidade</router-link>
            </li>

            <li class="nav-item">
              <router-link class="dropdown-item" to="/reservas"
                v-show="showMenu() && statusShowMenu()">Reservas</router-link>
            </li>
            <li class="nav-item">
              <router-link class="dropdown-item" to="/reservabycliente/:cpf"
                v-show="showMenu() && !statusShowMenu()">Reserva By Cliente</router-link>
            </li>
            <li class="nav-item">
              <router-link class="dropdown-item" to="/minhaslocacoes/:cpf"
                v-show="showMenu() && !statusShowMenu()">Minhas Locacoes</router-link>
            </li>
            <li class="nav-item">
              <router-link class="dropdown-item" to="/produtos"
                v-show="showMenu() && statusShowMenu()">Produto</router-link>
            </li>
            <li class="nav-item">
              <router-link class="dropdown-item" to="/fotos" v-show="showMenu() && statusShowMenu()">Foto</router-link>
            </li>
            <li class="nav-item">
              <router-link class="dropdown-item" to="/tiposprodutos" v-show="showMenu() && statusShowMenu()">Tipos
                Produto</router-link>
            </li>
            <li class="nav-item">
              <router-link class="dropdown-item" to="/locacoes"
                v-show="showMenu() && statusShowMenu()">Locacao</router-link>
            </li>
            <li class="nav-item">
            <router-link class="dropdown-item" to="/acompanhamentosbylocacao"
              v-show="showMenu() && statusShowMenu()">Acompanhamento</router-link>
          </li>
         <!-- <li class="nav-item">
            <router-link class="dropdown-item" to="/situacoes"
              v-show="showMenu() && statusShowMenu()">Sitacao</router-link>
          </li>
          <li class="nav-item">
            <router-link class="dropdown-item" to="/parcelamentos"
              v-show="showMenu() && statusShowMenu()">Parcelamento</router-link>
          </li>-->


            <li class="nav-item">
              <router-link class="dropdown-item" to="/" v-on:click.native="logout()" v-show="showMenu() "
                replace>Logout</router-link>
            </li>

      </div>
      </li>
      </ul>
      <ul>
       
      </ul>
      <div  v-if="!showMenu() || statusShowMenu()">
        <form class="form-inline my-2 my-lg-0" >
        <ul>
          <a class="btn btn-primary" href="/login" v-show="!showMenu()">Login</a>
        </ul>


        <ul>
          <a class="btn btn-primary btn-lg active" href="/cadastro" v-show="!showMenu()">Cadastro</a>
        </ul>
        <ul>

        </ul>


      </form>
      </div>
      <div v-else>
        <table class="table table-striped table-inverse  table-success">
                <thead class="thead-inverse ">
                    <tr>
                        <th scope="col">Nome Cliente</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="p in pessoas" :key="p.cpf" v-show="userName(p.cpf)">
                        <td>{{ p.nome_cliente }}</td>
                    </tr>
                </tbody>
            </table>
      </div>
    
</template>


</div>
</nav>

<div class="container mt-3">
  <router-view />
</div>

</div>
</template>

<script>

import Login from './components/Login.vue';
import LoginDataService from './services/LoginDataService';
import ClienteDataService from './services/ClienteDataService';
import PessoaDataService from './services/PessoaDataService';
import FuncionarioDataService from './services/FuncionarioDataService';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import { BIconCartCheck } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { mapGetters, mapActions } from "vuex";





export default {

  name: "App",
  data() {
    return {
      pessoas: [],
      currentLogin: null,
      currentUser: null,
      currentLogin2: null,
      currentPessoa: null,
      autenthicate: false
    }
  },
  components: {
    BIconCartCheck,
    ...mapGetters(["cart"]),
    totalQty() {
      return this.cart.reduce((a, b) => a + b.qty, 0);
    },

  },
  
  methods: {
   ...mapActions(["emptyCart"]),
    
    userName(p) {
      this.currentUser = JSON.parse(localStorage.getItem('authUser'))
      if (localStorage.getItem('authUser')) {
      // let aux = localStorage.getItem('authUser')
      if (p == this.currentUser.cpf) {
          return true
        } else {
          return false          
        }  
      } 
      
        
   },
    msgReservaByCliente() {
  //    console.log("/reservabycliente/:" + this.currentLogin)
      return "/reservabycliente/:" + this.currentLogin
    },
    /*setCurrentLogin(pessoa, index) {

      this.currentLogin = pessoa;
      this.currentIndex = index;
    },*/
    logout() {
      localStorage.removeItem('authUser');
      this.emptyCart();
      this.$router.push({ name: "login" });
    },
    listPessoa() {
      PessoaDataService.list().then(response => {

        console.log("Retorno do seviço authenticatePessoa", response.status);

        this.currentPessoa = response.data;

      }).catch(response => {

        // error callback
        alert('Não conectou no serviço listPessoa');
        console.log(response);
      });
    },

    showStore() {
      return localStorage.getItem('cart')

    },
    statusShowMenu() {
      PessoaDataService.t
      this.currentLogin = JSON.parse(localStorage.getItem('authUser'))
//      console.log('this.currentLogin objeto: ' + this.currentLogin.cpf)


      let aux = localStorage.getItem('authUser', this.pessoas.tipo)
      if (aux.includes('F')) {
        return true
      } else {
        return false
      }

    },
    showMenu() {
     // console.log(localStorage.getItem('authUser'))
      if (localStorage.getItem('authUser')) {

        return this.autenthicate = true;


      } else {

        return this.autenthicate = false;
      }

    },
    listarCliente() {

ClienteDataService.list().then(response => {

    console.log("Retorno do seviço authenticateCliente", response.status);

    this.pessoas = response.data;

}).catch(response => {

    // error callback
    alert('Não conectou no serviço listCliente');
    console.log(response);
});
}

  },
  
  mounted() {
    this.listarCliente()
    this.userName()
  }

}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;


}
</style>
