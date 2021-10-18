import client from "../client";

export default {
    // resolver는 mutation이나 query에만 만들 수 있는 것이 아님!
    // 아래와 같은 것도 가능함.
    User: {
        totalFollowing: ({ id }) =>
            // 내가 팔로우하는사람의 총 합: 자신의 팔로워 리스트에 내 id를 가지고 있는 유저들
            client.user.count({ where: { followers: { some: { id } } } }),

        totalFollowers: ({ id }) =>
            // 내 팔로워의 총 합: 자신의 팔로잉 리스트에 내 id를 가지고 있는 유저들
            client.user.count({ where: { following: { some: { id } } } }),
    },
};
