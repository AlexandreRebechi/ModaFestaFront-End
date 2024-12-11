<template>
    <div class="submit-form">

        <div v-if="!submitted">
            <form class="was-validated">
                <div class="mb-3">
                    <label for="inputID">ID:</label>
                    <input type="number" v-model="reserva.id" class="form-control " id="inputID" placeholder="ID"
                        disabled required>
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


                <!--  <div class="mb-3">
                    <label for="inputValor">Valor:</label>
                    <input type="number" v-model="reserva.valor" class="form-control " id="inputValor"
                        placeholder="Valor" disabled>
                </div>
              <div class="mb-3">
                    <label for="inputValorEntrega">Valor Entrega:</label>
                    <input type="number" v-model="reserva.valor_entrega" class="form-control is-invalid"
                        id="inputValorEntrega" placeholder="Valor Entrega" disabled>
                </div>
                <div class="mb-3">
                    <label for="inputValorTotal">Valor Total:</label>
                    <input type="number" v-model="reserva.valor_total" class="form-control is-invalid"
                        id="inputValorTotal" placeholder="Valor Total" disabled>
                </div>-->
                <div class="mb-3">
                    <label for="inputObservacoes">Observacoes:</label>
                    <textarea rows="5" cols="33" name="Observacoes" id="inputObservacoes" class="form-control "
                        v-model="reserva.observacoes" required></textarea>


                </div>
                <!-- <div class="mb-3">
                    <label for="selectCliente">Cliente:</label>
                    <select v-model="reserva.cliente" class="form-control " id="selectCliente">
                        <option v-for="c in cliente" :key="c.cpf_pessoa" v-bind:value="c">
                            {{ c.nome_cliente }}
                        </option>
                    </select>

                </div>-->
                <!--<div class="mb-3">
                    <label for="selectFuncionario">Funcionario:</label>
                    <select v-model="reserva.funcionario" class="form-control is-invalid" id="selectFuncionario">
                        <option v-for="f in funcionario" :key="f.cpf" v-bind:value="f">
                            {{ f.nome_funcionario }}
                        </option>
                    </select>

                </div>-->
                <div class="mb-3">
                    <label for="selectStatusReserva">Status Reserva:</label>
                    {{ reserva.status_reserva = "EM_ANALISE" }}
                </div>
                <div class="mb-3">
                    <label for="selectProduto">Produto:</label>
                   <table>
                        <table class="table table-striped table-inverse table-primary">
                            <thead class="thead-inverse">
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Descricao</th>
                                    <th scope="col">Valor Custo</th>
                                    <th scope="col">Imagens</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(p, indice) in currentProduto" :key="p.id"
                                    :class="{ active: indice == currentIndex }" >
                                    <td>{{ p.id }}</td>
                                    <td>{{ p.descricao }}</td>
                                    <td>{{ p.valor_custo }}</td>
                                    <td><img :src="p.b64" style="max-width: 3rem;"></td>

                                </tr>
                            </tbody>
                        </table>
                    </table>
                    

                </div>

                <div class="mb-3">
                    <label for="inputValorTotal">Valor Total:</label>
                    {{ somarValores() }}
                </div>
                <div class="mb-3" style="display: none;">
                    <label for="selectProduto">Produto:</label>
                    <select v-model="reserva.produtos" class="form-control" id="selectProduto" multiple required="true" disabled>
                        <option v-for="p in produtos" :key="p.id" v-bind:value="p" v-if="filtrarProduto(p.id)">
                            {{ p.descricao }}
                        </option>
                    </select>

                </div>
            </form>
            <button @click="saveReserva" class="btn btn-success">Salvar</button>
            <router-link to="/reservabycliente/:cpf" class="btn btn-success">Voltar</router-link>

        </div>

        <div v-else>
            <h4>Dados enviados com sucesso !</h4>
            <button class="btn btn-success" @click="newReserva">Novo</button>
            <router-link to="/reservabycliente/:cpf" class="btn btn-success">Voltar</router-link>
        </div>
    </div>
</template>

<script>

import ReservaDataService from '../../services/ReservaDataService'
import ProdutoDataService from '../../services/ProdutoDataService'
import ClienteDataService from '../../services/ClienteDataService';
import FuncionarioDataService from '../../services/FuncionarioDataService';
import { computed } from 'vue';

import FotoDataService from '../../services/FotoDataService';



export default {
    name: "addReserva2",
    data() {
        return {
            reserva: {
                indice: '',
                id: '',
                data_inicio: '',
                data_fim: '',
                valor: '0',
                valor_entrega: '0',
                valor_total: '0',
                observacoes: '',
                cliente: {},
                funcionario: [],
                status_reserva: 'EM_ANALISE',
                produtos: []

            },

            currentProduto: null,
            currentValorTotal: null,
            currentUser: null,
            currentIndex: -1,
            submitted: false,
            produtos: [],
            cart: [],
            funcionario: [],
            status_reserva: [],
            reservas: []
        }
    },
    computed: {

    },

    methods: {
        selecionarOpções(){
            var options = document.getElementById("product-select").options;
for (var i = 0; i < options.length; i++) {
  if (options[i].id == this.currentProduto[i].id) {
    options[i].selected = true;
    break;
  }

         
    }
},
        filtrarProduto(produtos) {
            //console.log('produtos reserva: '+ produtos  )
          
            this.currentProduto = window.localStorage.getItem("cart")
            if (this.currentProduto) {
                this.currentProduto = JSON.parse(this.currentProduto)
            }
            //console.log('this.currentProduto filtro: '+this.currentProduto[0].id)

            for (let index = 0; index < this.currentProduto.length; index++) {
                //  console.log(this.currentProduto)
                if (this.currentProduto[index].id == produtos) {
                    return true
                }

            }


        },
        mostrarValores(){
            console.log('valor: '+ this.currentValorTotal)
            return this.currentValorTotal
        },
        somarValores() {
            var rgd = jQuery.extend({}, this.reserva);//clona o this.novo_reserva e armazena na variavel reserva. dessa forma alteracoes em this.novo_reserva nao irao refletir em reserva.                                                                          
        
        rgd.valor = //parseFloat(rgd.valor)
        this.currentProduto = window.localStorage.getItem("cart")

        if (this.currentProduto) {
            this.currentProduto = JSON.parse(this.currentProduto)
        }

        let aux = 0
        let soma =0
       // rgd.valor
        for (let p = 0; p < this.currentProduto.length; p++) {
            rgd.valor += parseFloat(this.currentProduto[p].valor_custo)
            //console.log('rgd.valor3: '+ rgd.valor)
            soma +=  parseFloat(this.currentProduto[p].valor_custo)
            //console.log('soma3: '+soma)
        }
       // console.log('soma: ', soma)
       // this.currentSoma = soma
    ///  rgd.valor_total = soma
        this.currentUser = JSON.parse(localStorage.getItem('authUser'))
        let start = new Date(Date.parse(this.reserva.data_inicio))
        let end = new Date(Date.parse(this.reserva.data_fim))
        let diffInTime = Math.abs(end - start)
        let timeInOneDay = 1000 * 60 * 60 * 24
        let diffInDays = diffInTime / timeInOneDay
        rgd.valor_total =0
        if (diffInDays == 0) {
            aux = soma * 1
            //    console.log('data if rgb.valor: '+ rgd.valor)
        } else {
            aux = soma* diffInDays
            //console.log('data else rgb.valor: '+ rgd.valor)

        }
        if (soma != rgd.valor_total) {
          //  console.log('soma4: '+ soma)
        } else {
            
        }
       
        //let soma =0
        //rgd.valor_total =0
     //rgd.valor_total += soma
        this.currentTotal = rgd.valor_total
       // console.log('boolean: '+ isNaN(rgd.valor_total))
       let vt = rgd.valor_total
        if (isNaN(aux)) {
            
            return ''
        } else {
            return aux    
        }
       
    


           
        },

        adcionarCliente() {
            var o = new Object();




        },

        listarReservas() {
            this.currentReserva2 = JSON.parse(localStorage.getItem('authUser'))
            console.log('cpf: ' + this.currentReserva2)

            if (this.currentReserva2 == null) {
                alert('Não esta logado ==> ')
            } else {
                ReservaDataService.get2(this.currentReserva2.cpf).then(response => {
                    //    console.log("Retorno do seviço authenticateReserva.get2", response.status);
                    this.reservas = response.data
                    console.log(this.reservas.cliente)
                }).catch(response => {

                    // error callback
                    alert('Não conectou no serviço listarReserva.get2');
                    console.log(response);
                })
            }




        },
        calcularDateDiff() {
            let start = new Date(Date.parse(this.reserva.data_inicio))


        },
        setCurrentReserva(reserva, index) {

            this.currentReserva = reserva;
            this.currentIndex = index;
        },
        saveReserva() {

            var rgd = jQuery.extend({}, this.reserva);//clona o this.novo_reserva e armazena na variavel reserva. dessa forma alteracoes em this.novo_reserva nao irao refletir em reserva.                                                                          

            rgd.valor = parseFloat(rgd.valor)
            this.currentProduto = window.localStorage.getItem("cart")

            if (this.currentProduto) {
                this.currentProduto = JSON.parse(this.currentProduto)
            }


            /*  for (let index = 0; index < this.currentProduto.length; index++) {
              //  console.log(this.currentProduto)
                //rgd.produtos = this.currentProduto[index].item
                //console.log('rgd.produtos: '+ rgd.produtos)
                
            }*/
            // console.log('this.currentProduto[p].id: ', this.currentProduto)
            let aux = 0
            for (let p = 0; p < this.currentProduto.length; p++) {

                //    rgd.valor += parseFloat(rgd.produtos[p].valor_custo)
                //  console.log('rgd.produtos[p].valor_custo: ' + rgd.produtos[p].valor_custo)


                //console.log('rpv2: ' + this.currentProduto[p].valor_custo)
                console.log('p: ' + p)
                rgd.valor += parseFloat(this.currentProduto[p].valor_custo)
                rgd.produtos[p] = this.currentProduto[p]
            }
            aux = rgd.valor
            console.log('rgd.valor: ' + rgd.valor)
            this.currentUser = JSON.parse(localStorage.getItem('authUser'))
            let start = new Date(Date.parse(this.reserva.data_inicio))
            let end = new Date(Date.parse(this.reserva.data_fim))
            let diffInTime = Math.abs(end - start)
            let timeInOneDay = 1000 * 60 * 60 * 24
            let diffInDays = diffInTime / timeInOneDay
            if (diffInDays == 0) {
                rgd.valor = (parseFloat(rgd.valor)) * 1
                //    console.log('data if rgb.valor: '+ rgd.valor)
            } else {
                rgd.valor = parseFloat(rgd.valor) * diffInDays
                //console.log('data else rgb.valor: '+ rgd.valor)

            }
            /* if (new Date(rgd.data_fim) <= new Date().toLocaleDateString('us-US')) {
                var multa = 0
                rgd.valor_entrega = rgd.valor + multa
            } else {
                multa = 200
                console.log('rgd.valor: ' + rgd.valor)
                rgd.valor_entrega = parseFloat(rgd.valor) + multa
                console.log('rgb.valor_entrega: ' + rgd.valor_entrega)
            }*/
            rgd.valor_total = 0
            rgd.valor_total += parseFloat(rgd.valor)
            
            rgd.valor = aux
            for (let index = 0; index < this.currentProduto.length; index++) {
                        rgd.produtos[index] = this.currentProduto[index]
                
            }

            rgd.cliente = this.currentUser
            console.log(this.currentReserva2)
            if (rgd.observacoes.trim().length > 0) {

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
        listProdutos() {
            FotoDataService.list2().then(response => {
                for (let p of response.data) {
                    this.reserva.produtos.push(p)
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

        this.listFuncionario();
        this.listarReservas();
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