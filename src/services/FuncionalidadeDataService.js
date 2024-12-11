import http from "../http-common";

class FuncionalidadeDataService {

    async list(){

        console.log('FuncionalidadeDataService.list: ');
        return await http.get(`/listfuncionalidade`);
    }

    async get(id){

        console.log('FuncionalidadeDataService.get: ', id);
        return await http.get('/funcionalidade/'+id);
    }

    async delete(id){

        console.log('FuncionalidadeDataService.delete: ', id);
        return await http.get(`/deletefuncionalidade/`+id);
    }

    async update(data){

        console.log('FuncionalidadeDataService.update: ', data);
        return await http.post(`/updatefuncionalidade/`, data);
    }
    
    async create(data){

        console.log('FuncionalidadeDataService.create: ', data);
        return await http.post(`/insertfuncionalidade/`, data);

    }  

}

export default new FuncionalidadeDataService();