<template>
    <div id="tab_aut">


        <div id="tab" class="table-responsive">
            <h4>Listagem de Perfis</h4>
            <table class="table table-striped table-inverse table-primary ">
                <thead class="thead-inverse">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Descricao</th>
                        <th scope="col">Alterar</th>
                        <th scope="col">Remover</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(p, indice) in perfis" :key="p.id" :class="{ active: indice == currentIndex }">
                        <td>{{ p.id }}</td>
                        <td>{{ p.descricao }}</td>
                        <td><button v-on:click="setCurrentPerfil(p, indice)" class="btn btn-warning "
                            type="button"><b-icon-pencil-square></b-icon-pencil-square></button></td>
                        <td><button v-on:click="remPerfil(p, indice)" class="btn btn-danger" type="button"><b-icon-trash></b-icon-trash></button>
                        </td>
                    </tr>
                </tbody>
            </table>


        </div>

        <div class="col-md-6">
            <div v-if="currentPerfil">
                <h4>Perfil</h4>
                <div>
                    <label><strong>ID:</strong></label> {{ currentPerfil.id }}
                </div>
                <div>
                    <label><strong>Descricao:</strong></label> {{ currentPerfil.descricao }}
                </div>

                <a class="badge badge-warning" :href="'/perfil/' + currentPerfil.id">
                    Edit
                </a>
            </div>
            <div v-else>
                <br />
                <p>Please click on a Player...</p>
                <router-link to="/addperfil" class="badge badge-success">Novo</router-link>

            </div>
        </div>


    </div>
</template>
<script>
 import {BIconTrash, BIconPencilSquare } from 'bootstrap-vue'
import PerfilDataService from '../../services/PerfilDataService'

export default {
    name: 'listperfil',
    data() {
        return {
            perfis: [],
            currentPerfil: null,
            currentIndex: -1
        }
    },
    components:{
    BIconTrash,
    BIconPencilSquare
    },
    methods: {
        listarPerfis() {

            PerfilDataService.list().then(response => {

                console.log("Retorno do seviço authenticatePerfil", response.status);

                this.perfis = response.data;

            }).catch(response => {

                // error callback
                alert('Não conectou no serviço listperfil');
                console.log(response);
            });
        },
        setCurrentPerfil(perfil, index) {

            this.currentPerfil = perfil;
            this.currentIndex = index;
        },
        remPerfil(perfil, index) {

            PerfilDataService.delete(perfil.id)
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    alert('Erro ao remover perfil: '+e)
                    console.log(e);
                });

        },
        refreshList() {
            this.listarPerfis();
            this.currentTutorial = null;
            this.currentIndex = -1;
        }

    },
    mounted() {
        this.listarPerfis();
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