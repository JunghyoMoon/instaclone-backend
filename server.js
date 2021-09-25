import { ApolloServer, gql } from "apollo-server";
// 아폴로의 개짓거리를 막고, playground로 직행하게 해주는 플러그인.
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

const typeDefs = gql`
    type Query {
        hello: String
    }
`;

const resolvers = {
    Query: {
        hello: () => "hiiii",
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
