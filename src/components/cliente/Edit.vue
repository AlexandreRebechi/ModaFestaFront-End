<template>
  <div id="tab_aut">

    <div v-if="currentCliente" class="edit-form">
      <form class="edit-form">
        <h3>Cliente</h3>
        <div class="mb-3">
          <label for="inputCPF">CPF:</label>

          <input :class="{ valid: isVaidCPF == true, inValid: isVaidCPF == false }" type="text"
            v-model="currentCliente.cpf" class="form-control " id="inputCPF" placeholder="00000000000" required>

        </div>
        <div class="mb-3">
          <label for="inputNome">Nome:</label>
          <input :class="{ valid: isValidNome == true, inValid: isValidNome == false }" type="text"
            v-model="currentCliente.nome_cliente" class="form-control " id="inputNome" placeholder="Nome" required>

        </div>
        <div class="mb-3">
          <label for="inputEmail">Email:</label>

          <input :class="{ valid: isValidEmail == true, inValid: isValidEmail == false }" type="email"
            v-model="currentCliente.email" class="form-control " id="inputEmail" placeholder="Email" required>

        </div>
        <div class="mb-3">
          <label for="inputTelefone">Telefone:</label>
          <input :class="{ valid: isValidTelefone == true, inValid: isValidTelefone == false }" type="text"
            v-model="currentCliente.telefone" class="form-control " id="inputTelefone" placeholder="(00)0000-0000"
            required>

        </div>
        <div class="mb-3">
          <label for="inputCEP">CEP:</label>
          <input :class="{ valid: isValidCep == true, inValid: isValidCep == false }" type="text"
            v-model="currentCliente.cep" class="form-control " id="inputCEP" placeholder="CEP" required>

        </div>
        <div class="mb-3">
          <label for="inputLogradouro">Logradouro:</label>
          <input :class="{ valid: isValidLogradouro == true, inValid: isValidLogradouro == false }" type="text"
            v-model="currentCliente.logradouro" class="form-control " id="inputLogradouro" placeholder="Logradouro"
            required>

        </div>
        <div class="mb-3">
          <label for="inputBairro">Bairro:</label>
          <input :class="{ valid: isValidBairro == true, inValid: isValidBairro == false }" type="text"
            v-model="currentCliente.bairro" class="form-control " id="inputBairro" placeholder="Bairro" required>

        </div>
        <div class="mb-3">
          <label for="inputNumero">Numero:</label>
          <input :class="{ valid: isValidNumero == true, inValid: isValidNumero == false }" type="text"
            v-model="currentCliente.numero" class="form-control " id="inputNumero" placeholder="Numero" required>

        </div>
        <div class="mb-3">
          <label for="inputComplemento">Complemento:</label>
          <input :class="{ valid: isValidComplemento == true, inValid: isValidComplemento == false }" type="text"
            v-model="currentCliente.complemento" class="form-control " id="inputComplemento" placeholder="Complemento"
            required>

        </div>
        <div class="mb-3">
          <label for="inputObservacoes">Observacoes:</label>
          <textarea rows="5" cols="33"
            :class="{ valid: isValidObservacoes == true, inValid: isValidObservacoes == false }" name="Observacoes"
            id="inputObservacoes" class="form-control " v-model="currentCliente.observacoes" required></textarea>


        </div>

        <div class="mb-3">
          <label for="inputUsername">Username:</label>
          <input :class="{ valid: isValidUsername == true, inValid: isValidUsername == false }" type="text"
            v-model="currentCliente.username" class="form-control " id="inputUsername" placeholder="Username" required>

        </div>
        <div class="mb-3">
          <label for="inputPassword">Password:</label>

          <input :class="{ valid: isValidPassword == true, inValid: isValidPassword == false }" type="password"
            v-model="currentCliente.password" class="form-control " id="inputPassword" placeholder="Password" required>

        </div>

        <div class="mb-3" v-if="tipocurrentCliente()">
          <label for="inputRG">RG:</label>
          <input :class="{ valid: isValidRg == true, inValid: isValidRg == false }" type="text"
            v-model="currentCliente.cliente.rg" class="form-control " id="inputRG" placeholder="RG" required>

        </div>
        <div class="mb-3" v-else>
          <label for="inputCNPJ">CNPJ:</label>
          <input :class="{ valid: isValidCNPJ == true, inValid: isValidCNPJ == false }" type="text"
            v-model="currentCliente.cliente.cnpj" class="form-control " id="inputCNPJ" placeholder="CNPJ" required>

        </div>
        <div class="mb-3">
          <label for="inputIE">IE:</label>
          <input :class="{ valid: isvalidIE == true, inValid: isvalidIE == false }" type="text"
            v-model="currentCliente.cliente.ie" class="form-control " id="inputIE" placeholder="IE" required>
        </div>


      </form>

      <button type="button" class="btn btn-success" @click="updateCliente">Salvar</button>
      <button type="button" class="btn btn-danger mr-2" @click="deleteCliente">Delete</button>
      <button type="button" class="btn btn-danger mr-2" @click="voltar">Voltar</button>

      <p>{{ message }}</p>

    </div>
    <div v-else>
      <br />
      <p>Please click on a Cliente...</p>
    </div>


  </div>
</template>
<script>

import ClienteDataService from '../../services/ClienteDataService';


export default {
  name: 'editcliente',
  data() {
    return {
      currentCliente: null,
      message: ''

    }
  },
  computed: {
    isVaidCPF() {
      var Soma;
      var Resto;
      Soma = 0;
      if (this.currentCliente.cpf == "00000000000") return false;

      for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(this.currentCliente.cpf.substring(i - 1, i)) * (11 - i);
      Resto = (Soma * 10) % 11;

      if ((Resto == 10) || (Resto == 11)) Resto = 0;
      if (Resto != parseInt(this.currentCliente.cpf.substring(9, 10))) return false;

      Soma = 0;
      for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(this.currentCliente.cpf.substring(i - 1, i)) * (12 - i);
      Resto = (Soma * 10) % 11;

      if ((Resto == 10) || (Resto == 11)) Resto = 0;
      if (Resto != parseInt(this.currentCliente.cpf.substring(10, 11))) return false;
      return true;
    },
    isValidNome() {
      return isNaN(this.currentCliente.nome_cliente)
    },
    isValidLogradouro() {
      return isNaN(this.currentCliente.logradouro)
    },
    isValidBairro() {
      return isNaN(this.currentCliente.bairro)
    },
    isValidComplemento() {
      return isNaN(this.currentCliente.complemento)
    },
    isValidObservacoes() {
      return isNaN(this.currentCliente.observacoes)
    },
    isValidUsername() {
      return isNaN(this.currentCliente.username)
    },
    isValidEmail() {

      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.currentCliente.email);

    },
    isValidTelefone() {
      if (!this.currentCliente.telefone) {
        return false
      } else {
        if (this.currentCliente.telefone.length == 14) {
          return true
        } else {
          return false
        }
      }
    },
    isValidCep() {

      if (!this.currentCliente.cep) {
        return false
      } else {
        return true
      }
    },
    isValidNumero() {
      if (!this.currentCliente.numero) {
        return false
      } else {
        return !isNaN(this.currentCliente.numero)
      }

    },
    isValidPassword() {
      if (!this.currentCliente.password) {
        return false
      } else {
        if (this.currentCliente.password.length <= 6) {
          return true
        } else {
          return false
        }
      }

    },
    isValidRg() {
      if (!this.currentCliente.cliente.rg) {
        return false
      } else {
        if (this.currentCliente.cliente.rg.length == 9) {
          return true
        } else {
          return false
        }
      }
    },
    isValidCNPJ() {
      if (!this.currentCliente.cliente.cnpj) {
        return false
      } else {
        if (this.currentCliente.cliente.cnpj.length == 14) {
          return true
        } else {
          return false
        }
      }
    },
    isvalidIE() {
      if (!this.currentCliente.cliente.ie) {

        return false
      } else {

        return !isNaN(this.currentCliente.cliente.ie)
      }
    }
  },
  methods: {

    getCliente(cpf) {

      ClienteDataService.get(cpf)
        .then(response => {
          console.log(response.data);
          this.currentCliente = response.data;

        })
        .catch(e => {
          console.log(e);
        })
    },
    updateCliente() {
      alert(this.currentCliente);
      ClienteDataService.update(this.currentCliente)
        .then(response => {
          console.log('ClienteDataService.update');
          this.message = 'cliente alterado com sucesso !';
        })
        .catch(e => {
          console.log(e);
        })
    },
    tipocurrentCliente() {
      console.log("tipo currentCliente: " + this.currentCliente.tipo)
      if (this.currentCliente.tipo == 'F') {
        return true
      } else {
        return false
      }
    },
    deleteCliente() {

      ClienteDataService.delete(this.currentCliente.cpf)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "clientes-list" });
        })
        .catch(e => {
          alert('Erro ao remover cliente: ' + e)
          console.log(e);
        });
    },
    voltar() {
      this.$router.push({ name: "clientes-list" });
    }
  },
  mounted() {

    this.message = '';
    this.getCliente(this.$route.params.cpf);
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