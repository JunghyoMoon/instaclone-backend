require("dotenv").config();
// dotenv는 최우선적으로 불러와야 함.
import { ApolloServer } from "apollo-server";
// 아폴로의 개짓거리를 막고, playground로 직행하게 해주는 플러그인.
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import schema from "./schema";

const server = new ApolloServer({
    schema,
    // 모든 resolver에서 token에 접근 가능하도록 context에 넣을 예정.
    context: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjMzMDEyMTYwfQ.KL5WxvYHb0wVpeH0W2EH8y5RXtqIIUoSzI7xGq4MJ68",
    },
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const PORT = process.env.PORT;

server
    .listen(PORT)
    .then(() =>
        console.log(`Your server is running on http://localhost:${PORT}/ 🚀`)
    );
