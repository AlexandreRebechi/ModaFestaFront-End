import http from "../http-common";

class FotoDataService {


    async get(id){

        console.log('FotoDataService.get: ', id);
        return await http.get('/foto/'+id);
    }

    async list(){

        console.log('FotoDataService.list: ');
        return await http.get(`/listfoto`);
    }
    async list2(){

        console.log('FotoDataService.list: ');
        return await http.get(`/listfoto2`);
    }

    async delete(id){

        console.log('FotoDataService.delete: ', id);
        return await http.get(`/deletefoto/`+id);
    }

    async update(data){

        console.log('FotoDataService.update: ', data);
        return await http.post(`/updatefoto/`, data);
    }
    
    async create(data){

        console.log('FotoDataService.create: ', data);
        return await http.post(`/insertfoto/`, data);

    }  

}

export default new FotoDataService();