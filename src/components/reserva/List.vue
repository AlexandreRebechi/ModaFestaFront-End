<template>
    <div id="tab_aut">


        <div id="tab" class="table-responsive">
            <h4>Listagem de Reservas</h4>
            <table class="table table-striped table-inverse table-primary">
                <thead class="thead-inverse">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Data Inicio</th>
                        <th scope="col">Data Fim</th>
                        <th scope="col">Valor</th>
                        <th scope="col">Valor Entrega</th>
                        <th scope="col">Valor Total</th>
                      
                        <th scope="col">Funcionario</th>
                        <th scope="col">Status Reserva</th>
                        <th scope="col">Alterar</th>
                        <th scope="col">Remover</th>
                    </tr>
                </thead>

                <tbody>

                    <tr v-for="(r, indice) in reservas " :key="r.id" :class="{ active: indice == currentIndex }" >
             
                        <td>{{ r.id }}</td>
                        <td>{{ r.data_inicio | formataData }}</td>
                        <td>{{ r.data_fim | formataData }}</td>
                        <td>{{ r.valor }}</td>
                        <td>{{ r.valor_entrega }}</td>
                        <td>{{ r.valor_total }}</td>
                
                        <td>{{ r.funcionario }}</td>
                        <td>{{ r.status_reserva }}</td>
                        <td><button v-on:click="setCurrentReserva(r, indice)" class="btn btn-warning "
                                type="button"><b-icon-pencil-square></b-icon-pencil-square></button></td>
                        <td><button v-on:click="remReserva(r, indice)" class="btn btn-danger"
                                type="button"><b-icon-trash></b-icon-trash></button>
                        </td>

                    </tr>
                    


                </tbody>
            </table>



        </div>

        <div class="col-md-6">
            <div v-if="currentReserva">
                <h4>Reserva</h4>
                <div>
                    <label><strong>ID:</strong></label> {{ currentReserva.id }}
                </div>
                <div>
                    <label><strong>Observacoes:</strong></label> {{ currentReserva.observacoes }}
                </div>

                <a class="badge badge-warning" :href="'/reserva/' + currentReserva.id">
                    Edit
                </a>
            </div>
            <div v-else>
                <br />
                <p>Please click on a Player...</p>
                <router-link to="/addreserva" class="badge badge-success">Novo</router-link>

            </div>
        </div>


    </div>
</template>
<script>
import { BIconTrash, BIconPencilSquare } from 'bootstrap-vue'
import ClienteDataService from '../../services/ClienteDataService';
import ReservaDataService from '../../services/ReservaDataService'
import PessoaDataService from '../../services/PessoaDataService';

export default {
    name: 'listReservas',
    data() {
        return {
            currentPessoa: null,
            reservas: [],
            pessoas: [],
            aux: '',
            currentReserva: null,
            currentIndex: -1,
            currentIndex2: -1
        }
    },
    components: {
        BIconTrash,
        BIconPencilSquare
    },
    methods: {
        FiltroFuncionario(f){
            let aux = JSON.parse(localStorage.getItem('authUser'))
            if (f == aux.cpf) {
                return true
            } else {
                return false
            }
        },
        listarPessoa() {
            console.log('pessoa.nome_cliente: ' + this.currentPessoa.cpf)
            PessoaDataService.list().then(response => {

                console.log("Retorno do seviço authenticateCliente", response.status);

                this.currentPessoa = response.data
                console.log('pessoa.nome_cliente: ' + this.currentPessoa.cpf)

            }).catch(response => {

                // error callback
                alert('Não conectou no serviço listCliente');
                console.log(response);
            });
        },

        listarReservas() {
            var aux = localStorage.getItem('authUser')
            console.log('aux: ' + aux)

            /*ReservaDataService.get2('19700178056').then(response => {
                console.log("Retorno do seviço authenticateReserva.get2", response.status);

                this.reservas = response.data;
            }).catch(response => {

                // error callback
                alert('Não conectou no serviço listarReserva.get2');
                console.log(response);
            })*/

            ReservaDataService.list().then(response => {

                console.log("Retorno do seviço authenticateReserva", response.status);

                this.reservas = response.data;

            }).catch(response => {

                // error callback
                alert('Não conectou no serviço listarReserva');
                console.log(response);
            });
        },
        setCurrentReserva(reserva, index) {

            this.currentReserva = reserva;
            this.currentIndex = index;
        },


        remReserva(reserva, index) {

            ReservaDataService.delete(reserva.id)
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    alert('Erro ao remover reserva1: '+e)
                    console.log(e);
                });

        },
        refreshList() {
            this.listarReservas();
            this.currentTutorial = null;
            this.currentIndex = -1;
        }

    },
    mounted() {

        this.listarReservas();
        


    }

}
</script>

<style scoped>
#tab {
    height: 80%;
}

.list {
    text-align: left;
    max-width: 750px;
    margin: auto;
}
</style>