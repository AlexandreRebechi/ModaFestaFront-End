import http from "../http-common";

class TiposProdutoDataService {

    async get(id){

        console.log('TipoProdutoDataService.get: ', id);
        return await http.get('/tiposproduto/'+id);
    }

    async list(){

        console.log('TipoProdutoDataService.list: ');
        return await http.get(`/listtipoproduto`);
    }

    async delete(id){

        console.log('TipoProdutoDataService.delete: ', id);
        return await http.get(`/deletetipoproduto/`+id);
    }

    async update(data){

        console.log('TipoProdutoDataService.update: ', data);
        return await http.post(`/updatetipoproduto/`, data);
    }
    
    async create(data){

        console.log('TipoProdutoDataService.create: ', data);
        return await http.post(`/inserttipoproduto/`, data);

    }  

}

export default new TiposProdutoDataService();