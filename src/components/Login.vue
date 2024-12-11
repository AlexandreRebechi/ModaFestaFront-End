<template>
    <div id="tab_aut">
        <h3>Autenticacação</h3>
        <!--<nav id="nav_login" class="navbar navbar-expand-sm navbar-dark bg-primary">
            <a class="navbar-brand" href="#">Autenticacação</a>
            <button class="navbar-toggler d-lg-none" type="button" data-toggle="collapse"
                data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false"
                aria-label="Toggle navigation"></button>
            <div class="collapse navbar-collapse" id="collapsibleNavId">
                <form class="form-inline my-2 my-lg-0">
                    <label class="form-label" for="inputANickname">CPF:</label>
                    <input class="form-control" type="text" v-model="pessoas.cpf" id="inputANickname">
                </form>
                <form class="form-inline my-2 my-lg-0">
                    <label class="form-label" for="inputpassword">Password:</label>
                    <input class="form-control" type="password" v-model="pessoas.password" id="inputpassword">
                </form>
                <button class="btn btn-primary" @click='createLoginForm()' type="button">Autenticar</button>
                <button class="btn btn-primary" @click='clearForm()' type="button">Limpar</button>
            </div>
        </nav>-->
        <div class="mb-6" v-if="s != 204">
            <form class="was-validated" >
            <div class="mb-3" >
                <label class="form-label" for="inputANickname">CPF:</label>
                    <input class="form-control" type="text" v-model="pessoas.cpf" id="inputANickname">
                </div>

                <div class="mb-3">
                    <label class="form-label" for="inputpassword">Password:</label>
                    <input class="form-control" type="password" v-model="pessoas.password" id="inputpassword">
                </div>

        </form>
       
      
        
        <button class="btn btn-primary" @click='createLoginForm()' type="button">Autenticar</button>
        <button class="btn btn-primary" @click='clearForm()' type="button">Limpar</button>
        <router-link to="/" class="btn btn-success">Voltar</router-link>
    </div>
    <div v-else>
        
        <router-link to="/Cadastro" class="btn btn-success">Cadastro</router-link>  
        <router-link to="/" class="btn btn-success">Voltar</router-link>
    </div>
    </div>
</template>
<script>

import LoginDataService from '../services/LoginDataService';
import App from '../App.vue';
import PessoaDataService from '../services/PessoaDataService';
import ReservaDataService from '../services/ReservaDataService';
import { BAlert } from 'bootstrap-vue';


export default {
    name: 'login',
    data() {
        return {
            pessoas: { cpf: '', password: '', tipo: '', data_ultimo_login: new Date().toLocaleDateString('us-US') },
            currentLogin: null,
            s: null,
        }
    },
    component: {
        BAlert
    },
    methods: {
       
        listarReservas() {
            console.log('pessoa.cpf: ' + pessoas.cpf)
            ReservaDataService.get2(pessoas.cpf).then(response => {

                console.log("Retorno do seviço authenticateReserva", response.status);

                this.reservas = response.data;

            }).catch(response => {

                // error callback
                alert('Não conectou no serviço listarReserva');
                console.log(response);
            });
        },
        filtrarLogin() {
            LoginDataService.get(this.pessoas.cpf).then(response => {
                this.currentLogin = response.data
                console.log('teste login: ' + this.currentLogin)
            }).catch(response => {
                // error callback
                alert('Não conectou no serviço get ' + response);
                // console.log(response);
            }

            )
        },
        createLoginForm() {

            console.log('chamou o createLoginForm');
            var data = new Date(),
                dia = data.getDate().toString(),
                diaf = (dia.length == 1) ? '0' + dia : dia,
                mes = (data.getMonth() + 1).toString(),
                mesf = (mes.length == 1) ? '0' + mes : mes,
                anof = data.getFullYear();


            const p = {
                cpf: this.pessoas.cpf,
                password: this.pessoas.password,
                tipo: (this.pessoas.tipo).toUpperCase(),
                data_ultimo_login: anof + "-" + mesf + "-" + diaf


            }



            PessoaDataService.list().then(response => {

                console.log("Retorno do seviço PessoaDataService.list", response.status);

                for (let p of response.data) {

                    if (this.pessoas.cpf == p.cpf) {

                        this.pessoas.tipo = p.tipo
                        console.log('teste: ' + this.pessoas.tipo)

                    }


                }

            }).catch(response => {

                // error callback
                alert('Não conectou no serviço PessoaDataService.list');
                console.log(response);
            });
          

            LoginDataService.authenticate(p).then(response => {
                console.log("Retorno do seviço authenticate", response.status);
                this.s = response.status
                if (response.status == 201 || response.status == 200) {

                    alert('Login 1: ' + response.data.cpf + ' authenticate com sucesso');
                    const auxtipo = this.pessoas.tipo
                    this.pessoas.data_ultimo_login = new Date()
                    console.log(' this.pessoas.data_ultimo_login: ' + this.pessoas.data_ultimo_login)
                    console.log('auxtipo: ' + this.pessoas.tipo)
                    this.setAuthenticated({ auxtipo, cpf: response.data.cpf, data_ultimo_login: response.data.data_ultimo_login })


                    this.$router.push({ name: "home" });

                } else if (response.status == 204) {

                    alert('cpf ou password ou tipo invalidos!')

                }

                this.clearForm();
            }

            ).catch(response => {

                // error callback
                alert('Não conectou no serviço authenticate ' + response);
                // console.log(response);
            });


        },



        clearForm() {
            this.pessoas.cpf = "";
            this.pessoas.password = "";



        },

        setAuthenticated(pessoas) {

            localStorage.setItem('authUser', JSON.stringify(pessoas));

        },


    },
    mounted() {

    }

}
</script>

<style scoped>
#tab_aut {
    width: 60%;
    height: 50%;
}
</style>