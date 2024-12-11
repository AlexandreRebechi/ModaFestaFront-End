<template>
    <div>
        <h3>Cadastro</h3>
                <a href="/addcliente1" class="btn btn-primary">Novo Cliente Fisico</a>
                <a href="/addcliente2" class="btn btn-primary">Novo Cliente Juritico</a>
          
                <router-link to="/" class="btn btn-success">Voltar</router-link>


    </div>
                
            
       
</template>
<script>




export default {
    name:'cadastro',

}

</script>

<style scoped>
#tab {
    height: 80%;
}
.list {
    text-align: center;
    max-width: 750px;
    margin: auto;

}
</style>