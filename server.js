require("dotenv").config();
// dotenv는 최우선적으로 불러와야 함.
import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
// 아폴로의 개짓거리를 막고, playground로 직행하게 해주는 플러그인.
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";
import { graphqlUploadExpress } from "graphql-upload";

const PORT = process.env.PORT;

const startApolloServer = async (typeDefs, resolvers) => {
    const apollo = new ApolloServer({
        typeDefs,
        resolvers,
        // 모든 resolver에서 token에 접근 가능하도록 context에 넣음.
        // -> 토큰은 자동으로 보낼거고, 'utils.js'에서 토큰의 id로 현재 로그인한 유저를 자동으로 찾을 것.
        // 브라우저는 http header를 요청할 때마다 자동으로 보냄. -> 프론트에서 header에 받은 token을 넣어서 서버로 보내면 됨.
        context: async ({ req }) => {
            return {
                loggedInUser: await getUser(req.headers.token),
            };
        },
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    });

    await apollo.start();

    const app = express();

    app.use(logger("tiny"));
    app.use("/static", express.static("uploads"));
    app.use(graphqlUploadExpress());

    apollo.applyMiddleware({ app });

    await new Promise((resolve) => app.listen({ port: PORT }, resolve));
    console.log(`Your server is running on http://localhost:${PORT}/ 🚀`);
};

startApolloServer(typeDefs, resolvers);
