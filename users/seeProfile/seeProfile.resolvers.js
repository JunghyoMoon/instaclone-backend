import client from "../../client";

export default {
    Query: {
        // findunique는 @unique 필드만 검색하게 됨.
        seeProfile: (_, { username }) =>
            client.user.findUnique({
                where: { username },
                // include: 원하는 사용자 관계를 가지고 올 수 있게 해줌.
                //          팔로워가 겁나게 많아진다면.. 안 가지고 오는 것을 추천.
                include: {
                    following: true,
                    followers: true,
                },
            }),
    },
};
