import client from "../../client";

export default {
    Query: {
        searchPhotos: (_, { keyword, lastId }) => {
            return client.photo.findMany({
                where: {
                    caption: {
                        startsWith: keyword,
                    },
                },
                take: 12,
                skip: lastId ? 1 : 0,
                ...(lastId && { cursor: { id: lastId } }),
            });
        },
    },
};
