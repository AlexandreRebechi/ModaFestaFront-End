
import http from "../http-common";

class FuncionarioDataService {

    async list(){

        console.log('FuncionarioDataService.list: ');
        return await http.get(`/listfuncionario`);
    }

    async get(cpf){

        console.log('FuncionarioDataService.get: ', cpf);
        return await http.get('/funcionario/'+cpf);
    }

    async delete(cpf){

        console.log('FuncionarioDataService.delete: ', cpf);
        return await http.get(`/deletefuncionario/`+cpf);
    }

    async update(data){

        console.log('FuncionarioDataService.update: ', data);
        return await http.post(`/updatefuncionario/`, data);
    }
    
    async create(data){

        console.log('FuncionarioDataService.create: ', data);
        return await http.post(`/insertfuncionario/`, data);

    }  

}

export default new FuncionarioDataService();