import { ApolloServer } from "apollo-server";
// 아폴로의 개짓거리를 막고, playground로 직행하게 해주는 플러그인.
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import schema from "./schema";

const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server
    .listen()
    .then(() =>
        console.log("Your server is running on http://localhost:4000/ 😎")
    );
