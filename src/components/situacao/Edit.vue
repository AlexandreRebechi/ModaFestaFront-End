<template>
    <div id="tab_aut">

        <div v-if="currentSituacao" class="edit-form">
            <h3>Situacao</h3>
            <form class="was-validated">
                <div class="mb-3">
                    <label for="inputID">ID:</label>
                    <input type="text" v-model="currentSituacao.id" class="form-control " id="inputID"
                        placeholder="ID" disabled required>
                </div>
                <div class="mb-3">
                    <label for="inputDescricao">Descricao:</label>
                    <input type="text" v-model="currentSituacao.descricao" class="form-control is-invalid"
                        id="inputDescricao" placeholder="Descricao" required>
                </div>

            </form>
            <button class="badge badge-success" @click="updateSituacao">Salvar</button>
            <button class="badge badge-danger mr-2" @click="deleteSituacao">Delete</button>
            <button class="badge badge-danger mr-2" @click="voltar">Voltar</button>


            <p>{{ message }}</p>

        </div>
        <div v-else>
            <br />
            <p>Please click on a Situacao...</p>
        </div>


    </div>
</template>
<script>

import SituacaoDataService from '../../services/SituacaoDataService';

export default {
    name: 'editSituacao',
    data() {
        return {
            currentSituacao: null,
            message: ''
        }
    },
    methods: {

        getSituacao(id) {
            console.log("id situacao edit: "+ id)
            SituacaoDataService.get(id)
                .then(response => {
            
                    this.currentSituacao = response.data;

                })
                .catch(e => {
                    console.log(e);
                })
        },
        updateSituacao() {
            console.log("currentSituacao edit: "+ this.currentSituacao.id)
            alert(this.currentSituacao.id)
            SituacaoDataService.update(this.currentSituacao)
                .then(response => {
                    console.log('SituacaoDataService.update');
                    this.message = 'Situacao alterada com sucesso !';
                })
                .catch(e => {
                    console.log(e);
                })
        },
        deleteSituacao() {

            SituacaoDataService.delete(this.currentSituacao.id)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "situacoes-list" });
                })
                .catch(e => {
                    console.log(e);
                });
        },
        voltar() {
            this.$router.push({ name: "situacoes-list" });
        }
    },
    mounted() {

        this.message = '';
        this.getSituacao(this.$route.params.id);
    }
}
</script>

<style scoped>
.edit-form {
    max-width: 300px;
    margin: auto;
}
</style>