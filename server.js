import { ApolloServer, gql } from "apollo-server";
import { PrismaClient } from "@prisma/client";
// 아폴로의 개짓거리를 막고, playground로 직행하게 해주는 플러그인.
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

// client: 데이터베이스와 어떻게 대화하는가
const client = new PrismaClient();

// grqphql type들의 정의
const typeDefs = gql`
    type Movie {
        id: Int!
        year: Int!
        title: String!
        genre: String
        createdAt: String!
        updatedAt: String!
    }

    type Query {
        movies: [Movie]
        movie(id: Int!): Movie
    }

    type Mutation {
        createMovie(title: String!, year: Int!, genre: String): Movie
        deleteMovie(id: Int!): Movie
        updateMovie(id: Int!, title: String, year: Int, genre: String): Movie
    }
`;

// 요청을 '해결' 하기 위한 resolver들.
const resolvers = {
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
    // Mutation == POST, PUT, DELETE
    Mutation: {
        createMovie: (_, { title, year, genre }) =>
            client.movie.create({
                data: {
                    title,
                    year,
                    genre,
                },
            }),
        deleteMovie: (_, { id }) => client.movie.delete({ where: { id } }),
        updateMovie: (_, { id, title, year, genre }) =>
            client.movie.update({
                where: {
                    id,
                },
                data: {
                    title,
                    year,
                    genre,
                },
            }),
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
