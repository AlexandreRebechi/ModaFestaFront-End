x<template>
    <div id="tab_aut">


        <div id="tab" class="table-responsive" >
            <h4>Listagem de Situacao</h4>
            <table class="table table-striped table-inverse  table-primary ">
                <thead class="thead-inverse">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Descricao</th>
                        <th scope="col">Alterar</th>
                        <th scope="col">Remover</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(s, indice) in situacoes" :key="s.id" :class="{ active: indice == currentIndex }">
                        <td>{{ s.id }}</td>
                        <td>{{ s.descricao }}</td>
                        <td><button v-on:click="setCurrentSituacao(s, indice)" class="btn btn-warning "
                            type="button"><b-icon-pencil-square></b-icon-pencil-square></button></td>
                        <td><button v-on:click="remSituacao(s, indice)" class="btn btn-danger" type="button"><b-icon-trash></b-icon-trash></button>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>

        <div class="col-md-6">
            <div v-if="currentSituacao">
                <h4>Situacao</h4>
                <div>
                    <label><strong>ID:</strong></label> {{ currentSituacao.id }}
                </div>
                <div>
                    <label><strong>Descricao:</strong></label> {{ currentSituacao.descricao }}
                </div>

                <a class="badge badge-warning" :href="'/situacao/' + currentSituacao.id">
                    Edit
                </a>
            </div>
            <div v-else>
                <br />
                <p>Please click on a Player...</p>
                <router-link to="/addsituacao" class="badge badge-success">Novo</router-link>

            </div>
        </div>


    </div>
</template>
<script>

import {BIconTrash, BIconPencilSquare } from 'bootstrap-vue'
import SituacaoDataService from '../../services/SituacaoDataService';
export default {
    name: 'listSituacoes',
    data() {
        return {
            situacoes: [],
            currentSituacao: null,
            currentIndex: -1
        }
    },
    components:{
    BIconTrash,
    BIconPencilSquare
    },
    methods: {
        listarSituacao() {

            SituacaoDataService.list().then(response => {

                console.log("Retorno do seviço authenticateSiutacao", response.status);

                this.situacoes = response.data;

            }).catch(response => {

                // error callback
                alert('Não conectou no serviço listarSituacao');
                console.log(response);
            });
        },
        setCurrentSituacao(situacoes, index) {

            this.currentSituacao = situacoes;
            this.currentIndex = index;
        },
        remSituacao(situacoes, index) {

            SituacaoDataService.delete(situacoes.id)
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    alert('Erro ao remover situacao: '+e)
                    console.log(e);
                });

        },
        refreshList() {
            this.listarSituacao();
            this.currentTutorial = null;
            this.currentIndex = -1;
        }

    },
    mounted() {
        this.listarSituacao();
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