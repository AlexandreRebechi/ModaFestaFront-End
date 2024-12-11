<template>
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
                    <select v-model="acompanhamento.statusLocacao" class="form-control is-invalid" id="selectSituacaoID"
                        >
                      <option value="EM_ATRASO">EM_ATRASO</option>
                      <option value="AGUARDANDO_RETIRADA">AGUARDANDO_RETIRADA</option>
                      <option value="EM_PREPARAÇÃO">EM_PREPARAÇÃO</option>
                      <option value="CONCLUIDO">CONCLUIDO</option>
                      
                    </select>

                </div>
                <div class="mb-3">
                    <label for="inputData">Data:</label>
                    <input type="date" v-model="acompanhamento.data" class="form-control is-invalid" id="inputData"
                        placeholder="Data" required>

                </div>
                <div class="mb-3">
                    <label for="inputObservacoes">Observacoes:</label>
                    <textarea rows="10" cols="100" name="Observacoes" id="inputObservacoes"  class="form-control is-invalid" v-model="acompanhamento.observacoes " required></textarea>
            

                </div>
                <div class="mb-3">
                    <label for="selectLocacaoID">Locacao ID:</label>
                    <select v-model="acompanhamento.id_locacao" class="form-control is-invalid" id="selectLocacaoID"
                        >
                        <option v-for="l in id_locacao" v-bind:key="l.id" v-bind:value="l">
                            {{ l.observacoes }}
                        </option>
                    </select>

                </div>
             
            </form>
                <button type="button" @click="saveAcompanhamento" class="btn btn-success">Salvar</button>
                <router-link  to="/acompanhamentosbylocacao" class="btn btn-success">Voltar</router-link>

            
        </div>

        <div v-else>
            <h4>Dados enviados com sucesso !</h4>
            <button class="btn btn-success" @click="newAcompanhamento">Novo</button>
            <router-link to="/acompanhamentosbylocacao" class="btn btn-success">Voltar</router-link>
        </div>

    </div>
</template>

<script>

import AcompanhamentoDataService from '../../services/AcompanhamentoDataService';
import LocacaoDateService from '../../services/LocacaoDateService';
//import SituacaoDataService from '../../services/SituacaoDataService';

export default {
    name: "addacompanhamento",
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
          

        }
    },
    methods: {

        saveAcompanhamento() {

            var agd = jQuery.extend({}, this.acompanhamento);//clona o this.novo_cliente e armazena na variavel cliente. dessa forma alteracoes em this.novo_cliente nao irao refletir em cliente.

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

        },
        listLocacao() {
            LocacaoDateService.list().then(response => {

                console.log("Retorno do seviço LocacaoDateService.list", response.status);

                for (let l of response.data) {

                    this.id_locacao.push(l);
                }
            }).catch(response => {

                // error callback
                alert('Não conectou no serviço LocacaoDateService.list');
                console.log(response);
            });

        },
      /*  listSituacao() {
            SituacaoDataService.list().then(response => {

                console.log("Retorno do seviço SituacaoDataService.list", response.status);

                for (let s of response.data) {

                    this.id_situacao.push(s);
                }
            }).catch(response => {

                // error callback
                alert('Não conectou no serviço SituacaoDataService.list');
                console.log(response);
            });
        },*/
        newAcompanhamento() {

            this.submitted = false;
            this.acompanhamento = {};
        },


    },
    mounted() {
        this.listLocacao();
        //this.listSituacao();

    }

}

</script>

<style>
.submit-form {
    max-width: 300px;
    margin: auto;
}
</style>