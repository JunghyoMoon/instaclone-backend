import client from "../../client";

export default {
    Query: {
        seeFollowers: async (_, { username, page }) => {
            const ok = await client.user.findUnique({
                where: { username },
                select: { id },
            });

            if (!ok) {
                return {
                    ok: false,
                    error: `'${username}' doesn't exist.`,
                };
            }

            // offset을 활용한 pagination (프론트에서는 무한스크롤로 페이지를 증가시킬 예정?)
            //      offset pagination은 어떤 페이지로든 이동할 수 있기 때문에 좋음. 순서에 노상관!
            //      단점도 존재. -> 200000개를 생략하고 10개를 불러오려면 여전히 앞의 200000개를 불러와야 함..
            const followers = await client.user
                .findUnique({ where: { username } })
                .followers({
                    take: 5,
                    skip: (page - 1) * 5,
                });

            const totalPages = await client.user.count({
                where: { following: { some: { username } } },
            });
            return {
                ok: true,
                followers,
                totalPages: Math.ceil(totalPages / 5),
            };
        },
    },
};
