import client from "../../client";

export default {
    Query: {
        // 이번에는 offset이 아닌, 'cursor pagination' 방식을 사용해 볼 예정
        //      cursor: 프론트가 기억하고 있는, '받은 것 중 마지막 데이터'
        // cursor를 사용한 pagination은 규모 확장이 용이하다는 것 (offset을 쓰게되면 다 로딩해야 하는지라 규모가 커지면 감당하기 힘들어짐)
        //              반면, cursor를 사용하게 되면 '특정 페이지로의 이동'은 어려워지게 됨.
        // 사족: 무한스크롤일때는 cursor 사용이 좋아보이고, 페이지번호를 써야 할 때는 offset을 사용하는 것이 좋아보임.
        seeFollowing: async (_, { username, lastId }) => {
            const ok = await client.user.findUnique({
                where: { username },
                select: { id: true },
            });

            if (!ok) {
                return {
                    ok: false,
                    error: `'${username}' not found.`,
                };
            }

            const following = await client.user
                .findUnique({ where: { username } })
                .following({
                    take: 5,
                    skip: lastId ? 1 : 0,
                    // 첫페이지라면 cursor가 없을 것.. 그거 감안해서 단축평가 적용.
                    ...(lastId && { cursor: { id: lastId } }),
                });

            return {
                ok: true,
                following,
            };
        },
    },
};
