import axios, { AxiosRequestConfig } from "axios";
const config: AxiosRequestConfig<any> | undefined = {
    baseURL: `${process.env.NEXT_PUBLIC_APP_URL}/api/graphql`,
    timeout: 3000,

}

export const frontendHttp = axios.create(config)

export const getPosts = (query: string) => frontendHttp.post('', { query })