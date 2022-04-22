import axios from "axios";
export const graphqlHttp = axios.create({
    baseURL: 'https://api.producthunt.com/v2/api/graphql',
    timeout: 3000,
})