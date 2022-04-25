import axios from "axios";
import { IPost } from '../cheerio';

const resolvers = {
    Query: {
        posts: async () => {
            try {
                const posts = await axios.get("http://localhost:3000/api/cheerio");
                return posts.data.map(({ name, description, votesCount }: IPost) => ({
                    name,
                    description,
                    votesCount,
                }));
            } catch (error) {
                throw error;
            }
        },
    },
};
export default resolvers