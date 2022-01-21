import AuthService from "./auth.service";

export default class PsicologoService extends AuthService {
    constructor() {
        super('psicologo');
    }
    public verifyCode = async (data:any) => {
        const response = await this.api_service.RequestData('POST', `${this.endpoint}/verificar-codigo`, data, '');
        return response;
    }

    public changePassword = async (data:any) => {
        const response = await this.api_service.RequestData('POST', `${this.endpoint}/recuperar-senha`, data, '');
        return response;
    }
}
