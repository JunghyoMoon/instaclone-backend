// client: 데이터베이스와 어떻게 대화하는가
import client from "../client";

export default {
    // Query == GET
    Query: {
        movies: () => client.movie.findMany(),
        movie: (_, { id }) =>
            client.movie.findUnique({
                where: {
                    id,
                },
            }),
    },
};
