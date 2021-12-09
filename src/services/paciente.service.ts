import MasterService from "./master.service";

export default class PacienteService extends MasterService {
    constructor() {
        super('/paciente');
    }
}
