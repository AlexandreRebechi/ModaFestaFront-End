x<template>
    <div id="tab_aut">


        <div id="tab" class="table-responsive" >
            <h4>Listagem de Tipos Produto</h4>
            <table class="table table-striped table-inverse table-primary">
                <thead class="thead-inverse">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Alterar</th>
                        <th scope="col">Remover</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(tp, indice) in tiposprodutos" :key="tp.id" :class="{ active: indice == currentIndex }">
                        <td>{{ tp.id }}</td>
                        <td>{{ tp.nome }}</td>
                        <td><button v-on:click="setCurrentTiposProduto(tp, indice)"  class="btn btn-warning "
                            type="button"><b-icon-pencil-square></b-icon-pencil-square></button></td>
                        <td><button v-on:click="remTiposProduto(tp, indice)" class="btn btn-danger" type="button"><b-icon-trash></b-icon-trash></button>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>

        <div class="col-md-6">
            <div v-if="currentTiposProduto">
                <h4>Tipos Produto</h4>
                <div>
                    <label><strong>ID:</strong></label> {{ currentTiposProduto.id }}
                </div>
                <div>
                    <label><strong>Nome:</strong></label> {{ currentTiposProduto.nome }}
                </div>

                <a class="badge badge-warning" :href="'/tiposproduto/' + currentTiposProduto.id">
                    Edit
                </a>
            </div>
            <div v-else>
                <br />
                <p>Please click on a Player...</p>
                <router-link to="/addtiposproduto" class="badge badge-success">Novo</router-link>

            </div>
        </div>


    </div>
</template>
<script>

import {BIconTrash, BIconPencilSquare } from 'bootstrap-vue'
import TiposProdutoDataService from '../../services/TiposProdutoDataService';
export default {
    name: 'listtiposprodutos',
    data() {
        return {
            tiposprodutos: [],
            currentTiposProduto: null,
            currentIndex: -1
        }
    },
    components:{
    BIconTrash,
    BIconPencilSquare
    },
    methods: {
        listarTiposProduto() {

            TiposProdutoDataService.list().then(response => {

                console.log("Retorno do seviço authenticateTiposProduto", response.status);

                this.tiposprodutos = response.data;

            }).catch(response => {

                // error callback
                alert('Não conectou no serviço listarTiposProduto');
                console.log(response);
            });
        },
        setCurrentTiposProduto(tiposproduto, index) {

            this.currentTiposProduto = tiposproduto;
            this.currentIndex = index;
        },
        remTiposProduto(tiposproduto, index) {

            TiposProdutoDataService.delete(tiposproduto.id)
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    alert('Erro ao remover tipos produto: '+e)
                    console.log(e);
                });

        },
        refreshList() {
            this.listarTiposProduto();
            this.currentTutorial = null;
            this.currentIndex = -1;
        }

    },
    mounted() {
        this.listarTiposProduto();
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