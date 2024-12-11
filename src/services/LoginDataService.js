import http from "../http-common";

class LoginDataService{
    async authenticate(data){

        console.log('LoginDataService.authenticate: ', data);
        const response = await http.post(`/login`, data);
        return response;
    }
    async get(cpf){

        console.log('LoginDataService.get: ', cpf);
        return await http.get('/login/'+cpf);
    }

}

export default new LoginDataService();