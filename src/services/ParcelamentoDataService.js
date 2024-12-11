import http from "../http-common";

class ParcelamentoDataService {


    async get(id){

        console.log('ParcelamentoDataService.get: ', id);
        return await http.get('/parcelamento/'+id);
    }

    async list(){

        console.log('ParcelamentoDataService.list: ');
        return await http.get(`/listparcelamento`);
    }

    async delete(id){

        console.log('ParcelamentoDataService.delete: ', id);
        return await http.get(`/deleteparcelamento/`+id);
    }

    async update(data){

        console.log('ParcelamentoDataService.update: ', data);
        return await http.post(`/updateparcelamento/`, data);
    }
    
    async create(data){

        console.log('ParcelamentoDataService.create: ', data);
        return await http.post(`/insertparcelamento/`, data);

    }  

}

export default new ParcelamentoDataService();