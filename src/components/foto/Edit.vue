<template>
    <div id="tab_aut">

        <div v-if="currentFoto" class="edit-form">
            <h3>Foto</h3>
            <form class="edit-form">
                <div class="md-3">
                    <label for="inputID">ID:</label>
                    <input type="text" v-model="currentFoto.id" class="form-control " id="inputID"
                        placeholder="ID" disabled required>
                </div>
                <div class="md-3">
                    <label for="inputDescricao">Descricao:</label>
                    <input :class="{valid : isValidDescricao == true, inValid: isValidDescricao == false}" type="text" v-model="currentFoto.descricao" class="form-control is-invalid"
                        id="inputDescricao" placeholder="Descricao" required>
                </div>

                <div class="md-3">
                    <label for="inputB64">Imagen: </label>
                   <img :src="currentFoto.b64" alt="">
                    <input type="file" @change="onFileSelection(event)">
                </div>


                <div class="mb-3">
                    <label for="selectProduto">Produto:</label>
                    <select v-model="currentFoto.produto_id" class="form-control is-invalid" id="selectProduto">
                        <option v-for="p in produto_id" v-bind:key="p.id" v-bind:value="p.id">
                            {{ p.descricao }}
                        </option>
                    </select>

                </div>

            </form>
        

            <button type="button" class="btn btn-success" @click="updateFoto">Salvar</button>
            <button type="button" class="btn btn-danger mr-2" @click="deleteFoto">Delete</button>
            <button type="button" class="btn btn-danger mr-2" @click="voltar">Voltar</button>

            <p>{{ message }}</p>

        </div>
        <div v-else>
            <br />
            <p>Please click on a foto...</p>
        </div>


    </div>
</template>
<script>

import FotoDataService from '../../services/FotoDataService';
import ProdutoDataService from '../../services/ProdutoDataService';


export default {
    name: 'editfotos',
    data() {
        return {
            currentFoto: null,
            message: '',
            produto_id: []
        }
    },
    computed:{
        isValidDescricao(){
            return isNaN(this.currentFoto.descricao)
      
    }
    },
    methods: {
        onFileSelection(event) {
            let rawImg;
            event = document.querySelector('input[type=file]').files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                rawImg = reader.result;
                console.log('rawImg: '+ rawImg);
                this.currentFoto.b64 = rawImg
                FotoDataService.update(this.currentFoto)
                .then(response => {
                    console.log('FotoDataService.update');
                    this.message = 'Foto alterada com sucesso !';
                })
                .catch(e => {
                    console.log(e);
                })

            }

            reader.readAsDataURL(event);
           



        },
        getFoto(id) {
            console.log('FotoDataService.get(id): '+ FotoDataService.get(id))
            FotoDataService.get(id)
                .then(response => {
                    console.log(response.data);
                    this.currentFoto = response.data;

                })
                .catch(e => {
                    console.log(e);
                })
        },
        updateFoto() {

            FotoDataService.update(this.currentFoto)
                .then(response => {
                    console.log('FotoDataService.update');
                    this.message = 'Foto alterada com sucesso !';
                })
                .catch(e => {
                    console.log(e);
                })
        },
        listProdutos() {

            ProdutoDataService.list().then(response => {

                console.log("Retorno do seviço ProdutoDataService.list", response.status);

                for (let p of response.data) {

                    this.produto_id.push(p);
                }

            }).catch(response => {

                // error callback
                alert('Não conectou no serviço ProdutoDataService.list');
                console.log(response);
            });
        },
        deleteFoto() {

            FotoDataService.delete(this.currentFoto.id)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "fotos-list" });
                })
                .catch(e => {
                    alert('Erro ao remover foto: '+e)
                    console.log(e);
                });
        },
        voltar() {
            this.$router.push({ name: "fotos-list" });
        }
    },
    mounted() {

        this.message = '';
        this.getFoto(this.$route.params.id);
        this.listProdutos();
    }
}
</script>

<style scoped>
.valid {
  background-color: chartreuse;
}

.inValid {
  background-color: red;
}
.edit-form {
    max-width: 300px;
    margin: auto;
}
</style>