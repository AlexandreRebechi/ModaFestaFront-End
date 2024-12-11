<template>
    <div id="tab_aut" >


        <div id="tab" class="table-responsive" >
            <h4>Listagem de Funcionarios</h4>
            <table class="table table-striped table-inverse table-primary">
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
                    <tr v-for="(p, indice) in pessoas" :key="p.cpf" :class="{ active: indice == currentIndex }">
                        <td>{{ p.cpf }}</td>
                        <td>{{ p.nome_funcionario }}</td>
                        <td>{{ p.email }}</td>
                        <td>{{ p.telefone }}</td>
                   
                        <td>{{ p.data_cadastro | formataData }}</td>
                        
                        <td>{{ p.data_ultimo_login | formataData}}</td>
                        <td> <button v-on:click="setCurrentFuncionario(p, indice)" class="btn btn-warning "
                            type="button"><b-icon-pencil-square></b-icon-pencil-square></button></td>
                                <td><button v-on:click="remFuncionario(p, indice)" class="btn btn-danger" type="button"><b-icon-trash></b-icon-trash></button></td>
                       
                    </tr>

                </tbody>
            </table >
            
     
                
            
           
                        
        </div>

        <div class="col-md-6">
            <div v-if="currentFuncinario">
                <h4>Funcionario</h4>
                <div>
                    <label><strong>Username:</strong></label> {{ currentFuncinario.username }}
                </div>
                <div>
                    <label><strong>Data de Cadastro:</strong></label> {{ currentFuncinario.data_cadastro | formataData}}
                </div>


                <a class="badge badge-warning" :href="'/funcionario/' + currentFuncinario.cpf">
                    Edit
                </a>
            </div>
            <div v-else>
                <br />
                <p>Please click on a Player...</p>
                <router-link to="/addfuncionario" class="badge badge-success">Novo</router-link>

            </div>
        </div>


    </div>
</template>
<script>

import {BIconTrash, BIconPencilSquare } from 'bootstrap-vue'
import FuncionarioDataService from '../../services/FuncionarioDataService';


export default {
    name: 'listFuncionarios',
    data() {
        return {
            pessoas: [],
            currentFuncinario: null,
            currentIndex: -1
        }
    },
    components:{
    BIconTrash,
    BIconPencilSquare
    },
    methods: {
        listarFuncinario() {

            FuncionarioDataService.list().then(response => {

                console.log("Retorno do seviço authenticateFuncionario", response.status);

                this.pessoas = response.data;

            }).catch(response => {

                // error callback
                alert('Não conectou no serviço listFuncinario');
                console.log(response);
            });
        },
        setCurrentFuncionario(pessoas, index) {

            this.currentFuncinario = pessoas;
            this.currentIndex = index;
        },
        remFuncionario(pessoas, index) {

            FuncionarioDataService.delete(pessoas.cpf)
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    alert('Erro ao remover funcionario: '+e)
                    console.log(e);
                });

        },
        refreshList() {
            this.listarFuncinario();
            this.currentTutorial = null;
            this.currentIndex = -1;
        }

    },
    mounted() {
        this.listarFuncinario();
    }

}
</script>

<style scoped>
#tab{
    margin: 0;
    height: 20%;
    
}
.list {
    text-align: left;
    max-width: 750px;
    margin: auto;
}
</style>