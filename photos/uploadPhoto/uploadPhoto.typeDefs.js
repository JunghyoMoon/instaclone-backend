import { gql } from "apollo-server";

export default gql`
    type Mutation {
        # todo: after test, change file type String -> Upload
        #       and fix resolver
        uploadPhoto(file: String!, caption: String): Photo
    }
`;
