<template>
    <div id="tab_aut">

        <div v-if="currentParcelamento" class="edit-form">
            <h3>Parcelamento</h3>
            <form class="was-validated">
            <div class="mb-3">
                <label for="inputID">ID:</label>
                <input type="number" v-model="currentParcelamento.id" class="form-control " id="inputID" placeholder="ID" disabled required>
            </div>
            <div class="mb-3">
                <label for="inputNumeroParcela">Numero Parcela:</label>
                <input type="number" v-model="currentParcelamento.numero_parcela" class="form-control is-invalid" id="inputNumeroParcela" placeholder="Numero Parcela" required>
            </div>
            <div class="mb-3">
                <label for="inputDataPrevisaoPagamento">Data de Previsão de Pagamento:</label>
                <input type="date" v-model="currentParcelamento.data_previsao_pagamento" class="form-control is-invalid" id="inputDataPrevisaoPagamento" placeholder="Data de Previsão de Pagamento" required>
            </div>
            <div class="mb-3">
                <label for="inputDataPagamento">Data Pagamento:</label>
                <input type="date" v-model="currentParcelamento.data_pagamento" class="form-control is-invalid" id="inputDataPagamento" placeholder="Data Pagamento" required>
            </div>
            <div class="mb-3">
                <label for="inputValorTotal">Valor Total:</label>
                <input type="number" v-model="currentParcelamento.valor_total" class="form-control " id="inputValorTotal" placeholder="Valor Total" required>
            </div>
            <div class="mb-3">
                <label for="inputValorPago">Valor Pago:</label>
                <input type="number" v-model="currentParcelamento.valor_pago" class="form-control " id="inputValorPago" placeholder="Valor Pago" required>
            </div>
            <div class="mb-3">
                    <label for="selectLocacaoID">Locacao ID:</label>
                    <select v-model="currentParcelamento.id_locacao" class="form-control is-invalid" id="selectLocacaoID">
                        <option v-for="l in id_locacao" v-bind:key="l.id" v-bind:value="l.id">
                            {{ l.observacoes }}
                        </option>
                    </select>

                </div>
        </form>
        
            <button type="button" class="btn btn-success" @click="updateParcelamento">Salvar</button>
            <button type="button" class="btn btn-danger mr-2" @click="deleteParcelamento">Delete</button>
            <button type="button" class="btn btn-danger mr-2" @click="voltar">Voltar</button>

            <p>{{ message }}</p>

        </div>
        <div v-else>
            <br />
            <p>Please click on a Parcelamento...</p>
        </div>


    </div>
</template>
<script>

import LocacaoDateService from '../../services/LocacaoDateService';
import ParcelamentoDataService from '../../services/ParcelamentoDataService'

export default {
    name: 'editParcelamento',
    data() {
        return {
            currentParcelamento: null,
            message: '',
            id_locacao: []
        }
    },
    methods: {

        getParcelamento(id) {

            ParcelamentoDataService.get(id)
                .then(response => {
                    console.log(response.data);
                    this.currentParcelamento = response.data;

                })
                .catch(e => {
                    console.log(e);
                })
        },
        updateParcelamento() {
            alert(this.currentParcelamento.parcelamento);
            ParcelamentoDataService.update(this.currentParcelamento)
                .then(response => {
                    console.log('ParcelamentoDataService.update');
                    this.message = 'Parcelamento alterado com sucesso !';
                })
                .catch(e => {
                    console.log(e);
                })
        },
        listLocacao() {
            LocacaoDateService.list().then(response => {

                console.log("Retorno do seviço LocacaoDateService.list", response.status);

                for (let l of response.data) {

                    this.id_locacao.push(l);
                }
            }).catch(response => {

                // error callback
                alert('Não conectou no serviço ProdutoDataService.list');
                console.log(response);
            });

        },
        deleteParcelamento() {

            ParcelamentoDataService.delete(this.currentParcelamento.id)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "parcelamentos-list" });
                })
                .catch(e => {
                    console.log(e);
                });
        },
        voltar() {
            this.$router.push({ name: "parcelamentos-list" });
        }
    },
    mounted() {
        this.listLocacao()
        this.message = '';
        this.getParcelamento(this.$route.params.id);
    }
}
</script>

<style scoped>
.edit-form {
    max-width: 300px;
    margin: auto;
}
</style>