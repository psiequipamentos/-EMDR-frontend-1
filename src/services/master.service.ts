import ApiService from "./api.service";

export default class MasterService {
    protected api_service: ApiService
    protected endpoint:string
    constructor(endpoint:string) {
        this.api_service = new ApiService()
        this.endpoint = endpoint
    }

    protected create = async (data:any) => {
        const response = await this.api_service.RequestData('POST', this.endpoint, data, '')
        return response
    }

    protected readAll = async() => {
        const response = await this.api_service.RequestData('GET', this.endpoint, '')
        return response
    }

    protected readOne = async(ID:any) => {
        const response = await this.api_service.RequestData('GET', this.endpoint, ID)
        return response
    }

    protected update = async(ID:any, data:any) => {
        const response = await this.api_service.RequestData('PUT', this.endpoint,data, ID)
        return response
    }
    protected delete = async (ID:any) => {
        const response = await this.api_service.RequestData('DELETE', this.endpoint, ID)
        return response
    }

}
