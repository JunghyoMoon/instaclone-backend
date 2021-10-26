import { gql } from "apollo-server";

export default gql`
    type User {
        id: Int!
        firstName: String!
        lastName: String
        username: String!
        email: String!
        bio: String
        avatar: String
        photos: [Photo]
        following: [User]
        followers: [User]
        createdAt: String!
        updatedAt: String!
        # computed fields : graphql schema에는 정의되어 있지만, db에는 없는 것.
        #                   매 request를 받을 때마다 계산되어 정의됨.
        totalFollowing: Int!
        totalFollowers: Int!
        isFollowing: Boolean!
        isMe: Boolean!
    }
`;
