import http from "../http-common";

class ProdutoDataService {

    async authenticate(data){

        console.log('produtoDataService.authenticate: ', data);
        const response = await http.post(`/loginproduto`, data);
        return response;
    }

    async get(id){

        console.log('produtoDataService.get: ', id);
        return await http.get('/produto/'+id);
    }

    async list(){

        console.log('produtoDataService.list: ');
        return await http.get(`/listproduto`);
    }

    async delete(id){

        console.log('produtoDataService.delete: ', id);
        return await http.get(`/deleteproduto/`+id);
    }

    async update(data){

        console.log('produtoDataService.update: ', data);
        return await http.post(`/updateproduto/`, data);
    }
    
    async create(data){

        console.log('produtoDataService.create: ', data);
        return await http.post(`/insertproduto/`, data);

    }  

}
 
export default new ProdutoDataService();