import client from "../../client";

export default {
    Query: {
        // findunique는 @unique 필드만 검색하게 됨.
        seeProfile: (_, { username }) =>
            client.user.findUnique({ where: { username } }),
    },
};
