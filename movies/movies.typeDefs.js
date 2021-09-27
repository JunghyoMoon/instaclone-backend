import { gql } from "apollo-server";

// grqphql type들의 정의
export default gql`
    type Movie {
        id: Int!
        year: Int!
        title: String!
        genre: String
        createdAt: String!
        updatedAt: String!
    }

    type Query {
        movies: [Movie]
        movie(id: Int!): Movie
    }

    type Mutation {
        createMovie(title: String!, year: Int!, genre: String): Movie
        deleteMovie(id: Int!): Movie
        updateMovie(id: Int!, title: String, year: Int, genre: String): Movie
    }
`;
