<template>
    <div class="submit-form">
        <div v-if="!submitted">
            <form class="was-validated">
                <div class="mb-3">
                    <label for="inputID">ID:</label>
                    <input type="number" v-model="locacao.id" class="form-control " id="inputID" placeholder="ID"
                        disabled required>
                </div>

                <div class="mb-3">
                    <label for="inputDataRetirada">Data Retirada:</label>
                    <input type="date" v-model="locacao.data_retirada" class="form-control is-invalid is-invalid"
                        id="inputDataRetirada" placeholder="Data Retirada" required>
                </div>

                <div class="mb-3">
                    <label for="inputDataPrevisaoEntrega">Data Previsao Entrega:</label>
                    <input type="date" v-model="locacao.data_previsao_entrega" class="form-control is-invalid"
                        id="inputDataPrevisaoEntrega" placeholder="Data Previsao Entrega" required>
                </div>
                <!--  <div class="mb-3">
                    <label for="inputDataEntrega">Data Entrega:</label>
                    <input type="date" v-model="locacao.data_entrega" class="form-control is-invalid"
                        id="inputDataEntrega" placeholder="Data Entrega" required>
                </div>-->
                <div class="mb-3">
                    <label for="inputDataPrevisaoPagamento">Data Previsao Pagamento:</label>
                    <input type="date" v-model="locacao.data_previsao_pagamento" class="form-control is-invalid"
                        id="inputDataPrevisaoPagamento" placeholder="Data Previsao Pagamento" required>
                </div>
                <div class="mb-3">
                    <label for="inputValorTotal">Valor Total:</label>
                  {{ somarValores() }}

                </div>


                <!-- <div class="mb-3">
                    <label for="inputValorPago">Valor Pago:</label>
                    <input type="number" v-model="locacao.valor_pago" class="form-control is-invalid"
                        id="inputValorPago" placeholder="Valor Pago">
                </div>-->
                <div class="mb-3">
                    <label for="inputObservacoes">Observacoes:</label>
                    <textarea rows="5" cols="33" name="Observacoes" id="inputObservacoes" class="form-control "
                        v-model="locacao.observacoes" required></textarea>


                </div>
                <div class="mb-3">
                    <label for="selectFuncionario">Funcionario:</label>
                    <select v-model="locacao.funcionario" class="form-control is-invalid" id="selectFuncionario"
                        required>
                        <option v-for="f in funcionario" :key="f.cpf_pessoa" v-bind:value="f">
                            {{ f.nome_funcionario }}
                        </option>
                    </select>

                </div>

                <div class="mb-3">
                    <label for="selectTiposPagamento">Tipos Pagamento:</label>
                    <select v-model="locacao.tipos_pagamento" class="form-control is-invalid" id="selectTiposPagamento"
                        required>
                        <option value="NA_RETIRADA">NA_RETIRADA</option>
                        <option value="ENTRADA_DEVOLUCAO">ENTRADA_DEVOLUCAO</option>
                        <option value="PARCELADO">PARCELADO</option>
                    </select>

                </div>
                <div class="mb-3">
                    <label for="selectReserva">Reserva:</label>

                    <select v-model="locacao.reservas" class="form-control is-invalid" id="selectReserva" required
                        multiple>
                        <option v-for="r in reservas" :key="r.id" v-bind:value="r">
                            {{ r.observacoes }}
                            {{ r.valor_total }}
                        </option>
                    </select>

                </div>
            </form>
            <form class="submit-form">

                <div class="mb-3">
                    <label for="inputValor">Valor Frete:</label>
                    <input type="number" v-model="locacao.valor_frete" class="form-control " id="inputValor"
                        placeholder="Valor" :required="false">
                </div>
            </form>
            <!--  <div class="mb-3">
                    <label for="inputDataPrevisaoEntrega">Data Acompanhamento:</label>
                    <input type="date" v-model="acompanhamento.data" class="form-control is-invalid"
                        id="inputDataPrevisaoEntrega" placeholder="Data Previsao Entrega" required>
                </div>-->
            <!-- <button @click="saveLocacao || saveAcompanhamento" class="btn btn-success">Salvar</button> -->
            <button @click="saveLocacao" class="btn btn-success">Salvar</button>
            <router-link to="/locacoes" class="btn btn-success">Voltar</router-link>

        </div>

        <div v-else>
            <h4>Dados enviados com sucesso !</h4>
            <!--    <button class="btn btn-success" @click="newLocacao || newAcompanhamento">Novo</button>-->
            <button class="btn btn-success" @click="newLocacao || newAcompanhamento">Novo</button>
            <router-link to="/locacoes" class="btn btn-success">Voltar</router-link>
        </div>

    </div>
</template>

<script>

import FuncionarioDataService from '../../services/FuncionarioDataService';
import ReservaDataService from '../../services/ReservaDataService';
import LocacaoDateService from '../../services/LocacaoDateService';
import Add from '../acompanhamento/Add.vue';
import AcompanhamentoDataService from '../../services/AcompanhamentoDataService';


export default {
    name: "addLocacao",
    data() {
        return {
            /*  acompanhamento: {
                  indice: '',
                  id: 0,
                  statusLocacao: '',
                  data: '',
                  observacoes: '',
                  id_locacao: [],
  
  
              },*/
            submitted2: false,
            id_locacao: [],
            locacao: {
                indice: '',
                id: '',
                data_retirada: '',
                data_previsao_entrega: '',
                data_entrega: null,
                data_previsao_pagamento: '',
                valor_total: 0,
                valor_frete: 0,
                valor_pago: 0,
                observacoes: '',
                funcionario: [],
                tipos_pagamento: [],
                reservas: []
            },
            submitted: false,
           
            reservas: [],
            funcionario: []
        }
    },

    methods: {
       somarValores() {
            let aux = 0
            
            //console.log('this.locacao.reservas.length: ' + this.locacao.reservas.length)
            for (let index = 0; index < this.locacao.reservas.length; index++) {
                aux += parseFloat(this.locacao.reservas[index].valor_total)

                console.log('this.reservas[index].valor_total: ' + this.locacao.reservas[index].valor_total)

            }

           // console.log(this.reservas[3].valor_total)
            
           aux += parseFloat(this.locacao.valor_frete)
            return aux



        },
        /* saveAcompanhamento() {
 
             var agd = jQuery.extend({}, this.acompanhamento);//clona o this.novo_cliente e armazena na variavel cliente. dessa forma alteracoes em this.novo_cliente nao irao refletir em cliente.
             agd.statusLocacao = 'EM_PREPARAÇÃO'
         
             console.log('agd.data: '+ agd.data)
             agd.observacoes = 'adasdasd'
             agd.id_locacao = this.locacao.id
             console.log('ola: '+this.locacao.id)
             if (agd.observacoes.trim().length > 0) {
                 AcompanhamentoDataService.create(agd)
                     .then(response => {
 
                         this.submitted = true;
 
                     })
                     .catch(e => {
                         alert("Erro ao tentar cadastrar. !!! " + e.message);
 
                     })
 
             } else {
                 alert('Formulário incompleto !!!');
             }
 
         },*/
        saveLocacao() {
            let aux = 0
            var L = jQuery.extend({}, this.locacao);//clona o this.novo_Locacao e armazena na variavel Locacao. dessa forma alteracoes em this.novo_Locacao nao irao refletir em Locacao.                                                              
          for (let index = 0; index < L.reservas.length; index++) {

                aux += parseFloat(L.reservas[index].valor_total)

                console.log('L.reservas[index].valor_total: ' + L.reservas[index].valor_total)
            }
           L.valor_total = aux + parseFloat(L.valor_frete);
            if (L.observacoes.trim().length > 0) {

                LocacaoDateService.create(L)
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
        newLocacao() {

            this.submitted = false;
            this.locacao = {};
        },
        /*  newAcompanhamento() {
    
                this.submitted2 = false;
                this.acompanhamento = {};
            },*/
        listFuncionario() {
            let aux = JSON.parse(localStorage.getItem('authUser'))

            FuncionarioDataService.list().then(response => {

                console.log("Retorno do seviço FuncionarioDataService.list", response.status);

                for (let f of response.data) {
                    if (aux.cpf == f.cpf) {
                        this.funcionario.push(f);
                    }
                    //this.funcionario.push(f);
                    console.log('this.funcionario.push(f): ' + this.funcionario.push(f))
                }
            }).catch(response => {

                // error callback
                alert('Não conectou no serviço ProdutoDataService.list');
                console.log(response);
            });
        },
        listReservas() {

            ReservaDataService.list2().then(response => {

                console.log("Retorno do seviço ReservaDataService.list", response.status);

                for (let r of response.data) {
                    if (r.status_reserva == 'APROVADA') {
                       // this.locacao.reservas.push(r)
                        this.reservas.push(r)
                    }
                  
                }

            }).catch(response => {

                // error callback
                alert('Não conectou no serviço ReservaDataService.list');
                console.log(response);
            });
        }

    },
    mounted() {
        //  this.saveAcompanhamento();
        this.listReservas();
        this.listFuncionario();
        this.somarValores();
    }

}

</script>

<style>
.submit-form {
    max-width: 300px;
    margin: auto;
}
</style>