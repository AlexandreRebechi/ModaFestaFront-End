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
                     
                        <th scope="col">Status Reserva</th>
                        <th scope="col">Alterar</th>
                        <th scope="col">Remover</th>
                    </tr>
                </thead>

                <tbody>

                    <tr v-for="(r, indice) in reservas " :key="r.id" :class="{ active: indice == currentIndex }">
            
                        <td>{{ r.id }}</td>
                        <td>{{ r.data_inicio | formataData }}</td>
                        <td>{{ r.data_fim | formataData }}</td>
                        <td>{{ r.valor }}</td>
                       
                        <td>{{ r.valor_entrega }}</td>
                        <td>{{ r.valor_total }}</td>
                      
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

                <a class="badge badge-warning" :href="'/reserva2/' + currentReserva.id">
                    Edit
                </a>
            </div>
            <div v-else>
                <br />
                <p>Please click on a Player...</p>
                <router-link to="/addreserva2" class="badge badge-success">Novo2</router-link>

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
    name: 'listReservas2',
    data() {
        return {
            reservas: [],
            pessoas: [],
            aux: '',
            currentReserva: null,
            currentReserva2: null,
            currentIndex: -1
        }
    },
    components: {
        BIconTrash,
        BIconPencilSquare
    },
    methods: {
       /* listCliente(r) {
    

                console.log("Retorno do seviço authenticateReserva", response.status);
                let aux =''
                
                    if (r == this.pessoas.cpf) {
                        aux = p.nome_cliente
                        console.log('p.nome: '+p.nome_cliente)

                    }
                
            return aux

        },*/
        listarPessoa() {

            PessoaDataService.list().then(response => {

                console.log("Retorno do seviço authenticateCliente", response.status);

                this.pessoas = response.data;

            }).catch(response => {

                // error callback
                alert('Não conectou no serviço listCliente');
                console.log(response);
            });
        },

        listarReservas() {
            this.currentReserva2 = JSON.parse(localStorage.getItem('authUser'))
            console.log('oi reserva2 list')
            console.log('this.currentReserva2 objeto: ' + this.currentReserva2.cpf)


            ReservaDataService.get2(this.currentReserva2.cpf).then(response => {
                console.log("Retorno do seviço authenticateReserva.get2", response.status);

                this.reservas = response.data;
            }).catch(response => {

                // error callback
                alert('Não conectou no serviço listarReserva.get2');
                console.log(response);
            })


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
                    alert('Erro ao remover reserva2: '+e)
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
        //this.listCliente();


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