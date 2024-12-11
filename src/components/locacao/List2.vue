<template>

    <div id="tab_aut">


        <div id="tab" class="table-responsive">
            <h4>Listagem de locacoes</h4>
            <table class="table table-striped table-inverse">
                <thead class="thead-inverse table-primary">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Data Retirada</th>
                        <th scope="col">Data Previsao Entrega</th>
                        <th scope="col">Data Entrega</th>
                        <th scope="col">Data Previsao Pagamento</th>
                        <th scope="col">Valor Total</th>
                        <th scope="col">Valor Pago</th>
                        <th scope="col">Cliente</th>
                        <th scope="col">tipos_pagamento</th>

                    </tr>
                </thead>
                <tbody>
                    <tr class="table-success" v-for="(l, indice) in locacao2" :key="l.id"
                        :class="{ active: indice == currentIndex }" v-if="corTabela(l.data_previsao_entrega) ">
                        <td>{{ l.id }}</td>
                        <td>{{ l.data_retirada }}</td>
                        <td>{{ l.data_previsao_entrega | formataData }}</td>
                        <td>{{ l.data_entrega | formataData }}</td>
                        <td>{{ l.data_previsao_pagamento | formataData }}</td>
                        <td>{{ l.valor_total }}</td>
                        <td>{{ l.valor_pago }}</td>
                        <td>{{ l.nome_cliente }}</td>
                        <td>{{ l.tipos_pagamento }}</td>



                        <!--<td><button v-on:click="setCurrentLocacao(l, indice)" class="btn btn-warning "
                                type="button"><b-icon-pencil-square></b-icon-pencil-square></button></td>
                        <td><button v-on:click="remLocacao(l, indice)" class="btn btn-danger"
                                type="button"><b-icon-trash></b-icon-trash></button>
                        </td>-->
                    </tr>
                    <tr class="table-danger" v-for="(l, indice) in locacao2" :key="l.id"
                        :class="{ active: indice == currentIndex }" v-if="!corTabela(l.data_previsao_entrega)">
                        <td>{{ l.id }}</td>
                        <td>{{ l.data_retirada }}</td>
                        <td>{{ l.data_previsao_entrega | formataData }}</td>
                        <td>{{ l.data_entrega | formataData }}</td>
                        <td>{{ l.data_previsao_pagamento | formataData }}</td>
                        <td>{{ l.valor_total }}</td>
                        <td>{{ l.valor_pago }}</td>
                        <td>{{ l.nome_cliente }}</td>
                        <td>{{ l.tipos_pagamento }}</td>



                        <!-- <td><button v-on:click="setCurrentLocacao(l, indice)" class="btn btn-warning "
                                type="button"><b-icon-pencil-square></b-icon-pencil-square></button></td>
                        <td><button v-on:click="remLocacao(l, indice)" class="btn btn-danger"
                                type="button"><b-icon-trash></b-icon-trash></button>
                        </td>-->
                    </tr>
                </tbody>
            </table>
            <div>
                <!-- <b-table :items="items" :fields="fields"   >
                    <template #cell(alterar)="row">
                        <div>
                            {{ row.id }}
                            <b-button v-on:click="setCurrentLocacao(row, row.indice)" class="mr-1 "
                                type="button"><b-icon-pencil-square></b-icon-pencil-square></b-button>
                        </div>

                    </template>
<template #cell(remover)="row">
                        <div>
                            <b-button v-on:click="remLocacao(row, indice)" class="btn btn-danger"
                                type="button"><b-icon-trash></b-icon-trash></b-button>
                        </div>

                    </template>
<template #row-details="row">
        <b-card>
          <ul>
            <li v-for="(row, indice) in row.items" :key="row.id" :class="{ active: indice == currentIndex }">{{ row }}</li>
            {{ row.id }}
          </ul>
        </b-card>
      </template>
</b-table>-->


            </div>

        </div>

        <!-- <div class="col-md-6">
            <div v-if="currentLocacao">
                <h4>Locacao</h4>
                <div>
                    <label><strong>ID:</strong></label> {{ currentLocacao.id }}
                </div>
                <div>
                    <label><strong>Observacoes:</strong></label> {{ currentLocacao.observacoes }}
                </div>

                <a class="badge badge-warning" :href="'/locacao/' + currentLocacao.id">
                    Edit
                </a>
            </div>
            <div class="col-md-6" v-else>
                <br />
                <p>Please click on a Player...</p>
                <router-link to="/addlocacao" class="badge badge-success">Novo</router-link>

            </div>
        </div>-->


    </div>
</template>
<script>
import { BIconTrash, BIconPencilSquare } from 'bootstrap-vue'
import { BTable, BButton } from 'bootstrap-vue';
import LocacaoDateService from '../../services/LocacaoDateService';
import ReservaDataService from '../../services/ReservaDataService';
import PessoaDataService from '../../services/PessoaDataService';



export default {
    name: 'listLocacao2',
    data() {
        return {

           // locacao: [],
            locacao2: [],
            reservas: [],




            currentLocacao: null,
            currentUser: null,
            currentReserva: null,
            currenPessoa: null,
            currentIndex: -1
        }
    },
    components: {
        BIconTrash,
        BIconPencilSquare,
        /*BTable,
        BButton,*/

    },
    methods: {
       /* filtroCliente(l){
            this.currentUser = JSON.parse(localStorage.getItem('authUser'))
            console.log('cpf: '+this.currentUser.cpf)
            PessoaDataService.list().then(response => {
                this.currenPessoa = response.data
              for (let index = 0; index < this.locacao2.length; index++) {
                
                  if (this.currenPessoa[index].cpf == this.currentUser.cpf) {
                        return true
                  }
              }
            }).catch(response => {

                // error callback
                alert('Não conectou no serviço PessoaDataService');
                console.log(response);
            });
        },*/
        newListLocacao() {
            this.currentUser = JSON.parse(localStorage.getItem('authUser'))
            console.log('cpf: '+this.currentUser.cpf)
            LocacaoDateService.get2(this.currentUser.cpf).then(response => {

                console.log("Retorno do seviço authenticateLocacao2", response.status);
                this.locacao2 = response.data;
                console.log('this.locacao2: ' + this.locacao2.nome_cliente)

                // this.items = response.data

            }).catch(response => {

                // error callback
                alert('Não conectou no serviço listarLocacao');
                console.log(response);
            });
        },
        listReserva() {
            ReservaDataService.list2().then(response => {
                console.log("Retorno do seviço authenticateReserva.list", response.status);

                this.reservas = response.data;

                /* for (let index = 0; index < this.reservas.length; index++) {
                      if (this.locacao2[index].funionario == this.reservas[index].funionario) {
                          return true
                      }
                  
            
                 }*/
            }).catch(response => {

                // error callback
                alert('Não conectou no serviço listarReserva.list');
                console.log(response);
            })
        },
        filtrarLocacao(funionario) {
            console.log(funionario)
                for (let index = 0; index < this.reservas.length; index++) {
                      if (this.locacao2[index].funionario == this.reservas[index].funionario) {
                          return true
                      }
                  
            
                 }

        },
        corTabela(l) {
            var data = new Date(),
                dia = data.getDate().toString(),
                diaf = (dia.length == 1) ? '0' + dia : dia,
                mes = (data.getMonth() + 1).toString(),
                mesf = (mes.length == 1) ? '0' + mes : mes,
                anof = data.getFullYear();
            let teste = anof + '-' + mesf + '-' + diaf
            if (teste <= l) {
                console.log('oi1 cor tabela')
                return true
            } else {
                console.log('oi2 cor tabela')
                return false
            }


        },
        listarLocacoes() {

            LocacaoDateService.list().then(response => {

                console.log("Retorno do seviço authenticateLocacao", response.status);
                this.locacao = response.data;
                console.log('this.locacao: ' + this.locacao)

                // this.items = response.data

            }).catch(response => {

                // error callback
                alert('Não conectou no serviço listarLocacao');
                console.log(response);
            });
        },
        setCurrentLocacao(locacao2, index) {

            this.currentLocacao = locacao2;
            this.currentIndex = index;
        },
        remLocacao(locacao, index) {

            LocacaoDateService.delete(locacao.id)
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    alert('Erro ao remover locacao: ' + e)
                    console.log(e);
                });

        },
        refreshList() {
            this.newListLocacao();
            this.currentTutorial = null;
            this.currentIndex = -1;
        }

    },
    mounted() {
        this.newListLocacao();
      //  this.filtroCliente();
        this.corTabela();
    }

}
</script>

<style scoped>
.div_novo {
    margin-top: 50px;
    text-align: center;
}

.data {
    background-color: greenyellow;

}

.idata {
    background-color: red;
}

#tab {
    height: 80%;
}

.list {
    text-align: left;
    max-width: 750px;
    margin: auto;
}
</style>