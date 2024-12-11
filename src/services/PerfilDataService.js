import http from "../http-common";

class PerfilDataService {

    async list(){

        console.log('PerfilDataService.list: ');
        return await http.get(`/listperfil`);
    }

    async get(id){

        console.log('PerfilDataService.get: ', id);
        return await http.get('/perfil/'+id);
    }

    async delete(id){

        console.log('PerfilDataService.delete: ', id);
        return await http.get(`/deleteperfil/`+id);
    }

    async update(data){

        console.log('PerfilDataService.update: ', data);
        return await http.post(`/updateperfil/`, data);
    }
    
    async create(data){

        console.log('PerfilDataService.create: ', data);
        return await http.post(`/insertperfil/`, data);

    }  

}

export default new PerfilDataService();