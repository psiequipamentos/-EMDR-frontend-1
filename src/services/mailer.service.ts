import MasterService from "./master.service";

export default class MailerService extends MasterService {
    constructor() {
        super('mailer');
    }
    public sendEmail = async (data:any) => {
        const response = await this.api_service.RequestData('POST', `${this.endpoint}/send-email`, data, '');
        return response;
    }
    public sendCode = async (data:any) => {
        const response = await this.api_service.RequestData('POST', `${this.endpoint}/send-code`, data, '');
        return response;
    }
}
