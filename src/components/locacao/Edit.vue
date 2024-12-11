<template>
    <div id="tab_aut">

        <div v-if="currentLocacao" class="edit-form">
            <h3>Locação</h3>

            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li class="nav-item">
                    <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab"
                        aria-controls="pills-home" aria-selected="true">Dados Cadastrais</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab"
                        aria-controls="pills-profile" aria-selected="false">Acompanhamento</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab"
                        aria-controls="pills-contact" aria-selected="false">Observacoes</a>
                </li>
            </ul>
            <div class="tab-content" id="pills-tabContent">
                <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                    ...

                    <form class="was-validated">
                        <div class="mb-3">
                            <label for="inputID">ID:</label>
                            <input type="number" v-model="currentLocacao.id" class="form-control " id="inputID"
                                placeholder="ID" disabled required>
                        </div>

                        <div class="mb-3">
                            <label for="inputDataRetirada">Data Retirada:</label>
                            <input type="date" v-model="currentLocacao.data_retirada"
                                class="form-control is-invalid is-invalid" id="inputDataRetirada"
                                placeholder="Data Retirada" required>
                        </div>

                        <div class="mb-3">
                            <label for="inputDataPrevisaoEntrega">Data Previsao Entrega:</label>
                            <input type="date" v-model="currentLocacao.data_previsao_entrega"
                                class="form-control is-invalid" id="inputDataPrevisaoEntrega"
                                placeholder="Data Previsao Entrega" required>
                        </div>
                        <div class="mb-3">
                            <label for="inputDataEntrega">Data Entrega:</label>
                            <input type="date" v-model="currentLocacao.data_entrega" class="form-control "
                                id="inputDataEntrega" placeholder="Data Entrega" required>
                        </div>
                        <div class="mb-3">
                            <label for="inputDataPrevisaoPagamento">Data Previsao Pagamento:</label>
                            <input type="date" v-model="currentLocacao.data_previsao_pagamento"
                                class="form-control is-invalid" id="inputDataPrevisaoPagamento"
                                placeholder="Data Previsao Pagamento" required>
                        </div>
                        <div class="mb-3">
                            <label for="inputValorTotal">Valor Total:</label>
                            <input type="number" v-model="currentLocacao.valor_total" class="form-control "
                                id="inputValorTotal" placeholder="Valor Total" required>
                        </div>
                        <div class="mb-3">
                            <label for="inputValor">Valor Frete:</label>
                            <input type="number" v-model="currentLocacao.valor_frete" class="form-control "
                                id="inputValor" placeholder="Valor" required>
                        </div>
                        <div class="mb-3">
                            <label for="inputValorPago">Valor Pago:</label>
                            <input type="number" v-model="currentLocacao.valor_pago" class="form-control "
                                id="inputValorPago" placeholder="Valor Pago" required>
                        </div>


                        <div class="mb-3">
                            <label for="selectFuncionario">Funcionario:</label>
                            <select v-model="currentLocacao.funcionario" class="form-control is-invalid"
                                id="selectFuncionario">
                                <option v-for="f in funcionario" v-bind:key="f.cpf" v-bind:value="f.cpf">
                                    {{ f.nome_funcionario }}
                                </option>
                            </select>

                        </div>
                        <div class="mb-3">
                            <label for="selectTiposPagamento">Tipos Pagamento:</label>
                            <select v-model="currentLocacao.tipos_pagamento" class="form-control is-invalid"
                                id="selectTiposPagamento">
                                <option value="NA_RETIRADA">NA_RETIRADA</option>
                                <option value="ENTREGA_DEVOLUCAO">ENTREGA_DEVOLUCAO</option>
                                <option value="PARCELADO">PARCELADO</option>
                            </select>

                        </div>
                        <div class="mb-3">
                            <label for="selectReserva">Reserva:</label>
                            <select v-model="currentLocacao.reservas" class="form-control is-invalid" id="selectReserva"
                                required multiple>
                                <option v-for="r in reservas" :key="r.id" v-bind:value="r">
                                    {{ r.observacoes }}
                                </option>
                            </select>

                        </div>

                    </form>

                    <button type="button" class="btn btn-success" @click="updateLocacao">Salvar</button>
            <button type="button" class="btn btn-danger mr-2" @click="deleteLocacao">Delete</button>
            <button type="button" class="btn btn-danger mr-2" @click="voltar">Voltar</button>

                    <p>{{ message }}</p>

                </div>
                <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                    <table class="table table-striped table-inverse  table-primary">
                        <thead class="thead-inverse">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Status Locação</th>
                                <th scope="col">Data</th>
                                <th scope="col">Locacao ID</th>
                                <!-- <th scope="col">Alterar</th>
                        <th scope="col">Remover</th>-->
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(a, indice) in acompanhamento" :key="a.id"
                                :class="{ active: indice == currentIndex }"
                                v-show="filtrarAcompanhamento(a.id_locacao, currentLocacao.id)">
                                <td>{{ a.id }}</td>
                                <td>{{ a.statuslocacao }}</td>
                                <td>{{ a.data | formataData}}</td>
                                <td>{{ a.id_locacao }}</td>

                                <!-- <td><button v-on:click="setCurrentAcompanhamento(a, indice)" class="btn btn-warning "
                            type="button"><b-icon-pencil-square></b-icon-pencil-square></button></td>
                        <td><button v-on:click="remAcompanhamento(a, indice)" class="btn btn-danger" type="button"><b-icon-trash></b-icon-trash></button></td>-->

                            </tr>
                        </tbody>
                    </table>
                    <div class="submit-form">
                        <div v-if="!submitted">
                            <form class="was-validated">
                                <!--<div class="mb-3">
                    <label for="inputID">ID:</label>
                    <input type="number" v-model="acompanhamento.id" class="form-control " id="inputID"
                        placeholder="ID" disabled required>
                </div>-->
                                <!-- <div class="mb-3">
                    <label for="selectSequenciaPasso">Sequencia Passo:</label>
                    <select v-model="acompanhamento.sequencia_passo" class="form-control is-invalid" id="selectSequenciaPasso" required
                        multiple>
                        <option value="EM_ATRASO">EM_ATRASO</option>
                        <option value="PAGAMENTO">PAGAMENTO</option>
                       
                    </select>
                   
                </div>-->
                                <div class="mb-3">
                                    <label for="selectSituacaoID">Status Locacao:</label>
                                    <select v-model="acompanhamento.statusLocacao" class="form-control is-invalid"
                                        id="selectSituacaoID">
                                        <option value="EM_ATRASO">EM_ATRASO</option>
                                        <option value="AGUARDANDO_RETIRADA">AGUARDANDO_RETIRADA</option>
                                        <option value="EM_PREPARAÇÃO">EM_PREPARAÇÃO</option>
                                        <option value="CONCLUIDO">CONCLUIDO</option>

                                    </select>
                                
                                </div>
                                <div class="mb-3">
                                    <label for="inputData">Data:</label>
                                    <input type="date" v-model="acompanhamento.data" class="form-control is-invalid"
                                        id="inputData" placeholder="Data" required>

                                </div>
                                <div class="mb-3">
                                    <label for="inputObservacoes">Observacoes:</label>
                                    <textarea rows="10" cols="100" name="Observacoes" id="inputObservacoes"
                                        class="form-control is-invalid" v-model="acompanhamento.observacoes"
                                        required></textarea>


                                </div>
                                <!-- <div class="mb-3">
                    <label for="selectLocacaoID">Locacao ID:</label>
                    <select v-model="acompanhamento.id_locacao" class="form-control is-invalid" id="selectLocacaoID"
                        >
                        <option v-for="l in id_locacao" v-bind:key="l.id" v-bind:value="l">
                            {{ l.observacoes }}
                        </option>
                    </select>

                </div>-->

                            </form>
                            <button type="button" @click="saveAcompanhamento" class="btn btn-success">Salvar</button>
                            <!--  <router-link  to="/acompanhamentosbylocacao" class="btn btn-success">Voltar</router-link>-->


                        </div>

                        <div v-else>
                            <!-- <h4>Dados enviados com sucesso !</h4>
            <button class="btn btn-success" @click="newAcompanhamento">Novo</button>
            <router-link to="/acompanhamentosbylocacao" class="btn btn-success">Voltar</router-link>-->
                        </div>

                    </div>
                </div>
                <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                    <form class="was-validated">
                        <div>
                            <label for="inputObservacoes">Observacoes:</label>
                            <textarea rows="10" cols="100" name="Observacoes" id="inputObservacoes"
                                class="form-control " v-model="currentLocacao.observacoes" required></textarea>
                            

                        </div>
                    </form>


                </div>
            </div>

           


        </div>
        <div v-else>
            <br />
            <p>Please click on a Reserva...</p>
        </div>


    </div>
</template>
<script src="https://smtpjs.com/v3/smtp.js"></script>
<script>


import ReservaDataService from '../../services/ReservaDataService'
import LocacaoDateService from '../../services/LocacaoDateService'
import FuncionarioDataService from '../../services/FuncionarioDataService'
import AcompanhamentoDataService from '../../services/AcompanhamentoDataService';
export default {
    name: 'editloacacao',
    data() {
        return {
            acompanhamento: {
                indice: '',
                id: 0,
                statusLocacao: '',
                data: '',
                observacoes: '',
                id_locacao: [],


            },
            submitted: false,
            id_locacao: [],
            currentAcompanhamento: null,
            currentIndex: -1,
            currentLocacao: null,
            message: '',
            reservas: [],
            funcionario: [],
            tipos_pagamento: []
        }
    },
    methods: {
   sendEmail() {
            Email.send({
                Host: "smtp.seuisp.com",
               Username: "Alex Rbc",
                Password: "AR20,.er12;/",
                To: 'alexandrerbc@gmail.com',
                From: "alexandrerbc@gmail.com",
                Subject: this.acompanhamento.statusLocacao,
                Body: "Este é um email de teste enviado usando SMTP.js"
            })
            .then(function (message) {
                alert("Email enviado com sucesso") // Mensagem de alerta no envio bem-sucedido do email
            });
        },
        saveAcompanhamento() {

            var agd = jQuery.extend({}, this.acompanhamento);//clona o this.novo_cliente e armazena na variavel cliente. dessa forma alteracoes em this.novo_cliente nao irao refletir em cliente.
            agd.id_locacao = this.currentLocacao.id

            console.log('agd.id_locacoa: ' + agd.id_locacao)    
            if (agd.observacoes.trim().length > 0) {
                AcompanhamentoDataService.create(agd)
                    .then(response => {

                        this.submitted = true;
                        this.acompanhamento.push(agd)
                    })
                    .catch(e => {
                        alert("Erro ao tentar cadastrar. !!! " + e.message);

                    })

            } else {
                alert('Formulário incompleto !!!');
            }

        },
        newAcompanhamento() {

            this.submitted = false;
            this.acompanhamento = {};
        },
        filtrarAcompanhamento(a, l) {
            console.log(a)
            console.log(l)
            if (a == l) {
                return true
            } else {
                return false
            }
            /* if (a.id == this.currentAcompanhamento.id) {
                 return true
             } else {
                 return false                
             }*/
        },

        getLocacao(id) {

            LocacaoDateService.get(id)
                .then(response => {
                    console.log(response.data);
                    this.currentLocacao = response.data;

                })
                .catch(e => {
                    console.log(e);
                })
        },
        listReserva() {

            ReservaDataService.list2().then(response => {

                console.log("Retorno do seviço ReservaDataService.list", response.status);
                this.reservas = response.data


            }).catch(response => {

                // error callback
                alert('Não conectou no serviço ReservaDataService.list');
                console.log(response);
            });
        },
        listFuncionario() {
            FuncionarioDataService.list().then(response => {

                console.log("Retorno do seviço FuncionarioDataService.list", response.status);

                for (let f of response.data) {

                    this.funcionario.push(f);
                }
            }).catch(response => {

                // error callback
                alert('Não conectou no serviço FuncionarioDataService.list');
                console.log(response);
            });
        },
        updateLocacao() {
            
            LocacaoDateService.update(this.currentLocacao)
                .then(response => {
                    console.log('LocacaoDateService.update');
                    alert('Locacão alterado com sucesso !')
                    this.message = 'Locacão alterado com sucesso !';
                })
                .catch(e => {
                    console.log(e);
                })
        },
        deleteLocacao() {

            LocacaoDateService.delete(this.currentLocacao.id)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "locacoes-list" });
                })
                .catch(e => {

                    console.log(e);
                });
        },
        listarAcompanhamento() {

            AcompanhamentoDataService.list().then(response => {

                console.log("Retorno do seviço authenticateAcompanhamento", response.status);

                this.acompanhamento = response.data;

            }).catch(response => {

                // error callback
                alert('Não conectou no serviço listarAcompanhamento');
                console.log(response);

            });
        },
        setCurrentAcompanhamento(acompanhamento, index) {

            this.currentAcompanhamento = acompanhamento;
            this.currentIndex = index;
        },
        remAcompanhamento(acompanhamento, index) {

            AcompanhamentoDataService.delete(acompanhamento.id)
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    alert('Erro ao remover acompanhamento: ' + e)
                    console.log(e);
                });

        },
        refreshList() {
            this.listarAcompanhamento();
            this.currentTutorial = null;
            this.currentIndex = -1;
        },
        voltar() {
            this.$router.push({ name: "locacoes-list" });
        }
    },
    mounted() {

        this.message = '';
        this.listReserva();
        this.listarAcompanhamento();
        this.listFuncionario();
        this.getLocacao(this.$route.params.id);
        this.filtrarAcompanhamento();
    }
}
</script>

<style scoped>
.form-floating {
    padding: 20px;
    border: solid 1px #464646;
    outline: 0;
    width: 760px;
    height: 300px;
}

.edit-form {
    max-width: 700px;

    margin: auto;
}
</style>