<template>
    <div class="submit-form">

        <div v-if="!submitted">
            <form class="was-validated">
                <div class="mb-3">
                    <label for="inputID">ID:</label>
                    <input type="number" v-model="reserva.id" class="form-control" id="inputID"
                        placeholder="ID" disabled >
                </div>

                <div class="mb-3">
                    <label for="inputDataInicio">Data Inicio:</label>
                    <input type="date" v-model="reserva.data_inicio" class="form-control is-invalid"
                        id="inputDataInicio" placeholder="Data Inicio" required>
                </div>

                <div class="mb-3">
                    <label for="inputDataFim">Data Fim:</label>
                    <input type="date" v-model="reserva.data_fim" class="form-control is-invalid" id="inputDataFim"
                        placeholder="Data Fim" required>
                </div>
                
                <div class="mb-3">
          <label for="inputObservacoes">Observacoes:</label>
          <textarea rows="5" cols="33"  name="Observacoes" id="inputObservacoes" class="form-control " v-model="reserva.observacoes" required></textarea>


        </div>
                <div class="mb-3">
                    <label for="selectCliente">Cliente:</label>
                    <select v-model="reserva.cliente" class="form-control is-invalid" id="selectCliente" required>
                        <option v-for="c in cliente" :key="c.cpf_pessoa" v-bind:value="c" >
                            {{ c.nome_cliente }}
                        </option>
                    </select>

                </div>
                <div class="mb-3">
                    <label for="selectFuncionario">Funcionario:</label>
                    <select v-model="reserva.funcionario" class="form-control is-invalid" id="selectFuncionario"
                    required>
                        <option v-for="f in funcionario" :key="f.cpf_pessoa" v-bind:value="f">
                            {{ f.nome_funcionario }}
                        </option>
                    </select>

                </div>
                <div class="mb-3">
                    <label for="selectStatusReserva">Status Reserva:</label>
                    <select v-model="reserva.status_reserva" class="form-control is-invalid" id="selectStatusReserva"
                    required>
                        <option value="EM_ANALISE">EM_ANALISE</option>
                         <option value="APROVADA">APROVADA</option>
                          <option value="NEGADA">NEGADA</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="selectProduto">Produto:</label>
                    <select v-model="reserva.produtos" class="form-control is-invalid" id="selectProduto" multiple required>
                        <option v-for="p in produtos" :key="p.id" v-bind:value="p">
                            {{ p.descricao }}
                        </option>
                    </select>

                </div>
            </form>
            <form class="submit-form">
                <div class="mb-3">
                    <label for="inputValor">Valor:</label>
                    <input type="number" v-model="reserva.valor" class="form-control " id="inputValor"
                        placeholder="Valor" required>
                </div>
              
                <div class="mb-3">
                    <label for="inputValorEntrega">Valor Entrega:</label>
                    <input type="number" v-model="reserva.valor_entrega" class="form-control "
                        id="inputValorEntrega" placeholder="Valor Entrega" required>
                </div>
                <div class="mb-3">
                    <label for="inputValorTotal">Valor Total:</label>
                    <input type="number" v-model="reserva.valor_total" class="form-control " id="inputValorTotal"
                        placeholder="Valor Total" required>
                </div>

            </form>
            <button @click="saveReserva" class="btn btn-success">Salvar</button>
            <router-link to="/reservas" class="btn btn-success">Voltar</router-link>

        </div>

        <div v-else>
            <h4>Dados enviados com sucesso !</h4>
            <button class="btn btn-success" @click="newReserva">Novo</button>
            <router-link to="/reservas" class="btn btn-success">Voltar</router-link>
        </div>
    </div>
</template>

<script>

import ReservaDataService from '../../services/ReservaDataService'
import ProdutoDataService from '../../services/ProdutoDataService'
import ClienteDataService from '../../services/ClienteDataService';
import FuncionarioDataService from '../../services/FuncionarioDataService';



export default {
    name: "addReserva",
    data() {
        return {
            reserva: {
                indice: '',
                id: '',
                data_inicio: '',
                data_fim: '',
                valor: '',
                valor_frete: '',
                valor_entrega: '',
                valor_total: '',
                observacoes: '',
                cliente: [],
                funcionario: [],
                status_reserva: [],
                produtos: []

            },
            submitted: false,
            produtos: [],
            cliente: [],
            funcionario: [],
            status_reserva: []
        }
    },
    methods: {

        saveReserva() {

            var rgd = jQuery.extend({}, this.reserva);//clona o this.novo_reserva e armazena na variavel reserva. dessa forma alteracoes em this.novo_reserva nao irao refletir em reserva.                                                              

            if (rgd.observacoes.trim().length > 0) {
                console.log("rgd: " + rgd)
                ReservaDataService.create(rgd)
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
        newReserva() {

            this.submitted = false;
            this.reserva = {};
        },
        listCliente() {
            ClienteDataService.list().then(response => {

                console.log("Retorno do seviço ClienteDataService.list", response.status);

                for (let c of response.data) {
                    console.log('teste: '+c.cpf)
                    this.cliente.push(c);
                }
            }).catch(response => {

                // error callback
                alert('Não conectou no serviço ProdutoDataService.list');
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
                alert('Não conectou no serviço ProdutoDataService.list');
                console.log(response);
            });
        },
        listProdutos() {

            ProdutoDataService.list().then(response => {

                console.log("Retorno do seviço ProdutoDataService.list", response.status);

                for (let p of response.data) {

                    this.produtos.push(p);
                }

            }).catch(response => {

                // error callback
                alert('Não conectou no serviço ProdutoDataService.list');
                console.log(response);
            });
        }

    },
    mounted() {
        this.listProdutos();
        this.listCliente();
        this.listFuncionario();
    }

}

</script>

<style>
.submit-form {
    max-width: 300px;
    margin: auto;
}
</style>