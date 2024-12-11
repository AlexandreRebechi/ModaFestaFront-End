<template>
    <div class="submit-form">
        <div v-if="!submitted">
            <form class="submit-form">
            <div class="mb-3">
                <label for="inputID">ID:</label>
                <input type="number" v-model="perfil.id" class="form-control " id="inputID" placeholder="ID" disabled>
            </div>

            <div class="mb-3">
                <label for="inputDescricao">Descricao</label>
                <input type="text" v-model="perfil.descricao" class="form-control " id="inputDescricao" placeholder="Descricao" required>
            </div>

           
        </form>
        <form class="was-validated">
            <div class="mb-3">
                <label for="selectFuncionalidades">Funcionalidades:</label>
                <select v-model="perfil.funcionalidades" class="form-control is-invalid" id="selectFuncionalidades" multiple required>
                    <option v-for="f in funcionalidades" v-bind:key="f.id" v-bind:value="f.id">
                        {{ f.descricao }}
                    </option>
                </select>

            </div>

        </form>
        
            <button @click="savePerfil" class="btn btn-success">Salvar</button>
            <router-link to="/perfis" class="btn btn-success">Voltar</router-link>

        </div>

        <div v-else>
            <h4>Dados enviados com sucesso !</h4>
            <button class="btn btn-success" @click="newPerfil">Novo</button>
            <router-link to="/perfis" class="btn btn-success">Voltar</router-link>
        </div>
    </div>
</template>

<script>
import PerfilDataService from '../../services/PerfilDataService';
import FuncionalidadeDataService from '../../services/FuncionalidadeDataService';


export default {
    name: "addPerfil",
    data() {
        return {
            perfil: {
                indice: '',
                id: '',
                descricao: '',
                funcionalidades: []
            },
            submitted: false,
            funcionalidades: []
        }
    },
    computed: {
        isValidDescricao(){
            return isNaN(this.perfil.descricao)
      
    }
    },
    methods: {

        savePerfil() {

            var jgd = jQuery.extend({}, this.perfil);//clona o this.novo_perfil e armazena na variavel perfil. dessa forma alteracoes em this.novo_perfil nao irao refletir em perfil.                                                              

            if (jgd.descricao.trim().length > 0) {

                PerfilDataService.create(jgd)
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
        newPerfil() {

            this.submitted = false;
            this.perfil = {};
        },
        listFuncionalidades() {

            FuncionalidadeDataService.list().then(response => {

                console.log("Retorno do seviço FuncionalidadeDataService.list", response.status);

                for (let f of response.data) {

                    this.funcionalidades.push(f);
                }

            }).catch(response => {

                // error callback
                alert('Não conectou no serviço FuncionalidadeDataService.list');
                console.log(response);
            });
        }

    },
    mounted() {
        this.listFuncionalidades();

    }

}

</script>

<style>
.submit-form {
    max-width: 300px;
    margin: auto;
}
</style>