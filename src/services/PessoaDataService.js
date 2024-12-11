
import http from "../http-common";

class PessoaDataService {

  
    async get(cpf){

        console.log('PessoaDataService.get: ', cpf);
        return await http.get('/pessoa/'+cpf);
    }
    async list(){

        console.log('PessoaDataService.list: ');
        return await http.get(`/listpessoa`);
    }
    async update(data){

        console.log('PessoaDataService.update: ', data);
        return await http.post(`/updatepessoa/`, data);
    }

}


export default new PessoaDataService();
