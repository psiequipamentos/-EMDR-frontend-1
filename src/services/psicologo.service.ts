import AuthService from "./auth.service";

export default class PsicologoService extends AuthService {
    constructor() {
        super('/psicologo');
    }
}
