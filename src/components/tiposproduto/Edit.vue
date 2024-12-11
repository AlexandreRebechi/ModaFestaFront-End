<template>
    <div id="tab_aut">

        <div v-if="currentTiposProduto" class="edit-form">
            <h3>TiposProduto</h3>
            <form class="was-validated">

                <div class="mb-3">
                    <label for="inputID">ID:</label>
                    <input type="text" v-model="currentTiposProduto.id" class="form-control " id="inputID"
                        placeholder="ID" disabled required>
                </div>
                <div class="mb-3">
                    <label for="inputNome">Nome:</label>
                    <input type="text" v-model="currentTiposProduto.nome" class="form-control is-invalid" id="inputNome"
                        placeholder="Nome" required>
                </div>

            </form>
            <button class="badge badge-success" @click="updateTiposProduto">Salvar</button>
            <button class="badge badge-danger mr-2" @click="deleteTiposProduto">Delete</button>
            <button class="badge badge-danger mr-2" @click="voltar">Voltar</button>


            <p>{{ message }}</p>

        </div>
        <div v-else>
            <br />
            <p>Please click on a TiposProduto...</p>
        </div>


    </div>
</template>
<script>

import TiposProdutoDataService from '../../services/TiposProdutoDataService';


export default {
    name: 'edittiposprodutos',
    data() {
        return {
            currentTiposProduto: null,
            message: ''
        }
    },
    methods: {

        getTiposProduto(id) {

            TiposProdutoDataService.get(id)
                .then(response => {
                    console.log(response.data);
                    this.currentTiposProduto = response.data;

                })
                .catch(e => {
                    console.log(e);
                })
        },
        updateTiposProduto() {
            alert(this.currentTiposProduto.id)
            TiposProdutoDataService.update(this.currentTiposProduto)
                .then(response => {
                    console.log('TiposProdutoDataService.update');
                    this.message = 'TiposProduto alterada com sucesso !';
                })
                .catch(e => {
                    console.log(e);
                })
        },
        deleteTiposProduto() {

            TiposProdutoDataService.delete(this.currentTiposProduto.id)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "tiposprodutos-list" });
                })
                .catch(e => {
                    console.log(e);
                });
        },
        voltar() {
            this.$router.push({ name: "tiposprodutos-list" });
        }
    },
    mounted() {

        this.message = '';
        this.getTiposProduto(this.$route.params.id);
    }
}
</script>

<style scoped>
.edit-form {
    max-width: 300px;
    margin: auto;
}
</style>