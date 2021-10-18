import { extractExtensionDefinitions } from "@graphql-tools/schema";
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

        isMe: ({ id }, _, { loggedInUser }) => {
            // "현재 보고있는 유저의 id가 로그인한 유저의 id와 같은가?" 를 확인.
            //   근데.. root가 대체 뭐길래?? parent?
            if (!loggedInUser) {
                return false;
            }
            return id === loggedInUser.id;
        },

        isFollowing: async ({ id }, _, { loggedInUser }) => {
            if (!loggedInUser) {
                return false;
            }

            // 현재 로그인한 유저의 팔로잉 리스트 안에, 현재 '보고 있는' 유저의 username이 들어있는지 확인
            const ok = await client.user
                .findUnique({ where: { username: loggedInUser.username } })
                .following({ where: { id } });

            return ok.length !== 0;
        },
    },
};
