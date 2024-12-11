<template>
    <div id="tab_aut">

        <div v-if="currentFuncionario" class="edit-form">
            <form class="edit-form">
                <h3>Funcionario</h3>
                <div class="mb-3">
          <label for="inputCPF">CPF:</label>
         
          <input :class="{valid: isVaidCPF == true, inValid: isVaidCPF == false}" type="text" v-model="currentFuncionario.cpf"  class="form-control " id="inputCPF" placeholder="00000000000"
            required>

        </div>
        <div class="mb-3">
          <label for="inputNome">Nome:</label>
          <input :class="{valid : isValidNome == true, inValid: isValidNome == false}" type="text" v-model="currentFuncionario.nome_funcionario" class="form-control " id="inputNome" placeholder="Nome"
            required>

        </div>
        <div class="mb-3">
          <label for="inputEmail">Email:</label>
          
          <input :class="{valid : isValidEmail == true, inValid: isValidEmail == false}" type="email" v-model="currentFuncionario.email" class="form-control " id="inputEmail" placeholder="Email"
            required>

        </div>
        <div class="mb-3">
          <label for="inputTelefone">Telefone:</label>
          <input :class="{valid : isValidTelefone == true, inValid: isValidTelefone == false}" type="text" v-model="currentFuncionario.telefone" class="form-control " id="inputTelefone"
            placeholder="(00)0000-0000" required>

        </div>
        <div class="mb-3">
          <label for="inputCEP">CEP:</label>
          <input :class="{valid : isValidCep == true, inValid: isValidCep == false}" type="text" v-model="currentFuncionario.cep" class="form-control " id="inputCEP" placeholder="00000-000"
            required>

        </div>
        <div class="mb-3">
          <label for="inputLogradouro">Logradouro:</label>
          <input :class="{valid : isValidLogradouro == true, inValid: isValidLogradouro == false}" type="text" v-model="currentFuncionario.logradouro" class="form-control " id="inputLogradouro"
            placeholder="Logradouro" required>

        </div>
        <div class="mb-3">
          <label for="inputBairro">Bairro:</label>
          <input :class="{valid : isValidBairro == true, inValid: isValidBairro == false}" type="text" v-model="currentFuncionario.bairro" class="form-control " id="inputBairro"
            placeholder="Bairro" required>

        </div>  
        <div class="mb-3">
          <label for="inputNumero">Numero:</label>
          <input :class="{valid : isValidNumero ==  true , inValid: isValidNumero == false}" type="text" v-model="currentFuncionario.numero" class="form-control " id="inputNumero"
            placeholder="Numero" required>

        </div>
        <div class="mb-3">
          <label for="inputComplemento">Complemento:</label>
          <input :class="{valid : isValidComplemento == true, inValid: isValidComplemento == false}" type="text" v-model="currentFuncionario.complemento" class="form-control " id="inputComplemento"
            placeholder="Complemento" required>

        </div>
        <div class="mb-3">
          <label for="inputObservacoes">Observacoes:</label>
          <textarea rows="5" cols="33" :class="{valid : isValidObservacoes == true, inValid: isValidObservacoes == false}" name="Observacoes" id="inputObservacoes" class="form-control " v-model="currentFuncionario.observacoes" required></textarea>


        </div>
       
        <div class="mb-3">
          <label for="inputUsername">Username:</label>
          <input :class="{valid :  isValidUsername== true, inValid: isValidUsername == false}" type="text" v-model="currentFuncionario.username" class="form-control " id="inputUsername"
            placeholder="Username" required>

        </div>
        <div class="mb-3">
          <label for="inputPassword">Password:</label>

          <input :class="{valid : isValidPassword == true, inValid: isValidPassword == false}" type="password" v-model="currentFuncionario.password" class="form-control " id="inputPassword"
            placeholder="Password" required>

        </div>
        <div class="mb-3">
                    <label for="inputNumeroCtps">Numero CTPS:</label>
                    <input :class="{valid : isValidNumeroCTPS == true, inValid: isValidNumeroCTPS == false}" type="text" v-model="currentFuncionario.numero_ctps" class="form-control "
                        id="inputNumeroCtps" placeholder="Numero CTPS" required>
                </div>
                <div class="mb-3">
                    <label for="inputDataContratacao">Data Contratacao:</label>
                    <input type="date" v-model="currentFuncionario.funcionario.data_contratacao" class="form-control"
                        id="inputDataContratacao" placeholder="Data Contratacao" required>
                </div>

                <div class="mb-3">
                    <label for="inputDataDemissao">Data Demissao:</label>
                    <input type="date" v-model="currentFuncionario.funcionario.data_demissao" class="form-control "
                        id="inputDataDemissao" placeholder="Data Demissao" required>
                </div>


                <div class="mb-3">
                    <label for="selectPerfil">Perfil:</label>
                    <select v-model="currentFuncionario.funcionario.perfil" class="form-control" id="selectPerfil" required>
                        <option v-for="p in perfil" v-bind:key="p.id" v-bind:value="p.id">
                            {{ p.descricao }}
                        </option>
                    </select>


                </div>


            </form>
            <button class="badge badge-success" @click="updateFuncionario">Salvar</button>
            <button class="badge badge-danger mr-2" @click="deleteFuncionario">Delete</button>
            <button class="badge badge-danger mr-2" @click="voltar">Voltar</button>


            <p>{{ message }}</p>

        </div>
        <div v-else>
            <br />
            <p>Please click on a Funcionario...</p>
        </div>


    </div>
</template>
<script>


import FuncionarioDataService from '../../services/FuncionarioDataService';
import PerfilDataService from '../../services/PerfilDataService';

export default {
    name: 'editFuncionario',
    data() {
        return {
            currentFuncionario: null,
            message: '',
            perfil: []

        }
    },
    computed: {
        isVaidCPF(){
          var Soma;
    var Resto;
    Soma = 0;
  if (this.currentFuncionario.cpf == "00000000000") return false;

  for (let i=1; i<=9; i++) Soma = Soma + parseInt(this.currentFuncionario.cpf.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(this.currentFuncionario.cpf.substring(9, 10)) ) return false;

  Soma = 0;
    for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(this.currentFuncionario.cpf.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(this.currentFuncionario.cpf.substring(10, 11) ) ) return false;
    return true;
     
    },
    isValidNome(){
     return isNaN(this.currentFuncionario.nome_funcionario)
    }, 
    isValidLogradouro(){
     return isNaN(this.currentFuncionario.logradouro)
    }, 
    isValidBairro(){
     return isNaN(this.currentFuncionario.bairro)
    }, 
    isValidComplemento(){
     return isNaN(this.currentFuncionario.complemento)
    }, 
    isValidObservacoes(){
     return isNaN(this.currentFuncionario.observacoes)
    },
    isValidUsername(){
      return isNaN(this.currentFuncionario.username)
    },  
    isValidEmail() {
      
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.currentFuncionario.email);

    },
    isValidTelefone(){

      if (!this.currentFuncionario.telefone) {
        return false
      } else {
        if (this.currentFuncionario.telefone.length == 14) {
          return true
      } else {
        return false
      }
      }
        },
    isValidCep(){

      if (!this.currentFuncionario.cep) {
        return false
      } else {
        if (this.currentFuncionario.cep.length == 9) {
          return true
      } else {
        return false
      }
      }
        },
    
    isValidNumero(){
      if (!this.currentFuncionario.numero) {
         return false
      } else {
        return !isNaN(this.currentFuncionario.numero)
      }
      
    },
    isValidPassword(){
      if (!this.currentFuncionario.password) {
        return false
      } else {
        if (this.currentFuncionario.password.length <=6) {
          return true
      } else {
        return false
      }
      }
     
    },
    isValidNumeroCTPS(){
      if (!this.currentFuncionario.funcionario.numero_ctps) {
        return false
      } else {
       return true
      }    
    },
    isvalidIE(){
      if (!this.currentFuncionario.cliente.ie) {
        return false
     } else {
       return !isNaN(this.currentFuncionario.cliente.ie)
     }
    }
    },
    methods: {

        getFuncionario(cpf) {

            FuncionarioDataService.get(cpf)
                .then(response => {
                    console.log(response.data);
                    this.currentFuncionario = response.data;

                })
                .catch(e => {
                    console.log(e);
                })
        },
        updateFuncionario() {
            alert(this.currentFuncionario);
            FuncionarioDataService.update(this.currentFuncionario)
                .then(response => {
                    console.log('FuncionarioDataService.update');
                    this.message = 'funcionario alterado com sucesso !';
                })
                .catch(e => {
                    console.log(e);
                })
        },
        listPerfil() {
            console.log('teste: '+this.perfil)
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
        deleteFuncionario() {

            FuncionarioDataService.delete(this.currentFuncionario.cpf)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "funcionarios-list" });
                })
                .catch(e => {
                
                    console.log(e);
                });
        },
        voltar() {
            this.$router.push({ name: "funcionarios-list" });
        }
    },
    mounted() {

        this.message = '';
        this.getFuncionario(this.$route.params.cpf);
        this.listPerfil();
    }
}
</script>

<style scoped>
.valid {
  background-color: chartreuse;
}

.inValid {
  background-color: red;
}
.edit-form {
    max-width: 300px;
    margin: auto;

}
</style>