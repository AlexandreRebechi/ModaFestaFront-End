<template>
    <div class="submit-form">
        <div v-if="!submitted">
            <form class="was-validated">
                <div class="mb-3">
                    <label for="inputID">ID:</label>
                    <input type="number" v-model="parcelamento.id" class="form-control " id="inputID"
                        placeholder="ID" disabled required>
                </div>
                <div class="mb-3">
                    <label for="inputNumeroParcela">Numero Parcela:</label>
                    <input type="number" v-model="parcelamento.numero_parcela" class="form-control is-invalid"
                        id="inputNumeroParcela" placeholder="Numero Parcela" required>
                </div>
                <div class="mb-3">
                    <label for="inputDataPrevisaoPagamento">Data de Previsão de Pagamento:</label>
                    <input type="date" v-model="parcelamento.data_previsao_pagamento" class="form-control is-invalid"
                        id="inputDataPrevisaoPagamento" placeholder="Data de Previsão de Pagamento" required>
                </div>
                <div class="mb-3">
                    <label for="inputDataPagamento">Data Pagamento:</label>
                    <input type="date" v-model="parcelamento.data_pagamento" class="form-control is-invalid"
                        id="inputDataPagamento" placeholder="Data Pagamento" required>
                </div>
                <div class="mb-3">
                    <label for="inputValorTotal">Valor Total:</label>
                    <input type="number" v-model="parcelamento.valor_total" class="form-control "
                        id="inputValorTotal" placeholder="Valor Total" required>
                </div>
                <div class="mb-3">
                    <label for="inputValorPago">Valor Pago:</label>
                    <input type="number" v-model="parcelamento.valor_pago" class="form-control "
                        id="inputValorPago" placeholder="Valor Pago" required>
                </div>
                <div class="mb-3">
                    <label for="selectLocacaoID">Locacao ID:</label>
                    <select v-model="parcelamento.id_locacao" class="form-control is-invalid" id="selectLocacaoID">
                        <option v-for="l in id_locacao" :key="l.id" v-bind:value="l">
                            {{ l.observacoes }}
                        </option>
                    </select>

                </div>
            </form>
            <button @click="saveParcelamento" class="btn btn-success">Salvar</button>
            <router-link to="/parcelamentos" class="btn btn-success">Voltar</router-link>

        </div>

        <div v-else>
            <h4>Dados enviados com sucesso !</h4>
            <button class="btn btn-success" @click="newParcelamento">Novo</button>
            <router-link to="/parcelamentos" class="btn btn-success">Voltar</router-link>
        </div>
    </div>
</template>

<script>
import LocacaoDateService from '../../services/LocacaoDateService';
import ParcelamentoDataService from '../../services/ParcelamentoDataService'


export default {
    name: "addparcelamento",
    data() {
        return {
            parcelamento: {
                indice: '',
                id: 0,
                numero_parcela: '',
                data_previsao_pagamento: '',
                data_pagamento: '',
                valor_total: '',
                valor_pago: '',
                id_locacao: []

            },
            submitted: false,
            id_locacao: []

        }
    },
    methods: {

        saveParcelamento() {

            var par = jQuery.extend({}, this.parcelamento);//clona o this.novo_cliente e armazena na variavel cliente. dessa forma alteracoes em this.novo_cliente nao irao refletir em cliente.

            if (par.data_previsao_pagamento.trim().length > 0) {
                ParcelamentoDataService.create(par)
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
        newParcelamento() {

            this.submitted = false;
            this.parcelamento = {};
        },


    },
    mounted() {
        this.listLocacao();

    }

}
</script>

<style>
.submit-form {
    max-width: 300px;
    margin: auto;
}
</style>