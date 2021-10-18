import client from "../../client";

export default {
    Query: {
        searchUsers: async (_, { keyword, lastId }) => {
            if (keyword.length < 4) {
                return {
                    ok: false,
                    error: "Keyword have to be more than 4 chars.",
                };
            }

            const users = await client.user.findMany({
                where: {
                    username: {
                        startsWith: keyword.toLowerCase(),
                    },
                },
                take: 5,
                skip: lastId ? 1 : 0,
                ...(lastId && { cursor: { id: lastId } }),
            });

            return {
                ok: true,
                users,
            };
        },
    },
};
