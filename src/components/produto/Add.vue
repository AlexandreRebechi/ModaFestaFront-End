<template>
    <div class="submit-form">
        <div v-if="!submitted">
            <form class="submit-form">
                <div class="mb-3">
                    <label for="inputID">ID:</label>
                    <input type="number" v-model="produto.id" class="form-control " id="inputID"
                        placeholder="ID" disabled required>
                </div>

                <div class="mb-3">
                    <label for="inputDescricao">Descrição:</label>
                    <input type="text" v-model="produto.descricao" class="form-control valid" id="inputDescricao"
                        placeholder="Descrição" required>
                </div>

                <div class="mb-3">
          <label for="inputObservacoes">Observacoes:</label>
          <textarea rows="5" cols="33"  name="Observacoes" id="inputObservacoes" class="form-control valid" v-model="produto.observacoes" required></textarea>


        </div>
                <div class="mb-3">
                    <label for="inputValorCusto">Valor Custo:</label>
                    <input :class="{valid : isValidValorCusto == true, inValid: isValidValorCusto == false}" type="number" v-model="produto.valor_custo" class="form-control "
                        id="inputValorCusto" placeholder="Valor Custo" >
                </div>
                <div class="mb-3">
                    <label for="inputValorAluguel">Valor Aluguel:</label>
                    <input :class="{valid : isValidValorAluguel == true, inValid: isValidValorAluguel == false}" type="number" v-model="produto.valor_aluguel" class="form-control "
                        id="inputValorAluguel" placeholder="Valor Aluguel" >
                </div>
                <div class="mb-3">
                    <label for="inputValorVenda">Valor Venda:</label>
                    <input :class="{valid : isValidValorVenda == true, inValid: isValidValorVenda == false}" type="number" v-model="produto.valor_venda" class="form-control "
                        id="inputValorVenda" placeholder="Valor Venda" >
                </div>
                <div class="mb-3">
                    <label for="selectTiposProduto">Tipos Produto:</label>
                    <select v-model="produto.tipo_produto" class="form-control valid" id="selectTiposProduto">
                        <option v-for="tp in tipo_produto" :key="tp.tipo_produto" v-bind:value="tp">
                            {{ tp.nome }}
                        </option>
                    </select>
                    
                </div>
                <!--<div class="mb-3">
                    <select v-model="produto.id_foto" class="form-control is-invalid" id="selectTiposProduto">
                        <option v-for="f in foto" :key="f.id" v-bind:value="f">
                            <img :src="f.b64"  style="max-width: 3rem;" >
                        </option>
                    </select>
                </div>-->
            </form>
            <div class="div_foto">
                <form class="was-validated">
                <!--<div class="md-3">
                    <label for="inputID">ID:</label>
                    <input type="text" v-model="foto.id" class="form-control " id="inputID" placeholder="ID"
                        disabled required>
                </div>-
                <div class="md-3">
                    <label for="inputDescricao">Descricao:</label>
                    <input type="text" v-model="foto.descricao" class="form-control is-invalid" id="inputDescricao"
                        placeholder="Descricao" required>
                </div>

                <div class="md-3">
                    <label for="inputB64">B64:</label>
                    <input type="text" v-model="foto.b64" class="form-control is-invalid" id="inputB64"
                        placeholder="B64" required>
                </div>

                <div class="mb-3">
                    <label for="selectProduto">Produto:</label>
                    <select v-model="foto.produto_id" class="form-control is-invalid" id="selectProduto">
                        <option v-for="p in produto_id" :key="p.id" v-bind:value="p">
                            {{ p.descricao }}
                        </option>
                    </select>

            

                </div>-->
            </form>
            </div>
          
            <button @click="saveProduto" class="btn btn-success">Salvar</button>
            <router-link to="/produtos" class="btn btn-success">Voltar</router-link>

        </div>

        <div v-else>
            <h4>Dados enviados com sucesso !</h4>
            <button class="btn btn-success" @click="newProduto">Novo</button>
            <router-link to="/produtos" class="btn btn-success">Voltar</router-link>
        </div>
    </div>
</template>
<script>



import FotoDataService from '../../services/FotoDataService';
import ProdutoDataService from '../../services/ProdutoDataService'
import TiposProdutoDataService from '../../services/TiposProdutoDataService';



export default {
    name: "addproduto",
    data() {
        return {
            /*foto: {
                indice: '',

                id: '',
                descricao: '',
                b64: '',
                produto_id: []
            },*/
            produto: {
                indice: '',
                id: '',
                descricao: '',
                observacoes: '',
                valor_custo: '',
                valor_aluguel: '',
                valor_venda: '',
                tipo_produto: [],
                //id_foto: []
            },
            submitted: false,
            tipo_produto: [],
            //id_foto: []

        }
    },
    computed: {  
        isValidValorCusto(){
           if (this.produto.valor_custo.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})) {
                return true
           } else {
                return false
           }
     
    },
    isValidValorAluguel(){
        if (this.produto.valor_aluguel.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})) {
                return true
           } else {
                return false
           }
    },
    isValidValorVenda(){
        if (this.produto.valor_venda.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})) {
                return true
           } else {
                return false
           }
    }
    },

    methods: {
        /*saveFoto() {

var ft = jQuery.extend({}, this.foto);//clona o this.foto e armazena na variavel funcionalidade. dessa forma alteracoes em this.novo_foto nao irao refletir em foto.
delete ft.id
if (ft.descricao.trim().length > 0) {

    FotoDataService.create(ft)
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
/*listProdutos() {

ProdutoDataService.list().then(response => {

    console.log("Retorno do seviço ProdutoDataService.list", response.status);

    for (let p of response.data) {

        this.produto_id.push(p);
    }

}).catch(response => {

    // error callback
    alert('Não conectou no serviço ProdutoDataService.list');
    console.log(response);
});
},*/

/*newFoto() {

this.submitted = false;
this.foto = {};
},*/
        saveProduto() {

            var p = jQuery.extend({}, this.produto);//clona o this.novo_produto e armazena na variavel produto. dessa forma alteracoes em this.produto nao irao refletir em produto.                                                              
           
            if (p.descricao.trim().length > 0) {

                ProdutoDataService.create(p)
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
        listTipoProtudo() {
            TiposProdutoDataService.list().then(response => {

                console.log("Retorno do seviço TiposProdutoDataService.list", response.status);

                for (let tp of response.data) {

                    this.tipo_produto.push(tp);
                }
            }).catch(response => {

                // error callback
                alert('Não conectou no serviço TiposProdutoDataService.list');
                console.log(response);
            });
        },
        /*listFoto(){
            FotoDataService.list().then(response => {

                console.log("Retorno do seviço FotoDataService.list", response.status);

                for (let f of response.data) {

                    this.id_foto.push(f);
                }
            }).catch(response => {
                 // error callback
                 alert('Não conectou no serviço FotoDataService.list');
                console.log(response);
            })
        },*/
        newProduto() {

            this.submitted = false;
            this.produto = {};
        },


    },
    mounted() {
        this.listTipoProtudo();
        this.listProdutos();    
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
.div_id{
    float: right;
}

.submit-form {
    max-width: 300px;
    margin: auto;
}
</style>