import { gql } from "apollo-server-micro";
const typeDefs = gql`
    type  Post {
        name: String
        description: String
        votesCount: String
    }

    type  Query {
        posts: [Post]
    }`

export default typeDefs