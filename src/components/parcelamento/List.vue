<template>
    <div id="tab_aut">
     

        <div id="tab" class="table-responsive">
            <h4>Listagem de Parcelamento</h4>
            <table class="table table-striped  table-primary">
                <thead class="thead-inverse">
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Numero Parcela</th>
                    <th scope="col">Data de Previsão de Pagamento</th>
                    <th scope="col">Data Pagamento</th>
                    <th scope="col">Valor Total</th>
                    <th cope="col">Valor Pago</th> 
                    <th scope="col">Locacao ID</th>
                    <th scope="col">Alterar</th>
                    <th scope="col">Remover</th>
                    </tr>
                    </thead>
                    <tbody>
                  
                            <tr v-for="(p, indice) in parcelamentos" :key ="p.id" :class="{ active: indice == currentIndex }">
                            <td>{{p.id}}</td>
                            <td>{{p.numero_parcela}}</td>
                            <td>{{p.data_previsao_pagamento | formataData}}</td>
                            <td>{{p.data_pagamento | formataData}}</td>
                            <td>{{p.valor_total}}</td>
                            <th >{{p.valor_pago}}</th>
                            <td>{{p.id_locacao}}</td>
                            <td><button v-on:click="setCurrentParcelamento(p, indice)" class="btn btn-warning "
                                type="button"><b-icon-pencil-square></b-icon-pencil-square></button></td>
                            <td><button v-on:click="remParcelamento(p, indice)" class="btn btn-danger" type="button"><b-icon-trash></b-icon-trash></button></td>
                    
                        </tr>
                        
                    </tbody>
            </table>
           
     
        </div>

        <div class="col-md-6">
            <div v-if="currentParcelamento">
                    <h4>Parcelamento</h4>
                    <div>
                    <label><strong>ID:</strong></label> {{ currentParcelamento.id }}
                    </div>
                    <div>
                    <label><strong>Observacoes:</strong></label> {{ currentParcelamento.observacoes }}
                    </div>

                    <a class="badge badge-warning"
                    :href="'/parcelamento/' + currentParcelamento.id"
                    >
                    Edit
                    </a>
            </div>
            <div v-else>
                <br />
                <p>Please click on a Player...</p>
                <router-link to="/addparcelamento" class="badge badge-success">Novo</router-link>                

            </div>
        </div>

                                          
    </div>
 </template>
 <script>
 import {BIconTrash, BIconPencilSquare } from 'bootstrap-vue'
 import LocacaoDateService from '../../services/LocacaoDateService';
     import ParcelamentoDataService from '../../services/ParcelamentoDataService';
 
     export default{
      name:'listParcelamentos',
      data() {
             return {
                 parcelamentos: [],
                 currentParcelamento: null,
                 currentIndex: -1
             }
         },
         components:{
    BIconTrash,
    BIconPencilSquare
    },
         methods: {
            listarParcelamento(){

                ParcelamentoDataService.list().then(response =>{

                    console.log("Retorno do seviço authenticateParcelamento", response.status);

                   this.parcelamentos = response.data;

                }).catch(response => {

                    // error callback
                    alert('Não conectou no serviço listarParcelamento');
                    console.log(response);
                });
            },
            setCurrentParcelamento(parcelamento, index){

                this.currentParcelamento = parcelamento;
                this.currentIndex = index;
            },
            remParcelamento(parcelamento, index){

                ParcelamentoDataService.delete(parcelamento.id)
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    alert('Erro ao remover parcelamento: '+e)
                    console.log(e);
                });

            },
            refreshList() {
                this.listarParcelamento();
                this.currentTutorial = null;
                this.currentIndex = -1;
            }

         },
         mounted() {
            this.listarParcelamento();
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