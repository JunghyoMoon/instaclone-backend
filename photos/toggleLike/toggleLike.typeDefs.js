import { gql } from "apollo-server";

export default gql`
    type ToggleLikePhotoResult {
        ok: Boolean!
        error: String
    }

    type Mutation {
        toggleLike(id: Int!): ToggleLikePhotoResult!
    }
`;
