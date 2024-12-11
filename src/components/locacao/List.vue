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
                        <th scope="col">Funcionario</th>
                        <th scope="col">tipos_pagamento</th>
                        <th scope="col">Alterar</th>
                        <th scope="col">Remover</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="table-success" v-for="(l, indice) in locacao" :key="l.id" :class="{ active: indice == currentIndex}" v-if="corTabela(l.data_previsao_entrega) ">
                        <td>{{ l.id }}</td>
                        <td>{{ l.data_retirada | formataData}}</td>
                        <td>{{ l.data_previsao_entrega | formataData }}</td>
                        <td>{{ l.data_entrega | formataData }}</td>
                        <td>{{ l.data_previsao_pagamento | formataData }}</td>
                        <td>{{ l.valor_total }}</td>
                        <td>{{ l.valor_pago }}</td>
                        <td>{{ l.nome_funcionario }}</td>
                        <td>{{ l.tipos_pagamento }}</td>



                        <td><button v-on:click="setCurrentLocacao(l, indice)" class="btn btn-warning "
                                type="button"><b-icon-pencil-square></b-icon-pencil-square></button></td>
                        <td><button v-on:click="remLocacao(l, indice)" class="btn btn-danger"
                                type="button"><b-icon-trash></b-icon-trash></button>
                        </td>
                    </tr>
                    <tr class="table-danger" v-for="(l, indice) in locacao" :key="l.id" :class="{ active: indice == currentIndex}" v-if="!corTabela(l.data_previsao_entrega)">
                        <td>{{ l.id }}</td>
                        <td>{{ l.data_retirada }}</td>
                        <td>{{ l.data_previsao_entrega | formataData }}</td>
                        <td>{{ l.data_entrega | formataData }}</td>
                        <td>{{ l.data_previsao_pagamento | formataData }}</td>
                        <td>{{ l.valor_total }}</td>
                        <td>{{ l.valor_pago }}</td>
                        <td>{{ l.nome_funcionario }}</td>
                        <td>{{ l.tipos_pagamento }}</td>



                        <td><button v-on:click="setCurrentLocacao(l, indice)" class="btn btn-warning "
                                type="button"><b-icon-pencil-square></b-icon-pencil-square></button></td>
                        <td><button v-on:click="remLocacao(l, indice)" class="btn btn-danger"
                                type="button"><b-icon-trash></b-icon-trash></button>
                        </td>
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

        <div class="col-md-6" >
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
        </div>


    </div>
</template>
<script>
import { BIconTrash, BIconPencilSquare } from 'bootstrap-vue'
import { BTable, BButton } from 'bootstrap-vue';
import LocacaoDateService from '../../services/LocacaoDateService';
import PessoaDataService from '../../services/PessoaDataService';



export default {
    name: 'listLocacao',
    data() {
        return {
          
            locacao: [
                {

                }
            ],
        


            currentLocacao: null,
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
        FiltroFuncionario(l){
            let aux = JSON.parse(localStorage.getItem('authUser'))
            PessoaDataService.list().then(response => {

console.log("Retorno do seviço PessoaDataService.list", response.status);

for (let f of response.data) {
    if (l == f.nome_funcionario) {
        if (aux.cpf == f.cpf) {
            return true
        }else{
            return false
        }
    }
   
}
}).catch(response => {

// error callback
//alert('Não conectou no serviço PessoaDataService.list');
console.log(response);
});
        },
        corTabela(l) {
            var data = new Date(),
                dia = data.getDate().toString(),
                diaf = (dia.length == 1) ? '0' + dia : dia,
                mes = (data.getMonth() + 1).toString(),
                mesf = (mes.length == 1) ? '0' + mes : mes,
                anof = data.getFullYear();
            let teste = anof + '-' + mesf + '-' + diaf
           // console.log('data: '+l.data_previsao_entrega)
            console.log('teste: '+teste)
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

                this.items = response.data

            }).catch(response => {

                // error callback
                alert('Não conectou no serviço listarLocacao');
                console.log(response);
            });
        },
        setCurrentLocacao(locacao, index) {

            this.currentLocacao = locacao;
            this.currentIndex = index;
        },
        remLocacao(locacao, index) {

            LocacaoDateService.delete(locacao.id)
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    alert('Erro ao remover locacao: '+e)
                    console.log(e);
                });

        },
        refreshList() {
            this.listarLocacoes();
            this.currentTutorial = null;
            this.currentIndex = -1;
        }

    },
    mounted() {
        this.listarLocacoes();
        this.corTabela();
    }

}
</script>

<style scoped>
.div_novo{
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