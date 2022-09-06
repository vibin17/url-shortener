import { AxiosResponse } from "axios";
import { API } from "../http";
import { SignUpResponse, SignInResponse, UserData, LinkData, LinkResponse } from "../models/models";

export default class ApiService {
    static SignIn = async (signInData: UserData): Promise<AxiosResponse<SignInResponse>> => {
        const params = new URLSearchParams()
        params.append('username', signInData.username)
        params.append('password', signInData.password)
        const response: AxiosResponse<SignInResponse> = await API.post('/login', params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        return response
    }

    static SignUp = async (signUpData: UserData): Promise<AxiosResponse<SignUpResponse>> => {
        const response: AxiosResponse<SignUpResponse> = await API.post('/register', null, {
            params: {...signUpData}
        })
        return response
    }

    static Squeeze = async (linkData: LinkData): Promise<AxiosResponse<LinkResponse>> => {
        const response: AxiosResponse<LinkResponse> = await API.post('/squeeze', null, {
            params: {...linkData}
        })
        return response
    }

    static Statistics = async (): Promise<AxiosResponse<LinkResponse[]>> => {
        const response: AxiosResponse<LinkResponse[]> = await API.get('/statistics', {
            params: {
                offset: 2
            }
        })
        return response
    }
}