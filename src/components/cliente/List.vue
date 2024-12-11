<template>
    <div id="tab_aut">


        <div id="tab" class="table-responsive" >
            <h4>Listagem de Clientes</h4>
            <table class="table table-striped table-inverse  table-primary">
                <thead class="thead-inverse">
                    <tr>

                        <th scope="col">cpf</th>
                        <th scope="col">nome</th>
                        <th scope="col">email</th>
                        <th scope="col">telefone</th>
                        <th scope="col">data_cadastro</th>
             
                        <th scope="col">data_ultimo_login</th>
                        <th scope="col">Alterar</th>
                        <th scope="col">Remover</th>
                       
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(p, indice) in pessoas" :key="p.cpf" :class="{ active: indice == currentIndex }" >

                        <td>{{ p.cpf }}</td>
                        <td>{{ p.nome_cliente }}</td>
                        <td>{{ p.email }}</td>
                        <td>{{ p.telefone }}</td>
                        <td>{{ p.data_cadastro | formataData}}</td>
       
                        <td>{{ p.data_ultimo_login | formataData }}</td>
                        <td> <button v-on:click="setCurrentCliente(p, indice)" class="btn btn-warning"
                                type="button" ><b-icon-pencil-square></b-icon-pencil-square></button></td>
                        <td><button v-on:click="remCliente(p, indice) && statusShowMenu()" class="btn btn-danger" type="button"><b-icon-trash></b-icon-trash></button></td>
                  
                       
                   
                    </tr>
                </tbody>
            </table>
            
        </div>
        <div>
         
           
            
        </div>
        <div class="col-md-6">
            <div v-if="currentCliente && statusShowMenu()">

                <h4>Cliente</h4>
                <div>
                    <label><strong>Username:</strong></label> {{ currentCliente.username }}
                </div>
                <div>
                    <label><strong>Data de Cadastro:</strong></label> {{ currentCliente.data_cadastro }}
                </div>
                <div>
                    <label><strong>Observacoes:</strong></label> {{ currentCliente.observacoes }}
                </div>
                <!--<div>
                    <label><strong>Tipo Pessoa: </strong>{{ currentCliente.cliente.tipo}}</label>
                </div>
                <div v-if="currentCliente.cliente.tipo == F">
                    <label><strong>Pessoa Fisica</strong>{{ currentCliente.cliente.tipo }}</label>
                </div>
                <div v-else>
                    <label><strong>Pessoa Fisica</strong>{{ currentCliente.cliente.tipo }}</label>
                </div>-->
                <a class="badge badge-warning" :href="'/cliente/' + currentCliente.cpf">
                    Edit
                </a>
            </div>

            <div v-else>
                <br />
                <p>Please click on a Player...</p>
               <!-- <router-link to="/addcliente1" class="badge badge-success">Novo Cliente Fisico</router-link>
                <router-Link to="/addcliente2" class="badge badge-success">Novo Cliente Juritico</router-Link>-->
            </div>
        </div>


    </div>
</template>
<script>
import {BIconTrash, BIconPencilSquare } from 'bootstrap-vue'
import { RouterLink } from 'vue-router';
import ClienteDataService from '../../services/ClienteDataService';


export default {
    name: 'listclientes',
    data() {
        return {
            pessoas: [],
            currentCliente: null,
            currentIndex: -1
        }
    },
    components:{
    BIconTrash,
    BIconPencilSquare
    },
    methods: {
        listarCliente() {

            ClienteDataService.list().then(response => {

                console.log("Retorno do seviço authenticateCliente", response.status);

                this.pessoas = response.data;

            }).catch(response => {

                // error callback
                alert('Não conectou no serviço listCliente');
                console.log(response);
            });
        },
        setCurrentCliente(pessoa, index) {

            this.currentCliente = pessoa;
            this.currentIndex = index;

        },
        statusShowMenu() {
      let aux = localStorage.getItem('authUser', this.pessoas.tipo)
      if (aux.includes('F')) {
        return true
      } else {
        return false
      }

    },
        remCliente(pessoa, index) {

            ClienteDataService.delete(pessoa.cpf)
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    alert('Erro ao remover cliente: '+e)
                    console.log(e);
                });

        },
        refreshList() {
            this.listarCliente();
            this.currentTutorial = null;
            this.currentIndex = -1;
        }

    },
    mounted() {
        this.listarCliente();
    }

}
</script>

<style scoped>
#tab {
    height: 80%;
}
.list {
    text-align: center;
    max-width: 750px;
    margin: auto;

}
</style>