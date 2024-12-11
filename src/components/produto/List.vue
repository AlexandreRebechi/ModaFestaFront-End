<template>
    <div id="tab_aut">
     

        <div id="tab" class="table-responsive">
            <h4>Listagem de Produtos</h4>
            <table class="table table-striped table-inverse table-primary">
                <thead class="thead-inverse">
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Descricao</th>
                    <th scope="col">Valor Custo</th>
                    <th scope="col">Valor Aluguel</th>
                    <th scope="col">Valor Venda</th>
                    <th scope="col">Tipo Produto</th>
                    <th scope="col">Alterar</th>
                    <th scope="col">Remover</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(p, indice) in produtos" :key ="p.id" :class="{ active: indice == currentIndex }">      
                            <td>{{p.id}}</td>
                            <td>{{p.descricao}}</td>
                            <td>{{p.valor_custo}}</td>
                            <td>{{p.valor_aluguel}}</td>
                            <td>{{p.valor_venda}}</td>
                            <td>{{p.tipo_produto}}</td>
                            <td><button v-on:click="setCurrentProduto(p, indice)" class="btn btn-warning "
                                type="button"><b-icon-pencil-square></b-icon-pencil-square></button></td>
                            <td><button v-on:click="remProduto(p, indice)" class="btn btn-danger" type="button"><b-icon-trash></b-icon-trash></button></td>
                    </tr>
                    </tbody>
            </table>
          
     
        </div>

        <div class="col-md-6">
            <div v-if="currentProduto">
                    <h4>Produto</h4>
                    <div>
                    <label><strong>ID:</strong></label> {{ currentProduto.id }}
                    </div>
                    <div>
                    <label><strong>Observacoes:</strong></label> {{ currentProduto.observacoes }}
                    </div>
                    <div>
                    <label><strong>tipo_produto:</strong></label> {{ currentProduto.tipo_produto }}
                    </div>
                    <a class="badge badge-warning"
                    :href="'/produto/' + currentProduto.id"
                    >
                    Edit
                    </a>
            </div>
            <div v-else>
                <br />
                <p>Please click on a Player...</p>
                <router-link to="/addproduto" class="badge badge-success">Novo</router-link>                

            </div>
        </div>

                                          
    </div>
 </template>
 <script>
     import {BIconTrash, BIconPencilSquare } from 'bootstrap-vue'
     import ProdutoDataService from '../../services/ProdutoDataService'     
 
     export default{
      name:'listProdutos',
      data() {
             return {
                 produtos: [],
                 currentProduto: null,
                 currentIndex: -1
             }
         },
         components:{
    BIconTrash,
    BIconPencilSquare
    },
         methods: {
            listarProdutos(){

                ProdutoDataService.list().then(response =>{

                    console.log("Retorno do seviço authenticateProduto", response.status);

                   this.produtos = response.data;

                }).catch(response => {

                    // error callback
                    alert('Não conectou no serviço listarProduto');
                    console.log(response);
                });
            },
            setCurrentProduto(produto, index){

                this.currentProduto = produto;
                this.currentIndex = index;
            },
            remProduto(produto, index){

                ProdutoDataService.delete(produto.id)
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    alert('Erro ao remover produto: '+e)
                    console.log(e);
                });

            },
            refreshList() {
                this.listarProdutos();
                this.currentTutorial = null;
                this.currentIndex = -1;
            }

         },
         mounted() {
            this.listarProdutos();
         }
 
     }
 </script>
    
 <style scoped>
#tab {
    height: 80%;
}
    .list {
    text-align: left;
    max-width: 750px;
    margin: auto;
    }

     
 </style>