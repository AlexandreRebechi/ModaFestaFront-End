<template>
    <div id="tab_aut">

        <div v-if="currentReserva" class="edit-form">
            <h3>Reserva</h3>
            <form class="was-validated">
           <div class="mb-3">
                <label for="inputID">ID:</label>
                <input type="number" v-model="currentReserva.id" class="form-control" id="inputID" placeholder="ID" disabled required>
            </div>

            <div class="mb-3">
                <label for="inputDataInicio">Data Inicio:</label>
                <input type="date" v-model="currentReserva.data_inicio" class="form-control is-invalid" id="inputDataInicio" placeholder="Data Inicio" required>
            </div>
            
            <div class="mb-3">
                <label for="inputDataFim">Data Fim:</label>
                <input type="date" v-model="currentReserva.data_fim" class="form-control is-invalid" id="inputDataFim" placeholder="Data Fim" required>
            </div>
            <div class="mb-3">
                <label for="inputValor">Valor:</label>
                <input type="number" v-model="currentReserva.valor" class="form-control " id="inputValor" placeholder="Valor" required>
            </div>
            <div class="mb-3">
                <label for="inputValorEntrega">Valor Entrega:</label>
                <input type="number" v-model="currentReserva.valor_entrega" class="form-control " id="inputValorEntrega" placeholder="Valor Entrega" required>
            </div>
            <div class="mb-3">
                <label for="inputValorTotal">Valor Total:</label>
                <input type="number" v-model="currentReserva.valor_total" class="form-control " id="inputValorTotal" placeholder="Valor Total" required>
            </div>
            <div class="mb-3">
          <label for="inputObservacoes">Observacoes:</label>
          <textarea rows="5" cols="33"  name="Observacoes" id="inputObservacoes" class="form-control " v-model="currentReserva.observacoes" required></textarea>


        </div>
            <div class="mb-3">
                    <label for="selectCliente">Cliente:</label>
                    <select v-model="currentReserva.cliente" class="form-control is-invalid" id="selectCliente" >
                        <option v-for="c in cliente" v-bind:key="c.cpf" v-bind:value="c.cpf">
                            {{ c.nome_cliente }}
                        </option>
                    </select>

                </div>
                <div class="mb-3">
                    <label for="selectFuncionario">Funcionario:</label>
                    <select v-model="currentReserva.funcionario" class="form-control is-invalid" id="selectFuncionario">
                        <option v-for="f in funcionario" v-bind:key="f.cpf" v-bind:value="f.cpf">
                            {{ f.nome_funcionario }}
                        </option>
                    </select>

                </div>
               <div class="mb-3">
                    <label for="selectStatusReserva">Status Reserva:</label>
                    <select v-model="currentReserva.status_reserva" class="form-control is-invalid" id="selectStatusReserva"
                        >
                        <option value="EM_ANALISE">EM_ANALISE</option>
                         <option value="APROVADA">APROVADA</option>
                          <option value="NEGADA">NEGADA</option>
                    </select>
                </div>
           
            <div class="mb-3">
                <label for="selectProduto">Produto:</label>
                <select v-model="currentReserva.produtos" class="form-control is-invalid" id="selectProduto"  required multiple>
                    <option v-for="p in produtos" :key="p.id" v-bind:value="p">
                        {{ p.descricao }}
                    </option>
                </select>

            </div>
            </form>
            <button type="button" class="btn btn-success" @click="updateReserva">Salvar</button>
            <button type="button" class="btn btn-danger mr-2" @click="deleteReserva">Delete</button>
            <button type="button" class="btn btn-danger mr-2" @click="voltar">Voltar</button>

            <p>{{ message }}</p>

        </div>
        <div v-else>
            <br />
            <p>Please click on a Reserva...</p>
        </div>


    </div>
</template>
<script>

import ClienteDataService from '../../services/ClienteDataService';
import FuncionarioDataService from '../../services/FuncionarioDataService';
import ProdutoDataService from '../../services/ProdutoDataService';
import ReservaDataService from '../../services/ReservaDataService'

export default {
    name: 'editReserva',
    data() {
        return {
            currentReserva: null,
            message: '',
            produtos: [],
            cliente: [],
            funcionario: [],
            status_reserva: []
        }
    },
    methods: {

        getReserva(id) {

            ReservaDataService.get(id)
                .then(response => {
                    console.log(response.data);
                    this.currentReserva = response.data;

                })
                .catch(e => {
                    console.log(e);
                })
        },
        listProduto() {

            ProdutoDataService.list().then(response => {

                console.log("Retorno do seviço ProdutoDataService.list", response.status);
                
                this.produtos = response.data;
               
            }).catch(response => {

                // error callback
                alert('Não conectou no serviço ProdutoDataService.list');
                console.log(response);
            });
        },
        listCliente() {
            ClienteDataService.list().then(response => {

                console.log("Retorno do seviço ClienteDataService.list", response.status);

                for (let c of response.data) {

                    this.cliente.push(c);
                }
            }).catch(response => {

                // error callback
                alert('Não conectou no serviço ClienteDataService.list');
                console.log(response);
            });
        },
        listFuncionario() {
            let aux = JSON.parse(localStorage.getItem('authUser'))
            console.log(aux.cpf)
            FuncionarioDataService.list().then(response => {

                console.log("Retorno do seviço FuncionarioDataService.list", response.status);

                for (let f of response.data) {
                    if (aux.cpf == f.cpf) {
                        this.funcionario.push(f);
                    }
                   
                }
            }).catch(response => {

                // error callback
                alert('Não conectou no serviço FuncionarioDataService.list');
                console.log(response);
            });
        },
        updateReserva() {
            alert(this.currentReserva.cliente);
            
            ReservaDataService.update(this.currentReserva)
                .then(response => {
                    console.log('ReservaDataService.update');
                    this.message = 'Reserva alterado com sucesso !';
                })
                .catch(e => {
                    console.log(e);
                })
        },
        deleteReserva() {

            ReservaDataService.delete(this.currentReserva.id)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "reservas-list" });
                })
                .catch(e => {
               
                    console.log(e);
                });
        },
        voltar() {
            this.$router.push({ name: "reservas-list" });
        }
    },
    mounted() {

        this.message = '';
        this.listProduto();
        this.listCliente();
        this.listFuncionario();
        this.getReserva(this.$route.params.id);
    }
}
</script>

<style scoped>
.edit-form {
    max-width: 300px;
    margin: auto;
}
</style>