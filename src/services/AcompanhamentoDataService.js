import http from "../http-common";

class AcompanhamentoDataService {


    async get(id){

        console.log('AcompanhamentoDataService.get: ', id);
        return await http.get('/acompanhamento/'+id);
    }

    async list(){

        console.log('AcompanhamentoDataService.list: ');
        return await http.get(`/listacompanhamento`);
    }

    async delete(id){

        console.log('AcompanhamentoDataService.delete: ', id);
        return await http.get(`/deleteacompanhamento/`+id);
    }

    async update(data){

        console.log('AcompanhamentoDataService.update: ', data);
        return await http.post(`/updateacompanhamento/`, data);
    }
    
    async create(data){

        console.log('AcompanhamentoDataService.create: ', data);
        return await http.post(`/insertacompanhamento/`, data);

    }  

}

export default new AcompanhamentoDataService();