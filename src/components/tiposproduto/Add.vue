<template>
    <div class="submit-form">
      <div v-if="!submitted">       
        <form class="was-validated">
       
        <div class="mb-3">
            <label for="inputID">ID:</label>
            <input type="text" v-model="tiposproduto.id" class="form-control " id="inputID" placeholder="ID" disabled required>
        </div>            
        <div class="mb-3">
                <label for="inputNome">Nome:</label>
                <input type="text" v-model="tiposproduto.nome" class="form-control is-invalid" id="inputNome" placeholder="Nome" required>
        </div>    
    </form>
        <button @click="saveTiposProduto" class="btn btn-success">Salvar</button>
        <router-link to="/tiposprodutos" class="btn btn-success">Voltar</router-link>                

      </div>
  
      <div v-else>
        <h4>Dados enviados com sucesso !</h4>
        <button class="btn btn-success" @click="newTiposProduto">Novo</button>
        <router-link to="/tiposprodutos" class="btn btn-success">Voltar</router-link>
      </div>
    </div>
  </template>

<script>

import TiposProdutoDataService from '../../services/TiposProdutoDataService';


    export default {
        name: "addtiposproduto",
        data(){
            return {
                tiposproduto: {indice: '', 
                                  
                                    id: '',
                                    nome: ''},
                submitted: false,
            }            
        },
        methods: {

            saveTiposProduto(){

                var tp = jQuery.extend({}, this.tiposproduto);//clona o this.tiposproduto e armazena na variavel funcionalidade. dessa forma alteracoes em this.novo_tiposproduto nao irao refletir em tiposproduto.
                delete tp.id
                if (tp.nome.trim().length > 0) {
                
                    TiposProdutoDataService.create(tp)
                    .then(response => {
                        
                        this.submitted = true;
                    })
                    .catch(e => {                        
                        alert("Erro ao tentar cadastrar. !!! " + e.message);

                    })

                }else{
                    alert('Formulário incompleto !!!');
                }

            },
            newTiposProduto(){

                this.submitted = false;
                this.tiposproduto = {};
            },
            

        },
        mounted() {                        
            
            
        }

    }

</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>