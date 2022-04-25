import type { NextApiRequest, NextApiResponse } from 'next'
import { ApolloServer } from "apollo-server-micro";
import typeDefs from "./schemas/index";
import resolvers from "./resolvers/index";

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
});
export const config = {
    api: {
        bodyParser: false,
    },
};


const startServer = apolloServer.start();

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {

    await startServer;
    await apolloServer.createHandler({
        path: "/api/apollo",
    })(req, res);
}
