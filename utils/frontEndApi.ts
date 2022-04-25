import axios, { AxiosRequestConfig } from "axios";
const config: AxiosRequestConfig<any> | undefined = {
    baseURL: `${process.env.NEXT_PUBLIC_APP_URL}/api`,
    timeout: 3000,

}

export const frontendHttp = axios.create(config)

export const getPosts = (query: string) => frontendHttp.post('/graphql', { query })
export const getCheerioPosts = (query: string) => frontendHttp.post('/apollo', { query })