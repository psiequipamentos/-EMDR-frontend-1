import MasterService from "./master.service";

export default class AuthService extends MasterService{
    constructor(endpoint:string) {
        super(endpoint);
    }
    protected login = async (data: any) => {
        const login_response = await this.api_service.RequestData('POST','/login',data,'')
        return login_response
    }
}
