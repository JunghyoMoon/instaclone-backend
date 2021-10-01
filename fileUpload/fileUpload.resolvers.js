/*
import { finished } from "stream/promises";
import { GraphqlUpload } from "graphql-upload";


export default {
    Upload: GraphqlUpload,

    Mutation: {
        singleUpload: async (parent, { file }) => {
            const { createReadStream, filename, mimetype, encoding } =
                await file;

            const stream = createReadStream();

            const out = require("fs").createWriteStream(
                "local-file-output.txt"
            );
            stream.pipe(out);
            await finished(out);

            return { filename, mimetype, encoding };
        },
    },
};
*/
