export const typeDefs = `#graphql
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    profileImageURL: String
  }

  type Query {
    ping: String
    say(name: String): String
    getUserById(id: ID!): User
    verifyToken(token: String!): User
    getCurrentLoggedInUser: User
  }

  type Mutation {
    createUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      profileImageURL: String
    ): String!
    
    loginUser(
      email: String!
      password: String!
    ): String!
  }
`;
