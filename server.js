import { ApolloServer, gql } from "apollo-server";
// 아폴로의 개짓거리를 막고, playground로 직행하게 해주는 플러그인.
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

const typeDefs = gql`
    type Movie {
        id: Int
        title: String
        year: Int
    }

    type Query {
        movies: [Movie]
        movie: Movie
    }

    type Mutation {
        createMovie(title: String!): Boolean
        deleteMovie(title: String!): Boolean
    }
`;

const resolvers = {
    Query: {
        movies: () => [],
        movie: () => ({ title: "hello", year: 2021 }),
    },
    Mutation: {
        createMovie: (_, { title }) => {
            console.log(title);
            return true;
        },
        deleteMovie: () => "",
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server
    .listen()
    .then(() =>
        console.log("Your server is running on http://localhost:4000/ 😎")
    );
