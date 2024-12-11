<template>
    <div class="submit-form">
        <div v-if="!submitted">
            <form class="submit-form">

                <div class="md-3">
                    <label for="inputID">ID:</label>
                    <input type="text" v-model="foto.id" class="form-control " id="inputID" placeholder="ID" disabled
                        required>
                </div>
                <div class="md-3">
                    <label for="inputDescricao">Descricao:</label>
                    <input :class="{valid : isValidDescricao == true, inValid: isValidDescricao == false}" type="text" v-model="foto.descricao" class="form-control " id="inputDescricao"
                        placeholder="Descricao" required>
                </div>

                <div class="md-3">
                    <label for="inputB64">B64:</label>
                    
                    <input type="file" @change="onFileSelection(event)">
                </div>

                <div class="mb-3">
                    <label for="selectProduto">Produto:</label>
                    <select v-model="foto.produto_id" class="form-control " id="selectProduto">
                        <option v-for="p in produto_id" :key="p.id" v-bind:value="p">
                            {{ p.descricao }}
                        </option>
                    </select>

                </div>

            </form>

            <button @click="saveFoto" class="btn btn-success">Salvar</button>
            <router-link to="/fotos" class="btn btn-success">Voltar</router-link>

        </div>

        <div v-else>
            <h4>Dados enviados com sucesso !</h4>
            <button class="btn btn-success" @click="newFoto">Novo</button>
            <router-link to="/fotos" class="btn btn-success">Voltar</router-link>
        </div>
    </div>
</template>

<script>

import FotoDataService from '../../services/FotoDataService';
import ProdutoDataService from '../../services/ProdutoDataService';


export default {
    name: "addfoto",
    data() {
        return {
            foto: {
                indice: '',

                id: '',
                descricao: '',
                b64: '',
                produto_id: []
            },
            selectedFile: null,
            submitted: false,
            produto_id: []
        }
    },
    computed: {
        isValidDescricao(){
            return isNaN(this.foto.descricao)
      
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
                this.selectedFile = rawImg
                console.log('this.selectedFile: '+ this.selectedFile)
                return rawImg
              
                

            }

            reader.readAsDataURL(event);
           



        },



        saveFoto() {

            var ft = jQuery.extend({}, this.foto);//clona o this.foto e armazena na variavel funcionalidade. dessa forma alteracoes em this.novo_foto nao irao refletir em foto.
            delete ft.id
             ft.b64 = this.selectedFile
        
            console.log('ft.b64: '+ ft.b64)
            if (ft.descricao.trim().length > 0) {

                FotoDataService.create(ft)
                    .then(response => {

                        this.submitted = true;
                    })
                    .catch(e => {
                        alert("Erro ao tentar cadastrar. !!! " + e.message);

                    })

            } else {
                alert('Formulário incompleto !!!');
            }

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

        newFoto() {

            this.submitted = false;
            this.foto = {};
        },


    },
    mounted() {
        this.listProdutos();
        this.onFileSelection();

    }

}

</script>

<style>
.valid {
  background-color: chartreuse;
}

.inValid {
  background-color: red;
}
.submit-form {
    max-width: 300px;
    margin: auto;
}
</style>