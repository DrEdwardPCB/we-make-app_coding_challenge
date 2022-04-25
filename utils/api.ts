import axios, { AxiosRequestConfig } from "axios";
const config: AxiosRequestConfig<any> | undefined = {
    baseURL: 'https://api.producthunt.com/v2/api/graphql',
    timeout: 30000,
    headers: {
        Authorization: `Bearer ${process.env.DEVELOPER_TOKEN}`,
    },
}

export const graphqlHttp = axios.create(config)

export const getPosts = (query: string) => {
    return graphqlHttp.post('', { query })
}