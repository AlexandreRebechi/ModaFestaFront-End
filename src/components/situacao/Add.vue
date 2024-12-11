<template>
    <div class="submit-form">
      <div v-if="!submitted">       

       <form class="was-validated">
        <div class="mb-3">
            <label for="inputID">ID:</label>
            <input type="text" v-model="situacao.id" class="form-control " id="inputID" placeholder="ID" disabled required>
        </div>            
        <div class="mb-3">
                <label for="inputDescricao">Descricao:</label>
                <input type="text" v-model="situacao.descricao" class="form-control is-invalid" id="inputDescricao" placeholder="Descricao" required>
        </div>    
    </form>
        <button @click="saveSituacao" class="btn btn-success">Salvar</button>
        <router-link to="/situacoes" class="btn btn-success">Voltar</router-link>                

      </div>
  
      <div v-else>
        <h4>Dados enviados com sucesso !</h4>
        <button class="btn btn-success" @click="newSituacao">Novo</button>
        <router-link to="/situacoes" class="btn btn-success">Voltar</router-link>
      </div>
    </div>
  </template>

<script>

import SituacaoDataService from '../../services/SituacaoDataService';
    export default {
        name: "addsituacao",
        data(){
            return {
                situacao: {indice: '', 
                                  
                                    id: '',
                                    descricao: ''},
                submitted: false,
            }            
        },
        methods: {

            saveSituacao(){

                var st = jQuery.extend({}, this.situacao);//clona o this.situacao e armazena na variavel sitacao. dessa forma alteracoes em this.novo_sitacao nao irao refletir em sitacao.
              
             
                if (st.descricao.trim().length > 0) {
                
                    SituacaoDataService.create(st)
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
            newSituacao(){

                this.submitted = false;
                this.situacao = {};
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