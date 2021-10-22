import { gql } from "apollo-server";

export default gql`
    type Photo {
        author: String!
        authorId: Int!
        url: String!
    }
`;
