import http from "../http-common";

class LocacaoDataService {


    async get(id){

        console.log('LocacaoDataService.get: ', id);
        return await http.get('/locacao/'+id);
    }
   
    async list(){

        console.log('LocacaoDataService.list: ');
        return await http.get(`/listlocacao`);
    }
    async get2(cpf){
        console.log('LocacaoDataService.list2: ', cpf);
        return await http.get(`/minhaslocacoes/`+cpf); 
    }

    async delete(id){

        console.log('LocacaoDataService.delete: ', id);
        return await http.get(`/deletelocacao/`+id);
    }

    async update(data){

        console.log('LocacaoDataService.update: ', data);
        return await http.post(`/updatelocacao/`, data);
    }
    
    async create(data){

        console.log('LocacaoDataService.create: ', data);
        return await http.post(`/insertlocacao/`, data);

    }  

}

export default new LocacaoDataService();