<template>
    <div class="submit-form">
        <div v-if="!submitted">
            <form class="was-validated">

                <div class="mb-3">
                    <label for="inputID">ID:</label>
                    <input type="text" v-model="funcionalidade.id" class="form-control " id="inputID"
                        placeholder="ID" disabled required>
                </div>
                <div class="mb-3">
                    <label for="inputDescricao">Descricao:</label>
                    <input :class="{valid : isValidDescricao == true, inValid: isValidDescricao == false}" type="text" v-model="funcionalidade.descricao" class="form-control is-invalid"
                        id="inputDescricao" placeholder="Descricao" required>
                </div>
            </form>
            <button @click="saveFuncionalidade" class="btn btn-success">Salvar</button>
            <router-link to="/funcionalidades" class="btn btn-success">Voltar</router-link>

        </div>

        <div v-else>
            <h4>Dados enviados com sucesso !</h4>
            <button class="btn btn-success" @click="newFuncionalidade">Novo</button>
            <router-link to="/funcionalidades" class="btn btn-success">Voltar</router-link>
        </div>
    </div>
</template>

<script>

import FuncionalidadeDataService from '../../services/FuncionalidadeDataService';


export default {
    name: "addfuncinalidade",
    data() {
        return {
            funcionalidade: {
                indice: '',
                id: '',
                descricao: ''
            },
            submitted: false,
        }
    },
    computed: {
        isValidDescricao(){
            return isNaN(this.funcionalidade.descricao)
      
    }
    },
    methods: {

        saveFuncionalidade() {

            var ft = jQuery.extend({}, this.funcionalidade);//clona o this.funcionalidade e armazena na variavel funcionalidade. dessa forma alteracoes em this.novo_funcionalidade nao irao refletir em funcionalidade.
            delete ft.id
            if (ft.descricao.trim().length > 0) {

                FuncionalidadeDataService.create(ft)
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
        newFuncionalidade() {

            this.submitted = false;
            this.funcionalidade = {};
        },


    },
    mounted() {


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