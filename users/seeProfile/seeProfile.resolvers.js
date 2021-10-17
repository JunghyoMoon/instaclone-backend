import client from "../../client";

export default {
    Query: {
        // findunique는 @unique 필드만 검색하게 됨.
        seeProfile: (_, { username }) =>
            client.user.findUnique({
                where: { username },
                // include: 원하는 사용자 관계를 가지고 올 수 있게 해줌.
                include: {
                    following: true,
                    followers: true,
                },
            }),
    },
};
