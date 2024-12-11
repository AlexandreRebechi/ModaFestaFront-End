import http from "../http-common";

class SituacaoDataService {


    async get(id){

        console.log('SituacaoDataService.get: ', id);
        return await http.get('/situacao/'+id);
    }

    async list(){

        console.log('SituacaoDataService.list: ');
        return await http.get(`/listsituacao`);
    }

    async delete(id){

        console.log('SituacaoDataService.delete: ', id);
        return await http.get(`/deletesituacao/`+id);
    }

    async update(data){

        console.log('SituacaoDataService.update: ', data);
        return await http.post(`/updatesituacao/`, data);
    }
    
    async create(data){

        console.log('SituacaoDataService.create: ', data);
        return await http.post(`/insertsituacao/`, data);

    }  

}

export default new SituacaoDataService();