<template>
    <div id="tab_aut">


        <div id="tab" class="table-responsive">
            <h4>Listagem de Funcionalidades</h4>
            <table class="table table-striped table-inverse  table-primary">
                <thead class="thead-inverse">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Descricao</th>
                        <th scope="col">Alterar</th>
                        <th scope="col">Remover</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(f, indice) in funcinalidades" :key="f.id" :class="{ active: indice == currentIndex }">
                        <td>{{ f.id }}</td>
                        <td>{{ f.descricao }}</td>
                        <td><button v-on:click="setCurrentFuncionalidade(f, indice)" class="btn btn-warning "
                            type="button"><b-icon-pencil-square></b-icon-pencil-square></button></td>
                        <td><button v-on:click="remFuncionalidade(f, indice)" class="btn btn-danger" type="button"><b-icon-trash></b-icon-trash></button>
                        </td>
                    </tr>
                </tbody>
            </table>


        </div>

        <div class="col-md-6">
            <div v-if="currentFuncionalidade">
                <h4>Funcionalidade</h4>
                <div>
                    <label><strong>ID:</strong></label> {{ currentFuncionalidade.id }}
                </div>
                <div>
                    <label><strong>Descricao:</strong></label> {{ currentFuncionalidade.descricao }}
                </div>

                <a class="badge badge-warning" :href="'/funcionalidade/' + currentFuncionalidade.id">
                    Edit
                </a>
            </div>
            <div v-else>
                <br />
                <p>Please click on a Player...</p>
                <router-link to="/addfuncinalidade" class="badge badge-success">Novo</router-link>

            </div>
        </div>


    </div>
</template>

<script>

import {BIconTrash, BIconPencilSquare } from 'bootstrap-vue'
import FuncionalidadeDataService from '../../services/FuncionalidadeDataService';
export default {
    name: 'listfuncionalidades',
    data() {
        return {
            funcinalidades: [],
            currentFuncionalidade: null,
            currentIndex: -1
        }
    },
    components:{
    BIconTrash,
    BIconPencilSquare
    },
    methods: {
        listarFuncionalidades() {

            FuncionalidadeDataService.list().then(response => {
                console.log('oi')
                console.log("Retorno do seviço authenticateFuncionalidade", response.status);

                this.funcinalidades = response.data;

            }).catch(response => {

                // error callback
                alert('Não conectou no serviço listarFuncionalidades');
                console.log(response);
            });
        },
        setCurrentFuncionalidade(funcionalidade, index) {

            this.currentFuncionalidade = funcionalidade;
            this.currentIndex = index;
        },
        remFuncionalidade(funcionalidade, index) {

            FuncionalidadeDataService.delete(funcionalidade.id)
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    alert('Erro ao remover funcinalidade: '+e)
                    console.log(e);
                });

        },
        refreshList() {
            this.listarFuncionalidades();
            this.currentTutorial = null;
            this.currentIndex = -1;
        }

    },
    mounted() {
        this.listarFuncionalidades();
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