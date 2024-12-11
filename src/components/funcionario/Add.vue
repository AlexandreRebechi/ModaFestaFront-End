<template>
    <div class="submit-form">
        <div v-if="!submitted">
            <form class="submit-form">
                <div class="mb-3">
          <label for="inputCPF">CPF:</label>
         
          <input :class="{valid: isVaidCPF == true, inValid: isVaidCPF == false}" type="text" v-model="pessoa.cpf"  class="form-control " id="inputCPF" placeholder="00000000000"
            required>

        </div>
        <div class="mb-3">
          <label for="inputNome">Nome:</label>
          <input :class="{valid : isValidNome == true, inValid: isValidNome == false}" type="text" v-model="pessoa.nome_funcionario" class="form-control " id="inputNome" placeholder="Nome"
            required>

        </div>
        <div class="mb-3">
          <label for="inputEmail">Email:</label>
          
          <input :class="{valid : isValidEmail == true, inValid: isValidEmail == false}" type="email" v-model="pessoa.email" class="form-control " id="inputEmail" placeholder="Email"
            required>

        </div>
        <div class="mb-3">
          <label for="inputTelefone">Telefone:</label>
          <input :class="{valid : isValidTelefone == true, inValid: isValidTelefone == false}" type="text" v-model="pessoa.telefone" class="form-control " id="inputTelefone"
            placeholder="(00)0000-0000" required>

        </div>
        <div class="mb-3">
          <label for="inputCEP">CEP:</label>
          <input :class="{valid : isValidCep == true, inValid: isValidCep == false}" type="text" v-model="pessoa.cep" class="form-control " id="inputCEP" placeholder="00000-000"
            required>

        </div>
        <div class="mb-3">
          <label for="inputLogradouro">Logradouro:</label>
          <input :class="{valid : isValidLogradouro == true, inValid: isValidLogradouro == false}" type="text" v-model="pessoa.logradouro" class="form-control " id="inputLogradouro"
            placeholder="Logradouro" required>

        </div>
        <div class="mb-3">
          <label for="inputBairro">Bairro:</label>
          <input :class="{valid : isValidBairro == true, inValid: isValidBairro == false}" type="text" v-model="pessoa.bairro" class="form-control " id="inputBairro"
            placeholder="Bairro" required>

        </div>
        <div class="mb-3">
          <label for="inputNumero">Numero:</label>
          <input :class="{valid : isValidNumero ==  true , inValid: isValidNumero == false}" type="text" v-model="pessoa.numero" class="form-control " id="inputNumero"
            placeholder="Numero" required>

        </div>
        <div class="mb-3">
          <label for="inputComplemento">Complemento:</label>
          <input :class="{valid : isValidComplemento == true, inValid: isValidComplemento == false}" type="text" v-model="pessoa.complemento" class="form-control " id="inputComplemento"
            placeholder="Complemento" required>

        </div>
        <div class="mb-3">
          <label for="inputObservacoes">Observacoes:</label>
          <textarea rows="5" cols="33" :class="{valid : isValidObservacoes == true, inValid: isValidObservacoes == false}" name="Observacoes" id="inputObservacoes" class="form-control " v-model="pessoa.observacoes" required></textarea>


        </div>
       
        <div class="mb-3">
          <label for="inputUsername">Username:</label>
          <input :class="{valid :  isValidUsername== true, inValid: isValidUsername == false}" type="text" v-model="pessoa.username" class="form-control " id="inputUsername"
            placeholder="Username" required>

        </div>
        <div class="mb-3">
          <label for="inputPassword">Password:</label>

          <input :class="{valid : isValidPassword == true, inValid: isValidPassword == false}" type="password" v-model="pessoa.password" class="form-control " id="inputPassword"
            placeholder="Password" required>

        </div>
              
                <div class="mb-3">
                    <label for="inputNumeroCtps">Numero CTPS:</label>
                    <input :class="{valid : isValidNumeroCTPS == true, inValid: isValidNumeroCTPS == false}" type="text" v-model="pessoa.numero_ctps" class="form-control "
                        id="inputNumeroCtps" placeholder="Numero CTPS" required>
                </div>
                
            </form>
            <form class="was-validated">
              <div class="mb-3">
                    <label for="inputDataContratacao">Data Contratacao:</label>
                    <input type="date" v-model="pessoa.data_contratacao" class="form-control "
                        id="inputDataContratacao" placeholder="Data Contratacao" required>
                </div>

                <div class="mb-3">
                    <label for="inputDataDemissao">Data Demissao:</label>
                    <input type="date" v-model="pessoa.data_demissao" class="form-control "
                        id="inputDataDemissao" placeholder="Data Demissao" required>
                </div>

              
                <div class="mb-3">
                    <label for="selectPerfil">Perfil:</label>
                    <select v-model="pessoa.perfil" class="form-control " id="selectPerfil"
                         required>
                        <option v-for="p in perfil" :key="p.id" v-bind:value="p">
                            {{ p.descricao }}
                        </option>
                    </select>


                </div>

            </form>


            <button @click="savefuncionario" class="btn btn-success">Salvar</button>
            <router-link to="/funcionarios" class="btn btn-success">Voltar</router-link>

        </div>

        <div v-else>
            <h4>Dados enviados com sucesso !</h4>
            <button class="btn btn-success" @click="newfuncionario">Novo</button>
            <router-link to="/funcionarios" class="btn btn-success">Voltar</router-link>
        </div>
    </div>
</template>

<script>

import FuncionarioDataService from '../../services/FuncionarioDataService';
import PerfilDataService from '../../services/PerfilDataService';
//import PatenteDataService from '../../services/PatenteDataService'

export default {
    name: "addfuncionario",
    data() {
        return {
            pessoa: {
                indice: '',
                cpf: '',
                nome_funcionario: '',
                email: '',
                telefone: '',
                cep: '',
                logradouro: '',
                bairro: '',
                numero: '',
                complemento: '',
                observacoes: '',
                data_cadastro: new Date().toLocaleDateString('us-US'),
                username: '',
                password: '',
                tipo: false,
                funcionario: { numero_ctps: '', data_contratacao: '', data_demissao: '', perfil: [] },
            },
            submitted: false,
            perfil: []

        }
    },
    computed: {
        isVaidCPF(){
          var Soma;
    var Resto;
    Soma = 0;
  if (this.pessoa.cpf == "00000000000") return false;

  for (let i=1; i<=9; i++) Soma = Soma + parseInt(this.pessoa.cpf.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(this.pessoa.cpf.substring(9, 10)) ) return false;

  Soma = 0;
    for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(this.pessoa.cpf.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(this.pessoa.cpf.substring(10, 11) ) ) return false;
    return true;
     
    },
    isValidNome(){
     return isNaN(this.pessoa.nome_funcionario)
    }, 
    isValidLogradouro(){
     return isNaN(this.pessoa.logradouro)
    }, 
    isValidBairro(){
     return isNaN(this.pessoa.bairro)
    }, 
    isValidComplemento(){
     return isNaN(this.pessoa.complemento)
    }, 
    isValidObservacoes(){
     return isNaN(this.pessoa.observacoes)
    },
    isValidUsername(){
      return isNaN(this.pessoa.username)
    },  
    isValidEmail() {
      
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.pessoa.email);

    },
    isValidTelefone(){

      if (!this.pessoa.telefone) {
        return false
      } else {
        if (this.pessoa.telefone.length == 14) {
          return true
      } else {
        return false
      }
      }
        },
    isValidCep(){

      if (!this.pessoa.cpf) {
        return false
      } else {
        if (this.pessoa.cpf.length == 9) {
          return true
      } else {
        return false
      }
      }
        },
    
    isValidNumero(){
      if (!this.pessoa.numero) {
         return false
      } else {
        return !isNaN(this.pessoa.numero)
      }
      
    },
    isValidPassword(){
      if (!this.pessoa.password) {
        return false
      } else {
        if (this.pessoa.password.length <=6) {
          return true
      } else {
        return false
      }
      }
     
    },
    isValidNumeroCTPS(){
      if (!this.pessoa.funcionario.numero_ctps) {
        return false
      } else {
       return true
      }    
    },
    isvalidIE(){
      if (!this.pessoa.cliente.ie) {
        return false
     } else {
       return !isNaN(this.pessoa.cliente.ie)
     }
    }
    },
    methods: {

        savefuncionario() {

            var f = jQuery.extend({}, this.pessoa);//clona o this.novo_pessoa e armazena na variavel cliente. dessa forma alteracoes em this.novo_cliente nao irao refletir em cliente.
            var end = jQuery.extend({}, this.pessoa.funcionario);//clona o this.novo_pessoa.funcionario                        
            f.funcionario = end;

            if (f.username.trim().length > 0 && f.password.trim().length > 0) {

                FuncionarioDataService.create(f)
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
        listPerfil() {
            PerfilDataService.list().then(response => {

                console.log("Retorno do seviço PerfilDataService.list", response.status);

                for (let p of response.data) {

                    this.perfil.push(p);
                }
            }).catch(response => {

                // error callback
                alert('Não conectou no serviço PerfilDataService.list');
                console.log(response);
            });
        },
        newfuncionario() {

            this.submitted = false;
            this.funcionario = {};
        },


    },
    mounted() {
       this.listPerfil();
    }

}

</script>

<style>
.valid {
  
  background-color: chartreuse;
}

.inValid {
  background-color: red;
}
.submit-form {
    max-width: 300px;
    margin: auto;
}
</style>