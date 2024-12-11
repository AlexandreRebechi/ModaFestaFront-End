<template>
    <div id="tab_aut">


        <div div id="tab" class="table-responsive" >
            <h4>Listagem de Acompanhamento</h4>
            <table class="table table-striped table-inverse  table-primary">
                <thead class="thead-inverse">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Status Locação</th>
                        <th scope="col">Data</th>
                        <th scope="col">Locacao ID</th>
 
                        <th scope="col">Alterar</th>
                        <th scope="col">Remover</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(a, indice) in acompanhamento" :key="a.id" :class="{ active: indice == currentIndex }">
                        <td>{{ a.id }}</td>
                        <td>{{ a.statuslocacao }}</td>
                        <td>{{ a.data }}</td>      
                        <td>{{ a.id_locacao }}</td>
                       
                        <td><button v-on:click="setCurrentAcompanhamento(a, indice)" class="btn btn-warning "
                            type="button"><b-icon-pencil-square></b-icon-pencil-square></button></td>
                        <td><button v-on:click="remAcompanhamento(a, indice)" class="btn btn-danger" type="button"><b-icon-trash></b-icon-trash></button></td>

                    </tr>
                </tbody>
            </table>


        </div>

        <div class="col-md-6">
            <div v-if="currentAcompanhamento">
                <h4>Acompanhamento</h4>
                <div>
                    <label><strong>ID:</strong></label> {{ currentAcompanhamento.id }}
                </div>
                <div>
                    <label><strong>Observacoes:</strong></label> {{ currentAcompanhamento.observacoes }}
                </div>

                <a class="badge badge-warning" :href="'/acompanhamento/' + currentAcompanhamento.id">
                    Edit
                </a>
                
            </div>
            <div v-else>
                <br />
                <p>Please click on a Player...</p>
                <router-link to="/addacompanhamento" class="badge badge-success">Novo</router-link>

            </div>
        </div>


    </div>
</template>
<script>
import {BIconTrash, BIconPencilSquare } from 'bootstrap-vue'
import LocacaoDateService from '../../services/LocacaoDateService';

import AcompanhamentoDataService from '../../services/AcompanhamentoDataService';

export default {
    name: 'listacompanhamento',
    data() {
        return {
            acompanhamento: [],
            currentAcompanhamento: null,
            currentIndex: -1
        }
    },
    components:{
    BIconTrash,
    BIconPencilSquare
    },
    methods: {
        listarAcompanhamento() {
     
            AcompanhamentoDataService.list().then(response => {

                console.log("Retorno do seviço authenticateAcompanhamento", response.status);

                this.acompanhamento = response.data;

            }).catch(response => {

                // error callback
                alert('Não conectou no serviço listarAcompanhamento');
                console.log(response);
              
            });
        },
        setCurrentAcompanhamento(acompanhamento, index) {

            this.currentAcompanhamento = acompanhamento;
            this.currentIndex = index;
        },
        remAcompanhamento(acompanhamento, index) {

            AcompanhamentoDataService.delete(acompanhamento.id)
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    alert('Erro ao remover acompanhamento: '+e)
                    console.log(e);
                });

        },
        refreshList() {
            this.listarAcompanhamento();
            this.currentTutorial = null;
            this.currentIndex = -1;
        }

    },
    mounted() {
        this.listarAcompanhamento();
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