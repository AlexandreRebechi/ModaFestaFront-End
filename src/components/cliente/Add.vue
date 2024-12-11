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
          <input :class="{valid : isValidNome == true, inValid: isValidNome == false}" type="text" v-model="pessoa.nome_cliente" class="form-control " id="inputNome" placeholder="Nome"
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
          <input :class="{valid : isValidCep == true, inValid: isValidCep == false}" type="text" v-model="pessoa.cep" class="form-control " id="inputCEP" placeholder="00000000"
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
              <label for="inputRG">RG:</label>
              <input :class="{valid : isValidRg == true, inValid: isValidRg == false}"  type="text" v-model="pessoa.cliente.rg" class="form-control" id="inputRG"
                placeholder="000000000" required>

            </div>

        <div class="mb-3">
          <label for="inputIE">IE:</label>
          <input :class="{valid : isvalidIE == true, inValid: isvalidIE == false}"  type="text" v-model="pessoa.cliente.ie" class="form-control" id="inputIE" placeholder="IE"
            required>

        </div>

      </form>
      <button @click="savecliente" class="btn btn-success">Salvar</button>
      <router-link to="/" class="btn btn-success">Voltar</router-link>

    </div>

    <div v-else>
      <h4>Dados enviados com sucesso !</h4>
      <button class="btn btn-success" @click="newcliente">Novo</button>
      <router-link to="/" class="btn btn-success">Voltar</router-link>
    </div>
  </div>

</template>

<script>


import { ref } from 'vue';
import ClienteDataService from '../../services/ClienteDataService';

//import PatenteDataService from '../../services/PatenteDataService'



export default {
  name: "addcliente1",
  data() {
    return {
      pessoa: {
        indice: '',
        cpf: '',
        nome_cliente: '',
        email: '',
        telefone: '',
        cep: '',
        logradouro: '',
        bairro: '',
        numero: '',
        complemento: '',
        observacoes: '',
        data_cadastro: new Date().toLocaleDateString('us-US') ,
        username: '',
        password: '',
        tipo: true,
        cliente: { rg: '', cnpj: '', ie: '', tipo: true }
      },
      submitted: false,
      startValidation: false

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
     return isNaN(this.pessoa.nome_cliente)
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

      if (!this.pessoa.cep) {
        return false
      } else {
        if (this.pessoa.cep.length == 8) {
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
    isValidRg(){
      if (!this.pessoa.cliente.rg) {
        return false
      } else {
        if (this.pessoa.cliente.rg.length == 9) {
          return true
      } else {
        return false
      }
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
  

    savecliente() {

      var jgd = jQuery.extend({}, this.pessoa);//clona o this.novo_cliente e armazena na variavel cliente. dessa forma alteracoes em this.novo_cliente nao irao refletir em cliente.
      var end = jQuery.extend({}, this.pessoa.cliente);//clona o this.novo_cliente.endereco                        
      jgd.cliente = end;
      if (jgd.cpf.trim().length > 0 && jgd.password.trim().length > 0) {
        ClienteDataService.create(jgd)
          .then(response => {

            this.submitted = true;
          })
          .catch(e => {
            alert("Erro ao tentar cadastrar. !!! " + e.message);

          })

      } else {
        alert('Formulário incompleto !!!');
      }
     

      /*if (this.validationCPF() && this.validationTelefone() && this.validationCEP()) {
        if (jgd.cpf.trim().length > 0 && jgd.password.trim().length > 0) {
        ClienteDataService.create(jgd)
          .then(response => {

            this.submitted = true;
          })
          .catch(e => {
            alert("Erro ao tentar cadastrar. !!! " + e.message);

          })

      } else {
        alert('Formulário incompleto !!!');
      }
      } else {
        
      }*/
      

    },
    newcliente() {

      this.submitted = false;
      this.cliente = {};
    },


  },
  mounted() {


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

.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>