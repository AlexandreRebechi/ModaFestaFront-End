x<template>
    <div id="tab_aut">
        <div id="tab" class="table-responsive" >
            <h4>Listagem de Fotos</h4>
            <table class="table table-striped table-inverse  table-primary">
                <thead class="thead-inverse">
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Descricao</th>
                    <th scope="col">B64</th>
                    <th scope="col">Alterar</th>
                    <th scope="col">Remover</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr  v-for="(f, indice) in fotos" :key ="f.id" :class="{ active: indice == currentIndex }">
              
                            <td>{{f.id}}</td>
                            <td>{{f.descricao}}</td>
                            <td><img :src="f.b64"  style="max-width: 3rem;" ></td>
                            <td><button v-on:click="setCurrentFoto(f, indice)" class="btn btn-warning"
                                type="button" ><b-icon-pencil-square></b-icon-pencil-square></button></td>
                            <td><button v-on:click="remFoto(f, indice)" class="btn btn-danger" type="button"><b-icon-trash></b-icon-trash></button></td>
                        </tr>
                    </tbody>
            </table>
            
     
        </div>

        <div class="col-md-6">
            <div v-if="currentFoto">
                    <h4>Foto</h4>
                    <div>
                    <label><strong>ID:</strong></label> {{ currentFoto.id }}
                    </div>
                    <div>
                    <label><strong>Descricao:</strong></label> {{ currentFoto.descricao }}
                    </div>

                    <a class="badge badge-warning"
                    :href="'/foto/' + currentFoto.id"
                    >
                    Edit
                    </a>
            </div>
            <div v-else>
                <br />
                <p>Please click on a Player...</p>
                <router-link to="/addFoto" class="badge badge-success">Novo</router-link>                

            </div>
        </div>

                                          
    </div>
 </template>
 <script>
 
    import {BIconTrash, BIconPencilSquare } from 'bootstrap-vue'
    import FotoDataService from '../../services/FotoDataService';

     export default{
      name:'listfotos',
      data() {
             return {
                 fotos: [],
                 currentFoto: null,
                 currentIndex: -1
             }
         },
         components:{
    BIconTrash,
    BIconPencilSquare
    },
         methods: {
            listarFotos(){

                FotoDataService.list().then(response =>{

                    console.log("Retorno do seviço authenticateFoto", response.status);

                   this.fotos = response.data;

                }).catch(response => {

                    // error callback
                    alert('Não conectou no serviço listarFotos');
                    console.log(response);
                });
            },
            setCurrentFoto(foto, index){

                this.currentFoto = foto;
                this.currentIndex = index;
            },
            remFoto(foto, index){

                FotoDataService.delete(foto.id)
                .then(response => {
                    alert('Erro ao remover foto: '+e)
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    console.log(e);
                });

            },
            refreshList() {
                this.listarFotos();
                this.currentTutorial = null;
                this.currentIndex = -1;
            }

         },
         mounted() {
            this.listarFotos();
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