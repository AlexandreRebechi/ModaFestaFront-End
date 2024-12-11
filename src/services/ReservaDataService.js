import http from "../http-common";

class ReservaDataService {

   

    async get(id){

        console.log('ReservaDataService.get: ', id);
        return await http.get('/reserva/'+id);
    }
    async get2(cpf){

        console.log('ReservaDataService.get: ', cpf);
        return await http.get('/reservabycliente/'+cpf);
    }
    async list(data){

        console.log('ReservaDataService.list: ', data);
        return await http.get(`/listreserva`, data);
    }

    async list2(){

        console.log('ReservaDataService.list2: ');
        return await http.get(`/listreserva2`);
    }

    async delete(id){

        console.log('ReservaDataService.delete: ', id);
        return await http.get(`/deletereserva/`+id);
    }

    async update(data){

        console.log('ReservaDataService.update: ', data);
        return await http.post(`/updatereserva/`, data);
    }
    
    async create(data){

        console.log('ReservaDataService.create: ', data);
        return await http.post(`/insertreserva/`, data);

    }
   

}

export default new ReservaDataService();